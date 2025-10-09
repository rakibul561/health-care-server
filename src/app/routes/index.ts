import express from 'express';
import { userRoutes } from '../module/user/user.route';
import { authRoutes } from '../module/auth/auth.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;