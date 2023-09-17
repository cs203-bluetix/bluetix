import Loading from "components/Suspense/Loading";
import * as seats from "mock/cat1.json";
import * as stage from "mock/stage.json";
import { useEffect } from "react";
import { GeoJSON, MapContainer, useMap } from "react-leaflet";
import { useStore } from "store/seat";
import { SeatNode } from "store/types";

function LeafletMap() {
  const { eventSession, addNode, nodes, setSelectedNode } = useStore();
  if (!eventSession) return <Loading />;
  return (
    <>
      <MapContainer
        className="h-full w-full"
        zoom={7}
        center={{ lat: 1.701939977460562, lng: -4.899902343750001 }}
      >
        <MapFunctions />
        <GeoJSON
          data={{ type: "FeatureCollection", ...seats }}
          style={{ color: "green", fillColor: "red" }}
          onEachFeature={(f, l) => {
            const id = f.properties.id;
            const info = eventSession.seats.find((s) => s.id == id);
            if (!info) return;
            const node: SeatNode = { feature: f, layer: l, info };
            addNode(node);
            l.on("click", () => {
              setSelectedNode(node);
            });
            l.on("mouseover", (e) => {
              l.bindPopup(`Number of seats: ${info?.numSeats}`, {
                className: "popup",
                closeButton: false,
              });
              l.openPopup();
            });

            l.on("mouseout", (e) => {
              l.closePopup();
            });

            l.on("mouseover", (e) =>
              e.target.setStyle({ color: "blue", fillColor: "yellow" })
            );
            l.on("mouseout", (e) => {
              e.target.setStyle({ color: "green", fillColor: "red" });
            });
            l.bindTooltip(`${f.properties.id}`, {
              direction: "center",
              className: "label",
              permanent: true,
            });
          }}
        ></GeoJSON>
        <GeoJSON
          data={{ type: "FeatureCollection", ...stage }}
          onEachFeature={(f, l) =>
            l.bindTooltip("STAGE", {
              direction: "center",
              className: "label",
              permanent: true,
            })
          }
        ></GeoJSON>
      </MapContainer>
    </>
  );
}

export default LeafletMap;

function MapFunctions() {
  const map = useMap();
  const setMap = useStore((state) => state.setMap);
  useEffect(() => {
    if (map) {
      setMap(map);
      map.attributionControl.remove();
      map.zoomControl.remove();
    }
  }, [map]);

  return null;
}
