import { Router } from "express";
import { doctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/ValidateRequest";
import { DoctorScheduleValidation } from "./doctorScheduleValidation";


const router = Router()

router.post("/schedule",
    auth(UserRole.DOCTOR),
    validateRequest(DoctorScheduleValidation.createDoctorScheduleValidationSchema)
    ,doctorScheduleController.InsertIntoDb)




export const doctorScheduleRoutes = router;