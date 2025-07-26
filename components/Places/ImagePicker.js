import { useState } from "react";
import { Alert, Button, View, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
//using the camera for andriod and ios have different permissons, unlike andrid we handle in the app.json for ios we hadnle it in the imagePicker.js file
function ImagePicker() {
  // for us to display a preview of the image we need to store the image object that describes the image in a state that belongs to the imagePicker container.
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissonInformation, requestPermisson] = useCameraPermissions(); //this hook is used to request camera permissons for ios

  //in here we want to check if we already have the permission to use the camera, if we don't we will request it.
  // note:the cameraPermissonInformation is an object that contains (props)the status of the permission and a function to request the permission.
  // also the status also has three values: granted, denied, and undetermined and we can access it by importing Permission Status.
  async function verifyPermissions() {
    if (cameraPermissonInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermisson(); //this will request the permission and return an object with the status of the permission while it completes its cycle cause its a promise.
      return permissionResponse.granted; // this will return true if the permission is granted and false if not
    }
    // in here we are telling the user that we wouldn't be able to continue with the app if the permission is not granted.
    if (cameraPermissonInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this feature."
      );
      return false; // if the permission is denied we return false to stop the function from continuing.
    }
    return true; // if the permission is granted we return true to continue with the function.
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions(); // we call the verifyPermissions function to check if we have the permission to use the camera.
    if (!hasPermission) {
      return; // if we don't have the permission we return to stop the function from continuing.
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    }); // the lunchCameraAsync is an async function that returns a promise, so we need to use await to wait for the
    // promise to resolve and get the image object. it also allows us to configure the camera options like allowsEditing, aspect ratio, and quality.
    setPickedImage(image.uri);
  }
  let ImagePreview = <Text>No Image Taken Yet!</Text>;
  if (pickedImage) {
    ImagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{ImagePreview}</View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
