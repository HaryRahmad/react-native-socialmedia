import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Definisi query untuk pencarian pengguna berdasarkan username
const SEARCH = gql`
  query Query($username: String!) {
    search(username: $username) {
      _id
      name
      username
      email
      createdAt
      updatedAt
    }
  }
`;

// Definisi mutasi untuk mengikuti pengguna
const FOLLOW = gql`
  mutation Mutation($followingId: String!) {
    addFollow(followingId: $followingId)
  }
`;

export default function SearchUser() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [executeSearch, { data, loading, error }] = useLazyQuery(SEARCH);

  const [addFollow] = useMutation(FOLLOW, {
    onError: (err) => console.error(err),
    onCompleted: () => Alert.alert("Success", "Mengikuti"),
  });

  const handleSearchPress = () => {
    if (query) {
      executeSearch({ variables: { username: query } });
    } else {
      Alert.alert("Alert", "masukan username");
    }
  };

  useEffect(() => {
    if (data) {
      setResults(data.search);
    }
  }, [data]);

  const handleFollowPress = (userId) => {
    addFollow({ variables: { followingId: userId } });
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Find User..."
            underlineColorAndroid="transparent"
            onChangeText={setQuery}
            value={query}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSearchPress}>
          <Image
            style={[styles.icon, styles.iconBtnSearch]}
            source={{
              uri: "https://img.icons8.com/color/70/000000/search.png",
            }}
          />
        </TouchableOpacity>
      </View>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {data && data.search.length === 0 && <Text>User not found</Text>}
      <FlatList
        style={styles.notificationList}
        enableEmptySections={true}
        data={results}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.notificationBox}>
            <Image
              style={styles.image}
              source={{
                uri: "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg",
              }}
            />
            <Text style={styles.description}>{item.name}</Text>
            <TouchableOpacity
              style={styles.followButton}
              onPress={() => handleFollowPress(item._id)}
            >
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  formContent: {
    flexDirection: "row",
    marginTop: 5,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  saveButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: 70,
    alignSelf: "flex-end",
    backgroundColor: "#40E0D0",
    borderRadius: 2,
  },
  saveButtonText: {
    color: "white",
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 5,
  },
  image: {
    width: 45,
    height: 45,
  },
  description: {
    fontSize: 18,
    color: "#3498db",
    marginLeft: 10,
  },
  followButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    
  },
  followButtonText: {
    color: "white",
    fontSize: 16,
  },
});
