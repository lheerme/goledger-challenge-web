import { useQuery } from "@tanstack/react-query";
import { Disc, ListMusic, Mic, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { getPlaylists } from "../../services/get-playlists";
import { getSongs } from "../../services/get-songs";
import { getAlbuns } from "../../services/get-albuns";
import { getArtists } from "../../services/get-artists";

export function Overview() {
  const { data: playlistsData } = useQuery({
    queryKey: ['playlists-list'],
    queryFn: () => getPlaylists()
  })

  const { data: songsData } = useQuery({
    queryKey: ['songs-list'],
    queryFn: () => getSongs()
  })

  const { data: albunsData } = useQuery({
    queryKey: ['albuns-list'],
    queryFn: () => getAlbuns()
  })

  const { data: artistsData } = useQuery({
    queryKey: ['artists-list'],
    queryFn: () => getArtists()
  })

  return (
    <div className="flex w-full min-h-full flex-col gap-8 p-6">
      <h1 className="text-3xl font-semibold">Overview</h1>

      <div className="grid grid-cold-1 md:grid-cols-2 md:grid-rows-2 gap-5">
        <button
          type="button"
          className="ring-1 ring-violet-400 rounded-lg p-3 flex flex-col justify-between h-28 hover:bg-violet-400 hover:text-zinc-950 hover:transition-colors"
        >
          <div className="flex items-center gap-1 text-left">
            <ListMusic className="size-6" />
            <span className="text-lg">Total de Playlists</span> 
          </div>
          <span className="text-3xl text-left">{playlistsData?.length}</span>
        </button>
        <button
          type="button"
          className="ring-1 ring-violet-400 rounded-lg p-3 flex flex-col justify-between h-28 hover:bg-violet-400 hover:text-zinc-950 hover:transition-colors"
        >
          <div className="flex items-center gap-1 text-left">
            <Music className="size-6" />
            <span className="text-lg">Total de Músicas</span>
          </div>
          <span className="text-3xl text-left">{songsData?.length}</span>
        </button>
        <button
          type="button"
          className="ring-1 ring-violet-400 rounded-lg p-3 flex flex-col justify-between h-28 hover:bg-violet-400 hover:text-zinc-950 hover:transition-colors"
        >
          <div className="flex items-center gap-1 text-left">
            <Disc className="size-6" />
            <span className="text-lg">Total de Álbuns</span>
          </div>
          <span className="text-3xl text-left">{albunsData?.length}</span>
        </button>
        <Link
          to={'/artists'}
          className="ring-1 ring-violet-400 rounded-lg p-3 flex flex-col justify-between h-28 hover:bg-violet-400 hover:text-zinc-950 hover:transition-colors"
        >
          <div className="flex items-center gap-1 text-left">
            <Mic className="size-6" />
            <span className="text-lg">Total de Artistas</span>
          </div>
          <span className="text-3xl text-left">{artistsData?.length}</span>
        </Link>
      </div>
    </div>
  )
}