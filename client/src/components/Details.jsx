import React from 'react'
import { getDetails, cleanDetails } from '../actions'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import './Details.css'
import { Link, useParams, useNavigate } from "react-router-dom";
import giphy from './images/giphy.gif'



export default function Details() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [id, dispatch]);

  const dogsDetails = useSelector(state => state.detail)

  function cleanSubmit(e) {
    e.preventDefault();
    dispatch(cleanDetails())
    navigate('/home')
  }

  return (
    <div>
      {
        dogsDetails.length > 0 ?
          <div className="container">
            <div className="left">
              <h1 className="name1">NAME <br /> {dogsDetails[0].name.toUpperCase()}</h1>
              <img src={dogsDetails[0].image} alt="dog" height={190} weight={180} />
            </div>
            <div className="right">
              <h4>YEARS: {dogsDetails[0].years}</h4>
              <h4>TEMPERAMENT: {dogsDetails[0].temperament ? (dogsDetails[0].temperament ? dogsDetails[0].temperament : "No temperament found") : (dogsDetails[0].temperaments.map(t => t.name + " "))}</h4>
              <h4>HEIGHT: {dogsDetails[0].height}</h4>
              <h4>WEIGHT: {dogsDetails[0].weight}</h4>
              <h3 className='id1'>ID <br /> {dogsDetails[0].id}</h3>
            </div>
            <div className="boton">
              <Link to='/home'>
                <button onClick={(e) => cleanSubmit(e)} className='boton_home'>Return to Home</button>
              </Link>
            </div>
          </div>
          :
          <div>
            <h1 className="loadingTitle">Loading...</h1>
            <h4 className="please">please wait..</h4>
            <img src={giphy} className='loading2' alt="loading please wait" height={350} weight={300} />
          </div>
      }

    </div>
  )
}
