import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import styles from "./Map.module.scss";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer}>
      <h1>Latitude: {lat}</h1>
      <h1>Longitude: {lng}</h1>

      <button onClick={() => setSearchParams({ lat: 69, lng: 69 })}>
        Generate Fake position
      </button>
      <button onClick={() => navigate("form")}>Go to Form</button>
    </div>
  );
}
