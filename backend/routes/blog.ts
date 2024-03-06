import { Hono } from "hono";

const blogApiRouter = new Hono();

blogApiRouter.get("/", (c) => {
    return c.text("Get Blog");
})
blogApiRouter.post("/", (c) => {
    return c.text("");
});
blogApiRouter.put("/", (c) => {
    return c.text("");
})
blogApiRouter.get("/:id", (c) => {
    return c.text("");
})
blogApiRouter.get("/bulk", (c) => {
    return c.text("");
});

export default blogApiRouter;