import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";


 const InsertIntoDb = catchAsync(async (req: Request, res: Response) => {

    const result = await ScheduleService.InsertIntoDb(req.body)

    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Schedule Created successfuly!",
        data: result
    })
});


 export const ScheduleController = {
    InsertIntoDb
 }