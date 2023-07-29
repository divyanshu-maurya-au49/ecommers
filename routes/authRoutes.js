import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPassController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//Forget password
router.post("/forgot-password", forgotPassController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//procted user routes auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//procted Admin routes auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
