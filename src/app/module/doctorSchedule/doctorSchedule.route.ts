import { Router } from "express";
import { doctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";


const router = Router()

router.post("/schedule",
    auth(UserRole.DOCTOR)
    ,doctorScheduleController.InsertIntoDb)




export const doctorScheduleRoutes = router;