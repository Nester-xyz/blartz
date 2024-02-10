import { ethers } from "hardhat";
import { expect } from "chai";
import { BlastNFTFactory } from "../typechain-types/contracts/BlastNFTFactory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BlastNFT, Marketplace } from "../typechain-types";

describe("BlastNFTFactory", function () {
  let BlastNFTFactoryInstance: BlastNFTFactory;
  let marketplaceInstance: Marketplace;
  let owner: SignerWithAddress;
  let creator: SignerWithAddress;
  let otherAccount: SignerWithAddress
  beforeEach(async function () {
    // Get the signers
    [owner, creator, otherAccount] = await ethers.getSigners();

    // Deploy the BlastNFTFactory contract
    const BlastNFTFactory = await ethers.getContractFactory("BlastNFTFactory");
    BlastNFTFactoryInstance = await BlastNFTFactory.deploy() as BlastNFTFactory;

    // Deploy the Marketplace contract using the BlastNFTFactory address
    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplaceInstance = await Marketplace.deploy(await BlastNFTFactoryInstance.getAddress());

    // Set the marketplace address in the BlastNFTFactory contract
    await BlastNFTFactoryInstance.setMarketplace(await marketplaceInstance.getAddress());
  });

  describe("createCollection", function () {
    it("should create a new BlastNFT contract", async function () {
      await BlastNFTFactoryInstance.createCollection("Test Collection", "TEST");

      const createdCollection = await BlastNFTFactoryInstance.getCreatorCollections();
      expect(createdCollection.length).to.equal(1);
    });

    it("should assign a unique collectionId", async function () {
      const initialId = await BlastNFTFactoryInstance._getCollectionIdCounter();
      await BlastNFTFactoryInstance.createCollection("Test Collection", "TEST");
      const finalId = await BlastNFTFactoryInstance._getCollectionIdCounter();

      expect(finalId).to.equal(initialId + BigInt(1));
    });

    it("should create the contract and contract owner should be the collection creator", async function () {
      const name = "Test Collection";
      const symbol = "TEST";

      // Dispatch transaction once
      const connectedFactory = BlastNFTFactoryInstance.connect(creator);
      const tx = await connectedFactory.createCollection(name, symbol);
      const receipt = await tx.wait();

      // Get the address of the newly created BlastNFT contract
      const newContractAddress = receipt?.logs[0].address;

      // Retrieve the owner of the newly created BlastNFT contract
      const contractOwner = await ethers.getContractAt("BlastNFT", newContractAddress);

      // Assert that the owner of the contract is the collection creator
      expect(await contractOwner.owner()).to.equal(creator.address);
    });
  });

  describe("NFT contract", function () {
    let nftContract: BlastNFT;
    beforeEach(async function () {
      // make a collection 
      const tx = await BlastNFTFactoryInstance.createCollection("Tester", "TESTNFT");
      const receipt = await tx.wait();

      const newContractAddress = receipt?.logs[0].address;
      nftContract = await ethers.getContractAt("BlastNFT", newContractAddress)
    });
    it("should mint the nft", async function () {
      // Mint a new NFT
      const tokenURI = "https://example.com/nft";
      const tokenName = "Example NFT";
      await nftContract.mintNFT(tokenURI, tokenName);

      // Get the total number of tokens after minting
      const totalTokens = await nftContract.getTokenLen();

      // Get the token details
      const [uri, name] = await nftContract.getURIAndName(totalTokens - BigInt(1));

      // Check if the token URI and name match the minted values
      expect(uri).to.equal(tokenURI);
      expect(name).to.equal(tokenName);
    });

    it("should revert when a non-collection owner tries to mint an NFT", async function () {
      // Attempt to mint an NFT from an account that is not the collection owner
      const tokenURI = "https://example.com/nft";
      const tokenName = "Example NFT";
      await expect(nftContract.connect(otherAccount).mintNFT(tokenURI, tokenName))
        .to.be.revertedWith("You are not the owner of this collection");
    });

    it("should emit the correct event when minting a new NFT", async function () {
      // Mint a new NFT
      const tokenURI = "https://example.com/nft";
      const tokenName = "Example NFT";
      const mintTx = await nftContract.mintNFT(tokenURI, tokenName);
      // Expect the NFTMinted event to be emitted with the correct parameters
      await expect(mintTx).to.emit(nftContract, "NFTMinted")
        .withArgs(0, await marketplaceInstance.getAddress(), owner.address, tokenURI, tokenName);
    });
  })

  describe("MarketPlace", function () {
    let nftContract: BlastNFT;
    let newCollectionAddress;
    let tokenId: any;
    beforeEach(async function () {
      // make a collection 
      const tx = await BlastNFTFactoryInstance.createCollection("Tester", "TESTNFT");
      const receipt = await tx.wait();

      newCollectionAddress = receipt?.logs[0].address;
      nftContract = await ethers.getContractAt("BlastNFT", newCollectionAddress)
      // Mint a new NFT
      const tokenURI = "https://example.com/nft";
      const tokenName = "Example NFT";
      await nftContract.mintNFT(tokenURI, tokenName);
      // should approve the tokenId
      tokenId = await nftContract.getTokenLen() - BigInt(1);
    });

    it("should revert when a non-owner tries to list an NFT for sale", async function () {
      await expect(marketplaceInstance.connect(otherAccount)
        .toggleNFTForSale(newCollectionAddress, tokenId, ethers.parseEther("1")))
        .to.be.revertedWith("You are not the owner of the NFT");
    });

    it("should revert if collection is not created by the factory", async function () {
      const tokenId = await nftContract.getTokenLen() - BigInt(1);

      // Attempt to list the NFT for sale using the marketplace contract
      await expect(marketplaceInstance.toggleNFTForSale(await BlastNFTFactoryInstance.getAddress(), tokenId, ethers.parseEther("1")))
        .to.be.revertedWith("Collection not created by the factory");
    });

    it("should list an NFT for sale", async function () {
      const priceInBlast = ethers.parseEther("1"); // Price of 1 Blast
      console.log(priceInBlast);
      await marketplaceInstance.toggleNFTForSale(newCollectionAddress, tokenId, priceInBlast);
      const isNFTListed = await marketplaceInstance.isNFTListed(newCollectionAddress, tokenId);
      expect(isNFTListed).to.equal(true);
    });
    it("should revert when purchasing an NFT that is not listed for sale", async function () {
      // Attempt to purchase an NFT that is not listed for sale
      await expect(marketplaceInstance.connect(otherAccount)
        .purchaseNFT(newCollectionAddress, tokenId, { value: ethers.parseEther("1") }))
        .to.be.revertedWith("NFT not listed for sale");
    });

    it("should revert when trying to purchase an NFT from the current owner", async function () {
      const priceInBlast = ethers.parseEther("1"); // Price of 1 Blast
      await marketplaceInstance.toggleNFTForSale(newCollectionAddress, tokenId, priceInBlast);

      // Attempt to purchase the NFT from the current owner
      await expect(marketplaceInstance.purchaseNFT(newCollectionAddress, tokenId, { value: priceInBlast }))
        .to.be.revertedWith("Buyer is the current owner of the token");
    });

    it("should revert when trying to purchase an NFT from the current owner", async function () {
      const priceInBlast = ethers.parseEther("1"); // Price of 1 Blast
      await marketplaceInstance.toggleNFTForSale(newCollectionAddress, tokenId, priceInBlast);

      // Attempt to purchase the NFT from the current owner
      await expect(marketplaceInstance.purchaseNFT(newCollectionAddress, tokenId, { value: priceInBlast }))
        .to.be.revertedWith("Buyer is the current owner of the token");
    });

    it("should revert when purchasing an NFT that is not approved for sale", async function () {
      const priceInBlast = ethers.parseEther("1"); // Price of 1 Blast
      await marketplaceInstance.toggleNFTForSale(newCollectionAddress, tokenId, priceInBlast);
      // Comment line below if you require to pass this test
      // await nftContract.approveMarketplaceNFT(tokenId);
      // Ensure that the NFT is not approved for sale by the marketplace contract
      await expect(marketplaceInstance.connect(otherAccount)
        .purchaseNFT(newCollectionAddress, tokenId, { value: priceInBlast }))
        .to.be.revertedWith("NFT must be approved to market");
    });

    it("should purchase an NFT listed for sale", async function () {
      // approve to marketplace before listing for sale by owner account
      await nftContract.approveMarketplaceNFT(tokenId);

      const priceInBlast = ethers.parseEther("1"); // Price of 1 Blast
      await marketplaceInstance.toggleNFTForSale(newCollectionAddress, tokenId, priceInBlast);

      // Purchase the NFT 
      const initialBalance = BigInt(await ethers.provider.getBalance(otherAccount.address));
      await marketplaceInstance.connect(otherAccount).purchaseNFT(newCollectionAddress, tokenId, { value: priceInBlast });
      const finalBalance = BigInt(await ethers.provider.getBalance(otherAccount.address));

      // Check if the owner's balance increased by the sale price
      const actualAmountSpent = initialBalance - finalBalance;
      expect(actualAmountSpent).to.be.closeTo(BigInt(priceInBlast), ethers.parseEther("0.0001"));

      // Check if the NFT is no longer listed for sale
      const isNFTListed = await marketplaceInstance.isNFTListed(newCollectionAddress, tokenId);
      expect(isNFTListed).to.be.false;

      // Check if the buyer is now the owner of the NFT
      const nftOwner = await nftContract.ownerOf(tokenId);
      expect(nftOwner).to.equal(otherAccount.address);
    });
  })
});
