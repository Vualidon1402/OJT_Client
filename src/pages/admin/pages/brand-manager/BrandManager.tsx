import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/store';
import { brandAction, Brand as ReduxBrand } from '@/store/slices/brand.slice';
import './BrandManager.scss';
import apis from '@/apis';
import { fireBaseFn } from '@/firebase';

type Brand = ReduxBrand;

function BrandManager() {
  const brandStore = useSelector((store: StoreType) => store.brandStore);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const dispatch = useDispatch();
  console.log(brandStore);

  const handleEditClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = async (brandId: number) => {
    try {
      await apis.brand.deleteBrand(brandId);
      dispatch(brandAction.delete(brandId));
    } catch (error) {
      console.error('Failed to delete brand', error);
    }
  };

  return (
    <div className="table-container">
      <h1>Brand Manager</h1>
      <button className='btn btn-success' style={{marginBottom: "10px"}} onClick={handleAddClick}>Add Brand</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Description</th>
            <th>Image</th>
            <th>Status</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {brandStore.data?.map((brand: Brand, index: number) => (
            <tr key={brand.id ?? index}>
              <td>{index + 1}</td>
              <td>{brand.brandName}</td>
              <td>{brand.createdAt}</td>
              <td>{brand.description}</td>
              <td><img src={brand.image} alt={brand.brandName} width="50" /></td>
              <td>{brand.status ? 'Active' : 'Inactive'}</td>
              <td>
                <button className='button-brand-edit' onClick={() => handleEditClick(brand)}>Edit</button>
                <button className='button-brand-delete' onClick={() => handleDeleteClick(brand.id)}>Delete</button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
      {isModalOpen && selectedBrand && (
        <EditModal brand={selectedBrand} onClose={handleCloseModal} />
      )}
      {isAddModalOpen && (
        <AddBrandModal onClose={handleCloseAddModal} />
      )}
    </div>
  );
}

interface EditModalProps {
  onClose: () => void;
  brand: {
    id: number;
    brandName: string;
    description: string;
    image: string;
    status: boolean;
  };
}

function EditModal({ onClose, brand }: EditModalProps) {
  const [editedBrand, setEditedBrand] = useState(brand);
  const dispatch = useDispatch();

  const handleEditChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'image' && e.target.files) {
      const file = e.target.files[0];
      try {
        const imageUrl = await fireBaseFn.uploadToStorage(file);
        setEditedBrand({
          ...editedBrand,
          image: imageUrl,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    } else {
      setEditedBrand({
        ...editedBrand,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apis.brand.updateBrand(editedBrand);
      const updatedBrandData = response.data;

      dispatch(brandAction.update(updatedBrandData));
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to update category. Please try again.');
    }
  };

  return (
    <div className="modal-brand">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Brand</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="brandName" value={editedBrand.brandName} onChange={handleEditChange} required />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder='Tối đa 255 ký tự'
              value={editedBrand.description} onChange={handleEditChange} required />
          </label>
          <label>
            Image:
            {brand.image && (
    <img src={brand.image} alt="Current Brand" style={{ width: '100px', height: '100px' }} />
  )}
  <input type="file" name="image" onChange={handleEditChange} />
          </label>
          <label>
            Status:
            <input type="checkbox" name="status" checked={editedBrand.status} onChange={(e) => setEditedBrand({ ...editedBrand, status: e.target.checked })} />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

interface AddBrandModalProps {
  onClose: () => void;
}

function AddBrandModal ({ onClose }: AddBrandModalProps) {
  const [newBrand, setNewBrand] = useState(
    {id: 0, brandName: '',
       description: '', 
       image: "", 
       status: true });
  const dispatch = useDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'image' && e.target.files) {
      const file = e.target.files[0];
      try {
        const imageUrl = await fireBaseFn.uploadToStorage(file);
        setNewBrand({
          ...newBrand,
          image: imageUrl, 
        });
        console.log(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    } else {
      setNewBrand({
        ...newBrand,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apis.brand.addBrand(newBrand);
      const newBrandData = response.data;

      dispatch(brandAction.add(newBrandData));
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add category. Please try again.');
    }
  };
  console.log(newBrand);

  return (
    <div className="modal-category">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Brand</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="brandName" value={newBrand.brandName} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <input 
            type="text" 
            name="description" 
            placeholder='Tối đa 255 ký tự' 
            value={newBrand.description} onChange={handleChange} required />
          </label>
          <label>
            Image:
            <input type="file" name="image" onChange={handleChange} />
          </label>
          <label>
            Status:
            <input type="checkbox" name="status" checked={newBrand.status} onChange={(e) => setNewBrand({...newBrand, status: e.target.checked})} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default BrandManager;

