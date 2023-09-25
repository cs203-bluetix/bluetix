import chai from 'chai';
import hre from 'hardhat';

var assert = chai.assert;
var expect = chai.expect;

describe('SessionFactory', function () {
    let owner;
    let sessionFactoryContract;
  
    beforeEach(async function () {
      // Get the signers (accounts) from Hardhat
      [owner] = await ethers.getSigners();
  
      // Deploy the SessionFactory contract
      const SessionFactory = await ethers.getContractFactory('SessionFactory');
      sessionFactoryContract = await SessionFactory.deploy();
  
      // Wait for the contract to be mined
      await sessionFactoryContract.waitForDeployment();
    });
  
    it('should create a new session', async function () {
      // Call the createSession function on the factory contract
      await sessionFactoryContract.createSession();
  
      // Verify that a session was created
      const sessions = await sessionFactoryContract.getSessions();
      expect(sessions.length).to.equal(1);
    });
  
    it('should emit a SessionCreated event', async function () {
      // Call the createSession function on the factory contract
      await expect(sessionFactoryContract.createSession()).to.emit(sessionFactoryContract,"SessionCreated");
    });
  });