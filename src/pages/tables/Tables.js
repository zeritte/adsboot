import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Report from "../dashboard/components/Report/Report";

// data
import mock from "../dashboard/mock";

import { connect } from "react-redux";
import { getAllAds } from "../../actions";

function Tables(props) {
  useEffect(() => {
    props.getAllAds();
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
    {
      label: "Campaign",
      name: "campaign",
      options: {
        filter: true,
        sort: true,
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
  ];

  const options = {
    filterType: "checkbox",
  };

  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Ad List"
            data={props.adsDataTable}
            columns={columns}
            options={options}
          />
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
  const { adsDataTable } = state.ad;
  return { adsDataTable };
};

export default connect(mapStateToProps, { getAllAds })(Tables);
