import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { LoginForm } from "./login-form"

export default function Login() {
  return (
    <div className="items-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your infomation below to login your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
