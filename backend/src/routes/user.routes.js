import {Router} from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router=Router();

router.route("/register").post(
    upload.single("avatar"),
    registerUser
);

router.route("/login").post(loginUser);

router.route("/sameroute").post(
    (req, res) => {
        res.status(200).json({ message: 'POST route working fine!' });
    }
);

export default router;