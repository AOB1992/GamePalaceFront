import React, {useEffect, useState} from "react";
import { getAllProducts, changeProduct, getArray} from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Box, Switch} from "@mui/material"
import './ProductsTable.css';
import { TbEdit } from "react-icons/tb"
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import SideBar from './SideBar';
const Swal = require('sweetalert2')
    

 

function ProductsTable() {
  

  
  const product = useSelector((state) => state.allProducts)
 
  product.sort(function (a, b) {
    if (a.id < b.id) {
      return -1;            // -1 = izquierda en el array
    }
    if (b.id < a.id) {
      return 1;            // 1 = derecha en el array
    }
    return 0  } )              // 0 = iguales
  

  const [word, setWord] = useState("")
  const [filter1, setFilter1] = useState('empty')
  const [filter2, setFilter2] = useState('empty')
  const [order, setOrder] = useState('empty')

  const marks = product.map(product => product.trademark)
  const marks2 = new Set(marks)
  const trademark = [...marks2]

  const catego = product.map(product => product.category)
  const catego2 = new Set(catego)
  const categories = [...catego2]
  
  const dispatch = useDispatch()

  const handleSearch = (e) => {
      e.preventDefault()
      const obj = {
          word: word,
          filter1: filter1, //Logitech
          filter2: filter2,
          order: order
      }
      dispatch(getArray(obj))
      console.log(obj)
  }

  const resetFilters = () => {
      setWord("")
      setFilter1("empty")
      setFilter2("empty")
      setOrder("empty")
  }


  useEffect(() => {
		dispatch(getAllProducts());
	},[dispatch]);
 





  const changeDisabled = (elemento) => {
    
    elemento.disabled = elemento?.disabled === false ? true : false;

    const inputd = {
      idproduct: elemento.id,
      productname:elemento.name,
      trademark: elemento.trademark,
      price: elemento.price,
      description: elemento.description,
      category: elemento.category,
      imageurl: elemento.imageurl,
      disabled: elemento?.disabled,
      stock: elemento.stock,
      namedisplay: elemento.namedisplay
    }

    dispatch(changeProduct(inputd))
    dispatch(getAllProducts())
    console.log("INPUTD ES:")
    console.log(inputd)
  
  }

  

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

 

  ////////////////////estados de la info tabla(input)
  const [input, setinput] = useState({
    idproduct: "",
    trademark: "",
    price: 0,
    description: "",
    category: "",
    imageurl: "",
    disabled: false,
    stock: "",
    namedisplay: ""
  });

  ///////////////////////////////////////////////////
 const handleChange = (e) => {  
		setinput({
			...input,
			[e.target.name]: e.target.value,
      
		});
  }

  const handleSubmit = (e) => {

    dispatch(changeProduct(input));
         
            setinput({
              idproduct: product.id,
             
              trademark:"", 
              price:"",
              description:"",
              category:"",
              imageurl:"",
              disbled:false,
              stock: "",
              namedisplay: ""
            });
  setModalEditar(!modalEditar)
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your change has been saved',
    showConfirmButton: false,
    timer: 1600
  })
         }  


      /////////mostrar segun cual sea 
  const selectModal=(elemento, caso)=>{
    setinput({idproduct: elemento.id,
    trademark: elemento.trademark,
    price: elemento.price,
    description: elemento.description,
    category: elemento.category,
    imageurl: elemento.imageurl,
    disabled: elemento.disabled,
    stock: elemento.stock,
    namedisplay: elemento.namedisplay})

    setModalEditar(true)
  }
    // console.log(product)


  //////////////////////////////////////// Cloudinary

    const [image, setImage] = useState("");
    const [minImage, setMiniImage] = useState("");
  
    useEffect(() => {
      if (image) {
        uploadImage();
      }
    }, [image]);
  

    const uploadImage = () => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "gamepalace");
      data.append("cloud_name", "ddxezv6as");
      fetch("https://api.cloudinary.com/v1_1/ddxezv6as/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setinput({
            ...input,
            imageurl: data.url,
          });
          setMiniImage(data.url);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // console.log("INPUT ES");
    // console.log(input);
    

  return (
    <div className="P">
    <Box  display="flex" >

    <SideBar/>

      <Box
        display="grid"
        height="30vh"
        width="2000px"
        margin="30px"
      >
    
    <div className="filters_contain">
            <form 
                onSubmit={handleSearch} className="filtp"
            >

                  <button
                      onClick={() => resetFilters()}
                      className="botonfiltp"
                    >
                      Reload Changes
                </button>

                <label className="filter" for="namedisplay">Filter by Product name: </label>
                <input namedisplay="namedisplay" id="namedisplay" type="text" placeholder="Search..."
                    onChange={(e) => setWord(e.target.value)}
                    value={word}
                />

                <label className="filter" for="trademark">Filter by Trademark: </label>
                <select
                    onChange={(e) => setFilter1(e.target.value)}
                    option="first"
                    selected="true"
                    
                >
                    <option selected="true" value="empty">Trademark...</option>
                    {trademark?.map(product => {
                        return <option value={product}>{product}</option>
                    })}


                </select>


                 {/* <label className="filter" for="trademark">Filter by Price: </label>
                <select onChange={(e) => setOrder(e.target.value)}
                    
                >
                    <option value="">Sort...</option>
                    <option value="nameup">↕A - Z↕</option>
                    <option value="namedown">↕Z - A↕</option>
                    <option value="priceup">$$$</option>
                    <option value="pricedown">$</option>
                </select> */}

                <input type="submit"
                    value="Apply filters"
                    className="botonfiltp"
                /> 

                <button
                    onClick={() => resetFilters()}
                    className="botonfiltp"
                >
                    Reset filters
                </button>

            </form>
        </div>

      {/* ///////////////////////////////// TABLA */}
      <div>
        <table className="tableC" >
          <div className="table">
          <thead >

            <tr>
              <th className="c">ID</th>
              <th className="name">Name</th>
              <th className="d">Trademark</th>
              <th className="d">Price</th>
              <th className="c">Stock</th>
              <th className="c">Category</th>
              <th></th>
              <th className="status">Status</th>
              <th></th>
              <th className="editp">Edit Product</th>
            </tr>

          </thead>

          <tbody>
            {product.map(elemento=>(
              <tr>
                <td >{elemento.id}</td>
                <td td className="name">{elemento.namedisplay}</td>
                <td td >{elemento.trademark}</td>
                <td td >{elemento.price}</td>
                <td td >{elemento.stock}</td>
                <td td >{elemento.category}</td>
              

                

                <td><span className="enabled">enabled</span></td>
                <Switch 
                checked={elemento.disabled === false ? false: true}
                onClick={() =>changeDisabled(elemento)}
                inputProps={{ 'aria-label': 'controlled' }}/>
                
                <td><span className="disabled">disabled</span></td>
                
                <td className="btnsptable">
                  <button className="btnptable"  onClick={()=>selectModal(elemento, 'Editar')}><TbEdit /></button> 
                </td>
              </tr>
            ))
            }
          </tbody>
          </div>
        </table>
        </div>
      </Box>
{/* //////////////////////////////////////////////////// */}


      <Modal isOpen={modalEditar}>

        <ModalHeader>
          <div>
            <h3>Edit Product</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">

            {/* <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="idproduct"
              id="idproduct"
              value={input.idproduct}
            /> */}

            <br />

            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="namedisplay"
              id="namedisplay"
              value={input.namedisplay}
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>Trademark</label>
            <input
              className="form-control"
              type="text"
              name="trademark"
              id="trademark"
              value={input && input.trademark}
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>Price</label>
            <input
              className="form-control"
              type="text"
              name="price"
              id="price"
              value={input && input.price}
              onChange={(e) => handleChange(e)}
            />

            <label>Stock</label>
            <input
              className="form-control"
              type="text"
              name="stock"
              id="stock"
              value={input && input.stock}
              onChange={(e) => handleChange(e)}
            />

            <br /> <label>Category</label>
            <input
              className="form-control"
              type="text"
              name="category"
              id="category"
              value={input && input.category}
              onChange={(e) => handleChange(e)}
            />

<br />

            
<label>Image</label>
   
    <input
      type="file"
      onChange={(e) => setImage(e.target.files[0])}
    ></input>
    <br />


            <br />
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="description"
              id="description"
              value={input && input.description}
              onChange={(e) => handleChange(e)}
            />
           

          </div>
          </form>
        </ModalBody>


        <ModalFooter>
          <button type="submit" id="edit" name= "edit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
            Update
          </button>

          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          
          >
            Cancel
          </button>
        </ModalFooter>
    
      </Modal>


      


     </Box>  
    </div>
  );
}

export default ProductsTable;