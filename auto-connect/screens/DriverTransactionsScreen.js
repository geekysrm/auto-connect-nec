import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import { connect } from "react-redux";
import { fetchUserDetails } from "../actions/userDetails";

class DriverTransactionsScreen extends Component {
  render() {
    console.log(this.props.user.transactions);
    return (
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20
          }}
        >
          <Text style={{ fontSize: 45, fontWeight: "bold" }}>
            Your Transactions
          </Text>
        </View>
        {this.props.user.transactions.map((transaction, i) => (
          <ListItem
            key={i}
            bottomDivider
            leftIcon={
              transaction.from
                ? {
                    name: "md-add",
                    type: "ionicon",
                    iconStyle: { color: "green" }
                  }
                : {
                    name: "md-remove",
                    type: "ionicon",
                    iconStyle: { color: "red" }
                  }
            }
            title={transaction.from || transaction.to}
            rightTitle={`₹ ${this.props.user.transactions[0].amount}`}
            rightTitleStyle={{
              color: "orange",
              fontWeight: "bold",
              fontSize: 25
            }}
            subtitle={new Date(Number(transaction.timeStamp)).toDateString()}
          />
        ))}
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
)(DriverTransactionsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
