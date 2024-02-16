// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./BlastNFT.sol";
import "./BlastNFTFactory.sol";
import "./WalletContract.sol";

// For factory pass it on the constructor
contract Marketplace is ReentrancyGuard {
    address public owner;
    BlastNFTFactory public factory;
    uint256 constant MAX_TOKEN_ID = 10000;
    // Map of the collection address to tokenId (Token prices)
    mapping(address => mapping(uint256 => uint256)) private _tokenPrices;
    // Map of the collection address to tokenId is listed
    mapping(address => mapping(uint256 => bool)) private _isNFTListed;
    // Map of the collection to tokenIds
    mapping(address => uint256[]) private _activeCollectionToTokenIds;
    // Map of the collection to tokenIds to WalletContractAddress
    mapping(address => mapping(uint256 => address))
        private _walletContractMapping;
    address[] private _activeCollectionsList;

    uint256 private _tokenIdCounter;
    struct TokenInfo {
        address collection;
        uint256 tokenId;
        uint256 price;
    }
    event NFTListed(
        address indexed collection,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );

    event NFTPurchased(
        address indexed collection,
        uint256 indexed tokenId,
        address indexed buyer
    );

    constructor(address _factory) {
        owner = msg.sender;
        factory = BlastNFTFactory(_factory);
    }

    function toggleNFTForSale(
        address collection,
        uint256 tokenId,
        uint256 priceInBlast
    ) external {
        require(
            factory.isCollectionCreated(collection),
            "Collection not created by the factory"
        );
        require(
            BlastNFT(collection).ownerOf(tokenId) == msg.sender,
            "You are not the owner of the NFT"
        );

        if (_isNFTListed[collection][tokenId]) {
            // NFT is already listed, remove from sale
            _removeFromSale(collection, tokenId);
        } else {
            // NFT is not listed, put on sale
            _listForSale(collection, tokenId, priceInBlast);
        }
    }

    // User should have the collection address of particular nft
    function purchaseNFT(
        address collection,
        uint256 tokenId
    ) external payable nonReentrant {
        require(
            _tokenPrices[collection][tokenId] > 0,
            "NFT not listed for sale"
        );
        uint256 priceInBlast = _tokenPrices[collection][tokenId];

        require(msg.value >= priceInBlast, "Insufficient funds to purchase");

        // Transfer funds to the seller
        address payable seller = payable(BlastNFT(collection).ownerOf(tokenId));
        // Ensure that the buyer is not the current owner of the token
        require(
            seller != msg.sender,
            "Buyer is the current owner of the token"
        );

        // Check if the buyer is approved or the owner
        require(
            BlastNFT(collection).getApproved(tokenId) == address(this),
            "NFT must be approved to market"
        );

        seller.transfer(priceInBlast);

        // Transfer the NFT to the buyer
        BlastNFT(collection).transferFrom(seller, msg.sender, tokenId);
        // Remove from sale
        _removeFromSale(collection, tokenId);

        emit NFTPurchased(collection, tokenId, msg.sender);
    }

    // User should have the collection address of particular nft
    function purchaseNFTWithYeild(
        address collection,
        uint256 tokenId
    ) external payable nonReentrant {
        // Check if the NFT is listed for sale and the price is greater than 0
        require(
            _tokenPrices[collection][tokenId] > 0,
            "NFT not listed for sale"
        );
        uint256 priceInBlast = _tokenPrices[collection][tokenId];

        // Ensure the buyer sends enough funds to purchase the NFT
        require(msg.value >= priceInBlast, "Insufficient funds to purchase");

        // Transfer funds to the seller
        address payable seller = payable(BlastNFT(collection).ownerOf(tokenId));
        // Ensure that the buyer is not the current owner of the token
        require(
            seller != msg.sender,
            "Buyer is the current owner of the token"
        );

        // Check if the buyer is approved or the owner
        require(
            BlastNFT(collection).getApproved(tokenId) == address(this),
            "NFT must be approved to market"
        );

        // Transfer funds to the WalletContract
        WalletContract walletContract = WalletContract(
            _walletContractMapping[collection][tokenId]
        );
        walletContract.setBuyer(payable(msg.sender));
        walletContract.depositAmountByMarketplace{value: priceInBlast}(
            _tokenPrices[collection][tokenId]
        );

        // Transfer the NFT to the buyer
        BlastNFT(collection).transferFrom(seller, msg.sender, tokenId);
        // Remove from sale
        _removeFromSale(collection, tokenId);

        emit NFTPurchased(collection, tokenId, msg.sender);
    }

    function calculatePrincipalAmount(
        uint256 targetYield,
        uint256 lockupPeriodInDays
    ) internal pure returns (uint256) {
        // TODO: calculation logic here for yield generating deposit
    }

    function _removeFromSale(address collection, uint256 tokenId) internal {
        require(
            _isNFTListed[collection][tokenId],
            "NFT is not listed for sale"
        );
        // Remove the tokenId from the active collection mapping
        uint256[] storage tokenIds = _activeCollectionToTokenIds[collection];
        for (uint256 i = 0; i < tokenIds.length; i++) {
            // Swap with the last element and pop
            if (tokenIds[i] == tokenId) {
                tokenIds[i] = tokenIds[tokenIds.length - 1];
                tokenIds.pop();
                break;
            }
        }
        // If no more tokens listed for sale, remove collection from active collections list
        if (tokenIds.length == 0) {
            for (uint256 i = 0; i < _activeCollectionsList.length; i++) {
                if (_activeCollectionsList[i] == collection) {
                    // Swap with the last element and pop
                    _activeCollectionsList[i] = _activeCollectionsList[
                        _activeCollectionsList.length - 1
                    ];
                    _activeCollectionsList.pop();
                    break;
                }
            }
        }
        // Remove the NFT from sale
        _isNFTListed[collection][tokenId] = false;
        // Reset the price
        _tokenPrices[collection][tokenId] = 0;
        // Reset the wallet Address
        _walletContractMapping[collection][tokenId] = address(0);
    }

    function _listForSale(
        address collection,
        uint256 tokenId,
        uint256 priceInBlast
    ) internal {
        require(
            !_isNFTListed[collection][tokenId],
            "Marketplace: NFT is already listed"
        );
        // Mark the NFT as listed
        _isNFTListed[collection][tokenId] = true;
        // Set the price in the _tokenPrices mapping
        _tokenPrices[collection][tokenId] = priceInBlast;
        // Add to _activeCollectionToTokenIds and _activeCollectionsList;
        _activeCollectionsList.push(collection);
        _activeCollectionToTokenIds[collection].push(tokenId);
        // Add the collection to tokenId to walletAddress mapping
        WalletContract walletContract = new WalletContract(
            address(this),
            priceInBlast
        );
        walletContract.setSeller(
            payable(BlastNFT(collection).ownerOf(tokenId))
        );
        _walletContractMapping[collection][tokenId] = address(walletContract);
        // Emit an event to indicate that the NFT is listed for sale
        emit NFTListed(collection, tokenId, msg.sender, priceInBlast);
    }

    function isNFTListed(
        address collection,
        uint256 tokenId
    ) external view returns (bool) {
        return _isNFTListed[collection][tokenId];
    }

    function getTokenPrice(
        address collection,
        uint256 tokenId
    ) external view returns (uint256) {
        return _tokenPrices[collection][tokenId];
    }

    function getAllActiveTokens() external view returns (TokenInfo[] memory) {
        TokenInfo[] memory allTokens = new TokenInfo[](getTotalActiveTokens());
        uint256 index = 0;

        // Iterate over active collections
        for (uint256 i = 0; i < _activeCollectionsList.length; i++) {
            address collection = _activeCollectionsList[i];
            uint256[] memory tokenIds = _activeCollectionToTokenIds[collection];

            // Iterate over token IDs in the current collection
            for (uint256 j = 0; j < tokenIds.length; j++) {
                uint256 tokenId = tokenIds[j];
                uint256 price = _tokenPrices[collection][tokenId];
                allTokens[index] = TokenInfo(collection, tokenId, price);
                index++;
            }
        }

        return allTokens;
    }

    function getTotalActiveTokens() internal view returns (uint256) {
        uint256 totalActiveTokens = 0;

        // Iterate over active collections
        for (uint256 i = 0; i < _activeCollectionsList.length; i++) {
            address collection = _activeCollectionsList[i];
            totalActiveTokens += _activeCollectionToTokenIds[collection].length;
        }

        return totalActiveTokens;
    }
}
