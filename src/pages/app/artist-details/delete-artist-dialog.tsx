import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../../../components/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAsset } from "../../../services/delete-asset";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Artist } from "../../../interfaces/artist";
import { MouseEvent } from "react";

export function DeleteArtistDialog() {
  const { artistKey } = useParams() as { artistKey: string }
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutateAsync: deleteArtistMutation, isPending: isDeleteArtistPending } =
    useMutation({
      mutationFn: deleteAsset,
      onSuccess: () => {
        queryClient.setQueryData(
          ['artists-list', query],
          (currentData: Artist[]) => {
            return currentData.filter((artist) => artist["@key"] !== artistKey)
          },
        )

        navigate(`/artists`, { replace: true })
        toast.success('Artista deletado com sucesso!')
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.error)
      },
    })

  async function handleDeleteArtist(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    await deleteArtistMutation({
      key: artistKey
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
					Essa ação não pode ser desfeita. Isso vai permanentemente deletar o artista e remover seus álbuns e músicas do servidor.
				</AlertDialog.Description>
        
        <div className="flex items-center gap-4">
          <AlertDialog.Cancel asChild>
            <Button 
                type="submit"
                className="w-full"
                disabled={isDeleteArtistPending}
              >
                Cancelar
              </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button
              onClick={handleDeleteArtist}
              className="w-full bg-red-400"
              disabled={isDeleteArtistPending}
            >
              Sim, tenho certeza
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  )
}