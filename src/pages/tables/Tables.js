import React, {useEffect,useState} from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Report from "../dashboard/components/Report/Report";


import axios from 'axios'
// data
import mock from "../dashboard/mock";

export default function Tables() {

  const [adsDataTable,setAdsDataTable] = useState([])

    useEffect(() => {
    
      axios.get('https://adsbot-api.herokuapp.com/dashboard/getAds')
      .then((response) => {
          
          console.log(response.data)
          console.log(response)

          const arr = response.data.map((item)=>{
              return Object.keys(item).map(i => item[i])
          })
          setAdsDataTable(arr)
      })
      .catch((err) => {
        console.log(err)
      })
    },[])

    useEffect(() => {
      console.log('state güncellendi',adsDataTable)
  },[adsDataTable])

  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={adsDataTable || [] }
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
      </Grid>
    </>
  );
}
