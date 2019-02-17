import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";

import { Input, Button } from "react-native-elements";

import { fetchUserDetails } from "../actions/userDetails";

import axios from "axios";
const URL = process.env["BACKEND_URI"];

import { connect } from "react-redux";

class FinalPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      loading: false
    };
  }

  transferMoney = async () => {
    try {
      this.setState({
        loading: true
      });

      const token = await AsyncStorage.getItem("token");

      await axios({
        url: `${URL}transfer`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: {
          amount: this.state.amount,
          driverEmail: this.props.qrCode
        }
      });

      this.setState({
        amount: 0,
        loading: false
      });

      this.props.fetchUserDetails();

      alert("Money transfer done!");
    } catch (err) {
      console.log("error", err);
    }

    this.setState({
      amount: 0,
      loading: false
    });
  };

  render() {
    // return (
    //   <View style={styles.container}>
    //     <Text>Transfer Money to {this.props.qrCode}</Text>
    //     <Input
    //       placeholder="Enter amount of money to be transfered"
    //       keyboardType="numeric"
    //       onChangeText={text => this.setState({ amount: text })}
    //       value={this.state.amount}
    //     />
    //     <View style={{ padding: 20 }}>
    //       <Button
    //         title="Transfer Money"
    //         onPress={this.transferMoney}
    //         loading={this.state.loading}
    //       />
    //     </View>
    //   </View>
    // );
    return (
      <View style={styles.container}>
        <View style={{ display: "flex", marginBottom: 100 }}>
          <Text
            style={{
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 50
            }}
          >
            Transfer Money
          </Text>
        </View>
        <View style={{ width: 200, height: 100 }}>
          <Input
            keyboardType="numeric"
            onChangeText={text => this.setState({ amount: text })}
            value={this.state.amount}
            inputStyle={{ width: 50, height: 100, fontSize: 70 }}
            leftIcon={<Text style={{ fontSize: 70, color: "#626f78" }}>₹</Text>}
          />
        </View>
        <View style={{ padding: 20, width: 200, height: 50, display: "flex" }}>
          <Button
            title="Transfer Money"
            onPress={this.transferMoney}
            loading={this.state.loading}
            buttonStyle={{
              // width: 200,
              height: 50
              // alignItems: "center",
              // justifyContent: "center"
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    qrCode: state.qrCode
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUserDetails
  }
)(FinalPay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
