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
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { saveProfile, getProfile } from "../../modules/Profile";
import { Redirect } from "react-router-dom";
import './Profile.css';

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    minWidth: 400,
    maxWidth: 800,
    margin: '10vh auto'
  },
  form: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: 900
  },
  button: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1.5)
  },
  h1: {
    width: "100%",
    textAlign: "center",
    fontSize: "2em"
  },
  h3: {
    width: "100%",
    fontSize: "1.3em",
    marginLeft: theme.spacing(1.5)
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = ["cardName", "cardNumber", "expDate", "cvv"];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Обязательное поле";
    }
  });

  if (values.cardName && !/^[A-Za-z\s]+$/.test(values.cardName) ) {
    errors.username = "Поле может содержатиь только символы латинского алфавита";
  }

  // if (values.cardNumber && values.cardNumber !== "123123") {
  //   errors.password = "Неверный пароль";
  // }

  return errors;
};

const MaskedCardNumber = (props) => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/, ' ', /\d/,/\d/,/\d/,/\d/, ' ',/\d/,/\d/,/\d/,/\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

MaskedCardNumber.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const customField = ({
  id,
  input,
  type,
  placeholder,
  label,
  meta: { touched, error },
  ...rest
}) => {
  switch(id) {
    case 'cardNumber':
      return (
        <>
          <TextField
            key={id}
            className="profile-input"
            margin="dense"
            required={true}
            placeholder={label}
            label={label}
            type={type}
            error={!!(touched && error)}
            InputProps={{
              inputComponent: MaskedCardNumber
            }}
            {...input}
            {...rest}
          />
          {touched && error && (
            <FormHelperText className="profile-error">{error}</FormHelperText>
          )}
        </>
      );
    default:
      return (
        <>
          <TextField
            key={id}
            className="profile-input"
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
            <FormHelperText className="profile-error">{error}</FormHelperText>
          )}
        </>
      );
  }
};

const Profile = props => {
  const { handleSubmit, pristine, submitting, classes } = props;

  const onSubmit = formData => {
    console.log(formData);
    // saveProfile();
    // const { username, password } = formData;
    // const { login } = props;
    // if (username !== "test@test.com" && password !== "123123") return;
    // login();
  };

  return (
    <Paper className={classes.root} >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Typography className={classes.h1} component="h1">
            Профиль
          </Typography>
          <Typography className={classes.h3}>
            Способ оплаты
          </Typography>
          <Grid item xs={12} sm={6}>
            <Field
              id="cardName"
              name="cardName"
              type="text"
              component={customField}
              label="Имя владельца"
            />
            <Field
              id="expDate"
              name="expDate"
              type="text"
              component={customField}
              label="Дата окончания действия"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
                id="cardNumber"
                name="cardNumber"
                type="text"
                component={customField}
                label="Номер карты"
              />
            <Field
              id="cvv"
              name="cvv"
              type="text"
              component={customField}
              label="CVV"
            />
          </Grid>
          <Button
            className={classes.button}
            variant="contained"
            type="submit"
            disabled={pristine || submitting}
          >
            Сохранить
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default reduxForm({
  form: "Profile",
  validate
})(
  withStyles(styles)(
    connect(
      state => ({
        profile: getProfile(state)
      }),
      {  }
    )(Profile)
  )
);
