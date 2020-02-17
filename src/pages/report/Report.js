import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Link,
} from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import ReportGroup from "../dashboard/components/Report/ReportGroup";
import ReportDetail from "../../helpers/datatable";

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

  const columns = [
    {
      label: "Report ID",
      name: "reportId",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Ad ID",
      name: "adId",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Ad Url",
      name: "adUrl",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Link target="_blank" rel="noopener" href={value}>
              {value}
            </Link>
          );
        },
      },
    },
    {
      label: "Page200",
      name: "page200",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Typography>{value ? "YES" : "NO"}</Typography>;
        },
      },
    },
    {
      label: "Instock",
      name: "inStock",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Typography>{value ? "YES" : "NO"}</Typography>;
        },
      },
    },
  ];

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
            <Grid container justify="center">
              <Typography color="primary">
                There is no report group to show.
              </Typography>
            </Grid>
          )
        )}

        <Grid container justify="center">
          {particularReportLoading && <CircularProgress />}
          <Typography color="secondary">{particularReportError}</Typography>
        </Grid>
        {particularReport.length > 0 && (
          <Grid item xs={12}>
            <ReportDetail
              title="Report Details"
              data={particularReport}
              columns={columns}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}
