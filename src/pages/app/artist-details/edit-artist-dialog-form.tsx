import { Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editArtist } from "../../../services/edit-artist";
import { Artist } from "../../../interfaces/artist";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface EditArtistForm {
  country: string
}

export function EditArtistDialogForm() {
  const { artistKey } = useParams() as { artistKey: string }
  const queryClient = useQueryClient()

  const { data } = useQuery<Artist>({
    queryKey: ['artist-info', artistKey]
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditArtistForm>({
    defaultValues: {
      country: data?.country
    }
  })

  const { mutateAsync: editArtistMutation, isPending: isEditArtistPending } =
    useMutation({
      mutationFn: editArtist,
      onSuccess: (response: Artist) => {
        queryClient.setQueryData(
          ['artist-info', artistKey],
          (currentData: Artist) => {
            return { ...currentData, country: response.country }
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

  async function handleEditArtistSubmit(data: EditArtistForm) {
    await editArtistMutation({
      country: data.country,
      key: artistKey
    })
  }

  return (
    <form onSubmit={handleSubmit(handleEditArtistSubmit)} className="space-y-4">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="country" className="text-sm leading-none">País</label>
        <Input 
          type="text"
          id="country"
          placeholder="País"
          disabled={isEditArtistPending}
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
        disabled={isEditArtistPending}
      >
        <Plus className="size-4" />
        Adicionar
      </Button>
    </form>
  )
}