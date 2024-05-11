import React from 'react'
import addProductsAPI from '../products.api'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ProductDetailType, ProductResType } from '@/schemaValidations/product.schema'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default async function ProductDetail({params} : {params: {id: string}}) {
    const id = params.id
    let product: ProductDetailType | null = null
    try {
        const res = await addProductsAPI.getProductDetail(id)
        if(res){
            product = res.payload.data
        }
    } catch (error) {
        
    }
  return (
    <div>
      {!product && <span>Item Not Found</span>}
      {product && (
        <Card className="w-[350px] h-auto">
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
            <Button variant={"destructive"}>Delete</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
