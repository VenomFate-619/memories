import {makeStyles} from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  circularProgress: {
    display: "grid",
  },
  // it should be md but there is a bug in this version
  // https://github.com/mui-org/material-ui/issues/13448
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
    setMaxWidth: {
      maxWidth: "100%",
    },
    form: {
      alignSelf: "center",
    },
    appBar:
    {
       background: "red",
    },
  },
}));