import { useState, useRef } from "react"
import Image from "next/image"
import { useDispatch } from "react-redux"
import Button from "../button"
import Partition from "./partition"
import ButtonOnInput from "./buttonOnInput"
import {
  handleCheckEmail,
  handleClickGoogle,
  signUp,
  signIn,
  handleClickGithub,
} from "@/utils/functions/handleClickAuth"

const continueButtonStyles =
  "mt-4 w-full h-12 text-black bg-white rounded font-semibold select-none"
const thirdPartyButtonStyles =
  "flex justify-center items-center mt-4 w-full h-12 text-white bg-black rounded border border-white font-semibold select-none gap-2"

export default function Form() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [userStatus, setUserStatus] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

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
      {(userStatus === "shouldSignIn" || userStatus === "shouldSignUp") && (
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
      {(userStatus === "" || userStatus === "shouldSignInWithThirdParty") && (
        <>
          {userStatus === "" && (
            <>
              <Button
                onClick={(e) => handleCheckEmail(e, emailRef, setUserStatus)}
                styles={continueButtonStyles}
              >
                Continue
              </Button>
              <Partition />
            </>
          )}
          {userStatus === "shouldSignInWithThirdParty" && (
            <div className="mx-auto my-5 text-center font-semibold">
              You already have a third-party account.
              <br />
              Please click the button below.
            </div>
          )}
          <Button
            onClick={(e) => handleClickGoogle(e, dispatch)}
            styles={thirdPartyButtonStyles}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google logo"
              width={20}
              height={20}
            />
            Continue with Google
          </Button>
          <Button
            onClick={(e) => handleClickGithub(e, dispatch)}
            styles={thirdPartyButtonStyles}
          >
            <Image
              className="bg-white rounded-full"
              src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Github-circle_%28CoreUI_Icons_v1.0.0%29.svg"
              alt="github logo"
              width={20}
              height={20}
            />
            Continue with Github
          </Button>
        </>
      )}
      {userStatus === "shouldSignIn" && (
        <Button
          onClick={(e) => signIn(e, emailRef, passwordRef, dispatch)}
          styles={continueButtonStyles}
        >
          Log In
        </Button>
      )}
      {userStatus === "shouldSignUp" && (
        <Button
          onClick={(e) => signUp(e, emailRef, passwordRef, dispatch)}
          styles={continueButtonStyles}
        >
          Create Account
        </Button>
      )}
    </form>
  )
}
