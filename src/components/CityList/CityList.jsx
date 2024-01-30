import styles from "./CityList.module.scss";
import Spinner from "../Spinner/Spinner";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";

export default function CityList({ cities, isLoading }) {

  if (isLoading) return <Spinner />;

  // To check if there is no city on list
  if (!cities.length) {
    return (
      <Message message={"Add your first city by clicking a city on the map"} />
    );
  }

  return (
    <>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>

      
    </>
  );
}
