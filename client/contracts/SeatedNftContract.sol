// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


using Counters for Counters.Counter;
using SafeMath for uint256;

contract SeatedNftContract is ERC1155, Ownable, ReentrancyGuard{
    address public marketPlaceAddress;
    string public section;
    uint public supply;
    uint public priceCap;
    uint public startPrice;
    uint public startSeat;
    string public eventName;
    // IERC20 public usdcToken;

    Counters.Counter private tokenId;

    //Maps token to its current owner
    mapping(uint256=>address) public tokenOwner;

    constructor(string memory _section, uint _supply, uint _startPrice, uint _priceCap, uint _startSeat, string memory _event) 
    ERC1155(string(abi.encodePacked("https://myapi.com/api/NFT/",_event,"/","{id}.json"))){
        section = _section;
        supply=_supply;
        priceCap=_priceCap;
        startSeat=_startSeat;
        startPrice = _startPrice;
        eventName = _event;
    }

    /*
    sets our URI and makes the ERC1155 OpenSea compatible
    */
    function uri(uint256 _tokenid) override public view  returns (string memory) {
        return string(abi.encodePacked("https://myapi.com/api/NFT/",eventName,"/",
                Strings.toString(_tokenid),".json"
            )
        );
    }

    function getTokenURI(uint256 _tokenId) public view  returns (string memory) {
        return string(abi.encodePacked("https://myapi.com/api/NFT/",eventName,"/", 
        Strings.toString(_tokenId), ".json"));
    }

    /*
    mint(address account, uint _id, uint256 amount)

    account - address to mint the token to
    _id - the ID being minted
    amount - amount of tokens to mint
    */

    function mint(address _userwallet) external payable
    {
        //Mint fee has to be equal to start price
        require(msg.value == startPrice, "Amount sent must be equal to the required price");
        
        //Number of tickets sold cannot exceed supply
        require(tokenId.current()<supply,"Sorry, we're sold out");
        
        //Assign seat Number
        uint256 newTokenId = startSeat+tokenId.current();
        _mint(_userwallet, newTokenId, 1, "");

        tokenOwner[newTokenId] = msg.sender;
        //Increments tokenId
        tokenId.increment();
        
    }
    
    /*
    mintBatch(address to, uint256[] memory _ids, uint256[] memory amounts, bytes memory data)

    to - address to mint the token to
    _ids - the IDs being minted
    amounts - amount of tokens to mint given ID
    bytes - additional field to pass data to function
    */
    function mintBatch(address to, uint256 _amounts)
        public payable
    {
        //Number of tickets sold cannot exceed supply
        require(tokenId.current().add(_amounts) <= supply, "Sorry, we're sold out");

        //Amount sent has to be lower than the required price
        uint256 totalRequiredPrice = _amounts.mul(startPrice);
        require(msg.value == totalRequiredPrice, "Amount sent is lower than the required price"); 

        //Create an array of Ids & Create an array of item assigned to each ID
        uint256[] memory tmpIDArr = new uint256[](_amounts);
        uint256[] memory amounts = new uint256[](_amounts);

        for (uint256 i = 0; i < _amounts; i++) {
            uint tmpTokenId = startSeat.add(tokenId.current()); 
            tmpIDArr[i] = tmpTokenId;
            tokenOwner[tmpTokenId] = msg.sender;
            tokenId.increment();
            amounts[i] = 1;
        }

        _mintBatch(to, tmpIDArr, amounts, "");
    }

    function getTicketsLeft() public view returns (uint){
        return supply - tokenId.current();
    } 

    function setMarketPlaceAddress(address _marketPlaceAddress) external onlyOwner {
        require(_marketPlaceAddress != address(0), "Invalid address");
        marketPlaceAddress = _marketPlaceAddress;
    }

    function approveMarket() public{
        require(!isApprovedForAll(msg.sender,marketPlaceAddress),"You have already approved the marketplace");
        setApprovalForAll(marketPlaceAddress,true);
    }

    function getOwner() external view returns (address) {
        return owner();
    }

    function getSection() external view returns (string memory){
        return section;
    }

    function getStartSeat() external view returns (uint){
        return startSeat;
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

