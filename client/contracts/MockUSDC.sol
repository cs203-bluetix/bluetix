// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20{
    
    constructor() ERC20("MUSDC", "Mock USDC"){
        _mint(msg.sender,5000);
    }   

    function mint(address owner, uint256 amount) public {
        _mint(owner, amount);
    }

}