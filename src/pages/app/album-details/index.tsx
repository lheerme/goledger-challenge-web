import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { getAlbum } from "../../../services/get-album"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../../../components/button"
import { Music, Pencil, Plus, Trash2 } from "lucide-react"
import { AlbumSongsList } from "./album-songs-list"
import { AddNewSongDialog } from "./add-new-song-dialog"
import { getAlbumArtist } from "../../../services/get-album-artist"
import { DeleteAlbumDialog } from "./delete-album-dialog"
import { EditAlbumDialog } from "./edit-album-dialog"

export function AlbumDetails() {
  const { albumKey } = useParams() as { albumKey: string }

  const { data, isLoading } = useQuery({
    queryKey: ['album-info', albumKey],
    queryFn: () => getAlbum(albumKey)
  })

  const { data: albumArtist, isLoading: isAlbumArtistLoading } = useQuery({
    queryKey: ['album-artist-info', data?.artist["@key"]],
    queryFn: () => getAlbumArtist(data!.artist["@key"]),
    enabled: !!data?.artist["@key"]
  })

  return (
    <div className="flex w-full min-h-full flex-col gap-8">
      <div className="relative h-56 bg-zinc-700">
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-zinc-950 to-black/0 pointer-events-none" />
        <div className="w-full h-full flex flex-col md:flex-row md:items-end justify-end md:justify-between gap-2 px-6 pt-6 z-[1] relative">
          <div className="flex flex-col">
            {isLoading ? (
              <div className="flex flex-col gap-2">
                <div className="w-60 h-10 bg-zinc-800 animate-pulse rounded-md" />
                <div className="w-28 h-4 bg-zinc-800 animate-pulse rounded-md" />
                <div className="w-40 h-4 bg-zinc-800 animate-pulse rounded-md" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-semibold">{data?.name}</h1>
                <div className="flex flex-col">
                  <p className="flex items-center gap-1">
                    <span>{data?.year}</span> - {' '}
                    {isAlbumArtistLoading ? (
                      <div className="w-24 h-3 bg-zinc-800 animate-pulse rounded-md"/>
                    ) : (
                      <Link 
                        to={`/artists/${data?.artist["@key"]}`}
                        className="underline underline-offset-2"
                      >
                        {albumArtist?.name}
                      </Link>
                    )}
                  </p>
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
              <DeleteAlbumDialog />
            </AlertDialog.Root>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button disabled={isLoading} type="button">
                  <Pencil className="size-5" />
                </Button>
              </Dialog.Trigger>
              <EditAlbumDialog />
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button disabled={isLoading} type="button">
                  <Music className="size-5" />
                  <Plus className="size-5" />
                </Button>
              </Dialog.Trigger>
              <AddNewSongDialog />
            </Dialog.Root>
          </div>
        </div>
      </div>
      <div className="w-full px-6 pb-6 space-y-4">
        <h2 className="text-2xl font-semibold">Músicas</h2>
        <AlbumSongsList />
      </div>
    </div>
  )
}