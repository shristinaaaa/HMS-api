
import { Router } from "express";

import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserStatus,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validator.middleware";
import { updateuserstatusvalidatorschema, updateuservalidatorschema } from "../validators/user.validator";

const router = Router();

// GET ALL USERS
router.get("/", getAllUsers);

// GET SINGLE USER
router.get("/:id", getUserById);

// UPDATE USER
router.patch("/:id",validate(updateuservalidatorschema), updateUser);

// ACTIVATE / DEACTIVATE USER
router.patch("/:id/status",validate(updateuserstatusvalidatorschema) ,updateUserStatus);

// DELETE USER
router.delete("/:id", deleteUser);

export default router;
