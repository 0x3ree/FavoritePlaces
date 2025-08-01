import { useEffect, useState } from "react";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { Image, Alert, View, StyleSheet, Text } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview, getAddress } from "../../util/location";

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState(); // this state will hold the location data, we can use it to display a map preview or save the location data.
  const isFocused = useIsFocused(); // this hook is used to check if the screen is focused, we can use it to conditionally render the map preview, because without it, using the stack navigator the screen is closed why by it doesn't re render , another screen just comes ontop of it  .
  const navigation = useNavigation();

  const route = useRoute(); // we can use this to get the params passed from the Map screen, we can also use it to navigate to the Map screen.

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions(); // this hook is used to request location permissions for ios and android

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]); //we use this to render a code conditonally, if the mapPickedLocation is not undefined we set the pickedLocation state to the mapPickedLocation, this will allow us to display the map preview if the user has already picked a location. and we've also updated the code to use the isFocused hook to check if the screen is focused, this will prevent the code from running when the screen is not focused, which can happen when using the stack navigator.
  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickLocation({ ...pickedLocation, address: address }); // we let the place form know about our pickedLocation and also merge in the human readaable adress
      }
    }
    handleLocation();
  }, [pickedLocation, onPickLocation]); // this effect is used to call the onPickLocation function passed from the parent component to update the
  // location data when the pickedLocation state changes, this will allow us to use the location data in the parent component, in this case the PlaceForm component, so we can save it when the user submits the form. in order for it not to render unnecessarily we use the callback function in the placeform component.

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this feature."
      );
      return false; // if the permission is denied we return false to stop the function from continuing.
    }
    return true; // if the permission is granted we return true to continue with the function.
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync(); // we can also pass an object with options to the function to configure the location request e.g accuracy but we don't need that fr this proj.
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }
  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No Location Picked Yet!</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.mapImage}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick On Map
        </OutlineButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
    //borderRadius: 4,
  },
});

// when using the Location picker, we need to interact with the device and ask for the user's location, we requires the use of native device features, and we get that with the expo locationpackage.
