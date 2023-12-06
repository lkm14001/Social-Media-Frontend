import Paper from "@mui/material/Paper";
import React from "react";
import Bio from "./Bio/Bio";
import { Box } from "@mui/material";
import NewPost from "./NewPost/NewPost";
import FirendsList from "./FriendsList/FirendsList";
import PostsList from "./PostsList/PostsList";

const Home = () => {
  return (
    <>
      <Paper
        elevation={0}
        square
        sx={(theme) => ({
          backgroundColor: "background.mode",
          minHeight: "90vh",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          [theme.breakpoints.down("sm")]: {
            p: 3,
          },
          p: 5,
          // "& > *":{
          //   flex:"1 1"
          // }
        })}
      >
        <Bio />
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            flexGrow: 2,
            // flexBasis:"60%"
          }}
        >
          <NewPost />
          <PostsList />
        </Box>
        <FirendsList />
      </Paper>
    </>
  );
};

export default Home;
