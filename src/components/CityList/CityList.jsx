import styles from "./CityList.module.scss";
import Spinner from "../Spinner/Spinner";
import CityItem from "../CityItem/CityItem";

export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
