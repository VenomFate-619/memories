import {makeStyles} from '@material-ui/core/styles';
// import { createTheme } from "@material-ui/core/styles";

// const theme = createTheme({
//   breakpoints: {
//     get down() {
//       return (key) => `@media (max-width:${this.values[key] - 0.5}px)`;
//     },
//     get up() {
//       return (key) => `@media (min-width:${this.values[key] + 0.5}px)`;
//     },
//     get between() {
//       return (keyA, keyB) =>
//         `@media (min-width:${this.values[keyA]}px) and (max-width:${
//           this.values[keyB] - 0.5
//         }px)`;
//     },
//   },
// });

// export {theme} ;

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      background: "red",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  circularProgress: {
    display: "grid",
  },
  
  [theme.breakpoints.down("md")]: {
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
    }
  },
}));