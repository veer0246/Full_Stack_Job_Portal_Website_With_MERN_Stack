import express from "express";
import {login,  logout,  register, updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

// create user routes----------------------------------------------------------------------

router.route("/register").post(register);  // this is same as below code
router.route("/login").get(login); 
router.route("/profile/update").put(isAuthenticated, updateProfile); 
router.route("/logout").post(logout);

// router.post("/register", register)
// router.post("/login", login )
// router.post("/profile/update",isAuthenticated, updateProfile )

export default router;