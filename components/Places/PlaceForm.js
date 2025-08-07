import { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../model/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");

  const [selectedImage, setSelectedImage] = useState();

  const [pickedLocation, setPickedLocation] = useState(); // the pickedLocation asides the lat and lng also comes with the human readable address which we'vev cnfigured

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText); // updates the state with the text entered in the textInput, the enteredText is the text entered by the user and it's given by react native.
  }
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  } // we use both this and the pickedlocation state to store the image and location data respectively, so we can use and pass them when adding/saving a place added by the user .
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []); // we set the dependencies to an empty array because we have no external dependency here only the updating function which we can add but isn't neccessary because it wouldn't change

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation); // the data we forward here is an object containing our model which will be passed to the onCreatePlace function
    onCreatePlace(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}> Title</Text>
        <TextInput
          onChange={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  ); // we use the onChange to listen to the chnages in the textInput and update the state with the setEnteredText ()
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    // borderRadius: 8,
  },
});
