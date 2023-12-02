import { StyleSheet, View, Text, Image } from "react-native";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.viewAuth}>
      <Image style={styles.logo} source={require("../../assets/veterinaria.png")} />
      {isLogin ? (
        <LoginForm changeForm={changeForm} />
      ) : (
        <RegisterForm changeForm={changeForm} />
      )}
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  viewAuth: {
    backgroundColor: "#e2fffe",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: "70%",
    height: 250,
    marginTop: 50,
    marginBottom: 50,
  },
});
