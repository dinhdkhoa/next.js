"use client"
import { useEffect, useState } from "react"
import meAPI from "./me.api"
import { AccountResType } from "@/schemaValidations/account.schema"

export default function Profile() {
  let [user, setUser] = useState<AccountResType["data"] | null>(null)
  useEffect(() => {
    const callAPI = async () => {
      const result = await meAPI.meClient()
      setUser(result.payload.data)
    }
    callAPI()
  }, [])
  return <div>Client Component ${user?.name}</div>
}
