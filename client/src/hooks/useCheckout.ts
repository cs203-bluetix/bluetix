import axios from "axios";
import abi from "compiledContracts/contracts/SeatedNftContract.sol/SeatedNftContract.json";
import sessionAbi from "compiledContracts/contracts/Session.sol/Session.json";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStore } from "store/seat";
import { SERVER_API_QUEUE_LEAVE_URL } from "utils/globals";
import { magic } from "utils/magicSDK";

export const useCheckout = () => {
  const { cart, setSelectedNode } = useStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const checkoutHandler = async (sessionAddress: string) => {
    if (cart.cartItems.length == 0 || !router) return;
    setLoading(true);
    const params = router.query;
    const leaveEndpoint = `${SERVER_API_QUEUE_LEAVE_URL}/${params.slug![0]}/${
      params.slug![1]
    }`;
    try {
      let userPublicKey = (await magic?.wallet.connectWithUI())![0] ?? "";

      console.log(userPublicKey);
      const provider = magic?.rpcProvider
        ? new ethers.BrowserProvider(magic?.rpcProvider)
        : null;

      if (!provider) {
        throw new Error(
          "Provider not available. Contract cannot be initialized."
        );
      }
      const signer = await provider?.getSigner();

      // Retrieve session ID
      // Get Session ID transaction/contract addr
      // Make sessionId contract interface to interact with session contract
      // Call getSectionToAddress(*place section ID here*) to get section address
      // Make Section contract interface to interact with section contract
      // Use USDC to approve section to spend signer's money
      // Call mint on section contract

      // This is the session address you fetch from the db.
      const sessionContract = new ethers.Contract(
        "0xB7893A9DeBb4885d5fc3453f20252e7195f974E0",
        sessionAbi["abi"],
        signer
      );

      //Official new address for Seated contract
      // const contractAddr = "0x18bf8d00302EfD826f01daEae39CaCc0E2A29803";

      // Use the session address to get specific sections.
      const contractAddr = await sessionContract.getSectionToAddress?.("F01");

      console.log(contractAddr);
      let testAbi = abi["abi"];

      const contract = new ethers.Contract(contractAddr, testAbi, signer);

      console.log("shown");
      const mintAmount = await contract.getStartPrice?.();

      console.log("This is mint amount: " + mintAmount);
      const gasPrice = ethers.parseUnits("40", "gwei");
      // console.log(gasPrice);
      // do some error handling here
      const estimatedGas = await contract.mint?.estimateGas?.({
        value: mintAmount,
      });
      const tx = await contract.mint?.({
        value: mintAmount,
        gasLimit: estimatedGas,
      });
      console.log("here");
      console.log(tx);
      const receipt = await tx.wait();
      console.log(receipt);
      const resp = await axios
        .delete(leaveEndpoint)
        .finally(() => (window.location.href = "/orders"));
      // const transactionFee = receipt.gasPrice.mul(receipt.gasUsed);
      // const transactionFeeHuman = ethers.formatUnits(transactionFee, 18);
      // console.log(`You spent ${transactionFeeHuman} matic`)

      await magic?.wallet.showUI();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, setLoading, checkoutHandler };
};
