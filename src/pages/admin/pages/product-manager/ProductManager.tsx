import React, { useEffect, useState } from 'react';
import { Product, Image } from './interface';
import api from '@/apis';
import { Table, Modal, Button } from 'react-bootstrap';
import './ProductManager.scss';
import AddProduct from './components/add-product/AddProduct';
import EditProduct from './components/edit-product/EditProduct';
import { Link } from 'react-router-dom';

function ProductManager() {
  const [addFormState, setAddFormState] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImages, setCurrentImages] = useState<Image[]>([]);
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);
  const [editFormState, setEditFormState] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    api.product.findAll()
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error("API error:", err);
      });
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      api.product.findAll()
        .then(res => {
          setProducts(res.data);
        })
        .catch(err => {
          console.error("API error:", err);
        });
    } else {
      api.product.sortProductByStatus(statusFilter === 'true')
        .then(res => {
          setProducts(res.data);
        })
        .catch(err => {
          console.error("API error:", err);
        });
    }
  }, [statusFilter]);

  function handleEditProduct(productId: any) {
    setCurrentProductId(productId);
    setEditFormState(true);
  }

  function handleShowImages(images: Image[]) {
    setCurrentImages(images);
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
    setCurrentImages([]);
  }

  const updateListProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  const handleDeleteProduct = (productId: number) => {
    api.product.deleteProduct(productId)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map(product =>
            product.id === productId ? { ...product, status: false } : product
          )
        );
      })
      .catch(err => {
        console.error("Delete error:", err);
      });
  };

  return (
    <div className='product_manager_box'>
      <h1>Product Manager</h1>
      {
        editFormState ? (
          <EditProduct productId={currentProductId} setEditFormState={setEditFormState} updateListProduct={updateListProduct} />
        ) : (
          addFormState ? (
            <AddProduct setAddFormState={setAddFormState} updateListProduct={updateListProduct} />
          ) : (
            <>
              <button onClick={() => setAddFormState(true)} className='btn btn-success'>Create New</button>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="statusFilter">Filter by Status: </label>
                <select id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Images</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAt</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Sku</th>
                    <th>Status</th>
                    <th>Comments</th>
                    <th>ProductDetail</th>
                    <th colSpan={2}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product?.productName}</td>
                        <td><img src={product?.image} alt={product?.productName} width="50" height="50" /></td>
                        <td>
                          <button className='btn-show-image btn btn-primary' onClick={() => handleShowImages(product?.images)}>
                            Show Images
                          </button>
                        </td>
                        <td>{product?.createdAt}</td>
                        <td>{product?.updatedAt}</td>
                        <td>{product?.brand?.brandName}</td>
                        <td>{product?.category?.categoryName}</td>
                        <td>{product?.description}</td>
                        <td>{product?.sku}</td>
                        <td>{product?.status ? "đang bán" : "ngừng bán"}</td>
                        <td>rẻ đẹp</td>
                        <td>
                          <Link to={`/manager/product-detail/${product.id}`}>xem chi tiết</Link>
                        </td>
                        <td>
                          <button style={{ marginRight: "10px" }} className='btn btn-warning' onClick={() => handleEditProduct(product.id)}>Edit</button>
                          {product.status && (
                            <button className='btn btn-danger' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                          )}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>

              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Product Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {
                    currentImages.map(img => (
                      <img key={img.id} src={img.src} alt="product" width="70px" height="50px" style={{ margin: '10px 10px 10px 10px' }} />
                    ))
                  }
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )
        )
      }
    </div>
  );
}

export default ProductManager;