import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import UserRoutes from "./routes/user.routes.js"
import ClassRoutes from "./routes/class.routes.js"
import { connectDB } from "./config/db.js";
import Class from "./models/class.model.js";

dotenv.config();

const port = process.env.PORT || 2000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use((req, res, next) => {
    console.log("Request Method:", req.method, "\n", "Request Url", req.url);
    next();
})

app.use("/auth", UserRoutes);
app.use("/class", ClassRoutes);

// Socket.io Logic
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_class", (classId) => {
        socket.join(classId);
        console.log(`User ${socket.id} joined class ${classId}`);
    });

    socket.on("start_live", async ({ classId }) => {
        try {
            await Class.findByIdAndUpdate(classId, { isLive: true });
            socket.to(classId).emit("class_live_started", classId);
            console.log(`Class ${classId} is now LIVE`);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("end_live", async ({ classId }) => {
        try {
            await Class.findByIdAndUpdate(classId, { isLive: false });
            socket.to(classId).emit("class_live_ended", classId);
            console.log(`Class ${classId} ended LIVE session`);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("send_message", (data) => {
        socket.to(data.classId).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(port, () => {
    connectDB();
    console.log(`server is Running on http://localhost:${port}`);
});
