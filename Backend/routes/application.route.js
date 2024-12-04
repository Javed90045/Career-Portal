import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob); //apply job
router.route("/get").get(isAuthenticated, getAppliedJobs); // get job application
router.route("/:id/applicants").get(isAuthenticated, getApplicants); // get applied applicants
router.route("/status/:id/update").post(isAuthenticated, updateStatus); // update application status

export default router;