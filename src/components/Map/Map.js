import React, { PureComponent } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "./Select";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { getProfile } from "../../modules/Profile";
import { connect } from "react-redux";
import mapboxgl from "mapbox-gl";
import { getRoute, getAddresslist, mapboxAccessToken } from "./api";
import "./Map.css";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: "40vw",
    maxWidth: "550px"
  },
  button: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1)
  },
  link: {
    textDecoration: "none"
  },
  select: {
    padding: theme.spacing(2)
  }
});

class Map extends PureComponent {
  state = {
    orderPlaced: false,
    addresses: null
  };

  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    const { addresses } = this.state;
    if (!addresses) this.fetchAddresses();

    mapboxgl.accessToken = mapboxAccessToken;

    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [30.2656504, 59.8029126],
      zoom: 15
    });
  }

  fetchAddresses = () => {
    getAddresslist().then(
      res => {
        const addresses = res.addresses.map(item => ({
          label: item,
          value: item
        }));
        this.setState({ addresses });
      },
      () => {
        this.setState({ addresses: null });
      }
    );
  };

  componentWillUnmount() {
    this.map.remove();
  }

  onNewOrder = () => {
    this.setState({
      orderPlaced: false
    });
    this.map.removeLayer("route");

    if (this.map.getSource("route")) {
      this.map.removeSource("route");
    }
  };

  onRouteChange = (from, to) => {
    this.setState({
      orderPlaced: true
    });

    getRoute(from, to).then(route => {
      this.map.flyTo({
        center: route[0]
      });

      this.map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route
            }
          }
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#BA443E",
          "line-width": 8
        }
      });
    });
  };

  render() {
    const {
      classes,
      profile: { profile }
    } = this.props;
    const { orderPlaced, addresses } = this.state;

    return (
      <div className="map-container">
        <div className="map-viewport" ref={this.mapContainer} />
        {profile ? (
          orderPlaced ? (
            <div className="card">
              <Paper className={classes.root}>
                <Typography component="h1">Заказ размещен</Typography>
                <Typography component="p">
                  Ваше такси прибудет приблизительно через 10 минут.
                </Typography>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.onNewOrder}
                >
                  СДЕЛАТЬ НОВЫЙ ЗАКАЗ
                </Button>
              </Paper>
            </div>
          ) : (
            addresses &&
            <div className="card">
              <Paper className={classes.root}>
                <Select
                  addresses={addresses}
                  onRouteChange={this.onRouteChange}
                />
              </Paper>
            </div>
          )
        ) : (
          <div className="card">
            <Paper className={classes.root}>
              <Typography component="h1">Заполните платежные данные</Typography>
              <Typography component="p">
                Укажите информацию о банковской карте, чтобы сделать заказ
              </Typography>
              <Link to="/profile" className={classes.link}>
                <Button variant="contained" className={classes.button}>
                  ПЕРЕЙТИ В ПРОФИЛЬ
                </Button>
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
