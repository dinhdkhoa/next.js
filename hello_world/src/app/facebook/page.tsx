"use client"
import { useRouter } from "next/navigation"

export default function FacebookPage() {
  const router = useRouter()
  const handleClick = () => {
    router.push("/")
  }
  return (
    <div>
      Facebook Page
      <div>
        <button onClick={handleClick}>Back Home</button>
      </div>
    </div>
  )
}
