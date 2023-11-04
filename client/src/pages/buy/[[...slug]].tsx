"use client";
import "leaflet/dist/leaflet.css";

import SeatWrapper from "components/Seats/SeatWrapper";
import LandingLayout from "layouts/LandingLayout";
import { Role } from "store/types";
import QueueWrapper from "components/Seats/QueueWrapper";

function SeatSelection() {
  return (
    <LandingLayout
      strict={true}
      permissions={[Role.USER, Role.ADMIN]}
      title="Ticket Seating"
      withNavbar
    >
      <QueueWrapper>
        <SeatWrapper />
      </QueueWrapper>
    </LandingLayout>
  );
}

export default SeatSelection;
