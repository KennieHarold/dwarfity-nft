//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './DwarfityBase.sol';

contract DwarfityCore is DwarfityBase {
    event Received(address, uint256);

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

        _transfer(deployer, msg.sender, tokenId);
    }

    function getTokenIds(address _owner) external view returns (uint256[] memory) {
        return ownersTokenIds[_owner];
    }

    function getDwarfByTokenId(uint256 _tokenId)
        external
        view
        returns (
            string memory _genes,
            uint256 _fatherId,
            uint256 _motherId,
            uint256 _rarity
        )
    {
        _genes = dwarves[_tokenId].genes;
        _fatherId = dwarves[_tokenId].fatherId;
        _motherId = dwarves[_tokenId].motherId;
        _rarity = dwarfCountPerGene[dwarves[_tokenId].genes];
    }
}
