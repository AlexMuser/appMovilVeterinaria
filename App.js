import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Auth from "./src/components/Auth";
import app from "./src/components/utils/conn";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Nav from "./src/components/Nav";

export default function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        //console.log("Usuario autenticado", uid.user);
        setUser(true);
        // ...
      } else {
        // User is signed out
        // ...
        //console.log("Usuario no logeado", user);
        setUser(false);
      }
    });
  }, [user]);

  //console.log(app);
  return (
    <>
      {user ? <Nav /> : <Auth />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2fffe",
  },
});
