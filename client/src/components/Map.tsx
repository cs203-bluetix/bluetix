import React, { useEffect, useRef, useState } from "react";
import Map from "react-map-gl";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3dlaWMiLCJhIjoiY2xsb3kxZzEzMDByMjNxcGkwOXd6Z291ZiJ9.dENhN7jx5klw3OOXofLeMw";
function MapComponent() {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/sweic/cllp8jkl3005i01nze1as5bwm",
      center: [-0.2043847756237085, 0.49178308011317995],
      zoom: zoom,
    });
    map.current.on("click", "seat-dlbdij", (e: any) => console.log(e.features));
  });

  return (
    <div className="h-full w-full">
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default MapComponent;

// mapbox://styles/sweic/cllp8jkl3005i01nze1as5bwm
