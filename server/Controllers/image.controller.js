import ImageModel from "../Model/image.model.js";
import fs from "fs";
export const ImagePost = async (req, res, next) => {
  try {
    let result = new ImageModel({
      // name: req.body.name,
      // image: {
      //   data: fs.readFileSync("Upload/" + req.file.filename),
      //   contentType: "image/png",
      // },
      name: req.file.originalname,
      image: fs.readFileSync("Upload/" + req.file.filename),
      contentType: req.file.mimetype,
    });

    await result
      .save()
      .then((res) => {
        
      })
      .catch((err) => {
        console.log(err.message);
      });
    return res.status(201).json({ message: "Image Uploaded Sucessfully" });
  } catch (err) {
    return res.status(401).json({ message: "Image Uploading Failed" });
  }
};

export const ImageGet = async (req, res) => {
  try {
    let data = await ImageModel.find();
    return res.status(201).json({ message: "Image Fetched Sucessfully",data });
  } catch (error) {
    return res.status(401).json({ message: "Image Fetching Failed" });
  }
};

export const ImageDelete = async (req, res) => {
  try {

    let {id}=req.params;

    let data = await ImageModel.findOneAndDelete({id
    });
    return res.status(201).json({ message: "Image Deleted Sucessfully",data });
  } catch (error) {
    return res.status(401).json({ message: "Image Deleting Failed" });
  }
};
