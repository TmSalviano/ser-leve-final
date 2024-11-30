import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Explore from './pages/Explore/Explore.jsx'
import Notifications from './pages/Notifications/Notifications.jsx'
import Settings from './pages/Settings/Settings.jsx'
import Register from './pages/Register/Register.jsx'
import Message from './pages/Message/Message.jsx'
import Layout from './components/template/Layout.jsx'
import HomeLayout from './components/template/HomeLayout.jsx'



import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Main } from 'next/document.js'


const router  = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children: [
        {
            path: "/Home",
            element: <HomeLayout><Home /></HomeLayout>
        },
        {
            path: "/Explore",
            element: <Layout> <Explore/> </Layout> 
        },
        {
          path: "Notifications",
          element: <Layout> <Notifications/> </Layout>
        },
        {
          path: "Settings",
          element: <Layout><Settings/></Layout>
        },
        {
          path: "Message",
          element: <Layout> <Message/> </Layout>
        },
        {
          path: "Register",
          element: <Register/>
        },
        {
          path: "/Login",
          element: <Login/>
        },
       
        ]
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
  </StrictMode>,
)
