import chai from 'chai';
import hre from 'hardhat';

var assert = chai.assert;
var expect = chai.expect;

describe("Testing Session NFT factory contract", function() {
    let owner;
    let addr1;
    let factoryInstance;
    let seatedInstance

    beforeEach(async function() {
        let seatedContractFactory = await ethers.getContractFactory("SeatedNftContract");
        let factoryContract = await ethers.getContractFactory("SessionNftFactory");
        [owner, addr1] = await ethers.getSigners();
        // string memory _section, uint _supply, uint _startPrice, uint _priceCap, uint _startSeat, string memory _event
        const factoryDeployed = await factoryContract.deploy();
        factoryInstance = await factoryDeployed.waitForDeployment();
        const seatedContract = await seatedContractFactory.deploy(
            "A", //Section
            100, //supply
            10, //startprice
            100,//price Cap
            1,//startSeat
            "Miley Cyrus" //event Name
        );
        seatedInstance = await seatedContract.waitForDeployment();
        console.log("Factory Instance address:", await factoryInstance.getAddress());
        console.log("VerificationInstance address:", await seatedInstance.getAddress());
      });

    it("Should be initialized", async()=>{
        expect(await factoryInstance.getAddress()).to.not.be.null;
        expect(await seatedInstance.getAddress()).to.not.be.null;;
        expect(await factoryInstance.getAddress()).to.not.be.empty;
        expect(await seatedInstance.getAddress()).to.not.be.empty;
        
    });

    it("Should add an NFT to the contract", async()=>{
        await factoryInstance.addNft(seatedInstance);
        const sections = await factoryInstance.getSeatedSections();
        expect(sections.length).to.equal(1);
    });

});
