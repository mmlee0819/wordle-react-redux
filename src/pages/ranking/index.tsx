import { useState, useEffect } from "react"
import { UserStateType } from "@/store/reducers/userReducer"
import { collection, getDocs } from "firebase/firestore"
import Image from "next/image"
import { db } from "lib/firebase"

export default function Ranking() {
  const [allUsers, setAllUsers] = useState<UserStateType[]>()
  console.log({ allUsers })
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"))
        const users: UserStateType[] = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          users.push(doc.data() as UserStateType)
        })
        setAllUsers(users as UserStateType[])
      } catch (error) {
        if (error instanceof Error) {
          const errorMessage = error.message
          console.log({ errorMessage })
        }
      }
    }
    getAllUsers()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center mt-8 mx-auto max-w-md">
      {allUsers?.map((user) => (
        <div className="flex justify-between w-full" key={user.id}>
          <Image
            src={user.photoURL}
            alt={`${user.displayName}'s avatar`}
            width={40}
            height={40}
          />
          <div>{user.displayName}</div>
          <div>{user.point} pt</div>
        </div>
      ))}
    </div>
  )
}
