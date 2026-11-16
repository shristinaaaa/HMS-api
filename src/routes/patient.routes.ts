
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
import multerFileUploader from "../middlewares/multer.middleware";

const router = Router();
const upload= multerFileUploader();

// CREATE
router.post("/", upload.single("image"), createPatient);

// READ ALL
router.get("/", getAllPatients);

// READ SINGLE
router.get("/:id", getPatientById);

// UPDATE
router.patch("/:id",validate(updatepatientvalidatorschema), updatePatient);

// DELETE
router.delete("/:id", deletePatient);

export default router;
  