import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Report from "../dashboard/components/Report/Report";

// data
import mock from "../dashboard/mock";

import { useSelector, useDispatch } from "react-redux";
import { getAdgroups, runRules } from "../../actions";

export default function Table(props) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedAdIds, setSelectedAdIds] = useState([]);
  const selectedProjectId = useSelector(state => state.ad.selectedProjectId);
  const adgroups = useSelector(state => state.ad.adgroups);
  const adgroupsLoading = useSelector(state => state.ad.adgroupsLoading);
  const adgroupsError = useSelector(state => state.ad.adgroupsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdgroups());
    // eslint-disable-next-line
  }, [selectedProjectId]);

  const columns = [
    {
      label: "Adgroup ID",
      name: "id",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Campaign ID",
      name: "campaignId",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Status",
      name: "status",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Name",
      name: "name",
      options: {
        filter: false,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    rowsSelected: selectedRows,
    onRowsSelect: (currentRowsSelected, allRowsSelected) => {
      setSelectedRows(allRowsSelected.map(row => row.dataIndex));
      let dataIndex = [];
      allRowsSelected.forEach(element => dataIndex.push(element.dataIndex));
      const rowsSelected = adgroups.filter((value, index, array) =>
        dataIndex.includes(index),
      );
      setSelectedAdIds(rowsSelected.map(obj => obj.ad_id));
    },
    onRowsDelete: () => {
      setSelectedRows([]);
      return false;
    },
    // TODO FILTER NOT WORKS RELATED TO PACKAGE https://github.com/gregnb/mui-datatables/pull/1058
  };

  const _runRules = () => dispatch(runRules(selectedAdIds));

  const _isRunRulesDisabled = true || selectedAdIds.length === 0;

  return (
    <>
      <PageTitle title="Ad Groups" />
      <Grid container spacing={4}>
        <Grid container justify="center">
          {adgroupsLoading && <CircularProgress />}
          <Typography color="secondary">{adgroupsError}</Typography>
        </Grid>
        <Grid container justify="flex-end" style={{ marginRight: 20 }}>
          <Button
            disabled={_isRunRulesDisabled}
            onClick={_runRules}
            variant="contained"
            color="primary"
            size="large"
          >
            RUN RULES
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="Ad Groups"
            data={adgroups}
            columns={columns}
            options={options}
          />
        </Grid>
        <Grid container justify="flex-end" style={{ marginRight: 20 }}>
          <Button
            disabled={_isRunRulesDisabled}
            onClick={_runRules}
            variant="contained"
            color="primary"
            size="large"
          >
            RUN RULES
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Widget title="Report Table" upperTitle noBodyPadding>
            <Report data={mock.report} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
