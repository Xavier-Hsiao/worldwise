import styles from "./CountryList.module.scss";
import Spinner from "../Spinner/Spinner";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import useCityContext from "../../hooks/useCityContext";

export default function CountryList() {
  const { cities, isLoading } = useCityContext();

  if (isLoading) return <Spinner />;

  // To check if there is no city on list
  if (!cities.length) {
    return (
      <Message message={"Add your first city by clicking a city on the map"} />
    );
  }

  // Use map method to flatten accumulator to get country for every item
  const countries = cities.reduce((accumulator, currentCity) => {
    // Filter our the duplicated country
    if (
      !accumulator.map((item) => item.country).includes(currentCity.country)
    ) {
      return [
        ...accumulator,
        { country: currentCity.country, emoji: currentCity.emoji },
      ];
    } else {
      return accumulator;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country} />
      ))}
    </ul>
  );
}
