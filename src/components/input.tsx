import { forwardRef, InputHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <input
      {...rest}
      ref={ref}
      autoComplete="off"
      className={twMerge(
        'py-1 px-3 rounded-lg border-[1px] border-zinc-700 focus:outline-none focus:ring-1 focus:ring-violet-400 bg-transparent disabled:opacity-40 disabled:cursor-not-allowed',
        className
      )}
    />
  )
})