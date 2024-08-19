import { NavigationContainer } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Login from "./screens/login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AddPost from "./screens/AddPost";
import SearchUser from "./screens/SearchUser";
import DetailPost from "./screens/DetailPost";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ApolloProvider } from "@apollo/client";
import { AuthContext } from "./contexts/AuthContext";
import client from "./config/apollo";
import AppNavigator from "./navigators/AppNavigator";


export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // const TabNav = (
  //   <Tab.Navigator>
  //     <Tab.Screen
  //       name="TabNav"
  //       component={Home}
  //       options={{ headerShown: false }}
  //     />
  //   </Tab.Navigator>
  // );
  // useEffect(() => {
  //   async function checkToken() {
  //     const result = await SecureStore.getItemAsync("accessToken");
  //     if (result) setIsSignedIn(true);
  //     setLoading(false);
  //   }
  //   checkToken();
  // }, []);
  // if (loading) return <></>;
  return (
    <>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={{isSignedIn, setIsSignedIn}}>
          <AppNavigator/>
        </AuthContext.Provider>
      </ApolloProvider>
    </>
  );
}


