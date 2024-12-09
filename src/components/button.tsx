import { ButtonHTMLAttributes, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <button 
      {...rest}
      ref={ref}
      className={twMerge(
        'bg-violet-400 text-zinc-950 flex justify-center items-center gap-1 px-3 py-2 rounded-lg hover:opacity-80 hover:transition-opacity disabled:opacity-40 disabled:cursor-not-allowed',
        className
      )}
    />
  )
})