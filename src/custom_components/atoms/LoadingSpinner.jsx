import React from "react";
import { Grid } from "./Grid";

export const LoadingSpinner = () => {
  return (
    <Grid display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <img
        src="/loading.gif"
        alt="Loading..."
        style={{ width: "150px", height: "150px" }}
      />
    </Grid>
  );
};
