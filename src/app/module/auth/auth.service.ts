import { UserStatus } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { jwtHelper } from "../../helpers/JwtHelpers";
import ApiError from "../../error/ApiError";
import  httpStatus  from 'http-status';


const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new ApiError(httpStatus.BAD_REQUEST,"Password is incorrect!")
    }

    const accessToken = jwtHelper.generateToken({email:user.email, role:user.role}, "abcd", "1h")
    const refreshToken = jwtHelper.generateToken({email:user.email, role:user.role}, "abcd", "90d")

    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange
    }

    
}

export const AuthService = {
    login
}