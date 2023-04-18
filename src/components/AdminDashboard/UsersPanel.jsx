import React, {useEffect, useState} from "react";
import { getUser, updateUser, } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Box,  Switch, Typography, useTheme } from "@mui/material";
import SideBar from "./SideBar";
import './UsersPanel.css'

const UsersPanel = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.users)
  
 

  

  useEffect(() => {
		dispatch(getUser(user));
	},[dispatch]);
  



  const changeRol = (id) => {
    let findUser = user?.find(e => e.id === id)
    findUser.role = findUser?.role=== "admin" ? "customer" : "admin" 
    dispatch(updateUser(findUser))
    console.log(findUser)
    dispatch(getUser())
  }

  console.log(user)



  const changeDisabled = (id) => {
    let findUser = user?.find(e => e?.id === id)
    findUser.disabled = findUser?.disabled === false ? true : false
    dispatch(updateUser(findUser))
    console.log(findUser)
    dispatch(getUser())
  }

 


  // const Fecha = new Date()
  // console.log(Fecha)
  
  

  return (
    <div className="Q">

    <Box  display="flex">

      <SideBar/>

      <Box
        display="grid"
        height="30vh"
        width="2000px"
        margin="30px"
        >

         

         <table className="table">
        <thead>
          <tr>
           
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Adress</th>
            <th></th>
            <th className="status">Role</th>
            <th></th>
            <th></th>
            <th className="status2">Status</th>
          </tr>
        </thead>
        <tbody>
          {user.map(elemento=>(
            <tr>
              <td className="a">{elemento.id}</td>
              <td className="b">{elemento.name}</td>
              <td className="b">{elemento.email}</td>
              <td className="a">{elemento.address}</td>

              <td><span className="enabled">customer</span></td>
              <Switch
              checked={elemento.role === "admin" ? true : false}
              onClick={() =>changeRol(elemento.id)}
              inputProps={{ 'aria-label': 'controlled' }}/>
              <td><span className="disabled">admin</span></td>
            
              <td><span className="enabled">enabled</span></td>
              <Switch
              checked={elemento.disabled === false ? false : true}
              onClick={() =>changeDisabled(elemento.id)}
              inputProps={{ 'aria-label': 'controlled' }}/>
              <td><span className="disabled">disabled</span></td>
              
              
              
            </tr>
          ))
          }
        </tbody>
      </table>
      </Box>
    </Box>
    </div>
  );
};

export default UsersPanel;
