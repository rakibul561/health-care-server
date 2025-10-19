import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { doctorScheduleService } from "./doctorSchedule.service";
import { IJWTPayload } from "../../types/common";


 const InsertIntoDb = catchAsync(async (req: Request &{user?:IJWTPayload} , res: Response) => {

    const user = req.user;

    const result = await doctorScheduleService.insertIntoDB(user,req.body)

    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Schedule Created successfuly!",
        data: result
    })
});



export const doctorScheduleController = {
    InsertIntoDb
}