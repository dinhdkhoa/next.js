"use client"
import { useEffect } from "react"
import meAPI from "./me.api"
import { clientSessionToken } from "@/lib/https"

export default function Profile() {

  useEffect(() => {
    const callAPI = async () => {
      const result = await meAPI.meClient()
    }
    callAPI()
  }, [])
  return (
    <div>
      Client Component ${clientSessionToken.value}
    </div>
  )
}
