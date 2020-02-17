import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "../../helpers/datatable";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { useSelector, useDispatch } from "react-redux";
import { getAdgroups, runRules } from "../../actions";

export default function Table(props) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const selectedProjectId = useSelector(state => state.ad.selectedProjectId);
  const adgroups = useSelector(state => state.ad.adgroups);
  const adgroupsLoading = useSelector(state => state.ad.adgroupsLoading);
  const adgroupsError = useSelector(state => state.ad.adgroupsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdgroups());
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
      const rowsSelected = adgroups.filter((value, index, array) =>
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
      </Grid>
    </>
  );
}

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