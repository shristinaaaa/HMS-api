import { Router } from "express";
import { approveDoctor, createDoctor, deleteDoctor, getAllDoctors, getDoctorById, updateDoctor } from "../controllers/doctor.controller";
import { validate } from "../middlewares/validator.middleware";
import { createdoctorvalidatorschema, doctoridvalidatorschema, updatedoctorvalidatorschema } from "../validators/doctor.validator";
import multerFileUploader from "../middlewares/multer.middleware";


const router=Router();
const upload = multerFileUploader();


router.get("/",getAllDoctors);

router.get("/:id",getDoctorById);

router.post("/",upload.single("profile_image"),validate(createdoctorvalidatorschema),createDoctor);

router.patch("/:id",validate(updatedoctorvalidatorschema),updateDoctor);

router.delete("/:id",validate(doctoridvalidatorschema),deleteDoctor);

router.patch("/:id/approve",validate(doctoridvalidatorschema),approveDoctor);

export default router;
