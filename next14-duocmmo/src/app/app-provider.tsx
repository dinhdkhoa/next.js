'use client'
import { createContext, useContext, useState } from "react";
import React from 'react'

const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {}
})
export const useAppContext = () => useContext(AppContext)


export default function AppProvider({ children,  initialSessionToken = ''}: { children: React.ReactNode, initialSessionToken?: string }) {
    const [sessionToken, setSessionToken] = useState(initialSessionToken)
  return (
    <AppContext.Provider value={{sessionToken, setSessionToken}}>
      {children}
    </AppContext.Provider>
  )
}
