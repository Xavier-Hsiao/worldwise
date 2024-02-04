// This custom hook is used to read latitude and longitude coordinates from URL
// The return value will be an object containing lat and lng

import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  
  return { lat, lng };
}
