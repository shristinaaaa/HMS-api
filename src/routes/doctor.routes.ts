
import { Router } from "express";
import { approveDoctor } from "../controllers/doctor.controller";
import { validate } from "../middlewares/validator.middleware";
import { approvedoctorvalidatorschema } from "../validators/doctor.validator";

const doctorRouter = Router();

// APPROVE DOCTOR
doctorRouter.patch(
    "/approve/:id",
    validate(approvedoctorvalidatorschema),
    approveDoctor
);

export default doctorRouter;
