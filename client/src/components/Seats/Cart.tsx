import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconShoppingCart, IconX } from "@tabler/icons-react";
import Drawer from "components/Drawer/Drawer";
import { useCheckout } from "hooks/useCheckout";
import { useState } from "react";
import { useStore } from "store/seat";
import { CartItem, SeatNode } from "store/types";
// import tempAbi from  "abi/contracts/testNFT.sol/testNFT.json";

function Cart() {
  const [opened, setOpened] = useState(false);
  const { cart, setSelectedNode, eventSession } = useStore();
  const { loading, checkoutHandler } = useCheckout();

  return (
    <div>
      <Drawer opened={opened} zIndex={500}>
        <div className="flex h-full w-full flex-col gap-2 bg-gray-200">
          <div className="flex h-12 w-full items-center justify-end pr-4 ">
            <ActionIcon onClick={() => setOpened(false)}>
              <IconX />
            </ActionIcon>
          </div>
          <div className="mx-2 mb-4 mt-2 flex flex-col gap-2 md:mx-4">
            {cart.cartItems.map((c) => {
              return <CartItem item={c} />;
            })}
          </div>
          <Divider />
          <div className="mx-2 flex flex-col gap-8 pt-2 md:mx-4">
            <h2 className="font-bold uppercase tracking-wider text-gray-600">
              Cart Summary
            </h2>
            <div className="flex w-full flex-col items-end justify-end gap-4 ">
              <div className="flex w-[200px] justify-between">
                <span className="font-semibold uppercase tracking-tight text-gray-600">
                  Subtotal
                </span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex w-[200px] justify-between ">
                <span className="font-semibold uppercase tracking-tight text-gray-600">
                  Service Fees
                </span>
                <span>${0}</span>
              </div>
              <div className="flex w-[200px] justify-between">
                <span className="font-semibold uppercase tracking-tight text-gray-600">
                  Total
                </span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>
              <Button
                loading={loading}
                onClick={() => checkoutHandler(eventSession?.sessionAddress!)}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
      <div
        className="absolute bottom-4 right-8 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl bg-blue-400 hover:bg-blue-500"
        onClick={() => {
          setOpened(true);
          setSelectedNode(null);
        }}
      >
        <IconShoppingCart className="stroke-slate-100 hover:stroke-white" />
      </div>
    </div>
  );
}

export default Cart;

const CartItem = ({ item }: { item: CartItem }) => {
  const { nodes, cart, setNodes, setCart } = useStore();

  const onRemove = () => {
    const currentNode = nodes.find((n) => n.info.id === item.seatId);
    if (!currentNode) return;

    const newNode: SeatNode = {
      ...currentNode,
      info: {
        ...currentNode.info,
        numSeats: currentNode.info.numSeats + item.totalSeats,
      },
    };
    const newNodes = nodes.map((n) =>
      n.info.id !== item.seatId ? n : newNode
    );
    const cartItems = cart.cartItems.filter((c) => c.seatId != item.seatId);

    setNodes(newNodes);
    setCart({
      ...cart,
      cartItems: cartItems,
      totalPrice: cart.totalPrice - item.price * item.totalSeats,
    });
  };

  return (
    <div className="flex h-[150px] w-full flex-col justify-between rounded-md bg-white px-4 py-4 shadow-sm">
      <div className="flex w-full justify-between">
        <span>
          Section {item.seatId} • Category {item.category}
        </span>
        <span className="pr-4">
          ${(item.totalSeats * item.price).toFixed(2)}
        </span>
      </div>
      <div className="flex w-full justify-between">
        <span>QTY: {item.totalSeats}</span>
        <Button
          variant="subtle"
          className="uppercase"
          onClick={() => onRemove()}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};
