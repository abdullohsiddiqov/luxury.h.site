import { http } from '../..//services/http';

import { SignEntity } from './types';

export const signIn = (data: SignEntity.UserSignIn) => http.post('/auth/login', data);

export const signOut = (data: SignEntity.UserSignUp) => http.post('/auth/register', data);
