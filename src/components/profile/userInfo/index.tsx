import { RootStateType } from "@/store/reducers"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import { signOut } from "firebase/auth"
import { auth } from "lib/firebase"
import Button from "../button"

const continueButtonStyles =
  "mt-4 w-full h-12 text-black bg-white rounded font-semibold select-none"

export default function UserInfo() {
  const userState = useSelector((state: RootStateType) => state.userReducer)
  const { displayName, photoURL } = userState

  const dispatch = useDispatch()
  const logOut = async () => {
    try {
      await signOut(auth)
      dispatch({ type: "LOG_OUT" })
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message
        console.log({ errorMessage })
      }
    }
  }
  return (
    <>
      <Image src={photoURL} alt={displayName} width={120} height={120} />
      <div>{displayName}</div>
      <Button onClick={logOut} styles={continueButtonStyles}>
        Log out
      </Button>
    </>
  )
}
