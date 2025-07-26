class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // {lat:0.01245, lng:0.12345}
    this.id = new Date().toString() + Math.random().toString();
  }
}
