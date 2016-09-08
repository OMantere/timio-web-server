import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "components/App";
import UsageStatsView from "containers/UsageStatsView";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={UsageStatsView}/>
    </Route>
);