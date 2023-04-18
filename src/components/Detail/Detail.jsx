import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCart, getCart, getDetail, totalToPay, updateQtyCart } from '../../Redux/Actions/actions'
import { Link } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';
import { addFav, deleteFavs} from '../../Redux/Actions/actions.js';

import Review from '../Review/Review';
import { useAuth0 } from '@auth0/auth0-react';






const Detail = (props) => {

	const dispatch = useDispatch();

	const detail = useSelector((i) => i.details);
  const productsCart = useSelector(state=> state.shopCart);
  const existProductsCart = productsCart.map(prod => prod.id)

  const {user, isAuthenticated} = useAuth0();
  const users = useSelector(state=> state?.users);
  const findUser = users?.find(us => us?.email === user?.email)


  const { id } = useParams();
	const { history } = props; 
  const favourites = useSelector(state=> state.favourites)

  const existFavs = favourites.map(fav => fav.id)

  const [input, setInput] = useState(0);


	useEffect(() => {
		dispatch(getDetail(id));
	},[dispatch, id]);

  const handleFav = (id) => {
    !existFavs.includes(id) ?
    dispatch(addFav(findUser?.id, {userId: findUser?.id, productId: id}))  :
    dispatch(deleteFavs({userId: findUser?.id, productId: id}))
  };

	const goHome = () => {
		history.goHome();
	};

  const handleCart = (id) => {
    !existProductsCart.includes(id) &&
    dispatch(addCart({userid: findUser?.id, idproduct: id, quantity: 1})) && setTimeout(()=>{dispatch(getCart(findUser?.id))},100) 
    // disptach(deleteCart(id))
  };

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value<=detail.stock ? Number(e.target.value) : detail.stock)
  }

  const handleBuy = (id) => {   
    if(input && input <= detail.stock ){
    dispatch(totalToPay({name: detail.name, price: detail.price, quantity: input, idproduct: id, stock: detail.stock}));
    !existProductsCart.includes(id) &&
    dispatch(addCart({userid: findUser?.id, idproduct: id, quantity: input})) && 
    setTimeout(()=>{dispatch(getCart(findUser?.id))},100)

    setInput(0)
    
    setTimeout(()=>{window.location = "/shopcart"},200)
  } 
  else return alert(`Wrong value. Available stock (${detail.stock})`)
}



const prodsPay = useSelector(state=> state.totalToPay);
console.log("prodsPay", prodsPay)

const decrement = () => {
  if(input > 0) setInput(input -1)
}

const increment = () => {
  if(input < detail.stock) setInput(input +1) 
}





	return (

		<div className='bkg'>
			
		<div>
		

			<div >
				{detail && 
					
          <div className='container align-items-center p-5 mt-5'>
            <Link to={"/products"}>
            <button className="button btn btn-secondary" onClick={goHome}>HOME {'> '}{detail.category} </button>
            </Link>
	          <div className="row detailsContainer d-flex flex-column align-items-center">
              <div className="card row detailsContainer d-flex flex-column align-items-center">
              <div className=" col-12 d-flex flex-sm-column flex-md-row align-items-center justify-content-center">
                <div className="d-flex img-detail">
                <img src={detail.imageurl}  className="img-fluid" alt="img"  style={{width: '1000px'}}/>
                </div>

                <div className="container-title">
                  <div className="container p-3 d-flex flex-column align-items-start justify-content-around border-start border-dark border-opacity-10 my-5">

                    <div className="d-flex flex-column align-items-start justify-content-around" >
                          <div className='d-grid gap-3 col-10 mx-auto'>
                          <h6 className='text-muted'>{detail.trademark}</h6>
                          <h2 className="d-flex flex-column align-items-start text-uppercase tx4 my-3">{detail.name}</h2>
                          <h6 className='text-muted'>{detail.description}</h6>
                          </div>
                    </div>

                      
                      <div class=" form-outline item col-10 mx-auto " >
                          <h3 className='my-3'>US$ {detail.price} </h3>
                          <div className='d-flex gap-2 my-3'>
                            {/* <input value={input} onChange={(e)=>{handleInput(e)}} type="input" min="1" max={detail.stock} class="form-control form" style={{width: '5rem'}} /> */}



                            <div className='icons'>

                              {
                                !isAuthenticated ? <div></div> :
                                existFavs.includes(detail.id) ? <BsHeartFill color='red' className='icons-fav' onClick={()=>{handleFav(detail.id)}}/>
                                : <BsHeartFill color='lightslategray' className='icons-fav' onClick={()=>{handleFav(detail.id)}}/>
                              }
                           </div>
                              {/* <div><span>Stock: {detail.stock}</span></div>    
                              <button onClick={()=> decrement()}> - </button>
                              <button onClick={()=> increment()}> + </button> */}



                          </div>

                      </div>


                      
                    <div className='d-grid gap-2 col-10 mx-auto'>
                        {/* <button onClick={()=> handleBuy(detail.id)} type="button" class="btn btn-outline-secondary my-2" style={{width: '15rem'}}>Shop Now</button> */}

                        {
                          !isAuthenticated ? <div></div> : <button type="submit" className="button btn btn-secondary my-2" style={{width: '15rem'}} onClick={()=>{handleCart(detail.id)}}>Add to cart</button>
                        }
                    </div>
                      



                  </div>
                </div>
							</div>
						</div>
					  </div>
            {/* <Link to= "/admin-dashboard"> <button>DASH</button> </Link> */}
            
          </div>
				}
			
		</div>
    <Review/>
		</div>
    </div>
  )
};

export default Detail;
