import React, { Component } from "react";
import { Link } from "react-router-dom";
import SiteService from "../services/SiteService";
import { withRouter } from '../common/with-router';

class ViewSite extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchSiteName = this.onChangeSearchSiteName.bind(this);
        this.retrieveSites = this.retrieveSites.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveSite = this.setActiveSite.bind(this);
        this.removeAllSites = this.removeAllSites.bind(this);
        this.searchSiteName = this.searchSiteName.bind(this);
        this.deleteSite = this.deleteSite.bind(this);

        this.state = {
            sites: [],
            currentSite: null,
            currentIndex: -1,
            searchSite: ""
        };
    }

    componentDidMount() {
        this.retrieveSites();
    }

    onChangeSearchSiteName(e) {
        const searchSite = e.target.value;

        this.setState({
            searchSite: searchSite
        });
    }
    deleteSite(siteId) {

        if (window.confirm("Are you want to sure to delete this Site record !") === true) {
           
            SiteService.deleteSite(siteId)
                .then(response => {
                    this.setState({ sites: this.state.sites.filter(site => site.id !== siteId) });
                    console.log(response.data);
                    this.props.router.navigate('/sites');
                    this.componentDidMount();
                })
                .catch(e => {
                    console.log(e);
                });
            
            this.props.router.navigate('/sites');
            this.componentDidMount();
        } 
       
    }
    retrieveSites() {
        SiteService.getSites()
            .then(response => {
                this.setState({
                    sites: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveSites();
        this.setState({
            currentSite: null,
            currentIndex: -1
        });
    }

    setActiveSite(site, index) {
        this.setState({
            currentSite: site,
            currentIndex: index
        });
    }

    removeAllSites() {
        /* TutorialDataService.deleteAll()
             .then(response => {
                 console.log(response.data);
                 this.refreshList();
             })
             .catch(e => {
                 console.log(e);
             });*/
    }

    searchSiteName() {
        SiteService.getSiteById(this.state.searchSite)
             .then(response => {
                 this.setState({
                    // sites: response.data
                     currentSite: response.data
                 });
                 console.log(response.data);
             })
             .catch(e => {
                 console.log(e);
                 this.setState({
                     // sites: response.data
                     currentSite: null
                 });
             });
    }

    render() {
        const { searchSite, sites, currentSite, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-12">
                    <div className="input-group mb-3">
                       {/* <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchSite}
                            onChange={this.onChangeSearchSiteName}
                        />*/}
                        <div className="input-group-append">
                            {/*<button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchSiteName}
                            >
                                Search
                            </button>*/}

                            {currentSite && <Link to={"/update/" + currentSite.siteId} className="btn btn-outline-secondary">
                                Update Site
                            </Link>}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <h4>All Site List</h4>

                    </div>
                    <div className="col-md-6" style={{textAlign:"right"}} >

                        <Link to={"/addSite"} className="btn btn-primary pull-right">
                            Add Site
                        </Link>
                        

                        </div>
                </div>
                <div className="col-md-12">

                    
                   


                    <div className="row">
                        <table className="table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Site Name</th>
                                    <th> Address</th>
                                  
                                    <th> Status</th>
                                    <th> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               
                                    {sites &&
                                        sites.map((site, index) => (
                                            <tr key={site.siteId}>
                                                    <td> {site.siteName} </td>
                                                    <td> {site.address}</td>
                                                    <td> Active</td>
                                                    {<td>
                                                   
                                                    <Link to={"/update/" + site.siteId} className="btn btn-outline-secondary">
                                                        Edit Site
                                                    </Link>
                                                    <button style={{ marginLeft: "10px" }} className="btn btn-danger" onClick={()=>this.deleteSite(site.siteId)} >Delete </button>
                                                        
                                                    </td>}
                                                </tr>
                                        )
                                    )}
                                </tbody>
                        </table>

                    </div>
                   

                   {/* <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllSites}
                    >
                        Remove All
                    </button>*/}
                </div>
               {/* <div className="col-md-6">
                    {currentSite ? (
                        <div>
                            <h4>Site</h4>
                            <div>
                                <label>
                                    <strong>Site Name:</strong>
                                </label>{" "}
                                {currentSite.siteName}
                            </div>
                            <div>
                                <label>
                                    <strong>Address:</strong>
                                </label>{" "}
                                {currentSite.address}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentSite.published ? "Published" : "Pending"}
                            </div>

                            <Link
                                to={"/sites/" + currentSite.siteId}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Sites...</p>
                        </div>
                    )}
                </div>*/}
            </div>
    
    );
}
}

export default withRouter(ViewSite)