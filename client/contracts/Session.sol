// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ISeatedFactory.sol";
import "./IStandingFactory.sol";

contract Session is Ownable {
    mapping(string=>address) public sectionToAddress;
    string[] public sections;
    IStandingFactory private standingFactory;
    ISeatedFactory private seatedFactory;
    address sessionFactory;
    string[] nftMeta;
    uint public sessionId; 

    constructor(
        address _standingFactory,
        address _seatedFactory,
        address _sessionFactory,
        uint _eventId, 
        uint[] memory _supply,
        string[] memory _section,
        uint[] memory _startPrice,
        uint _sessionId,
        uint _priceCap,
        uint[] memory _startSeats,
        string[] memory _nftMeta
    ){
        standingFactory = IStandingFactory(_standingFactory);
        seatedFactory = ISeatedFactory(_seatedFactory);
        sessionFactory = _sessionFactory;
        nftMeta = _nftMeta;
        addStandingNFTContract(_eventId,_sessionId,_section[0],_supply[0],_startPrice[0],_priceCap,_nftMeta[0]);
        addSeatedNFTContract(_eventId,_sessionId,_section,_supply,_startPrice,_priceCap,_startSeats,_nftMeta[1]);
    }

    function addStandingNFTContract(
        uint _eventId, 
        uint _sessionId, 
        string memory _section,
        uint _supply,
        uint _startPrice,
        uint _priceCap,
        string memory _nftMeta) public onlyOwner{
            address standingInstance = standingFactory.addStandingNft(_eventId, _sessionId, _section, _supply, _startPrice, _priceCap, _nftMeta);
            sectionToAddress[_section] = standingInstance;
            sections.push(_section);
    }

     function addSeatedNFTContract(
        uint _eventId, 
        uint _sessionId, 
        string[] memory _section,
        uint[] memory _supply,
        uint[] memory _startPrice,
        uint _priceCap,
        uint[] memory _startSeats,
        string memory _nftMeta) public onlyOwner{
            uint length = _section.length;
            for(uint i = 1; i < length ;i++){
                address seatedInstance = seatedFactory.addSeatedNft(_eventId, _sessionId, _section[i], _supply[i], _startPrice[i], _priceCap, _startSeats[i], _nftMeta);
                sectionToAddress[_section[i]]=seatedInstance;
                sections.push(_section[i]);
            }
    }

    function getSections() public view returns(string[] memory){
        return sections;
    }

    function getSectionToAddress(string memory _section) public view returns(address){
        return sectionToAddress[_section];
    }

    function getAllSectionsAddress() public view returns(address[] memory){
        address[] memory tempAddresses = new address[](sections.length);
        for(uint i = 0; i<sections.length;i++){
            tempAddresses[i] = sectionToAddress[sections[i]];
        }
        return tempAddresses;
    }
    
}