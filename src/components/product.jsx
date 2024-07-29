import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BidForm from './bid';
import { Timer } from './timeline';
import { useParams } from 'react-router-dom';


const ProductBid = () => {
  const { id } = useParams();
  
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.post('http://localhost:4000/products', { pid: id })
        .then((response) => {
          setProduct(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData(); //
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [product.pid]);

  const hasProduct = product.length > 0;
  const isExpired = hasProduct && new Date(product[0].expiry) < new Date();
  const winner = hasProduct && product[0].history[product[0].history.length - 1];

  return (
    <div className="container mt-5">
      {hasProduct ? (
        <div className="card">
          <div className="card-header">
            <h1>{product[0].title}</h1>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <img src={product[0].src} alt={product[0].title} height={'300px'} width={'300px'} className="img-fluid" />
              </div>
              <div className="col-md-8">
             
                <p>{product[0].description}</p>
                <p><strong>Current Price:</strong> {product[0].currentprice}</p>
                <p><strong>Minimum Price:</strong> {product[0].minprice}</p>
                <p><strong>Status:</strong> {product[0].status ? 'Live' : 'Inactive'}</p>
                <p><strong>Expiry Date:</strong> {new Date(product[0].expiry).toLocaleString()}</p>
                <h5>Bid History</h5>
                <ul className="list-group">
                  {product[0].history.map((bid, index) => (
                    <li key={index} className="list-group-item">
                      User: {bid.email}, Bid: {bid.bidPrice}, Time: {new Date(bid.time).toLocaleString()}
                    </li>
                  ))}
                </ul>
                {hasProduct && !isExpired ? (
                  <Timer expiryDate={product[0].expiry} />
                ) : (
                  <h3>{winner?winner.email+" is a Winner":"No One Auctioned"} </h3>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No Product Available</p>
      )}
      {hasProduct && !isExpired && (
        <div className="mt-4">
          <BidForm productId={id} currentPrice={product[0].currentprice} lastbidder={winner ? winner.email : "new"} />
        </div>
      )}
    </div>
  );
};

export default ProductBid;
