import Image from "next/image"
import gameIcon from "@/assets/game.png"
import profileIcon from "@/assets/profileIcon.png"
import rankingIcon from "@/assets/rankingIcon.png"
import Link from "next/link"

const headerIcons = [
  { path: "profile", name: "profile", src: profileIcon },
  { path: "ranking", name: "ranking", src: rankingIcon },
  { path: "", name: "game", src: gameIcon },
]

export default function Header() {
  return (
    <header className="xs:h-10 flex px-5 h-16 border-b border-gloomy bg-black">
      <div className="maxMd:text-start xs:text-2.5xl relative w-full justify-center items-center text-center text-3.5xl">
        Wordle
        <div className="xs:-mt-[12.5px] absolute flex top-2/4 right-0 -mt-[15px] gap-3">
          {headerIcons.map((item) => (
            <Link href={`/${item.path}`} key={item.name}>
              <Image
                className="xs:w-6 xs:h-6 w-8 h-8"
                src={item.src}
                alt={item.name}
                width={30}
                height={30}
              />
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
