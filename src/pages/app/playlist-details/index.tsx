import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getPlaylist } from "../../../services/get-playlist"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../../../components/button"
import { Music, Plus, Trash2 } from "lucide-react"
import { PlaylistSongsList } from "./playlist-songs-list"
import { AddNewPlaylistSongDialog } from "./add-new-playlist-song-dialog"
import { DeletePlaylistDialog } from "./delete-playlist-dialog"

export function PlaylistDetails() {
  const { playlistKey } = useParams() as { playlistKey: string }

  const { data, isLoading } = useQuery({
    queryKey: ['playlist-info', playlistKey],
    queryFn: () => getPlaylist(playlistKey)
  })

  return (
    <div className="flex w-full min-h-full flex-col gap-8">
      <div className="relative h-56 bg-zinc-700">
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-zinc-950 to-black/0 pointer-events-none" />
        <div className="w-full h-full flex flex-col md:flex-row md:items-end justify-end md:justify-between gap-2 p-3 md:p-6 z-[1] relative">
          <div className="flex flex-col">
            {isLoading ? (
              <span>carregando...</span>
            ) : (
              <>
                <h1 className="text-3xl font-semibold">{data?.name}</h1>
                <div className="flex flex-col">
                  {data && (
                    <span className="text-sm md:text-base">Última atualização{' '}
                      {formatDistanceToNow(data["@lastUpdated"], {
                        locale: ptBR,
                        addSuffix: true,
                      })}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <Button disabled={isLoading} type="button">
                  <Trash2 className="size-5" />
                </Button>
              </AlertDialog.Trigger>
              <DeletePlaylistDialog />
            </AlertDialog.Root>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button disabled={isLoading} type="button">
                  <Music className="size-5" />
                  <Plus className="size-5" />
                </Button>
              </Dialog.Trigger>
              <AddNewPlaylistSongDialog />
            </Dialog.Root>
          </div>
        </div>
      </div>
      <div className="w-full px-3 md:px-6 pb-6 space-y-4">
        <h2 className="text-2xl font-semibold">Músicas</h2>
        {isLoading ? (
          <span>carregando...</span>
        ) : (
          <PlaylistSongsList songsList={data!.songs} />
        )}
      </div>
    </div>
  )
}