import { useParams } from "react-router";
import useCity from "../../hooks/useCityContext";
import { useEffect } from "react";
import styles from "./City.module.scss";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function City() {
  const { id } = useParams();
  const { getCity, currentCity } = useCity();
  const { cityName, notes, date, emoji } = currentCity;

  // Handle side effect: fetch data of city that user selected
  useEffect(() => {
    getCity(id);
  }, [id]);

  return (
    <div>
      {emoji}
      {cityName}
    </div>
  );
}
