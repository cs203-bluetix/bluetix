"use client";
import "leaflet/dist/leaflet.css";

import Wrapper from "components/Seats/Wrapper";
import LandingLayout from "layouts/LandingLayout";
import { Role } from "store/types";

function Leaf() {
  return (
    <LandingLayout
      strict={true}
      permissions={[Role.USER, Role.ADMIN]}
      title="Ticket Seating"
      withNavbar
    >
      <Wrapper />
    </LandingLayout>
  );
}

export default Leaf;
