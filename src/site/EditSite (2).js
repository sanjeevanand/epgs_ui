import React, { Component } from "react";

import { withRouter } from '../common/with-router';
import SiteService from "../services/SiteService";

class EditSite extends Component {
    constructor(props) {
        super(props);
        this.onChangeSiteName = this.onChangeSiteName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.getSite = this.getSite.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateSite = this.updateSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);

        this.state = {
            currentSite: {
                id: null,
                siteId: "",
                address: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getSite(this.props.router.params.id);
    }

    onChangeSiteName(e) {
        const siteName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentSite: {
                    ...prevState.currentSite,
                    siteName: siteName
                }
            };
        });
    }

    onChangeAddress(e) {
        const address = e.target.value;

        this.setState(prevState => ({
            currentSite: {
                ...prevState.currentSite,
                address: address
            }
        }));
    }

    getSite(id) {
        SiteService.getSiteById(id)
            .then(response => {
                this.setState({
                    currentSite: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
       /* var data = {
            id: this.state.currentTutorial.id,
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
            published: status
        };

        TutorialDataService.update(this.state.currentTutorial.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentTutorial: {
                        ...prevState.currentTutorial,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });*/
    }

    updateSite() {
        console.log(this.state);
        SiteService.updateSite(
            this.state.currentSite,
            this.state.currentSite.siteId
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The tutorial was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteSite() {
        SiteService.deleteSite(this.state.currentSite.siteId)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/sites');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentSite } = this.state;

        return (
            <div>
                {currentSite ? (
                    <div className="edit-form">
                        <h4>Site</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Site ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentSite.siteName}
                                    onChange={this.onChangeSiteName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentSite.address}
                                    onChange={this.onChangeSiteAddress}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentSite.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentSite.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                    className="btn btn-success"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="btn btn-success"
                            onClick={this.deleteSite}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.updateSite}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Site...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(EditSite);