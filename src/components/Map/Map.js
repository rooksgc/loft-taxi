import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: 400
  },
  paragraph: {
    width: '100%',
    textAlign: 'center'
  }
});

class Map extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.paragraph} component="p">
          Карта
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Map);
