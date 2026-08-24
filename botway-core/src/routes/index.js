/**
 * Top-level route aggregator.
 *
 * Mounts versioned APIs under /api.
 */

import { Router } from "express";
import { v1Router } from "./v1/index.js";

const rootRouter = Router();

rootRouter.use("/v1", v1Router);

export { rootRouter };
