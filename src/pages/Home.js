import React, { Component} from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import SiteService from "../services/SiteService";
import EmployeeService from "../services/EmployeeService";



class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sites: [],
            employees:[]
        }
      //  this.addSite = this.addSite.bind(this);
     //   this.editSite = this.editSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
    }
    componentDidMount() {

        SiteService.getSites().then((res) => {
            this.setState({ sites: res.data });
        });
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }
    deleteSite(id) {
        SiteService.deleteSite(id).then(res => {
            this.setState({ employees: this.state.sites.filter(site => site.id !== id) });
        });
    }
    render() {
        return (
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                            <tr>
                                <th scope="col">S.N</th>
                                <th scope="col">Site Name</th>
                                <th scope="col">Site Address </th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sites.map((site, index) => (
                                <tr>
                                    <th scope="row" key={index}>
                                        {index + 1}
                                    </th>
                                    <td>{site.siteName}</td>
                                    <td>{site.address}</td>

                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/viewsite/${site.siteId}`}
                                        >
                                            View
                                        </Link>
                                        <Link
                                            className="btn btn-outline-primary mx-2"
                                            to={`/editedit/${site.siteId}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => this.deleteSite(site.siteId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Home;