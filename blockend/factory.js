import web3 from './web3'

const abiFactory = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_nftId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bidAmount",
				"type": "uint256"
			}
		],
		"name": "bidOnNFT",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "NFTId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "Owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "BidAmount",
				"type": "uint256"
			}
		],
		"name": "BidOnNFT",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "NFTId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "Owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			}
		],
		"name": "ListedNFT",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_collectionAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_blockchain",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_minBidAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_noOfDaysToSell",
				"type": "uint256"
			}
		],
		"name": "listNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_nftId",
				"type": "uint256"
			}
		],
		"name": "sellNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "NFTId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "Seller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "NewOnwer",
				"type": "address"
			}
		],
		"name": "SoldNFT",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "unlistNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bids",
		"outputs": [
			{
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "highestBid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minBid",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nfts",
		"outputs": [
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "collectionAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "blockchain",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "noOfDaysToSell",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "enum NFTMA.NFTStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const instance = new web3.eth.Contract(abiFactory, '01x');
export default instance;