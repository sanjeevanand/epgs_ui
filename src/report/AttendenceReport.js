import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import http from "../common/http-common";
import DatePicker from "react-datepicker";

function AttendenceReport(props) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [employees, SetEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState(0);
    const [employeeName, setEmployeeName] = useState("");
    const [attendences, setAttendences] = useState([]);
    const [workingDay, setWorkingDay] = useState(0);
    /*const data = {
        employeeId: 0, name: "", mobile1: "",  email: "", address: "",
        role: "", type: "", salary: 0.0, dailyWaseAmount: 0.0
    }*/
    const data = {
        employeeId: 0, name: "", mobile1: "", mobile2: "", email: "",
        address: "", role: "", type: "", salary: 0.0, dailyWaseAmount: 0.0,
        totalWorkingDays: 0, workingHours: 0.0, absent: 0, present: 0, overTimeHours: 0.0, advance: 0.0,
        conveyanceExpenses: 0.0, netPayment: 0.0
   
    }    
    const [report, setReport] = useState(data);

   
    useEffect(() => {
        const opt = [
            {
                key: "Select a Employee",
                value: "Select a Employee"
            },
        ];

        (async () => {
            const { data } = await axios.get("http://localhost:8080/api/v1/employees");
            data.forEach((value) => {
                opt.push({
                    key: value.employeeId,
                    value: value.name
                });
            });
            //alert(JSON.stringify(opt));
            SetEmployees(opt);
        })();

    }, []);

    const handleChange = (event) => {

        if (event.target.name === 'employee') {
            setEmployeeId(event.target.value);
            setEmployeeName(event.target[event.target.selectedIndex].text);
            console.log(event.target[event.target.selectedIndex].text);
        }
    }
    const submitHandler = (event) => {

         axios.get("http://localhost:8080/api/v1/attendences/employee/" + employeeId + "/" + convert(startDate) + "/to/" + convert(endDate))
            .then(response => {
                setReport(response.data.a);
                setAttendences(response.data.attendences);
                console.log(report);
            })
            .catch(error => {
                // handle error
            });            ;
        
        


    }
    function CalculateReport() {
        attendences.map((attendence, index) => (
            setWorkingDay(workingDay + attendence.hours)
        ));
    }
    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <select class="form-select" name="employee" onChange={handleChange}>
                            {employees.map((option) => {
                                return (
                                    <option key={option.key} value={option.key}>
                                        {option.value}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div class="col">
                        <DatePicker selected={startDate} onChange={(date) => {
                            setStartDate(date)
                        }} dateFormat="yyyy-MM-dd" className="form-control" />
                    </div>
                    <div class="col">
                        <DatePicker selected={endDate} onChange={(date) => {
                            setEndDate(date)
                        }} dateFormat="yyyy-MM-dd" className="form-control" />
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-primary" onClick={submitHandler}>Search</button>
                    </div>
                </div>
                <br></br>

                
            </div>

            <div class="container">
                <div class="row"><h4>Report For {report.name}  From {convert(startDate)} To {convert(endDate)} </h4></div><br></br>
                <div class="row">
                    <div class="col">
                        <div>
                            <h4>Employee Details</h4>
                            <div>
                                <label>
                                    <strong>Employee Id:</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Mobile:</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Email:</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Address:</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Role :</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Type :</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Salary  :</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Daily Wase Amount :</strong>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <h4>Value</h4>
                            <div>
                                <label>
                                    <strong>{report.employeeId}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>{report.name}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>{report.mobile1}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>{report.email}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>{report.address}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>{report.role}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>{report.type}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong> {report.salary}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong> {report.dailyWaseAmount}</strong>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <h4>Work Details</h4>
                            <div>
                                <label>
                                    <strong>Total Working Days: </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Total workingHours : </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Absent : </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Present :</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>overTimeHours : </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>conveyanceExpenses : </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>advance :</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Net Payment : </strong>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <h4>Value</h4>
                            <div>
                                <label>
                                    <strong>{report.totalWorkingDays} </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>{report.workingHours} </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>{report.absent}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong> {report.present}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>{report.overTimeHours}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong> {report.conveyanceExpenses}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>{report.advance}</strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong> {report.netPayment}</strong>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table border shadow">
                <thead>
                    <tr>
                        {/* <th scope="col">S.N</th>*/}
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                       {/* <th scope="col">Day</th>*/}
                        <th scope="col">Status</th>
                        
                        <th scope="col">Hours</th>
                        <th scope="col">Over Time</th>
                        <th scope="col">Start From</th>
                        <th scope="col">End To</th>
                        <th scope="col">Conveyance Expenses</th>
                        <th scope="col">Advance</th>
                        <th scope="col">Remarks</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {attendences.map((attendence, index) => (
                        <tr>
                            {/* <th scope="row" key={index}>
                                    {index + 1}
                                </th>*/}
                            <td>{attendence.employeeDto.name}</td>
                           {/* <td>{attendence.day}</td>*/}
                            <td>{attendence.date}</td>
                            <td>{attendence.status}</td>
                            
                            <td>{attendence.hours}</td>
                            <td>{attendence.overTime}</td>
                            <td>{attendence.startFrom}</td>
                            <td>{attendence.endTo}</td>
                            <td>{attendence.conveyanceExpenses}</td>
                            <td>{attendence.advance}</td>
                            <td>{attendence.remarks}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )



}

export default AttendenceReport;