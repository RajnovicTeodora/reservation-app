import React from "react";
import ParticlesBg from "particles-bg";

// project imports
import UHeader from "./UHeader";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Grid,
  CardHeader,
} from "@mui/material";

//import navigation from 'menu-items';
import { drawerWidth } from "../../store/constant";

// styles
// constant
const headerSX = {
  "& .MuiCardHeader-action": { mr: 0 },
};
const Main = styled("main")(({ theme }) => ({
  ...theme.typography.mainContentTransparent,
  ...{
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      marginLeft: "20px",
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
      marginRight: "10px",
    },
  },
}));

const Unregistered = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: "none",
        }}
      >
        <Toolbar>
          <UHeader />
        </Toolbar>
      </AppBar>

      <ParticlesBg type="circle" bg={true} />

      {/* main content */}
      <Main
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item>
          <CardHeader
            sx={{ headerSX, textAlign: "center" }}
            title={<Typography variant="largeHeader">Welcome</Typography>}
          />
        </Grid>
      </Main>
    </Box>
  );
};

export default Unregistered;
