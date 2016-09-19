import React, { PropTypes }  from "react";
import UsageView from 'components/UsageView'
import _ from 'lodash'

const AppDataView = props => {
    console.log(props)
    if(_.isEmpty(props.usages) && _.isEmpty(props.stats))
        props.fetchUserData();

    const showUsageViews = () => {
        return _.map(props.usages, (array, key) => {
            return <UsageView key={key} usages={array} />
        })
    };

    return (
        <div className="usage-stats-view">
            {showUsageViews()}
        </div>

    );
};

AppDataView.propTypes = {
        usages: PropTypes.object.isRequired,
        stats: PropTypes.array.isRequired
};

export default AppDataView;
