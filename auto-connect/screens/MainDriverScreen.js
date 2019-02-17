import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { fetchUserDetails } from "../actions/userDetails";

import { connect } from "react-redux";

class MainDriverScreen extends Component {

  componentDidMount()
  {
    this.props.fetchUserDetails();
  }

  componentDidUpdate()
  {
    console.log(this.props.user);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>MainDriverScreen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { fetchUserDetails })(MainDriverScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
