import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ExpenceService from '../services/ExpenceService';

function EditExpence() {

    const [expenceId, setExpenceId] = useState(0);
    const [expenceAmount, setExpenceAmount] = useState('');
    const [updatedAt, setUpdatedAt] = useState(new Date());
    const [expenceDescription, setExpenceDescription] = useState('');
    const [expenceCategory, setExpenceCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setExpenceId(localStorage.getItem('expenceId'));
        setExpenceAmount(localStorage.getItem('expenceAmount'));
        setExpenceDescription(localStorage.getItem('expenceDescription'));
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        ExpenceService.updateExpence( {
            expenceAmount: expenceAmount,
            expenceDescription: expenceDescription,
            expenceCategory: expenceCategory,
            updatedAt: updatedAt
        }, expenceId).then(() => {
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
                            <button className='btn btn-primary'>View Expences</button>
                        </Link>
                    </div>
                    <div className='bg-primary p-4 text-center'>
                        <h1>Update Expences</h1>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className='form-group'>
                            <label>Enter Expence Amount: </label>
                            <input type='number' value={expenceAmount} onChange={(e) => setExpenceAmount(e.target.value)} placeholder='Expence Amount' className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label>Enter Description: </label>
                            <input type='text' value={expenceDescription} onChange={(e) => setExpenceDescription(e.target.value)} placeholder='Expence Description' className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label>Enter Category: </label>
                            <input type='text' value={expenceCategory} onChange={(e) => setExpenceCategory(e.target.value)} placeholder='Expence Description' className='form-control' />
                        </div>
                        <br />
                        <div className='d-grid'>
                            <input type='submit' value='Update' className='btn btn-primary' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditExpence