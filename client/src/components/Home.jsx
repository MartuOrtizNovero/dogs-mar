import './Home.css';
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getDogs,
    filterBySource,
    filterByTemperament,
    getTemperaments,
    orderByName,
    orderByWeight
} from '../actions';
import Card from "./Card";
import SearchBar from "./SearchBar"
import Paginado from './Paginado';
import giphy from './images/giphy.gif'


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs)
    const temperaments = useSelector(state => state.temperaments)
    const [/* order */, setOrder] = useState('')

    //----------------------------------- PAGINADO----------------------------------------------------------------------------------

    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage] = useState(8)

    const indexOfLastDog = currentPage * dogsPerPage; // 8// 16 // 
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0// 8 
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // 0 al 8 slice te devielve un arreglo

    const paginado = (pageNumber) => setCurrentPage(pageNumber);

    //---------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        setCurrentPage(1)
    }, [allDogs])

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    //--------------------------------------------------------------------------------------------------------------------------------------
    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setOrder(`${e.target.value}`)
    }

    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setOrder(`${e.target.value}`)
    }

    function handleFilterBySource(e) {
        dispatch(filterBySource(e.target.value))
    }

    function handleFilterByTemperament(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value))
    }

    return (
        <div className='todo'>
            <div className="nav">
                <h1 className="titulo"> Dogs App </h1>
                <Link className="linkCreate" to="/dogs">Create Dog</Link>
                <button className="botonReload" onClick={(e) => { handleClick(e) }}>Reset all Dogs</button>
                <SearchBar />
            </div>

            <div className='filtros'>
                <select className='order' onChange={e => handleOrderByName(e)} defaultValue='Order By Name'>
                    <option disabled > Order By Name </option>
                    <option value="asc"> From A to Z</option>
                    <option value="desc"> From Z to A </option>
                </select>

                <select className='order' onChange={e => handleOrderByWeight(e)} defaultValue='Order By Weight'>
                    <option disabled>Order By Weight</option>
                    <option value="HIGH">Less weight</option>
                    <option value="LESS">Higher weight </option>
                </select>

                <select className='order' onChange={(e) => handleFilterBySource(e)} defaultValue="Filter By Source">
                    <option disabled>Filter By Source</option>
                    <option value="All">All</option>
                    <option value="Api">Api</option>
                    <option value="Created">Created</option>
                </select>

                <select className='order' onChange={(e) => handleFilterByTemperament(e)} defaultValue="Filter By Temperament">
                    <option disabled>Filter By Temperament</option>
                    <option value="all">All</option>
                    {temperaments.map((t) => (
                        <option value={t.name} key={t.id}>
                            {t.name}
                        </option>
                    ))}
                </select>

            </div>

            <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
            />


            <div className='cards'>
                {currentDogs.length > 0 ? currentDogs.map((p) => {
                    return (
                        <div>
                            <ul>  <Card
                                name={p.name}
                                img={p.image}
                                weight={p.weight}
                                temperament={p.temperaments ? p.temperaments.map(t => t.name + " ") : p.temperament}
                                key={p.id}
                                id={p.id} />
                            </ul>
                        </div>
                    )
                }) : <div className="loading_container">
                    <h1 className="loading_title"> Loading... </h1>
                    <img src={giphy} className='loading' alt="loading please wait" height={350} weight={300} />
                </div>}

            </div>
        </div>
    )
}

