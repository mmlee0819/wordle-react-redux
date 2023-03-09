import { useState, useRef } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../../lib/firebase"
import Button from "./button"

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

  return (
    <div className="flex justify-center mt-8 mx-auto max-w-md">
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

        <Button onClick={handleCheckEmail}>
          {userStatus === "" && "Continue"}
          {userStatus === "shouldSignIn" && "Log In"}
          {userStatus === "shouldSignUp" && "Create Account"}
        </Button>
      </form>
    </div>
  )
}
