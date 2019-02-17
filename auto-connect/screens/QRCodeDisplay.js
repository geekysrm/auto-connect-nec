import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import QRCode from "react-native-qrcode";

import { connect } from "react-redux";

class QRCodeDisplay extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            Pay me here{"\n\n\n"}
          </Text>
        </View>
        <QRCode value={this.props.user.email} size={250} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(QRCodeDisplay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
