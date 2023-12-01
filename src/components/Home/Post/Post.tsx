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
import { IComments } from "../../../redux/slices/userSlice/userSlice";

import { FiHeart } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { FaImage } from "react-icons/fa";

interface PostProps {
  profilePic: string;
  username: string;
  firstName: string;
  lastName: string;
  comments: Array<IComments>;
  image: string;
  content: string;
}

const Post: React.FC<PostProps> = ({
  profilePic,
  username,
  firstName,
  lastName,
  comments,
  image,
  content,
}) => {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const commentSectionHandler = () => {
    setCommentOpen(!commentOpen);
  };

  const commentSubmitHandler = (e:React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      // submit comment
    }
  }

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
      }}
    >
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
                key={key}
                sx={{
                  py: 1,
                  px: 2,
                  backgroundColor: "field.background",
                }}
              >
                <Typography>{comment.comment}</Typography>
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
        <Avatar sx={{ width: 60, height: 60 }} src={image} />
        <TextField
          variant="outlined"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
              <IconButton sx={{}}>
                <FaImage />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Paper>
  );
};

export default Post;
