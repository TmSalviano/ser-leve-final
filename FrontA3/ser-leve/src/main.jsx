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

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoggedUserProvider } from './contexts/LoggedUserContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Home",
        element: <HomeLayout><Home /></HomeLayout>
      },
      {
        path: "/Explore",
        element: <Layout><Explore /></Layout>
      },
      {
        path: "/Notifications", // Fixed path
        element: <Layout><Notifications /></Layout>
      },
      {
        path: "/Settings", // Fixed path
        element: <Layout><Settings /></Layout>
      },
      {
        path: "/Message", // Fixed path
        element: <Layout><Message /></Layout>
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
