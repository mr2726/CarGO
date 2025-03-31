import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwTGQ8iEBX2SYJqb9gyKYrERYxCm0McPo",
  authDomain: "cargo-f22aa.firebaseapp.com",
  projectId: "cargo-f22aa",
  storageBucket: "cargo-f22aa.firebasestorage.app",
  messagingSenderId: "1037415079838",
  appId: "1:1037415079838:web:1104d0d537cb91993e008f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 