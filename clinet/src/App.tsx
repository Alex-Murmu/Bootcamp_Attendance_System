import React from 'react'
import {Route ,Routes ,BrowserRouter ,RouterProvider , createBrowserRouter} from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Add from './pages/Add'
import Student from './pages/StudentDashboard'
import {DataTableDemo} from './pages/Userdashboard'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'

interface routerPath {
  path:string,
  Element:React.FC,
}
const router = createBrowserRouter([
  {path:"/" , element:<Home />},
  {path:"/signup" , element:<Signup />},
  {path:"/login", element:<Login />},
  {path:"/class", children:[
    // children Route /class/add so on
    {path:"add" , element:<Add />},
    {path:"student" ,element:<Student />}
  ]},
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
