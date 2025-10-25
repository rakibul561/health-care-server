import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { appoinmentService } from "./appointment.service";
import { IJWTPayload } from "../../types/common";



const createAppoinment = catchAsync(async (req: Request & {user?:IJWTPayload}, res: Response) => {

    const user = req.user

    const result = await appoinmentService.createAppoinment(user as IJWTPayload , req.body)
    

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Appointment created successfully!",
        data: result
    })
})

export const AppoinmentController = {
    createAppoinment
}