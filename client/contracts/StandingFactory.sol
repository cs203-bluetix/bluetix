// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./StandingNftContract.sol";

//Deploys NFTContracts for each category in each event
contract StandingFactory is Ownable {
    event NFTAdded(
        uint indexed eventId,
        uint indexed sessionId,
        string indexed section,
        address nftAddress,
        uint supply,
        uint startPrice,
        uint startSeat,
        string nftMeta
    );

    function addStandingNft(uint _eventId, uint _sessionId, string memory _section, uint _supply, uint _startPrice, uint _priceCap, string memory _nftMeta) external returns(address){
        StandingNftContract standingInstance = new StandingNftContract(_eventId,_sessionId,_section, _supply, _startPrice, _priceCap, _nftMeta);
        emit NFTAdded(_eventId, _sessionId,_section, address(standingInstance), _supply, _startPrice,0,_nftMeta);
        return address(standingInstance);
    }
    
}