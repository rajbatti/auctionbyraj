
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductBlock = () => {
    const [product,setProduct]=useState([])
    
    useEffect(function() {
    const config={headers:{'key-token':localStorage.getItem('key-token')}}
    axios.post('http://localhost:4000/Myauction/',{},config)
    .then((data)=>{
      setProduct([...data.data.data.reverse()])
      console.log(data.data.data)
    }).catch((err)=>{console.log(err)})
     },[])
    console.log(product)



  const handleDelete = async (id) => {
    
    try {
        const config={headers:{'key-token':localStorage.getItem('key-token')}}
        console.log(config)
      const response = await axios.delete(`http://localhost:4000/product/${id}`,config);
      if (response.data.ok) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting product');
    }
  };
 
  const arr1 = product.filter(i => !i.booked && !i.status); // false and false
const arr2 = product.filter(i => i.booked);               // true (regardless of status)
const arr3 = product.filter(i => !i.booked && i.status); 
  console.log(arr1,arr2)
  return (
    <>
    {arr1.length>0?<div className='container' >
      <div className='container'><h3 className='text-danger font-weight-bold'>Products remaining for Auction</h3></div>
    {arr1.map((i)=>{
 
    return (<div className="container mt-4">
      <div className="card">
        <div className="card-body d-flex align-items-center">
          <img
            src={i.src}
            alt="Product"
            className="img-fluid"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
          <div className="flex-grow-1 ml-3">
            <h5 className="card-title mb-0">{i.title}</h5>
          </div>
          <div>
            <button className="btn btn-primary mr-2 btn-lg" ><Link style={{color:'white'}} to={'/updateProduct/'+i.pid}>Update</Link>
              
            </button>
            <button className="btn btn-danger btn-lg" style={{color:'white'}} onClick={()=>{handleDelete(i.pid)}}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>)
    })}
    </div>:""}
    
    {arr3.length>0?<div className='container' >
    <div className='container'><h3 className='text-danger font-weight-bold'>Products Are Live</h3></div>
    {arr3.map((i)=>{
  
    return (<div className="container mt-4" style={{cursor:'pointer'}} onClick={()=>{window.location.replace('/bid/'+i.pid)}}>
      <div className="card">
        <div className="card-body d-flex align-items-center">
          <img
            src={i.src}
            alt="Product"
            className="img-fluid"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
          <div className="flex-grow-1 ml-3">
            <h5 className="card-title mb-0">{i.title}</h5>
          </div>
          <div  style={{background:"blue",color:'white',padding:'2rem'}}><h5>LIVE</h5></div>
        </div>
      </div>
    </div>)
   })}
    </div>:""}

    {arr2.length>0?<div className='container' >
    <div className='container'><h3 className='text-danger font-weight-bold'>Products  Completed Auction</h3></div>
    {arr2.map((i)=>{
  
    return (<div className="container mt-4" style={{cursor:'pointer'}} onClick={()=>{window.location.replace('/bid/'+i.pid)}}>
      <div className="card">
        <div className="card-body d-flex align-items-center">
          <img
            src={i.src}
            alt="Product"
            className="img-fluid"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
          <div className="flex-grow-1 ml-3">
            <h5 className="card-title mb-0">{i.title}</h5>
          </div>
          {i.history.length>0?<div style={{background:"brown",color:'white',padding:'2rem'}}><h5>SOLD at Price:{i.currentprice} to {i.history[i.history.length-1].username}</h5></div>:<div style={{background:"green",color:'white',padding:'2rem'}}><h5>UNSOLD</h5></div>}
        </div>
      </div>
    </div>)
   })}
    </div>:""}
    </>
  );
};

export default ProductBlock;
