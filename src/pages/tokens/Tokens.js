import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";

import { useDispatch } from "react-redux";
import { setShouldVisitTokenScreen, updateTokens } from "../../actions";

export default function TokensPage() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [developerToken, setDeveloperToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  var classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShouldVisitTokenScreen(false));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PageTitle title="Tokens" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="Enter your credentials" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              <TextField
                id="clientId"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={clientId}
                onChange={e => setClientId(e.target.value)}
                margin="normal"
                placeholder="Client Id"
                fullWidth
              />
              <TextField
                id="clientSecret"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={clientSecret}
                onChange={e => setClientSecret(e.target.value)}
                margin="normal"
                placeholder="Client Secret"
                fullWidth
              />
              <TextField
                id="refreshToken"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={refreshToken}
                onChange={e => setRefreshToken(e.target.value)}
                margin="normal"
                placeholder="Refresh Token"
                fullWidth
              />
              <TextField
                id="developerToken"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={developerToken}
                onChange={e => setDeveloperToken(e.target.value)}
                margin="normal"
                placeholder="Developer Token"
                fullWidth
              />
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() =>
                    dispatch(
                      updateTokens(
                        clientId,
                        clientSecret,
                        refreshToken,
                        developerToken,
                      ),
                    )
                  }
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  UPDATE
                </Button>
              </div>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
