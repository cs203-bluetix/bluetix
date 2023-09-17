import {
  ActionIcon,
  Button,
  NumberInput,
  NumberInputHandlers,
  rem,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import Drawer from "components/Drawer/Drawer";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "store/seat";
import { Cart, CartItem, SeatNode } from "store/types";

function SeatDrawer() {
  const [value, setValue] = useState<number | "">(0);
  const handlers = useRef<NumberInputHandlers>();
  const { selectedNode, setSelectedNode, map, nodes, setNodes, cart, setCart } =
    useStore();

  const onAdd = () => {
    if (!selectedNode || value == "" || value == 0) return;
    const newQuantity = selectedNode.info.numSeats - value;
    const newNode: SeatNode = {
      ...selectedNode,
      info: {
        ...selectedNode.info,
        numSeats: newQuantity,
      },
    };

    const targetId = selectedNode.info.id;
    const existingItem = cart.cartItems.find((c) => c.seatId === targetId);
    const newCartItem: CartItem = existingItem
      ? {
          ...existingItem,
          totalSeats: existingItem.totalSeats + value,
        }
      : {
          seatId: targetId,
          price: selectedNode.info.price,
          category: selectedNode.info.category,
          totalSeats: value,
        };
    const newCartItems = existingItem
      ? cart.cartItems.map((c) => (c.seatId !== targetId ? c : newCartItem))
      : [...cart.cartItems, newCartItem];

    const newCart: Cart = {
      walletAddress: cart.walletAddress,
      cartItems: newCartItems,
      totalPrice: cart.totalPrice + value * selectedNode.info.price,
    };
    const newNodes = nodes.map((n) => (n.info.id !== targetId ? n : newNode));
    toast.success("Added to cart successfully!");
    setCart(newCart);
    setNodes(newNodes);
    setSelectedNode(newNode);
  };

  return (
    <Drawer opened={!!selectedNode}>
      {selectedNode && (
        <div className="flex h-full w-full flex-col gap-4 bg-gray-100">
          <div className="flex h-12 w-full items-center justify-end pr-4 pt-2">
            <ActionIcon
              onClick={() => {
                setSelectedNode(null);
                setValue(0);
                map?.setZoom(7);
                map?.setView(map.getBounds().getCenter());
              }}
            >
              <IconX />
            </ActionIcon>
          </div>
          <div className="mx-2 md:mx-4">
            <div className="flex gap-2"></div>
            <div className="flex flex-col gap-1">
              <span>
                <span className="text-xl font-bold">
                  ${selectedNode.info.price}
                </span>{" "}
                each
              </span>
              <span>
                Category {selectedNode.info.category}, Section{" "}
                {selectedNode.info.id}
              </span>
              <span>Number of seats left: {selectedNode.info.numSeats}</span>
            </div>
            <div className="mt-4 flex gap-2 ">
              <div className="flex items-center gap-2">
                <ActionIcon
                  size={42}
                  variant="default"
                  onClick={() => handlers?.current!.decrement()}
                >
                  -
                </ActionIcon>

                <NumberInput
                  hideControls
                  value={value}
                  onChange={(val) => setValue(val)}
                  handlersRef={handlers}
                  max={selectedNode.info.numSeats}
                  min={0}
                  step={1}
                  styles={{ input: { width: rem(54), textAlign: "center" } }}
                />

                <ActionIcon
                  size={42}
                  variant="default"
                  onClick={() => handlers?.current!.increment()}
                >
                  +
                </ActionIcon>
              </div>
              <div className="flex items-center">
                <Button onClick={() => onAdd()}>Add to checkout</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}

export default SeatDrawer;
