import chai from 'chai';
import hre from 'hardhat';

var assert = chai.assert;
var expect = chai.expect;

describe("Testing Seated NFT factory contract", function() {
    let owner;
    let addr1;
    let seatedFactoryInstance;

    beforeEach(async function() {
        let seatedFactoryFactory = await ethers.getContractFactory("SeatedFactory");
        [owner, addr1] = await ethers.getSigners();
        // string memory _section, uint _supply, uint _startPrice, uint _priceCap, uint _startSeat, string memory _event
        const factoryDeployed = await seatedFactoryFactory.deploy();
        seatedFactoryInstance = await factoryDeployed.waitForDeployment();
        console.log("Seated Factory Instance address:", await seatedFactoryInstance.getAddress());
     
      });

    it("Should be initialized", async()=>{
        expect(await seatedFactoryInstance.getAddress()).to.not.be.null;
        expect(await seatedFactoryInstance.getAddress()).to.not.be.empty;
        
    });

    it("Should add an NFT", async()=>{
        const tempAddr = await seatedFactoryInstance.addSeatedNft.staticCall(1,1,"A",100,30,40,50,"Miley");
        console.log("This is address");
        console.log(tempAddr);
        expect(tempAddr).to.not.be.null;
        expect(tempAddr).to.not.be.empty;
    });

});
