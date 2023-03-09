import { ReactNode } from "react"

export default function Button({
  onClick,
  children,
}: {
  onClick: (e: React.MouseEvent) => Promise<void>
  children: ReactNode
}) {
  return (
    <button
      className="mt-4 w-full h-12 text-black bg-white rounded font-semibold select-none"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
