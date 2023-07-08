import React, { Component } from 'react'
import { withRouter } from '../common/with-router';
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        console.log(props);
        const { id } = props.router.params;
        this.state = {
            

            employeeId:
                id,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.employeeId).then(res => {
            this.setState({ employee: res.data });
        })
    }

    render() {
        return (
            
                <div className="card col-md-9 offset-md-1">
                    <h3 className="text-center"> View Employee Details</h3>
                    <table class="table">
                        
                        <tbody>
                            <tr>
                                <th scope="row">Employee Name:</th>
                                <td> {this.state.employee.name}</td>
                                <th scope="row">Mobile:</th>
                                <td>{this.state.employee.mobile1},{this.state.employee.mobile1}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{this.state.employee.email}</td>
                                <th scope="row">Address </th>
                                <td>{this.state.employee.address}</td>
                            </tr>
                            <tr>
                                <th scope="row">Role:</th>
                                <td>{this.state.employee.role}</td>
                                <th scope="row"> Type:</th>
                                <td>{this.state.employee.type}</td>
                            </tr>
                            <tr>
                                <th scope="row"> Salary </th>
                                <td>{this.state.employee.salary}</td>
                                <th scope="row"> Daily Wase Amount:</th>
                                <td>{this.state.employee.dailyWaseAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                   

                </div>
           
        )
    }
}

export default withRouter(ViewEmployeeComponent)