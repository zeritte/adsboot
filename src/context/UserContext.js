import React from "react";
import axios from 'axios'

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch,username, login, userpassword, history, setIsLoading, setError) {
  console.log(dispatch)
  console.log(username)
  console.log(login)
  console.log(userpassword)

  const data2 = {
    name: username,
    email: login,
    password: userpassword
  }
  console.log(data2)
  const data = new FormData();
  data.append('name', username);
  data.append('email', login);
  data.append('password', userpassword);
  console.log(data2)
  console.log(data)
  axios.post('https://adsbot-api.herokuapp.com/dashboard/createUser',data)
      .then((response) => {
        console.log(response)
        setTimeout(() => {
          localStorage.setItem("id_token", "1");
          dispatch({ type: "LOGIN_SUCCESS" });
          setError(null);
          setIsLoading(false);
    
          history.push("/app/dashboard");
        }, 2000);
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
      })
  /*setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    setTimeout(() => {
      localStorage.setItem("id_token", "1");
      dispatch({ type: "LOGIN_SUCCESS" });
      setError(null);
      setIsLoading(false);

      history.push("/app/dashboard");
    }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }*/
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
