// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ITickets.sol";

//Deploys NFTContracts for each category in each event
contract SessionNftFactory is Ownable {
    //Keeps track of various sections of one session
    string[] internal seatedSections;
    address internal freeStandingSection; 
    //Keeps track of the addresses at which each contract has been deployed
    mapping(string=>address) internal sectionsToAddress;

    event NFTAdded(
        string indexed section,
        address nftAddress,
        address owner,
        uint supply,
        uint startPrice,
        uint startSeat,
        string indexed eventName
    );

    function addNft(ITickets _nft) public onlyOwner{
        address newNFT = address(_nft);
        string memory tmpSection = _nft.getSection();
        if(_nft.getStartSeat() != 0){
           seatedSections.push(_nft.getSection());
        }else{
            freeStandingSection=newNFT;
        }
        sectionsToAddress[_nft.getSection()]=newNFT;
        emit NFTAdded(tmpSection, newNFT, _nft.getOwner(), _nft.getSupply(), _nft.getStartPrice(), _nft.getStartSeat(), _nft.getEventName());
    }
    
    function getSeatedSections() public view returns (string[] memory) {
        return seatedSections;
    }
    
}