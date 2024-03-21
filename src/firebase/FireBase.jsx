import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore,collection, addDoc, query, orderBy, onSnapshot, setDoc, deleteDoc, doc, getDocs, getDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect } from "react";

const FireContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyAn1BYcydD0O9zLGSxRLXW87wB59PeBOb4",
    authDomain: "d-cart-437c0.firebaseapp.com",
    projectId: "d-cart-437c0",
    storageBucket: "d-cart-437c0.appspot.com",
    messagingSenderId: "569896833430",
    appId: "1:569896833430:web:a12e113c4a01e7b7f88db7"
};

export const useFire = () => useContext(FireContext);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDb = getFirestore(app);

const FireBaseProvider = ({children}) => {
    
    const signupWithEmailAndPassword = (email,pass) => createUserWithEmailAndPassword(auth,email,pass);
    
    const addUser = async(user) => 
    {
        const userRef = collection(fireDb, "users")
        await addDoc(userRef, user);
    }

    const signinUser = (email,pass) => signInWithEmailAndPassword(auth,email,pass)
    const addProducts = async(product) => 
    {
        const productRef = collection(fireDb,'products');
        await addDoc(productRef,product);
    }
    const updateProduct = async(products,id) => 
    {
        const docRef = doc(fireDb,'products',id)
        const data = await setDoc(docRef,products);
    }

    const addOrder = async(orderInfo) => {
        const docRef = collection(fireDb,'orders');
        await addDoc(docRef,orderInfo)
    }
    
    const deleteProduct = async(item) => {
        await deleteDoc(doc(fireDb,'products',item.id))
    }

    const getOrder = async() => {
        const orderRef = collection(fireDb,'orders');
        const data = await getDocs(orderRef);
       return data.docs;
    }

    const getUserData = async() => 
    {
        const userRef = collection(fireDb,'users');
        return await getDocs(userRef);
    }

    const getProductData = async(id) =>{
        const productRef = doc(fireDb,'products',id);
        const result = await getDoc(productRef);
        console.log(result);
        return result;
    }

    const getProducts = async() => 
    {
        const collectionRef = collection(fireDb,'products');
        const q = query(collectionRef,orderBy('time'));
        const result = await getDocs(q);
        return result;
    }
    getProductData();

    return (
        <FireContext.Provider value={{getProductData,getUserData,getOrder,addOrder,deleteProduct,updateProduct,getProducts,addProducts,signinUser,signupWithEmailAndPassword, addUser}}>
        {children}
        </FireContext.Provider>
    )
}
export default FireBaseProvider;