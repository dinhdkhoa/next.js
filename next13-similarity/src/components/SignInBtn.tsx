'use client'
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "./ui/Button"

interface SignInBtnProps {}

const SignInBtn = ({} : SignInBtnProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const signInuser = async () => {
        setIsLoading(true)
        try {
            await signIn('google')
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }

    }

    return (
    <Button onClick={signInuser} isLoading={isLoading} >
        Sign In
    </Button>
    )
}

export default SignInBtn