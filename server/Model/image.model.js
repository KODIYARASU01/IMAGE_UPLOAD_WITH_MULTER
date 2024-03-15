import mongoose from "mongoose";

let ImageSchema = new mongoose.Schema({
  name: String,
  image: Buffer,
  contentType: String,
});

let ImageModel = mongoose.model("Image", ImageSchema);

export default ImageModel;
