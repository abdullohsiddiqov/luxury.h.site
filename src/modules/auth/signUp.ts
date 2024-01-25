import axios from 'axios';

import { SignEntity } from './types';

const handleSignUp = async (schema: SignEntity.UserSignUp) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/register', schema);

    console.log('Backend Response:', response.data);
  } catch (error) {
    console.error('Error during signup:', error);
  }
};

export { handleSignUp };
