import chai from 'chai';
import hre from 'hardhat';

var assert = chai.assert;
var expect = chai.expect;

describe('SessionFactory', function () {
    let owner;
    let sessionFactoryContract;
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

      let price = [0.1,0.05,0.02,0.07,0.06,0.07,0.03,0.04,0.03,0.01,0.05]
        const maticToWeiConversionFactor = 10**18;
        const weiPrices = price.map(priceInMatic => BigInt(Math.floor(priceInMatic * maticToWeiConversionFactor)));
      // Deploy the SessionFactory contract
      const SessionFactory = await ethers.getContractFactory('SessionFactory');
      sessionFactoryContract = await SessionFactory.deploy(
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
        ["https://gateway.pinata.cloud/ipfs/QmcrY8ewAjqBAofL8EMF6LEyPitsnEMGicXfHqmA3cBxVD", "https://gateway.pinata.cloud/ipfs/QmZ6VB6oXntYxgBJeXf8Kshgb7RHYabBMGsxtwuEE589gZ"]
      );
  
      // Wait for the contract to be mined
      await sessionFactoryContract.waitForDeployment();
      console.log("Session Factory Instance address:", await sessionFactoryContract.getAddress());

    });
  
    it('should be initialized', async function () {
      expect(await sessionFactoryContract.getAddress()).to.not.be.null;
      expect(await sessionFactoryContract.getAddress()).to.not.be.empty;
    });
  

    it('should return Session Addresses', async function () {
      let session1 = await sessionFactoryContract.getSessionAddresses(1);

      console.log(session1);
    });
    // it('should emit a SessionCreated event', async function () {
    //   // Call the createSession function on the factory contract
    //   await expect(sessionFactoryContract.createSession()).to.emit(sessionFactoryContract,"SessionCreated");
    // });
    it('should return section addresses from each section', async function () {
      let session1 = await sessionFactoryContract.getSectionAddressesFromSession(1);
      
      console.log('Session 1 Addresses:', session1);
    });

  });
  