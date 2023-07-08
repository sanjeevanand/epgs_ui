import React, { Component } from "react";
import { Link } from "react-router-dom";
import SiteService from "../services/SiteService";

export default class ViewSite extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchSiteName = this.onChangeSearchSiteName.bind(this);
        this.retrieveSites = this.retrieveSites.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveSite = this.setActiveSite.bind(this);
        this.removeAllSites = this.removeAllSites.bind(this);
        this.searchSiteName = this.searchSiteName.bind(this);

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
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchSite}
                            onChange={this.onChangeSearchSiteName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchSiteName}
                            >
                                Search
                            </button>

                            <Link to={"/add"} className="btn btn-outline-secondary">
                                Add Site
                            </Link>
                            {currentSite && <Link to={"/update/" + currentSite.siteId} className="btn btn-outline-secondary">
                                Update Site
                            </Link>}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>All Site List</h4>

                    <ul className="list-group">
                        {sites &&
                            sites.map((site, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveSite(site, index)}
                                    key={index}
                                >
                                    {site.siteName}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllSites}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
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
                </div>
            </div>
    
    );
}
}