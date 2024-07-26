// ImageModel.ts
export interface ImageModel {
  id: number;
  src: string;
  product: ProductModel;
}

// ProductDetailModel.ts
export interface ProductDetailModel {
  id: number;
  image: string;
  productDetailName: string;
  status: boolean;
  stock: number;
  unitPrice: number;
  color: ColorModel;
  config: ConfigModel;
  product: ProductModel;
}

// ProductModel.ts
export interface ProductModel {
  id: number;
  createdAt: Date;
  description: string;
  image: string;
  productName: string;
  sku: string;
  status: boolean;
  updatedAt: Date;
  brand: BrandModel;
  category: CategoryModel;
  images: ImageModel[];
  comments: CommentModel[];
  productDetails: ProductDetailModel[];
}

// ColorModel.ts
export interface ColorModel {
    id: number;
    colorName: string;
    status: boolean;
}

// ConfigModel.ts
export interface ConfigModel {
    id: number;
    configName: string;
    status: boolean;
}

// BrandModel.ts
export interface BrandModel {
    id: number;
    brandName: string;
    createdAt: Date;
    description: string;
    image: string;
    status: boolean;
}

// CategoryModel.ts
export interface CategoryModel {
    id: number;
    categoryName: string;
    createdAt: Date;
    description: string;
    image: string;
    status: boolean;
    products: ProductModel[];
}

// CommentModel.ts
export interface CommentModel {
    id: number;
    comment: string;
    createdAt: Date;
    status: boolean;
    product: ProductModel;
    userId: number;
}
