// import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { useContext } from "react"
// import { TouchableOpacity } from "react-native";
// import * as SecureStore from "expo-secure-store";
// import DetailPost from "../screens/DetailPost";

// const Stack = createNativeStackNavigator();

// export default function StackNavigator() {
//     const {isSignedIn, setIsSignedIn} = useContext(AuthContext)
//     return(
//         <Stack.Navigator>
//             {isSignedIn ? (
//                 <>
//                 <Stack.Screen
//                 name="Home"
//                 component={Home}
//                 options={{
//                     headerRight: ()=> {
//                         return(
//                             <TouchableOpacity
//                             onPress={async()=>{
//                                 await SecureStore.deleteItemAsync("access_Token");
//                                 setIsSignedIn(false);
//                             }}
//                             >
//                                 <Text>Logout</Text>
//                             </TouchableOpacity>
//                         )
//                     }
//                 }}
//                 />
//                 <Stack.Screen name="DetailPost" component={DetailPost}/>
//                 </>
//             ):(
//                 <>
//                 <Stack.Screen name="Login" component={Login}/>
//                 </>
//             )}
//         </Stack.Navigator>
//     )
// }