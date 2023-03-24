import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "@/store/reducers"
import Image from "next/image"
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "lib/firebase"
import gameIcon from "@/assets/game.png"
import profileIcon from "@/assets/profileIcon.png"
import rankingIcon from "@/assets/rankingIcon.png"

const headerIcons = [
  { path: "profile", name: "profile", src: profileIcon },
  { path: "ranking", name: "ranking", src: rankingIcon },
  { path: "", name: "game", src: gameIcon },
]

export default function Header() {
  const dispatch = useDispatch()
  const userState = useSelector((state: RootStateType) => state.userReducer)
  const userPoint = userState.point
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch({ type: "LOG_OUT" })
        return
      }
      const docRef = doc(db, "users", user.email as string)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        dispatch({
          type: "HAS_CURRENT_USER",
          payload: {
            isAuthenticated: true,
            email: docSnap.data().email,
            displayName: docSnap.data().displayName,
            photoURL: docSnap.data().photoURL,
            id: docSnap.data().id,
            point: docSnap.data().point,
            wordleHistory: docSnap.data().wordleHistory,
          },
        })
      } else {
        dispatch({ type: "LOG_OUT" })
      }
    })
    return () => unsubscribe()
  }, [dispatch])

  return (
    <header className="xs:h-10 flex px-5 h-16 border-b border-gloomy bg-black">
      <div className="maxMd:text-start xs:text-2.5xl relative w-full justify-center items-center text-center text-3.5xl">
        Wordle
        <div className="xs:-mt-[12.5px] absolute flex top-2/4 right-0 -mt-[15px] gap-3">
          <div className="xs:text-xl font-normal text-2xl">{userPoint} pt</div>
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
