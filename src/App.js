import React, { Component } from 'react';

import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"




/*
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
//import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';*/

import AddSite from './site/AddSite';
import ViewSite from './site/ViewSite';
import EditSite from './site/EditSite';
import Landing from './pages/Landing';
import Page404 from './pages/Page404';
import ListEmployeeComponent from './employee/ListEmployeeComponent';
import ViewEmployeeComponent from './employee/ViewEmployeeComponent';
import CreateEmployeeComponent from './employee/CreateEmployeeComponent';
import CreateAttendence from './attendence/CreateAttendence';
import ListAttendence from './attendence/ListAttendence';
import AttendenceReport from './report/AttendenceReport';
import ViewExpence from './expence/ViewExpence';
import AddExpence from './expence/AddExpence';
import EditExpence from './expence/EditExpence';
import ExpenceReport from './report/ExpenceReport';


class App extends Component {
  render() {
      return (
         
          <div>
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                  <Link to={"/"} className="navbar-brand">
                            E P G System
                  </Link>
                  <div className="navbar-nav mr-auto">
                      <li className="nav-item">
                          <Link to={"/sites"} className="nav-link">
                              Site
                          </Link>
                      </li>
                     
                      
                      <li className="nav-item">
                          <Link to={"/employees"} className="nav-link">
                              All Employee 
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link to={"/attendences"} className="nav-link">
                              All Attendence
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link to={"/attendenceReport"} className="nav-link">
                              Report
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link to={"/expences"} className="nav-link">
                              Expences
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link to={"/expenceReport"} className="nav-link">
                              Report
                          </Link>
                      </li>
                  </div>
              </nav>

              <div className="container mt-3">
                  <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/sites" element={<ViewSite />} />
                      <Route path="/addSite" element={<AddSite />} />
                      <Route path="/update/:id" element={<EditSite />} />
                      <Route path="/employees" element={<ListEmployeeComponent />} />
                      <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />
                      <Route path="/addEmployee" element={<CreateEmployeeComponent />} />
                      <Route path="/attendences" element={<ListAttendence />} />
                      <Route path="/addAttendence" element={<CreateAttendence />} />
                      <Route path="/attendenceReport" element={<AttendenceReport />} />
                      <Route path="/expences" element={<ViewExpence />} />
                      <Route path="/expenceReport" element={<ExpenceReport />} />
                      <Route path="/addExpence" element={<AddExpence />} />
                      <Route path="/editExpence/" element={<EditExpence />} />
                      <Route path="/*" element={<Page404 />} />
                      
                  </Routes>
                  
              </div>
          </div>
   );
  }
}

export default App;
