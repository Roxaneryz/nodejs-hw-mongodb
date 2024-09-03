import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  registerSchema,
  loginSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';


import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestResetEmailController,
  requestPasswordController,
} from '../controllers/auth.js';



const router = express.Router();

const jsonParser = express.json();


router.post("/request-reset-email", jsonParser, validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));
router.post("/request-reset-password", jsonParser, validateBody(resetPasswordSchema), ctrlWrapper(requestPasswordController));

router.post("/register", jsonParser, validateBody(registerSchema), ctrlWrapper(registerController));

router.post("/login", jsonParser, validateBody(loginSchema), ctrlWrapper(loginController));


router.post("/logout", ctrlWrapper(logoutController));
router.post("/refresh", ctrlWrapper(refreshController));


export default router;