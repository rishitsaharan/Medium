import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { blogContent, blogUpdate } from '@rishit.saharan/medium-common';
import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogApiRouter = new Hono<{
    Bindings: {
        "DATABASE_URL" : string,
        "JWT_SECRET" : string
    },
    Variables : {
        "Prisma" : any
        "UserId" : number
    }
}>();

blogApiRouter.use("*", async (c, next) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    c.set("Prisma", prisma);
    const jwtToken = await c.req.header("Authorization");
    if(!jwtToken){
        c.status(411);
        return c.text("No Auth Token");
    }
    
    const token = jwtToken.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if(!payload){
        c.status(411);
        return c.text("Incorrect Auth Token");
    }
    c.set("UserId", payload.id);
    await next();
});
blogApiRouter.get("/", (c) => {
    return c.text("Get Blog");
})
blogApiRouter.post("/", async (c) => {
    const body = await c.req.json();
    const {success} = blogContent.safeParse(body);
    if(!success){
        c.status(403);
        return c.text("Invalid format for Blog");
    }

    const UserId = c.get("UserId");
    const prisma = c.get("Prisma");
    const blog = await prisma.blog.create({
        data : {
            title : body.title,
            content : body.content,
            authorId : UserId
        }
    });
    
    return c.json({
        "postId" : blog.id
    });
});
blogApiRouter.put("/", async (c) => {
    const body = await c.req.json();
    const {success} = blogUpdate.safeParse(body);
    if(!success){
        c.status(403);
        return c.text("Invalid format for Blog Update");
    }
    const blogId = parseInt(body.blogId);
    const UserId = c.get("UserId");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const updatedBlog = await prisma.blog.update({
        where : {
            id : blogId,
            authorId : UserId
        },
        data : {
            title : body.title,
            content : body.content
        }
    });
    return c.json(updatedBlog);
})
blogApiRouter.get("/bulk", async (c) => {
    const UserId = c.get("UserId");
    const prisma = c.get("Prisma");
    const blogs = await prisma.blog.findMany({
        where : {
            authorId : UserId
        }
    });
    return c.json(blogs);
});
blogApiRouter.get("/:id", async (c) => {
    const param = c.req.param();
    const blogId = parseInt(param.id);
    const prisma = c.get("Prisma");

    const blog = await prisma.blog.findUnique({
        where : {
            id : blogId
        }
    })
    return c.json(blog);
})

export default blogApiRouter;