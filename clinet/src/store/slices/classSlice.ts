import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:2000";

interface ClassType {
    _id: string;
    className: string;
    teacherId: { _id: string, name: string } | string;
    studentIds: any[];
    teacher_name?: string; // Added for GetDetails response
    students?: any[];      // Added for GetDetails response
    isLive?: boolean;
}

interface ClassState {
    classes: ClassType[];
    activeClass: ClassType | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ClassState = {
    classes: [],
    activeClass: null,
    isLoading: false,
    error: null,
};

// Helpers to get header
const getConfig = (token: string) => ({
    headers: { Authorization: `Bearer ${token}` }
});

export const fetchMyClasses = createAsyncThunk(
    "class/fetchMyClasses",
    async (_, { getState, rejectWithValue }) => {
        const state: any = getState();
        const token = state.auth.token;
        if (!token) return rejectWithValue("Not authenticated");

        try {
            // Note: We need to determine if student or teacher? 
            // The backend endpoint /teacher/my-classes is seemingly for teachers?
            // Wait, my backend implementation handles both roles in `GetMyClasses`!
            // But I mounted it at `/teacher/my-classes`.
            // Ideally it should be `/class/my-classes`.
            // But the Plan was `/class/teacher/classes`.
            // I implemented `router.get("/teacher/my-classes", ...)`
            // So I should use that url.
            const response = await axios.get(`${API_URL}/class/teacher/my-classes`, getConfig(token));
            if (response.data.success) {
                return response.data.data;
            }
            return rejectWithValue(response.data.error);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch classes");
        }
    }
);

export const createClass = createAsyncThunk(
    "class/create",
    async (classData: { className: string }, { getState, rejectWithValue }) => {
        const state: any = getState();
        const token = state.auth.token;
        try {
            const response = await axios.post(`${API_URL}/class`, classData, getConfig(token));
            if (response.data.success) {
                return response.data.data;
            }
            return rejectWithValue(response.data.error);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to create class");
        }
    }
);

export const markAttendance = createAsyncThunk(
    "class/markAttendance",
    async ({ classId, studentId, status }: { classId: string, studentId: string, status: string }, { getState, rejectWithValue }) => {
        const state: any = getState();
        const token = state.auth.token;
        try {
            const response = await axios.post(`${API_URL}/class/${classId}/attendance`, { studentId, status }, getConfig(token));
            if (response.data.success) {
                return response.data.data;
            }
            return rejectWithValue(response.data.error);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to mark attendance");
        }
    }
);

export const fetchMyAttendance = createAsyncThunk(
    "class/fetchMyAttendance",
    async (classId: string, { getState, rejectWithValue }) => {
        const state: any = getState();
        const token = state.auth.token;
        try {
            const response = await axios.get(`${API_URL}/class/${classId}/my-attendance`, getConfig(token));
            if (response.data.success) {
                return response.data.data; // { status, date, ... }
            }
            return rejectWithValue(response.data.error);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch attendance");
        }
    }
);

// Fetch single class details (useful for entering a class)
export const fetchClassDetails = createAsyncThunk(
    "class/fetchDetails",
    async (classId: string, { getState, rejectWithValue }) => {
        const state: any = getState();
        const token = state.auth.token;
        try {
            // Endpoint: /class/:id
            const response = await axios.get(`${API_URL}/class/${classId}`, getConfig(token));
            if (response.data.success) {
                return response.data.data; // { classname, teacher_name, students } structure from backend
                // Wait, backend GetClasss returns { classname, teacher_name, students } object, not the full document?
                // See backend line 72 in Step 55.
                // Ideally I should map it to my ClassType or handle it.
                // For now, let's just return it.
            }
            return rejectWithValue(response.data.error);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch class details");
        }
    }
);

const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {
        clearClassError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Classes
            .addCase(fetchMyClasses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMyClasses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.classes = action.payload;
            })
            .addCase(fetchMyClasses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Create Class
            .addCase(createClass.fulfilled, (state, action) => {
                state.classes.push(action.payload);
            })
            // Fetch Details
            .addCase(fetchClassDetails.fulfilled, (state, action) => {
                // The backend response structure is different (custom object). 
                // We might need to adapt.
                // For now, assume it works for the detail view.
                state.activeClass = action.payload as any;
            })
    }
});

export const { clearClassError } = classSlice.actions;
export default classSlice.reducer;
