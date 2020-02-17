import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "../../helpers/datatable";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { useSelector, useDispatch } from "react-redux";
import { getCampaigns, runRules } from "../../actions";

export default function Table(props) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const selectedProjectId = useSelector(state => state.ad.selectedProjectId);
  const campaigns = useSelector(state => state.ad.campaigns);
  const campaignsLoading = useSelector(state => state.ad.campaignsLoading);
  const campaignsError = useSelector(state => state.ad.campaignsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaigns());
    setSelectedRows([]);
    setSelectedItems([]);
    // eslint-disable-next-line
  }, [selectedProjectId]);

  const options = {
    filterType: "checkbox",
    rowsSelected: selectedRows,
    onRowsSelect: (currentRowsSelected, allRowsSelected) => {
      setSelectedRows(allRowsSelected.map(row => row.dataIndex));
      const dataIndex = [];
      allRowsSelected.forEach(element => dataIndex.push(element.dataIndex));
      const rowsSelected = campaigns.filter((value, index, array) =>
        dataIndex.includes(index),
      );
      setSelectedItems(rowsSelected.map(obj => obj.id));
    },
    onRowsDelete: () => {
      setSelectedRows([]);
      return false;
    },
  };

  const _runRules = () => dispatch(runRules(selectedItems));

  const _isRunRulesDisabled = true || selectedItems.length === 0;

  return (
    <>
      <PageTitle title="Campaigns" />
      <Grid container spacing={4}>
        <Grid container justify="center">
          {campaignsLoading && <CircularProgress />}
          <Typography color="secondary">{campaignsError}</Typography>
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
            title="Campaigns"
            data={campaigns}
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

const columns = [
  {
    label: "Campaign ID",
    name: "id",
    options: {
      filter: false,
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
  {
    label: "Status",
    name: "status",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    label: "Start Date",
    name: "startDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    label: "End Date",
    name: "endDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    label: "Budget",
    name: "budget",
    options: {
      filter: false,
      sort: true,
    },
  },
];
