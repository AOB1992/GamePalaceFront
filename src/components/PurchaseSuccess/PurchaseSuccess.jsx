import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeStock, deleteItemCart, getUser, restoreTotalBuy, sendNMailer, successBuy } from "../../Redux/Actions/actions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SiFacebook } from "react-icons/si";
import { SiTwitter } from 'react-icons/si'
import { SiInstagram } from 'react-icons/si'
import './PurchaseSuccess.css'

export const PurchaseSuccess = () => {

    const dispatch = useDispatch()
    const { user } = useAuth0()
    
    const compra = useSelector(state => state.totalToPay)

    const changestock = [];
    for(let i=0; i<compra.length; i++){
      let stock = compra[i].stock - compra[i].quantity
      changestock.push({ idproduct: compra[i].idproduct, stock })
    };

    const usuario = useSelector(state => state.users)
    // const filteredUser = usuario.length > 0 ? usuario.filter(usr => usr.email === user?.email) : []
    const findUser = usuario?.find(us => us?.email === user?.email);
    const deleteItemsPayed = { userid: findUser?.id, idproduct: [] }
    compra.forEach(prod => deleteItemsPayed.idproduct.push(prod.idproduct))
    const email = user?.email

    const cantidades = []
    compra?.forEach(element => {
        cantidades?.push(element?.price * element?.quantity)
    });

    const total = cantidades.reduce((value, prev) => value + prev)

    useEffect(() => {
        dispatch(getUser())
        
    }, [dispatch])


    useEffect(()=>{
        setTimeout(()=>{
            dispatch(sendNMailer({
            destiny: `${email}`,
            subject: 'Thanks you for your purchase',
            prodsPay: compra
        }))
        }, 2000)
    }, [email, compra, dispatch])


    console.log("este es el id", findUser?.id)

    const deleteAll = () => {
        dispatch(changeStock(changestock))
        dispatch(successBuy({userid: findUser?.id}))
        dispatch(deleteItemCart(deleteItemsPayed))
        dispatch(restoreTotalBuy())
        window.location = "/home"
        
    }

    console.log(deleteItemsPayed, email)

    return (
        <div className="purchase_container_success">
            <div className="container_success">

                <div className="text_container">
                    <h1 className="text_purchase">THANK YOU!</h1>
                    <h2 className="text_subtitle">For shopping with us.</h2>
                    <h3 className="text_subtitle">Dear, {findUser?.name}</h3>
                    <h3 className="text_subtitle">This is what you ordered this time: </h3>
                </div>



                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {compra.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.quantity}</TableCell>

                                        <TableCell align="right">${row.price}</TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>
                    </TableContainer>

                    <div className="total_purchase_container">
                        <TableCell align="right" className="total_text">Total: </TableCell>
                        <TableCell align="right" className="total_price">${total}</TableCell>
                    </div>


                    <div className="social_website">
                        <h3 className="text_purchase">Follow us! <SiFacebook /> <SiTwitter /> <SiInstagram /></h3>
                        <button className="text_subtitle" onClick={() => deleteAll()}>Click here to go home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
