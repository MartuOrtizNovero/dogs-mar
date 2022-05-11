
import React from "react";
import './Paginado.css';


export default function Paginado({ dogsPerPage, allDogs, paginado }) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumber.push(i);
    };

    return (
        <nav >
            <ul className='paginado'>
                {pageNumber &&
                    pageNumber.map(number => (
                        <li key={number}
                            className='li'>
                            <button onClick={() => paginado(number)}> {number} </button>
                        </li>)
                    )}
            </ul>
        </nav>

    );
}
