import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import Login from "../screens/login";
import Register from "../screens/Register";
import AddPost from "../screens/AddPost";
import DetailPost from "../screens/DetailPost";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import * as SecureStore from "expo-secure-store";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../screens/Home";
import SearchUser from "../screens/SearchUser";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
export default function AppNavigator() {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  // console.log(isSignedIn);

  useEffect(() => {
    async function checkToken() {
      try {
        const result = await SecureStore.getItemAsync("accessToken");
        console.log(result, `aaaaaa`);
        if (result) {
          console.log("login app");
          setIsSignedIn(true);
        }else if (!result || result === "null") {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    checkToken();
  }, []);
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          {isSignedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={TopNav} //cuman tinggal cari ini
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="AddPost"
                component={AddPost}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="DetailPost"
                component={DetailPost}
                options={{ headerShown: true }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function TopNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="SearchUserTab"
        component={SearchUser}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
}
