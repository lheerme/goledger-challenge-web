import { useQuery } from "@tanstack/react-query"
import { getArtists } from "../../../services/get-artists"
import { User, UserPlus } from "lucide-react"
import { Button } from "../../../components/button"
import * as Dialog from "@radix-ui/react-dialog";
import { AddNewArtistDialog } from "./add-new-artist-dialog";
import { ArtistsInputSearch } from "./artists-input-search";
import { Link, useSearchParams } from "react-router-dom";

export function Artists() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''

  const { data, isLoading } = useQuery({
    queryKey: ['artists-list', query],
    queryFn: () => getArtists(query)
  })

  return (
    <div className="flex w-full min-h-full flex-col gap-8 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <h1 className="text-3xl font-semibold">Artists</h1>
        <ArtistsInputSearch />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button type="button">
              <UserPlus className="size-5" />
            </Button>
          </Dialog.Trigger>
          <AddNewArtistDialog />
        </Dialog.Root>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          <>
            {data?.map((artist) => (
              <Link
                to={`/artists/${artist["@key"]}`}
                key={artist["@key"]}
                title={artist.name}
                className="h-40 flex flex-col items-center justify-end ring-1 ring-violet-400 rounded-lg overflow-hidden group cursor-pointer"
              >
                <User className="size-10 my-auto" />
                <span
                  className="text-violet-400 bg-zinc-900 w-full text-center py-1 px-2 truncate group-hover:bg-violet-400 group-hover:text-zinc-950 group-hover:transition-colors"
                >
                  {artist.name}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  )
}