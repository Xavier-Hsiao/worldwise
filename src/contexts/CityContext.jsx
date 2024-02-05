import { createContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:9000";

// STEP 1: CREATE A CONTEXT
const CityContext = createContext();

// STEP2: CREATE CUSTOM PROVIDER
function CityContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  // Get the city info that user selected
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Create a new city by sending POST request
  // New city parameter should be an object
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Delete a city via ID
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  // STEP3: RETURN CONTEXT PROVIDER
  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

// STEP5: EXPORT CUSTOM PROVIDER AND CONTEXT
export { CityContextProvider, CityContext };
