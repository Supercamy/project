import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAS8eAFM26u7pMnJddVt6jsp0KaZv1kFlA',
  authDomain: 'project-app-3fcd2.firebaseapp.com',
  projectId: 'project-app-3fcd2',
  storageBucket: 'project-app-3fcd2.appspot.com',
  messagingSenderId: '507721662388',
  appId: '1:507721662388:web:3a428cc36c352c5a40fce1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore()
