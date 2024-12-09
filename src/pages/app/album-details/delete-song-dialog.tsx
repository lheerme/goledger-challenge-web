import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAsset } from "../../../services/delete-asset";
import { Song } from "../../../interfaces/song";
import { toast } from "sonner";
import { MouseEvent, useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteSongDialogProps {
  songKey: string
  isLoading: boolean
}

export function DeleteSongDialog({ songKey, isLoading }: DeleteSongDialogProps) {
  const [open, setOpen] = useState(false)

  const { albumKey } = useParams() as { albumKey: string }
  const queryClient = useQueryClient()

  const { mutateAsync: deleteSongMutation, isPending: isDeleteSongPending } =
    useMutation({
      mutationFn: deleteAsset,
      onSuccess: (response) => {
        queryClient.setQueryData(
          ['album-songs-list', albumKey],
          (currentData: Song[]) => {
            return currentData.filter((song) => song["@key"] !== response.deletedKeys[0])
          },
        )

        setOpen(false)
        toast.success('Música deletada com sucesso!')
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.error)
      },
    })

  async function handleDeleteSong(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    await deleteSongMutation({
      key: songKey
    })
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger 
        disabled={isLoading}
        className="ml-auto hover:bg-zinc-800 hover:transition-colors p-2 rounded-full"
      >
        <Trash2 className="size-5" />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="inset-0 fixed bg-zinc-950/70 z-[1]" />
        <AlertDialog.Content
          aria-describedby={undefined}
          className="fixed z-[2] overflow-hidden inset-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full bg-zinc-950 rounded-lg flex flex-col outline-none p-6 ring-1 ring-violet-400 space-y-4"
        >
          <AlertDialog.Title className="text-lg font-medium leading-none">Você tem certeza?</AlertDialog.Title>
          <AlertDialog.Description>
            Essa ação não pode ser desfeita. Isso vai permanentemente remover a música do album e do servidor.
          </AlertDialog.Description>
          
          <div className="flex items-center gap-4">
            <AlertDialog.Cancel asChild>
              <Button 
                type="submit"
                className="w-full"
                disabled={isDeleteSongPending}
              >
                Cancelar
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                onClick={handleDeleteSong}
                className="w-full bg-red-400"
                disabled={isDeleteSongPending}
              >
                Sim, tenho certeza
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}