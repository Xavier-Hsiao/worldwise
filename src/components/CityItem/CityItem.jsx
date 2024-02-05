import { Link } from "react-router-dom";
import styles from "./CityItem.module.scss";
import useCity from "../../contexts/useCityContext";
import formatDate from "../../../public/formatDate";

export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCity();

  function handleClick(event) {
    // Stop the link to work
    event.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : null
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
