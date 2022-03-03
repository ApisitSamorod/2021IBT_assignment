// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

contract B6210571_BCT_Hotel_assignment {
    address private owner;
    mapping (bytes32 => room_t) Room;
    string[5] roomsName;

    event reserveError( address from, string reason);

    struct room_t {
        address reserved_by;
        bool exist;
        bool avaible;
        uint price;
        uint time;
    }

    constructor () {
        owner = msg.sender;
        _initRoom();
    }

    // 5 total room
    //  ROOM A, B, C, D, E
    function _initRoom() private {
        roomsName[0] = "ROOM A";
        roomsName[1] = "ROOM B";
        roomsName[2] = "ROOM C";
        roomsName[3] = "ROOM D";
        roomsName[4] = "ROOM E";
        
        _addRoom( "ROOM A", 0.057 * 1e18 );
        _addRoom( "ROOM B", 0.035 * 1e18 );
        _addRoom( "ROOM C", 0.071 * 1e18 );
        _addRoom( "ROOM D", 0.044 * 1e18 );
        _addRoom( "ROOM E", 0.046 * 1e18 );
    }
    
    function reserve(string memory name) public payable {
        bytes32 hash = hashing(name);

        if ( !Room[hash].exist ) {
            payable(msg.sender).transfer(msg.value);
            emit reserveError(msg.sender, "This room does not exist");
            return;
        }

        if ( !Room[hash].avaible ) {
            payable(msg.sender).transfer(msg.value);
            emit reserveError(msg.sender, "This room has been reserved");
            return;
        }

        if ( Room[hash].price != msg.value ) {
            payable(msg.sender).transfer(msg.value);
            emit reserveError(msg.sender, "incorrect payment please check the price");
            return;
        }

        Room[hash].avaible = false;
        Room[hash].reserved_by = msg.sender;
        Room[hash].time = block.timestamp;
    }

    function _addRoom( string memory name, uint price ) private {
        Room[ hashing(name) ] = room_t({
            reserved_by: address(0),
            exist: true,
            avaible: true,
            price: price,
            time: 0
        });
    }

    function roomStatus(string memory name) public view returns (room_t memory) {
        return Room[hashing(name)];
    }

    function allRoom() public view returns (string[5] memory) {
        return roomsName;
    }

    function hashing(string memory name) private pure returns (bytes32) {
        return sha256(bytes(name));
    }
}