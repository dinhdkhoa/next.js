"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import envConfig from "@/config"
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import { toast } from "sonner"
import { useAppContext } from "@/app/app-provider"

export function LoginForm() {
  const {setSessionToken} = useAppContext()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      password: "",
      email: ""
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    try {
      const resp = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values),
          method: "POST"
        }
      )
      const payload = await resp.json()
      const data = {
        status: resp.status,
        payload
      }
      if (!resp.ok) {
        throw data
      }
      const respFromNextServer = await fetch(`api/auth`, {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        method: "POST"
      })

      if (respFromNextServer) {
        const payload = await respFromNextServer.json()
        setSessionToken(payload.data.token)
      }
      toast.success(data.payload.message)
      
      return data
    } catch (error: any) {
      console.log(error)
      const errorsList = error?.payload?.errors as {
        field: "email" | "password"
        message: string
      }[]
      if (errorsList && errorsList.length > 0) {
        errorsList.forEach((err) => {
          form.setError(err.field, {
            type: "server",
            message: err.message
          })
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full max-w-[400px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-8 w-full">
          Login
        </Button>
      </form>
    </Form>
  )
}
