import { ReactNode } from "react"

export default function Button({
  onClick,
  styles,
  children,
}: {
  onClick: (e: React.MouseEvent) => Promise<void>
  styles: string
  children: ReactNode
}) {
  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  )
}
