import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import Report from "../dashboard/components/Report/Report";

// data
import mock from "../dashboard/mock";

const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY","Joe James", "Example Inc.", "Yonkers", "NY", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT","John Walsh", "Example Inc.", "Hartford", "CT", "NY"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL","Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX","James Houston", "Example Inc.", "Dallas", "TX", "NY"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT", "NY"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL", "CT"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY", "CT"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY", "TX"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY", "TX"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT","FL"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL","FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL","FL"],
];

export default function Tables() {
  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={datatableData}
            columns={["Ad ID",	"Status",	"Headline Part 1",	"Headline Part 2",	"Description",	"Final Url",	"AdGroup", "Campaign",	"Client"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Widget title="Report Table" upperTitle noBodyPadding>
            <Report data={mock.report} />
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding>
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
