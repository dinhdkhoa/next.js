import Link from "next/link"
import React from "react"
import { ModeToggle } from "./mode-toggle"

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
      </ul>
      <ModeToggle />
    </nav>
  )
}
