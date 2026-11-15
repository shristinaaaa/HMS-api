import express from "express"
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { loginvalidatorschema, registervalidatorschema } from "../validators/auth.validator";

const router=express.Router();

//*register user

router.post("/register",validate(registervalidatorschema),register);

//*login

router.post("/login",validate(loginvalidatorschema),login);

//*change Pw


export default router