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
import Report from "../dashboard/components/Report/Report";
import mock from "../dashboard/mock";

import { useDispatch, useSelector } from "react-redux";
// import {} from "../../actions";

export default function TokensPage() {
  //   const clientTokens = useSelector(state => state.auth.clientTokens);

  var classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <PageTitle title="Report" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Report Table" upperTitle noBodyPadding>
            <Report data={mock.report} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
