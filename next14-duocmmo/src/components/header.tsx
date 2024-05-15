import Link from "next/link"
import React from "react"
import { ModeToggle } from "./mode-toggle"
import ButtonLogout from "./button-logout"
import { cookies } from "next/headers"
import loginAPI from "@/app/(auth)/login/login.api"
import meAPI from "@/app/me/me.api"
import { handleApiError } from "@/lib/utils"
import { AccountType } from "@/schemaValidations/account.schema"

export default async function Header({user}: { user: AccountType | null }) { // thay vì truyền props user có thể dùng cookies()
  return (
    <nav className="flex w-full">
      {/* <ul className="flex gap-3">
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
      </ul> */}
      <ModeToggle />
    </nav>
  )
}
