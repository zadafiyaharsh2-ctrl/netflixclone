import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpDs5RHoxDGJ0ZS5lYAcQrdteXj67CQ58",
  authDomain: "netfliccone.firebaseapp.com",
  projectId: "netfliccone",
  storageBucket: "netfliccone.firebasestorage.app",
  messagingSenderId: "1000448918003",
  appId: "1:1000448918003:web:2420d8af8dbe05ab1a1286"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            createdAt: new Date()
        });
    } catch(error) {
        console.log(error);
        alert(error.message);
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
        console.log(error);
        alert(error.message);
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch(error) {
        console.log(error);
        alert(error.message);
    }
}

// Export everything you need
export { auth, db, signUp, login, logout };
export default app;