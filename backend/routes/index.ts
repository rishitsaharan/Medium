import { Hono } from "hono";
import userApiRouter from "./user";
import blogApiRouter from "./blog";
import { cors } from 'hono/cors'

const router = new Hono();

router.use('/*', cors());
router.route('/user/', userApiRouter);
router.route('/blog/', blogApiRouter);

export default router;