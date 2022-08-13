//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/**
    * @title Dwarfity
    * @dev Sample attributes mapping
    
    body: ['black', 'clay', 'glossy'],
    eye: ['black', 'highlights', 'silver'],
    gloves: ['black', 'gold', 'highlights'],
    gloves_lining: ['black', 'glossy', 'silver'],
    mustache: ['glossy', 'gold', 'silver'],
    shoe: ['black', 'gold', 'highlights'],
    shoe_lining: ['black', 'glossy', 'silver'],
    shoulder_plate: ['gold', 'highlights', 'silver'],
    shoulder_plate_lining: ['black', 'dark', 'glossy']
*/

contract Constants {
    // We make sure our rating is 100 percent based
    uint256 internal constant HUNDRED = 100;
    // Number of attributes
    uint256 internal constant GENE_LENGTH = 9;
    // How many types in every attribute?
    uint256 internal constant GENE_ATTRS = 3;
    // Mutation chance
    uint256 internal constant MUTATION_CHANCE = 15; // 15%
}

contract GeneScience is Constants {
    function mixGene(string memory _fatherGene, string memory _motherGene) internal view returns (string memory) {
        require(isGeneScience(_fatherGene), 'Must be a valid gene');
        require(isGeneScience(_motherGene), 'Must be a valid gene');

        bytes memory _fatherGeneBytes = bytes(_fatherGene);
        bytes memory _motherGeneBytes = bytes(_motherGene);
        bytes memory crossoveredGene = new bytes(GENE_LENGTH);

        uint256 divider = GENE_LENGTH / 2;

        //  Just do a simple crossover gene mixing algorithm
        for (uint256 i = 0; i < divider; i++) {
            crossoveredGene[i + divider + 1] = _fatherGeneBytes[i];
        }

        for (uint256 i = divider; i < GENE_LENGTH; i++) {
            crossoveredGene[i - divider] = _motherGeneBytes[i];
        }

        (int256 where, int256 attr) = mutation();

        //  There is a mutation!
        if (where != -1) {
            string memory attrStr = uint2str(uint256(attr));
            bytes memory bytesAttrStr = bytes(attrStr);

            crossoveredGene[uint256(where)] = bytesAttrStr[0];
        }

        return string(crossoveredGene);
    }

    //  Apply mock mutation for only 15% chance
    function mutation() internal view returns (int256, int256) {
        // solhint-disable-next-line not-rely-on-time
        uint256 randomHash = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, HUNDRED)));

        uint256 randomNumber = randomHash % HUNDRED;
        bool isMutation = randomNumber < MUTATION_CHANCE;

        if (isMutation) {
            // solhint-disable-next-line not-rely-on-time
            uint256 where = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, HUNDRED)));

            // solhint-disable-next-line not-rely-on-time
            uint256 attr = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, HUNDRED)));

            return (int256(where % GENE_LENGTH), int256(attr % GENE_ATTRS));
        }

        return (-1, -1);
    }

    function isGeneScience(string memory _genes) internal pure returns (bool) {
        bytes memory byteGenes = bytes(_genes);
        return byteGenes.length == GENE_LENGTH;
    }

    // https://github.com/provable-things/ethereum-api/blob/master/provableAPI_0.6.sol
    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return '0';
        }

        uint256 j = _i;
        uint256 len;

        while (j != 0) {
            len++;
            j /= 10;
        }

        bytes memory bstr = new bytes(len);
        uint256 k = len;

        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }

        return string(bstr);
    }
}
