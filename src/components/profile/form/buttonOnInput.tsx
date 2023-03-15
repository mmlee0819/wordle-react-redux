import { ReactNode } from "react"

export default function ButtonOnInput({
  handleClick,
  children,
}: {
  handleClick: () => void
  children: ReactNode
}) {
  return (
    <div
      className="absolute bottom-0 right-0 w-12 h-12 flex justify-center items-center bg-keyBg border border-white rounded font-medium cursor-pointer select-none"
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
