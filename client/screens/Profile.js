import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import client from "../config/apollo";
import { gql, useQuery } from "@apollo/client";

const USERS = gql`
  query findById {
    findById {
      _id
      name
      username
      email
      password
      createdAt
      updatedAt
      followerDetail {
        _id
        name
        username
      }
      followingDetail {
        _id
        name
        username
      }
    }
  }
`;
export default function Profile() {
  const navigation = useNavigation();
  const { data, loading, error } = useQuery(USERS);
  // console.log(data.findById[0],`---------`);
  // console.log(useContext(AuthContext));
  const dataProfile = data?.findById[0];
  const handleOutPress = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    // client.clearStore()
    setIsSignedIn("false");
    // navigation.navigate("Login")
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.coverPhoto}
          source={{
            uri: "https://www.bootdey.com/image/280x280/1E90FF/1E90FF",
          }}
        />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
            }}
          />
          <Text style={styles.nameText}>{dataProfile?.name}</Text>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{dataProfile?.username}</Text>
      </View>
      <View style={styles.statsContainer}>
        {/* <View style={styles.statContainer}>
          <Text style={styles.statCount}>1234</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View> */}
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>{dataProfile?.followerDetail.length}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>{dataProfile?.followingDetail.length}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOutPress}>
        <Text style={styles.buttonText}>LogOut</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
  },
  coverPhoto: {
    width: "100%",
    height: 200,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  statContainer: {
    alignItems: "center",
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#999",
  },
  button: {
    backgroundColor: "#0066cc",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
