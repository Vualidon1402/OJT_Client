import api from '@/apis';
import { fireBaseFn } from '@/firebase';
import { StoreType } from '@/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Image } from '../interface';

export default function AddProduct({ setAddFormState, updateListProduct }: { setAddFormState: any, updateListProduct: any }) {
    const categoryStore = useSelector((store: StoreType) => store.categoryStore)
    const brandStore = useSelector((store: StoreType) => store.brandStore)

    const createProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as any;
        const files = form.images.files;
const uploadedImages = [];
for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const uploadedImageUrl = await fireBaseFn.uploadToStorage(file);
    uploadedImages.push(uploadedImageUrl);
}

let newProduct = {
    id: 0,
    productName: form.productName.value,
    description: form.description.value,
    image: await fireBaseFn.uploadToStorage(form.image.files[0]),
    sku: form.sku.value,
    categoryId: form.category_id.value,
    brandId: form.brand_id.value,
    images: uploadedImages
};

        api.product.addProduct(newProduct)
            .then((res) => {
                updateListProduct(res.data);
                setAddFormState(false);
                console.log(newProduct)
                //   (e.target as any).name.value = "";
                //   (e.target as any).description.value = "";
                //   (e.target as any).price.value = "";
            })
    }
    return (
        <div className='product_add_box'>
            <div className='form_box'>
                <button onClick={() => {
                    setAddFormState(false)
                }} className='btn btn-danger'>X</button>
                <form onSubmit={(e) => {
                    createProduct(e);
                }}>
                    <input type="text" name='productName' placeholder='product name' />
                    <br></br>
                    <input type="text" name='description' placeholder='product description' />
                    <br></br>
                    <input type="file" name='image' />
                    <br></br>
                    <input type="text" name='sku' placeholder='product sku' />
                    <br></br>
                    <select name='category_id'>
                        {
                            categoryStore.data?.map((category) => (
                                <option key={category.id} value={category.id}>{category.categoryName}</option>
                            ))
                        }
                    </select>
                    <br />
                    <select name='brand_id'>
                        {
                            brandStore.data?.map((brand) => (
                                <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                            ))
                        }
                    </select>
                    <br />
                    <input type="file" name='images' multiple />
                    <br />
                    <button type='submit'>save</button>
                </form>
            </div>
        </div>
    )
}
