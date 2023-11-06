import {
  Network,
  Alchemy,
  AssetTransfersCategory,
  SortingOrder,
  NftOrdering,
} from "alchemy-sdk";
import { env } from "env.mjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NFTOrder, Transaction } from "store/types";
import { getReadableDate, getSimpleDate } from "utils/getSimpleDate";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<{
    nfts: { [k: string]: NFTOrder[] };
    transactions: { [k: string]: Transaction[] };
  }>
) {
  // Get data from request body
  const {
    address,
    chain,
    incomingAssetTransferPageKey,
    outgoingAssetTransferPageKey,
    limit,
  } = req.body;

  // Only allow POST requests
  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  // Set Alchemy settings based on the chain
  const settings = {
    apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI,
  };

  const alchemy = new Alchemy(settings);

  try {
    // Get outgoing asset transfers for the specified address
    const outgoingAssetTransfer = await alchemy.core.getAssetTransfers({
      category: [
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.SPECIALNFT,
      ],
      fromAddress: address,
      order: SortingOrder.DESCENDING,
      maxCount: limit ? limit : 100,
      excludeZeroValue: true,
      withMetadata: true,
      pageKey: outgoingAssetTransferPageKey
        ? outgoingAssetTransferPageKey
        : undefined,
    });

    // Filter out outgoing asset transfers with value equal to 0
    const filteredOutGoingAssetTransfer =
      outgoingAssetTransfer.transfers.filter(
        (assetTransfer) => assetTransfer.value && assetTransfer.value > 0
      );

    // Filter incoming asset transfers with value equal to 0
    // Add metadata to the outgoing asset transfers and structure them

    const nfts = (await alchemy.nft.getNftsForOwner(address)).ownedNfts.filter(
      (nft) => nft.title
    );

    const hashToTitle = new Map<string, string>();
    const datesToNfts = new Map<string, NFTOrder[]>();
    const datesToTransactions = new Map<string, Transaction[]>();

    const structuredNfts: NFTOrder[] = nfts.map((nft) => {
      if (!hashToTitle.has(nft.contract.address)) {
        hashToTitle.set(nft.contract.address, nft.title);
      }
      const { formattedDate } = getReadableDate(
        nft.acquiredAt?.blockTimestamp!
      );
      if (!datesToNfts.has(formattedDate)) datesToNfts.set(formattedDate, []);
      const result: NFTOrder = {
        from: nft.contract.address,
        contractDeployer: nft.contract.contractDeployer ?? "",
        deployedBlockNumber: nft.contract.deployedBlockNumber ?? -1,
        tokenId: nft.tokenId, //
        tokenType: nft.tokenType,
        title: nft.title, // Right side
        description: nft.description,
        timeLastUpdated: nft.timeLastUpdated,
        image: nft.rawMetadata?.image ?? "",
        balance: nft.balance,
      };
      datesToNfts.get(formattedDate)?.push(result);
      return result;
    });

    const structuredOutgoingAssetTransfer = filteredOutGoingAssetTransfer.map(
      (assetTransfer) => {
        const { formattedDate } = getReadableDate(
          assetTransfer.metadata.blockTimestamp
        );
        if (!datesToTransactions.has(formattedDate))
          datesToTransactions.set(formattedDate, []);
        const txn: Transaction = {
          to: assetTransfer.to!,
          value: assetTransfer.value!,
          asset: assetTransfer.asset!,
          hash: assetTransfer.hash,
          timestamp: assetTransfer.metadata.blockTimestamp,
          category: assetTransfer.category,
          title: hashToTitle.get(assetTransfer.to!),
        };
        datesToTransactions.get(formattedDate)?.push(txn);
        return txn;
      }
    );

    res.status(200).json({
      nfts: Object.fromEntries(datesToNfts),
      transactions: Object.fromEntries(datesToTransactions),
    });
  } catch (e) {
    console.warn(e);
    res.status(500);
  }
}
