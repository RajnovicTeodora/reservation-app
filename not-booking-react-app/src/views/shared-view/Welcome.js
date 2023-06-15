import React from "react";

import { Typography, Grid, CardHeader } from "@mui/material";

const headerSX = {
  "& .MuiCardHeader-action": { mr: 0 },
};

const Welcome = () => {
  return (
    <>
      <Grid item>
        <CardHeader
          sx={{ headerSX, textAlign: "center" }}
          title={<Typography variant="largeHeader">Welcome</Typography>}
        />
      </Grid>
    </>
  );
};

export default Welcome;
