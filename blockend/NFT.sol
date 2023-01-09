// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

/*
Struct:
NFT: creater address, nft name, nft symbol, nft tokenId, owner address, collection address, blockchain
Bid: bidder address, bid amount, highest bid, min bid

Enum: PENDING, LISTED, SOLD

Functions:
List NFT: request tokenID, collectionAddress, blockchain, minBidAmount, noOfDaysToSell
Bid On NFT: request tokenID and collection address and allow them to bid  amount where bidAmount > minBidAmount of that NFT
Sell NFT: NFT will be transfered to highest bidder and amount will be transfered to previous owner of the NFT
*/
contract NFTMA {

  //using the SafeMath library
  using SafeMath for uint256;

enum NFTStatus { PENDING, LISTED, SOLD }

struct NFT {
  address creator;
  string name;
  string symbol;
  uint256 tokenId;
  address payable owner;
  address collectionAddress;
  string blockchain;
  uint256 noOfDaysToSell;
  uint256 timestamp;
  NFTStatus status;
}

struct Bid {
  address bidder;
  uint256 bidAmount;
  uint256 highestBid;
  uint256 minBid;
}

mapping(uint256 => NFT) public nfts;
mapping(uint256 => Bid) public bids;

event ListedNFT(uint256 indexed NFTId, address indexed Owner, uint256 indexed TokenId);
event BidOnNFT(uint256 indexed NFTId, address indexed Owner, uint256 indexed BidAmount);
event SoldNFT(uint256 indexed NFTId, address indexed Seller, address indexed NewOnwer);

//Counters for assigning and updating momentIds
    using Counters for Counters.Counter;
    Counters.Counter private nftId;

function listNFT(uint256 _tokenId, address _collectionAddress, string memory _blockchain, uint256 _minBidAmount, uint256 _noOfDaysToSell) public {
  // Ensure that the NFT exists and is owned by the caller
  require(ERC721(_collectionAddress).ownerOf(_tokenId) == msg.sender, "Only the owner can list the NFT for sale");

  uint256 newNftId = nftId.current();

  // Ensure that the NFT has not already been listed
  require(nfts[newNftId].status != NFTStatus.LISTED, "NFT is already listed for sale");

  // Ensure that no of days is greater than zero
  require(_noOfDaysToSell > 0, "Number of days to sell must be greater than 0");

  // Update the NFT listing information
  nfts[newNftId].owner = payable(msg.sender);
  nfts[newNftId].name = ERC721(_collectionAddress).name();
  nfts[newNftId].symbol = ERC721(_collectionAddress).symbol();
  nfts[newNftId].tokenId = _tokenId;
  nfts[newNftId].status = NFTStatus.LISTED;
  nfts[newNftId].collectionAddress = _collectionAddress;
  nfts[newNftId].blockchain = _blockchain;
  bids[newNftId].minBid = _minBidAmount;
  nfts[newNftId].noOfDaysToSell = _noOfDaysToSell;
  nfts[newNftId].timestamp = block.timestamp.div(86400);

  nftId.increment();

  emit ListedNFT(newNftId, msg.sender, _tokenId);

}

function unlistNFT(uint256 tokenId) public {
  // Ensure that the NFT exists and is listed
  require(nfts[tokenId].status == NFTStatus.LISTED, "NFT is not currently listed for sale");

  // Update the NFT status
  nfts[tokenId].status = NFTStatus.PENDING;
}

function bidOnNFT(uint256 _nftId, uint256 _bidAmount) public payable {
  // Ensure that the NFT exists and is listed for sale
  require(nfts[_nftId].status == NFTStatus.LISTED, "NFT is not currently listed for sale");

  // Ensure that the bid amount is greater than the minimum bid
  require(_bidAmount > bids[_nftId].minBid, "Bid amount must be greater than the minimum bid");

  // Check if the bid is higher than the current highest bid
  if (_bidAmount > bids[_nftId].highestBid) {
    //lock the bid amount into the smart contract
    require (msg.value >= _bidAmount, 'Need to pay up!');
    // Update the highest bid information
    bids[_nftId].highestBid = _bidAmount;
    bids[_nftId].bidder = msg.sender;
  }

  emit BidOnNFT(_nftId, msg.sender, _bidAmount);
}

function sellNFT(uint256 _nftId) public {

  // Ensure that seller is selling the NFT in the sale time
  require(nfts[_nftId].timestamp.div(86400) - (block.timestamp).div(86400) >= nfts[_nftId].noOfDaysToSell, "Sale Period is over your NFT is unlisted now!");

  // Ensure that the NFT exists and is listed for sale
  require(nfts[_nftId].status == NFTStatus.LISTED, "NFT is not currently listed for sale");

  // Ensure that the caller is the owner of the NFT
  require(nfts[_nftId].owner == msg.sender, "Only the owner can sell the NFT");

  // Transfer the NFT to the highest bidder
  ERC721(nfts[_nftId].collectionAddress).transferFrom(msg.sender, bids[_nftId].bidder, nfts[_nftId].tokenId);
  
  // Transfer the bid amount to seller
  // Call returns a boolean value indicating success or failure.
  // This is the current recommended method to use.
  (bool sent, ) = nfts[_nftId].owner.call{value: bids[_nftId].highestBid}("");
  require(sent, "Failed to send Ether");

  // Update the NFT status
  nfts[_nftId].status = NFTStatus.SOLD;

  //return the locked ether to outBidders

  emit SoldNFT(_nftId, msg.sender, bids[_nftId].bidder);
}

function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    
}
