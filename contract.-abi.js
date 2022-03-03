const contractAddr = "0x3D5751CC659B69dD36493d44E6B8955007a3aDfb"

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "reserveError",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "allRoom",
		"outputs": [
			{
				"internalType": "string[5]",
				"name": "",
				"type": "string[5]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "reserve",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "roomStatus",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "reserved_by",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "exist",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "avaible",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct B6210571_BCT_Hotel_assignment.room_t",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const image = Array()

image[0] = "img/pexels-pixabay-259962.jpg"
image[1] = "img/pexels-pixabay-271624.jpg"
image[2] = "img/pexels-pixabay-276724.jpg"
image[3] = "img/pexels-sharath-g-2251247.jpg"
image[4] = "img/pexels-wolfgang-mandl-6039763.jpg"