import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { SignEntity } from '../utils/types';
import { signOut } from '../utils/api';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<SignEntity.UserSignUp>({ username: '', password: '' });
  const { login } = useAuth();

  const handleSignUp = async (data: SignEntity.UserSignUp) => {
    try {
      const response = await signOut(data);
      console.log('Backend Response:', response.data);
      login(data.username);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSignUp(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

