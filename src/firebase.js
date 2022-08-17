// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAvZ-N_OrijNPpyRwRQoUWXedObrfsdD9E',
  authDomain: 'travelsheets-f52a0.firebaseapp.com',
  projectId: 'travelsheets-f52a0',
  storageBucket: 'travelsheets-f52a0.appspot.com',
  messagingSenderId: '385051987864',
  appId: '1:385051987864:web:fc57081d8ca725fbe225ed',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
