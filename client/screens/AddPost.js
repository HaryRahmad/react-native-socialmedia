import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { PROFILE } from "./Home";

const ADD_POST = gql`
  mutation Mutation($content:String, $imgUrl:String, $tags:[String]) {
  addPost(content:$content, imgUrl:$imgUrl, tags:$tags)
}
`;
export default function AddPost() {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");
  const navigation = useNavigation();
  //   console.log(tags.tags, imgUrl, content);
  const [addPost, { loading, error, data }] = useMutation(ADD_POST, {
    refetchQueries: [ PROFILE ]});

  const handleSubmit = async () => {
    try {
      //loading
      // .map((el) => el.trim())
      console.log(tags, content, imgUrl);
      const tagsArr = tags.split(",");
      await addPost({ variables: { content:content, imgUrl:imgUrl, tags: tagsArr } });
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
    }
  };
  //   console.log(handleAddPost);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Content"
            keyboardType="text"
            underlineColorAndroid="transparent"
            value={content}
            onChangeText={setContent}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="ImgUrl"
            keyboardType="text"
            underlineColorAndroid="transparent"
            value={imgUrl}
            onChangeText={setImgUrl}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="tags"
            keyboardType="text"
            underlineColorAndroid="transparent"
            value={tags}
            onChangeText={setTags}
          />
        </View>
        <View>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.loginText}>handle button</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
    paddingTop: 50,
    // height:70,
    // width:70
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: "white",
  },
  btnText: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
});
