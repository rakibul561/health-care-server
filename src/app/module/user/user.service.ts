import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { PatientInput } from "./user.interface";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import config from "../../../config";

 

const createPatient = async (payload:PatientInput ) =>{
  
    const hashPassword = await bcrypt.hash(payload.password,10)
    const result = await prisma.$transaction(async (tnx) =>{
        
        await tnx.user.create({
            data : {
                email :payload.email,
                password: hashPassword
            }
        }) 


       return  await tnx.patient.create({
            data : {
                name: payload.name,
                email: payload.email
            }
        })
        
    }) 
    return result

}  


export const userService = {
    createPatient
}