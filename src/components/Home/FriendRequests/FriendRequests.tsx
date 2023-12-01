import {
  Avatar,
  Box,
  Popover,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  IUser,
  acceptFriendRequestAsync,
  getLoggedInUserDataAsync,
  getuserAsync,
  userState,
} from "../../../redux/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { BiSolidUserCheck } from "react-icons/bi";

interface FriendRequestsProps {
  anchor: HTMLButtonElement | null;
  setAnchorClose: () => void;
}

const FriendRequests: React.FC<FriendRequestsProps> = ({
  anchor,
  setAnchorClose,
}) => {
  const dispatch = useAppDispatch();
  const open = Boolean(anchor);

  const friendRequests = useAppSelector(userState).loggedInUser.friendRequests;
  const loggedInUser = useAppSelector(userState).loggedInUser;

  const acceptFriendRequestHandler = (friendId: string) => {
    const payload = {
      userId: loggedInUser._id,
      friendId: friendId,
    };
    dispatch(acceptFriendRequestAsync(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        // use socket.io to get details

        //dispatch updating user details
        dispatch(getLoggedInUserDataAsync());
      }
    });
  };

  const navigate = useNavigate()

  return (
    <Popover
      open={open}
      anchorEl={anchor}
      onClose={setAnchorClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        maxHeight: "55%",
      }}
    >
      <Box
        component="div"
        sx={{
          width: "20rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          py: 3,
          px: 1,
        }}
      >
        {friendRequests.length === 0 ? (
          <Typography>No Requests right now!</Typography>
        ) : (
          <>
            {friendRequests.map((friend: IUser, key: any) => (
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    //   p: 3,
                    width: "100%",
                    cursor:'pointer'
                    //   gap: 2,
                  }}
                  onClick={() =>
                    dispatch(getuserAsync(friend._id)).then(() =>
                      navigate(`/profile/${friend._id}`)
                    )
                  }
                  key={key}
                >
                  <Avatar
                    alt="profile"
                    src={friend.profilePicture}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        mb: -1,
                        color: "text.primary",
                      }}
                    >
                      {friend.username}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "subtitle2.color",
                      }}
                    >
                      {friend.firstName + " " + friend.lastName}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() => acceptFriendRequestHandler(friend._id)}
                  >
                    <BiSolidUserCheck />
                  </IconButton>
                  <Button
                    sx={{ color: "border.color" }}
                    //   onClick={}
                  >
                    Ignore
                  </Button>
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Popover>
  );
};

export default FriendRequests;
