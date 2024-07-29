import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css';

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [log, setLog] = useState(Boolean(localStorage.getItem('key-token')));

  const handleLogout = () => {
    localStorage.removeItem('key-token');
    setLog(false);
  };

  return (
    <header className="header bg-dark text-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="logo d-flex align-items-center">
          <img src="https://c8.alamy.com/comp/2D8WCJ9/initial-an-letter-logo-design-vector-template-creative-letter-an-logo-design-2D8WCJ9.jpg" alt="Raj Bid" className="mr-2" />
          <span>AuctionNation</span>
        </div>
        <nav className="nav">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              <a onClick={() => setActive('Home')} className="nav-link">
                <Link to='/' style={active === 'Home' ? { color: 'red' } : {color: 'white'}}>Home</Link>
              </a>
            </li>
            {log && <>
               <li className="nav-item">
                <a onClick={() => setActive('Addproducts')} className="nav-link">
                  <Link to='/Addproducts' style={active === 'Addproducts' ? { color: 'red' } : { color: 'white'}}>AddProducts</Link>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={() => setActive('My Products')} className="nav-link">
                  <Link to='/MyProduct' style={active === 'My Products' ? { color: 'red' } : { color: 'white'}}>My Products</Link>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={() => setActive('My Auction')} className="nav-link">
                  <Link to='/MyAuction' style={active === 'My Auction' ? { color: 'red' } : {color: 'white'}}>My Auction</Link>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={() => setActive('History')} className="nav-link">
                  <Link to='/bidhistory' style={active === 'History' ? { color: 'red' } : {color: 'white'}}>History</Link>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={() => setActive('My Account')} className="nav-link">
                  <Link to='/Myaccount' style={active === 'My Account' ? { color: 'red' } : {color: 'white'}}>My Account</Link>
                </a>
              </li>
            </>}
            <li className="nav-item">
              <select className="form-control" style={{ maxWidth: '120px' }}>
                <option value="en">English</option>
              </select>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={log ? handleLogout : null}>
                {log ? <Link to='/' className="text-light">LOGOUT</Link> : <Link to='/login' className="text-light">LOGIN</Link>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
