import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./login";
import { ListPage } from "./list";
import { DetailPage } from "./detail";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "Roboto"
  },
}));

export const App = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/list">
            <ListPage />
          </Route>
          <Route path="/detail/:id">
            <DetailPage />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};
