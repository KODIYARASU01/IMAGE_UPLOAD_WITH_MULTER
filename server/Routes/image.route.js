import express from "express";
let router = express();
import { ImagePost, ImageGet, ImageDelete } from "../Controllers/image.controller.js";
import upload from "../Middleware/multer.js";

router.post("/", upload.single("image"), ImagePost);
router.get("/", ImageGet);
router.delete("/:_id", ImageDelete);
export default router;
