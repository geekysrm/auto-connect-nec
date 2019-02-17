import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, Picker } from "react-native";
import { Constants, Location, Permissions } from "expo";
import Icon from "@expo/vector-icons/Ionicons";
import { fetchUserDetails } from "../actions/userDetails";
import { fetchPlaces } from "../actions/places";
import { fetchRoute } from "../actions/route";

import { connect } from "react-redux";

import Map from "../components/LiveAutosMap";

class LivePassengers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      locationErrorMessage: null,
      start: 11,
      end: 1
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
              <Text>Enter start Location</Text>
            </View>
            <View>
              <Picker
                mode="dropdown"
                selectedValue={this.state.start}
                style={{ height: 60, width: 300 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ start: itemValue })
                }
              >
                {this.renderPlaces()}
              </Picker>
            </View>
          </View>
          
          <View>
            <View>
              <Text>Enter end Location</Text>
            </View>
            <View>
              <Picker
                mode="dropdown"
                selectedValue={this.state.end}
                style={{ height: 60, width: 300 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ end: itemValue })
                }
              >
                {this.renderPlaces()}
              </Picker>
            </View>
          </View>
          </View>
          <View style={{ paddingLeft: 10 }} >
            <Icon
              onPress={() => {
                console.log("Search clicked")
              
                this.props.fetchRoute(
                  this.state.start.toString(), 
                  this.state.end.toString()
                );

              }}
              name="md-search"
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
            type="passenger"
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
    fetchRoute
  }
)(LivePassengers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  mapContainer: {
    height: 450,
    width: "100%"
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});
