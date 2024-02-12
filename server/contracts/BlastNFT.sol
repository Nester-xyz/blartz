// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract BlastNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    // Address of the linked Marketplace contract
    string private _collectionName;
    string private _collectionSym;
    address private _marketplace;
    address private _collectionOwner;
    struct NFTMetadata {
        string uri;
        string name;
    }
    mapping(uint256 => address) private _tokenCollection;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => string) private _tokenNames;
    event NFTMinted(
        uint256 tokenId,
        address marketplace,
        address owner,
        string tokenURI,
        string tokenName
    );

    modifier onlyCollectionOwner() {
        require(
            _collectionOwner == msg.sender,
            "You are not the owner of this collection"
        );
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        address marketplace,
        address owner
    ) Ownable(owner) ERC721(name, symbol) {
        _collectionName = name;
        _collectionSym = symbol;
        _collectionOwner = owner;
        _marketplace = marketplace;
        _tokenIdCounter = 0;
        setApprovalForAll(marketplace, true);
    }

    function mintNFT(
        string memory tokenURI,
        string memory tokenName
    ) external onlyCollectionOwner {
        require(_marketplace != address(0), "Marketplace not set");

        uint256 tokenId = _tokenIdCounter;
        // Set the collection ownership for the minted token may require in the future
        _tokenCollection[tokenId] = msg.sender;
        _tokenIdCounter++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _setTokenName(tokenId, tokenName);

        emit NFTMinted(tokenId, _marketplace, msg.sender, tokenURI, tokenName);
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal virtual {
        require(
            tokenExists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = uri;
    }

    function _setTokenName(
        uint256 tokenId,
        string memory name
    ) internal virtual {
        require(
            tokenExists(tokenId),
            "ERC721Metadata: Name set of nonexistent token"
        );
        _tokenNames[tokenId] = name;
    }

    function getCollectionNFTs() public view returns (NFTMetadata[] memory) {
        NFTMetadata[] memory result = new NFTMetadata[](_tokenIdCounter);

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            string memory uri = _tokenURIs[i];
            string memory name = _tokenNames[i];
            result[i] = NFTMetadata(uri, name);
        }

        return result;
    }

    function getTokenLen() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function getURIAndName(
        uint256 tokenId
    ) public view returns (string memory, string memory) {
        return (_tokenURIs[tokenId], _tokenNames[tokenId]);
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function getTokenName(uint256 tokenId) public view returns (string memory) {
        return _tokenNames[tokenId];
    }

    function nftOwner(uint256 tokenId) public view returns (address) {
        require(
            tokenExists(tokenId),
            "ERC721Metadata: Owner query for nonexistent token"
        );
        return ownerOf(tokenId);
    }

    function approveMarketplaceNFT(uint256 tokenId) external {
        approve(_marketplace, tokenId);
    }

    function tokenExists(uint256 tokenId) public view returns (bool) {
        return tokenId < _tokenIdCounter;
    }

    function deployed() external view returns (address) {
        return address(this);
    }

    function getCollectionName() external view returns (string memory) {
        return _collectionName;
    }

    function getCollectionSym() external view returns (string memory) {
        return _collectionSym;
    }
}
