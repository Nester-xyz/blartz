// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./BlastNFT.sol";

contract BlastNFTFactory is Ownable {
    uint256 private _collectionIdCounter;
    // Address of the marketplace contract can be set later by contract Owner
    address private _marketplace;
    mapping(address => bool) private _approvedCollections;
    // user to collection contract address map
    mapping(address => address[]) private _collectionPerCreator;
    mapping(address => uint256) private _collectionIds;

    event CollectionCreated(
        address indexed collection,
        string name,
        string symbol,
        address indexed creator
    );

    modifier onlyApprovedCollection() {
        require(_approvedCollections[msg.sender], "Collection not approved");
        _;
    }

    constructor() Ownable(msg.sender) {}

    function createCollection(
        string memory name,
        string memory symbol
    ) external returns (address) {
        BlastNFT blastNFT = new BlastNFT(
            name,
            symbol,
            _marketplace,
            msg.sender
        );

        // Assign a unique collection id
        address blastAddress = address(blastNFT);
        uint256 collectionId = _collectionIdCounter;
        _collectionIdCounter++;
        _collectionIds[blastAddress] = collectionId;

        // Approve the new contract
        _approvedCollections[blastAddress] = true;

        // Record the collection of the creator
        _collectionPerCreator[msg.sender].push(blastAddress);

        emit CollectionCreated(blastAddress, name, symbol, msg.sender);

        // address of the blastNFT contract
        return blastAddress;
    }

    function getCreatorCollections() external view returns (address[] memory) {
        return _collectionPerCreator[msg.sender];
    }

    function isCollectionCreated(
        address collection
    ) external view returns (bool) {
        // Check if the given collection contract address is part of the collections created by the creator
        return _approvedCollections[collection];
    }

    // Factory contract owner need to set marketplace before adding the collections
    function setMarketplace(address marketplace) external onlyOwner {
        _marketplace = marketplace;
    }

    function _getCollectionIdCounter() external view returns (uint256) {
        return _collectionIdCounter;
    }

    function deployed() external view returns (address) {
        return address(this);
    }
}
