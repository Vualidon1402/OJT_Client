import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/store';
import {configAction, Config as ReduxConfig } from '@/store/slices/config.slice';
import './ConfigManager.scss';
import apis from '@/apis';

type Config = ReduxConfig;

function ConfigManager() {
  const configStore = useSelector((store: StoreType) => store.configStore);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<Config | null>(null);
  const dispatch = useDispatch();

  const handleEditClick = (config: Config) => {
    setSelectedConfig(config);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedConfig(null);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = async (configId: number) => {
    try {
      await apis.config.deleteConfig(configId);
      dispatch(configAction.delete(configId));
    } catch (error) {
      console.error('Failed to delete config', error);
    }
  };
console.log(configStore)
  return (
    <div className="table-container">
      <h1>Config Manager</h1>
      <button className='btn btn-success' style={{marginBottom: "10px"}} onClick={handleAddClick}>Add Config</button>
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
          {configStore.data?.map((config: Config, index: number) => (
            <tr key={config.id ?? index}>
              <td>{index + 1}</td>
              <td>{config.configName}</td>
              <td>{config.status ? 'Active' : 'Inactive'}</td>
              <td>
                <button className='button-config-edit' onClick={() => handleEditClick(config)}>Edit</button>
                <button className='button-config-delete' onClick={() => handleDeleteClick(config.id)}>Delete</button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
      {isModalOpen && selectedConfig && (
        <EditModal config={selectedConfig} onClose={handleCloseModal} />
      )}
      {isAddModalOpen && (
        <AddConfigModal onClose={handleCloseAddModal} />
      )}
    </div>
  );
}

interface EditModalProps {
  onClose: () => void;
  config: {
    id: number;
    configName: string;
    status: boolean;
  };
}

function EditModal({ onClose, config }: EditModalProps) {
  const [editedConfig, setEditedConfig] = useState(config);
  const dispatch = useDispatch();

  const handleEditChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedConfig({
      ...editedConfig,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apis.config.updateConfig(editedConfig);
      const updatedConfigData = response.data;

      dispatch(configAction.update(updatedConfigData));
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to update config. Please try again.');
    }
  };

  return (
    <div className="modal-config">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Config</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="configName" value={editedConfig.configName} onChange={handleEditChange} required />
          </label>
          <label>
            Status:
            <input type="checkbox" name="status" checked={editedConfig.status} onChange={(e) => setEditedConfig({ ...editedConfig, status: e.target.checked })} />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

interface AddConfigModalProps {
  onClose: () => void;
}

function AddConfigModal ({ onClose }: AddConfigModalProps) {
  const [newConfig, setNewConfig] = useState(
    {id: 0, configName: '',
       status: true });
  const dispatch = useDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewConfig({
      ...newConfig,
      [name]: value,
    });
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apis.config.addConfig(newConfig);
      const newConfigData = response.data;

      dispatch(configAction.add(newConfigData));
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add Config. Please try again.');
    }
  };

  return (
    <div className="modal-config">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Config</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="configName" value={newConfig.configName} onChange={handleChange} required />
          </label>
          <label>
            Status:
            <input type="checkbox" name="status" checked={newConfig.status} onChange={(e) => setNewConfig({...newConfig, status: e.target.checked})} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default ConfigManager;

