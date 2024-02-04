import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.scss";
import { useEffect, useState } from "react";
import useCity from "../../hooks/useCityContext";
import useGeolocation from "../../hooks/useGeolocation";
import Button from "../Button/Button";

export default function Map() {
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  const [mapPosition, setMapPosition] = useState([25.105497, 121.597366]);
  const { cities } = useCity();
  const {
    isLoading: isLoadingPosition,
    position: geoPosition,
    getGeolocation,
  } = useGeolocation();

  // Handle side effect: synchronize mapPosition state with mapLat and mapLng
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  // Synchronize geoPosition and mapPosition
  useEffect(() => {
    if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getGeolocation}>
        {isLoadingPosition ? "Loading..." : "Get your location"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={4}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji}
                {city.name}
              </span>
              <span>{city.notes ? city.notes : null}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (event) => {
      {
        // Pass the lat and lng to URL when clicking on the Map
        navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`, {
          // Prevent consecutive map clicks from stacking up in the navigation history
          replace: true,
        });
      }
    },
  });
}
