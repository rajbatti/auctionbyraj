import React, { useState } from 'react';
import axios from 'axios';

const ServerProductForm = () => {
  const [formData, setFormData] = useState({
    imgLink: '',
    title: '',
    minBid: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
   
    
    axios.post('http://localhost:4000/addproductserver',formData)
    .then((data)=>{
        console.log(data.data)
        
        alert(data.data.message)
      }).catch((err)=>{
        console.log(err)
        if(err.message){
          alert(err.message)
        }
        if (err.response.data.message.message){
          alert(err.response.data.message.message)
        }
      })

    
  };

  return (
    <div className="container mt-5">
      <h2>Product Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="imgLink" className="form-label">Image Link</label>
          <input
            type="text"
            className="form-control"
            id="imgLink"
            name="imgLink"
            value={formData.imgLink}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="minBid" className="form-label">Minimum Bid</label>
          <input
            type="number"
            className="form-control"
            id="minBid"
            name="minBid"
            value={formData.minBid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ServerProductForm;
