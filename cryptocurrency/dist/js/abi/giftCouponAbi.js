var giftCouponAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_couponCode",
				"type": "uint32"
			}
		],
		"name": "redeemCoupon",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getGiftCouponCodes",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_cost",
				"type": "uint256"
			},
			{
				"name": "_validity",
				"type": "uint256"
			},
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_noOfCoupon",
				"type": "uint256"
			}
		],
		"name": "createGiftCoupon",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_icoToken",
				"type": "address"
			},
			{
				"name": "_icoContract",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_cost",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_validity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_creator",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_title",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_noOfCoupon",
				"type": "uint256"
			}
		],
		"name": "couponGift",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "couponCode",
				"type": "uint256"
			}
		],
		"name": "couponRedeemed",
		"type": "event"
	}
]