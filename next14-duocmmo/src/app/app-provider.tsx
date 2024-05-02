"use client"
import { clientSessionToken } from "@/lib/https"
import { createContext, useContext, useState } from "react"
import React from "react"

export default function SeTSeesionToken({
  children,
  initialSessionToken = ""
}: {
  children: React.ReactNode
  initialSessionToken?: string
}) {
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken
    }
  })
  return <>{children}</>
}
