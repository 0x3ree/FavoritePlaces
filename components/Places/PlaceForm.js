import { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm(enteredText) {
  const [enteredTitle, setEnteredTitle] = useState("");

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText); // updates the state with the text entered in the textInput, the enteredText is the text entered by the user and it's given by react native.
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
      <ImagePicker />
      <LocationPicker />
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
