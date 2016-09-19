import React, { PropTypes }  from "react";
import { XYPlot, RadialChart, HorizontalGridLines, LineSeries, XAxis, YAxis } from 'react-vis';
import _ from 'lodash'

const UsageStatsView = props => {
    console.log(props)
    if(_.isEmpty(props.usages) && _.isEmpty(props.stats))
        props.fetchUserData();

    return (
        <div>
            <RadialChart
                data={[
                    {angle: 6},
                    {angle: 3},
                    {angle: 5}
                ]}
                width={300}
                height={300} />
            <XYPlot
                 width={300}
                 height={300}>
                 <HorizontalGridLines />
                 <LineSeries
                   data={[
                     {x: 1, y: 10},
                     {x: 2, y: 5},
                     {x: 3, y: 15}
                   ]}/>
                 <XAxis />
                 <YAxis />
               </XYPlot>
        </div>

    );
};

UsageStatsView.propTypes = {
        usages: PropTypes.object.isRequired,
        stats: PropTypes.object.isRequired
};

export default UsageStatsView;
