import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helpers/pick";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createPatient(req);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createAdmin(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin Created successfuly!",
        data: result
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createDoctor(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});


const GetALlForm = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["status", "role", "email", "search"])
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])

    const {limit, page, search, sortBy, sortOrder, role, status} = req.query;

    const result = await UserService.GetALlForm(filters, options);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Data  successfuly!",
        meta: result.meta,
        data: result.data
    })
});

export const UserController = {
    createPatient,
    createAdmin,
    createDoctor,
    GetALlForm
    
}