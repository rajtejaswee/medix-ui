import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOut = () => firebaseSignOut(auth);

export const subscribeToAuthChanges = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
