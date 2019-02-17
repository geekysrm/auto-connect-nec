import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Input, Button } from "react-native-elements";

import { fetchUserDetails } from "../actions/userDetails";

import { connect } from "react-redux";

import axios from "axios";
const URL = process.env["BACKEND_URI"];

class AddMoney extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      loading: false
    };
  }

  addMoney = async () => {
    try {
      this.setState({
        loading: true
      });

      const token = await AsyncStorage.getItem("token");

      await axios({
        url: `${URL}addMoney`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: {
          amount: this.state.amount
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
            Add Money
          </Text>
        </View>
        <View style={{ width: 200, height: 100 }}>
          <Input
            // placeholder="Amount"
            keyboardType="numeric"
            onChangeText={text => this.setState({ amount: text })}
            value={this.state.amount}
            inputStyle={{ width: 50, height: 100, fontSize: 70 }}
            leftIcon={<Text style={{ fontSize: 70, color: "#626f78" }}>₹</Text>}
          />
        </View>
        <View style={{ padding: 20, width: 200, height: 50, display: "flex" }}>
          <Button
            title="Add Money"
            onPress={this.addMoney}
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

export default connect(
  null,
  {
    fetchUserDetails
  }
)(AddMoney);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee"
  }
});
