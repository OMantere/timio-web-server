import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const TopBar = props => {
    return (
        <div class="top-bar">
            <div class="timio-logo"><img src="/banner.png"/></div>
            <div class="logout">
                <button class="btn btn-default"><Link to="/users/sign_out">Log out</Link></button>
            </div>
        </div>
    )
};

TopBar.propTypes = {
        user: PropTypes.object.isRequired,
};

export default TopBar;