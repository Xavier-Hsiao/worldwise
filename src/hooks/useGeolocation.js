// Get user current geolocation through this custom hook, using Web API
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

import { useState } from "react";

export default function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getGeolocation() {
    if (!navigator.geolocation)
      return setError("Can not get your device's current location.");

    setIsLoading(true);

    // Parameters: success callback function, error callback function
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      // Error callback
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, error, position, getGeolocation };
}
