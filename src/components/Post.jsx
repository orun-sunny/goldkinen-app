import { useState } from "react";
import { FaUser } from "react-icons/fa";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Post = ({ post, user }) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
    setLoadingComments(false);
  };

  const handleToggleComments = () => {
    if (!showComments && comments.length === 0) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <div className="flex">
          <FaUser size={35} className="border-2 rounded-full bg-gray-50" /> by{" "}
          <Typography
            className="w-35"
            variant="subtitle1"
            color="textSecondary"
          >
            "{user ? user.name : "Unknown User"}
          </Typography>
        </div>
        <Typography variant="body1">{post.body}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleToggleComments}
          style={{ marginTop: "10px" }}
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </Button>
        {loadingComments && (
          <CircularProgress size={24} style={{ marginLeft: "10px" }} />
        )}
        <Collapse in={showComments}>
          <CardContent className="bg-slate-100 p-4 rounded-lg shadow-lg mb-3">
            {comments.map((comment) => (
              <Card key={comment.id} style={{ marginTop: "10px" }}>
                <CardContent>
                  <Typography variant="subtitle1">{comment.name}</Typography>
                  <Typography variant="body2">{comment.body}</Typography>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default Post;
