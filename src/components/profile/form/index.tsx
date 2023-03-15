import { useState, useRef } from "react"
import Image from "next/image"
import axios from "axios"
import { useDispatch } from "react-redux"
import { doc, getDoc, setDoc } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { db, auth, provider } from "lib/firebase"
import Button from "../button"
import Partition from "./partition"
import ButtonOnInput from "./buttonOnInput"

const continueButtonStyles =
  "mt-4 w-full h-12 text-black bg-white rounded font-semibold select-none"
const googleButtonStyles =
  "flex justify-center items-center mt-4 w-full h-12 text-white bg-black rounded border border-white font-semibold select-none gap-2"

const target = "@"

export default function Form() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [userStatus, setUserStatus] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const createUser = async (email: string, uid: string) => {
    const generateAvatar = await axios.get(
      `https://avatars.dicebear.com/api/bottts/${uid}.1.svg`
    )
    const bottsAvatar = generateAvatar.config.url
    const indexOfTarget = email?.indexOf(target)
    const name = email?.slice(0, indexOfTarget)
    await setDoc(doc(db, "users", email), {
      email,
      displayName: name,
      photoURL: bottsAvatar,
      id: uid,
      point: 0,
      wordleHistory: [],
    })
    dispatch({
      type: "HAS_CURRENT_USER",
      payload: {
        isAuthenticated: true,
        email,
        displayName: name,
        photoURL: bottsAvatar,
        id: uid,
        point: 0,
        wordleHistory: [],
      },
    })
  }
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
  const handleClickGoogle = async (e: React.MouseEvent) => {
    try {
      e.preventDefault()
      const result = await signInWithPopup(auth, provider)
      if (!result) return
      const { email, uid } = result.user
      if (typeof email !== "string") return
      await createUser(email, uid)
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message
        console.log({ errorMessage })
      }
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
      const { email, uid } = userCredential.user
      if (typeof email !== "string") return
      await createUser(email, uid)
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message
        console.log(errorMessage)
      }
    }
  }
  const signIn = async (e: React.MouseEvent) => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      emailRef.current.value.trim() === "" ||
      passwordRef.current.value.trim() === ""
    )
      return
    try {
      e.preventDefault()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
      const docRef = doc(db, "users", emailRef.current.value)
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
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message
        console.log(errorMessage)
      }
    }
  }

  const handleClickEdit = () => setUserStatus("")
  const handleClickShow = () => setShowPassword((prev) => !prev)

  return (
    <form className="flex flex-col items-start w-full">
      <h1 className="flex self-center mb-4 text-2.5xl">
        {userStatus === "" && "Log in or create an account"}
        {userStatus === "shouldSignIn" && "Log in to your account"}
        {userStatus === "shouldSignUp" && "Create your free account"}
      </h1>
      <div className="relative flex flex-col items-start mt-4 w-full gap-1">
        <label htmlFor="email" className="font-semibold">
          Email Address
        </label>
        <input
          id="email"
          className="pl-2 w-full h-12 bg-black border border-white rounded focus:outline-none"
          type="email"
          maxLength={64}
          ref={emailRef}
          autoFocus={userStatus === "" ? true : false}
          disabled={userStatus === "" ? false : true}
        />
        {userStatus !== "" && (
          <ButtonOnInput handleClick={handleClickEdit}>Edit</ButtonOnInput>
        )}
      </div>
      {userStatus !== "" && (
        <div className="relative flex flex-col items-start mt-4 w-full gap-1">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            id="password"
            className="pl-2 w-full h-12 bg-black border border-white rounded focus:outline-none"
            type={showPassword ? "text" : "password"}
            maxLength={64}
            ref={passwordRef}
            autoFocus
          />
          <ButtonOnInput handleClick={handleClickShow}>
            {showPassword ? "Hide" : "Show"}
          </ButtonOnInput>
        </div>
      )}
      {userStatus === "" && (
        <>
          <Button onClick={handleCheckEmail} styles={continueButtonStyles}>
            Continue
          </Button>
          <Partition />
          <Button onClick={handleClickGoogle} styles={googleButtonStyles}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google logo"
              width={20}
              height={20}
            />
            Continue with Google
          </Button>
        </>
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
