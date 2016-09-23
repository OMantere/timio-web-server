import React, { PropTypes } from 'react'
import DataContainer from 'containers/DataContainer'
import ClientsCTA from 'components/ClientsCTA'
import Overview from 'components/Overview'
import Welcome from 'components/Welcome'

const HomeView = props => {
    return (
        <div className="home-view">
            <Welcome {...props}/>
            <div className="panels">
                <Overview {...props}/>
                <ClientsCTA {...props}/>
            </div>

        </div>
    )
};

export default DataContainer(HomeView);