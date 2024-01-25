import axios from 'axios';

import { SignEntity } from './types';

const handleSignIn = async (schema: SignEntity.UserSignIn) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/login', schema);

    console.log('Backend Response:', response.data);
  } catch (error) {
    console.error('Error during signin:', error);
  }
};

export { handleSignIn };
