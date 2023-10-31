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

      
      // Deploy the SessionFactory contract
      const SessionFactory = await ethers.getContractFactory('SessionFactory');
      sessionFactoryContract = await SessionFactory.deploy(
        standingFactoryAddress,
        seatedFactoryAddress,
        1,
        3,
        [1,2,3],
        ["A","B","C"],
        [30,20,30],
        [30,40,50],
        60,
        [100,20,40],
        "Miley"
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
      let session2 = await sessionFactoryContract.getSessionAddresses(2);
      let session3 = await sessionFactoryContract.getSessionAddresses(3);
      console.log(session1);
      console.log(session2);
      console.log(session3);
    });
    // it('should emit a SessionCreated event', async function () {
    //   // Call the createSession function on the factory contract
    //   await expect(sessionFactoryContract.createSession()).to.emit(sessionFactoryContract,"SessionCreated");
    // });
    it('should return section addresses from each section', async function () {
      let session1 = await sessionFactoryContract.getSectionAddressesFromSession(1);
      let session2 = await sessionFactoryContract.getSectionAddressesFromSession(2);
      let session3 = await sessionFactoryContract.getSectionAddressesFromSession(3);
      
      console.log('Session 1 Addresses:', session1);
      console.log('Session 2 Addresses:', session2);
      console.log('Session 3 Addresses:', session3);
    });

  });