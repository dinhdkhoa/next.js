import Link from "next/link"
import React from "react"
import { ModeToggle } from "./mode-toggle"
import ButtonLogout from "./button-logout"
import { cookies } from "next/headers"

export default function Header() {

  return (
    <nav className="flex w-full">
      <ul className="inline">
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
       
        <li>
          <ButtonLogout />
        </li>
        
      </ul>
      <ModeToggle />
    </nav>
  )
}
