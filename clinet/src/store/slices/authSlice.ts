import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL setup
const API_URL = "http://localhost:2000";

interface User {
    _id: string;
    name: string;
    email: string;
    role: "student" | "teacher";
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

// Retrieve token from localStorage if exists
const token = localStorage.getItem("token");

const initialState: AuthState = {
    user: null,
    token: token || null,
    isLoading: false,
    error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signin`, userData);
            // Assuming response.data = { success: true, token: "...", user: {...} } 
            // or similar. Adjust based on controller response.
            // Based on my experience, usually token is returned.
            if (response.data.success) {
                console.log("reached redux")
                localStorage.setItem("token", response.data.data.token);
                return response.data;
            }
            return rejectWithValue(response.data.error || "Login failed");
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Login failed");
        }
    }
);

export const signupUser = createAsyncThunk(
    "auth/signup",
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, userData);
            if (response.data.success) {
                // Usually signup doesn't auto-login or maybe it does?
                // We'll assume it returns success.
                return response.data;
            }
            return rejectWithValue(response.data.error || "Signup failed");
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Signup failed");
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    "auth/me",
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as { auth: AuthState };
        const token = state.auth.token;

        if (!token) return rejectWithValue("No token found");

        try {
            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                return response.data.data; // Expecting user data
            }
            return rejectWithValue(response.data.error);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch profile");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.user = action.payload.user; // Assuming backend returns user, if not we fetch me
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Signup
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.isLoading = false;
                // Do we allow auto-login? Maybe not for now.
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Fetch Profile
            .addCase(fetchUserProfile.pending, (_state) => {
                // state.isLoading = true; // Don't block UI on background fetch?
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                // state.isLoading = false;
                state.user = action.payload; // User data
            })
            .addCase(fetchUserProfile.rejected, (state) => {
                // state.isLoading = false;
                state.user = null;
                state.token = null;
                localStorage.removeItem("token"); // Invalid token
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
