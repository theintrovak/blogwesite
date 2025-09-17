import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Protected, Login, } from './Components/index.js'
import store from './Store/store.js'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddPost, AllPosts, EditPost, Home, Post, SignUp } from './Pages/index.js'
const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [{
    index: true,
    element: <Home />,
  }, {
    path: "/login",
    element: <Protected authentication={false}>
      <Login />
    </Protected>
  },
  {
    path: "/SignUp",
    element: (
      <Protected authentication={false}>
        {" "}
        <SignUp />
      </Protected>
    ),
  }, {
    path: "/all-posts",
    element: (
      <Protected authentication>
        {" "}
        <AllPosts />
      </Protected>
    ),
  }, {
    path: "/addpost",
    element: (
      <Protected authentication={true}>
        {" "}
        <AddPost />
      </Protected>
    ),
  }, {
    path: "/edit-post/:slug",
    element: (
      <Protected authentication>
        {" "}
        <EditPost />
      </Protected>
    ),
  }, {
    path: "/post/:slug",
    element: (
      <Post />
    ),
  }
  ]
}])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>

)
