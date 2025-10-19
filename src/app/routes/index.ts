import express from 'express';
import { userRoutes } from '../module/user/user.route';
import { authRoutes } from '../module/auth/auth.route';
import { ScheduleRoutes } from '../module/schedule/schedule.route';
import {  doctorScheduleRoutes } from '../module/doctorSchedule/doctorSchedule.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    },
    {
        path: '/doctor',
        route: doctorScheduleRoutes
    },

];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;