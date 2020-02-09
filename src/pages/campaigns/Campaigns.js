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

import { connect } from "react-redux";
import { getAllAds, runRules } from "../../actions";

function Campaigns(props) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedAdIds, setSelectedAdIds] = useState([]);

  useEffect(() => {
    props.getAllAds();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      label: "Ad ID",
      name: "ad_id",
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
      label: "Headline Part 1",
      name: "headlinePart1",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Headline Part 2",
      name: "headlinePart2",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Description",
      name: "description",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Final Url",
      name: "finalUrl",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Client",
      name: "client",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Campaign",
      name: "campaign",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "AdGroup",
      name: "adGroup",
      options: {
        filter: true,
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
      const rowsSelected = props.adsDataTable.filter((value, index, array) =>
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

  const runRules = () => props.runRules(selectedAdIds);

  return (
    <>
      <PageTitle title="Campaigns" />
      <Grid container spacing={4}>
        <Grid container justify="center">
          {props.adsDataTableLoading ? <CircularProgress /> : null}
          <Typography>{props.adsDataTableError}</Typography>
        </Grid>
        <Grid container justify="flex-end" style={{ marginRight: 20 }}>
          <Button
            disabled={selectedAdIds.length === 0}
            onClick={runRules}
            variant="contained"
            color="primary"
            size="large"
          >
            RUN RULES
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="Ad List"
            data={props.adsDataTable}
            columns={columns}
            options={options}
          />
        </Grid>
        <Grid container justify="flex-end" style={{ marginRight: 20 }}>
          <Button
            disabled={selectedAdIds.length === 0}
            onClick={runRules}
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

const mapStateToProps = state => {
  const { adsDataTable, adsDataTableLoading, adsDataTableError } = state.ad;
  return { adsDataTable, adsDataTableLoading, adsDataTableError };
};

export default connect(mapStateToProps, { getAllAds, runRules })(Campaigns);
