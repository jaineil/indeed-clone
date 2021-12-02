import express from "express";
import PhotoController from "../controller/photos.js";

const photoRouter = express.Router();

const photoController = new PhotoController();

photoRouter.post("/job-seeker/add-company-photo", photoController.create);
photoRouter.get("/admin/get-photo-requests", photoController.getRequests);
photoRouter.put("/admin/update-photo", photoController.updateRequest);

export default photoRouter;
