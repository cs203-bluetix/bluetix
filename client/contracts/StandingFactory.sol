// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./StandingNftContract.sol";

//Deploys NFTContracts for each category in each event
contract StandingFactory is Ownable {
    address public constant usdc = 0x52D800ca262522580CeBAD275395ca6e7598C014;

    event NFTAdded(
        uint eventId,
        uint indexed sessionId,
        string indexed section,
        address nftAddress,
        uint supply,
        uint startPrice,
        uint startSeat,
        string indexed eventName
    );

    function addStandingNft(uint _eventId, uint _sessionId, string memory _section, uint _supply, uint _startPrice, uint _priceCap, string memory _event) external returns(address){
        StandingNftContract standingInstance = new StandingNftContract(_eventId,_sessionId,_section, _supply, _startPrice, _priceCap, _event,usdc);
        emit NFTAdded(_eventId, _sessionId,_section, address(standingInstance), _supply, _startPrice,0,_event);
        return address(standingInstance);
    }
    
}