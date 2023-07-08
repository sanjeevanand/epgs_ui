import axios from '../common/http-common'


const Expence_API_BASE_URL = "/expences";

class ExpenceService {

    getExpences(){
        return axios.get(Expence_API_BASE_URL);
    }

    createExpence(expence){
        return axios.post(Expence_API_BASE_URL, expence);
    }

    getExpenceById(expenceId){
        return axios.get(Expence_API_BASE_URL + '/' + expenceId);
    }

    updateExpence(expence, expenceId){   
        return axios.put(Expence_API_BASE_URL + '/' + expenceId, expence);
    }

    deleteExpence(expenceId){
        return axios.delete(Expence_API_BASE_URL + '/' + expenceId);
    }
}

export default new ExpenceService();