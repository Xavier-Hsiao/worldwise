import { useContext } from "react";
import { CityContext } from "./CityContext";

export default function useCity() {
  const context = useContext(CityContext);

  if (context === undefined)
    throw new Error("CityContext was used outside of CityProvider");

  return context;
}
