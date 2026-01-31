import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  classId:{type:mongoose.Schema.Types.ObjectId,ref:"Class",reuired:true},
  studentId: {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  status: {type:String,enum:["Present","Absent"],default:null},
});


const Attendance = mongoose.model("Attendance",AttendanceSchema);
export default Attendance;
