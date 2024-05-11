import http from "@/lib/https";
import { RegisterBodyType, RegisterResType } from "@/schemaValidations/auth.schema";
import { CreateProductBodyType, ProductListResType, ProductResType } from "@/schemaValidations/product.schema";

const addProductsAPI = {
    add: (body: CreateProductBodyType) => http.post<ProductResType>('products', body),
    uploadImage: (body: FormData) =>
        http.post<{
            message: string
            data: string
        }>('/media/upload', body),
    getProductList: () => http.get<ProductListResType>('products'),
    getProductDetail: (id: string) => http.get<ProductResType>(`products/${id}`),
    
}

export default addProductsAPI