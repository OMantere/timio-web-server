import React, { PropTypes }  from "react";
import UsageView from 'components/UsageView'
import DataContainer from 'containers/DataContainer'

const AppDataView = props => {
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

export default DataContainer(AppDataView);
