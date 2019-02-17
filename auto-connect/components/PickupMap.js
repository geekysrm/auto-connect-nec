import React from "react";
import { MapView } from "expo";

import { connect } from "react-redux";

import colors from "../constants/routeColors";

// PROPS: lat,long

class PickupMap extends React.Component {

  renderRoutePolyline = () => {

    if (this.props.pickUpRoute.route !== null) {
      return (
        <MapView.Polyline
          coordinates={this.props.pickUpRoute.route}
          strokeWidth={4}
          strokeColor={colors[0]}
        />
      );
    } else {
      return null;
    }
  };

  renderRouteMarkers = () => {
    if (this.props.pickUpRoute.destination !== null) {
      return (
        <MapView.Marker
          coordinate={{
            latitude: this.props.pickUpRoute.destination.lat,
            longitude: this.props.pickUpRoute.destination.long
          }}
          title="Auto Pick Up Point"
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.props.lat,
          longitude: this.props.long,
          // latitude: 12.973739,
          // longitude: 77.641445,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: this.props.lat ? this.props.lat : 0,
            longitude: this.props.long ? this.props.long : 0
            // latitude: 12.973739,
            // longitude: 77.641445
          }}
          title="Your Location"
        />
        {this.renderRoutePolyline()}
        {this.renderRouteMarkers()}
      </MapView>
    );
  }
}

const mapStateToProps = state => {
  return {
    pickUpRoute: state.pickUpRoute
  };
};

export default connect(mapStateToProps)(PickupMap);
