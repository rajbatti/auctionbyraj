import React, { useState } from 'react';
import axios from 'axios';

const BidForm = ({ productId, currentPrice, lastbidder }) => {
    const [bidPrice, setBidPrice] = useState(currentPrice + 1);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const handleBid = async (e) => {
        e.preventDefault();

        try {
            const config = { headers: { 'key-token': localStorage.getItem('key-token') } };
            const response = await axios.post(`http://localhost:4000/bid/${productId}`, { 'bidPrice': bidPrice }, config);
            setMessage(response.data.message);
            if (response.data.user) {
                setEmail(response.data.user);
            }

        } catch (err) {
            console.log(err.response);
            setMessage(err.response.data.message);
        }
    };

    const incrementBid = () => {
        setBidPrice(bidPrice + 1);
    };

    const decrementBid = () => {
        if (bidPrice > currentPrice + 1) {
            setBidPrice(bidPrice - 1);
        }
    };

    const check = email !== lastbidder;

    return (
        check ? (
            <div>
                <form onSubmit={handleBid}>
                    <label>
                        Bid Price:
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button type="button" onClick={decrementBid} style={{ marginRight: '10px' }}>-</button>
                            <input
                                type="number"
                                value={bidPrice}
                                onChange={(e) => setBidPrice(Number(e.target.value))}
                                min={currentPrice + 1}
                                required
                                style={{ textAlign: 'center' }}
                            />
                            <button type="button" onClick={incrementBid} style={{ marginLeft: '10px' }}>+</button>
                        </div>
                    </label>
                    <button type="submit">Place Bid</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        ) : (
            <h1>You Are Leading</h1>
        )
    );
};

export default BidForm;
