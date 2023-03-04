import { ReactNode } from "react"

export function MainKeyButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="max-w-[45px] w-full h-14 rounded bg-keyBg justify-center items-center text-xl text-white font-semibold uppercase select-none"
    >
      {children}
    </button>
  )
}

export function SpecificButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="flex max-w-[58px] w-full h-14 rounded bg-keyBg justify-center items-center text-xs text-white font-semibold uppercase select-none"
    >
      {children}
    </button>
  )
}
