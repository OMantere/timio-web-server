import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "components/App";
import AppDataView from "containers/AppDataView";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={AppDataView}/>
    </Route>
);