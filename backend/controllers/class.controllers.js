import { success } from "zod";
import Class from "../models/class.model.js";
import { AddStudentForm, ClassForm } from "../utils/input.validation.js";
import Attendance from "../models/attendance.model.js";

// 4. POST /class
export const CreateClass = async(req,res)=>{     
  try {
    
    const user = req.user;
    const {className} = req.body;
    const valid  = ClassForm.safeParse(req.body);
    if(!valid) return res.status(400).json({success:false,error:"Wrong studnet Id"});
    if(!user.role==="teacher") return res.status(400).json({success:false,error:"Only Teacher can Create Class"});
    const existsClass = await Class.findOne({className:className});
    if(existsClass) return res.status(401).json({success:false,error:"Class with This name all ready Exist! try with defferent name"})
    let newClass = await  Class.create({
        className:className,
        teacherId:user._id,
        studentIds:[],
    })

   newClass = newClass.toObject();
   delete newClass.createdAt;
   delete newClass.updatedAt;
  
    if(!newClass) return res.status(400).json({success:false,error:"failed to Create Classs"});
    return res.status(200).json({success:true,data:newClass});
  } catch (error) {
     return res.status(400).json({success:false,error:error.message});
  }
};


// 5. POST /class/:id{studentId}/add-student
export const AddStudent =async(req,res)=>{
    try {
        console.log("reacher fns")
        const teacherId = req.user._id;
        const classId = req.params.id;
        const validinput = AddStudentForm.safeParse(req.body);
        if(!validinput.success) return res.status(400).json({success:false,error:"invalid inputs"});
        const {studentId} =  req.body;

        const role = req.user.role;
        if(role!=="teacher") return res.status(400).json({success:false,error:"Only Teacher can add Studnet to the class"});

        const updateClass = await Class.findOneAndUpdate({_id:classId,teacherId:teacherId},{
            $addToSet:{studentIds:studentId} /*add student wihtout duplicate*/},
            {
                new:true
            }
            ).populate("teacherId","name").populate("studentIds","_id").select("-__v")
         if(!updateClass) return res.status(404).json({success:false,error:"Class not Found or you not the Owner of the Class"});

        return res.status(200).json({success:true,data:updateClass})

    } catch (error) {
        return res.status(400).json({success:false,error:error.message});
    }
}

// 6. GET /class/:id both the teacher {owner} and studentId who is enrolled in class  can get the class ;
export const GetClasss = async(req,res)=>{
    try {
        const classId = req.params.id;
        const userId = req.user._id;
        const classRoom = await Class.findOne({_id:classId,$or:[{teacherId:userId},{studentIds:userId}]}).populate({path:"studentIds",select:"name"}).populate({path:"teacherId",select:"-password -__v -email"}).select("-__v");
  
        if(!classRoom) return res.status(200).json({success:false,error:"Not found"})
      
            const response = {
                classname:classRoom.className,
                teacher_name:classRoom.teacherId.name,
                students:classRoom.studentIds
            }

        return res.status(200).json({success:true,data:response});
    } catch (error) {
        return res.status(400).json({success:false,error:error.message});
    }
}

// 7. GET /students    {only teacher} can get all student who is enrolled in class;
export const GetStudents = async(req,res)=>{
    try {
        const userId = req.user._id;
        const students = await Class.findOne({teacherId:userId}).populate({path:"studentId",select:"-password"});
        return res.status(200).json({success:true,data:students});

    } catch (error) {
        return res.status(400).json({success:false,error:error.message});
    }
};

// 8. GET /class/:id/my-attendance /Auth Required: Yes (Student only, must be enrolled in class)

export const GetAttendance = async(req,res)=>{
    const classId = req.params.id;
    const userId = req.user._id;
    if(req.user.role!=="student") return res.status(400).json({success:false,error:"only studnet can check attendance"})
    try {
        const classExistance = await Class.findOne({_id:classId,$or:[{studentIds:userId}]});
        if(!classExistance) return res.status(400).json({success:false,error:"You are not enrolled in the class"})
        const attendanceData = await Attendance.findOne({_id:classId,$or:[{studentId:userId}]});
        if(!attendanceData) return res.status(400).json({success:false,error:"You have'nt Attendance class yet"});
        return res.status(200).json({success:true,data:attendanceData});
    } catch (error) {
         return res.status(400).json({success:false,error:error.message});
    }
}
