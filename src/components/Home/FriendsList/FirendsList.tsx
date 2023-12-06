import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  IUser,
  getuserAsync,
  userState,
} from "../../../redux/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const FirendsList = () => {
  const friendList = useAppSelector(userState).loggedInUser.following;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        width: "18%",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "space-between",
        gap: 3,
        // maxHeight:'60%',
        height: 600,
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        borderRadius: 4,
        backgroundColor: "background.widget",
        [theme.breakpoints.down('lg')]:{
          display:'none'
        }
      })}
    >
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: "bolder",
          //   letterSpacing: "px",
          fontFamily: "Agbalumo",
        }}
      >
        Friends List
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          //   hieght:"60%"
        }}
      >
        {friendList.map((friend: IUser, key: any) => (
          <Box
            component="div"
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              cursor:'pointer'
            }}
            key={key}
            onClick={() =>
              dispatch(getuserAsync(friend._id)).then(() =>
                navigate(`/profile/${friend._id}`)
              )
            }
          >
            <Avatar
              src={friend.profilePicture}
              alt="profile"
              sx={{ width: 60, height: 60 }}
            />
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography>
                {friend.firstName + " " + friend.lastName}
              </Typography>
              <Typography>{"@" + friend.username}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default FirendsList;
