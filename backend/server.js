import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes.js"
import ClassRoutes from "./routes/class.routes.js"
import { connectDB } from "./config/db.js";

dotenv.config();

const port = process.env.PORT ||6000;

const app =express();


app.use(express.json());
app.use(cors({
    origin:"*",
    credentials:true,
}));

app.use((req,res,next)=>{
    console.log("Request Method:", req.method,"\n","Request Url", req.url);
   next();
})



app.use("/auth",UserRoutes);
app.use("/class",ClassRoutes)

app.listen(port,()=>{
    connectDB();
    console.log(`server is Running on http://localhost:${port}`); 
});

