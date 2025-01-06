import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
// import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Feed from './components/Feed.jsx'


const AppLayout = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [{
    path: "/feed",
    element: <Feed />
  }
    , {
    path: "/login",
    element: <Login />,
  }, {
    path: "/signup",
    element: <Signup />,
  },
    // {
    //   path: "/contact",
    //   element: <Contact />,
    // },
  ]
}]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={AppLayout} />
  </StrictMode>,
)
