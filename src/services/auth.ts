import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { User } from '../types';

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      email: userCredential.user.email || '',
      password: password
    };
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export const createTestAccount = async (): Promise<User> => {
  try {
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'test123456';
    
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    return {
      email: testEmail,
      password: testPassword
    };
  } catch (error) {
    throw new Error('Failed to create test account');
  }
}; 