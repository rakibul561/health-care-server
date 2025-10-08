
 import z from 'zod'

const createPatientValidationSchema = z.object({
    password: z.string(),
    patient: {
        name: z.string().nonempty("Name is Required"),
        email: z.string().nonempty("email is Required"),
        address: z.string().optional()
    }
})


export const userValidation = {
    createPatientValidationSchema
}