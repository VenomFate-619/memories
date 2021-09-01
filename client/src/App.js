import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
// import { ThemeProvider } from "@material-ui/core/styles";
import { Notify } from "notiflix";
import {theme} from './styles';
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";

function App() {
  Notify.Init({
    closeButton: true,
    failure: { notiflixIconColor: "rgba(0,0,0,0.655)"  }
  });
  return (
    <BrowserRouter>
      {/* <ThemeProvider theme={theme}> */}
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </Container>
      {/* </ThemeProvider> */}
    </BrowserRouter>
  );
}

export default App;
