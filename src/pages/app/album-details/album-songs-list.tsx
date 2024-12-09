import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { getAlbumSongsList } from "../../../services/get-album-songs-list"
import { DeleteSongDialog } from "./delete-song-dialog";
import { getAlbumArtist } from "../../../services/get-album-artist";
import { getAlbum } from "../../../services/get-album";

export function AlbumSongsList() {
  const { albumKey } = useParams() as { albumKey: string }

  const { data, isLoading } = useQuery({
    queryKey: ['album-songs-list', albumKey],
    queryFn: () => getAlbumSongsList(albumKey)
  })

  const { data: albumData } = useQuery({
    queryKey: ['album-info', albumKey],
    queryFn: () => getAlbum(albumKey)
  })

  const { data: albumArtist, isLoading: isAlbumArtistLoading } = useQuery({
    queryKey: ['album-artist-info', albumData?.artist["@key"]],
    queryFn: () => getAlbumArtist(albumData!.artist["@key"]),
    enabled: !!albumData?.artist["@key"]
  })

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="w-full h-10 bg-zinc-800 animate-pulse rounded-md" key={index} />
          ))}
        </div>
      ) : (
        <>
          {data?.length ? (
            <>
              {data?.map((song, index) => (
                <div
                  title={`${song.name}`}
                  key={song["@key"]}
                  className="flex w-full gap-5 items-center hover:bg-zinc-900 hover:transition-colors px-4 py-1 group cursor-default"
                >
                  <span>{index + 1}</span>
                  <div className="flex flex-col">
                    <span
                      className="w-fit text-center font-medium truncate"
                    >
                      {song.name}
                    </span>
                    {isAlbumArtistLoading ? (
                      <div className="w-full h-2 bg-zinc-800 animate-pulse rounded-md" key={index} />
                    ) : (
                      <Link
                        to={`/artists/${albumArtist?.["@key"]}`}
                        title={albumArtist?.name}
                        className="w-fit hover:underline underline-offset-2 text-sm opacity-80 group-hover:opacity-100 group-hover:transition-colors"
                      >
                        {albumArtist?.name}
                      </Link>
                    )}
                  </div>
                  <DeleteSongDialog songKey={song["@key"]} isLoading={isLoading} />
                </div>
              ))}
            </>
          ): (
            <span className="text-center w-full col-span-full">Esse album não possui nenhuma música.</span>
          )}
        </>
      )}
    </div>
  )
}