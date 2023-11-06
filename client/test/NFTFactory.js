import chai from 'chai';
import hre from 'hardhat';

var assert = chai.assert;
var expect = chai.expect;

describe("Testing NFT factory contract", function() {
    let owner;
    let addr1;
    let factoryInstance;
    let seatedInstance

    beforeEach(async function() {
        [owner, addr1] = await ethers.getSigners();
        let NFTFactory = await new ethers.ContractFactory("NFTFactory",owner);
        // string memory _section, uint _supply, uint _startPrice, uint _priceCap, uint _startSeat, string memory _event
        const NFTFactoryDeployed = await NFTFactory.deploy();
        factoryInstance = await NFTFactoryDeployed .waitForDeployment();
        console.log("Factory Instance address:", await factoryInstance.getAddress());
      });

    it("Should be initialized", async()=>{
        expect(await factoryInstance.getAddress()).to.not.be.null;
        expect(await factoryInstance.getAddress()).to.not.be.empty;        
    });

});
