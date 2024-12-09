import { Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import * as Switch from '@radix-ui/react-switch'
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../../../services/create-playlist";
import { Playlist } from "../../../interfaces/playlist";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

interface AddNewPlaylistForm {
  name: string
  isPrivate: boolean
}

export function AddNewPlaylistDialogForm() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    resetField
  } = useForm<AddNewPlaylistForm>({
    defaultValues: {
      isPrivate: true
    }
  })

  const { mutateAsync: addNewPlaylistMutation, isPending: isAddNewPlaylistPending } =
    useMutation({
      mutationFn: createPlaylist,
      onSuccess: (response: Playlist) => {
        queryClient.setQueryData(
          ['playlists-list', query],
          (currentList: Playlist[]) => {
            return [
              ...currentList,
              response,
            ]
          },
        )

        toast.success('Playlist criada com sucesso!')
        resetField('name')
        resetField('isPrivate')
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.error)
      },
    })

  async function handleNewPlaylistSubmit(data: AddNewPlaylistForm) {
    await addNewPlaylistMutation({
      name: data.name,
      isPrivate: data.isPrivate
    })
  }

  return (
    <form onSubmit={handleSubmit(handleNewPlaylistSubmit)} className="space-y-4">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name" className="text-sm leading-none">Nome</label>
        <Input 
          type="text"
          id="name"
          placeholder="Nome"
          disabled={isAddNewPlaylistPending}
          {...register('name', { required: 'Esse campo é obrigatório.' })}
        />
        {errors.name && (
          <span className="text-red-400 text-sm leading-none">
            {errors.name?.message}
          </span>
        )}
      </div>
      <Controller 
        control={control}
        name="isPrivate"
        render={({ field }) => {
          return (
            <div className="flex flex-col gap-2">
              <span>É privada?</span>
              <Switch.Root
                checked={field.value}
                onCheckedChange={field.onChange}
                className={"group data-[state=checked]:bg-violet-400 data-[state=unchecked]:bg-zinc-500 relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-opacity-75"}
              >
                <Switch.Thumb
                  className={"group-data-[state=checked]:translate-x-5 group-radix-state-unchecked:translate-x-0 pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"}
                />
              </Switch.Root>
            </div>
          )
        }}
      />
      <Button 
        type="submit" 
        className="w-full"
        disabled={isAddNewPlaylistPending}
      >
        <Plus className="size-4" />
        Adicionar
      </Button>
    </form>
  )
}