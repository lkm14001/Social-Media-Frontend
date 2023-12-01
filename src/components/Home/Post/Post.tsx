import {
  Avatar,
  Box,
  Paper,
  Typography,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import {
  IComments,
  addCommentAsync,
  getFriendsPosts,
  getLoggedInUserDataAsync,
  getUpdatedPostAsync,
  userState,
} from "../../../redux/slices/userSlice/userSlice";

import { FiHeart } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { FaImage } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

interface PostProps {
  postId: string;
  profilePic: string;
  username: string;
  firstName: string;
  lastName: string;
  comments: Array<IComments>;
  image: string;
  content: string;
  userId: string;
}

const Post: React.FC<PostProps> = React.memo(
  ({
    postId,
    userId,
    profilePic,
    username,
    firstName,
    lastName,
    comments,
    image,
    content,
  }) => {
    const dispatch = useAppDispatch();
    const [commentOpen, setCommentOpen] = useState<boolean>(false);
    const [openPostMenu, setOpenPostMenu] = useState<boolean>(false);
    const [commentContent, setCommentContent] = useState<string>("");
    const commentSectionHandler = () => {
      setCommentOpen(!commentOpen);
    };

    const commentSubmitHandler = (
      e: React.KeyboardEvent | React.MouseEvent
    ) => {
      if (e.type === "click" || (e as React.KeyboardEvent).key === "Enter") {
        // submit comment
        const payload = {
          email: loggedInUser.email,
          postId,
          comment: commentContent,
        };
        dispatch(addCommentAsync(payload)).then((res) => {
          setCommentContent('')
          if (res.meta.requestStatus === "fulfilled") {
            dispatch(getLoggedInUserDataAsync()).then((res) => {
              if (res.meta.requestStatus === "fulfilled") {
                dispatch(getFriendsPosts());
                dispatch(getUpdatedPostAsync(postId));
              }
            });
          }
        });
      }
    };

    const loggedInUser = useAppSelector(userState).loggedInUser;

    return (
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "background.widget",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          borderRadius: 4,
          scrollbarWidth: "none",
          maxHeight: "70vh",
          position: "relative",
        }}
      >
        {userId === loggedInUser._id && (
          <>
            <Box
              component="div"
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
            >
              <IconButton onClick={() => setOpenPostMenu(true)}>
                <HiDotsVertical />
              </IconButton>
            </Box>
          </>
        )}
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            height: "100%",
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              //flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Avatar
              alt="Profile"
              src={profilePic}
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
                // width: "100%",
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
                {firstName + " " + lastName}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "subtitle2.color",
                  // alignSelf: "center",
                }}
              >
                {"@" + username}
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: "1.3rem",
            }}
          >
            {content}
          </Typography>
          <Box
            component="img"
            sx={{
              width: "100%",
              minWidth: "100%",
              minHeight: "15rem",
              maxHeight: "25rem",
              borderRadius: 5,
              // objectFit:'fill'
            }}
            src={image}
          />
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
            // onClick={}
            >
              <FiHeart />
            </IconButton>
            <IconButton onClick={commentSectionHandler}>
              <FaRegCommentDots />
            </IconButton>
            <IconButton
            // onClick={}
            >
              <IoMdShareAlt />
            </IconButton>
          </Box>
          {commentOpen && (
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {comments.map((comment: IComments, key: any) => (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignContent: "stretch",
                  }}
                >
                  <Box
                    sx={{
                      py: 1,
                      px: 2,
                      backgroundColor: "field.background",
                      borderRadius: 2,
                      gap: 1.3,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={comment.user?.profilePicture}
                        sx={{ width: 30, height: 30 }}
                      />
                      <Typography>{comment.user?.username}</Typography>
                    </Box>
                    <Typography sx={{}}>{comment.comment}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Divider />
        <Box
          component="div"
          sx={{
            display: "flex",
            // flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ width: 60, height: 60 }}
            src={loggedInUser.profilePicture}
          />
          <TextField
            variant="outlined"
            fullWidth
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            onKeyDown={commentSubmitHandler}
            placeholder="Write your comment...!"
            InputProps={{
              sx: {
                borderRadius: 10,
                backgroundColor: "field.background",
                "& fieldset": {
                  outline: 0,
                  border: 0,
                },
              },
              endAdornment: (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {commentContent && (
                    <>
                      <IconButton onClick={commentSubmitHandler}>
                        <IoSendSharp />
                      </IconButton>
                    </>
                  )}
                  <IconButton sx={{}}>
                    <FaImage />
                  </IconButton>
                </Box>
              ),
            }}
          />
        </Box>
      </Paper>
    );
  }
);

export default Post;
