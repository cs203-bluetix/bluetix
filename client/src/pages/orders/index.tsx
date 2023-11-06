import { ActionIcon, Avatar, Badge, Divider, Tabs } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import axios from "axios";
import dayjs from "dayjs";
import LandingLayout from "layouts/LandingLayout";
import { useRouter } from "next/router";
import Loading from "pages/load/loading";
import { useEffect, useState } from "react";
import { NFTOrder, Role, Transaction } from "store/types";
import { magic } from "utils/magicSDK";

function Orders() {
  return (
    <LandingLayout
      permissions={[Role.ADMIN, Role.USER]}
      strict
      title="Ticket Orders"
      withNavbar
      withFooter
      withStyle={false}
    >
      <OrderPage />
    </LandingLayout>
  );
}

export default Orders;

const OrderPage = () => {
  const [data, setData] = useState<{
    nfts: { [k: string]: NFTOrder[] };
    transactions: { [k: string]: Transaction[] };
  }>({ nfts: {}, transactions: {} });
  const [isLogged, setIsLogged] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<"nft" | "transaction">("nft");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userPublicKey = (await magic?.wallet.connectWithUI())![0] ?? "";
        const resp = await axios.post("/api/transactions", {
          address: userPublicKey,
        });
        if (resp.status === 200) {
          setData(resp.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router.pathname]);

  useEffect(() => {
    if (!data.nfts) return;
    const isWalletConnected = async () => {
      const isLogged = await magic?.user.isLoggedIn();
      setIsLogged(isLogged);
    };
    isWalletConnected();
  }, [data, magic?.user]);

  return (
    <div className="mx-auto min-h-screen  max-w-[920px] px-3 py-[4.2rem] text-white sm:px-5 md:px-7">
      {isLogged != null && isLogged && !isLoading ? (
        <div className="flex w-full flex-col pt-4 ">
          <div className="w-fit">
            <Tabs variant="pills" radius="md" value={type}>
              <Tabs.List>
                <Tabs.Tab
                  className="group"
                  value="nft"
                  onClick={() => setType("nft")}
                >
                  <span
                    className={`text-white ${
                      type === "transaction" && "group-hover:text-black"
                    }`}
                  >
                    NFTs
                  </span>
                </Tabs.Tab>
                <Tabs.Tab
                  className="group"
                  value="transaction"
                  onClick={() => setType("transaction")}
                >
                  <span
                    className={`text-white ${
                      type === "nft" && "group-hover:text-black"
                    }`}
                  >
                    Transactions
                  </span>
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </div>
          <div className="w-full">
            {type === "nft" ? (
              <NFTViewer nfts={data.nfts} />
            ) : (
              <TransactionViewer transactions={data.transactions} />
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

const NFTViewer = ({ nfts }: { nfts: { [k: string]: NFTOrder[] } }) => {
  return (
    <div>
      {Object.entries(nfts).map(([date, arr]) => (
        <div className="mt-8">
          <span className="font-semibold tracking-tight">
            {dayjs(date).format("MMMM D, YYYY")}
          </span>
          <div className="mb-4"></div>
          <Divider />
          <div>
            {arr.map((nft) => (
              <div
                className=" flex h-[80px] w-full justify-between px-2 py-2 hover:cursor-pointer hover:bg-gray-700"
                onClick={() =>
                  window.open(
                    `https://testnets.opensea.io/assets/mumbai/${nft.from}/${nft.tokenId}`,
                    "_blank"
                  )
                }
              >
                <div className="flex w-fit  items-center gap-4 ">
                  <div>
                    <ActionIcon
                      radius="xl"
                      size="lg"
                      variant="light"
                      className="gray"
                    >
                      <IconArrowDown color="green" />
                    </ActionIcon>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Receive</span>
                    <span className="text-gray-400"></span>
                  </div>
                </div>
                <div className="flex w-[300px] items-center justify-start gap-3">
                  <Avatar
                    variant="filled"
                    radius="xl"
                    size="lg"
                    src={nft.image}
                  />
                  <span>{nft.title}</span>
                </div>
                <div className="flex max-w-[100px] flex-col gap-2">
                  <span className="pl-2 text-sm text-gray-400">From</span>
                  <Badge color="Gray" variant="light" className="w-full">
                    <span className="truncate">{nft.from}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

const TransactionViewer = ({
  transactions,
}: {
  transactions: { [k: string]: Transaction[] };
}) => {
  return (
    <div>
      {Object.entries(transactions).map(([date, arr]) => (
        <div className="mt-8">
          <span className="font-semibold tracking-tight">
            {dayjs(date).format("MMMM D, YYYY")}
          </span>
          <div className="mb-4"></div>
          <Divider />
          <div>
            {arr.map((transaction) => (
              <div
                className="flex h-[80px] w-full justify-between rounded-md px-4 py-2 hover:cursor-pointer hover:bg-gray-700"
                onClick={() =>
                  window.open(
                    `https://mumbai.polygonscan.com/tx/${transaction.hash}`,
                    "_blank"
                  )
                }
              >
                <div className="flex w-fit  items-center gap-4 ">
                  <div>
                    <ActionIcon
                      radius="xl"
                      size="lg"
                      variant="light"
                      className="gray"
                    >
                      <IconArrowUp color="red" />
                    </ActionIcon>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Send</span>
                    <span className="text-gray-400"></span>
                  </div>
                </div>
                <div className="flex w-[300px] w-fit items-center gap-3">
                  <Avatar
                    variant="filled"
                    radius="xl"
                    size="md"
                    src="/matic-logo.png"
                  />
                  <div className="flex flex-col ">
                    <span>{transaction.asset}</span>
                    <span className="tracking-tight text-gray-400">
                      ${transaction.value}
                    </span>
                  </div>
                </div>
                <div className="flex max-w-[100px] flex-col gap-2">
                  <span className="pl-2 text-sm text-gray-400">From</span>
                  <Badge color="Gray" variant="light" className="w-full">
                    <span className="truncate">{transaction.to}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};
