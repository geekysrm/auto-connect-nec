import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

import { Button } from "react-native-elements";

import { Google, LinearGradient } from "expo";
import Icon from "@expo/vector-icons/Ionicons";

import { connect } from "react-redux";

import { loginUser, loginDriver } from "../actions/auth";

import Toast from "react-native-simple-toast";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingUser: false,
      loadingDriver: false
    };
  }

  signInUser = async () => {
    this.setState({
      loadingUser: true
    });

    try {
      const result = await Google.logInAsync({
        androidClientId: process.env["GOOGLE_OAUTH_CLIENT_ID"],
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.props.loginUser(
          result.user.name,
          result.user.email,
          result.user.photoUrl,
          "user"
        );
      } else {
        Toast.show("Google login interrupted");

        this.setState({
          loadingUser: false
        });
      }
    } catch (e) {
      Toast.show("Google login interrupted");

      this.setState({
        loadingUser: false
      });
    }
  };

  signInDriver = async () => {
    this.setState({
      loadingDriver: true
    });

    try {
      const result = await Google.logInAsync({
        androidClientId: process.env["GOOGLE_OAUTH_CLIENT_ID"],
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.props.loginDriver(
          result.user.name,
          result.user.email,
          result.user.photoUrl,
          "driver"
        );
      } else {
        Toast.show("Google login interrupted");

        this.setState({
          loadingDriver: false
        });
      }
    } catch (e) {
      Toast.show("Google login interrupted");

      this.setState({
        loadingDriver: false
      });
    }
  };

  componentDidUpdate() {
    if (this.props.user.loggedIn) {
      this.setState({
        loadingUser: false,
        loadingDriver: false
      });

      if (this.props.user.type === "user") {
        this.props.navigation.navigate("Main");
      } else {
        this.props.navigation.navigate("MainDriver");
      }
    }
  }

  render() {
    return (
      <LinearGradient
        colors={["rgba(121, 113, 234, 0.1)", "rgba(26, 44, 91, 0.7)"]}
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start"
        }}
      >
        <View style={styles.container}>
          <View style={styles.image}>
            <Image source={require("../assets/images/intro1.gif")} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>AutoConnect</Text>
          </View>

          <View style={styles.btnContainer}>
            <View style={styles.btn}>
              <Button
                title="Login as User"
                icon={
                  <Icon
                    name="logo-google"
                    size={25}
                    style={{ paddingRight: 10 }}
                    color="#D3D3D3"
                  />
                }
                buttonStyle={{
                  width: 300,
                  backgroundColor: "#1a2c5b"
                  //   borderRadius: 20
                }}
                loadingStyle={{ width: 300, height: 23 }}
                titleStyle={{
                  color: "#ccc",
                  fontSize: 20,
                  fontFamily: "roboto-bold"
                }}
                onPress={this.signInUser}
                loading={this.state.loadingUser}
              />
            </View>
            <View style={styles.btn}>
              <Button
                title="Login as Auto Driver"
                buttonStyle={{
                  width: 300,
                  backgroundColor: "#1a2c5b"
                  //   borderRadius: 20
                }}
                loadingStyle={{ width: 300, height: 23 }}
                icon={
                  <Icon
                    name="logo-google"
                    size={25}
                    style={{ paddingRight: 10 }}
                    color="#D3D3D3"
                  />
                }
                titleStyle={{
                  color: "#ccc",
                  fontSize: 20,
                  fontFamily: "roboto-bold"
                }}
                onPress={this.signInDriver}
                loading={this.state.loadingDriver}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>WelcomeScreen</Text>
  //       <View>
  //         <View style={{ padding: 10 }}>
  //           <Button
  //             title="SignIn as User"
  //             onPress={this.signInUser}
  //             loading={this.state.loadingUser}
  //           />
  //         </View>
  //         <View style={{ padding: 10 }}>
  //           <Button
  //             onPress={this.signInDriver}
  //             title="SignIn as Auto Driver"
  //             loading={this.state.loadingDriver}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    loginDriver
  }
)(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30
  },
  btnContainer: {
    width: "100%",
    padding: 20,
    paddingTop: 60
  },
  btn: {
    width: "100%",
    margin: 5
  },
  textContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30
  },
  heading: {
    color: "#DDDDDD",
    fontSize: 40,
    fontFamily: "roboto-light"
  }
});
