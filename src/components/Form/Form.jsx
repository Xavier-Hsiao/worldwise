// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import styles from "./Form.module.scss";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import ButtonBack from "../ButtonBack/ButtonBack";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import convertToEmoji from "../../../public/convertToEmoji";

export default function Form() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const [emoji, setEmoji] = useState("");

  const { lat, lng } = useUrlPosition();

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error("No city found! Click somewhere else.");
        }

        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  // Prevent users going to Form via URL without giving lat and lng
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" className={styles.btn}>
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}
