import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;



    if(err instanceof PrismaClientKnownRequestError){
        if(err.code === "P2002"){
            message = "Duplicate Key Error",
            error = err.meta
        }
        if(err.code === "P1000"){
            message = "Authentication failed against database server",
            error = err.meta
        }
        if(err.code === "P2003"){
            message = "Foreign key constraint failed on the field",
            error = err.meta
        }
    }

    res.status(statusCode).json({
        success,
        message,
        error
    })
};

export default globalErrorHandler;