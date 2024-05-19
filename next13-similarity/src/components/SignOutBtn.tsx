'use client'

import { signIn, signOut } from "next-auth/react"
import { useState } from "react"
import { Button } from "./ui/Button"

interface SignOutBtnProps {
  
}

const SignOutBtn = ({} : SignOutBtnProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const signOutUser = async () => {
        setIsLoading(true)
        try {
            await signOut()
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }

    }

  return (
    <>
      <Button
        onClick={signOutUser}
        isLoading={isLoading}
      >Sign Out</Button>
    </>
  )
}

export default SignOutBtn