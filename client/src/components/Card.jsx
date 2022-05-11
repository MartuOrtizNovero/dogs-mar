import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

export default function Card({ name, weight, img, temperament, id }) {


    return (
        <div className='card'>
            <img className='imagen' src={img} alt="img dog" height={180} weight={162} />
            <div>
                <h1 className='name'>{name}</h1>
                <h3 className='weight'>{weight}</h3>
                <h3 className='temp'> {temperament}</h3>
                <Link className='readmore' to={"/dogs/" + id}>Read More</Link>
            </div>
        </div>
    );
};
