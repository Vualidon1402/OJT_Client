import { Category } from "@/store/slices/category.slice"

export interface listProductImage {
    id: number
    src: string
}


export interface Product {
    id: number
    createdAt: string
    description: string
    image: string
    productName: string
    sku: string
    status: boolean
    updatedAt: string
    // brand?: Brand;
    category: Category
    categoryName: String
    images?: listProductImage[]
    // comments: Comment[]
    // productDetails: ProductDetail[]
}