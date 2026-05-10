const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const startTime = currentTimestampInSeconds;
  const endTime = startTime + (3600 * 24);

  console.log("Voting contract is ongoing...");

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(startTime, endTime);

  await voting.waitForDeployment();

  console.log("-----------------------------------------");
  console.log(`Voting Contract is implemented in: ${await voting.getAddress()}`);
  console.log(`Start time: ${new Date(startTime * 1000).toLocaleString()}`);
  console.log(`End time: ${new Date(endTime * 1000).toLocaleString()}`);
  console.log("-----------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});