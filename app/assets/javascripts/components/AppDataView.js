import React, { PropTypes }  from "react";
import UsageView from 'components/UsageView'
import _ from 'lodash'

const AppDataView = props => {
    console.log(props)
    if(_.isEmpty(props.usages) && _.isEmpty(props.stats))
        props.fetchUserData();

    return (
        <div className="usage-stats-view">
            <UsageView usages={props.usages}/>
        </div>

    );
};

AppDataView.propTypes = {
        usages: PropTypes.object.isRequired,
        stats: PropTypes.array.isRequired
};

export default AppDataView;
