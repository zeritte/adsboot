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
  ["386047344928","ENABLED" ,"The new Solaris onlineshop", "25 years of style",	"More than 50 exclusive, popular and luxury sunglasses brands.","https://www.solarisco.com/TR_EN/", "Generic","Brand_Solaris_TR_EN",  "Solaris1"],
["386047344931","ENABLED" ,"Solaris sunglasses", "The new onlineshop","More than 50 exclusive sunglasses brands for him & her.", "https://www.solarisco.com/TR_EN/	82524424681","Generic","Brand_Solaris&Other Brands_TR_TR" , "Solaris2"],
["386047344934","ENABLED" ,"Solaris sunglasses",	"10% off your first order",	"Exclusive sunglass brands & models. Market’s most diverse assortment." ,"https://www.solarisco.com/TR_EN/"	,"Woman","Brands_Burberry_TR_EN	1", "Solaris3"],
["386047404469","ENABLED" ,"Boss Orange Güne? Gözlü?ü","?lk Al??veri?te %10 ?ndirim",	"Boss Orange güne? gözlüklerinde Solaris avantajlar?n? kaç?rmay?n.","https://www.solarisco.com/TR_TR/boss-orange","Woman","Brands_Emporio Armani_TR_EN", "Solaris3"],
["386047344928","ENABLED" ,"The new Solaris onlineshop", "25 years of style",	"More than 50 exclusive, popular and luxury sunglasses brands.","https://www.solarisco.com/TR_EN/", "Generic","Brand_Solaris_TR_EN",  "Solaris1"],
["386047344931","ENABLED" ,"Solaris sunglasses", "The new onlineshop","More than 50 exclusive sunglasses brands for him & her.", "https://www.solarisco.com/TR_EN/	82524424681","Generic","Brand_Solaris&Other Brands_TR_TR" , "Solaris2"],
["386047344934","ENABLED" ,"Solaris sunglasses",	"10% off your first order",	"Exclusive sunglass brands & models. Market’s most diverse assortment." ,"https://www.solarisco.com/TR_EN/"	,"Woman","Brands_Burberry_TR_EN	1", "Solaris3"],
["386047404469","ENABLED" ,"Boss Orange Güne? Gözlü?ü","?lk Al??veri?te %10 ?ndirim",	"Boss Orange güne? gözlüklerinde Solaris avantajlar?n? kaç?rmay?n.","https://www.solarisco.com/TR_TR/boss-orange","Woman","Brands_Emporio Armani_TR_EN", "Solaris3"],
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
