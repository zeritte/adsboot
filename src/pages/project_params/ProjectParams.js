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

import { useDispatch, useSelector } from "react-redux";
import { updateProjectParams, getProjectParams } from "../../actions";

export default function ProjectParamsPage() {
  const [message, setMessage] = useState("");
  const [xpath, setXpath] = useState("");
  const projectParams = useSelector(state => state.ad.projectParams);
  const projectParamsLoading = useSelector(
    state => state.ad.projectParamsLoading,
  );
  const projectParamsError = useSelector(state => state.ad.projectParamsError);
  const projectParamsMessage = useSelector(
    state => state.ad.projectParamsMessage,
  );

  var classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectParams());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!!projectParams) {
      setMessage(projectParams.message);
      setXpath(projectParams.xpath);
    } else {
      setMessage("");
      setXpath("");
    }
  }, [projectParams]);

  return (
    <>
      <PageTitle title="Project Params" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="Enter details" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              <center>
                {projectParamsLoading ? (
                  <CircularProgress size={26} />
                ) : projectParamsError ? (
                  <Typography color="secondary">
                    {projectParamsError}
                  </Typography>
                ) : (
                  <Typography color="primary">
                    {projectParamsMessage}
                  </Typography>
                )}
              </center>
              <TextField
                id="message"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={message}
                onChange={e => setMessage(e.target.value)}
                margin="normal"
                placeholder="Stock Out Message"
                fullWidth
              />
              <TextField
                id="xpath"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={xpath}
                onChange={e => setXpath(e.target.value)}
                margin="normal"
                placeholder="Xpath for Stock Out Message"
                fullWidth
              />
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => dispatch(updateProjectParams(message, xpath))}
                  disabled={projectParamsLoading}
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  SAVE
                </Button>
              </div>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
