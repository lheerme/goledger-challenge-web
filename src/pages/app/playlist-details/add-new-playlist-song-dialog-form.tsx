import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSongs } from "../../../services/get-songs"
import { Input } from "../../../components/input"
import { LoaderCircle, Plus, Search, X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { useDebounce } from "../../../hooks/use-debounce"
import { twMerge } from "tailwind-merge"
import { Button } from "../../../components/button"
import { addSongToPlaylist } from "../../../services/add-song-to-playlist"
import { Playlist } from "../../../interfaces/playlist"
import { toast } from "sonner"
import { useParams } from "react-router-dom"
import { DialogClose } from "@radix-ui/react-dialog"

interface SelectedSong {
  '@key': string
  name: string
}

export function AddNewPlaylistSongDialogForm() {
  const [inputSearchValue, setInputSearchValue] = useState('')
  const [selectedSong, setSelectedSong] = useState<SelectedSong | null>(null)
  const debouncedInputSearchValue = useDebounce(inputSearchValue)
  const { playlistKey } = useParams() as { playlistKey: string }
  const queryClient = useQueryClient()
  const currentPlaylist = queryClient.getQueryData<Playlist>(['playlist-info', playlistKey])
  const currentSongs = currentPlaylist!.songs

  const { data, isLoading } = useQuery({
    queryKey: ['songs-list', debouncedInputSearchValue],
    queryFn: () => getSongs(debouncedInputSearchValue)
  })

  const { mutateAsync: addSongToPlaylistMutation, isPending: isAddSongToPlaylistPending } =
    useMutation({
      mutationFn: addSongToPlaylist,
      onSuccess: (response: Playlist) => {
        console.log(response)
        queryClient.setQueryData(
          ['playlist-info', playlistKey],
          () => {
            return response
          },
        )

        toast.success('Playlist atualizada com sucesso!')
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.error)
      },
    })

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputSearchValue(event.target.value)
  }

  function handleClick(selectedSong: SelectedSong) {
    setSelectedSong(selectedSong)
  }

  async function handleAddSongToPlaylistSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (selectedSong) {
      await addSongToPlaylistMutation({
        key: playlistKey,
        songs: [ ...currentSongs, { "@assetType": 'song', "@key": selectedSong["@key"] } ]
      })
    }
  }

  return (
    <form onSubmit={handleAddSongToPlaylistSubmit}>
      <div className="flex items-center gap-2">
        <Input
          onChange={handleInputChange}
          id="searchInput" 
          type="text"
          className="w-full"
          value={inputSearchValue}
        />
        <label htmlFor="searchInput">
          <Search className="size-5" />
        </label>
      </div>
      <p>Música selecionada: <span className="font-medium">{selectedSong?.name ?? 'Nenhuma música selecionada'}</span></p>
      <div className="flex flex-col max-h-[200px] md:max-h-[438px] mb-3 gap-2 overflow-auto p-2">
        {isLoading ? (
          <div className="flex justify-center w-full py-4">
            <LoaderCircle className="size-6 animate-spin" />
          </div>
        ) : (
          <>
            {data?.map((song) => (
              <span 
                onClick={() => handleClick({ "@key": song["@key"], name: song.name })}
                key={song["@key"]}
                className={twMerge(
                  'ring-1 ring-violet-400 rounded-md text-center cursor-pointer',
                  selectedSong?.["@key"] === song["@key"] && 'bg-violet-400 text-zinc-950'
                )}
              >
                {song.name}
              </span>
            ))}
          </>
        )}
      </div>
      <div className="flex items-center gap-4 mt-auto">
        <DialogClose asChild>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isAddSongToPlaylistPending}
          >
            <X className="size-4" />
            Cancelar
          </Button>
        </DialogClose>
        <Button 
          type="submit" 
          className="w-full"
          disabled={!selectedSong?.["@key"] || isAddSongToPlaylistPending}
        >
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>
    </form>
  )
}