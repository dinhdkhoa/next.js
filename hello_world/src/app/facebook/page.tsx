"use client"
import { useRouter } from "next/navigation"
import Button from "react-bootstrap/Button"

export default function FacebookPage() {
  const router = useRouter()
  const handleClick = () => {
    router.push("/")
  }
  return (
    <div>
      Facebook Page
      <div>
        <Button variant="danger">Hoidanit</Button>
        <button onClick={handleClick}>Back Home</button>
      </div>
    </div>
  )
}
