import { useParams } from "react-router-dom"
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../../../components/button";
import { Disc, Plus, Trash2, UserRoundPen } from "lucide-react";
import { getArtist } from "../../../services/get-artist";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArtistAlbumList } from "./artist-album-list";
import { AddNewAlbumDialog } from "./add-new-album-dialog";
import { EditArtistDialog } from "./edit-artist-dialog";
import { DeleteArtistDialog } from "./delete-artist-dialog";

export function ArtistDetails() {
  const { artistKey } = useParams() as { artistKey: string }

  const { data, isLoading } = useQuery({
    queryKey: ['artist-info', artistKey],
    queryFn: () => getArtist(artistKey)
  })

  return (
    <div className="flex w-full min-h-full flex-col gap-8">
      <div className="relative h-56 bg-zinc-700">
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-zinc-950 to-black/0 pointer-events-none" />
        <div className="w-full h-full flex flex-col md:flex-row md:items-end justify-end md:justify-between gap-2 px-3 md:px-6 pt-3 md:pt-6 z-[1] relative">
          <div className="flex flex-col">
            {isLoading ? (
              <span>carregando...</span>
            ) : (
              <>
                <h1 className="text-3xl font-semibold">{data?.name}</h1>
                <div className="flex flex-col">
                  <span>{data?.country}</span>
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
              <DeleteArtistDialog />
            </AlertDialog.Root>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button disabled={isLoading} type="button">
                  <UserRoundPen className="size-5" />
                </Button>
              </Dialog.Trigger>
              <EditArtistDialog />
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button disabled={isLoading} type="button">
                  <Disc className="size-5" />
                  <Plus className="size-5" />
                </Button>
              </Dialog.Trigger>
              <AddNewAlbumDialog />
            </Dialog.Root>
          </div>
        </div>
      </div>
      <div className="w-full px-3 md:px-6 pb-6 space-y-4">
        <h2 className="text-2xl font-semibold">Álbuns</h2>
        <ArtistAlbumList />
      </div>
    </div>
  )
}