//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './GeneScience.sol';

contract DwarfityBase is ERC721, GeneScience {
    using Counters for Counters.Counter;

    struct Dwarf {
        string genes;
        uint256 fatherTokenId;
        uint256 motherTokenId;
    }

    Dwarf[] public dwarves;

    Counters.Counter public dwarfIndexTracker;

    address public deployer;

    bool private called;

    mapping(address => uint256[]) public ownersTokenIds;

    mapping(string => uint256) public dwarfCountPerGene;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        called = true;
    }

    function createDwarf(
        uint256 _fatherTokenId,
        uint256 _motherTokenId,
        string memory _genes,
        address _owner
    ) internal returns (uint256) {
        require(isGeneScience(_genes), 'Genes must be valid');

        uint256 newTokenId = dwarfIndexTracker.current();

        Dwarf memory _dwarf = Dwarf({genes: _genes, fatherTokenId: _fatherTokenId, motherTokenId: _motherTokenId});

        _mint(_owner, newTokenId);
        dwarves.push(_dwarf);
        ownersTokenIds[_owner].push(newTokenId);
        dwarfIndexTracker.increment();
        dwarfCountPerGene[_genes] += 1;

        return newTokenId;
    }

    function mintGenesisDwarf(string memory _genes) external onlyDeployer {
        createDwarf(0, 0, _genes, msg.sender);
    }

    function setDeployer(address _deployer) internal {
        deployer = _deployer;
    }

    function getContractBalance() external view onlyDeployer returns (uint256) {
        return address(this).balance;
    }

    modifier onlyDeployer() {
        require(deployer != address(0x0), 'Deployer must set first');
        require(msg.sender == deployer, 'Must Deployer');
        _;
    }
}
