import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Button,
} from "react-native";

const PROFILE = gql`
  query ExampleQuery {
    posts {
      _id
      content
      tags
      imgUrl
      AuthorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      Author {
        username
        email
        _id
      }
    }
  }
`;


export default function Home() {
  const navigation = useNavigation();
  // const data1 = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor",
  //     time: "1 days a go",
  //     image: "https://bootdey.com/image/400x200/5F9EA0/000000",
  //   },
  //   {
  //     id: 2,
  //     title: "Sit amet, consectetuer",
  //     time: "2 minutes a go",
  //     image: "https://bootdey.com/image/400x200/FF7F50/000000",
  //   },
  //   {
  //     id: 3,
  //     title: "Dipiscing elit. Aenean ",
  //     time: "3 hour a go",
  //     image: "https://bootdey.com/image/400x200/6495ED/000000",
  //   },
  //   {
  //     id: 4,
  //     title: "Commodo ligula eget dolor.",
  //     time: "4 months a go",
  //     image: "https://bootdey.com/image/400x200/8A2BE2/000000",
  //   },
  //   {
  //     id: 5,
  //     title: "Aenean massa. Cum sociis",
  //     time: "5 weeks a go",
  //     image: "https://bootdey.com/image/400x200/008B8B/000000",
  //   },
  //   {
  //     id: 6,
  //     title: "Natoque penatibus et magnis",
  //     time: "6 year a go",
  //     image: "https://bootdey.com/image/400x200/9932CC/000000",
  //   },
  //   {
  //     id: 7,
  //     title: "Dis parturient montes, nascetur",
  //     time: "7 minutes a go",
  //     image: "https://bootdey.com/image/400x200/00CED1/000000",
  //   },
  //   {
  //     id: 8,
  //     title: "Ridiculus mus. Donec quam",
  //     time: "8 days a go",
  //     image: "https://bootdey.com/image/400x200/1E90FF/000000",
  //   },
  //   {
  //     id: 9,
  //     title: "Felis, ultricies nec, pellentesque",
  //     time: "9 minutes a go",
  //     image: "https://bootdey.com/image/400x200/FF69B4/000000",
  //   },
  // ];

  // const [posts, setPosts] = useState(data1);
  const { data, loading, error } = useQuery(PROFILE);
  // console.log(data.posts);
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddPost")}
        >
          <Text style={styles.buttonText}>Add Post</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={data?.posts}
        keyExtractor={(item) => {
          return item._id;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={(post) => {
          const item = post.item;
          return (
            // <TouchableOpacity onPress={() => navigation.navigate("DetailPost")}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("DetailPost")}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{item.Author.username}</Text>
                  {/* <Text style={styles.time}>{item.time}</Text> */}
                </View>
              </View>

              <Image style={styles.cardImage} source={{ uri: item.imgUrl }} />
              <Text style={styles.title}>{item.content}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.socialBarContainer}>
                  <View style={styles.socialBarSection}>
                    <TouchableOpacity style={styles.socialBarButton}>
                      <Image
                        style={styles.icon}
                        source={{
                          uri: "https://img.icons8.com/color/70/000000/heart.png",
                        }}
                      />
                      <Text style={styles.socialBarLabel}>78</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.socialBarSection}>
                    <TouchableOpacity style={styles.socialBarButton}>
                      <Image
                        style={styles.icon}
                        source={{
                          uri: "https://img.icons8.com/color/70/000000/comments.png",
                        }}
                      />
                      <Text style={styles.socialBarLabel}>25</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            // </TouchableOpacity>
          );
        }}
      />
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    // backgroundColor:"red"
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: "#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 2,
    backgroundColor: "white",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "purple"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    // backgroundColor:"green"
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  time: {
    fontSize: 13,
    color: "#808080",
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarLabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4267B2",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
