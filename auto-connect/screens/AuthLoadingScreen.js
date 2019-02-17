import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import { fetchUserDetails } from "../actions/userDetails";

import { connect } from "react-redux";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.loadApp();
  }

  componentDidMount() {}
  loadApp = async () => {
    const token = await AsyncStorage.getItem("token");
    const expiresIn = await AsyncStorage.getItem("expiresIn");

    if (Date.now() < Number(expiresIn) && token) {
      if (this.props.user.type !== null) {
        if (this.props.user.type === "user")
          this.props.navigation.navigate("Main");
        else this.props.navigation.navigate("MainDriver");
      } else {
        this.props.fetchUserDetails();
      }
    } else {
      this.props.navigation.navigate("AppIntro");
    }
  };

  componentDidUpdate() {
    if (this.props.user.type !== null) {
      if (this.props.user.type === "user")
        this.props.navigation.navigate("Main");
      else this.props.navigation.navigate("MainDriver");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUserDetails
  }
)(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
