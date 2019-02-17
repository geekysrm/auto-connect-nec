import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "@expo/vector-icons/Ionicons";
import DriverRoutesScreen from "../screens/DriverRoutes";
import LivePassengersScreen from "../screens/LivePassengers";

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Routes: {
      screen: DriverRoutesScreen,
      navigationOptions: {
        tabBarLabel: "Routes",
        tabBarIcon: () => <Icon name="md-trending-up" size={20} />
      }
    },
    LivePassengers: {
      screen: LivePassengersScreen,
      navigationOptions: {
        tabBarLabel: "Live Passengers",
        tabBarIcon: () => <Icon name="md-stopwatch" size={20} />
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

export default DashboardTabNavigator;
