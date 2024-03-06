import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { z } from "zod";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const JWT_SECRET = "12345";

export const userApiRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userApiRouter.get("/", (c) => {
    return c.text("Get User");
})
userApiRouter.post("/signin", (c) => {
    return c.text("");
})
userApiRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    try{
        const user = await prisma.user.create({
            data: {
              username: body.username,
              password: body.password,
              name: body.name
            }
          });
        console.log(user);
    }
    catch(err){
        return c.status(411);
    }
    return c.json({"msg": "sign up"});
    // return c.text("Error while signing up!");
});
export default userApiRouter;