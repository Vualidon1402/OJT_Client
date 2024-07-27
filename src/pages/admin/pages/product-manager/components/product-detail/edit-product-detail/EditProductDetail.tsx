import React, { useEffect, useState } from 'react';
import api from '@/apis';
import { useSelector } from 'react-redux';
import { StoreType } from '@/store';
import './EditProductDetail.scss';
import { fireBaseFn } from '@/firebase';
import ProductDetail from '../ProductDetail';

interface EditProductDetailProps {
  productDetailId: number;
  onClose: () => void;
  updateListProductDetail: (newProductDetail: ProductDetail) => void;
  setEditFormState: (state: boolean) => void;
}

const EditProductDetail: React.FC<EditProductDetailProps> = ({ productDetailId, onClose, updateListProductDetail, setEditFormState }) => {
  const [productDetail, setProductDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const colorStore = useSelector((store: StoreType) => store.colorStore);
  const configStore = useSelector((store: StoreType) => store.configStore);

  useEffect(() => {
    api.productDetail.getProductDetailById(productDetailId)
      .then(res => {
        setProductDetail(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API error:', err);
        setError('Error loading product detail');
        setLoading(false);
      });
  }, [productDetailId]);

  const updateProductDetail = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;

    const mainImage = form.image.files.length > 0 ? await fireBaseFn.uploadToStorage(form.image.files[0]) : productDetail.image;

    let updatedProductDetail = {
      id: productDetail.id,
      productDetailName: form.productDetailName.value,
      stock: form.stock.value,
      unitPrice: form.unitPrice.value,
      productId: productDetail.productId,
      colorId: form.colorId.value,
      configId: form.configId.value,
      status: form.status.checked,
      image: mainImage,
      discount: form.discount.value,
    };
    console.log(updatedProductDetail);

    api.productDetail.updateProductDetail(updatedProductDetail)
      .then((res) => {
        updateListProductDetail(res.data);
        console.log(res.data);
        setEditFormState(false);
        location.reload();
      })
      .catch(err => {
        console.error('API error:', err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product_detail_edit_box">
      <div className='form_box'>
        <button onClick={() => {
          setEditFormState(false);
        }} className='close_btn'>X</button>
        <h2 className='form_title'>Edit Product Detail</h2>
        <form className='edit_form' onSubmit={(e) => {
          updateProductDetail(e);
        }}>
          <div className='form_group'>
            <label className='form_label'>Product Detail Name</label>
            <input
              type="text"
              name="productDetailName"
              defaultValue={productDetail.productDetailName}
              placeholder='product detail name'
              className='form_input'
            />
          </div>
          <div className='form_group image_center'>
            <label className='form_label'>Image: </label>
            <img src={productDetail.image} alt='product detail' className='form_image' />
            <input type="file" name="image" className='form_input' />
          </div>
          <div className='form_group'>
            <label className='form_label'>Stock: </label>
            <input
              type="number"
              name="stock"
              defaultValue={productDetail.stock}
              placeholder='stock'
              className='form_input'
            />
          </div>
          <div className='form_group'>
            <label className='form_label'>Unit Price: </label>
            <input
              type="number"
              name="unitPrice"
              defaultValue={productDetail.unitPrice}
              placeholder='unit price'
              className='form_input'
            />
          </div>
          <div className='form_group'>
            <label className='form_label'>Discount: </label>
            <input
              type="number"
              name="discount"
              defaultValue={productDetail.discount}
              placeholder='discount'
              className='form_input'
            />
          </div>
          <div className='form_group'>
            <label className='form_label'>Status: </label>
            <input
              type="checkbox"
              name="status"
              defaultChecked={productDetail.status}
              className='form_input'
            />
          </div>
          <div className='form_group'>
            <label className='form_label'>Color: </label>
            <select name='colorId' defaultValue={productDetail.colorId} className='form_select'>
              {colorStore.data?.map((color) => (
                <option key={color.id} value={color.id}>{color.colorName}</option>
              ))}
            </select>
          </div>
          <div className='form_group'>
            <label className='form_label'>Config: </label>
            <select name='configId' defaultValue={productDetail.configId} className='form_select'>
              {configStore.data?.map((config) => (
                <option key={config.id} value={config.id}>{config.configName}</option>
              ))}
            </select>
          </div>
          <button type='submit' className='btn_primary'>save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProductDetail;