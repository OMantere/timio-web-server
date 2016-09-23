import React, { PropTypes } from "react";
import TopBar from 'components/TopBar'
import _ from 'lodash'
import Loader from 'components/Loader'

const App = props => {
    if(_.isEmpty(props.user)) {
        props.fetchUserData();
        return <Loader/>;
    }

    return (
        <div>
            <TopBar {...props}/>
            <div className="top-bar-spacer"></div>
            <div className="app">{props.children}</div>
        </div>
    )
};

App.propTypes = {
    user: PropTypes.object.isRequired
}

export default App;

