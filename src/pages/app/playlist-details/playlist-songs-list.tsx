import { useQueries } from "@tanstack/react-query";
import { getSong } from "../../../services/get-song";
import { PlaylistSongListItem } from "./playlist-song-list-item";

interface PlaylistSongsListPros {
  songsList: {
    "@assetType": string;
    "@key": string
  }[]
}

export function PlaylistSongsList({ songsList }: PlaylistSongsListPros) {
  const keysArray = songsList.map(song => song["@key"])

  const queries = useQueries({
    queries: keysArray.map((key) => ({
      queryKey: ['playlist-songs-list', key],
      queryFn: () => getSong(key)
    }))
  })

  const isAnyLoading = queries.some((query) => query.isLoading)

  return (
    <div className="flex flex-col gap-4">
      {isAnyLoading ? (
        <span>Carregando...</span>
      ) : (
        <>
          {queries.map((query, index) => (
            <PlaylistSongListItem 
              query={query} 
              index={index} 
              key={index} 
            />
          ))}
        </>
      )}
    </div>
  )
}