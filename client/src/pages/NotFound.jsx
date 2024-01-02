import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <FaExclamationTriangle className='text-danger' size='5em' />
            <h1>404 - Page Not Found</h1>
            <p>The requested page does not exist.</p>
            <Link to='/' className='btn btn-primary'>
                Go Back
            </Link>
        </div>
    );
};

export default NotFound;
