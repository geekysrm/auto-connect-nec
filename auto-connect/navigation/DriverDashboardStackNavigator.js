import React from "react";
import { createStackNavigator } from "react-navigation";
import Icon from "@expo/vector-icons/Ionicons";
import DriverDashboardTabNavigator from "./DriverDashboardTabNavigator";

const DashboardStackNavigator = createStackNavigator(
  {
    DriverDashboardTabNavigator: DriverDashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

export default DashboardStackNavigator;
