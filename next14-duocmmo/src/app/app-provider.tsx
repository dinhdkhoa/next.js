"use client"
import { AccountType } from "@/schemaValidations/account.schema"
import { createContext, useContext, useState } from "react"
import React from "react"

const AppContext = createContext<{
  user: AccountType | null;
  setUser: React.Dispatch<React.SetStateAction<AccountType | null>>;
}>({
  user: null,
  setUser: () => null,
});

export const useAppContext = () => useContext(AppContext);
export default function SeTSeesionToken({
  children,
  user : userProps = null,
}: {
  children: React.ReactNode,
  user: AccountType | null,
}) {
  const [user, setUser] = useState<AccountType | null>(userProps)
  useState(() => {
    if (typeof window !== "undefined") {
      
    }
  })
  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}
