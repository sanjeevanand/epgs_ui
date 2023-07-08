import React, { Component } from 'react';
import { withRouter } from '../common/with-router';
import EmployeeService from '../services/EmployeeService';
 

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id) {
        if (window.confirm("Are you want to sure to delete this record !") === true) {
            EmployeeService.deleteEmployee(id).then(res => {
                this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
                this.props.router.navigate('/employees');
                this.componentDidMount();
            });
            this.props.router.navigate('/employees');
            this.componentDidMount();
        } 
        
        
    }
    viewEmployee(id){
      //  this.props.history.push(`/view-employee/${id}`);
        this.props.router.navigate(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.router.navigate(`/add-employee/${id}`);
    }

    componentDidMount(){
		
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        
        this.props.router.navigate('/addEmployee');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div className = "row">
                    <button className="btn btn-primary pull-right" onClick={this.addEmployee}> Add Employee</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee Name</th>
                                    <th> Mobile</th>
                                    <th> Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.employeeId}>
                                             <td> { employee.name} </td>   
                                             <td> {employee.mobile1}</td>
                                             <td> {employee.email}</td>
                                             <td>
                                               {/*  <button onClick={ () => this.editEmployee(employee.employeeId)} className="btn btn-info">Update </button>*/}
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.employeeId)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.employeeId)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default withRouter(ListEmployeeComponent)