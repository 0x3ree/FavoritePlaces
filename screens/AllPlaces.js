import { useEffect, useState } from "react";

import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

// when the spp first loads we don't have a place yet in our route parameter and that only chnages when we add a place, for that we then use the useEffect for whenever this component recieves focus
function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]); //curplace and the new place we add(route.params) the current is the recent place added though at first its an empty array which we stated in the useState
    }
  }, [isFocused, route]);
  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
