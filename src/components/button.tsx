import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export type ButtonProps = ComponentProps<'button'>

export function Button(props: ButtonProps) {
  const { className, ...rest } = props

  return (
    <button 
      {...rest}
      className={twMerge(
        'bg-violet-400 text-zinc-950 flex justify-center items-center gap-1 px-3 py-2 rounded-lg hover:opacity-80 hover:transition-opacity',
        className
      )}
    />
  )
}