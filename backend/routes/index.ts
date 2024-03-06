import { Hono } from "hono";
import userApiRouter from "./user";
import blogApiRouter from "./blog";

const router = new Hono();

router.route('/user', userApiRouter);
router.route('/blog', blogApiRouter);

export default router;