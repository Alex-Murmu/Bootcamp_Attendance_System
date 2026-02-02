import React from 'react'
import {RouterProvider , createBrowserRouter} from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import {DataTableDemo} from './pages/Userdashboard'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'


const router = createBrowserRouter([
  {path:"/" , element:<Home />},
  {path:"/signup" , element:<Signup />},
  {path:"/login", element:<Login />},
  {path:"/me",element:<DataTableDemo />},
  {path:"/student", element:<StudentDashboard />},
  {path:"/teacher", element:<TeacherDashboard />}

]
)
export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
