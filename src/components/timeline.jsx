import React, { useEffect, useState } from "react";

export const Timer = function({ expiryDate }) {
  const expiry = new Date(expiryDate); // Expiry date and time

  const [timeRemaining, setTimeRemaining] = useState(expiry - new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = expiry - now;
      if (timeDiff <= 0) {
        clearInterval(interval);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(timeDiff);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [expiry]);

  if (timeRemaining <= 0) {
    return <b>Expired</b>;
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return <b>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</b>;
};

