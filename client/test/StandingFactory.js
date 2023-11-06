import chai from 'chai';
import hre from 'hardhat';

var assert = chai.assert;
var expect = chai.expect;

describe("Testing Standing NFT factory contract", function() {
    let owner;
    let addr1;
    let standingFactoryInstance;

    beforeEach(async function() {
        [owner, addr1] = await ethers.getSigners();
        let standingFactoryFactory = await ethers.getContractFactory("StandingFactory");
        const factoryDeployed = await standingFactoryFactory.deploy();
        standingFactoryInstance = await factoryDeployed.waitForDeployment();
        console.log("Seated Factory Instance address:", await standingFactoryInstance.getAddress());
      });

    it("Should be initialized", async()=>{
        expect(await standingFactoryInstance.getAddress()).to.not.be.null;
        expect(await standingFactoryInstance.getAddress()).to.not.be.empty;
        
    });

    it("Should add an NFT", async()=>{
        const tempAddr = await standingFactoryInstance.addStandingNft.staticCall(1,1,"A",100,30,40,"Miley");
        console.log("This is address");
        console.log(tempAddr);
        expect(tempAddr).to.not.be.null;
        expect(tempAddr).to.not.be.empty;
    });

});
