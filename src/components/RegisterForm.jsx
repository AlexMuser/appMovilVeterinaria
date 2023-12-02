import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./utils/conn"
import { validateEmail } from "./utils/validations"

const RegisterForm = ({ changeForm }) => {
  const auth = getAuth(app);
  const [formData, setFormData] = useState(initialsValue());
  const [formError, setFormError] = useState(initialsValueErrors());

  function initialsValue() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
    };
  }

  function initialsValueErrors() {
    return {
      email: false,
      password: false,
      repeatPassword: false,
    };
  }

  const register = () => {
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      setFormError({
        email: !formData.email ? true : false,
        password: !formData.password ? true : false,
        repeatPassword: !formData.repeatPassword ? true : false,
      });
    }
    if (!validateEmail(formData.email)) {
      setFormError({
        email: true,
        password: false,
        repeatPassword: false,
      });
    }
    if (formData.password !== formData.repeatPassword) {
      setFormError({
        email: false,
        password: true,
        repeatPassword: true,
      });
    }
    if (
      formData.email &&
      formData.password &&
      formData.repeatPassword &&
      validateEmail(formData.email) &&
      formData.password === formData.repeatPassword
    ) {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    }
  };

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

      <TextInput
        style={[
          styles.input,
          formError.repeatPassword && { borderColor: 'red' },
        ]}
        placeholder="Repetir contraseña"
        placeholderTextColor="#dabdc1"
        secureTextEntry={true}
        onChange={(e) => {
          setFormData({ ...formData, repeatPassword: e.nativeEvent.text });
        }}
      />
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.textBtn}>Registrar</Text>
      </TouchableOpacity>
      <View style={[styles.login, styles.buttonLogin]}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.textBtn}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterForm;

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
