import * as z from "zod";

export const SignupValidation = z.object({
    name : z.string().min(2 , {message : "too short" }).max(50),
    username: z.string().min(2).max(50),
    email : z.string().min(2 , {message : "enter valid email" }),
    password : z.string().min(3 , {message : "password must be of 8 characters" })

  });