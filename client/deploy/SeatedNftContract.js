// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// import ethers from 'hardhat'
import USDC from "./USDC.json" assert { type: "json" };
import compiledSessionFactory from "../src/compiledContracts/contracts/SessionFactory.sol/SessionFactory.json" assert { type: "json" };

async function main() {
  console.log(compiledSessionFactory.bytecode);
  const [owner] = await ethers.getSigners();
  console.log(owner);
  const balance = await owner.provider.getBalance(owner.address);
  console.log(balance);
  const balanceHuman = ethers.formatUnits(balance, 18);
  console.log(`Owner address: ${owner.address} with balance: ${balanceHuman}`);

  const contract = new ethers.Contract(
    "0x52D800ca262522580CeBAD275395ca6e7598C014",
    USDC,
    ""
  );
  const seatedFactory = await ethers.getContractFactory("SeatedNftContract");
  const seatedInstance = await seatedFactory.deploy(
    "1",
    "1", // Session
    "A", //Section
    100, //supply
    10, //startprice
    100, //price Cap
    1, //startSeat
    "Miley Cyrus", //event Name
    "0x52D800ca262522580CeBAD275395ca6e7598C014"
  );
  await seatedInstance.waitForDeployment();
  await contract
    .connect(owner)
    .approve(seatedInstance, ethers.parseUnits("2000", 6));
  console.log("seatedInstance address:", await seatedInstance.getAddress());
  const receipt = await seatedInstance.deploymentTransaction().wait();
  const gasUsed = receipt.gasUsed;
  console.log(gasUsed);
  const gasPrice = receipt.gasPrice;
  console.log(gasPrice);
  const transactionFee = gasUsed * gasPrice;
  const transactionFeeHuman = ethers.formatUnits(transactionFee, 18);
  console.log(`Deployed for ${transactionFeeHuman}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
