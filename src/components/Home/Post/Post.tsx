import {
  Avatar,
  Box,
  Paper,
  Typography,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import {
  IComments,
  addCommentAsync,
  deletePostAsync,
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
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import EditPost from "./EditPost";

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
  // handlePostModalClose:() => void;
}

interface DeleteModalProps {
  deleteModalOpen: boolean;
  handleDeleteModalClose: () => void;
  deletePostHandler: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.widget",
  boxShadow: 24,
  p: 4,
};

const DeleteModal = ({
  deleteModalOpen,
  handleDeleteModalClose,
  deletePostHandler,
}: DeleteModalProps) => {
  return (
    <>
      <Modal open={deleteModalOpen} onClose={handleDeleteModalClose}>
        <Paper elevation={0} sx={style}>
          <Typography>Are you sure to delete the post?</Typography>
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={deletePostHandler}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteModalClose}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

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
    // handlePostModalClose
  }) => {
    const dispatch = useAppDispatch();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleDeleteModalOpen = () => setDeleteModalOpen(true);
    const handleDeleteModalClose = () => setDeleteModalOpen(false);
    const handleEditModalOpen = () => setEditModalOpen(true);
    const handleEditModalClose = () => setEditModalOpen(false);

    const [commentOpen, setCommentOpen] = useState<boolean>(false);
    const [commentContent, setCommentContent] = useState<string>("");
    const commentSectionHandler = () => {
      setCommentOpen(!commentOpen);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handlePostMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handlePostMenuClose = () => {
      setAnchorEl(null);
    };

    const editPostHandler = () => {
      //open edit Modal
      handleEditModalOpen();
      //close menu
      handlePostMenuClose();
    };

    const deletePostHandler = () => {
      //open delete Modal
      const payload = {
        postId: postId,
        userId: userId,
      };
      dispatch(deletePostAsync(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(getLoggedInUserDataAsync());
        }
      });
      //close menu
      handlePostMenuClose();
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
          setCommentContent("");
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
              <IconButton onClick={handlePostMenuOpen}>
                <HiDotsVertical />
              </IconButton>
            </Box>
          </>
        )}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handlePostMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={editPostHandler}
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "center",
              }}
            >
              <FaEdit />
              <Typography>Edit Post</Typography>
            </Box>
          </MenuItem>
          <MenuItem
            onClick={handleDeleteModalOpen}
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "center",
              }}
            >
              <MdDelete />
              <Typography>Delete Post</Typography>
            </Box>
          </MenuItem>
        </Menu>

        <Modal open={editModalOpen} onClose={handleEditModalClose}>
          <>
            <EditPost
              postContent={content}
              postImage={image}
              postId={postId}
              handleEditModalClose={handleEditModalClose}
            />
          </>
        </Modal>

        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          deletePostHandler={deletePostHandler}
          handleDeleteModalClose={handleDeleteModalClose}
        />

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
                <>
                  <Box
                    key={key}
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
                </>
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
