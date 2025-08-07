import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    navigation.push("AllPlaces", { place: place });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
// the place prop also same as placedata

export default AddPlace;
