// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "./IBlast.sol";

contract WalletContract {
    uint256 private _priceOfNFT;
    uint256 private _depositedAmount;
    address payable private _buyer;
    address payable private _seller;
    address private _marketPlace;
    bool private _hasSellerClaimed;
    bool private _hasBuyerClaimed;
    modifier onlyOwner() {
        // only the marketplace owner modifier
        require(
            _marketPlace == msg.sender,
            "Only Marketplace Contract is allowed for deposits."
        );
        _;
    }
    modifier onlySeller() {
        require(_seller == msg.sender, "You are not the seller.");
        _;
    }
    modifier onlyBuyer() {
        require(_buyer == msg.sender, "You are not the buyer.");
        _;
    }
    event SellerIsPaid(address seller, uint256 pricePaid);
    event BuyerGetsBackLocked(address buyer, uint256 priceBuyer);
    event ContractDestroyed();

    // listForSale() in marketplace will deploy this contract.
    constructor(address marketplace, uint256 priceOfNFT) {
        // IBlast(0x4300000000000000000000000000000000000002)
        //     .configureAutomaticYield();
        _marketPlace = marketplace;
        _priceOfNFT = priceOfNFT;
    }

    function depositAmountByMarketplace(
        uint256 amount
    ) external payable onlyOwner {
        require(msg.value == amount, "Incorrect amount sent");
        _depositedAmount += amount;
    }

    function setSeller(address payable seller) external onlyOwner {
        _seller = seller;
    }

    function setBuyer(address payable buyer) external onlyOwner {
        _buyer = buyer;
    }

    function getTotalAmount() internal view returns (uint256) {
        uint256 _totalAmount = _depositedAmount + _priceOfNFT;
        return _totalAmount;
    }

    function checkIfClaimable() internal view returns (bool) {
        return (getTotalAmount() <= address(this).balance);
    }

    function claimBySeller() external payable onlySeller {
        require(checkIfClaimable(), "Not Claimable By Seller Yet.");
        _seller.transfer(_priceOfNFT);
        uint256 sellerClaimAmount = _priceOfNFT;
        _hasSellerClaimed = true;
        // Reset the price of NFT
        _priceOfNFT = 0;
        emit SellerIsPaid(_seller, sellerClaimAmount);
        destroyContractIfClaimed();
    }

    function claimByBuyer() external payable onlyBuyer {
        require(checkIfClaimable(), "Not Claimable By Buyer Yet.");
        // transfer total or claimable??
        uint256 amountPaid;
        if (_hasSellerClaimed) {
            amountPaid = address(this).balance;
            _buyer.transfer(address(this).balance);
        } else {
            amountPaid = _depositedAmount;
            _buyer.transfer(_depositedAmount);
        }
        _hasBuyerClaimed = true;
        emit BuyerGetsBackLocked(_buyer, amountPaid);
        destroyContractIfClaimed();
    }

    function getContractAmount() external view returns (uint256) {
        return address(this).balance;
    }

    function getPriceOfNFT() external view returns (uint256) {
        return _priceOfNFT;
    }

    function getDepositedAmount() external view returns (uint256) {
        return _depositedAmount;
    }

    // Self destruct the contract if both buyer and seller have claimed
    function destroyContractIfClaimed() private {
        if (_hasSellerClaimed && _hasBuyerClaimed) {
            emit ContractDestroyed();
            selfdestruct(payable(_marketPlace));
        }
    }
}
