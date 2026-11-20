import { Router } from "express";
import { createReceptionist, deleteReceptionist, getAllReceptionists, getReceptionistById, updateReceptionist } from "../controllers/receptionist.controller";


const router=Router();

router.post("/",createReceptionist);

router.get("/",getAllReceptionists);

router.get("/id:",getReceptionistById);

router.patch("/:id",updateReceptionist);

router.delete("/:id",deleteReceptionist);

export default router;