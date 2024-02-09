// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBzzkE58zIQizH54dyoUqCTArnxmwJuxPc',
  authDomain: 'store-manager-8edea.firebaseapp.com',
  projectId: 'store-manager-8edea',
  storageBucket: 'store-manager-8edea.appspot.com',
  messagingSenderId: '103848384430',
  appId: '1:103848384430:web:e97e707f91a9f09f75da3f',
  measurementId: 'G-HMGPL6WR20',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { auth, analytics, db };
