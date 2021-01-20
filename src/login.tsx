import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",

    "& Button": {
      marginTop: "1rem",
    },
    "& div": {
      marginBottom: ".5rem",
    },
  },
}));

export const LoginPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleNavigation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "admin" && password === "test") {
      history.push("/list");
    } else {
      alert("User / password not valid, psst... admin / test");
    }
  };

  return (
    <>
      <div className={classes.root}>
        <form onSubmit={handleNavigation}>
          <h1>Hello from login page</h1>
          <div>
            <TextField id="standard-basic" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <TextField id="standard-basic" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Enter
          </Button>
        </form>
      </div>
    </>
  );
};
