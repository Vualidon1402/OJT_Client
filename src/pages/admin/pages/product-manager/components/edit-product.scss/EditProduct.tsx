import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '@/apis';
import { fireBaseFn } from '@/firebase';
import { StoreType } from '@/store';
import './EditProduct.scss';

function EditProduct({ setEditFormState, updateListProduct, productId }: { setEditFormState: any, updateListProduct: any, productId: number }) {
    const categoryStore = useSelector((store: StoreType) => store.categoryStore);
    const brandStore = useSelector((store: StoreType) => store.brandStore);
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        api.product.getProductById(productId)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.error("API error:", err);
            });
    }, [productId]);
    console.log(product);

    const updateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as any;
        const files = form.images.files;
        const uploadedImages = [];
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uploadedImageUrl = await fireBaseFn.uploadToStorage(file);
            uploadedImages.push(uploadedImageUrl);
        }
    
        const finalImages = uploadedImages.length > 0 ? uploadedImages : product.images.map((img: { src: string }) => img.src);
    
        const mainImage = form.image.files.length > 0 ? await fireBaseFn.uploadToStorage(form.image.files[0]) : product.image;
    
        let updatedProduct = {
            id: product.id,
            productName: form.productName.value,
            description: form.description.value,
            image: mainImage,
            sku: form.sku.value,
            categoryId: form.category_id.value,
            brandId: form.brand_id.value,
            images: finalImages,
            status: form.status.checked
        };
    
        api.product.updateProduct(updatedProduct)
            .then((res) => {
                updateListProduct(res.data);
                setEditFormState(false);
                location.reload();

            })
            .catch(err => {
                console.error("API error:", err);
            });
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className='product_edit_box'>
    <div className='form_box'>
        <button onClick={() => {
            setEditFormState(false);
        }} className='close_btn'>X</button>
        <h1 className='form_title'>Form Edit Product</h1>
        <form className='edit_form' onSubmit={(e) => {
            updateProduct(e);
        }}>
            <input type="text" name='productName' defaultValue={product.productName} placeholder='product name' className='form_input' />
            <br />
            <input type="text" name='description' defaultValue={product.description} placeholder='product description' className='form_input' />
            <br />
            <img src={product.image} alt='product' className='form_image' style={{ width: '460px', height: '150px' }}/>
            <input type="hidden" name='currentImage' value={product.image} />
            <input type="file" name='image' className='form_file' />
            <br />
            <input type="text" name='sku' defaultValue={product.sku} placeholder='randomly or actively filled in' className='form_input' />
            <br />
            <select name='category_id' defaultValue={product.categoryId} className='form_select'>
                {
                    categoryStore.data?.map((category) => (
                        <option key={category.id} value={category.id}>{category.categoryName}</option>
                    ))
                }
            </select>
            <br />
            <select name='brand_id' defaultValue={product.brandId} className='form_select'>
                {
                    brandStore.data?.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                    ))
                }
            </select>
            <br />
            {product.images.map((image: { src: string }, index: number) => (
                <img key={index} src={image.src} alt='product' className='form_image' style={{ width: '100px', height: '50px', display: 'inline-block', marginRight: '5px' }} />
            ))}

            <input type="file" name='images' multiple className='form_file' />
            <br />
            <label className='form_label'>
                Status:
                <input type="checkbox" name='status' defaultChecked={product.status} className='form_checkbox' />
            </label>
            <br />
            <button type='submit' className='btn_primary'>save</button>
        </form>
    </div>
</div>

    );
}

export default EditProduct;