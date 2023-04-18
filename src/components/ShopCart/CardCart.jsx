import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react'
import { BsTrash2Fill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemCart, getCart, totalBuy, totalToPay, updateQtyCart } 
from '../../Redux/Actions/actions';
import { BiCaretDown, BiCaretUp, BiTrash} from "react-icons/bi";
import './CardCart.css'

const CardCart = ({image, name, price, stock, id}) => {

const dispatch = useDispatch();

const {user} = useAuth0();
const users = useSelector(state=> state?.users);
const findUser = users?.find(us => us?.email === user?.email)

const prodsPay = useSelector(state=> state.totalToPay);
// const findProd = prodsPay?.find(prod => prod.idproduct === id);


const handleDeleteCart = (id) => {
  dispatch(deleteItemCart({userid: findUser.id, idproduct: id})) && setTimeout(()=>{dispatch(getCart(findUser.id))},100)
}

let [input, setInput] = useState(0);

const handleInput = (e) => {
  e.preventDefault();
  setInput(e.target.value<=stock ? Number(e.target.value) : stock)
}

const decrement = () => {
  if(input > 0) setInput(input -1)
}

const increment = () => {
  if(input < stock) setInput(input +1) 
}

let total = input * price;



const handleBuy = () => {   
    if(input && input <= stock ){
    total = input * price;
    dispatch(updateQtyCart({userid: findUser.id, idproduct: id, quantity: input}))
    dispatch(totalToPay({name: name, price: price, quantity: input, idproduct: id, stock: stock}));
    dispatch(totalBuy(total));
    setInput(0)
  } 
  else return alert(`Wrong value. Available stock (${stock})`)
}

// console.log("input", input)
// console.log("aca esta el findddd", findProd)
// console.log("prodsPay", prodsPay)

  return (
    <div className='cards-cart-cont'>
      
      <div className='card-cart'>
        
        <img src={image} alt='*' width='150px' height='100px'/>

        <div className='info_product'>
          <h5 className='info__prod'>{name}</h5>
        <h5 className='info__prod_price'>US$ {price}</h5>
        </div>
        

        <div className='input-cart'>
        <button className='buy-btn' onClick={()=>handleBuy()}>Add buy</button>
        <span className='invent'>Total: ${total}</span>
        <span className='invent'>Left: {stock}</span>
        

        <div className='icons_react' onClick={()=> decrement()}>{<BiCaretDown/>}</div>

        <input  name="qty" value={input} type="input" min="1" max={stock} class="form-control form" style={{width: '5rem'}} 
        onChange={(e)=>{handleInput(e)}}/>

        <div className='icons_react' onClick={()=> increment()}>{<BiCaretUp/>}</div>
        

        
        
        
        <div className='cart-btn icons_react' onClick={()=>handleDeleteCart(id)}>{<BiTrash/>}</div>
        </div>
      </div>
    </div>
  )
}

export default CardCart;
