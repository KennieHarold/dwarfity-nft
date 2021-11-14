//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import './DwarfityBase.sol';

contract DwarfityCore is DwarfityBase {
    event Received(address, uint256);

    event Birth(address owner, uint256 tokenId, uint256 fatherTokenId, uint256 motherTokenId, string genes);

    constructor() DwarfityBase('Dwarfity', 'DW') {
        createDwarf(0, 0, '000000000', msg.sender);
        setDeployer(msg.sender);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function purchaseDwarfFromDeployer(uint256 tokenId) external payable {
        require(ownerOf(tokenId) != msg.sender, 'Avoid self purchase');
        require(ownerOf(tokenId) == deployer, 'Purchase only from deployer');

        //  Add ownership
        addOwnerShip(msg.sender, tokenId);

        //  Remove ownership
        ownersTokenIdAtIndex[deployer][tokenId] = -1;

        //  ERC721 method
        _transfer(deployer, msg.sender, tokenId);
    }

    function getTokenIds(address _owner) external view returns (uint256[] memory) {
        uint256 arrLength = ownersTokenIds[_owner].length;
        uint256[] memory tokens = new uint256[](balanceOf(_owner));
        uint256 tokenIdx = 0;
        
        for (uint256 i = 0; i < arrLength; i++) {
            uint256 tokenId = ownersTokenIds[_owner][i];

            if (int256(ownersTokenIdAtIndex[_owner][tokenId]) != -1) {
                tokens[tokenIdx] = tokenId;
                tokenIdx += 1;
            }
        }

        return tokens;
    }

    function getTokensOfDeployer() external view returns (uint256[] memory) {
        require(deployer != address(0x0), 'Deployer must set first');

        uint256 arrLength = ownersTokenIds[deployer].length;
        uint256[] memory tokens = new uint256[](balanceOf(deployer));
        uint256 tokenIdx = 0;

        for (uint256 i = 0; i < arrLength ; i++) {
            uint256 tokenId = ownersTokenIds[deployer][i];

            if (ownersTokenIdAtIndex[deployer][tokenId] != -1) {
                tokens[tokenIdx] = tokenId;
                tokenIdx += 1;
            }
        }
        
        return tokens;
    }

    function getDwarfByTokenId(uint256 _tokenId)
        public
        view
        returns (
            string memory _genes,
            uint256 _fatherTokenId,
            uint256 _motherTokenId,
            uint256 _rarity
        )
    {
        _genes = dwarves[_tokenId].genes;
        _fatherTokenId = dwarves[_tokenId].fatherTokenId;
        _motherTokenId = dwarves[_tokenId].motherTokenId;
        _rarity = dwarfCountPerGene[dwarves[_tokenId].genes];
    }

    function breedDwarves(uint256 _fatherTokenId, uint256 _motherTokenId) external {
        require(msg.sender != deployer, 'Disallow deployer to breed');
        require(ownerOf(_fatherTokenId) == msg.sender, 'Sender must own the token');
        require(ownerOf(_motherTokenId) == msg.sender, 'Sender must own the tokem');

        (string memory _fatherGene, , , ) = getDwarfByTokenId(_fatherTokenId);
        (string memory _motherGene, , , ) = getDwarfByTokenId(_motherTokenId);

        string memory newGene = mixGene(_fatherGene, _motherGene);

        uint256 newTokenId = createDwarf(_fatherTokenId, _motherTokenId, newGene, msg.sender);

        emit Birth(msg.sender, newTokenId, _fatherTokenId, _motherTokenId, newGene);
    }
}
