import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getPlaylists } from "../../../services/get-playlists"
import { ListMusic, Plus } from "lucide-react"
import { Button } from "../../../components/button"
import * as Dialog from "@radix-ui/react-dialog";
import { AddNewPlaylistDialog } from "./add-new-playlist-dialog"

export function Playlists() {
  const { data, isLoading } = useQuery({
    queryKey: ['playlists-list'],
    queryFn: () => getPlaylists()
  })

  return (
    <div className="flex w-full min-h-full flex-col gap-8 p-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-semibold">Playlists</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button 
              type="button"
            >
              <ListMusic className="size-5" />
              <Plus className="size-5" />
            </Button>
          </Dialog.Trigger>
          <AddNewPlaylistDialog />
        </Dialog.Root>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          <>
            {data?.map((playlist) => (
              <Link
                to={`/playlists/${playlist["@key"]}`}
                key={playlist["@key"]}
                title={playlist.name}
                className="relative h-40 flex flex-col items-center justify-end ring-1 ring-violet-400 rounded-lg overflow-hidden group cursor-pointer"
              >
                <span className="absolute top-1 right-2 text-sm">
                  {playlist.songs.length}{' '}
                  {playlist.songs.length > 0 ? 'músicas' : 'música'}
                </span>
                <ListMusic className="size-10 my-auto" />
                <span
                  className="text-violet-400 bg-zinc-900 w-full text-center py-1 px-2 truncate group-hover:bg-violet-400 group-hover:text-zinc-950 group-hover:transition-colors"
                >
                  {playlist.name}
                </span>
              </Link>
            ))}
            {data?.map((playlist) => (
              <Link
                to={`/playlists/${playlist["@key"]}`}
                key={playlist["@key"]}
                title={playlist.name}
                className="relative h-40 flex flex-col items-center justify-end ring-1 ring-violet-400 rounded-lg overflow-hidden group cursor-pointer"
              >
                <span className="absolute top-1 right-2 text-sm">
                  {playlist.songs.length}{' '}
                  {playlist.songs.length > 0 ? 'músicas' : 'música'}
                </span>
                <ListMusic className="size-10 my-auto" />
                <span
                  className="text-violet-400 bg-zinc-900 w-full text-center py-1 px-2 truncate group-hover:bg-violet-400 group-hover:text-zinc-950 group-hover:transition-colors"
                >
                  {playlist.name}
                </span>
              </Link>
            ))}
            {data?.map((playlist) => (
              <Link
                to={`/playlists/${playlist["@key"]}`}
                key={playlist["@key"]}
                title={playlist.name}
                className="relative h-40 flex flex-col items-center justify-end ring-1 ring-violet-400 rounded-lg overflow-hidden group cursor-pointer"
              >
                <span className="absolute top-1 right-2 text-sm">
                  {playlist.songs.length}{' '}
                  {playlist.songs.length > 0 ? 'músicas' : 'música'}
                </span>
                <ListMusic className="size-10 my-auto" />
                <span
                  className="text-violet-400 bg-zinc-900 w-full text-center py-1 px-2 truncate group-hover:bg-violet-400 group-hover:text-zinc-950 group-hover:transition-colors"
                >
                  {playlist.name}
                </span>
              </Link>
            ))}
            {data?.map((playlist) => (
              <Link
                to={`/playlists/${playlist["@key"]}`}
                key={playlist["@key"]}
                title={playlist.name}
                className="relative h-40 flex flex-col items-center justify-end ring-1 ring-violet-400 rounded-lg overflow-hidden group cursor-pointer"
              >
                <span className="absolute top-1 right-2 text-sm">
                  {playlist.songs.length}{' '}
                  {playlist.songs.length > 0 ? 'músicas' : 'música'}
                </span>
                <ListMusic className="size-10 my-auto" />
                <span
                  className="text-violet-400 bg-zinc-900 w-full text-center py-1 px-2 truncate group-hover:bg-violet-400 group-hover:text-zinc-950 group-hover:transition-colors"
                >
                  {playlist.name}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  )
}