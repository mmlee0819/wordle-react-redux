import Image from "next/image"
import gameIcon from "@/assets/game.png"
import profileIcon from "@/assets/profileIcon.png"
import rankingIcon from "@/assets/rankingIcon.png"

const headerIcons = [
  { alt: "profile", src: profileIcon },
  { alt: "ranking", src: rankingIcon },
  { alt: " game", src: gameIcon },
]

export default function Header() {
  return (
    <header className="xs:h-10 flex px-5 h-16 border-b border-gloomy">
      <div className="maxMd:text-start xs:text-2.5xl relative w-full justify-center items-center text-center text-3.5xl">
        Wordle
        <div className="xs:-mt-[12.5px] absolute flex top-2/4 right-0 -mt-[15px] gap-3">
          {headerIcons.map((item) => (
            <Image
              key={item.alt}
              className="xs:w-6 xs:h-6 w-8 h-8"
              src={item.src}
              alt={item.alt}
              width={30}
              height={30}
            />
          ))}
        </div>
      </div>
    </header>
  )
}
