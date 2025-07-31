import { useState } from "react";
import { Alert, View, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlineButton from "../UI/OutlineButton";

//using the camera for andriod and ios have different permissons, unlike andrid we handle in the app.json for ios we hadnle it in the imagePicker.js file
function ImagePicker() {
  // for us to display a preview of the image we need to store the image object that describes the image in a state that belongs to the imagePicker container.
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissonInformation, requestPermission] =
    useCameraPermissions(); //this hook is used to request camera permissons for ios

  //in here we want to check if we already have the permission to use the camera, if we don't we will request it.
  // note:the cameraPermissonInformation is an object that contains (props)the status of the permission and a function to request the permission.
  // also the status also has three values: granted, denied, and undetermined and we can access it by importing Permission Status.
  async function verifyPermissions() {
    if (cameraPermissonInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission(); //this will request the permission and return an object with the status of the permission while it completes its cycle cause its a promise.
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
    setPickedImage(image.assets[0].uri); // this sets the preview of the image to the uri of the image object that we get from the launchCameraAsync function.
    // the image object contains an array of assets, we are interested in the first asset which is 0 because array index starts at 0.
    // we then access the uri property of the asset to get the image uri that we can use to display the image in the preview.
    // we can also access other properties of the image object like width, height, and type
  }
  /* GEMINI SUGGESTION 
    // Check if an image was actually taken and not cancelled
    if (!imageResult.canceled && imageResult.assets && imageResult.assets.length > 0) {
      setPickedImage(imageResult.assets[0].uri); // <--- THIS IS THE KEY CHANGE
    } else {
        // Handle cases where the user cancels the camera or no asset is returned
        console.log('Image capture cancelled or no image returned.');
        setPickedImage(null); // Clear any previous image if cancelled
    }
  }
    */
  let ImagePreview = <Text>No Image Taken Yet!</Text>;
  if (pickedImage) {
    ImagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{ImagePreview}</View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
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
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
