import React from "react";

interface DrawerProps {
  children: React.ReactNode;
  opened: boolean;
  zIndex?: number;
  width?: number;
  height?: number;
}

function Drawer({ children, opened, zIndex, width, height }: DrawerProps) {
  return (
    <div
      style={{ width: width ? `${width}px` : "100%" }}
      className={`absolute left-0 top-0 z-20 ${
        height ? `h-[${height}px]` : `h-full`
      } transform transition-all duration-300 ${
        opened ? "translate-x-0" : "-translate-x-full"
      } shadow-lg`}
    >
      {children}
    </div>
  );
}

export default Drawer;
