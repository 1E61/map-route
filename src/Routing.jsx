import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing(props) {
  const map = useMap();
  console.log(props.a);

  useEffect(() => {
    if (!map) return;
    //[55.014784595581446,82.89010696464834]
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(props.a.lat1, props.a.lng1), L.latLng(props.a.lat2, props.a.lng2)],
      routeWhileDragging: true
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}