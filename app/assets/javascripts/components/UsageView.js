import React, { PropTypes, Component } from 'react'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'

export default class UsageView extends Component {
   static propTypes = {
       usages: PropTypes.object.isRequired
   };

   constructor(props) {
       super(props);
   }

   render() {
       if(!this.props.usages.groups)
           return <h3>Loading...</h3>;
       return (
           <div className="usage-view">
               <div className="usage-view-data">
                  <Timeline groups={this.props.usages.groups}
                            items={this.props.usages.items}
                            defaultTimeStart={moment().add(-12, 'hour')}
                            defaultTimeEnd={moment().add(12, 'hour')}
                            dragSnap={60*1000}
                            lineHeight={100}
                   />
               </div>
           </div>

       )
   }
}
