import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import 'react-multi-carousel/lib/styles.css';
// import icono1 from "../../image/imgCarrusel/logo1.png";
import "./ProductList.css";
import { getAllProducts, getCart, getFavs, getUser } from '../../Redux/Actions/actions';
import ContainerCards from '../Cards/ContainerCards';
import { Searchbar } from '../Searchbar/Searchbar';
import { useAuth0 } from '@auth0/auth0-react';


const ProductList = () => {
  

  const dispatch = useDispatch()
  const products = useSelector((state) => state.allProducts)
  
  const {user} = useAuth0();
  const users = useSelector(state=> state?.users);
  const findUser = users > 0 ? users?.find(us => us?.email === user?.email) : []

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getCart(findUser?.id))
    dispatch(getUser())
    dispatch(getFavs(findUser?.id))
  },[dispatch])
  
  
  return (
    <div className='background'>   
            <h1 className='name_prod'>Products</h1>

    <div className='container_all'>

      
    <Searchbar/>
      

      <ContainerCards 
      products={products}/>
    </div>

    </div>
  )
}

export default ProductList
