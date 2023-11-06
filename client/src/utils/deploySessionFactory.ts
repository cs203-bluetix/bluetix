import { ethers, run } from "hardhat";
import compiledSessionFactory from "compiledContracts/contracts/SessionFactory.sol/SessionFactory.json" assert {type:'json'}
import { magic } from "utils/magicSDK";


export interface NFTDetails {
    standingFactoryAddress: string;
    seatedFactoryAddress: string;
    eventId?: number; // You may need to specify the correct data type for eventId
    numSessions: number;
    sessionId: number[]; // You may need to specify the correct data type for sessionId
    sectionId: number[]; // You may need to specify the correct data type for sectionId
    supplyPerSection: number[]; // You may need to specify the correct data type for supplyPerSection
    startPrice: number[]; // You may need to specify the correct data type for startPrice
    priceCap: number;
    startSeats?: number[]; // You may need to specify the correct data type for startSeats
    nftMeta: string[]
}
  

