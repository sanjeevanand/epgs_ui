import axios from 'axios';

const Report_API_BASE_URL = "http://localhost:8080/api/v1/attendences/site/2/employee/20";

class ReportService {

    
    getReportByEmployeeBetweenDate( employeeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

  
}

export default new ReportService();