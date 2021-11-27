import express from "express";
import PhotoController from "../controller/photos.js";

const photoRouter = express.Router();

const photoController = new PhotoController();

photoRouter.post("/job-seeker/add-company-photo", photoController.create);

export default photoRouter;
