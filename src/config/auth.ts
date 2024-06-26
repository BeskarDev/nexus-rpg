import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const signIn = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password)
}

export const signOut = () => {
	return auth.signOut()
}
