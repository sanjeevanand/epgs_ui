import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import http from "../common/http-common";
import DatePicker from "react-datepicker";

function ExpenceReport(props) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
   
    
    const [expences, setExpences] = useState([]);
    
  
    const data = {
        sumAmount: 0.0
   
    }    
    const [report, setReport] = useState(data);

   
    

    
    const submitHandler = (event) => {

         axios.get("http://localhost:8080/api/v1/expences" + "/" + convert(startDate) + "/to/" + convert(endDate))
            .then(response => {
                setReport(response.data.a);
                setExpences(response.data.expences);
                console.log(report);
            })
            .catch(error => {
                // handle error
            });            ;
        
        


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
                            <h4>Expence Details</h4>
                            <div>
                                <label>
                                    <strong>Total Expences:</strong>
                                </label>
                            </div>
                           
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <h4>Value</h4>
                            <div>
                                <label>
                                    <strong>{report.sumAmount}</strong>
                                </label>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col" style={{ visibility: 'hidden' }}>
                        <div  >
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
                    <div class="col" style={{ visibility: 'hidden' }}>
                        <div>
                            <h4>Value</h4>
                            <div>
                                <label>
                                    <strong> </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong> </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong></strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong> </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong></strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong> </strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong></strong>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong></strong>
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
                        <th scope="col">Expence Amount</th>
                        <th scope="col">Expence Description</th>
                        <th scope="col">Category</th>
                        <th scope="col">Updated At</th>
                       
                        
                    </tr>
                </thead>
                <tbody>
                    {expences.map((expence, index) => (
                        <tr>
                            {/* <th scope="row" key={index}>
                                    {index + 1}
                                </th>*/}
                            <td>{expence.expenceAmount}</td>
                          
                            <td>{expence.expenceDescription}</td>
                            <td>{expence.expenceCategory}</td>
                            <td>{expence.updatedAt}</td>
                            
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )



}

export default ExpenceReport;