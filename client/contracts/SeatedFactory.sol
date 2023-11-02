// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./SeatedNftContract.sol";

contract SeatedFactory is Ownable {
    
    address public constant usdc = 0x52D800ca262522580CeBAD275395ca6e7598C014;

    event NFTAdded(
        uint indexed eventId,
        uint indexed _sessionId, 
        string indexed section,
        address nftAddress,
        uint supply,
        uint startPrice,
        uint startSeat,
        string eventName
    );

    function addSeatedNft(uint _eventId, uint _sessionId, string memory _section, uint _supply, uint _startPrice, uint _priceCap, uint _startSeat, string memory _event) external returns(address){
        SeatedNftContract seatedInstance = new SeatedNftContract(_eventId,_sessionId,_section, _supply, _startPrice, _priceCap, _startSeat,  _event, usdc);
        address seatedInstanceAddress = address(seatedInstance);
        // eventToSectionToAddress[_eventId][_section]= seatedInstanceAddress;
        emit NFTAdded(_eventId,_sessionId, _section, seatedInstanceAddress, _supply, _startPrice, _startSeat, _event);
        return seatedInstanceAddress;
    }

    
}