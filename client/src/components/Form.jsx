import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../actions';
import './Form.css';


export default function CreateDog() {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    const allDogs = useSelector(state => state.dogs)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        yearsMin: '',
        yearsMax: '',
        image: '',
        temperament: []
    });

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament:
                input.temperament.includes(e.target.value) ?
                    [...input.temperament] :
                    [...input.temperament, e.target.value]
        })
        setErrors(validate({
            ...input,
            temperament: [...input.temperament, e.target.value]
        }))
    }

    function handleDelete(e) {
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.name) {
            return alert("*Name is required")
        }
        else if (typeof input.name !== 'string' || input.name.length < 2) {
            return alert('*Dog name is invalid')
        }
        else if (allDogs.find((d) => d.name.toLowerCase() === input.name.toLowerCase())) {
            return alert(`*Dog named -${input.name}- already exists`)
        }
        else if (!input.heightMin) {
            return alert("*Height Min is required")
        } else if (input.heightMin < 0 || input.heightMin > 255) {
            return alert("*Height Min can't be negative or greater than 255 points")
        }
        else if (!input.heightMax) {
            return alert("*Height Max is required")
        } else if (input.heightMax < 0 || input.heightMax > 255) {
            return alert("*Height Max can't be negative or greater than 255 points")
        }
        else if (!input.weightMin) {
            return alert("*Weight Min is required")
        } else if (input.weightMin < 0 || input.weightMin > 255) {
            return alert("*Weight Min can't be negative or greater than 255 points")
        }
        else if (!input.weightMax) {
            return alert("*Weight Max is required")
        } else if (input.weightMax < 0 || input.weightMax > 255) {
            return alert("*Weight Max can't be negative or greater than 255 points")
        }
        else if (!input.yearsMin) {
            return alert("*Years Min is required")
        } else if (input.yearsMin < 0 || input.yearsMin > 255) {
            return alert("*Years Min can't be negative or greater than 255 points")
        }
        else if (!input.yearsMax) {
            return alert("*Years Max is required")
        } else if (input.yearsMax < 0 || input.yearsMax > 255) {
            return alert("*Years Max can't be negative or greater than 255 points")
        }
        dispatch(postDog(input));
        alert('¡Dog Created!')
        navigate('/home')
        setInput({
            name: '',
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            yearsMin: '',
            yearsMax: '',
            image: '',
            temperament: []
        })
    }

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "*Name is required";
        } else if (!input.name.match(/^[a-z]+$/)) {// expresion reg que no deja poner mayuscula, espacio y numeros
            errors.name = "Only lowercase names"
        }
        else if (typeof input.name !== 'string' || input.name.length < 2) {
            errors.name = "*Dog name is invalid";
        }
        else if (allDogs.find((d) => d.name.toLowerCase() === input.name.toLowerCase())) {
            errors.name = "*Dog named already exists";
        }
        else if (!input.heightMin) {
            errors.heightMin = "*Height Min is required"
        } else if (input.heightMin < 0 || input.heightMin > 255) {
            errors.heightMin = "*Height Min can't be negative or greater than 255 points"
        }
        else if (!input.heightMax) {
            errors.heightMax = "*Height Max is required"
        } else if (input.heightMax < 0 || input.heightMax > 255) {
            errors.heightMax = "*Height Max can't be negative or greater than 255 points"
        }
        else if (!input.weightMin) {
            errors.weightMin = "*Weight Min is required"
        } else if (input.weightMin < 0 || input.weightMin > 255) {
            errors.weightMin = "*Weight Min can't be negative or greater than 255 points"
        }
        else if (!input.weightMax) {
            errors.weightMax = "*Weight Max is required"
        } else if (input.weightMax < 0 || input.weightMax > 255) {
            errors.weightMax = "*Weight Max can't be negative or greater than 255 points"
        }
        else if (!input.yearsMin) {
            errors.yearsMin = "*Years Min is required"
        } else if (input.yearsMin < 0 || input.yearsMin > 255) {
            errors.yearsMin = "*Years Min can't be negative or greater than 255 points"
        }
        else if (!input.yearsMax) {
            errors.yearsMax = "*Years Max is required"
        } else if (input.yearsMax < 0 || input.yearsMax > 255) {
            errors.yearsMax = "*Years Max can't be negative or greater than 255 points"
        }
        /* else if (!input.image) {
           errors.image = "*Image URL is required, or is going to be our default img"
       } */
        return errors;
    };

    return (
        <div >
            <Link to="/home">
                <button className='botonh'>Return to Home</button>
            </Link>
            <h1>Create Dog</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div>
                        <label>Name: </label>
                        <input type="text" value={input.name} name='name' onChange={(e) => handleChange(e)} /* className='input_form' */ />
                        {
                            errors.name && (// Si hay algun error entonces 
                                <p className='error'>{errors.name}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Height Min:</label>
                        <input type="number" value={input.heightMin} name='heightMin' onChange={(e) => handleChange(e)} /* className='input_form' */ />
                        {
                            errors.heightMin && (
                                <p className='error'>{errors.heightMin}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Height Max: </label>
                        <input type="number" value={input.heightMax} name='heightMax' onChange={(e) => handleChange(e)} /* className='input_form' */ />
                        {
                            errors.heightMax && (
                                <p className='error'>{errors.heightMax}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Weight Min: </label>
                        <input type="number" value={input.weightMin} name='weightMin' onChange={(e) => handleChange(e)} /* className='input_form' */ />
                        {
                            errors.weightMin && (
                                <p className='error'>{errors.weightMin}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Weight Max: </label>
                        <input type="number" value={input.weightMax} name='weightMax' onChange={(e) => handleChange(e)} /* className='input_form' */ />
                        {
                            errors.weightMax && (
                                <p className='error'>{errors.weightMax}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Years Min: </label>
                        <input type="number" value={input.yearsMin} name='yearsMin' onChange={(e) => handleChange(e)} /* className='input_form' */ />
                        {
                            errors.yearsMin && (
                                <p className='error'>{errors.yearsMin}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Years Max: </label>
                        <input type="number" value={input.yearsMax} name='yearsMax' onChange={(e) => handleChange(e)} /* className='input_form' */ />
                        {
                            errors.yearsMax && (
                                <p className='error'>{errors.yearsMax}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Image: </label>
                        <input type="url" placeholder="https://image.com" autoComplete='off' value={input.image} name='image' onChange={(e) => handleChange(e)} /* className='input_form' */ />
                        {
                            errors.image && (
                                <p className='error'>{errors.image}</p>
                            )
                        }
                    </div>
                    <div >
                        <label>Temperaments: </label>
                        <select name="temperament" onChange={(e) => handleSelect(e)}>
                            {
                                temperaments.map((t) => (
                                    <option value={t.name} key={t.id}>{t.name}</option>
                                ))
                            }
                        </select>

                        {input.temperament.map(t =>
                            <div key={t}>
                                <p>{t}</p>
                                <button value={t} onClick={() => handleDelete(t)}>x</button>
                            </div>
                        )}

                    </div>
                </div>
                <button type='submit' className='botonCreate'>Create Dog</button>
            </form>
        </div>
    )


}