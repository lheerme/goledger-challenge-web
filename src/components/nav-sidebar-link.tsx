import { ComponentProps } from "react";
import { Link, useLocation } from "react-router-dom";

export type NavLinkProps = ComponentProps<typeof Link>

export function NavSidebarLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      {...props}
      data-current={pathname === props.to}
      className="w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-violet-400 hover:text-zinc-950 hover:transition-colors data-[current=true]:text-zinc-950 data-[current=true]:bg-violet-400"
    />
  )
}