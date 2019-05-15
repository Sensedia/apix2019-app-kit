import React from "react";
import { connect } from "react-redux";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barThickness: 5,
  barColors: {
    "0": "#9400D3",
    "0.1667":"#4B0082",
    "0.3333":"#0000FF",
    "0.5":"#00FF00",
    "0.6667":"#FFFF00",
    "0.8333":"#FF7F00",
    "1.0": "#FF0000"
  },
  shadowBlur: 20
});

const ProgressBarPure = props => {
  return props.auth.isLogging /** || props.table.isFetchingTable */ ? (
    <TopBarProgress />
  ) : (
    ""
  );
};

export const ProgressBar = connect(
  state => state,
  undefined
)(ProgressBarPure);
