import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { AddProductForm } from "./add-product-form"

export default function Register() {
  return (
    <div className="items-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Product</CardTitle>
          <CardDescription>Enter Info To Add New Products</CardDescription>
        </CardHeader>
        <CardContent>
          <AddProductForm />
        </CardContent>
      </Card>
    </div>
  )
}
