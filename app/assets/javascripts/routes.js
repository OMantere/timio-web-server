import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "containers/App";
import AppDataView from "components/AppDataView";
import StatsView from "components/StatsView"
import HomeView from "components/HomeView"

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="/usages" component={AppDataView}/>
        <Route path="/stats" component={StatsView}/>
    </Route>
);