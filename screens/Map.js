import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  // the region is used to define the area of the map that is displayed, we can use it to center the map on a specific location or zoom in/out of the map.
  // lat and lng are the coordinates of the location we want to center the map on, latitudeDelta and longitudeDelta are used to define the zoom level of the map, they determine how much of the map is visible on the screen.

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }
  // in here we are going to use the useCallback hook to memoize the function so that it doesn't get recreated on every render, this will help us to avoid unnecessary re-renders and improve performance. so we coverted the function in a const variable and passed it to the useCallback hook.
  //Memoizing a function means caching its instance so the same function reference is reused across renders, instead of creating a new one each time, as long as its dependencies don’t change. In React, useCallback does this to optimize performance and prevent unnecessary re-renders.

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }
    // navigation.navigate settigns has chnaged in the new react nav which is why we used popTo instead
    navigation.popTo("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  //Why the Dependency Array [navigation, selectedLocation]? These are the variables used inside savedPickedLocationHandler. Including them ensures the function updates when they change, avoiding stale closures and ensuring correct behavior.

  // Without useCallback, a new function instance would be created on every render of the component. This could cause the IconButton or its parent components to re-render unnecessarily, even if the function’s logic hasn’t changed.
  //By wrapping the function in useCallback, React memoizes it, ensuring the same function reference is used unless the dependencies (navigation or selectedLocation) change. This improves performance, especially for components that rely on reference equality (e.g., when IconButton is memoized with React.memo or similar).

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]); // uselayouteffect is used to perform side effects in a component, it runs after the component has been rendered and the DOM has been updated, we can use it to update the state or perform any other side effects that need to happen after the component has been rendered.
  // in other words it allows us to run some code right when

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

// initialRegion is used to set the initial region of the map when it is first rendered, it takes an object with latitude, longitude, latitudeDelta and longitudeDelta properties.
// the onPress prop is used to listen to the press event on the map, it returns an object which consist of the coordinates of the location that was pressed on the map .
export default Map;
// the marker(pointer) is used to mark a specific location on the map, we can use it to mark the user's current location or any other location we want to highlight on the map.

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
