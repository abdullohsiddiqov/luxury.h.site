
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { addHome } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { HouseDetails } from './types';

export const CreateHome: React.FC = () => {
  const [formData, setFormData] = useState<HouseDetails>({
    apartmentNumber: '',
    city: '',
    cost: 0,
    photo: '',
    location: '',
    rooms: 0,
  });

  const [file, setFile] = useState<File | null>(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFormData((prevData) => ({
        ...prevData,
        photo: URL.createObjectURL(selectedFile), 
      }));
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoggedIn()) {
      try {
        console.log('Sending data to server:', formData);
        await addHome(formData);
        navigate('/');
      } catch (error) {
        console.error('Error adding home:', error);
      }
    }
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <h2>Create Home</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Apartment Number:
          <input type="text" name="apartmentNumber" value={formData.apartmentNumber} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <label>
          Cost:
          <input type="number" name="cost" value={formData.cost} onChange={handleChange} />
        </label>
        <label>
          Photo:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {formData.photo && <img src={formData.photo} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </label>
        <label>
          Rooms:
          <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} />
        </label>
        <button type="submit">Create Home</button>
      </form>
    </div>
  );
};
