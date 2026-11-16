import express, { Request } from "express"
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { loginvalidatorschema, registervalidatorschema } from "../validators/auth.validator";
import multerFileUploader from "../middlewares/multer.middleware";
 
const router=express.Router();

const upload =multerFileUploader();

//*register user

router.post("/register",upload.single("profile_image"),validate(registervalidatorschema),register);

//*login

router.post("/login",validate(loginvalidatorschema),login);

//*change Pw


export default router