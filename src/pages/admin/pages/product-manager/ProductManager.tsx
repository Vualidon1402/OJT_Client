import React, { useEffect, useState } from 'react'
import { Product } from './interface'
import api from '@/apis'
import { Table } from 'react-bootstrap'
import './ProductManager.scss'

export default function ProductManager() {
  // const [addFormState, setAddFormState] = useState(false);

  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    api.product.findAll()
      .then(res => {
        setProducts(res.data)
      })
  }, [])

  return (
    <div className='product_manager_box'>
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
            <th>description</th>
            <th>Sku</th>
            <th>Status</th>
            <th>Conments</th>
            <th>ProductDetail</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.image}</td>
                <td>null</td>
                <td>{product.createdAt}</td>
                <td>{product.updatedAt}</td>
                <td>nokia</td>
                <td>{product.category.categoryName}</td>
                <td>{product.description}</td>
                <td>{product.sku}</td>
                <td>{product.status ? "đang bán" : "ngừng bán"}</td>
                <td>rẻ đẹp</td>
                <td><a href="/">xem chi tiết</a></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}
