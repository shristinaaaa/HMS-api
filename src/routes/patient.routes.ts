
import { Router } from "express";

import {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
} from "../controllers/patient.controller";
import { validate } from "../middlewares/validator.middleware";
import { updatepatientvalidatorschema } from "../validators/patient.validator";

const router = Router();

// CREATE
router.post("/", createPatient);

// READ ALL
router.get("/", getAllPatients);

// READ SINGLE
router.get("/:id", getPatientById);

// UPDATE
router.patch("/:id",validate(updatepatientvalidatorschema), updatePatient);

// DELETE
router.delete("/:id", deletePatient);

export default router;
  