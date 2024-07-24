import React, { useEffect, useState } from 'react'
import { Product, Image } from './interface'
import api from '@/apis'
import { Table, Modal, Button } from 'react-bootstrap'
import './ProductManager.scss'
import AddProduct from './components/AddProduct'

export default function ProductManager() {
  const [addFormState, setAddFormState] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImages, setCurrentImages] = useState<Image[]>([]);

  useEffect(() => {
    api.product.findAll()
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => {
        console.error("API error:", err);
      });
  }, [])

  function updateListProduct(product: Product) {
    setProducts([...products, product])
  }

  function handleShowImages(images: Image[]) {
    setCurrentImages(images);
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
    setCurrentImages([]);
  }

  return (
    <div className='product_manager_box'>
      {
        addFormState ? (
          <AddProduct setAddFormState={setAddFormState} updateListProduct={updateListProduct}></AddProduct>
        ) : (
          <button onClick={() => {
            setAddFormState(true)
          }} className='btn btn-primary'>Create New</button>
        )
      }
      <h1>Product Manager</h1>
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
                  <button className='btn-show-image' onClick={() => handleShowImages(product?.images)}>
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
                <td><a href="/">xem chi tiết</a></td>
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
    </div>
  )
}
