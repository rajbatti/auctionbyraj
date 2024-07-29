import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUpForm from './components/signup.jsx'
import LoginForm from './components/login.jsx';
import Productlist from './components/productlist.jsx';
import ProductForm from './components/Addproducts.jsx';
import ProductBlock from './components/MyAuction.jsx';

import UpdateProductForm from './components/updateProduct.jsx';

import ProductBid from './components/product.jsx';
import MyProductBlock from './components/Mybid.jsx';
import AccountSettings from './components/Maccount.jsx';
import ServerProductForm from './components/add.jsx';
import BidHistory from './components/bidhistory.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Productlist/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/signup' element={<SignUpForm/>}/>
      <Route path='/Addproducts' element={<ProductForm/>} />
      <Route path='/Myaccount' element={<AccountSettings/>} />
      <Route path='/MyAuction' element={<ProductBlock/>} />
      <Route path='/MyProduct' element={<MyProductBlock/>} />
      <Route path='/updateProduct/:id' element={<UpdateProductForm/>} />
      <Route path='/bid/:id' element={<ProductBid/>} />
      <Route path='/add' element={<ServerProductForm/>} />
      <Route path='/bidhistory' element={<BidHistory/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
