import chai from 'chai';
import hre from 'hardhat';

var assert = chai.assert;
var expect = chai.expect;

describe("Testing standing NFT Contract's function", function() {
    let owner;
    let addr1;
    let standingContract;
    let DeployedUSDC

    beforeEach(async function() {
        [owner, addr1] = await ethers.getSigners();

        let USDC = await ethers.getContractFactory("MockUSDC");
        let usdcToken = await USDC.deploy();
        DeployedUSDC = await usdcToken.waitForDeployment();
        let usdcAddress = await DeployedUSDC.getAddress();

        let standingFactory = await ethers.getContractFactory("StandingNftContract");
        // string memory _section, uint _supply, uint _startPrice, uint _priceCap, uint _startSeat, string memory _event
        const standingInstance = await standingFactory.deploy(
            "A", //Section
            100, //supply
            10, //startprice
            100,//price Cap
            "Miley Cyrus", //event Name
            usdcAddress
        );
        standingContract = await standingInstance.waitForDeployment();
        await DeployedUSDC.mint(addr1.address, ethers.parseUnits("2000", 6)); // 2000 USDC
        await DeployedUSDC.connect(addr1).approve(standingContract.getAddress(), ethers.parseUnits("2000", 6));
        console.log("Standing Contract address:", await standingContract.getAddress());
      });

    it("Should be initialized", async()=>{
        expect(await standingContract.getAddress()).to.not.be.null;
        expect(await standingContract.getAddress()).to.not.be.empty;
        expect(await DeployedUSDC.getAddress()).to.not.be.null;
        expect(await DeployedUSDC.getAddress()).to.not.be.empty;
    })

    it("Should deploy with correct initial values", async function() {
        // Check the initial values of the contract
        expect(await standingContract.section()).to.equal("A");
        expect(await standingContract.supply()).to.equal(100);
        expect(await standingContract.startPrice()).to.equal(10);
        expect(await standingContract.priceCap()).to.equal(100);
        expect(await standingContract.eventName()).to.equal("Miley Cyrus");
    });

    it("Should mint an NFT correctly", async function (){
        // Mint a single ticket
        await standingContract.connect(addr1).mint();

        // Check the balance of the user
        const balance = await standingContract.balanceOf(addr1.address, 0);
        expect(balance).to.equal(1);

        // Check the total supply and tokenId
        const ticketsLeft = await standingContract.getTicketsLeft();
        expect(ticketsLeft).to.equal(99);
    });

    it("Should mint a batch of tickets correctly", async function() {
        // Mint a batch of 5 tickets
        await standingContract.connect(addr1).mintBatch(5);

        // Check the balance of the user for each ticket
       
        const balance = await standingContract.balanceOf(addr1.address, 0);
        expect(balance).to.equal(5);
        

        // Check the total supply and tokenId
        const ticketsLeft = await standingContract.getTicketsLeft();
        expect(ticketsLeft).to.equal(95);
    });

    it("Should map tokens to the right owners", async function(){
        await standingContract.connect(addr1).mintBatch(5);
        
        expect(await standingContract.balanceOf(addr1.address,0)).to.equal(5);
        
        
        await standingContract.connect(addr1).mint();
        expect(await standingContract.balanceOf(addr1.address,0)).to.equal(6);
    });

    it("Should revert with no more seats",async function()  {
        await standingContract.connect(addr1).mintBatch(100);
        expect(await standingContract.getTicketsLeft()).to.equal(0);
        await expect(standingContract.connect(addr1).mint()).to.be.revertedWith("Sorry, we're sold out");
    });


})