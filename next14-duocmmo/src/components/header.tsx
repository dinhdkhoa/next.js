import Link from "next/link"
import React from "react"
import { ModeToggle } from "./mode-toggle"
import ButtonLogout from "./button-logout"
import { cookies } from "next/headers"
import loginAPI from "@/app/(auth)/login/login.api"
import meAPI from "@/app/me/me.api"
import { handleApiError } from "@/lib/utils"

export default async function Header() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get("sessionToken")?.value
  let user = null

  if(sessionToken) {
    try {
      const checkUser = await meAPI.me(sessionToken)
      user = checkUser.payload.data
    } catch (error) {
      handleApiError(error)
    }
    
  }

  return (
    <nav className="flex w-full">
      <ul className="flex gap-3">
        <li>
          <Link href={"/products"}>Products</Link>
        </li>
        {user && (
          <>
            <span>Hello {user.name}</span>
            <li>
              <Link href={"/me"}>Me</Link>
            </li>
            <li>
              <ButtonLogout />
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link href={"/register"}>Register</Link>
            </li>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
          </>
        )}
      </ul>
      <ModeToggle />
    </nav>
  )
}
