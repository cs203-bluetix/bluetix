import Loading from "components/Suspense/Loading";
import * as seats from "mock/important.json";
import * as stage from "mock/stage.json";
import { useEffect } from "react";
import { GeoJSON, MapContainer, useMap } from "react-leaflet";
import { useStore } from "store/seat";
import { SeatNode } from "store/types";

function LeafletMap() {
  const { eventSession, addNode, nodes, setSelectedNode, map } = useStore();

  if (typeof window === "undefined") return;

  if (!eventSession) return <Loading />;
  return (
    <>
      <MapContainer
        className="h-full w-full"
        zoom={2}
        center={{ lat: 12.224351672863321, lng: -56.32772132652329 }}
      >
        <MapFunctions />
        <GeoJSON
          data={{ type: "FeatureCollection", ...seats }}
          onEachFeature={(f, l) => {
            l.once("autopanstart", (e) => {
              if (f.properties.id === "Stage")
                e.target.setStyle({
                  color: "#000000",
                  weight: 0.5,
                  fillColor: "#FFFFFF",
                });
              else if (f.properties.cat === 1)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "yellow",
                });
              else if (f.properties.cat === 2)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "blue",
                });
              else if (f.properties.cat === 3)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "red",
                });
              else if (f.properties.cat === 4)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "green",
                });
              else if (f.properties.cat === 5)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "orange",
                });
              else if (f.properties.cat === 6)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "purple",
                });
            });
            l.fireEvent("autopanstart");
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
              e.target.setStyle({ color: "blue", fillColor: "green" })
            );

            l.on("mouseout", (e) => {
              if (f.properties.id === "Stage")
                e.target.setStyle({
                  color: "#000000",
                  weight: 0.5,
                  fillColor: "#FFFFFF",
                });
              else if (f.properties.cat === 1)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "yellow",
                });
              else if (f.properties.cat === 2)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "blue",
                });
              else if (f.properties.cat === 3)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "red",
                });
              else if (f.properties.cat === 4)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "green",
                });
              else if (f.properties.cat === 5)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "orange",
                });
              else if (f.properties.cat === 6)
                e.target.setStyle({
                  color: "black",
                  weight: 0.5,
                  fillColor: "purple",
                });
            });

            l.bindTooltip(`${f.properties.id}`, {
              direction: "center",
              className: "label",
              permanent: true,
            });
          }}
        ></GeoJSON>
        {/* <GeoJSON
          data={{ type: "FeatureCollection", ...stage }}
          onEachFeature={(f, l) =>
            l.bindTooltip("STAGE", {
              direction: "center",
              className: "label",
              permanent: true,
            })
          }
        ></GeoJSON> */}
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
