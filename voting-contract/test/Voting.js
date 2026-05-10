const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Voting System", function () {
  async function deployVotingFixture() {
    const [owner, addr1] = await ethers.getSigners();
    const start = await time.latest();
    const end = start + 3600;

    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(start, end);

    return { voting, owner, addr1, start, end };
  }

  it("Should allow a user to vote", async function () {
    const { voting, addr1 } = await deployVotingFixture();
    await voting.connect(addr1).vote(1);
    const candidate = await voting.candidates(1);
    expect(candidate.voteCount).to.equal(1);
  });

  it("Should fail if voting twice", async function () {
    const { voting, addr1 } = await deployVotingFixture();
    await voting.connect(addr1).vote(1);
    await expect(voting.connect(addr1).vote(1)).to.be.revertedWith("Already voted");
  });
});