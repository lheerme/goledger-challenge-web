import { Disc, House, Library, ListMusic, Mic, Music } from "lucide-react";

export function NavSidebar() {
  return (
    <nav className="w-60 h-full bg-zinc-900 p-4 space-y-4">
      <button 
        type="button"
        className="flex items-center gap-1 hover:text-violet-400 hover:transition-colors"
      >
        <Library className="size-7" />
        <h1 className="font-semibold text-xl">SchruteTunes</h1>
      </button>


      <div className="flex flex-col gap-1 font-semibold text-sm">
        <h2 className="text-violet-400 text-base mb-2">Dashboards</h2>
        <button 
          className="text-zinc-950 bg-violet-400 w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-violet-400 hover:text-zinc-950 hover:transition-colors"
        >
          <House className="size-4" />
          <span>Overview</span>
        </button>
        <button 
          className="w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-violet-400 hover:text-zinc-950 hover:transition-colors"
        >
          <ListMusic className="size-4" />
          <span>Playlists</span>
        </button>
        <button 
          className="w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-violet-400 hover:text-zinc-950 hover:transition-colors"
        >
          <Music className="size-4" />
          <span>Músicas</span>
        </button>
        <button 
          className="w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-violet-400 hover:text-zinc-950 hover:transition-colors"
        >
          <Disc className="size-4" />
          <span>Albums</span>
        </button>
        <button 
          className="w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-violet-400 hover:text-zinc-950 hover:transition-colors"
        >
          <Mic className="size-4" />
          <span>Artistas</span>
        </button>
      </div>
    </nav>
  )
}