// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


using Counters for Counters.Counter;

contract StandingNftContract is ERC1155, Ownable{
    uint eventId;
    address public marketPlaceAddress;
    string public section;
    uint public sessionId;
    uint public supply;
    //Keeps a price Cap on the ticket to ensure no reselling
    uint public priceCap;
    //Indisectiones startPrice of the NFT
    uint public startPrice;
    //Keeps track of how many times the contract has been minted
    uint public mintCount;
    string public eventName;
    IERC20 public usdcToken;


    constructor(uint _eventId, uint _session, string memory _section, uint _supply, uint _startPrice, uint _priceCap, string memory _event, address _usdc)
    ERC1155(string(abi.encodePacked("https://myapi.com/api/NFT/",_event,"/","0.json"))){
        eventId = _eventId;
        sessionId = _session;
        section = _section;
        supply=_supply;
        startPrice = _startPrice;
        priceCap=_priceCap;
        mintCount = 0;
        eventName = _event;
        usdcToken = IERC20(_usdc);
    }

    /*
    sets our URI and makes the ERC1155 OpenSea compatible
    */
    function uri(uint256 _tokenid) override public view returns (string memory) {
        return string(abi.encodePacked("https://myapi.com/api/NFT/",eventName,"/",
                Strings.toString(_tokenid),".json"
            )
        );
    }

    function getTokenURI(uint256 _tokenid) public view returns (string memory) {
        return uri(_tokenid);
    }

    function mint() public payable
    {
        //Mint fee has to be equal to start price
        require(usdcToken.transferFrom(msg.sender, address(this), startPrice), "USDC transfer failed");
        //Number of tickets sold cannot exceed supply
        require(mintCount<supply,"Sorry, we're sold out");
        
        //Mint token for user
        _mint(msg.sender, 0, 1, "");
        mintCount++;
    }

    function mintBatch(uint256 _amount) public payable{
        require(_amount>1,"To use this function, there has to be more NFTs minted");
        require(_amount+mintCount<=supply,"The amount you wish to purchase is more than the tickets left");
        uint256 requiredAmt = _amount * startPrice;
        require(usdcToken.transferFrom(msg.sender, address(this), requiredAmt), "USDC transfer failed");
        uint[] memory myArray = new uint[](1);
        uint[] memory tokenIds = new uint[](1);
        myArray[0] = _amount;
        tokenIds[0]=0;
        _mintBatch(msg.sender,tokenIds, myArray, "");
        mintCount+=_amount;
    }

    function getTicketsLeft() public view returns (uint){
        return supply - mintCount;
    } 

    function getPriceCap() public view returns(uint){
        return priceCap;
    }

    function setMarketPlaceAddress(address _marketPlaceAddress) external onlyOwner {
        require(_marketPlaceAddress != address(0), "Invalid address");
        marketPlaceAddress = _marketPlaceAddress;
    }

    function approveMarket() public{
        require(!isApprovedForAll(msg.sender,marketPlaceAddress),"You have already approved the marketplace");
        setApprovalForAll(marketPlaceAddress,true);
    }

    function getStartSeat() external pure returns (uint){
        return 0;
    }

    function getSection() external pure returns (string memory){
        return "Standing section";
    }

    function getOwner() external view returns (address) {
        return owner();
    }

    function getSupply() external view returns (uint){
        return supply;
    }

    function getStartPrice() external view returns(uint){
        return startPrice;
    }

    function getEventName() external view returns(string memory){
        return eventName;
    }
}



