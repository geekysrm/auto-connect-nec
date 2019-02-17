import React, { Component } from "react";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import DriverDashboardStackNavigator from "./DriverDashboardStackNavigator";
import QRCodeDisplayScreen from "../screens/QRCodeDisplay";
import DriverTransactionsScreen from "../screens/DriverTransactionsScreen";
import { connect } from "react-redux";

class customDrawerComponent extends Component {
  render() {
    if (this.props.user.loggedIn) {
      return (
        <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
          <View
            style={{
              marginTop: 20,
              display: "flex"
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{ uri: this.props.user.profilePic }}
                style={{ height: 120, width: 120, borderRadius: 60 }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  padding: 10,
                  justifyContent: "center"
                }}
              >
                {this.props.user.name}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 40, color: "orange" }}>
                &#8377; {this.props.user.balance}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "#2F4F4F" }}
              >
                {this.props.user.autoNumber}
              </Text>
            </View>
          </View>
          <ScrollView>
            <DrawerItems {...this.props} />
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.clear();
                this.props.navigation.navigate("AuthLoading");
              }}
              style={styles.logoutContainer}
            >
              <View>
                <Icon name="md-log-out" size={30} />
              </View>
              <View>
                <Text style={styles.drawerElements}>{"     "}Log Out</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: DriverDashboardStackNavigator,
      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: () => <Icon name="md-home" size={30} />
      }
    },
    QRCodeDisplay: {
      screen: QRCodeDisplayScreen,
      navigationOptions: {
        drawerLabel: "Display QR Code",
        drawerIcon: () => <Icon name="md-qr-scanner" size={30} />
      }
    },
    Transactions: {
      screen: DriverTransactionsScreen,
      navigationOptions: {
        drawerLabel: "Transaction History",
        drawerIcon: () => <Icon name="md-sync" size={30} />
      }
    }
  },
  {
    contentComponent: connect(mapStateToProps)(customDrawerComponent),
    contentOptions: {
      activeTintColor: "rebeccapurple",
      itemStyle: {
        height: 70
      }
    }
  }
);

export default AppDrawerNavigator;

const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 15,
    paddingTop: 10
  },
  drawerElements: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 15,
    color: "#273444"
  }
});
