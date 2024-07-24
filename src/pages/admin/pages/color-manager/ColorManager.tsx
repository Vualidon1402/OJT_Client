import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/store';
import {colorAction, Color as ReduxColor } from '@/store/slices/color.slice';
import './ColorManager.scss';
import apis from '@/apis';

type Color = ReduxColor;

function ColorManager() {
  const colorStore = useSelector((store: StoreType) => store.colorStore);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const dispatch = useDispatch();

  const handleEditClick = (color: Color) => {
    setSelectedColor(color);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedColor(null);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = async (colorId: number) => {
    try {
      await apis.color.deleteColor(colorId);
      dispatch(colorAction.delete(colorId));
    } catch (error) {
      console.error('Failed to delete color', error);
    }
  };

  return (
    <div className="table-container">
      <h1>Color Manager</h1>
      <button onClick={handleAddClick}>Add Color</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {colorStore.data?.map((color: Color, index: number) => (
            <tr key={color.id ?? index}>
              <td>{index + 1}</td>
              <td>{color.colorName}</td>
              <td>{color.status ? 'Active' : 'Inactive'}</td>
              <td>
                <button className='button-color-edit' onClick={() => handleEditClick(color)}>Edit</button>
                <button className='button-color-delete' onClick={() => handleDeleteClick(color.id)}>Delete</button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
      {isModalOpen && selectedColor && (
        <EditModal color={selectedColor} onClose={handleCloseModal} />
      )}
      {isAddModalOpen && (
        <AddColorModal onClose={handleCloseAddModal} />
      )}
    </div>
  );
}

interface EditModalProps {
  onClose: () => void;
  color: {
    id: number;
    colorName: string;
    status: boolean;
  };
}

function EditModal({ onClose, color }: EditModalProps) {
  const [editedColor, setEditedColor] = useState(color);
  const dispatch = useDispatch();

  const handleEditChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedColor({
      ...editedColor,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apis.color.updateColor(editedColor);
      const updatedColorData = response.data;

      dispatch(colorAction.update(updatedColorData));
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to update color. Please try again.');
    }
  };

  return (
    <div className="modal-color">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Color</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="colorName" value={editedColor.colorName} onChange={handleEditChange} required />
          </label>
          <label>
            Status:
            <input type="checkbox" name="status" checked={editedColor.status} onChange={(e) => setEditedColor({ ...editedColor, status: e.target.checked })} />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

interface AddColorModalProps {
  onClose: () => void;
}

function AddColorModal ({ onClose }: AddColorModalProps) {
  const [newColor, setNewColor] = useState(
    {id: 0, colorName: '',
       status: true });
  const dispatch = useDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewColor({
      ...newColor,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apis.color.addColor(newColor);
      const newColorData = response.data;

      dispatch(colorAction.add(newColorData));
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add color. Please try again.');
    }
  };

  return (
    <div className="modal-color">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Color</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="colorName" value={newColor.colorName} onChange={handleChange} required />
          </label>
          <label>
            Status:
            <input type="checkbox" name="status" checked={newColor.status} onChange={(e) => setNewColor({...newColor, status: e.target.checked})} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default ColorManager;

