import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.scss";
import { useState } from "react";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([25.04315, 121.55208]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      {/* <h1>Latitude: {lat}</h1>
      <h1>Longitude: {lng}</h1>

      <button onClick={() => setSearchParams({ lat: 69, lng: 69 })}>
        Generate Fake position
      </button>
      <button onClick={() => navigate("form")}>Go to Form</button> */}
    </div>
  );
}
