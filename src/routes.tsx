import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/layouts/app-layout'
import { Overview } from './pages/app/overview'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <Error />,
    children: [
      { path: '/overview', element: <Overview /> },
      // {
      //   path: '/list/:toDoId',
      //   element: <ToDoDetails />,
      // },
      // {
      //   path: '/anon-list/:toDoId',
      //   element: <ToDoDetailsAnonymous />,
      // },
    ],
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
])