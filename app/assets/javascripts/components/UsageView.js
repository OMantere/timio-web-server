import React, { PropTypes, Component } from 'react'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'

export default class UsageView extends Component {
   static propTypes = {
       usages: PropTypes.array.isRequired
   };

   constructor(props) {
       super(props);
   }

   render() {
       return (
           <div className="usage-view">
               <Timeline groups={this.props.usages.items}
                         items={this.props.usages.groups}
                         defaultTimeStart={moment().add(-12, 'hour')}
                         defaultTimeEnd={moment().add(12, 'hour')}
               />
           </div>
       )
   }
}
