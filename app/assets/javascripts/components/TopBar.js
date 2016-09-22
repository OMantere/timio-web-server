import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const TopBar = props => {
    return (
        <div className="top-bar">
            <div className="timio-logo"><Link to="/"><img src="/banner.png"/></Link></div>
            <div className="logout">
                <Link to="/users/sign_out">Log out</Link>
            </div>
        </div>
    )
};

TopBar.propTypes = {
        user: PropTypes.object.isRequired,
};

export default TopBar;