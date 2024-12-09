import { Music, Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getSongs } from "../../../services/get-songs";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SongsInputSearch } from "./songs-input-search";

export function Songs() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''

  const { data, isLoading } = useQuery({
    queryKey: ['songs-list', query],
    queryFn: () => getSongs(query)
  })

  function handleNewSong() {
    navigate(`/albuns`)
    toast.warning('É necessário selecionar um album antes de adicionar uma música. Você foi redirecionado para a lista de álbuns, para adicionar uma nova música, abra os detalhes do album')
  }

  return (
    <div className="flex w-full min-h-full flex-col gap-8 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <h1 className="text-3xl font-semibold">Músicas</h1>
        <SongsInputSearch />
        <Button 
          type="button"
          onClick={handleNewSong}
        >
          <Music className="size-5" />
          <Plus className="size-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          <>
            {data?.map((song) => (
              <Link
                to={`/albuns/${song.album["@key"]}`}
                key={song["@key"]}
                title={song.name}
                className="h-40 flex flex-col items-center justify-end ring-1 ring-violet-400 rounded-lg overflow-hidden group cursor-pointer"
              >
                <Music className="size-10 my-auto" />
                <span
                  className="text-violet-400 bg-zinc-900 w-full text-center py-1 px-2 truncate group-hover:bg-violet-400 group-hover:text-zinc-950 group-hover:transition-colors"
                >
                  {song.name}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  )
}