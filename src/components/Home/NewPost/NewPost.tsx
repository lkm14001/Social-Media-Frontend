import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  IconButton,
  Snackbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addPostAsync,
  getLoggedInUserDataAsync,
  userState,
} from "../../../redux/slices/userSlice/userSlice";

import { MdPhotoSizeSelectActual } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { FaSquarePollVertical } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdPublish } from "react-icons/md";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase-config";
import { v4 as uuidv4 } from "uuid";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewPost = () => {
  const theme = useTheme();

  const mdSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(userState).loggedInUser;

  const [postContent, setPostContent] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<any>(null);
  const [preview, setPreview] = useState<string>("");

  const [action, setAction] = useState<{ message: string; type: string }>({
    message: "",
    type: "",
  });
  const [postSnackOpen, setpostSnackOpen] = useState(false);

  const handlePostSnackClick = () => {
    setpostSnackOpen(true);
  };

  const handlePostSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setpostSnackOpen(false);
  };

  const imagePreviewHandler = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      setImage(fileInputRef.current.files[0]);
      setPreview(URL.createObjectURL(fileInputRef.current.files[0]));
    }
  };

  const imageSelectHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearPhotoHandler = () => {
    setImage(null);
    setPreview("");
  };

  const publishPost = () => {
    const id = uuidv4();
    const picRef = ref(
      storage,
      `${process.env.REACT_APP_FIREBASE_STORAGE_POSTS}/${loggedInUser.email}/${id}`
    );
    uploadBytes(picRef, image).then(() => {
      getDownloadURL(picRef).then((url) => {
        const postData = {
          email: loggedInUser.email,
          post: {
            content: postContent,
            image: url,
            user: loggedInUser._id,
          },
        };
        dispatch(addPostAsync(postData)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setAction({ message: res.payload, type: "success" });
            handlePostSnackClick();
            setImage(null);
            setPreview("");
            setPostContent("");
            dispatch(getLoggedInUserDataAsync());
          } else {
            setAction({ message: res.payload, type: "error" });
          }
        });
      });
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 3,
        py: 3,
        gap: 3,
        borderRadius: 4,
        flexWrap: "wrap",
        // flexBasis:'20%',
        backgroundColor: "background.widget",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          gap: 1.5,
          alignItems: "start",
          // flexWrap:'wrap',
        }}
      >
        <Avatar
          alt="Profile"
          src={loggedInUser.profilePicture}
          sx={{
            width: 50,
            height: 50,
            // border: "1px solid",
            // borderColor:'border.color'
          }}
        />

        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            value={postContent}
            placeholder="Share yout thoughts with your friends...!"
            onChange={(e: any) => setPostContent(e.target.value)}
            InputProps={{
              sx: {
                borderRadius: 10,
                backgroundColor: "field.background",
                "& fieldset": {
                  outline: 0,
                  border: 0,
                },
              },
            }}
          />
          {preview && (
            <>
              <Box
                component="div"
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    minWidth: "100%",
                    minHeight: "10rem",
                    maxHeight: "15rem",
                    borderRadius: 5,
                    // objectFit:'fill'
                  }}
                  src={preview}
                />
                <IconButton
                  aria-label=""
                  onClick={clearPhotoHandler}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }}
                >
                  <RxCross2 color="white" />
                </IconButton>
              </Box>
            </>
          )}
          <input
            type="file"
            hidden
            name="profilePic"
            ref={fileInputRef}
            onChange={imagePreviewHandler}
          />
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              flexWrap: "wrap",
              "& > *": {
                flexShrink: 1,
              },
              gap: 2.5,
            }}
          >
            <Button
              startIcon={<MdPhotoSizeSelectActual />}
              size={mdSmallScreen ? "small" : "large"}
              sx={(theme) => ({
                [theme.breakpoints.down("sm")]: {
                  px: 2,
                },
                px:5,
                borderRadius: 10,
              })}
              variant="postButton"
              onClick={imageSelectHandler}
            >
              Photo
            </Button>
            <Button
              startIcon={<IoVideocam />}
              size={mdSmallScreen ? "small" : "large"}
              sx={(theme) => ({
                [theme.breakpoints.down("sm")]: {
                  px: 2,
                },
                px:5,
                borderRadius: 10,
              })}
              variant="postButton"
            >
              Video
            </Button>
            <Button
              startIcon={<FaSquarePollVertical />}
              size={mdSmallScreen ? "small" : "large"}
              sx={(theme) => ({
                [theme.breakpoints.down("sm")]: {
                  px: 2,
                },
                px:5,
                borderRadius: 10,
              })}
              variant="postButton"
            >
              Poll
            </Button>
            <Button
              sx={(theme) => ({
                [theme.breakpoints.down("sm")]: {
                  px: 2,
                },
                px:5,
                borderRadius: 10,
              })}
              size={mdSmallScreen ? "small" : "large"}
              variant="postButton"
              startIcon={<MdPublish />}
              onClick={publishPost}
            >
              Post
            </Button>
            <Snackbar
              open={postSnackOpen}
              autoHideDuration={6000}
              onClose={handlePostSnackClose}
            >
              <Alert
                onClose={handlePostSnackClose}
                severity={action.type as "error" | "success"}
                sx={{ width: "100%" }}
              >
                {action.message}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default NewPost;
