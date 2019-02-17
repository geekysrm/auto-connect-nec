import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "@expo/vector-icons/Ionicons";
import Routes from "../screens/Routes";
import LiveAutos from "../screens/LiveAutos";
import Pickup from "../screens/Pickup";
const DashboardTabNavigator = createBottomTabNavigator(
  {
    Routes: {
      screen: Routes,
      navigationOptions: {
        tabBarLabel: "Routes",
        tabBarIcon: () => <Icon name="md-trending-up" size={20} />
      }
    },
    LiveAutos: {
      screen: LiveAutos,
      navigationOptions: {
        tabBarLabel: "Live Autos",
        tabBarIcon: () => <Icon name="md-stopwatch" size={20} />
      }
    },
    Pickup: {
      screen: Pickup,
      navigationOptions: {
        tabBarLabel: "Pickup Points",
        tabBarIcon: () => <Icon name="md-locate" size={20} />
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
