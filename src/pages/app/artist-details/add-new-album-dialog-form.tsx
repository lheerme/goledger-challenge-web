import { Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAlbum } from "../../../services/create-album";
import { Album } from "../../../interfaces/album";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface AddNewAlbumForm {
  name: string
  releaseDate: number
}

export function AddNewAlbumDialogForm() {
  const { artistKey } = useParams() as { artistKey: string }
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField
  } = useForm<AddNewAlbumForm>()

  const { mutateAsync: addNewAlbumMutation, isPending: isAddNewAlbumPending } =
    useMutation({
      mutationFn: createAlbum,
      onSuccess: (response: Album) => {
        queryClient.setQueryData(
          ['artist-album-list', artistKey],
          (currentList: Album[]) => {
            return [
              ...currentList,
              response,
            ]
          },
        )

        toast.success('Album adicionado com sucesso!')
        resetField('name')
        resetField('releaseDate')
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.error)
      },
    })

  async function handleNewAlbumSubmit(data: AddNewAlbumForm) {
    addNewAlbumMutation({
      name: data.name,
      releaseDate: data.releaseDate,
      artistKey
    })
  }

  return (
    <form onSubmit={handleSubmit(handleNewAlbumSubmit)} className="space-y-4">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name" className="text-sm leading-none">Nome</label>
        <Input 
          type="text"
          id="name"
          placeholder="Nome do album"
          disabled={isAddNewAlbumPending}
          {...register('name', { required: 'Esse campo é obrigatório.' })}
        />
        {errors.name && (
          <span className="text-red-400 text-sm leading-none">
            {errors.name?.message}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="releaseDate" className="text-sm leading-none">Lançamento</label>
        <Input 
          type="number"
          id="releaseDate"
          placeholder="Ano de lançamento"
          disabled={isAddNewAlbumPending}
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
        disabled={isAddNewAlbumPending}
      >
        <Plus className="size-4" />
        Adicionar
      </Button>
    </form>
  )
}