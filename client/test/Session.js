import chai from 'chai';
import hre from 'hardhat';

var assert = chai.assert;
var expect = chai.expect;

describe('session', function () {
    let owner;
    let sessionContract;
    let seatedFactoryInstance;
    let standingFactoryInstance;
  
    beforeEach(async function () {
      // Get the signers (accounts) from Hardhat
      [owner] = await ethers.getSigners();
      //Deploy SeatedFactory Address
      let seatedFactoryFactory = await ethers.getContractFactory("SeatedFactory");
      const seatedFactoryDeployed = await seatedFactoryFactory.deploy();
      seatedFactoryInstance = await seatedFactoryDeployed.waitForDeployment();
      let seatedFactoryAddress = await seatedFactoryInstance.getAddress();
      console.log("Seated Factory Instance address: ", seatedFactoryAddress);

      //Deploy StandingFactory Address
      let standingFactoryFactory = await ethers.getContractFactory("StandingFactory");
      const standingfactoryDeployed = await standingFactoryFactory.deploy();
      standingFactoryInstance = await standingfactoryDeployed.waitForDeployment();
      let standingFactoryAddress = await standingFactoryInstance.getAddress();
      console.log("Standing Factory Instance address:", standingFactoryAddress);

      
      // Deploy the Session contract
      const session = await ethers.getContractFactory('Session');
      sessionContract = await session.deploy(
        standingFactoryAddress,
        seatedFactoryAddress,
        seatedFactoryAddress,
        1,
        [1,2,3,4,5,6,7,8,9,10], //Supply
        ["F01","F02","F03","PB1","PB2","PB3","PC2","PC3","PD2","PD3"], //section
        ["10","20","30","40","50","60","70","80","90","100"], //startPrice
        20,//_sessionId
        60,//PriceCap
        [10,20,30,40,50,60,70,80,90,100],//startSeats
        ['https://gateway.pinata.cloud/ipfs/QmP9A4q4zAjpcm5oygcmxkuhi2j1EXNABSXzj2Tw8aedaq', 'https://gateway.pinata.cloud/ipfs/QmU7zGv2hicSeZuqumjJwvU2YXcwUwdbJ2dzjXx5rNwfX1']
      );
  
      // Wait for the contract to be mined
      await sessionContract.waitForDeployment();
      console.log("Session Factory Instance address:", await sessionContract.getAddress());

    });
  
    it('should be initialized', async function () {
      expect(await sessionContract.getAddress()).to.not.be.null;
      expect(await sessionContract.getAddress()).to.not.be.empty;
    });

    it('should print all section addresses', async function () {
      console.log(await sessionContract.getAllSectionsAddress());
    });

  });
  