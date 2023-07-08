import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ExpenceService from '../services/ExpenceService';

function ViewExpence() {

    const [listExpences, setListExpences] = useState([])

    function getData() {
        ExpenceService.getExpences()
            .then((response) => {
                setListExpences(response.data);
            }).catch((err) => {
                console.log(err)
            });
    }

    function handleDelete(expenceId) {
        ExpenceService.deleteExpence(expenceId)
            .then(() => {
                getData();
            }).catch((err) => {
                console.log(err)
            });
    }

    function setDataToStorage(expenceId,expenceAmount, expenceDescription){
        localStorage.setItem('expenceId', expenceId);
        localStorage.setItem('expenceAmount', expenceAmount);
        localStorage.setItem('expenceDescription', expenceDescription);
       
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='mb-2 mt-2'>
                        <Link to='/AddExpence'>
                            <button className='btn btn-primary'>Create New Data</button>
                        </Link>
                    </div>

                    <table className='table table-bordered table-striped table-dark table-hover'>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <th>Expence Amount</th>
                                <th>Expence Description</th>
                                <th>Category</th>
                                <th>Updated At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listExpences.map((item) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.expenceId}</td>
                                                <td>{item.expenceAmount}</td>
                                                <td>{item.expenceDescription}</td>
                                                <td>{item.expenceCategory}</td>
                                                <td>
                                                    <td>{item.updatedAt}</td>    
                                                </td>
                                                <td>
                                                    <Link to='/editExpence'>
                                                        <button className='btn btn-primary' onClick={() => setDataToStorage(item.expenceId, item.expenceAmount, item.expenceDescription)}>Edit</button>
                                                    </Link> &nbsp;      
                                                    <button className='btn btn-danger' onClick={() => { if (window.confirm('Are You Sure To Delete Data ??')) { handleDelete(item.expenceId) } }}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewExpence