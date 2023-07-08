import React, {  useState } from 'react'
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { withRouter } from '../common/with-router';


import "react-datepicker/dist/react-datepicker.css"; 

function CreateEmployeeComponent(props) {

    const employeeObj = { name: "", mobile1: "", mobile2: "", email: "", address: "", role: "", type: "Permanent", salary: 0.0, dailyWaseAmount: 0 }
    const [employee, setEmployee] = useState(employeeObj);
    const navigate = useNavigate();//props.navigate;
    
    function changeHandler(e) {
        setEmployee({ ...employee, [e.target.name]: e.target.value })
        console.log(employee);
    }
    
    function submitHandler() {
        EmployeeService.createEmployee(employee)
            .then(response => {
                setEmployee({employee,response });
                navigate("/employees");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                let arr  = Object.keys(e.response.data)
                alert(JSON.stringify(e.response.data));
               
                navigate("/addEmployee");
            });
       
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                           // this.getTitle()
                           
                        }<h1>ADD Employee</h1>
                        <div className="card-body">
                           
                            <div className="form-group">
                                <label>  Name: </label>
                                <input placeholder="Name" className="form-control"
                                    name="name"
                                    value={employee.name} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label> Mobile: </label>
                                <input placeholder="Mobile" name="mobile1" className="form-control"
                                    value={employee.mobile1} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label> Mobile2: </label>
                                <input placeholder="Mobile2" name="mobile2" className="form-control"
                                    value={employee.mobile2} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label>  Email: </label>
                                <input placeholder="Name" className="form-control"
                                    name="email"
                                    value={employee.email} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label> address: </label>
                                <input placeholder="address" name="address" className="form-control"
                                    value={employee.address} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label> role: </label>
                                <input placeholder="Mobile2" name="role" className="form-control"
                                    value={employee.role} onChange={changeHandler} />
                            </div>
                           
                            <div className="form-group">
                                <label>  type: </label>
                                
                                    <select value={employee.type} onChange={changeHandler} name="type" className="form-control">

                                        <option value="Permanent">Permanent</option>

                                        <option value="Daily">Daily</option>

                                        <option value="Other">Other</option>

                                    </select>
                            </div>
                            <div className="form-group">
                                <label> salary: </label>
                                <input placeholder="salary" name="salary" className="form-control"
                                    value={employee.salary} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label> dailyWaseAmount: </label>
                                <input placeholder="dailyWaseAmount" name="dailyWaseAmount" className="form-control"
                                    value={employee.dailyWaseAmount} onChange={changeHandler} />
                                </div>
                                <button className="btn btn-success" onClick={submitHandler }>Save</button>
                                <button className="btn btn-danger"  style={{ marginLeft: "10px" }}>Cancel</button>
                           
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default withRouter(CreateEmployeeComponent) 