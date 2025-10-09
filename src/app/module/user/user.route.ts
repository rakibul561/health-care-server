import express, { NextFunction, Request, Response } from 'express'
import { fileUploader } from '../../helpers/fileUploader';
import { userValidation } from './user.validation';
import { UserController } from './user.controller';


const router = express.Router();

router.post(
    "/create-patient",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createPatient(req, res, next)
    }

)

// create doctor
// create admin

export const userRoutes = router;