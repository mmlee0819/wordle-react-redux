import { ReactNode } from "react"

function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="flex xs:w-12 xs:h-12 xs:text-3xl w-16 h-16 justify-center items-center border-2 border-solid border-gloomy text-center text-4xl text-white font-semibold uppercase select-none">
      {children}
    </div>
  )
}

export default Grid
