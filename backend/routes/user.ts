import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { z } from "zod";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signInInput, signUpInput } from "@rishit.saharan/medium-common"; 

export const userApiRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userApiRouter.get("/", (c) => {
    return c.text("Get User");
})
userApiRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signInInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.json("Invalid Format while Signing In");
    }
    const userExists = await prisma.user.findFirst({
        where : {
            username : body.username,
            password : body.password
        }
    });
    if(userExists){
        const jwtToken = await sign({id : userExists.id}, c.env.JWT_SECRET);
        c.status(200);
        return c.json({
            message : "Signed In",
            token : jwtToken
        });
    }
    else{
        c.status(411);
        return c.text("User Doesn't Exist. Please Sign Up!");
    }
})
userApiRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signUpInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.json("Invalid Format while Signing Up");
    }
    try{
        const user = await prisma.user.create({
            data: {
              username: body.username,
              password: body.password,
              name: body.name
            }
          });
        const token = await sign({id : user.id}, c.env.JWT_SECRET);
        return c.json({
            message : "Signed Up",
            token : token
        });
    }
    catch(err){
        return c.status(411);
    }
});
export default userApiRouter;