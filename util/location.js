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
