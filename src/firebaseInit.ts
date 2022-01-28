import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

initializeApp({
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECTID,
})

export const db = getFirestore()
