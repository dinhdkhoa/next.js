"use client"

import logoutAPI from "@/app/api/auth/logout/logout.api"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

const LogoutComponent = () =>  {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sessionToken = searchParams.get("sessionToken")

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    if (sessionToken === JSON.parse(localStorage.getItem('sessionToken') || '')) {
      logoutAPI
        .logoutClient(true, signal)
        .then((res) => {
          router.push(`/login?sessionExpired=true`)
        })
    }
    return () => {
      controller.abort()
    }
  }, [sessionToken, router, pathname])
  return <div>Logout</div>
}

export default function Logout() {
  return <Suspense>

    <LogoutComponent />
  </Suspense>
}
