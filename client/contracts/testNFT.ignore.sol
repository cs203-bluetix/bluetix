// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";


contract testNFT is ERC1155{

    constructor() ERC1155("https://bafkreigts3bpaar2ilhjnuo6eofwd7y3l7mxk5hjhtrx7ejobrsh3sdiai.ipfs.nftstorage.link/"){
    }

    /*
    sets our URI and makes the ERC1155 OpenSea compatible
    */
    function uri(uint256 _tokenid) override public pure returns (string memory) {
        return "https://bafkreigts3bpaar2ilhjnuo6eofwd7y3l7mxk5hjhtrx7ejobrsh3sdiai.ipfs.nftstorage.link/";
    }

    function getTokenURI(uint256 _tokenId) public pure returns (string memory) {
        return "https://bafkreigts3bpaar2ilhjnuo6eofwd7y3l7mxk5hjhtrx7ejobrsh3sdiai.ipfs.nftstorage.link/";
    }

    /*
    mint(address account, uint _id, uint256 amount)

    account - address to mint the token to
    _id - the ID being minted
    amount - amount of tokens to mint
    */

    function mint(address _userwallet) external 
    { 
        _mint(msg.sender, 0, 1,"");
    }
    

}

