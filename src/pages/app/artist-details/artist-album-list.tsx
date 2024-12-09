import { getArtistAlbumList } from "../../../services/get-artist-album-list"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Disc } from "lucide-react"

export function ArtistAlbumList() {
  const { artistKey } = useParams() as { artistKey: string }

  const { data, isLoading } = useQuery({
    queryKey: ['artist-album-list', artistKey],
    queryFn: () => getArtistAlbumList(artistKey)
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {isLoading ? (
        <span>Carregando...</span>
      ) : (
        <>
          {data?.length ? (
            <>
              {data?.map((album) => (
                <Link
                  to={`/albuns/${album["@key"]}`}
                  title={`${album.name} - ${album.year}`}
                  key={album["@key"]}
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
          ): (
            <span className="text-center w-full col-span-full">Esse artista não possui nenhum album.</span>
          )}
        </>
      )}
    </div>
  )
}