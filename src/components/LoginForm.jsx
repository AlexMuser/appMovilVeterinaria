import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./utils/conn";

const LoginForm = ({ changeForm }) => {
  const auth = getAuth(app);
  const [formData, setFormData] = useState(initialsValue());
  const [formError, setFormError] = useState(initialsValueErrors());

  function initialsValue() {
    return {
      email: "",
      password: "",
    };
  }

  function initialsValueErrors() {
    return {
      email: false,
      password: false,
    };
  }

  const login = () => {
    if (!formData.email || !formData.password) {
      setFormError({
        email: !formData.email ? true : false,
        password: !formData.password ? true : false,
      });
    } else {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  }

  return (
    <>
      <TextInput
        style={[
          styles.input,
          formError.email && { borderColor: 'red' },
        ]}
        placeholder="Correo electronico"
        placeholderTextColor="#dabdc1"
        onChange={(e) => {
          setFormData({ ...formData, email: e.nativeEvent.text });
        }}
      />

      <TextInput
        style={[
          styles.input,
          formError.password && { borderColor: 'red' },
        ]}
        placeholder="Escribir contraseña"
        placeholderTextColor="#dabdc1"
        secureTextEntry={true}
        onChange={(e) => {
          setFormData({ ...formData, password: e.nativeEvent.text });
        }}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.textBtn}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <View style={[styles.login, styles.buttonLogin]}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.textBtn}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  textBtn: {
    color: "#5c4a47",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#d7929c",
    padding: 15,
    borderRadius: 40,
    width: "40%",
    alignItems: "center",
  },
  input: {
    height: 50,
    color: "#fff",
    width: "80%",
    backgroundColor: "#d7929c",
    borderRadius: 40,
    borderColor: "#d7929c",
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  login: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  buttonLogin: {
    alignItems: "center",
    marginBottom: 50,
  },
});
