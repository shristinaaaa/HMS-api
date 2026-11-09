import express from "express"
import { register } from "../controllers/auth.controller";

const router=express.Router();

//*register user

router.post("/register",register);

//*login


export default router