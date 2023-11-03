// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface ISeatedFactory{
    // Add any unique functions or properties specific to seating NFTs here
    function addSeatedNft(uint _eventId, uint _sessionId, string memory _section, uint _supply, uint _startPrice, uint _priceCap, uint _startSeat, string memory _nftMeta) external returns(address);

    function getSectionAddress(uint _eventId, string memory _section) external view returns(address);

}