import { Component } from "react";
import { Link } from "react-router-dom";
import SiteService from "../services/SiteService";


class AddSite extends Component {

    constructor(props) {
        super(props);
        this.onChangeSiteName = this.onChangeSiteName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.saveSite = this.saveSite.bind(this);
        this.newSite = this.newSite.bind(this);

        this.state = {
            id: null,
            siteName: "",
            address: "",
            published: false,

            submitted: false
        };
    }
    onChangeSiteName(e) {
        this.setState({
            siteName: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }
    newSite() {
        this.setState({
            id: null,
            siteName: "",
            address: "",
            published: false,

            submitted: false
        });
    }
    saveSite() {
        var data = {
            siteName: this.state.siteName,
            address: this.state.address
        };
        SiteService.createSite(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.siteName,
                    description: response.data.address,
                   // published: response.data.published,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newSite}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Project / Site Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.siteName}
                                    onChange={this.onChangeSiteName}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Project/Site Address:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.address}
                                onChange={this.onChangeAddress}
                                name="description"
                            />
                        </div>
                        <br></br>
                            <button onClick={this.saveSite} className="btn btn-primary">
                            Submit
                            </button>

                           
                    </div>
                )}
            </div>
        );
    }
   
}
export default  AddSite;