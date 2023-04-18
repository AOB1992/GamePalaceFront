import React from 'react';
import { Link } from "react-router-dom";
import './Card.css'
import { BsCartFill, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addFav, deleteFavs, deleteItemCart, getCart } from '../../Redux/Actions/actions.js';
import { useAuth0 } from '@auth0/auth0-react';



const Card = ({ image, price, name, description, id, stock }) => {

  const { user, isAuthenticated } = useAuth0();
  const users = useSelector(state => state?.users);
  const findUser = users?.find(us => us?.email === user?.email)

  const favourites = useSelector(state => state.favourites)
  const productsCart = useSelector(state => state.shopCart)

  const dispatch = useDispatch();
  const existFavs = favourites?.map(fav => fav?.id)
  // const stockProducts = productsCart?.map(prod => prod?.stock)
  const existProductsCart = productsCart?.map(prod => prod?.id)

  const handleFav = (id) => {
    !existFavs.includes(id) ?
      dispatch(addFav(findUser?.id, { userId: findUser?.id, productId: id })) :
      dispatch(deleteFavs({ userId: findUser?.id, productId: id }))
  };


  console.log("esto", findUser?.id)

  const handleCart = (id) => {
    !existProductsCart.includes(id) ?
      dispatch(addCart({ userid: findUser?.id, idproduct: id, quantity: 1 })) && setTimeout(() => { dispatch(getCart(findUser?.id)) }, 100) :
      dispatch(deleteItemCart({ userid: findUser?.id, idproduct: id })) && setTimeout(() => { dispatch(getCart(findUser?.id)) }, 100)
  };



  return (
    <div className='cards'>


      <div className='img-icons'>
        <Link to={`/detail/${id}`}>
          <img src={image} alt='*' />
        </Link>
      </div>


        <div className='icons'>
          

          { 
            !isAuthenticated ? <div></div> :
            existFavs.includes(id) ? <BsHeartFill color='red' className='icons-fav' onClick={()=>{handleFav(id)}}/>
            : <BsHeartFill className='icons-fav' onClick={()=>{handleFav(id)}}/>
          }     
       
          { 
            !isAuthenticated ? <div></div> :
            stock <= 0 ? "Stocked out" :
            existProductsCart.includes(id) ? <BsCartFill color='green' className='icons-cart' onClick={()=>{handleCart(id)}}/> : 
            <BsCartFill className='icons-cart' onClick={()=>{handleCart(id)}}/>
          } 
          
                   
        </div>




      <div className='info'>
        <span>{name}</span>
        <h4>US$ {price}</h4>
      </div>




      {/* <h3>{description}</h3> */}

    </div>
  )
};

export default Card


