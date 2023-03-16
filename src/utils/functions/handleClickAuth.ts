import axios from "axios"
import { doc, getDoc, setDoc } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { db, auth, googleProvider, githubProvider } from "lib/firebase"
import { Dispatch, AnyAction } from "@reduxjs/toolkit"
import { RefObject, SetStateAction } from "react"

const target = "@"

const createUser = async (
  email: string,
  uid: string,
  source: string,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const generateAvatar = await axios.get(
      `https://avatars.dicebear.com/api/bottts/${uid}.1.svg`
    )
    const bottsAvatar = generateAvatar.config.url
    const indexOfTarget = email?.indexOf(target)
    const name = email?.slice(0, indexOfTarget)
    await setDoc(doc(db, "users", email), {
      account: source,
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
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message
      console.log({ errorMessage })
    }
  }
}

const handleCheckEmail = async (
  e: React.MouseEvent,
  ref: RefObject<HTMLInputElement>,
  setUserStatus: (value: SetStateAction<string>) => void
) => {
  e.preventDefault()
  if (!ref?.current?.value.trim()) return
  const docRef = doc(db, "users", ref.current.value)
  try {
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) return setUserStatus("shouldSignUp")
    if (docSnap.exists() && docSnap.data().account === "firebase")
      return setUserStatus("shouldSignIn")

    setUserStatus("shouldSignInWithThirdParty")
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message
      console.log({ errorMessage })
    }
  }
}

const handleClickGoogle = async (
  e: React.MouseEvent,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    e.preventDefault()
    const result = await signInWithPopup(auth, googleProvider)
    if (!result) return
    const { email, uid } = result.user
    if (typeof email !== "string") return
    await createUser(email, uid, "google", dispatch)
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message
      console.log({ errorMessage })
    }
  }
}

const handleClickGithub = async (
  e: React.MouseEvent,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    e.preventDefault()
    const result = await signInWithPopup(auth, githubProvider)
    if (!result) return
    const { email, uid } = result.user
    if (typeof email !== "string") return
    await createUser(email, uid, "github", dispatch)
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message
      console.log({ errorMessage })
    }
  }
}

const signUp = async (
  e: React.MouseEvent,
  emailRef: RefObject<HTMLInputElement>,
  passwordRef: RefObject<HTMLInputElement>,
  dispatch: Dispatch<AnyAction>
) => {
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
    await createUser(email, uid, "firebase", dispatch)
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message
      console.log({ errorMessage })
    }
  }
}

const signIn = async (
  e: React.MouseEvent,
  emailRef: RefObject<HTMLInputElement>,
  passwordRef: RefObject<HTMLInputElement>,
  dispatch: Dispatch<AnyAction>
) => {
  if (
    !emailRef.current ||
    !passwordRef.current ||
    emailRef.current.value.trim() === "" ||
    passwordRef.current.value.trim() === ""
  )
    return
  try {
    e.preventDefault()
    await signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
    const docRef = doc(db, "users", emailRef.current.value)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) return dispatch({ type: "LOG_OUT" })
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
    }
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message
      console.log({ errorMessage })
    }
  }
}

export {
  handleCheckEmail,
  handleClickGoogle,
  handleClickGithub,
  signUp,
  signIn,
}
