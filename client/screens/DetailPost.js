import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function DetailPost() {
  const post = {
    id: 1,
    title: "Belajar mengcoding",
    image: "https://www.bootdey.com/image/280x280/6495ED/000000",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    comments: [
      {
        id: 1,
        author: "Jane Doe",
        authorAvatar: "https://www.bootdey.com/img/Content/avatar/avatar2.png",
        text: "Great post!",
      },
      {
        id: 2,
        author: "John Smith",
        authorAvatar: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
        text: "I agree, this was a very informative and well-written post.",
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <Image source={{ uri: post.image }} style={styles.image} />
      <Text style={styles.sectionTitle}>Comments</Text>
      <FlatList
        data={post.comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Image
              source={{ uri: item.authorAvatar }}
              style={styles.commentAvatar}
            />
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentAuthor}>{item.author}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 0,
      padding: 20,
    //   backgroundColor:"red"
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    image: {
      height: 200,
      marginVertical: 20,
    },
    content: {
      fontSize: 16,
      lineHeight: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 30,
    },
    commentContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    commentAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    commentTextContainer: {
      marginLeft: 10,
    },
    commentAuthor: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    commentText: {
      fontSize: 16,
    },
})  
