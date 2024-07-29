import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/apis';

import AddProductDetail from './add-product-detail/AddProductDetail';
import EditProductDetail from './edit-product-detail/EditProductDetail';
import './ProductDetail.scss';

import { Config } from '@/store/slices/config.slice';
import { Color } from '@/store/slices/color.slice';
import { use } from 'i18next';

interface Product {
  id: number;
  productName: string;
}

interface ProductDetail {
  id: number;
  image: string;
  productDetailName: string;
  stock: number;
  unitPrice: number;
  color?: Color;
  colorId: number;
  productId?: number;
  config?: Config;
  configId: number;
  status?: boolean;
  discount?: number;
  discountPrice?: number;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentProductDetailId, setCurrentProductDetailId] = useState<number | null>(null);
  const [editFormState, setEditFormState] = useState<boolean>(false);
  const [addFormState, setAddFormState] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.product.getProductById(Number(productId));
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching product data');
      }
    };
    const fetchProductDetails = async () => {
      try {
        const response = await api.productDetail.getProductDetailByProductId(Number(productId));
        setProductDetails(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Error fetching product detail data');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchProductDetails();
  }, [productId]);

  const handleAddProductDetailClick = () => {
    setAddFormState(true);
  };

  const handleEditProductDetailClick = (productDetailId: number) => {
    setCurrentProductDetailId(productDetailId);
    setEditFormState(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAddFormState(false);
    setEditFormState(false);
  };

  const updateListProductDetail = (newProductDetail: ProductDetail) => {
    setProductDetails(prevDetails => [...prevDetails, newProductDetail]);
  };

  const handleDeleteProductDetail = async (id: number) => {
    try {
      await api.productDetail.deleteProductDetail(id);
      setProductDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
    } catch (err) {
      setError('Error deleting product detail');
    }
  };

  return (
    <div className="product-detail-container">
      <h1>Product Detail for ID: {product?.id}</h1>
      <p>Name: {product?.productName}</p>
      <h2>Product Details</h2>
      {editFormState ? (
        <EditProductDetail
          productDetailId={currentProductDetailId!}
          onClose={handleCloseModal}
          updateListProductDetail={updateListProductDetail}
          setEditFormState={setEditFormState}
        />
      ) : (
        addFormState ? (
          <AddProductDetail
            productId={Number(productId)}
            onClose={handleCloseModal}
            setAddFormState={setAddFormState}
            updateListProductDetail={updateListProductDetail}
          />
        ) : (
          <>
            <button onClick={() => navigate(-1)} className='btn btn-secondary' style={{marginRight : "20px"}}>Back</button>
            <button onClick={handleAddProductDetailClick} className='btn btn-success'>Create New</button>
            {productDetails.length > 0 ? (
              <table className="product-detail-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Product Detail Name</th>
                    <th>Stock</th>
                    <th>Unit Price</th>
                    <th>Discount</th>
                    <th>Discount Price</th>
                    <th>Color Name</th>
                    <th>Config Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productDetails.map(detail => (
                    <tr key={detail.id}>
                      <td>{detail.id}</td>
                      <td><img src={detail.image} alt={detail.productDetailName} width="50" height="50" /></td>
                      <td>{detail.productDetailName}</td>
                      <td>{detail.stock}</td>
                      <td>{detail.unitPrice}</td>
                      <td>{detail.discount}</td>
                      <td>{detail.discountPrice}</td>
                      <td>{detail.color?.colorName}</td>
                      <td>{detail.config?.configName}</td>
                      <td>{detail.status ? "Còn hàng" : "Hết hàng"}</td>
                      <td>
                      <button className='btn btn-primary' onClick={() => handleEditProductDetailClick(detail.id)} style={{ marginRight: '10px' }}>Edit</button>
                        <button className='btn btn-danger' onClick={() => handleDeleteProductDetail(detail.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No product details available</p>
            )}
          </>
        )
      )}
    </div>
  );
};

export default ProductDetail;