import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from './pages/layouts/app-layout'
import { Overview } from './pages/app/overview'
import { Playlists } from './pages/app/playlists'
import { Artists } from './pages/app/artists'

import { Songs } from './pages/app/songs'
import { Albuns } from './pages/app/albuns'
import { ArtistDetails } from './pages/app/artist-details'
import { AlbumDetails } from './pages/app/album-details'
import { PlaylistDetails } from './pages/app/playlist-details'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Navigate to="/overview" replace /> },
      { path: '/overview', element: <Overview /> },
      { path: '/playlists', element: <Playlists /> },
      { path: '/playlists/:playlistKey', element: <PlaylistDetails /> },
      { path: '/artists', element: <Artists /> },
      { path: '/artists/:artistKey', element: <ArtistDetails /> },
      { path: '/songs', element: <Songs /> },
      { path: '/albuns', element: <Albuns /> },
      { path: '/albuns/:albumKey', element: <AlbumDetails /> },
    ],
  },
])