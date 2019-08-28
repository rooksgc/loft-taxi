import React, { useState } from "react";
import Select from "react-select";
import { emphasize, makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    bottom: 6,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  divider: {
    height: theme.spacing(2)
  },
  select: {
    padding: theme.spacing(2)
  }
}));

const NoOptionsMessage = props => {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
};

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
};

const Control = props => {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
};

const Option = props => {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
};

const Placeholder = props => {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
};

const SingleValue = props => {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
};

const ValueContainer = props => {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
};

const Menu = props => {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
};

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

const AddressesSelect = props => {
  const { onRouteChange, addresses } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [data1, setData1] = useState(addresses);
  const [data2, setData2] = useState(addresses);

  const [option1, setOption1] = useState(null);
  const [option2, setOption2] = useState(null);

  const onButtonPressed = () => {
    onRouteChange(option1.value, option2.value);
  }
  
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    }),
    container: base => ({
      ...base,
      marginTop: theme.spacing(3)
    })
  };

  const handleChange = (value, opts) => {
    const { name } = opts;

    if (value && name === "from") {
      setOption1(value);
      setData2( addresses.filter(item => item.label !== value.label) );
    } else if (!value && name === "from") {
      setData1( addresses.slice().filter(item => item.label !== (option2 ? option2.label : "")) );
      setData2( addresses.slice() );
      setOption1(value);
    }

    if (value && name === "to") {
      setOption2(value);
      setData1( addresses.filter(item => item.label !== value.label) );
    } else if (!value && name === "to") {
      setData1( addresses.slice() );
      setData2( addresses.slice().filter(item => item.label !== (option1 ? option1.label : "")) );
      setOption2(value);
    }
  };

  return (
    <>
      <Typography component="h1">Вызов такси</Typography>
      <Select
        name="from"
        classes={classes}
        styles={selectStyles}
        inputId="react-select-single"
        TextFieldProps={{
          InputLabelProps: {
            htmlFor: "react-select-single",
            shrink: true
          }
        }}
        placeholder="Выберите адрес отправления"
        options={data1}
        components={components}
        value={option1}
        onChange={handleChange}
        hideSelectedOptions="true"
        isClearable="true"
      />
      <Select
        name="to"
        classes={classes}
        styles={selectStyles}
        inputId="react-select-single"
        TextFieldProps={{
          InputLabelProps: {
            htmlFor: "react-select-single",
            shrink: true
          }
        }}
        placeholder="Выберите адрес прибытия"
        options={data2}
        components={components}
        value={option2}
        onChange={handleChange}
        hideSelectedOptions="true"
        isClearable="true"
      />
      <div className={classes.divider} />
      <Button
        variant="contained"
        className={classes.button}
        disabled={!(option1 && option2)}
        onClick={onButtonPressed}
      >
        ВЫЗВАТь ТАКСИ
      </Button>
    </>
  );
};

export default AddressesSelect;
