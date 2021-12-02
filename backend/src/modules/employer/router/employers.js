import express from "express";
import EmployerController from "../controller/employers.js";

const employerRouter = express.Router();

const employerController = new EmployerController();

employerRouter.get("/employer/get-profile", employerController.getprofile);
employerRouter.put(
	"/employer/update-profile",
	employerController.updateprofile
);
employerRouter.put(
	"/employer/change-applicant-status",
	employerController.changeApplicantStatus
);

export default employerRouter;
