import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    minHeight: '90vh'
  },
  form: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: 400
  },
  button: {
    marginTop: theme.spacing(3),
  },
  h1: {
    width: '100%',
    textAlign: 'center',
    fontSize: '2em'
  },
  input: {
    width: '100%'
  }
});

class Login extends PureComponent {
  state = {
    inputValue: ''
  };
  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleKeyPress = event => {
    const { inputValue } = this.state;
    // const { onEnter } = this.props;

    if (event.key === 'Enter') {
      // onEnter(inputValue);
    }
  };
  render() {
    const { classes } = this.props;
    const { inputValue } = this.state;
    return (
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
        <TextField
          value={inputValue}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          className={classes.input}
          label="Имя пользователя"
          margin="dense"
        />
        <TextField
          value={inputValue}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          className={classes.input}
          label="Пароль"
          margin="dense"
        />
        <Button variant="contained" className={classes.button}>
          Войти
        </Button>
      </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
