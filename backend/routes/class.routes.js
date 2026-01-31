import express from"express";
import { AddStudent, CreateClass, GetAttendance, GetClasss, GetStudents } from "../controllers/class.controllers.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/",AuthMiddleware,CreateClass);  // only teacher can 
router.put("/:id/add-student",AuthMiddleware,AddStudent); // only teacher can 
router.get("/:id",AuthMiddleware,GetClasss);     // both teacher and student
router.get("/students",AuthMiddleware,GetStudents); // only teacher can 
router.get("/:id/my-attendance",AuthMiddleware,GetAttendance);  // sutdent can only;



export default router;

