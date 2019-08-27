import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MaskedInput from "react-text-mask";
import { saveProfileRequest, getProfile } from "../../modules/Profile";
import { Redirect } from "react-router-dom";
import "./Profile.css";
import { loadFromLocalStore } from "../../localStore";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    minWidth: 400,
    maxWidth: 800,
    margin: "10vh auto"
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
  const savedValues = loadFromLocalStore('profile');
  if (savedValues) {
    for (let key in savedValues) {
      if (!values[key]) {
        values[key] = savedValues[key];
      }
    }
  }

  const errors = {};
  const requiredFields = ["cardName", "cardNumber", "expDate", "cvv"];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Обязательное поле";
    }
  });

  if (values.cardName && !/^[A-Za-z\s]+$/.test(values.cardName)) {
    errors.cardName = "Поле может содержатиь только буквы латинского алфавита";
  }

  if (values.cardNumber && values.cardNumber.replace(/\s/g, "").length !== 16) {
    errors.cardNumber = "Поле должно иметь длину 16 символов";
  }

  if (values.cvv && values.cvv.replace(/\s/g, "").length !== 3) {
    errors.cvv = "Поле должно иметь длину 3 символа";
  }

  return errors;
};

const MaskedCardNumber = props => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
    />
  );
};

const MaskedCvv = props => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
    />
  );
};

const customField = ({
  id,
  type,
  placeholder,
  label,
  meta: { touched, error },
  input,
  ...rest
}) => (
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

const Profile = props => {
  const { handleSubmit, pristine, submitting, classes } = props;
  const data = loadFromLocalStore("profile");

  const [cardName, setCardName] = useState(
    data && data.cardName ? data.cardName : ""
  );
  const onChangeCardName = event => {
    setCardName(event.target.value);
  };

  const [cardNumber, setCardNumber] = useState(
    data && data.cardNumber ? data.cardNumber : ""
  );
  const onChangeCardNumber = event => {
    setCardNumber(event.target.value);
  };

  const [expDate, setExpDate] = useState(
    data && data.expDate ? data.expDate : ""
  );
  const onChangeExpDate = event => {
    setExpDate(event.target.value);
  };

  const [cvv, setCvv] = useState(
    data && data.cvv ? data.cvv : ""
  );
  const onChangeCvv = event => {
    setCvv(event.target.value);
  };

  const onSubmit = formData => {
    const { saveProfileRequest } = props;
    saveProfileRequest(formData);
    console.log(formData);
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Typography className={classes.h1} component="h1">
            Профиль
          </Typography>
          <Typography className={classes.h3}>Способ оплаты</Typography>
          <Grid item xs={12} sm={6}>
            <Field
              id="cardName"
              name="cardName"
              type="text"
              label="Имя владельца"
              onChange={onChangeCardName}
              InputProps={{ value: cardName }}
              component={customField}
            />
            <Field
              id="expDate"
              name="expDate"
              type="date"
              label="Дата окончания действия"
              onChange={onChangeExpDate}
              InputLabelProps={{shrink: true}}
              InputProps={{ value: expDate }}
              component={customField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              id="cardNumber"
              name="cardNumber"
              type="text"
              label="Номер карты"
              onChange={onChangeCardNumber}
              InputProps={{
                inputComponent: MaskedCardNumber,
                value: cardNumber
              }}
              component={customField}
            />
            <Field
              id="cvv"
              name="cvv"
              type="text"
              label="CVV"
              onChange={onChangeCvv}
              InputProps={{
                inputComponent: MaskedCvv,
                value: cvv
              }}
              component={customField}
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
      { saveProfileRequest }
    )(Profile)
  )
);
