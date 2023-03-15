import { useSelector } from "react-redux"
import { RootStateType } from "@/store/reducers"
import Form from "@/components/profile/form"
import UserInfo from "@/components/profile/userInfo"

export default function Profile() {
  const userState = useSelector((state: RootStateType) => state.userReducer)
  const { isAuthenticated } = userState
  return (
    <div className="flex flex-col justify-center items-center mt-8 mx-auto max-w-md">
      {isAuthenticated ? <UserInfo /> : <Form />}
    </div>
  )
}
