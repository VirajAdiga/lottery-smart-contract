const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery Contract", function(){
    let Lottery;
    let lottery;
    let manager;
    let player1, player2;

    beforeEach(async function(){
        Lottery = await ethers.getContractFactory("Lottery");
        [manager, player1, player2] = await ethers.getSigners();

        lottery = await Lottery.connect(manager).deploy();
    });

    it("Should allow players to enter", async function(){
        await lottery.connect(player1).enter({value: ethers.parseEther("0.02")});
        const players = await lottery.getPlayers();

        expect(players).to.deep.equal([player1.address]);
    });

    it("Should pick a winner", async function(){
        await lottery.connect(player1).enter({value: ethers.parseEther("0.02")});
        await lottery.connect(player2).enter({value: ethers.parseEther("0.02")});

        const initialBalance = await ethers.provider.getBalance(player1.address);

        await lottery.connect(manager).pickWinner();

        const finalBalance = await ethers.provider.getBalance(player1.address);
        const players = await lottery.getPlayers();

        expect(finalBalance > initialBalance);
        expect(players.length).to.equal(0);
    });

    it("Should not allow non-manager to pick a winner", async function(){
        await expect(lottery.connect(player1).pickWinner()).to.be.revertedWith("Only the manager can call this function");
    });
});
