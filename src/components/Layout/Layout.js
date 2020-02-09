import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Tokens from "../../pages/tokens";
import ProjectParams from "../../pages/project_params";
import Campaigns from "../../pages/campaigns";
import AdGroups from "../../pages/adgroups";
import Ads from "../../pages/ads";
// import Typography from "../../pages/typography";
// import Notifications from "../../pages/notifications";
// import Maps from "../../pages/maps";
// import Icons from "../../pages/icons";
// import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/tokens" component={Tokens} />
            <Route path="/app/project_params" component={ProjectParams} />
            <Route path="/app/campaigns" component={Campaigns} />
            <Route path="/app/adgroups" component={AdGroups} />
            <Route path="/app/ads" component={Ads} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
