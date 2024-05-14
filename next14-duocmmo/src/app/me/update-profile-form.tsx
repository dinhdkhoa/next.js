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
import { handleApiError } from "@/lib/utils"
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType
} from "@/schemaValidations/account.schema"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import meAPI from "./me.api"

type Props = AccountResType["data"]

export function UpdateProfileForm({ profile }: { profile: Props }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: ""
    }
  })

  async function onSubmit(values: UpdateMeBodyType) {
    if (isLoading) return
    setIsLoading(true)
    try {
      const resp = await meAPI.updateMe(values)
      toast.success(resp.payload.message)
      router.refresh()
    } catch (error: any) {
      handleApiError(error, form.setError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full max-w-[400px]"
      >
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            placeholder="Email"
            type="email"
            value={profile.email}
            readOnly
          />
        </FormControl>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-8 w-full">
          Cập nhật
        </Button>
      </form>
    </Form>
  )
}
