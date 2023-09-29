// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

using Counters for Counters.Counter;
contract testNft is ERC1155{
    uint256 startPrice;
    uint256 immutable public TRAVIS;
    Counters.Counter private tokenId;

    constructor() ERC1155("https://bafkreigts3bpaar2ilhjnuo6eofwd7y3l7mxk5hjhtrx7ejobrsh3sdiai.ipfs.nftstorage.link/"){
        TRAVIS = 0;
        startPrice=10;
    }

    /*
    sets our URI and makes the ERC1155 OpenSea compatible
    */
    function uri(uint256 _tokenid) override public pure returns (string memory) {
        return "https://bafkreigts3bpaar2ilhjnuo6eofwd7y3l7mxk5hjhtrx7ejobrsh3sdiai.ipfs.nftstorage.link/";
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
        _mint(_userwallet, TRAVIS, 1, "");
    }
    
  
}

