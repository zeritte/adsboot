import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import ReportGroup from "../dashboard/components/Report/ReportGroup";
import ReportDetail from "../dashboard/components/Report/ReportDetail";

import { useDispatch, useSelector } from "react-redux";
import { getReportGroups, getParticularReport } from "../../actions";
import { getPageValue } from "../../helpers/datatable/utils";

export default function TokensPage() {
  const selectedProjectId = useSelector(state => state.ad.selectedProjectId);
  const particularReport = useSelector(state => state.ad.particularReport);
  const particularReportLoading = useSelector(
    state => state.ad.particularReportLoading,
  );
  const particularReportError = useSelector(
    state => state.ad.particularReportError,
  );
  const reportGroups = useSelector(state => state.ad.reportGroups);
  const reportGroupsLoading = useSelector(
    state => state.ad.reportGroupsLoading,
  );
  const reportGroupsError = useSelector(state => state.ad.reportGroupsError);

  var classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReportGroups());
  }, [selectedProjectId]);

  return (
    <>
      <PageTitle title="Report" />
      <Grid container spacing={4}>
        <Grid container justify="center">
          {reportGroupsLoading && <CircularProgress />}
          <Typography color="secondary">{reportGroupsError}</Typography>
        </Grid>
        {reportGroups.length > 0 ? (
          <Grid item xs={12}>
            <Widget
              title="Report Groups"
              upperTitle
              disableWidgetMenu
              noBodyPadding
            >
              <ReportGroup
                onClick={e => dispatch(getParticularReport(e))}
                key="group"
                data={reportGroups}
              />
            </Widget>
          </Grid>
        ) : (
          !reportGroupsLoading && (
            <Typography color="primary">
              There is no report group to show.
            </Typography>
          )
        )}

        <Grid container justify="center">
          {particularReportLoading && <CircularProgress />}
          <Typography color="secondary">{particularReportError}</Typography>
        </Grid>
        {particularReport.length > 0 && (
          <Grid item xs={12}>
            <Widget
              title="Report Details"
              upperTitle
              disableWidgetMenu
              noBodyPadding
            >
              <ReportDetail key="particular" data={particularReport} />
            </Widget>
          </Grid>
        )}
      </Grid>
    </>
  );
}
