import { ActionIcon, Menu, Title } from "@mantine/core";
import { IconTriangleInverted } from "@tabler/icons-react";
import axios from "axios";
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
    const isWalletConnected = async () => {
      const isLogged = await magic?.user.isLoggedIn();
      setIsLogged(isLogged);
    };
    isWalletConnected();
  }, [magic?.user]);

  return (
    <div className="mx-auto h-screen max-w-[920px] px-7 py-[4.2rem] md:px-5">
      {isLogged != null && isLogged && !isLoading ? (
        <div className="flex w-full flex-col pt-4 ">
          <div className="w-fit">
            <Menu>
              <Menu.Target>
                <div className="flex items-center gap-4 bg-gray-100 px-2 py-2 hover:cursor-pointer hover:bg-gray-200">
                  <Title>{type === "nft" ? "NFTs" : "Transactions"}</Title>
                  <ActionIcon variant="subtle" className="pt-2">
                    <IconTriangleInverted size={16} />
                  </ActionIcon>
                </div>
              </Menu.Target>
              <Menu.Dropdown className="w-full">
                <Menu.Item
                  onClick={() =>
                    setType((prev) => (prev === "nft" ? "transaction" : "nft"))
                  }
                >
                  {type === "nft" ? "Transactions" : "NFTs"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <div className="w-full pt-12">
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
  return <div>nft</div>;
};

const TransactionViewer = ({
  transactions,
}: {
  transactions: { [k: string]: Transaction[] };
}) => {
  return <div>txn</div>;
};
