import { Component } from 'react';

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = { 

        }
    }  
    componentDidMount() {

       
    }
    render() {
        return (
            <>

                <div class="container">
                    <div class="text">
                        <h1 class="main-heading">Your Problem, Our Solutions</h1>
                        <p class="sub-heading">Welcome to our website! We are here to help you find the best solutions to your problems.</p>
                    </div>
                </div>
                <marquee width="60%" direction="down" height="100px">
                    Contact Here To Software 8617819569
                </marquee>
            </>
        );
    }
}
export default Landing;