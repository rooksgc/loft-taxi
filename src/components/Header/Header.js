import React from "react";
// import styles from "./Toolbar.module.css";
import { connect } from "react-redux";
import { getIsLoggedIn, login, logout } from "../../modules/Auth";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = props => {
  const classes = useStyles();
  const { isLoggedin } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>       
          <Typography variant="h6" className={classes.title}>
            Loft Taxi
          </Typography>
          {!isLoggedin ? (
            <Button color="inherit" onClick={login}>Войти</Button>
          ) : (
            <Button color="inherit" onClick={logout}>Выйти</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(
  state => ({ isLoggedin: getIsLoggedIn(state) }),
  { login, logout }
)(Header);
