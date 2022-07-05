import { Router } from "express";

import {
  addFinancialEvent,
  getFinancialEvents,
  sumFinancialEvents,
} from "./../controllers/financialController.js";

import { authMiddleware } from "./../middlewares/authMiddleware.js";

const financialRouter = Router();

financialRouter.use(authMiddleware);

financialRouter.post("/", addFinancialEvent);
financialRouter.get("/", getFinancialEvents);
financialRouter.get("/sum", sumFinancialEvents);

export default financialRouter;
