import { useParams } from "react-router";
import useCity from "../../hooks/useCityContext";
import { useEffect } from "react";
import styles from "./City.module.scss";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCity();
  const { cityName, notes, date, emoji } = currentCity;

  // Handle side effect: fetch data of city that user selected
  useEffect(() => {
    getCity(id);
  }, [id]);

  // Show loading spinner during currentCity changing
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type="back">Back</Button>
      </div>
    </div>
  );
}
