// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {

    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    modifier restricted {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function enter() public payable{
        require(msg.value > 0.01 ether, "Minimum contribution is 0.01 ether");
        players.push(msg.sender);
    }

    function random() private view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted {
        require(players.length > 0, "No players in the lottery");

        uint index = random() % players.length;
        address winner = players[index];
        payable(winner).transfer(address(this).balance);
        players = new address[](0);
    }
}