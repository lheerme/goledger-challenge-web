import { Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSong } from "../../../services/create-song";
import { Song } from "../../../interfaces/song";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

interface AddNewSongForm {
  name: string
}

export function AddNewSongDialogForm() {
  const { albumKey } = useParams() as { albumKey: string }
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField
  } = useForm<AddNewSongForm>()

  const { mutateAsync: addNewSongMutation, isPending: isAddNewSongPending } =
    useMutation({
      mutationFn: createSong,
      onSuccess: (response: Song) => {
        queryClient.setQueryData(
          ['album-songs-list', albumKey],
          (currentList: Song[]) => {
            return [
              ...currentList,
              response,
            ]
          },
        )

        toast.success('Música adicionada com sucesso!')
        resetField('name')
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.error)
      },
    })

  async function handleNewSongSubmit(data: AddNewSongForm) {
    addNewSongMutation({
      name: data.name,
      albumKey
    })
  }
  
  return (
    <form onSubmit={handleSubmit(handleNewSongSubmit)} className="space-y-4">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name" className="text-sm leading-none">Nome</label>
        <Input 
          type="text"
          id="name"
          placeholder="Nome da música"
          disabled={isAddNewSongPending}
          {...register('name', { required: 'Esse campo é obrigatório.' })}
        />
        {errors.name && (
          <span className="text-red-400 text-sm leading-none">
            {errors.name?.message}
          </span>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={isAddNewSongPending}
      >
        <Plus className="size-4" />
        Adicionar
      </Button>
    </form>
  )
}