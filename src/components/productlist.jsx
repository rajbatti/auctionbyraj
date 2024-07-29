import React, { useEffect, useState } from "react";
import '../css/productlist.css'
import axios from "axios";
import { Timer } from "./timeline";
import { Link } from "react-router-dom";
  

export default function Productlist(){
    const [product,setProduct]=useState([])
    
    useEffect(function() {
      
    axios.post('http://localhost:4000/products',{status:true,booked:false})
    .then((data)=>{
      setProduct([...data.data.data])
    }).catch((err)=>{console.log(err)})
     },[])

    return (
        
        <>
        <div className="container p-2 mt-5 border rounded border-primary border-4 shadow-lg">
        <div className="productlist">
            <p>Explore Products</p>
            {/* <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Relevance
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Relevance</a></li>
                <li><a class="dropdown-item" href="#">Low-to-High</a></li>
                <li><a class="dropdown-item" href="#">High-to Low</a></li>
            </ul>
            </div> */}
        </div>
        {product.length>0?<div className="container d-flex flex-wrap product-container gap-3">
        {product.map((i)=>{
            
            return (
            <div className="auction-card" >
            <div className="card-image">
                <img src={i.src} alt="Product" />
               
            </div>
            <div className="card-content">
                <span className="live-auction">Live Auction</span>
                <h3 className="product-title">{i.title.slice(0,20)}</h3>
                <div className="bid-info">
                <div className="bid-row">
                    <span className="bid-label font-weight-bold"><h5>Minimum Bid</h5></span>
                    <span className="bid-amount">{i.minprice}</span>
                </div>
                <div className="bid-row">
                    <span className="bid-label font-weight-bold"><h5>Current Bid</h5></span>
                    <span className="bid-amount current-bid">{i.currentprice}</span>
                </div>
                <div className="bid-row">
                    <span className="time-remaining"><Timer expiryDate={i.expiry}/></span>
                </div>
                </div>
                <button className="bid-button" ><Link to={'/bid/'+i.pid} style={{color:'white'}}>Bid now →</Link></button>
            </div>
            </div>
            )
            
        })}
  
            </div>:<p>No Products Available Now</p>}
        </div>
        </>
    )
}