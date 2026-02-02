import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect } from "react";
import { fetchUserProfile } from "../store/slices/authSlice";

interface ProtectedRouteProps {
    allowedRoles?: ("student" | "teacher")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user, token, isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<any>();

    // If we have a token but no user, try to fetch user
    useEffect(() => {
        if (token && !user) {
            dispatch(fetchUserProfile());
        }
    }, [token, user, dispatch]);

    if (isLoading && !user && token) {
        // Basic loading state while verifying token
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
        // User is logged in but doesn't have the right role
        // Redirect to their appropriate dashboard or home
        return <Navigate to={user.role === "teacher" ? "/teacher" : "/student"} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
