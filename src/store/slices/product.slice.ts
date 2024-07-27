// ImageModel.ts
export interface ImageModel {
    id: number;
    src: string;
    product: ProductModel;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 5da2e2d (Completed ui-api-integration-flash-sale-product-homePage)
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
    discount: number;
    discountPrice: number;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 5da2e2d (Completed ui-api-integration-flash-sale-product-homePage)
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
<<<<<<< HEAD

=======
  
>>>>>>> 5da2e2d (Completed ui-api-integration-flash-sale-product-homePage)
  // ColorModel.ts
  export interface ColorModel {
      id: number;
      colorName: string;
      status: boolean;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 5da2e2d (Completed ui-api-integration-flash-sale-product-homePage)
  // ConfigModel.ts
  export interface ConfigModel {
      id: number;
      configName: string;
      status: boolean;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 5da2e2d (Completed ui-api-integration-flash-sale-product-homePage)
  // BrandModel.ts
  export interface BrandModel {
      id: number;
      brandName: string;
      createdAt: Date;
      description: string;
      image: string;
      status: boolean;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 5da2e2d (Completed ui-api-integration-flash-sale-product-homePage)
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
<<<<<<< HEAD

=======
  
>>>>>>> 5da2e2d (Completed ui-api-integration-flash-sale-product-homePage)
  // CommentModel.ts
  export interface CommentModel {
      id: number;
      comment: string;
      createdAt: Date;
      status: boolean;
      product: ProductModel;
      userId: number;
  }