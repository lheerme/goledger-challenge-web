import { ComponentProps } from "react"

export type ButtonProps = ComponentProps<'button'>

export function Button(props: ButtonProps) {
  return (
    <button 
      {...props}
      className="bg-violet-400 text-zinc-950 flex items-center gap-1 px-3 py-2 rounded-lg hover:opacity-80 hover:transition-opacity"
    />
  )
}