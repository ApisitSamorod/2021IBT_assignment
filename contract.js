var currentAccount = null;
var roomsName = Array(5);
var room = Object();

async function loadWeb3() {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable();
	}
}

if (window.ethereum!=undefined) {
	window.ethereum
		.request({ method: 'eth_accounts' })
		.then(handleAccountsChanged)
		.catch((err) => {
		console.error(err);
		});
	window.ethereum.on('accountsChanged', handleAccountsChanged);
}

function handleAccountsChanged(accounts) {
	if (accounts.length === 0) {
		console.log('Please connect to MetaMask.');
	} else if (accounts[0] !== currentAccount) {
		currentAccount = accounts[0];
	}
}

async function loadContract() {
	return await new window.web3.eth.Contract(abi, contractAddr);
}

async function load() {
	await loadWeb3();
	window.contract = await loadContract();
	await getRoomName();
	await getRoomStatus().then(()=>{
		loadimage();
		updatetable();
	});
}

// get all room in the sever
async function getRoomName() {
	await window.contract.methods.allRoom().call((err,res)=>{
		if (err) {

		} else {
			roomsName = Array.from( String( res ).split(',') )
		}
	});
}

// get room status
async function getRoomStatus() {
	for (let i=0; i<roomsName.length; i++) {
		await window.contract.methods.roomStatus(roomsName[i]).call((err,res)=>{
			if (err) {

			} else {
				room[roomsName[i]] = {
					utc : res.time,
					owner : res.reserved_by,
					price : res.price,
					available: res.avaible,
					name : roomsName[i]
				};
			}
		});
	}

	console.log(room)
}

async function reserve(name) {
	let obj = room[name];

	if (obj.available) {
		window.contract.methods.reserve(name).send({from: currentAccount, value: obj.price }, (err,res)=>{
			console.log(err);
			console.log(res);
			if (res) {
				getRoomStatus().then(()=>{
					updatetable();
				});
			}
		});
		window.contract.once('reserveError', {}, (err,ev)=>{
			console.log(ev.returnValues.reason);
		});
	} else {
		console.log("this room already has owner");
	}
}

const card_template = ( name, imagepath, price ) => {
	return (
		`<div class="room-card">
		<div>
			<img src="${imagepath}">
			<div class="room-info">
				<div class="room-name">
					${name ?? ""}
				</div>
				<div>
					<div class="room-price">
						${price/1e18+" eth"}
					</div>
					<button class="reserve-button" onClick="reserve('${name}')" ${room[name].available ? "":"disabled"}>
						Reserve
					</button>
				</div>
			</div>
		</div>`
	)
}

const table_template = (name, address, time) => {
	let date = new Date(0);
	date.setUTCSeconds(+time);
	return (
		`<tr>
			<td>${ time!=undefined ? date.toDateString() +" "+ date.toLocaleTimeString() : " "}</td>
			<td>${name ?? " "}</td>
			<td>${address ?? " "}</td>
		</tr>`
	)
}

async function loadimage() {
	let roomcard = document.getElementById("room-card-container");

	for (let i=0;i<roomsName.length; i++) {
		let obj = room[roomsName[i]];
		roomcard.innerHTML += card_template(obj.name, image[i], obj.price)
	}
}

async function updatetable() {
	const header = (
		`<tr>
			<th id="table-time-label">Time</th>
			<th id="table-room-label">Room</th>
			<th id="table-owner-label">Owner</th>
		</tr>`
	);
	let table = document.getElementById("reserve-table");
	table.innerHTML = header;
	let sorted = Array();
	
	for (let i=0; i<roomsName.length; i++)
		sorted.push(room[roomsName[i]]);
	
	sorted.sort( (a,b)=> {
		return parseInt(a.utc) - parseInt(b.utc);
	});
	let c = 0;
	for (let i=0;i<roomsName.length; i++) {
		let obj = sorted[i];
		if ( !obj.available ) {
			table.innerHTML += 
			table_template(obj.name, obj.owner, obj.utc);
			c++;
		}
	}

	for (let i=c; i<roomsName.length; i++)
		table.innerHTML += 
		table_template(undefined, undefined, undefined);
}

load();