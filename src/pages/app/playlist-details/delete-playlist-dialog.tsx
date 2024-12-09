import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../../../components/button";
import { MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAsset } from "../../../services/delete-asset";
import { toast } from "sonner";
import { Playlist } from "../../../interfaces/playlist";

export function DeletePlaylistDialog() {
  const { playlistKey } = useParams() as { playlistKey: string }
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutateAsync: deletePlaylistMutation, isPending: isDeletePlaylistPending } =
    useMutation({
      mutationFn: deleteAsset,
      onSuccess: () => {
        if (queryClient.getQueryData(['playlists-list'])) {
          queryClient.setQueryData(
            ['playlists-list'],
            (currentData: Playlist[]) => {
              return currentData.filter((playlist) => playlist["@key"] !== playlistKey)
            },
          )
        }


        navigate(`/playlists`, { replace: true })
        toast.success('Playlist deletada com sucesso!')
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.error)
      },
    })

  async function handleDeleteAlbum(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    await deletePlaylistMutation({
      key: playlistKey
    })
  }

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="inset-0 fixed bg-zinc-950/70 z-[1]" />
      <AlertDialog.Content
        aria-describedby={undefined}
        className="fixed z-[2] overflow-hidden inset-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full bg-zinc-950 rounded-lg flex flex-col outline-none p-6 ring-1 ring-violet-400 space-y-4"
      >
        <AlertDialog.Title className="text-lg font-medium leading-none">Você tem certeza?</AlertDialog.Title>
        <AlertDialog.Description>
					Essa ação não pode ser desfeita. Isso vai permanentemente deletar o playlist do servidor.
				</AlertDialog.Description>
        
        <div className="flex items-center gap-4">
          <AlertDialog.Cancel asChild>
            <Button 
              type="submit"
              className="w-full"
              disabled={isDeletePlaylistPending}
            >
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button
              onClick={handleDeleteAlbum}
              className="w-full bg-red-400"
              disabled={isDeletePlaylistPending}
            >
              Sim, tenho certeza
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  )
}