import React, { PropTypes } from 'react'

const Welcome = props => {
    return (
        <div className="welcome">
            <div className="welcome-header">
                <h3>Welcome to Timio!</h3>
            </div>
        </div>
    )
};

Welcome.propTypes = {
    user: PropTypes.object.isRequired
};

export default Welcome;

