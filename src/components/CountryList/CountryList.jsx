import styles from "./CountryList.module.scss";
import Spinner from "../Spinner/Spinner";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  // To check if there is no city on list
  if (!cities.length) {
    return (
      <Message message={"Add your first city by clicking a city on the map"} />
    );
  }

  /**
   * @param {Array.<{country: String, emoji: String}>} country
   */
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
