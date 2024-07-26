import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/store';
import { categoryAction, Category as ReduxCategory } from '@/store/slices/category.slice';
import './CategoryManager.scss';
import apis from '@/apis';
import { fireBaseFn } from '@/firebase';

type Category = ReduxCategory;

function CategoryManager() {
  const categoryStore = useSelector((store: StoreType) => store.categoryStore);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const dispatch = useDispatch();
  console.log(categoryStore);

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = async (categoryId: number) => {
    try {
      await apis.category.deleteCategory(categoryId);
      dispatch(categoryAction.delete(categoryId));
    } catch (error) {
      console.error('Failed to delete category', error);
    }
  };


  return (
    <div className="table-container">
      <h1>Category Manager</h1>
      <button onClick={handleAddClick} className='btn btn-success' style={{ marginBottom: "10px" }}>Add Category</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Image</th>
            <th>Status</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryStore.data?.map((category: Category, index: number) => (
            <tr key={category.id ?? index}>
              <td>{index + 1}</td>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
              <td>{category.createdAt}</td>
              <td><img src={category.image} alt={category.categoryName} width="50" /></td>
              <td>{category.status ? 'Active' : 'Inactive'}</td>
              <td>
                <button className='button-category-edit' onClick={() => handleEditClick(category)}>Edit</button>
                <button className='button-category-delete' onClick={() => handleDeleteClick(category.id)}>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      {isModalOpen && selectedCategory && (
        <EditModal category={selectedCategory} onClose={handleCloseModal} />
      )}
      {isAddModalOpen && (
        <AddCategoryModal onClose={handleCloseAddModal} />
      )}
    </div>
  );
}

interface EditModalProps {
  onClose: () => void;
  category: {
    id: number;
    categoryName: string;
    description: string;
    image: string;
    status: boolean;
  };
}

function EditModal({ onClose, category }: EditModalProps) {
  const [editedCategory, setEditedCategory] = useState(category);
  const dispatch = useDispatch();

  const handleEditChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'image' && e.target.files) {
      const file = e.target.files[0];
      try {
        const imageUrl = await fireBaseFn.uploadToStorage(file);
        setEditedCategory({
          ...editedCategory,
          image: imageUrl,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    } else {
      setEditedCategory({
        ...editedCategory,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apis.category.updateCategory(editedCategory);
      const updatedCategoryData = response.data;

      dispatch(categoryAction.update(updatedCategoryData));
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to update category. Please try again.');
    }
  };

  return (
    <div className="modal-category">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="categoryName" value={editedCategory.categoryName} onChange={handleEditChange} required />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder='Tối đa 255 ký tự'
              value={editedCategory.description} onChange={handleEditChange} required />
          </label>
          <label>
            Image:
            {category.image && (
              <img src={category.image} alt="Current Category" style={{ width: '100px', height: '100px' }} />
            )}
            <input type="file" name="image" onChange={handleEditChange} />
          </label>
          <label>
            Status:
            <input type="checkbox" name="status" checked={editedCategory.status} onChange={(e) => setEditedCategory({ ...editedCategory, status: e.target.checked })} />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

interface AddCategoryModalProps {
  onClose: () => void;
}

function AddCategoryModal({ onClose }: AddCategoryModalProps) {
  const [newCategory, setNewCategory] = useState(
    {
      id: 0, categoryName: '',
      description: '',
      image: "",
      status: true
    });
  const dispatch = useDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'image' && e.target.files) {
      const file = e.target.files[0];
      try {
        const imageUrl = await fireBaseFn.uploadToStorage(file);
        setNewCategory({
          ...newCategory,
          image: imageUrl,
        });
        console.log(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    } else {
      setNewCategory({
        ...newCategory,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apis.category.addCategory(newCategory);
      const newCategoryData = response.data;
      dispatch(categoryAction.add(newCategoryData));
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add category. Please try again.');
    }
  };
  console.log(newCategory);

  return (
    <div className="modal-category">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="categoryName" value={newCategory.categoryName} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder='Tối đa 255 ký tự'
              value={newCategory.description} onChange={handleChange} required />
          </label>
          <label>
            Image:
            <input type="file" name="image" onChange={handleChange} />
          </label>
          <label>
            Status:
            <input type="checkbox" name="status" checked={newCategory.status} onChange={(e) => setNewCategory({ ...newCategory, status: e.target.checked })} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default CategoryManager;

