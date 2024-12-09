import { Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Album } from "../../../interfaces/album";
import { editAlbum } from "../../../services/edit-album";
import { toast } from "sonner";

interface EditAlbumForm {
  releaseDate: number
}

export function EditAlbumDialogForm() {
  const { albumKey } = useParams() as { albumKey: string }
  const queryClient = useQueryClient()

  const { data } = useQuery<Album>({
    queryKey: ['album-info', albumKey],
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditAlbumForm>({
    defaultValues: {
      releaseDate: data?.year
    }
  })

  const { mutateAsync: editAlbumMutation, isPending: isEditAlbumPending } =
    useMutation({
      mutationFn: editAlbum,
      onSuccess: (response: Album) => {
        queryClient.setQueryData(
          ['album-info', albumKey],
          (currentData: Album) => {
            return { ...currentData, year: response.year }
          },
        )

        toast.success('Dados editados com sucesso!')
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.error)
      },
    })

  async function handleEditAlbumSubmit(data: EditAlbumForm) {
    await editAlbumMutation({
      key: albumKey,
      year: data.releaseDate
    })
  }

  return (
    <form onSubmit={handleSubmit(handleEditAlbumSubmit)} className="space-y-4">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="releaseDate" className="text-sm leading-none">Lançamento</label>
        <Input 
          type="number"
          id="releaseDate"
          placeholder="Ano de lançamento"
          disabled={isEditAlbumPending}
          {...register('releaseDate', { required: 'Esse campo é obrigatório.' })}
        />
        {errors.releaseDate && (
          <span className="text-red-400 text-sm leading-none">
            {errors.releaseDate.message}
          </span>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={isEditAlbumPending}
      >
        <Plus className="size-4" />
        Adicionar
      </Button>
    </form>
  )
}