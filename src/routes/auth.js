import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  registerSchema,
  loginSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  // confirmOAuthSchema,
} from '../validation/auth.js';


import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestResetEmailController,
  requestPasswordController,
  // getOAuthURLController,
  // confirmOAuthController,
} from '../controllers/auth.js';



const router = express.Router();

// const jsonParser = express.json();


router.post("/request-reset-email", validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));
router.post("/request-reset-password",  validateBody(resetPasswordSchema), ctrlWrapper(requestPasswordController));

router.post("/register", validateBody(registerSchema), ctrlWrapper(registerController));

router.post("/login",  validateBody(loginSchema), ctrlWrapper(loginController));


router.post("/logout", ctrlWrapper(logoutController));
router.post("/refresh", ctrlWrapper(refreshController));


// router.get(
//   '/get-oauth-url',
//   ctrlWrapper(getOAuthURLController)
// );


// router.post("/confirm-oauth", jsonParser, validateBody(confirmOAuthSchema), ctrlWrapper(confirmOAuthController));

export default router;