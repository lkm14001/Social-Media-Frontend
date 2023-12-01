import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import {
  IPosts,
  IUser,
  userState,
} from "../../../redux/slices/userSlice/userSlice";
import Post from "../Post/Post";
import { Box } from "@mui/material";

const PostsList = () => {
  const posts = useAppSelector(userState).friendsPosts;
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      {posts.map((post: IPosts, key: any) => (
        <Post
          username={(post.user as IUser).username}
          comments={post.comments}
          content={post.content}
          firstName={(post.user as IUser).firstName}
          lastName={(post.user as IUser).lastName}
          image={post.image}
          profilePic={(post.user as IUser).profilePicture}
          key={key}
        />
      ))}
    </Box>
  );
};

export default PostsList;
