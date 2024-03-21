import { useContext, useEffect, useState } from "react"
import myContext from "./MyContext"
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import {useFire} from '../../firebase/FireBase.jsx'

const MyState = (props) => {

  const firebase = useFire();

  const[mode,setMode] = useState('light');
  const [id,setId] = useState(null)
  const [loading, setLoading] = useState(false);
  const[product,setProduct] = useState([]);
  const[order,setOrder] = useState([]);
  const[user,setUser] = useState([]);
  const[searchKey,setSearchKey] = useState('');
  const[filterType,setFilterType] = useState('');
  const[filterPrice,setFilterPrice] = useState('');

  const[products,setProducts] = useState(
  {
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      'en-us',{
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }
    )
  });

  const getProductData = async(id) => 
  {
    setLoading(true);
    try {
      const productTemp = await firebase.getProductData(id);
      return productTemp;      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const addProduct = () => 
  {
    if(products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null)
    return toast.error('All Fields Required');
    setLoading(true);

    try 
    {
      firebase.addProducts(products);
      toast.success('Product Added SuccessFully')
      setTimeout(() => window.location.href='/dashboard',800);
      getProductsData();
      setLoading(false);
    } 
    catch (error) 
    {
      console.log(error);
      setLoading(false); 
    }
  }

  const editHandle = (item) => 
  {
    setId(item.id);
    setProducts(item.data());
  }

  const getOrderData = async() => {
    setLoading(true);
    try
    {
      const result = await firebase.getOrder();
      const orderArray = [];
      result.forEach((doc) => {
        orderArray.push(doc.data());
        setLoading(false);
      });
      setOrder(orderArray);
      setLoading(false);
    }
    catch(error)
    {
      console.log(error);
      setLoading(false);
    }
  }

  const updateProduct = () => 
  {
    setLoading(true);
    try 
    {
      firebase.updateProduct(products,id);
      toast.success('Product Updated SuccessFully')
      getProductsData();
      setLoading(false);
      setTimeout(() => window.location.href = '/dashboard',800);      
    } catch (error) 
    {
      console.log(error);
      setLoading(false);
    }
  }

  const deleteProduct = (item) => 
  {
    setLoading(true);
    try 
    {
      firebase.deleteProduct(item);
      toast.success('Product Deleted Successfully');
      getProductsData();
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }

  }

  const getProductsData = () => 
  {
    setLoading(true);
    try {
      firebase.getProducts().then(item => setProduct(item?.docs))
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const getUserData = async() =>
  {
    setLoading(true);
    try 
    {
      const result = await firebase.getUserData();
      const userArray = [];
      result.forEach((doc) =>
      {
        userArray.push(doc.data());
        setLoading(false);
      })
      setUser(userArray);
      setLoading(false);
    }
   catch (error) 
   {
      console.log(error);
      setLoading(false);
    }
  }

  const toggleMode = () =>{
    if(mode == 'light')
    {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17,24,39)'
    } 
    else
    {
      setMode('light');
      document.body.style.backgroundColor = 'white'
    } 
  }
    useEffect(() => {
        getProductsData();
        // getOrderData();
        getUserData();
    },[])


  return (
    <myContext.Provider value={{getProductData,user,getOrderData,order,deleteProduct,
                                editHandle,updateProduct,setProducts,
                                addProduct,products,product,mode,
                                toggleMode,loading,setLoading,
                                searchKey,setSearchKey,filterPrice,setFilterPrice,
                                filterType,setFilterType}} >
        {props.children}
    </myContext.Provider>
  )
}

export default MyState;

export const useData = () => useContext(myContext)