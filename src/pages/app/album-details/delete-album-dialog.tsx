import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../../../components/button";
import { MouseEvent } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAsset } from "../../../services/delete-asset";
import { Album } from "../../../interfaces/album";
import { toast } from "sonner";

export function DeleteAlbumDialog() {
  const { albumKey } = useParams() as { albumKey: string }
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutateAsync: deleteAlbumMutation, isPending: isDeleteAlbumPending } =
    useMutation({
      mutationFn: deleteAsset,
      onSuccess: () => {
        if (queryClient.getQueryData(['albuns-list', query])) {
          queryClient.setQueryData(
            ['albuns-list', query],
            (currentData: Album[]) => {
              return currentData.filter((album) => album["@key"] !== albumKey)
            },
          )
        }


        navigate(`/albuns`, { replace: true })
        toast.success('Album deletado com sucesso!')
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.error)
      },
    })

  async function handleDeleteAlbum(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    await deleteAlbumMutation({
      key: albumKey
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
					Essa ação não pode ser desfeita. Isso vai permanentemente deletar o album e remover suas músicas do servidor.
				</AlertDialog.Description>
        
        <div className="flex items-center gap-4">
          <AlertDialog.Cancel asChild>
            <Button 
              type="submit"
              className="w-full"
              disabled={isDeleteAlbumPending}
            >
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button
              onClick={handleDeleteAlbum}
              className="w-full bg-red-400"
              disabled={isDeleteAlbumPending}
            >
              Sim, tenho certeza
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  )
}