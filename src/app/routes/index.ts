import express from 'express';
import { userRoutes } from '../module/user/user.route';
import { authRoutes } from '../module/auth/auth.route';
import { ScheduleRoutes } from '../module/schedule/schedule.route';
import {  doctorScheduleRoutes } from '../module/doctorSchedule/doctorSchedule.route';
import { SpecialtiesRoutes } from '../module/specialties/specialties.route';
import { DoctorRoutes } from '../module/doctor/doctor.route';
import { AppointmentRoutes } from '../module/appointment/apponintment.route';
import { PrescriptionRoutes } from '../module/prescription/prescription.route';
import { ReviewRoutes } from '../module/review/review.route';


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
        path: '/doctor/schedule',
        route: doctorScheduleRoutes
    },
    {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
      {
        path: '/doctor',
        route: DoctorRoutes
    },
      {
        path: '/appointment',
        route: AppointmentRoutes
    },
      {
        path: '/prescription',
        route: PrescriptionRoutes
    },
      {
        path: '/review',
        route: ReviewRoutes
    },

];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;