import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import addProductsAPI from "./products.api"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ProductsPage() {
  const res = await addProductsAPI.getProductList()
  const productList = res.payload.data

  return (
    <>
      <Link href={`products/add`}>
        <Button variant={"outline"}>Add New Products</Button>
      </Link>

      <div className=" flex gap-2 ">
        {productList &&
          productList.length > 0 &&
          productList.map((product) => (
            <Card key={product.id} className="w-[350px] h-auto">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={product.image}
                  width={180}
                  height={180}
                  alt={product.name}
                />
              </CardContent>
              <CardFooter>
                <span>{product.price}</span>
                <Link href={`products/${product.id}`}>
                  <Button variant={"outline"}>Edit</Button>
                </Link>
                <Button variant={"destructive"}>Delete</Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  )
}
