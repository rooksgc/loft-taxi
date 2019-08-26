import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { login, getIsLoggedIn } from "../../modules/Auth";
import { Redirect } from "react-router-dom";
import "./Login.css";

const styles = theme => ({
  root: {
    minHeight: "90vh"
  },
  form: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: 400
  },
  button: {
    marginTop: theme.spacing(5)
  },
  h1: {
    width: "100%",
    textAlign: "center",
    fontSize: "2em"
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = ["username", "password"];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Обязательное поле";
    }
  });
  if (values.username && values.username !== "test@test.com") {
    errors.username = "Неверный логин";
  }
  if (values.password && values.password !== "123123") {
    errors.password = "Неверный пароль";
  }
  return errors;
};

const customField = ({
  id,
  input,
  type,
  placeholder,
  label,
  meta: { touched, error },
  ...rest
}) => (
  <>
    <TextField
      key={id}
      className="login-input"
      margin="dense"
      required={true}
      placeholder={label}
      label={label}
      type={type}
      error={!!(touched && error)}
      {...input}
      {...rest}
    />
    {touched && error && (
      <FormHelperText className="login-error">{error}</FormHelperText>
    )}
  </>
);

const Login = props => {
  const { handleSubmit, pristine, submitting, classes, isLoggedIn } = props;

  const onSubmit = formData => {
    const { username, password } = formData;
    const { login } = props;
    if (username !== "test@test.com" && password !== "123123") return;
    login();
  };

  return isLoggedIn ? (
    <Redirect to="/map" />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Paper className={classes.form}>
          <Typography className={classes.h1} component="h1">
            Войти
          </Typography>
          <Field
            id="username"
            name="username"
            type="text"
            component={customField}
            label="Имя пользователя"
          />
          <Field
            id="password"
            name="password"
            type="password"
            component={customField}
            label="Пароль"
          />
          <Button
            className={classes.button}
            variant="contained"
            type="submit"
            disabled={pristine || submitting}
          >
            Войти
          </Button>
        </Paper>
      </Grid>
    </form>
  );
};

export default reduxForm({
  form: "Login",
  validate
})(
  withStyles(styles)(
    connect(
      state => ({
        isLoggedIn: getIsLoggedIn(state)
      }),
      { login }
    )(Login)
  )
);
