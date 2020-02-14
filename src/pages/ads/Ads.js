import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Link } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "../../helpers/datatable";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { useSelector, useDispatch } from "react-redux";
import { getAllAds, runRules } from "../../actions";

export default function Table(props) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const selectedProjectId = useSelector(state => state.ad.selectedProjectId);
  const allAds = useSelector(state => state.ad.allAds);
  const allAdsLoading = useSelector(state => state.ad.allAdsLoading);
  const allAdsError = useSelector(state => state.ad.allAdsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAds());
    setSelectedRows([]);
    setSelectedItems([]);
    // eslint-disable-next-line
  }, [selectedProjectId]);

  const columns = [
    {
      label: "Ad ID",
      name: "id",
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
      name: "url",
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
      label: "Campaign",
      name: "campaignName",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Ad Group",
      name: "adGroupName",
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
      const dataIndex = [];
      allRowsSelected.forEach(element => dataIndex.push(element.dataIndex));
      const rowsSelected = allAds.filter((value, index, array) =>
        dataIndex.includes(index),
      );
      setSelectedItems(rowsSelected.map(obj => obj.id));
    },
    onRowsDelete: () => {
      setSelectedRows([]);
      return false;
    },
    // TODO FILTER NOT WORKS RELATED TO PACKAGE https://github.com/gregnb/mui-datatables/pull/1086
  };

  const _runRules = () => dispatch(runRules(selectedItems));

  const _isRunRulesDisabled = selectedItems.length === 0;

  return (
    <>
      <PageTitle title="Ads" />
      <Grid container spacing={4}>
        <Grid container justify="center">
          {allAdsLoading && <CircularProgress />}
          <Typography color="secondary">{allAdsError}</Typography>
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
            title="Ads"
            data={allAds}
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
      </Grid>
    </>
  );
}
