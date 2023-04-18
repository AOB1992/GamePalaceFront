import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteItemCart, getAllProducts, totalPayment, changeStock, restoreTotalBuy, successBuy } from '../../Redux/Actions/actions';
import './OrderList.css'

function validateForm(input){
    const error = {};
    if(!input.name.length) error.name = <span style={{color:"red"}}>Name is required</span>;
    if(!input.adress.length) error.adress = <span style={{color:"red"}}>Address is required</span>;
    if(!input.city.length) error.city = <span style={{color:"red"}}>City is required</span>;
    if(!input.postalCode.length) error.postalCode = <span style={{color:"red"}}>Postal code is required</span>;
    
    return error;
};

const FormAdress = ({name, address}) => {

  const {user} = useAuth0();
  const users = useSelector(state=> state?.users);
  const findUser = users?.find(us => us?.email === user?.email);
  const dispatch = useDispatch();
  const prodsToPay = useSelector(state=> state.totalToPay);
  const deleteItemsPayed = {userid: findUser?.id, idproduct: []}
  prodsToPay.forEach(prod=> deleteItemsPayed.idproduct.push(prod.idproduct))

  const changestock = [];
  for(let i=0; i<prodsToPay.length; i++){
    let stock = prodsToPay[i].stock - prodsToPay[i].quantity
    changestock.push({ idproduct: prodsToPay[i].idproduct, stock })
  };


  const [orderOK, setOrderOK] = useState(false);

    const [input, setInput] = useState({
        name: name,
        adress: address,
        city: '',
        postalCode: '',
    });

  const [error, setError] = useState({});


    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setError(validateForm({
            ...input,
            [e.target.name]: e.target.value
        })
        )
    };

    const payMP = () => {
      dispatch(totalPayment(prodsToPay))
      dispatch(changeStock(changestock))
      // dispatch(deleteItemCart(deleteItemsPayed))
      // dispatch(restoreTotalBuy())
      dispatch(getAllProducts())
      setTimeout(()=>{setOrderOK(false)}, 5000)
    }
console.log("jarana", prodsToPay)
console.log("changestock", changestock)
    const handleConfirm = () => {
      if(!prodsToPay.length>0) return setTimeout((alert("Add products to pay")), window.location = "/products", 2000) ;
      if(!input.name || !input.adress.length>0 || !input.city || !input.postalCode) return alert('Complete all fields');    
      return setOrderOK(true);
    };

    // console.log(prodsToPay, "payyyyy")
    // console.log("deletePay", deleteItemsPayed)
    // console.log(orderOK, "orderrrrr")
    console.log("este es mi user", findUser)
    console.log("este es mi user google", findUser)
  return (
    // <div style={{minHeight:"100vh", display:"flex", justifyContent: "center", color:"white"}}>FormAdress</div>
    <div >
    <Form className='form-address'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" value={input.name} type="text" placeholder="" onChange={(e)=>handleInputChange(e)}/>
        {
          error.name && <div><span>{error.name}</span></div>
        }
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address</Form.Label>
        <Form.Control name="adress" value={input.adress} type="text" placeholder="" onChange={(e)=>handleInputChange(e)}/>
        {
          error.adress && <div><span>{error.adress}</span></div>
        }
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
        <Form.Control name="city" value={input.city} type="text" placeholder="" onChange={(e)=>handleInputChange(e)}/>
        {
          error.city && <div><span>{error.city}</span></div>
        }
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Postal code</Form.Label>
        <Form.Control name="postalCode" value={input.postalCode} type="text" placeholder="" onChange={(e)=>handleInputChange(e)}/>
        {
          error.postalCode && <div><span>{error.postalCode}</span></div>
        }
      </Form.Group>

    </Form>

        {
          orderOK ? 
          <button className="button-MP" variant="primary"  onClick={()=>payMP()}>Pay MercadoPago</button>
           :
           <div className="order-actions"><Link to="/shopcart"><p> <BsChevronDoubleLeft/> Backdown </p></Link>
            <p onClick={()=>{handleConfirm()}}>Confirm <BsChevronDoubleRight/></p>
          </div>
        }
            
      
    </div>
  )
};

export default FormAdress;
