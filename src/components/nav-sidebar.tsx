import { Disc, House, Library, ListMusic, Mic, Music } from "lucide-react";
import { NavSidebarLink } from "./nav-sidebar-link";
import { Link } from "react-router-dom";

export function NavSidebar() {
  return (
    <nav className="w-14 md:w-60 h-full bg-zinc-900 p-2 md:p-4 space-y-4">
      <Link
        to={'/overview'} 
        className="flex items-center justify-center md:justify-normal gap-1 hover:text-violet-400 hover:transition-colors mx-auto md:mx-0 pt-2 md:pt-0"
      >
        <Library className="size-7" />
        <h1 className="font-semibold text-xl hidden md:block">SchruteTunes</h1>
      </Link>


      <div className="flex flex-col gap-1 font-medium text-sm">
        <h2 className="text-violet-400 text-base mb-2 hidden md:block">Dashboards</h2>
        <NavSidebarLink to={'/overview'} >
          <House className="size-4" />
          <span className="hidden md:block">Overview</span>
        </NavSidebarLink>
        <NavSidebarLink to={'/playlists'} >
          <ListMusic className="size-4" />
          <span className="hidden md:block">Playlists</span>
        </NavSidebarLink>
        <NavSidebarLink to={'/songs'} >
          <Music className="size-4" />
          <span className="hidden md:block">Músicas</span>
        </NavSidebarLink>
        <NavSidebarLink to={'/albuns'} >
          <Disc className="size-4" />
          <span className="hidden md:block">Álbuns</span>
        </NavSidebarLink>
        <NavSidebarLink to={'/artists'} >
          <Mic className="size-4" />
          <span className="hidden md:block">Artistas</span>
        </NavSidebarLink>
      </div>
    </nav>
  )
}