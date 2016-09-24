import React, { PropTypes, Component } from 'react'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import _ from 'lodash'

export default class UsageView extends Component {
   static propTypes = {
       usages: PropTypes.object.isRequired
   };

   constructor(props) {
       super(props);
       this.state = {
           usageDetails: {}
       }
   };
   
   showUsageData(usage) {
       const usageDetails = {
           name: usage.name,
           timespan: moment(usage.start).format('MMMM Do YYYY, hh:mm:ss') + ' - ' + moment(usage.end).format('MMMM Do YYYY, hh:mm:ss'),
           total: moment.duration(usage.end_time - usage.start_time).humanize()
       };
       this.setState({usageDetails});
   }

   onItemSelect(itemId, e) {
        this.showUsageData(this.props.usages.items.find(usage => usage.id == itemId));
   }

   getUsageDetails() {
       if(_.isEmpty(this.state.usageDetails))
           return null;
       else
           return (
               <div className="usage-details">
                   <h5>Details</h5>
                   <div className="details-data">
                       {
                           _.map(this.state.usageDetails, field => {
                               return (
                                   <div key={field}>{field}</div>
                               )
                           })
                       }
                   </div>
               </div>
           );
   }

   onCanvasClick() {
       this.setState({usageDetails: {}});
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
                            stackItems={true}
                            onItemSelect={this.onItemSelect.bind(this)}
                            onCanvasClick={this.onCanvasClick.bind(this)}
                   />
               </div>
               {this.getUsageDetails()}
           </div>
       )
   }
}
