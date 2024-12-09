import { Disc, Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getAlbuns } from "../../../services/get-albuns";
import { AlbunsInputSearch } from "./albuns-input-search";

export function Albuns() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''

  const { data, isLoading } = useQuery({
    queryKey: ['albuns-list', query],
    queryFn: () => getAlbuns(query)
  })

  function handleNewAlbum() {
    navigate(`/artists`)
    toast.warning('É necessário selecionar um artista antes de adicionar um album. Você foi redirecionado para a lista de artistas, para adicionar um novo album, abra os detalhes do artista')
  }

  return (
    <div className="flex w-full min-h-full flex-col gap-8 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <h1 className="text-3xl font-semibold">Álbuns</h1>
        <AlbunsInputSearch />
        <Button 
          type="button"
          onClick={handleNewAlbum}
        >
          <Disc className="size-5" />
          <Plus className="size-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          <>
            {data?.map((album) => (
              <Link
                to={`/albuns/${album["@key"]}`}
                key={album["@key"]}
                title={album.name}
                className="relative h-40 flex flex-col items-center justify-end ring-1 ring-violet-400 rounded-lg overflow-hidden group cursor-pointer"
              >
                <span className="absolute top-1 right-2 text-sm">{album.year}</span>
                <Disc className="size-10 my-auto" />
                <span
                  className="text-violet-400 bg-zinc-900 w-full text-center py-1 px-2 truncate group-hover:bg-violet-400 group-hover:text-zinc-950 group-hover:transition-colors"
                >
                  {album.name}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  )
}