import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateProductForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    imgLink: '',
    title: '',
    minBid: '',
    description: '',
    live: false
  });

  useEffect(() => {
    axios.post('http://localhost:4000/products', { pid: id })
      .then((data) => {
        const product = data.data.data[0];
        setFormData({
          imgLink: product.src,
          title: product.title,
          minBid: product.minprice,
          description: product.description,
          live: product.live // Assuming the product object has a live property
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { 'key-token': localStorage.getItem('key-token') } };
    axios.put(`http://localhost:4000/product/${id}`, formData, config)
      .then((data) => {
        alert(data.data.message);
        window.location.replace('/');
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

export default UpdateProductForm;
