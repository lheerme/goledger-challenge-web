import { Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArtist } from "../../../services/create-artist";
import { Artist } from "../../../interfaces/artist";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

interface AddNewArtistForm {
  name: string
  country: string
}

export function AddNewArtistDialogForm() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField
  } = useForm<AddNewArtistForm>()

  const { mutateAsync: addNewArtistMutation, isPending: isAddNewArtistPending } =
    useMutation({
      mutationFn: createArtist,
      onSuccess: (response: Artist) => {
        queryClient.setQueryData(
          ['artists-list', query],
          (currentList: Artist[]) => {
            return [
              ...currentList,
              response,
            ]
          },
        )

        toast.success('Artista adicionado com sucesso!')
        resetField('name')
        resetField('country')
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.error)
      },
    })

  async function handleNewArtistSubmit(data: AddNewArtistForm) {
    await addNewArtistMutation({
      name: data.name,
      country: data.country
    })
  }

  return (
    <form onSubmit={handleSubmit(handleNewArtistSubmit)} className="space-y-4">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name" className="text-sm leading-none">Nome</label>
        <Input 
          type="text"
          id="name"
          placeholder="Nome"
          disabled={isAddNewArtistPending}
          {...register('name', { required: 'Esse campo é obrigatório.' })}
        />
        {errors.name && (
          <span className="text-red-400 text-sm leading-none">
            {errors.name?.message}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="country" className="text-sm leading-none">País</label>
        <Input 
          type="text"
          id="country"
          placeholder="País"
          disabled={isAddNewArtistPending}
          {...register('country', { required: 'Esse campo é obrigatório.' })}
        />
        {errors.country && (
          <span className="text-red-400 text-sm leading-none">
            {errors.country.message}
          </span>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={isAddNewArtistPending}
      >
        <Plus className="size-4" />
        Adicionar
      </Button>
    </form>
  )
}