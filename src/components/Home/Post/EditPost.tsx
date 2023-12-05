import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../config/firebase-config";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  editPostAsync,
  getLoggedInUserDataAsync,
  getuserAsync,
  userState,
} from "../../../redux/slices/userSlice/userSlice";
import { MdPhotoSizeSelectActual, MdPublish } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { FaSquarePollVertical } from "react-icons/fa6";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.widget",
  boxShadow: 24,
  gap: 2,
  p: 4,
};

interface EditPostProps {
  postContent: string;
  postImage: string;
  postId:string;
  handleEditModalClose:() => void;
}

const EditPost = ({ postContent, postImage,postId,handleEditModalClose }: EditPostProps) => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(userState).loggedInUser;
  const [newPostContent, setNewPostContent] = useState<string>(postContent);
  const [preview, setPreview] = useState<string>(postImage);
  const [image, setImage] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [action, setAction] = useState<{ message: string; type: string }>({
    message: "",
    type: "",
  });
  const [postSnackOpen, setpostSnackOpen] = useState(false);

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

  const editedPostContentHandler = () => {
    const token = postImage.split("?");
    const url = token[0].split("/");
    const imgUrl = url[url.length - 1]
      .replaceAll("%2F", "/")
      .replaceAll("%40", "@");
    // const urlSplit = imgUrl.split('/')
    // const IMAGE_NAME = urlSplit[urlSplit.length - 1]
    const picRef = ref(storage, imgUrl);
    uploadBytes(picRef, image).then(() => {
      getDownloadURL(picRef).then((url) => {
        const newPostData = {
          email: loggedInUser.email,
          postId:postId,
          post: {
            content: newPostContent,
            image: url,
            user: loggedInUser._id,
          },
        };
        dispatch(editPostAsync(newPostData)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setAction({ message: res.payload, type: "success" });
            handlePostSnackClick();
            setImage(null);
            setPreview("");
            setNewPostContent("");
            dispatch(getLoggedInUserDataAsync());
            dispatch(getuserAsync(loggedInUser._id))
            handleEditModalClose()
          } else {
            setAction({ message: res.payload, type: "error" });
          }
        });
      });
    });
  };
  return (
    <>
      <Paper elevation={0} sx={style}>
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
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Edit Your Post...!"
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
              gap: 2.5,
            }}
          >
            <Button
              startIcon={<MdPhotoSizeSelectActual />}
              size="large"
              sx={{
                px: 5,
                borderRadius: 10,
              }}
              variant="postButton"
              onClick={imageSelectHandler}
            >
              Photo
            </Button>
            <Button
              startIcon={<IoVideocam />}
              size="large"
              sx={{
                px: 5,
                borderRadius: 10,
              }}
              variant="postButton"
            >
              Video
            </Button>
            <Button
              startIcon={<FaSquarePollVertical />}
              size="large"
              sx={{
                px: 5,
                borderRadius: 10,
              }}
              variant="postButton"
            >
              Poll
            </Button>
            <Button
              sx={{
                px: 5,
                borderRadius: 10,
              }}
              size="large"
              variant="postButton"
              startIcon={<MdPublish />}
              onClick={editedPostContentHandler}
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
      </Paper>
    </>
  );
};

export default EditPost;
