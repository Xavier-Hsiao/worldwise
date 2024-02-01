import { createContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:9000";

// STEP 1: CREATE A CONTEXT
const CityContext = createContext();

// STEP2: CREATE CUSTOM PROVIDER
function CityContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // STEP3: RETURN CONTEXT PROVIDER
  return (
    <CityContext.Provider value={{ cities, isLoading }}>
      {children}
    </CityContext.Provider>
  );
}

// STEP5: EXPORT CUSTOM PROVIDER AND CONTEXT
export { CityContextProvider, CityContext };
