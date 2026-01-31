import epxress from "express";
import { Login, Profile, SingUp } from "../controllers/user.controllers.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";

const router = epxress.Router();

router.post("/signup",SingUp);
router.post("/signin",Login);
router.get("/me",AuthMiddleware,Profile);

export default router;

