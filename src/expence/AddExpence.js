import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import ExpenceService from '../services/ExpenceService';


function AddExpence() {

    const [expenceAmount, setExpenceAmount] = useState('');
   
    const [expenceDescription, setExprenceDescription] = useState('');
    const [expenceCategory, setExprenceCategory] = useState('');
    const [createdAt, setCreatedAt] = useState(new Date());
    const [updatedAt, setUpdatedAt] = useState(new Date());

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
       ExpenceService.createExpence({
           expenceAmount: expenceAmount,
           expenceDescription: expenceDescription,
           expenceCategory: expenceCategory,
           createdAt: createdAt,
           updatedAt: updatedAt
        }).then(() => {
            navigate('/expences');
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='mb-2 mt-2'>
                        <Link to='/expences'>
                            <button className='btn btn-primary'>See Expences</button>
                        </Link>
                    </div>
                    <div className='bg-primary p-4 text-center'>
                        <h1>Create Expence</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Enter Amount: </label>
                            <input type='text' placeholder='Expence Amount' className='form-control' onChange={(e) => setExpenceAmount(e.target.value)} />
                        </div>
                       
                        <div className='form-group'>
                            <label>Enter Description: </label>
                            <input type='text' placeholder='Exprence Description' onChange={(e) => setExprenceDescription(e.target.value)} className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label>Enter Category: </label>
                            <input type='text' placeholder='Exprence Category' onChange={(e) => setExprenceCategory(e.target.value)} className='form-control' />
                        </div>
                        <br />
                        <div className='d-grid'>
                            <input type='submit' value='Submit' className='btn btn-primary' />
                        </div>
                    </form>

                    {expenceAmount}
                    <br />
                
                    <br />
                   
                </div>
            </div>
        </>
    )
}

export default AddExpence