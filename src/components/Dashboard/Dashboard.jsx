import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Dashboard.css"
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser, getAllProducts, getStats, getUserProducts } from '../../Redux/Actions/actions';
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'


export const Dashboard = () => {


    const dispatch = useDispatch()

    // // useEffect(() => {
    // //     dispatch(getUser())
    // // }, [dispatch])

    const userProduct = useSelector(state=>state.userProducts)

    const { user } = useAuth0()
    const usuario = useSelector(state => state.users)
    const filteredUser = usuario.length > 0 && usuario.find(usr => usr.email === user?.email) 
    const pictureURL = user?.picture
    const [name, setName] = useState(filteredUser?.name)
    const [email, setEmail] = useState(filteredUser?.email)
    const [address, setAddress] = useState(filteredUser?.address)
    const [id, setId] = useState(filteredUser?.id)
    const [infoUser, setInfoUser] = useState({
        name: name,
        email: email,
        address: address
    })



//////////////////////////////////
    const stats = useSelector((state) => state.allStats)
    const products = useSelector((state) => state.allProducts)

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getStats())
        dispatch(getUser())
        dispatch(getUserProducts(filteredUser.id))
    },[dispatch]);
/////////////////////////////////


    useEffect(() => {
        setName(filteredUser?.name)
        setEmail(filteredUser?.email)
        setAddress(filteredUser?.address)
        setId(filteredUser?.id)
    }, [filteredUser])

    useEffect(() =>  {
        setInfoUser({
            name:name,
            email: email,
            address:address
        })
    }, [setInfoUser])


    const handleOnChange = (e) => {
        e.preventDefault()
        setInfoUser({
            ...infoUser,
            id: id,
            [e.target.name]: e.target.value,
            verified: true,
            role: "customer"
        })
        setInputDis(false)
    }

    const MySwal = withReactContent(Swal)
    const [inputDis, setInputDis] = useState(true)

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        MySwal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire('Saved!', '', 'success')
                dispatch(updateUser(infoUser))
                dispatch(getUser())
                setInputDis(true)
            } else if (result.isDenied) {
                MySwal.fire('Changes are not saved', '', 'info')
            }
        })
    }





    
//     let funcion1 = () => { 
//         let productsFil = []
//         for (let i = 0; i < products?.length; i++) {
//         for (let j = 0; j < userProduct?.length; j++) {
//            let fil = products?.find(e => e.id === userProduct[j]?.idproduct)
//            productsFil.push(fil)
//         } 
//         return productsFil
   
// }}

//       console.log("funcion1:", funcion1())   
    
    // console.log("Historiccarts:",filteredUser[0]?.Historiccarts?.Historicproducts)

   
    // console.log("usuario:", usuario)
     
    // console.log("carrito:", carritoUsuario)
    // console.log("productos:", products)

    // console.log(filteredUser)

console.log("estado:" , userProduct)
    
    return (
        <div className='dash_g'>
            <form className="dashboard_container" onSubmit={handleOnSubmit}>
                <Stack className='dash' direction="column" spacing={2}>
                    <Avatar sx={{ bgcolor: deepPurple[500], width: 100, height: 100, alignContent: "center" }} src={pictureURL}>GP</Avatar>
                    <div>{name}</div>
                    <div className='info_user'></div>
                    <input type="text" value={infoUser.name?.length > -1 ? infoUser.name : name} name="name" onChange={handleOnChange} className="infoUser" />
                    <input type="text" value={infoUser.email?.length > -1 ? infoUser.email : email} disabled onChange={handleOnChange} className="infoUser" />
                    <input type="text" value={infoUser.address?.length > -1 ? infoUser.address : address} name="address" onChange={handleOnChange} className="infoUser" />
                </Stack>
                <div className='btn_cont'>
                    <input type="submit" value="Save Profile" className='save_data' disabled={inputDis} />
                </div>

            </form>




  
            <div></div>
            <div >
            
		
		
			
			
	



{/* <div class="mainContPProducts"> */}
    {/* <h4>previously purchased products</h4> */}
	{/* <section class="productsCP">
        <div class="all-productsCP">
                {funcion1()?.map(elemento=>(
                
			<div class="productCP">
                <div class="container-du">
                        <div class="card-du">
                                
                                    <div class="imgBx">
                                <img src={elemento.imageurl} alt="*" width="100px"/>
                                </div>

                                <div class="contentBx">
                                    <h3 className='text'>{elemento.namedisplay}</h3>
                                    <h3 className='text'>US${elemento.price}</h3>
                                    <Link className='btn-du' to={`/detail/${id}`}><span>Buy Again</span></Link>  
                                </div> 
                        </div>
                    </div>
                    
                    
                     
                   	
				</div>
			
    
      
            ))
            }	</div> 
	</section> */}
    {/* </div> */}
        </div>
        </div>

    )
    
}
