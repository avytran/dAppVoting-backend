const Voting = artifacts.require("Voting");
const { expectRevert, time, expectEvent } = require("@openzeppelin/test-helpers");

contract("Voting System Full Integration Test", (accounts) => {
  const [admin, voter1, voter2, voter3] = accounts;
  let voting;

  beforeEach(async () => {
    const now = await time.latest();
    const startTime = now.add(time.duration.minutes(5));
    const endTime = startTime.add(time.duration.hours(1));

    voting = await Voting.new(startTime, endTime);
  });

  it("should enforce admin-only candidate management", async () => {
    await voting.addCandidate("Marcus Thorne", { from: admin });
    const candidate = await voting.candidates(1);
    assert.equal(candidate.name, "Marcus Thorne");

    await expectRevert(
      voting.addCandidate("Intruder", { from: voter1 }),
      "Only admin can add candidates"
    );
  });

  it("should only allow voting within the set time window", async () => {
    await voting.addCandidate("Elena Vance", { from: admin });

    await expectRevert(
      voting.vote(1, { from: voter1 }),
      "Voting is not active"
    );

    await time.increase(time.duration.minutes(6));

    await voting.vote(1, { from: voter1 });

    await time.increase(time.duration.hours(2));
    await expectRevert(
      voting.vote(1, { from: voter2 }),
      "Voting is not active"
    );
  });

  it("should process valid votes and reject duplicates or invalid IDs", async () => {
    await voting.addCandidate("Marcus Thorne", { from: admin });
    await time.increase(time.duration.minutes(6));

    await voting.vote(1, { from: voter1 });
    
    const hasVoted = await voting.hasVoted(voter1);
    assert.isTrue(hasVoted);

    await expectRevert(
      voting.vote(1, { from: voter1 }),
      "Already voted"
    );

    await expectRevert(
      voting.vote(99, { from: voter2 }),
      "Invalid ID"
    );
  });

  it("should update vote counts and emit events for the UI", async () => {
    await voting.addCandidate("Alice", { from: admin });
    await time.increase(time.duration.minutes(6));

    const receipt = await voting.vote(1, { from: voter2 });

    const candidate = await voting.candidates(1);
    assert.equal(candidate.voteCount.toNumber(), 1);

    expectEvent(receipt, "Voted", {
      voter: voter2,
      candidateId: "1"
    });
  });

  it("should provide transaction data for history logs", async () => {
    await voting.addCandidate("Bob", { from: admin });
    await time.increase(time.duration.minutes(6));

    const tx = await voting.vote(1, { from: voter3 });

    assert.exists(tx.tx);
    assert.exists(tx.receipt.blockNumber);
    
    const logs = await voting.getPastEvents("Voted");
    assert.isAtLeast(logs.length, 1);
  });
});