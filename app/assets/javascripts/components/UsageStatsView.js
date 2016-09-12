import React from "react";
import { XYPlot, RadicalChart, HorizontalGridLines, LineSeries, XAxis, YAxis } from 'react-vis';

const UsageStatsView = props => {
    return (
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
    );
};

export default UsageStatsView;