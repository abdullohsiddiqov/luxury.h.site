import {SignEntity} from './types'
import { HouseDetails } from '../pages/types'
import {http} from '../services/http'

export const signIn = (data: SignEntity.UserSignIn) => http.post('/login', data);
export const signOut = (data: SignEntity.UserSignUp) => http.post('/register', data);
export const addHome = (data: HouseDetails) => http.post('/add-house', data);