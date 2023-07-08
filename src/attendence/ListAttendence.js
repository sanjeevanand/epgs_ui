import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

import { withRouter } from '../common/with-router';
function ListAttendence(props) {

    const navigate = useNavigate();
    const [attendences, setAttendences] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadAttendences();
    }, []);

    const loadAttendences = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/attendences");
        setAttendences(result.data);
    };


    const deleteAttendence = async (id) => {
        console.log("idddd" + id);
        if (window.confirm("Are you want to sure to delete this record !") === true) {
            await axios.delete(`http://localhost:8080/api/v1/attendences/${id}`);
            loadAttendences();
        }
    };

    function addAttendence(){

        props.router.navigate('/addAttendence');

    }


    return (
        <div className="container">
            <div className="py-4">
                <h2 className="text-center">Attendences List</h2>
                <div className="row">
                    <button className="btn btn-primary pull-right" onClick={addAttendence}> Add Attendence</button>
                </div>
                <br></br>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            {/* <th scope="col">S.N</th>*/}
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Day</th>
                            <th scope="col">Status</th>
                            <th scope="col">Over Time</th>
                            <th scope="col">Hours</th>
                            <th scope="col">Start From</th>
                            <th scope="col">End To</th>
                            <th scope="col">Conveyance Expenses</th>
                            <th scope="col">Advance</th>
                            <th scope="col">Remarks</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendences.map((attendence, index) => (
                            <tr>
                               {/* <th scope="row" key={index}>
                                    {index + 1}
                                </th>*/}
                                <td>{attendence.employeeDto.name}</td>
                                <td>{attendence.day}</td>
                                <td>{attendence.date}</td>
                                <td>{attendence.status}</td>
                                <td>{attendence.overTime}</td>
                                <td>{attendence.hours}</td>
                                <td>{attendence.startFrom}</td>
                                <td>{attendence.endTo}</td>
                                <td>{attendence.conveyanceExpenses}</td>
                                <td>{attendence.advance}</td>
                                <td>{attendence.remarks}</td>
                                <td>
                                    {/*<Link
                                        className="btn btn-primary mx-2"
                                        to={`/viewattendence/${attendence.id}`}
                                    >
                                        View
                                    </Link>
                                    <Link
                                        className="btn btn-outline-primary mx-2"
                                        to={`/editattendence/${attendence.attandenceId}`}
                                    >
                                        Edit
                                    </Link>*/}
                                    <button
                                        className="btn btn-danger mx-2"
                                        onClick={() => deleteAttendence(attendence.attandenceId)}
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
    );
}

export default withRouter(ListAttendence);