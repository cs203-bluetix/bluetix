// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";


interface ITickets is IERC1155{
    // Add any unique functions or properties specific to seating NFTs here

    function getTicketsLeft() external view returns (uint);

    function getSection() external view returns (string memory);

    function getOwner() external view returns (address);

    function getStartSeat() external view returns (uint);

    function getSupply() external view returns (uint);

    function getStartPrice() external view returns(uint);

    function getEventName() external view returns (string memory);
}