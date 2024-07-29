import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    imgLink: '',
    title: '',
    minBid: '',
    description: '',
    live: false, // New state variable for "Live or Not"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    const config = { headers: { 'key-token': localStorage.getItem('key-token') } };
    console.log(config);
    axios.post('http://localhost:4000/addproducts', formData, config)
      .then((data) => {
        console.log(data.data);
        alert(data.data.message);
      })
      .catch((err) => {
        console.log(err);
        if (err.message) {
          alert(err.message);
        }
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div className="container mt-5 p-4 border rounded border-primary shadow-5 w-50">
      <h2 className="text-center">Product Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="imgLink" className="form-label">Image Link</label>
          <input
            type="text"
            className="form-control border border-dark"
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
            className="form-control border border-dark"
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
            className="form-control border border-dark"
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
            className="form-control border border-dark"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="live"
            name="live"
            checked={formData.live}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="live">
            Live or Not
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
