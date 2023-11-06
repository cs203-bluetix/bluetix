// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// import ethers from 'hardhat'
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    const [owner] = await ethers.getSigners();
    console.log(owner);
    const balance = await owner.provider.getBalance(owner.address);
    console.log(balance);
    const balanceHuman = ethers.formatUnits(balance, 18);
    console.log(`Owner address: ${owner.address} with balance: ${balanceHuman}`);
    const standingFactoryAddress = "0xb2Ed70E76E90Ca0D62e3C3C9918aeA22c1b51f4A"
    const seatedFactoryAddress = "0x625546F45C3256CF8EC4Fee3C027B93CbeE0026A"
    const SessionFactory = await ethers.getContractFactory("SessionFactory");
    console.log(seatedFactoryAddress);
    console.log(standingFactoryAddress);
    let price = [0.1,0.05,0.02,0.07,0.06,0.07,0.03,0.04,0.03,0.01,0.05]
    const maticToWeiConversionFactor = 10**18;
    const weiPrices = price.map(priceInMatic => BigInt(Math.floor(priceInMatic * maticToWeiConversionFactor)));
      // Deploy the SessionFactory contract
    const SessionFactoryInstance = await SessionFactory.deploy(
        standingFactoryAddress,
        seatedFactoryAddress,
        1,
        1,
        [1],
        ["PB1","PB3","PC3","PD3","PE3","PF5","PF4","PF3","PF2","PE2","PD2"],
        [200,200,200,200,200,200,200,200,200,200,200],
        weiPrices,
        BigInt(60*10**18),
        [0,1,201,401,601,801,1001,1201,1401,1601,1801],
        ["https://gateway.pinata.cloud/ipfs/QmVZK1PYEpQ4QsDD9njZawno7K1NpmfrygfDwotxEt5UvD", "https://gateway.pinata.cloud/ipfs/QmNeZh8tKamjn5bSRgQUHpXepzYFPJB15QpD8GAPXVtt6u"]
      );
    await SessionFactoryInstance.waitForDeployment();
    console.log("Session Factory Instance address:", await SessionFactoryInstance.getAddress());
    const receipt = await SessionFactoryInstance.deploymentTransaction().wait();
    const addresses = await SessionFactoryInstance.getSessionAddresses(1);
    console.log("These are the" + addresses);
    const gasUsed = receipt.gasUsed;
    console.log(gasUsed);
    const gasPrice = receipt.gasPrice;
    console.log(gasPrice);
    const transactionFee = gasUsed*gasPrice;
    const transactionFeeHuman = ethers.formatUnits(transactionFee, 18) 
    console.log(`Deployed for ${transactionFeeHuman}`); 
    }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  