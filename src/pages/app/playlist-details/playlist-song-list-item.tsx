import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Song } from '../../../interfaces/song';
import { getAlbum } from '../../../services/get-album';
import { getAlbumArtist } from '../../../services/get-album-artist';
import { RemoveSongDialog } from './remove-song-dialog';

type PlaylistSongListItemProps<TData, TError = unknown> = {
  query: UseQueryResult<TData, TError>;
  index: number
};

export function PlaylistSongListItem({ query, index }: PlaylistSongListItemProps<Song>) {

  const { data: albumData, isLoading: isAlbumDataLoading } = useQuery({
    queryKey: ['album-info', query.data?.album['@key']],
    queryFn: () => getAlbum(query.data!.album['@key'])
  })

  const { data: albumArtist, isLoading: isAlbumArtistLoading } = useQuery({
    queryKey: ['album-artist-info', albumData?.artist["@key"]],
    queryFn: () => getAlbumArtist(albumData!.artist["@key"]),
    enabled: !!albumData?.artist["@key"]
  })

  return (
    <div
      title={`${query.data?.name}`}
      key={query.data?.["@key"]}
      className="flex w-full gap-5 items-center hover:bg-zinc-900 hover:transition-colors px-4 py-1 group cursor-default"
    >
      <span>{index + 1}</span>
      <div className="flex flex-col">
        <span
          className="w-fit max-w-36 md:max-w-none text-center font-medium truncate"
        >
          {query.data?.name}
        </span>
        {isAlbumArtistLoading ? (
          <span>carregando...</span>
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
      {isAlbumDataLoading ? (
        <span>carregando...</span>
      ) : (
        <Link
          to={`/albuns/${albumData?.['@key']}`}
          title={albumData?.name}
          className="hidden md:block w-fit hover:underline underline-offset-2 text-sm opacity-80 group-hover:opacity-100 group-hover:transition-colors mx-auto"
        >
          {albumData?.name}
        </Link>
      )}
      {query.data?.['@key'] && (
        <RemoveSongDialog songKey={query.data['@key']} isLoading={query.isLoading} />
      )}
    </div>
  )
}