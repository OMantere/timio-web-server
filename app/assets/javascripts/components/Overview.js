import React, { PropTypes } from 'react'

const Overview = props => {
    return (
        <div className="overview">
        </div>
    )
};

Overview.propTypes = {
    user: PropTypes.object.isRequired,
    usages: PropTypes.object.isRequired,
    stats: PropTypes.array.isRequired
};

export default Overview;