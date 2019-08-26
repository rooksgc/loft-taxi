import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn, logout } from "../../modules/Auth";
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
    fontWeight: 400,
    flexGrow: 1
  },
  link: {
    textDecoration: "none"
  },
  button: {
    fontWeight: 400
  }
}));

const Header = props => {
  const classes = useStyles();
  const { isLoggedin, logout } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Loft Taxi
          </Typography>
          <Link to="/map" className={classes.link}>
            <Button className={classes.button}>Карта</Button>
          </Link>
          <Link to="/profile" className={classes.link}>
            <Button className={classes.button}>Профиль</Button>
          </Link>
          {isLoggedin ? (
            <Button className={classes.button} onClick={logout}>
              Выйти
            </Button>
          ) : (
            <Link to="/login" className={classes.link}>
              <Button className={classes.button}>Войти</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(
  state => ({ isLoggedin: getIsLoggedIn(state) }),
  { logout }
)(Header);
