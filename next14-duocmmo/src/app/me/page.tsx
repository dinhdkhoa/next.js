import envConfig from "@/config"
import { cookies } from "next/headers"
import meAPI from "./me.api"
import Profile from "./profile"
import { Separator } from "@/components/ui/separator"
import { UpdateProfileForm } from "./update-profile-form"

export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get("sessionToken")
  const result = await meAPI.me(sessionToken?.value || '')
  return (
    <div>
      <h1>Profile</h1>
      <div>Xin chào {result.payload.data.name} ${sessionToken?.value}</div>
      <Profile />
      <Separator />
      <UpdateProfileForm profile={result.payload.data} />
    </div>
  )
}
