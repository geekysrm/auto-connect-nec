import React from "react";
import { createStackNavigator } from "react-navigation";

import PayScreen from "../screens/Pay";
import FinalPayScreen from "../screens/FinalPay";

const PayStackNavigator = createStackNavigator({
  Pay: {
    screen: PayScreen,
    navigationOptions: () => ({
      title: "Pay",
      headerTitle: "Pay"
    })
  },
  FinalPay: {
    screen: FinalPayScreen,
    navigationOptions: () => ({
      title: "Confirm Money Transfer",
      headerTitle: "Confirm Money Transfer"
    })
  }
  // Pay: PayScreen,
  // FinalPay: FinalPayScreen
});

export default PayStackNavigator;
