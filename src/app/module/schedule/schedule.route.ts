import { Router } from "express";
import { ScheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";


const router = Router();

router.get('/',
    auth(UserRole.ADMIN, UserRole.DOCTOR)
    
    ,ScheduleController.scheduleForDoctor)

router.post("/",
     auth(UserRole.ADMIN)
    ,ScheduleController.InsertIntoDb)

router.delete("/:id",
     auth(UserRole.ADMIN),
     ScheduleController.deleteSchedule)



export const ScheduleRoutes =  router;