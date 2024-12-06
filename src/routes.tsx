import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/layouts/app-layout'
import { Overview } from './pages/app/overview'
import { Playlists } from './pages/app/playlists'
import { Artists } from './pages/app/artists'

import { Songs } from './pages/app/songs'
import { Albuns } from './pages/app/albuns'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/overview', element: <Overview /> },
      { path: '/playlists', element: <Playlists /> },
      { path: '/artists', element: <Artists /> },
      { path: '/songs', element: <Songs /> },
      { path: '/albuns', element: <Albuns /> },
    ],
  },
])