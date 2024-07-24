import { Brand } from "@/store/slices/brand.slice"
import { Category } from "@/store/slices/category.slice"
import { Color } from "@/store/slices/color.slice"
import { Config } from "@/store/slices/config.slice"

export interface ProductDetail {
    id: number
    image: string
    productDetailName: string
    status: boolean
    stock: number
    unitPrice: number
    color: Color
    config : Config
}

export interface Image {
    id?: number
    src: string
  }
  


export interface Product {
    id: number
    createdAt?: string
    description: string
    image: string
    productName: string
    sku: string
    status?: boolean
    updatedAt?: string
    brand?: Brand
    brandId?: String
    category?: Category
    categoryId?: string
    images?:  string[];
    // comments: Comment[]
    productDetails?: ProductDetail[]
}



