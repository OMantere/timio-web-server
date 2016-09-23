import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import NavBar from 'components/NavBar'

const TopBar = props => {
    return (
        <div className="top-bar">
            <div className="timio-logo"><Link to="/"><img src="/banner.png"/></Link></div>
            <div className="logout">
                <button onClick={props.signOut}>Log out</button>
            </div>
            <div className="nav-bar-container">
                <NavBar {...props}/>
            </div>
        </div>
    )
};

TopBar.propTypes = {
    user: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
};

export default TopBar;