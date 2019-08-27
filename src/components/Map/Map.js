import React, { PureComponent } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { getProfile } from "../../modules/Profile";
import { connect } from "react-redux";
import mapboxgl from "mapbox-gl";
import "./Map.css";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '40vw',
    maxWidth: '550px'
  },
  button: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1)
  },
  link: {
    textDecoration: "none"
  }
});

class Map extends PureComponent {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoicm9va3NnYyIsImEiOiJjanptamVvd3UxMzkxM2xwbWd2b3E1bWZ6In0.dtut7RO3w4SiOar-J3sGLA";
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [30.2656504, 59.8029126],
      zoom: 15
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const { classes,profile: { profile } } = this.props;

    return (
      <div className="map-container">
        <div className="map-viewport" ref={this.mapContainer} />
        {profile ? (
          <div className="route-choise">
            <Paper className={classes.root}>
              <Typography component="h1">
                Вызов такси
              </Typography>
            </Paper>
          </div>
        ) : (
          <div className="no-payment-data">
            <Paper className={classes.root}>
              <Typography component="h1">
                Заполните платежные данные
              </Typography>
              <Typography component="p">
                Укажите информацию о банковской карте, чтобы сделать заказ
              </Typography>
              <Link to="/profile" className={classes.link}>
                <Button variant="contained" className={classes.button}>ПЕРЕЙТИ В ПРОФИЛЬ</Button>
              </Link>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(state => ({
    profile: getProfile(state)
  }))(Map)
);
