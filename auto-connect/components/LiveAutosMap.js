import React from "react";
import { MapView } from "expo";

import { connect } from "react-redux";

import colors from "../constants/routeColors";

// PROPS: lat,long

class LiveAutosMap extends React.Component {
  renderRoutePolyline = () => {
    if (this.props.route.polyline !== null) {
      return this.props.route.polyline.map((a, index) => {
        return (
          <MapView.Polyline
            coordinates={a}
            strokeWidth={4}
            strokeColor={colors[index]}
          />
        );
      });
    } else {
      return null;
    }
  };

  renderRouteMarkers = () => {
    if (this.props.route.route !== null) {
      return this.props.route.route.map(a => {
        return (
          <MapView.Marker
            coordinate={{
              latitude: a.lat,
              longitude: a.long
            }}
            title={a.name}
            description={a.waitTime}
          />
        );
      });
    } else {
      return null;
    }
  };

  renderLiveAutos = () => {
    if (this.props.route.polyline !== null) {
        return this.props.route.polyline.map((a, index) => {
            return a.map((b, index) => {

                const random = Math.floor((Math.random() * 10) + 1);

                if(random === 1)
                {
                    if(this.props.type === "auto")
                    {
                      return (
                        <MapView.Marker
                            coordinate={{
                            latitude: b.latitude,
                            longitude: b.longitude
                            }}
                            image={require("../assets/images/auto.png")}
                        />
                      );
                    }
                    else
                    {
                      return (
                        <MapView.Marker
                            coordinate={{
                            latitude: b.latitude,
                            longitude: b.longitude
                            }}
                            image={require("../assets/images/person.png")}
                        />
                      );
                    }
                }
                else
                {
                    return null;
                }
            });
        });
      } else {
        return null;
      }
  }

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
        region={{
          latitude: this.props.lat,
          longitude: this.props.long,
          // latitude: 12.973739,
          // longitude: 77.641445,
          latitudeDelta: this.props.route.polyline !== null ? 0.08 : 0.01,
          longitudeDelta: this.props.route.polyline !== null ? 0.08 : 0.01
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
        {this.renderLiveAutos()}
      </MapView>
    );
  }
}

const mapStateToProps = state => {
  return {
    route: state.route
  };
};

export default connect(mapStateToProps)(LiveAutosMap);
