import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Optional: Add styles in a separate CSS file

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <div className="not-found-image">
                <img src="\catfound.png" alt='cst inside the trash can' />   
            </div>
            <p>We can't find it. It's probably been taken out with the trash.</p>
            <Link to="/">Go Back Home</Link>
        </div>
    );
};

export default NotFound;