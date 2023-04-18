import LandingPage from './components/LandingPage/LandingPage';
import React from 'react';
import Navbar from './components/Navbar/Navbar'
import ProductList from './components/ProductList/ProductList';
import { Home } from './components/Home/Home';
import Detail from './components/Detail/Detail'
import InConstructionPage from './components/InconstructionPage/InConstructionPage';
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import Review from './components/Review/Review';
import Footer from '../src/components/Footer/Footer'
import ListFavs from './components/ListFavs/ListFavs';
import { Dashboard } from './components/Dashboard/Dashboard';
import ShopCart from './components/ShopCart/ShopCart';
import FormAdress from './components/ShopCart/FormAdress';
import OrderList from './components/ShopCart/OrderList';
import { PurchaseSuccess } from './components/PurchaseSuccess/PurchaseSuccess';

// import { ConfirmData } from './components/ConfirmData/ConfirmData';
import Contact from './components/Contact/Contact';
import About from './components/AboutUs/About';


import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UsersPanel from './components/AdminDashboard/UsersPanel';
import Sales from './components/AdminDashboard/Sales'

import ProductsTable from './components/AdminDashboard/ProductsTable';
import AddProduct from './components/AdminDashboard/AddProduct/AddProduct';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route exact path="/showorder" element={<OrderList/>}/>
      
        <Route exact path='/productform' element={<AddProduct/>}/>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/review" element={<Review />} />

        <Route exact path="/about" element={<About />} />
        <Route exact path="/admin-dashboard" element={<AdminDashboard/>}/>
      



        
        

        <Route exact path="/form-adress" element={<FormAdress/>}/>

        <Route exact path="/shopcart" element={<ShopCart/>}/>
        <Route exact path="/favourites" element={<ListFavs/>}/>
        <Route exact path='/products' element={<ProductList/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route exact path='/purchase-success' element={<PurchaseSuccess/>} />


        <Route exact path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route exact path="/admin-users" element={<UsersPanel/>}/>
        <Route exact path="/admin-sales" element={<Sales/>}/>
        
        <Route exact path="/admin-products" element={<ProductsTable/>}/>
        <Route exact path="/admin-products-form" element={<AddProduct/>}/>

        

        {/* <Route path='/login/savedata' element={<ConfirmData/>}/> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
