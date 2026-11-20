import express from 'express'
//*importing routes
import authRoutes from './auth.routes'
import userRoutes from './user.routes';
import patientRoutes from './patient.routes';
import doctorRoutes from './doctor.routes';
import receptionistRoutes from './receptionist.routes';

const router =express.Router();

//*using routes
router.use("/auth",authRoutes);
router.use("/users",userRoutes);
router.use("/patients",patientRoutes);
router.use("/doctors",doctorRoutes);
router.use("/receptionists",receptionistRoutes);


export default router;