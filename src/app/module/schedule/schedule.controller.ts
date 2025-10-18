import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";
import pick from "../../helpers/pick";


 const InsertIntoDb = catchAsync(async (req: Request, res: Response) => {

    const result = await ScheduleService.insertIntoDB(req.body)

    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Schedule Created successfuly!",
        data: result
    })
});
 const scheduleForDoctor = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const filters = pick(req.query, ["startDateTime", "endDateTime"])


    const result = await ScheduleService.scheduleForDoctor(filters, options)

    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Schedule Created for Doctor!",
        data: result
    })
});


 export const ScheduleController = {
    InsertIntoDb,
    scheduleForDoctor
 }