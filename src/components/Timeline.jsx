import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import { CircularProgress, Container } from "@mui/material";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/posts"),
          axios.get("https://jsonplaceholder.typicode.com/users"),
        ]);

        const sortedPosts = postsResponse.data.sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
        setUsers(usersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchPostsAndUsers();
  }, []);

  const findUserById = (userId) => users.find((user) => user.id === userId);

  if (loading) {
    return (
      <Container
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      {posts.map((post) => (
        <Post key={post.id} post={post} user={findUserById(post.userId)} />
      ))}
    </Container>
  );
};

export default Timeline;
