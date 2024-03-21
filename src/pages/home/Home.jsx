import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import {Filter, HeroSection, ProductCard, Testimonial} from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch();
  // const cartItem = useSelector((state)=> state.cart)
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) 
    navigate('/login')
  },[])

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  return (
    <Layout>
      {/* <div className="flex gap-5 justify-center">
        <button className=' bg-gray-300 p-5' onClick={()=> addCart()}>add</button>
        <button className=' bg-gray-300 p-5' onClick={()=> deleteCart()}>del</button>
      </div> */}
    <HeroSection/>
    <Filter/>
    <ProductCard/>
    <Testimonial/>
    </Layout>
  )
}

export default Home