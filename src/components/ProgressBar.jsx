import React from "react";
import { connect } from "react-redux";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barThickness: 5,
  barColors: {
    "0": "#b4a7d6e2",
    "0.5":"#7a1ea1ff",
    "1.0": "#682979"
  },
  shadowBlur: 20
});

const ProgressBarPure = props => {
  return (
  props.auth.isLogging  || 
  props.kits.isSubmitting ||
  props.auth.isRegistering ||
  props.auth.isUpdating) ? (
    <TopBarProgress />
  ) : (
    ""
  );
};

export const ProgressBar = connect(
  state => state,
  undefined
)(ProgressBarPure);
