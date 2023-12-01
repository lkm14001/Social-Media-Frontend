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
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  getFriendsPosts,
  loginUserAsync,
  userState,
} from "../../redux/slices/userSlice/userSlice";

import { IoCloseCircle } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginMessage = useAppSelector(userState).loginError;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const loginData = {
      email,
      password,
    };
    dispatch(loginUserAsync(loginData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getFriendsPosts())
        navigate("/home");
      } else if (res.meta.requestStatus === "rejected") {
        setOpen(true);
      }
      //  else {
      //   handleSnackBar("error", "Error Loggin In");
      // }
    });
  };

  return (
    <>
      <Paper elevation={0} square
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          boxSizing: "border-box",
          backgroundColor: "background.mode",
        }}
      >
        <Paper
          component="div"
          sx={{
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
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5em",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            Login
          </Typography>

          <TextField
            id="email"
            label="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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

          {loginMessage !== null && (
            <Collapse in={open}>
              <Alert
                variant="filled"
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="medium"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <IoCloseCircle />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {loginMessage}
              </Alert>
            </Collapse>
          )}

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
          >
            Login
          </Button>

          <Typography sx={{ fontWeight: "", fontSize: "1rem" }}>
            New Here? Click <Link to="/register">here</Link> to Register
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
      </Paper>
    </>
  );
};

export default Login;
