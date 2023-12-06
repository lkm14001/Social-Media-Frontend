import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Button,
  Divider,
  Collapse,
  Alert,
  Paper,
} from "@mui/material";
import { IoCloseCircle } from "react-icons/io5";

import { useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  registerAsync,
  userState,
} from "../../redux/slices/userSlice/userSlice";

import { MdCloudUpload } from "react-icons/md";

import { storage } from "../../config/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const registerMessage = useAppSelector(userState).registerError;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [image, setImage] = useState<any>(null);
  const [preview, setPreview] = useState<string>("");
  // const [profilePic, setProfilePic] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  // const [registerMessage,setRegisterMessage] = useState<string>('')

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const uploadMainImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const imagePreviewHandler = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      setImage(fileInputRef.current.files[0]);
      setPreview(URL.createObjectURL(fileInputRef.current.files[0]));
    }
  };

  const handleRegister = () => {
    const picRef = ref(
      storage,
      `${process.env.REACT_APP_FIREBASE_STORAGE_ROOT}/${email}/${email}`
    );
    uploadBytes(picRef, image).then(() => {
      getDownloadURL(picRef).then((url) => {
        const registerData = {
          username,
          email,
          password,
          firstName,
          lastName,
          profilePicture: url,
        };

        dispatch(registerAsync(registerData)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigate("/login");
          } else if (res.meta.requestStatus === "rejected") {
            setOpen(true);
          }
          // else if(res ) {

          // }
        });
      });
    });
  };

  return (
    <>
      <Paper
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100vw",
          p: 5,
          boxSizing: "border-box",
          backgroundColor: "background.mode",
        }}
      >
        <Paper
          component="div"
          sx={(theme) => ({
            width: "30%",
            minHeight: "70%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: 3,
            // backgroundColor: "white",
            px: 5,
            py: 5,
            [theme.breakpoints.down("lg")]: {
              width: "40%",
            },
            [theme.breakpoints.down("md")]: {
              width: "50%",
            },
            [theme.breakpoints.down("ipad")]: {
              width: "85%",
            },
            [theme.breakpoints.down("sm")]: {
              px: 3,
              width: "95%",
            },
          })}
        >
          <Typography
            sx={{
              fontSize: "2.5em",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            Register
          </Typography>

          <TextField
            id="username"
            label="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            id="email"
            label="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="firstName"
              label="Enter Your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              id="lastName"
              label="Enter Your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <FormControl variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              value={password}
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="show-password"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              sx={{
                minWidth: "10rem",
                maxWidth: "25rem",
                minHeight: "10rem",
                maxHeight: "15rem",
                border: "1px solid",
                borderColor: "border.color",
              }}
              src={preview}
            />
            <input
              type="file"
              hidden
              name="profilePic"
              ref={fileInputRef}
              onChange={imagePreviewHandler}
            />

            <IconButton aria-label="" onClick={uploadMainImage} sx={{}}>
              <MdCloudUpload size={60} color={"#33bdff"} />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleRegister}
          >
            Register
          </Button>

          {registerMessage !== null && (
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <IoCloseCircle />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {registerMessage}
              </Alert>
            </Collapse>
          )}

          <Typography sx={{ fontWeight: "", fontSize: "1rem" }}>
            Already have an account? Click <Link to="/login">here</Link> to
            Login
          </Typography>

          <Divider>Or</Divider>

          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component={"div"}
              sx={{
                display: "flex",
                gap: 3,
              }}
            >
              <IconButton size="large">
                <FcGoogle />
              </IconButton>

              <IconButton sx={{ color: "blue" }}>
                <ImFacebook2 />
              </IconButton>
            </Box>
          </Box>
        </Paper>
        {/* <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity={snackType}
            sx={{ width: "100%" }}
          >
            {snackMsg}
          </Alert>
        </Snackbar> */}
      </Paper>
    </>
  );
};

export default Register;
