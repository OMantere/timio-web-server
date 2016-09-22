import React, { PropTypes } from "react";
import TopBar from 'components/TopBar'
import _ from 'lodash'

const App = props => {
    const getTopBar = () => {
        if(_.isEmpty(props.user)) {
            props.fetchUserData();
            return null;
        } else {
            return <TopBar {...props}/>
        }
    };
    return (
        <div>
            {getTopBar()}
            <div className="app">{props.children}</div>
        </div>
    )
};

export default App;

