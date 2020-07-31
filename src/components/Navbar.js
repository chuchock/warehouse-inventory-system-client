import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <div className="Navbar">
                <div className="container-fluid">
                    <Link className="Navbar__brand" to="/">
                        <span className="font-weight-light">link 1</span>
                        <span className="font-weight-bold">link 2</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Navbar;