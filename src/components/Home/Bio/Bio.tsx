import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getuserAsync,
  userState,
} from "../../../redux/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const Bio = () => {
  const loggedInUser = useAppSelector(userState).loggedInUser;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <Paper
      elevation={0}
      square
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        p: 2.5,
        backgroundColor: "background.widget",
        borderRadius: 4,
        width: "20%",
        height: "min-content",
        justifySelf: "start",
        // flexBasis:"20%"
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          // gap: 1.5,
        }}
      >
        <Avatar
          alt="Profile"
          src={loggedInUser.profilePicture}
          sx={{
            width: 100,
            height: 100,
            alignSelf: "center",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            // backgroundColor:'green'
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              mb: -1,
              alignSelf: "center",
            }}
          >
            {loggedInUser.firstName + " " + loggedInUser.lastName}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "subtitle2.color",
              alignSelf: "center",
            }}
          >
            {"@" + loggedInUser.username}
          </Typography>
        </Box>
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Agbalumo",
              fontSize: "1.2rem",
              fontWeight: "bolder",
            }}
          >
            Followers
          </Typography>
          <Typography
            sx={{
              fontFamily: "Agbalumo",
              fontSize: "1.2rem",
              fontWeight: "bolder",
            }}
          >
            {loggedInUser.followers.length}
          </Typography>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Agbalumo",
              fontSize: "1.2rem",
              fontWeight: "bolder",
            }}
          >
            Following
          </Typography>
          <Typography
            sx={{
              fontFamily: "Agbalumo",
              fontSize: "1.2rem",
              fontWeight: "bolder",
            }}
          >
            {loggedInUser.following.length}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2">{loggedInUser.bio}</Typography>
      <Divider />
      <Button
        size="large"
        sx={{
          px: 5,
          py: 1.5,
          borderRadius: 3,
        }}
        variant="postButton"
        onClick={() => {
          dispatch(getuserAsync(loggedInUser._id)).then(() =>
            navigate(`/profile/${loggedInUser._id}`)
          );
        }}
      >
        My Profile
      </Button>
    </Paper>
  );
};

export default Bio;
