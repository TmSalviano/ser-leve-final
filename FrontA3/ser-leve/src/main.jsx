import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Explore from './pages/Explore/Explore.jsx';
import Notifications from './pages/Notifications/Notifications.jsx';
import Settings from './pages/Settings/Settings.jsx';
import Register from './pages/Register/Register.jsx';
import Message from './pages/Message/Message.jsx';
import Layout from './components/template/Layout.jsx';
import HomeLayout from './components/template/HomeLayout.jsx';
import Test from './components/Test/Test.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoggedUserProvider } from './contexts/LoggedUserProvider.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Home",
        element: <ProtectedRoute><HomeLayout><Home /></HomeLayout></ProtectedRoute> 
      },
      {
        path: "/Explore",
        element: <ProtectedRoute><Layout><Explore /></Layout></ProtectedRoute>
      },
      {
        path: "/Notifications", // Fixed path
        element: <ProtectedRoute><Layout><Notifications /></Layout></ProtectedRoute>
      },
      {
        path: "/Settings", // Fixed path
        element: <ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>
      },
      {
        path: "/Message", // Fixed path
        element:  <ProtectedRoute><Layout><Message /></Layout></ProtectedRoute>
      },
      {
        path: "/Register", // Fixed path
        element: <Register />
      },
      {
        path: "/Login", // Fixed path
        element: <Login />
      },
      {
        path: "/Teste", // Fixed path
        element: <Layout><Test /></Layout>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoggedUserProvider>
      <RouterProvider router={router} />
    </LoggedUserProvider>
  </StrictMode>
);
