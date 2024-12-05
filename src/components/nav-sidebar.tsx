import { Disc, House, Library, ListMusic, Mic, Music } from "lucide-react";
import { NavSidebarLink } from "./nav-sidebar-link";

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


      <div className="flex flex-col gap-1 font-medium text-sm">
        <h2 className="text-violet-400 text-base mb-2">Dashboards</h2>
        <NavSidebarLink to={'/overview'} >
          <House className="size-4" />
          <span>Overview</span>
        </NavSidebarLink>
        <NavSidebarLink to={'/playlists'} >
          <ListMusic className="size-4" />
          <span>Playlists</span>
        </NavSidebarLink>
        <NavSidebarLink to={'/songs'} >
          <Music className="size-4" />
          <span>Músicas</span>
        </NavSidebarLink>
        <NavSidebarLink to={'/albuns'} >
          <Disc className="size-4" />
          <span>Álbuns</span>
        </NavSidebarLink>
        <NavSidebarLink to={'/artists'} >
          <Mic className="size-4" />
          <span>Artistas</span>
        </NavSidebarLink>
      </div>
    </nav>
  )
}