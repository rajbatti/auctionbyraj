
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BidHistory = () => {
    const [product,setProduct]=useState([])
    
    useEffect(function() {
    const config={headers:{'key-token':localStorage.getItem('key-token')}}
    axios.post('http://localhost:4000/bidhistory/',{},config)
    .then((data)=>{
      setProduct([...data.data.data.reverse()])
      console.log(data.data.data)
    }).catch((err)=>{console.log(err)})
     },[])
    console.log(product)





  return (
    <>
    <div className='container'>
    {product.map((i)=>{
 
    return (<div className="container mt-4">
      <div className="card">
        <div className="card-body d-flex align-items-center">
          <img
            src={i._doc.src}
            alt="Product"
            className="img-fluid"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
          <div className="flex-grow-1 ml-3">
            <h5 className="card-title mb-0">{i._doc.title}</h5>
          </div>
          <div>
           <p>Bid Price {i.bidPrice}</p>
           <p>Time : {i.time}</p>
          </div>
        </div>
      </div>
    </div>)
    })}
    </div>
    
    </>
  );
};

export default BidHistory;
