import React from 'react';
import './SearchBar.css';
import { useState,/*  useEffect  */ } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../actions';


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
   
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(Number(name)){
            return alert("Name is invaled")
        }
        if (name.length > 0) {
            dispatch(searchByName(name));
            document.getElementById("searchBar").value = ""
        } else {
            alert('¡Write a Dog!')
        }
        
    }
    return (
        <div className='search'>
            <input id='searchBar' type='text' placeholder='Write a dog...' onChange={(e) => handleInputChange(e)} />
            <button className='botonSearch' type='submit' onClick={(e) => handleSubmit(e)}>Enter</button>
        </div>
    )
}