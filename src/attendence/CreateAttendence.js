import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import http from "../common/http-common";
import DatePicker from "react-datepicker";
  

function CreateAttendence(props) {

    const [employees, SetEmployees] = useState([]);
    const [sites, SetSites] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const data = { day: "", date: "", status: "", overTime: "", overTimeHours:0.0, hours: null, startFrom: "", endTo: "" , conveyanceExpenses: "", advance: null, remarks: "" } 
    const [attendence, SetAttendence] = useState(data);
  
    const [siteId, setSiteId] = useState(0);
    const [employeeId, setEmployeeId] = useState(0);
    const navigate = useNavigate();

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
    useEffect(() => {
        const opt = [
            {
                key: "Select a Site/Project",
                value: "Select a Site/Project"
            },
        ];

        (async () => {
            const { data } = await axios.get("http://localhost:8080/api/v1/sites");
            data.forEach((value) => {
                opt.push({
                    key: value.siteId,
                    value: value.siteName
                });
            });
          //  alert(JSON.stringify(opt));
            SetSites(opt);
        })();

    }, []);

    function changeHandler(e) {

        SetAttendence({ ...attendence, [e.target.name]: e.target.value })
        console.log(attendence);
    }
    const handleChange = (event) => {
        if (event.target.name === 'site') {
            setSiteId(event.target.value);
        }
        else if (event.target.name === 'employee') {
            setEmployeeId(event.target.value);
        }


     //   alert(event.target.value);
    }
    function  create(data,siteId,employeeId)  {
        return http.post("/attendences/site/" + siteId +"/employee/" + employeeId, data);
    };
    const submitHandler = (event) => {
        
        if (attendence.date == '')
            attendence.date = startDate;
      
        create(attendence, siteId, employeeId)
            .then(response => {
                //setEmployee({ employee, response });
                navigate("/attendences");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                ///let arr = Object.keys(e.response.data)
                alert(JSON.stringify(e.response.data));

                
            });
       /* EmployeeService.createEmployee(employee)
            .then(response => {
                setEmployee({ employee, response });
                navigate("/employees");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                let arr = Object.keys(e.response.data)
                alert(JSON.stringify(e.response.data));

                navigate("/addEmployee");
            });*/

      
    }
    return (
        <>
            <h1>Attendence </h1>
            <div className="form-group">
            <select name="site" onChange={handleChange} className="form-control">

                {sites.map((option) => {
                    return (
                        <option key={option.key} value={option.key}>
                            {option.value}
                        </option>
                    );
                })}
                </select>
            </div>
           <div className="form-group">
            <select name="employee" onChange={handleChange} className="form-control">
                
                {employees.map((option) => {
                    return (
                        <option key={option.key} value={option.key}>
                            {option.value}
                        </option>
                    );
                })}
                </select>
            </div>
            <br />
            
           
            <input placeholder="date" name="date" style={{ visibility: 'hidden' }}
                    value={attendence.date} onChange={changeHandler} />
           
            <div className="form-group">
                <DatePicker selected={startDate} onChange={(date) => { 
                    setStartDate(date); SetAttendence({ ...attendence, date: date })
                }} dateFormat="yyyy-MM-dd" className="form-control"/>
            </div>   
            <div className="form-group">
                {/*<input placeholder="day" name="day" className="form-control"
                    value={attendence.day} onChange={changeHandler} />*/}
                <select name="day" onChange={changeHandler} className="form-control">
                    <option value=''>Select Day</option>
                    <option value='MONDAY'>MONDAY</option>
                    <option value='TUESDAY'>TUESDAY</option>
                    <option value='WEDNESDAY'>WEDNESDAY</option>
                    <option value='THURSDAY'>THURSDAY</option>
                    <option value='FRIDAY'>FRIDAY</option>
                    <option value='SATURDAY'>SATURDAY</option>
                    <option value='SUNDAY'>SUNDAY</option>
                </select>
            </div>
            <div className="form-group">
                <input placeholder="status" name="status" className="form-control"
                    value={attendence.status} onChange={changeHandler} />
            </div>
           
            <div className="form-group">
                <input placeholder="hours" name="hours" className="form-control"
                    value={attendence.hours} onChange={changeHandler} />
            </div>
            <div className="form-group">
                <input placeholder="overTime" name="overTime" className="form-control"
                    value={attendence.overTime} onChange={changeHandler} />
            </div>
            <div className="form-group">
                <input placeholder="Over Time hours" name="overTimeHours" className="form-control"
                    value={attendence.overTimeHours} onChange={changeHandler} />
            </div>
            <div className="form-group">
                <input placeholder="startFrom" name="startFrom" className="form-control"
                    value={attendence.startFrom} onChange={changeHandler} />
            </div>
            <div className="form-group">
                <input placeholder="endTo" name="endTo" className="form-control"
                    value={attendence.endTo} onChange={changeHandler} />
            </div>
            <div className="form-group">
                <input placeholder="conveyanceExpenses" name="conveyanceExpenses" className="form-control"
                    value={attendence.conveyanceExpenses} onChange={changeHandler} />
            </div>
            <div className="form-group">
                <input placeholder="advance" name="advance" className="form-control"
                    value={attendence.advance} onChange={changeHandler} />
            </div>
            <div className="form-group">
                <input placeholder="remarks" name="remarks" className="form-control"
                    value={attendence.remarks} onChange={changeHandler} />
            </div>
            <br></br>
            <button className="btn btn-success" onClick={submitHandler}>Save</button>
            <button className="btn btn-danger" style={{ marginLeft: "10px" }}>Cancel</button>
        </>
    )


}
export default CreateAttendence;