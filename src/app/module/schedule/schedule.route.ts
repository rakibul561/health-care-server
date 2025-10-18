import { Router } from "express";
import { ScheduleController } from "./schedule.controller";


const router = Router();

router.get('/', ScheduleController.scheduleForDoctor)

router.post("/", ScheduleController.InsertIntoDb)

router.delete("/:id", ScheduleController.deleteSchedule)



export const ScheduleRoutes =  router;