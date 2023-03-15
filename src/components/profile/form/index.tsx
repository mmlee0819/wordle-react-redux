import { useState, useRef } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { db, auth } from "../../../../lib/firebase"
import Button from "../button"
import axios from "axios"

const continueButtonStyles =
  "mt-4 w-full h-12 text-black bg-white rounded font-semibold select-none"
const target = "@"

export default function Form() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [userStatus, setUserStatus] = useState("")
  const handleCheckEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!emailRef?.current?.value.trim()) return
    const docRef = doc(db, "users", emailRef.current.value)
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setUserStatus("shouldSignIn")
      } else {
        setUserStatus("shouldSignUp")
      }
    } catch (err) {
      console.log(err)
    }
  }
  const signUp = async (e: React.MouseEvent) => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      emailRef.current.value.trim() === "" ||
      passwordRef.current.value.trim() === ""
    )
      return
    try {
      e.preventDefault()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
      const user = userCredential.user
      const generateAvatar = await axios.get(
        `https://avatars.dicebear.com/api/bottts/${user.uid}.1.svg`
      )
      const bottsAvatar = generateAvatar.config.url
      const indexOfTarget = emailRef.current.value.indexOf(target)
      await setDoc(doc(db, "users", emailRef.current.value), {
        email: user.email,
        displayName: user.displayName || user?.email?.slice(0, indexOfTarget),
        photoURL: bottsAvatar,
        id: user.uid,
        point: 0,
        wordleHistory: [],
      })
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message
        console.log(errorMessage)
      }
    }
  }
  const signIn = async (e: React.MouseEvent) => {}
  return (
    <form className="flex flex-col items-start w-full">
      <h1 className="flex self-center mb-4 text-2.5xl">
        {userStatus === "" && "Log in or create an account"}
        {userStatus === "shouldSignIn" && "Log in to your account"}
        {userStatus === "shouldSignUp" && "Create your free account"}
      </h1>
      <div className="flex flex-col items-start mt-4 w-full gap-1">
        <label htmlFor="email" className="font-semibold">
          Email Address
        </label>
        <input
          id="email"
          className="pl-2 w-full h-12 bg-black border border-white rounded"
          type="email"
          maxLength={64}
          ref={emailRef}
          autoFocus={userStatus === "" ? true : false}
          disabled={userStatus === "" ? false : true}
        />
      </div>
      {userStatus !== "" && (
        <div className="flex flex-col items-start mt-4 w-full gap-1">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            id="password"
            className="pl-2 w-full h-12 bg-black border border-white rounded"
            type="text"
            maxLength={64}
            ref={passwordRef}
            autoFocus
          />
        </div>
      )}
      {userStatus === "" && (
        <Button onClick={handleCheckEmail} styles={continueButtonStyles}>
          Continue
        </Button>
      )}
      {userStatus === "shouldSignIn" && (
        <Button onClick={signIn} styles={continueButtonStyles}>
          Log In
        </Button>
      )}
      {userStatus === "shouldSignUp" && (
        <Button onClick={signUp} styles={continueButtonStyles}>
          Create Account
        </Button>
      )}
    </form>
  )
}
