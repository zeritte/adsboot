export const dataHandler = (dispatch, type, response) => {
  dispatch({
    type,
    payload: response.data,
  });
};

export const messageHandler = (dispatch, type, response) => {
  if (
    response &&
    response.data &&
    response.data.status &&
    response.data.status.message
  )
    dispatch({
      type,
      payload: response.data.status.message,
    });
  else if (typeof response === "string")
    dispatch({
      type,
      payload: response,
    });
  else
    dispatch({
      type,
      payload: "An unexpected error occured!",
    });
};
