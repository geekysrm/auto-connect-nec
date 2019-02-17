import React from "react";
import { StyleSheet, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const styles = StyleSheet.create({
  image: {
    width: 500,
    height: 320
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff"
  },
  text: {
    fontSize: 20,
    color: "#fff"
  },
  secondSlideTitle: {
    fontSize: 40,
    color: "#fff"
  },
  thirdSlideTitle: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 33,
    color: "#111111"
  },
  thirdSlideText: {
    fontSize: 20,
    color: "#111111"
  },
  fourthImage: {
    width: 500,
    height: 500
  },
  fourthSlideTitle: {
    fontSize: 35,
    color: "#111111",
    marginTop: 25
  }
});

const slides = [
  {
    key: "intro1",
    title: "AutoConnect",
    titleStyle: styles.title,
    text: "🔗 Connecting 🔗\nPeople 🧑 with Autos 🚦",
    textStyle: styles.text,
    image: require("../assets/images/intro1.gif"),
    imageStyle: styles.image,
    backgroundColor: "#3d447a"
  },
  {
    key: "intro2",
    title: "Auto routes",
    text: "Get the official routes as decided by the Transport Authority.",
    image: require("../assets/images/intro2.png"),
    imageStyle: styles.image,
    backgroundColor: "#265c56",
    titleStyle: styles.secondSlideTitle,
    textStyle: styles.text
  },
  {
    key: "intro3",
    title: "Live Auto Status",
    text: "Get the live status of autos or your next passenger",
    image: require("../assets/images/intro3.png"),
    imageStyle: styles.image,
    backgroundColor: "#fff",
    titleStyle: styles.thirdSlideTitle,
    textStyle: styles.thirdSlideText
  },
  //Change below slide
  {
    key: "intro4",
    title: "Integrated payment system",
    text: "No need to worry for change now!",
    image: require("../assets/images/intro4.png"),
    imageStyle: styles.fourthImage,
    backgroundColor: "#f3d372",
    titleStyle: styles.fourthSlideTitle,
    textStyle: styles.thirdSlideText
  }
];

export default class App extends React.Component {
  state = {
    showRealApp: false
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
    this.props.navigation.navigate("Welcome");
  };
  render() {
    // if (this.state.showRealApp) {
    //   return <App />;
    // } else {
    return (
      <AppIntroSlider
        bottomButton
        doneLabel="Get Started"
        slides={slides}
        onDone={this._onDone}
      />
    );
    //}
  }
}
