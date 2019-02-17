import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Picker,
  Linking
} from "react-native";
import { Constants, Location, Permissions } from "expo";
import Icon from "@expo/vector-icons/Ionicons";
import { Button } from "react-native-elements";
import { fetchUserDetails } from "../actions/userDetails";
import { fetchPlaces } from "../actions/places";
import { fetchPickupRoute } from "../actions/pickup";

import { connect } from "react-redux";

import Map from "../components/PickupMap";

class Pickup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destination: null,
      location: null,
      locationErrorMessage: null,
      loc: 11
    };
  }

  componentDidMount() {
    this.props.fetchUserDetails();
    this.props.fetchPlaces();

    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        locationErrorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidUpdate() {
    if (this.props.places && this.state.destination === null) {
      this.setState({
        destination: {
          lat: this.props.places.find(place => {
            return place.id === this.state.loc;
          }).lat,
          long: this.props.places.find(place => {
            return place.id === this.state.loc;
          }).long
        }
      });
    }
  }

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          locationErrorMessage: "Location access denied"
        });
      }
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    } catch (e) {
      console.log(e);
    }
  };

  renderPlaces = () => {
    if (this.props.places !== null) {
      return this.props.places.map(place => {
        return <Picker.Item label={place.name} value={place.id} />;
      });
    } else {
      return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View>
            <View>
              <View>
                <Text>Select a Pickup Point</Text>
              </View>
              <View>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.loc}
                  style={{ height: 60, width: 300 }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ loc: itemValue });
                    this.setState({
                      destination: {
                        lat: this.props.places.find(place => {
                          return place.id === itemValue;
                        }).lat,
                        long: this.props.places.find(place => {
                          return place.id === itemValue;
                        }).long
                      }
                    });
                  }}
                >
                  {this.renderPlaces()}
                </Picker>
              </View>
            </View>
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Icon
              onPress={() => {
                console.log("Search clicked");

                const to = this.state.destination;
                const from = {
                  lat: this.state.location.coords.latitude,
                  long: this.state.location.coords.longitude
                };

                console.log(from, to);

                this.props.fetchPickupRoute(from, to);
              }}
              name="md-compass"
              size={30}
            />
          </View>
        </View>
        <View style={styles.mapContainer}>
          <Map
            lat={
              this.state.location && Number(this.state.location.coords.latitude)
            }
            long={
              this.state.location &&
              Number(this.state.location.coords.longitude)
            }
          />
        </View>
        <View style={styles.navigateButtonContainer}>
          <Button
            buttonStyle={{ width: 600, height: 55 }}
            icon={<Icon name="md-navigate" color="white" size={23} />}
            iconRight
            title="Navigate to auto stand     "
            onPress={() => {
              console.log("Navigation button clicked");
              Linking.openURL(
                `google.navigation:q=${this.state.destination.lat}+${
                  this.state.destination.long
                }`
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places,
    route: state.route
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUserDetails,
    fetchPlaces,
    fetchPickupRoute
  }
)(Pickup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  mapContainer: {
    height: 520,
    width: "100%"
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  navigateButtonContainer: {
    // marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%"
  }
});
