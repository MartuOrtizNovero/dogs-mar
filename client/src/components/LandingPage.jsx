import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import huella from "./images/huella.jpg"

export default function LandingPage() {
    return (
        <div className='landing'>
            <br />
            <h1 className='titulo'>¡Welcome to the Dogs App!</h1>

            <Link to="/home">
                <img src={huella} className="image" alt='huella'></img>
            </Link>
        
        </div>
    );
};


