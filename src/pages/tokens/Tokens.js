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
import {
  setShouldVisitTokenScreen,
  updateTokens,
  getTokens,
} from "../../actions";

export default function TokensPage() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [developerToken, setDeveloperToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const clientTokens = useSelector(state => state.auth.clientTokens);
  const clientTokensLoading = useSelector(
    state => state.auth.clientTokensLoading,
  );
  const clientTokensError = useSelector(state => state.auth.clientTokensError);
  const clientTokensMessage = useSelector(
    state => state.auth.clientTokensMessage,
  );

  var classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokens());
    dispatch(setShouldVisitTokenScreen(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (clientTokens && clientTokens.clientId) {
      setClientId(clientTokens.clientId);
      setClientSecret(clientTokens.clientSecret);
      setDeveloperToken(clientTokens.developerToken);
      setRefreshToken(clientTokens.refreshToken);
    }
  }, [clientTokens]);

  return (
    <>
      <PageTitle title="Tokens" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="Enter your credentials" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              <center>
                {clientTokensLoading ? (
                  <CircularProgress size={26} />
                ) : clientTokensError ? (
                  <Typography color="secondary">{clientTokensError}</Typography>
                ) : (
                  <Typography color="primary">{clientTokensMessage}</Typography>
                )}
              </center>
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
