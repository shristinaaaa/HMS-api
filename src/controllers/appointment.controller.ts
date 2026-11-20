
import { Request, Response, NextFunction } from "express";
import Appointment from "../models/appointment.model";
import Patient from "../models/patient.model";
import Doctor from "../models/doctor.model";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendresponse.utils";
import { catchasync } from "../utils/catchasync.utils";


//* CREATE APPOINTMENT

export const createAppointment = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const {
            patientID,
            doctorID,
            appointment_date,
            appointment_time,
            reason,
        } = req.body;

        //* check patient
        const patient = await Patient.findById(patientID);

        if (!patient) {
            throw new AppError("Patient not found", 404);
        }

        //* check doctor
        const doctor = await Doctor.findById(doctorID);

        if (!doctor) {
            throw new AppError("Doctor not found", 404);
        }

        //* check doctor approval
        if (!doctor.is_approved) {
            throw new AppError("Doctor is not approved yet", 400);
        }

        //* check appointment date
        const appointmentDate = new Date(appointment_date);

        if (
            isNaN(appointmentDate.getTime()) ||
            appointmentDate <= new Date()
        ) {
            throw new AppError("Please select a future appointment date", 400);
        }

        //* check whether doctor is already booked
        const existingAppointment = await Appointment.findOne({
            doctorID,
            appointment_date: appointmentDate,
            appointment_time,
            status: { $in: ["pending", "approved"] },
        });

        if (existingAppointment) {
            throw new AppError(
                "Doctor is already booked for this time slot",
                409
            );
        }

        //* create appointment
        const appointment = await Appointment.create({
            patientID,
            doctorID,
            appointment_date: appointmentDate,
            appointment_time,
            reason,
        });

        sendResponse(res, {
            message: "Appointment booked successfully!",
            data: appointment,
            statusCode: 201,
        });
    }
);


//* GET ALL APPOINTMENTS

export const getAllAppointments = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        //* find all appointments
        const appointments = await Appointment.find()
            .populate({
                path: "patientID",
                populate: {
                    path: "userID",
                    select: "full_name email phone",
                },
            })
            .populate({
                path: "doctorID",
                populate: {
                    path: "userID",
                    select: "full_name email phone",
                },
            });

        sendResponse(res, {
            message: "Appointments fetched successfully!",
            data: appointments,
            statusCode: 200,
        });
    }
);


//* GET SINGLE APPOINTMENT

export const getAppointmentById = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find appointment by ID
        const appointment = await Appointment.findById(id)
            .populate({
                path: "patientID",
                populate: {
                    path: "userID",
                    select: "full_name email phone",
                },
            })
            .populate({
                path: "doctorID",
                populate: {
                    path: "userID",
                    select: "full_name email phone",
                },
            });

        if (!appointment) {
            throw new AppError("Appointment not found", 404);
        }

        sendResponse(res, {
            message: "Appointment fetched successfully!",
            data: appointment,
            statusCode: 200,
        });
    }
);


//* GET PATIENT APPOINTMENTS

export const getPatientAppointments = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { patientID } = req.params;

        //* find patient's appointments
        const appointments = await Appointment.find({ patientID })
            .populate({
                path: "doctorID",
                populate: {
                    path: "userID",
                    select: "full_name email phone",
                },
            });

        sendResponse(res, {
            message: "Patient appointments fetched successfully!",
            data: appointments,
            statusCode: 200,
        });
    }
);


//* GET DOCTOR APPOINTMENTS

export const getDoctorAppointments = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { doctorID } = req.params;

        //* find doctor's appointments
        const appointments = await Appointment.find({ doctorID })
            .populate({
                path: "patientID",
                populate: {
                    path: "userID",
                    select: "full_name email phone",
                },
            });

        sendResponse(res, {
            message: "Doctor appointments fetched successfully!",
            data: appointments,
            statusCode: 200,
        });
    }
);


//* UPDATE APPOINTMENT

export const updateAppointment = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        const {
            appointment_date,
            appointment_time,
            reason,
        } = req.body;

        //* find appointment
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            throw new AppError("Appointment not found", 404);
        }

        //* determine updated date and time
        const newDate = appointment_date !== undefined
            ? new Date(appointment_date)
            : appointment.appointment_date;

        const newTime = appointment_time !== undefined
            ? appointment_time
            : appointment.appointment_time;

        //* check updated date
        if (
            appointment_date !== undefined &&
            (
                isNaN(newDate.getTime()) ||
                newDate <= new Date()
            )
        ) {
            throw new AppError(
                "Please select a future appointment date",
                400
            );
        }

        //* check whether updated slot is already booked
        if (
            appointment_date !== undefined ||
            appointment_time !== undefined
        ) {
            const existingAppointment = await Appointment.findOne({
                _id: { $ne: id },
                doctorID: appointment.doctorID,
                appointment_date: newDate,
                appointment_time: newTime,
                status: { $in: ["pending", "approved"] },
            });

            if (existingAppointment) {
                throw new AppError(
                    "Doctor is already booked for this time slot",
                    409
                );
            }
        }

        //* update appointment fields
        appointment.appointment_date = newDate;
        appointment.appointment_time = newTime;

        if (reason !== undefined) {
            appointment.reason = reason;
        }

        //* save updated appointment
        await appointment.save();

        sendResponse(res, {
            message: "Appointment updated successfully!",
            data: appointment,
            statusCode: 200,
        });
    }
);


//* UPDATE APPOINTMENT STATUS

export const updateAppointmentStatus = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;
        const { status } = req.body;

        //* allowed statuses
        const allowedStatuses = [
            "pending",
            "approved",
            "rejected",
            "cancelled",
            "completed",
        ];

        if (!allowedStatuses.includes(status)) {
            throw new AppError("Invalid appointment status", 400);
        }

        //* update appointment status
        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!appointment) {
            throw new AppError("Appointment not found", 404);
        }

        sendResponse(res, {
            message: "Appointment status updated successfully!",
            data: appointment,
            statusCode: 200,
        });
    }
);


//* DELETE APPOINTMENT

export const deleteAppointment = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find and delete appointment
        const appointment = await Appointment.findByIdAndDelete(id);

        if (!appointment) {
            throw new AppError("Appointment not found", 404);
        }

        sendResponse(res, {
            message: "Appointment deleted successfully!",
            data: null,
            statusCode: 200,
        });
    }
);
