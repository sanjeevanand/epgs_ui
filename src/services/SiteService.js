import axios from '../common/http-common'


const SITE_API_BASE_URL = "/sites";

class SiteService {

    getSites(){
        return axios.get(SITE_API_BASE_URL);
    }

    createSite(site){
        return axios.post(SITE_API_BASE_URL, site);
    }

    getSiteById(siteId){
        return axios.get(SITE_API_BASE_URL + '/' + siteId);
    }

    updateSite(site, siteId){   
        return axios.put(SITE_API_BASE_URL + '/' + siteId, site);
    }

    deleteSite(siteId){
        return axios.delete(SITE_API_BASE_URL + '/' + siteId);
    }
}

export default new SiteService();