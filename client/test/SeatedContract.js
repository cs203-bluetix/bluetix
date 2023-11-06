import chai from 'chai';
import hre from 'hardhat';

var assert = chai.assert;
var expect = chai.expect;

describe("Testing Seated NFT Contract's function", function() {
    let owner;
    let addr1;
    let seatedContract;
    let DeployedUSDC;
    beforeEach(async function() {
        [owner, addr1] = await ethers.getSigners();
        
        let seatedFactory = await ethers.getContractFactory("SeatedNftContract");

        // uint _eventId, uint _sessionId, string memory _section, uint _supply, uint _startPrice, uint _priceCap, uint _startSeat, string memory _nftMeta
        const seatedInstance = await seatedFactory.deploy(
            1, //eventId
            2,
            "A", //Section
            100, //supply
            BigInt(1000000000000000000), //startprice
            BigInt(1000000000000000000),//price Cap
            1, //start seat
            "www.haha.com"//nftMeta
        );
        seatedContract = await seatedInstance.waitForDeployment();

        
        console.log("VerificationInstance address:", await seatedContract.getAddress());
      });

    it("Should be initialized", async()=>{
        expect(await seatedContract.getAddress()).to.not.be.null;
        expect(await seatedContract.getAddress()).to.not.be.empty;
    })

    it("Should deploy with correct initial values", async function() {
        // Check the initial values of the contract
        expect(await seatedContract.section()).to.equal("A");
        expect(await seatedContract.supply()).to.equal(100);
        expect(await seatedContract.startPrice()).to.equal(1000000000000000000n);
        expect(await seatedContract.priceCap()).to.equal(1000000000000000000n);
        expect(await seatedContract.startSeat()).to.equal(1);
        // expect(await seatedContract.nftMeta()).to.equal("www.haha.com");
    });

    it("Should mint an NFT correctly", async function (){
        // Mint a single ticket

        await seatedContract.connect(addr1).mint(
            {
                value: 1000000000000000000n
            }
        );

        // Check the balance of the user
        const balance = await seatedContract.balanceOf(addr1.address, 1);
        expect(balance).to.equal(1);

        // Check the total supply and tokenId
        const ticketsLeft = await seatedContract.getTicketsLeft();
        expect(ticketsLeft).to.equal(99);
    });

    it("Should mint a batch of tickets correctly", async function() {
        // Mint a batch of 5 tickets
        await seatedContract.connect(addr1).mintBatch(5,
            {
                value: 5000000000000000000n 
            }
        );

        // Check the balance of the user for each ticket
        for (let i = 1; i <= 5; i++) {
            const balance = await seatedContract.balanceOf(addr1.address, i);
            expect(balance).to.equal(1);
        }

        // Check the total supply and tokenId
        const ticketsLeft = await seatedContract.getTicketsLeft();
        expect(ticketsLeft).to.equal(95);
    });

    it("Should map tokens to the right owners", async function(){
        await seatedContract.connect(addr1).mintBatch(5,
            {
                value: 5000000000000000000n 
            });
        
        for(let i = 1;i<=5;i++){
            expect(await seatedContract.tokenOwner(i)).to.equal(addr1.address);
        }
        
        await seatedContract.connect(addr1).mint({
            value: 1000000000000000000n
        });
        expect(await seatedContract.tokenOwner(6)).to.equal(addr1.address);
    });

    it("Should revert with no more seats",async function()  {
        await seatedContract.connect(addr1).mintBatch(100,
            {
                value: 100000000000000000000n
            });
        expect(await seatedContract.getTicketsLeft()).to.equal(0);
        await expect(seatedContract.connect(addr1).mint()).to.be.revertedWith("Sorry, we're sold out");
    });
})