import express from 'express'
//*importing routes
import authRoutes from './auth.routes'
import userRoutes from './user.routes';
import patientRoutes from './patient.routes';

const router =express.Router();

//*using routes
router.use("/auth",authRoutes);
router.use("/users",userRoutes);
router.use("/patients",patientRoutes);

export default router;