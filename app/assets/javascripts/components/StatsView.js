import React, { PropTypes, Component } from 'react'
import DataContainer from 'containers/DataContainer'
import { timeScope } from 'lib/const'
import _ from 'lodash'
import classnames from 'classnames'
import { RadialChart } from 'react-vis';

class StatsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scope: timeScope.DAY
        }
    }

    selectScope(scope) {
        this.setState({scope});
    }

    getScopeTabs() {
        return (
            <div className="stats-view-tabs">
                {
                    _.map(timeScope, tab => {
                        return (
                            <div key={tab}
                                 className={classnames({'active': this.state.scope === tab})}
                                 onClick={() => this.selectScope(tab)}>
                                {tab}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    getDonutChart() {
        return (
            <RadialChart
                innerRadius={100}
                radius={140}
                data={[
                    {angle: 2},
                    {angle: 6},
                    {angle: 2},
                    {angle: 3},
                    {angle: 1}
                ]}
                width={300}
                height={300}/>
        );
    }

    get

    getData() {
        switch(this.state.scope) {
            case timeScope.DAY:
                return this.props.usages
        }

    }

    render() {
        return (
            <div className="stats-view">
                {this.getScopeTabs()}
            </div>
        )
    }

}

export default DataContainer(StatsView);
