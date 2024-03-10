import z from "zod";

export const signUpInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
});
export type signUpInputType = z.infer<typeof signUpInput>;

export const signInInput = z.object({
    username : z.string().email(),
    password : z.string().min(6)
});
export type signInInputType = z.infer<typeof signInInput>;

export const blogContent = z.object({
    title : z.string(),
    content : z.string()
});
export type blogContentType = z.infer<typeof blogContent>;

export const blogUpdate = z.object({
    title : z.string(),
    content : z.string(),
    id : z.string()
});
export type blogUpdateType = z.infer<typeof blogUpdate>;