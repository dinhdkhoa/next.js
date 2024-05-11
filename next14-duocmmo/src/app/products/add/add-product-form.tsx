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
import { CreateProductBody, CreateProductBodyType } from "@/schemaValidations/product.schema"
import Image from "next/image"
import { useRef, useState } from "react"
import { toast } from "sonner"
import addProductsAPI from "../products.api"

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: "",
      price:0,
      description: '',
      image: ''
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: CreateProductBodyType) {
    if (isLoading) return
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file as Blob)
      const resp = await addProductsAPI.uploadImage(formData)
      toast.success(resp.payload.message)
      const createProduct = await addProductsAPI.add({
        ...values,
        image: resp.payload.data
      })
      toast.success(createProduct.payload.message)
      form.reset()
    } catch (error) {
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
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={inputRef}
                  accept="image/*"
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.value = ""
                    }
                  }}
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) {
                      inputRef
                      setFile(file)
                      field.onChange("http://localhost:3000/" + file.name)
                    }
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {file && (
          <>
            <Image
              src={URL.createObjectURL(file)}
              width={128}
              height={128}
              alt="Product Image"
              className="w-32 h-32 object-cover"
            />
            <Button
              type="button"
              variant={"destructive"}
              size={"sm"}
              onClick={() => {
                setFile(null)
                form.setValue("image", "")
                if (inputRef.current) {
                  inputRef.current.value = ""
                }
              }}
            >
              Reset File
            </Button>
          </>
        )}
        <Button type="submit" className="!mt-8 w-full" disabled={isLoading}>
          Add Product
        </Button>
      </form>
    </Form>
  )
}
