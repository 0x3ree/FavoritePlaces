const GOOGLE_API_KEY = "AIzaSyCc3bLOLxGcooq1r4b7UE6rEdl1BD5N-ac";

/*export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}*/
export function getMapPreview(lat, lng) {
  // Corrected URL: No line break after maptype=roadmap
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

// in here we tweaked the url to include the lat and lng values,since we don't have a newyork address we can input cordinates directly
// we also didn't use the &signature=YOUR_SIGNATURE cause it isn't really neccesarry except for production apps where you want to secure your api key or when its resricted to a specific domain or ip address.

// in order to be able to see a readable address, we first enable the googlemaps geocoding, which we then check how to fetch the data using reversegeocoding.
async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("failed to fetch new address!"); // the ok is a built in property
  }

  const data = await response.json(); // this is the response if we don't get an error that we saved in the data and we then use it to get the formatted adress which makes it posible to be readable
  const address = data.results[0].formatted_address;
  return address;
}
