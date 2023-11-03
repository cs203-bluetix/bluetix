// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IStandingFactory{
    // Add any unique functions or properties specific to seating NFTs here
    function addStandingNft(uint _eventId, uint _sessionId, string memory _section, uint _supply, uint _startPrice, uint _priceCap, string memory _nftMeta) external returns(address);
    function getStandingSections(uint _eventId) external view returns(address);
}