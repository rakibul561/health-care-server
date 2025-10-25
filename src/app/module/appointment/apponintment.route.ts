import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { AppoinmentController } from "./appointment.controller";

const router = express.Router();



router.post(
    "/",
    auth(UserRole.PATIENT),
    AppoinmentController.createAppoinment
)


export const AppointmentRoutes = router;