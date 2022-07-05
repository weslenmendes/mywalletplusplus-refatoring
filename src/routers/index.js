import { Router } from "express";

import authRouter from "./authRoutes.js";
import financialRouter from "./financialRoutes.js";

const Routes = Router();

Routes.use(authRouter);
Routes.use("/financial-events", financialRouter);

export default Routes;
