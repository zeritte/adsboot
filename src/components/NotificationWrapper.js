import React, { useEffect } from "react";
import { Close as CloseIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { ToastContainer, toast } from "react-toastify";
// styles
import "react-toastify/dist/ReactToastify.css";
// components
import Notification from "./Notification/Notification";

import { useSelector } from "react-redux";

export default function() {
  var classes = useStyles();
  const { type, message, id } = useSelector(state => ({
    type: state.ad.notificationType,
    message: state.ad.notificationMessage,
    id: state.ad.notificationId,
  }));

  useEffect(() => {
    type && message && handleNotificationCall(type, message);
  }, [id]);

  function handleNotificationCall(notificationType, message) {
    var componentProps;

    switch (notificationType) {
      case "info":
        componentProps = {
          type: "feedback",
          message: message,
          variant: "contained",
          color: "primary",
        };
        break;
      case "error":
        componentProps = {
          type: "message",
          message: message,
          variant: "contained",
          color: "secondary",
        };
        break;
      case "success":
        componentProps = {
          type: "shipped",
          message: message,
          variant: "contained",
          color: "success",
        };
        break;
      default:
        componentProps = {
          type: "feedback",
          message: message,
          variant: "contained",
          color: "primary",
        };
        break;
    }

    sendNotification(componentProps, {
      type: notificationType,
      position: toast.POSITION.TOP_RIGHT,
      progressClassName: classes.progress,
      className: classes.notification,
    });
  }

  function sendNotification(componentProps, options) {
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options,
    );
  }

  function CloseButton({ closeToast, className }) {
    return <CloseIcon className={className} onClick={closeToast} />;
  }

  return (
    <ToastContainer
      className={classes.toastsContainer}
      closeButton={<CloseButton className={classes.notificationCloseButton} />}
      closeOnClick={false}
      progressClassName={classes.notificationProgress}
    />
  );
}

const useStyles = makeStyles(theme => ({
  notificationItem: {
    marginTop: theme.spacing(2),
  },
  notificationCloseButton: {
    position: "absolute",
    right: theme.spacing(2),
  },
  toastsContainer: {
    width: 400,
    marginTop: theme.spacing(6),
    right: 0,
  },
  progress: {
    visibility: "hidden",
  },
  notification: {
    display: "flex",
    alignItems: "center",
    background: "transparent",
    boxShadow: "none",
    overflow: "visible",
  },
  notificationComponent: {
    paddingRight: theme.spacing(4),
  },
}));
