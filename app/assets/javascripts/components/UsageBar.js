import React, { PropTypes, Component } from 'react'
import { Layer, Rect, Stage, Group } from 'react-konva'

export default class UsageBar extends Component {
   static propTypes = {
       usages: PropTypes.object.isRequired
   };

   constructor(props) {
       super(props);
       this.state = {};
   }

   render() {
       return (
           <div className="usage-bar">

           </div>
       )
   }
}
