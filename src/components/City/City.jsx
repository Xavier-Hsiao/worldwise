import { useParams } from "react-router";
import useCity from "../../contexts/useCityContext";
import { useEffect } from "react";
import styles from "./City.module.scss";
import Spinner from "../Spinner/Spinner";
import ButtonBack from "../ButtonBack/ButtonBack";
import formatDate from "../../../public/formatDate";

export default function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCity();
  const { cityName, notes, date, emoji } = currentCity;

  // Handle side effect: fetch data of city that user selected
  // Putting getCity in dependency array will cause infinite loop so we have to useCallback hook for it
  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  // Show loading spinner during currentCity changing
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          {cityName} {emoji}
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
        <ButtonBack />
      </div>
    </div>
  );
}
