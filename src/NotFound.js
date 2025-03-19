import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Optional: Add styles in a separate CSS file

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/">Go Back Home</Link>
        </div>
    );
};

export default NotFound;