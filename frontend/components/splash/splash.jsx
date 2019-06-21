import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavbarContainer from '../nav/navbar_container';

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }


    render() {
            return (
                <div className="content-container">
                    <header>
                        <Link to="/" className="header-link">
                            <div className="icon-white"></div>
                        </Link>
                        < NavbarContainer />
                    </header>
                    <div className="splash-page">
                        <h1>Hi from splash page!</h1>
                    </div>
                </div>
            );
        
    }
}

export default Splash;


