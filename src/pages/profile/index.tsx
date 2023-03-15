import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { db, auth, provider } from "../../../lib/firebase"
import Form from "@/components/profile/form"
import Button from "@/components/profile/button"
import Partition from "@/components/profile/partition"
import Image from "next/dist/client/image"

const googleButtonStyles =
  "flex justify-center items-center mt-4 w-full h-12 text-white bg-black rounded border border-white font-semibold select-none gap-2"

export default function Profile() {
  const handleClickGoogle = async (e: React.MouseEvent) => {
    try {
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      console.log({ result })
      console.log({ credential })
      console.log({ token })
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message
        console.log({ errorMessage })
      }
    }
  }
  return (
    <div className="flex flex-col justify-center mt-8 mx-auto max-w-md">
      <Form />
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
    </div>
  )
}
