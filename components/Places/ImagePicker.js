import { Button, View } from "react-native";
import { launchCameraAsync } from "expo-image-picker";

function ImagePicker() {
  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    }); // the lunchCameraAsync is an async function that returns a promise, so we need to use await to wait for the
    // promise to resolve and get the image object. it also allows us to configure the camera options like allowsEditing, aspect ratio, and quality.
    console.log(image);
  }

  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;
