import {
  Box,
  Typography,
  TextField,
  Avatar,
  Paper,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getLoggedInUserDataAsync,
  getuserAsync,
  logoutAsync,
  toggleColorMode,
  userSearchAsync,
  userState,
} from "../../redux/slices/userSlice/userSlice";
import { IoSearch } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { LuMessageSquare } from "react-icons/lu";
import { FaUserFriends } from "react-icons/fa";
import FriendRequests from "../Home/FriendRequests/FriendRequests";
import { useNavigate } from "react-router-dom";
import SearchList from "../Home/SearchList/SearchList";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.widget",
  boxShadow: 24,
  borderRadius: 4,
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const loggedInUser = useAppSelector(userState).loggedInUser;
  const friendRequests = useAppSelector(userState).loggedInUser.friendRequests;
  const darkMode = useAppSelector(userState).darkMode;

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [friendRequestsAnchor, setFriendRequestsAnchor] =
    useState<HTMLButtonElement | null>(null);

  const handleFriendRequestsAnchor = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setFriendRequestsAnchor(event.currentTarget);
  };

  const handleRequestsClose = () => {
    setFriendRequestsAnchor(null);
  };

  const toggleDarkMode = () => {
    dispatch(toggleColorMode());
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(userSearchAsync(search)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSearchModalOpen(true);
        }
      });
      setSearch("");
    }
  };

  const searchList = useAppSelector(userState).userSearchList;

  const handleOpenProfileMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const profileNavigationHandler = () => {
    handleCloseProfileMenu();
    dispatch(getuserAsync(loggedInUser._id)).then(() =>
      navigate(`/profile${loggedInUser._id}`)
    );
  };

  const logoutHandler = () => {
    dispatch(logoutAsync()).then(() => {
      localStorage.removeItem("persist:root");
      handleCloseProfileMenu();
      navigate("/login");
    });
  };

  return (
    <Paper
      elevation={0}
      square
      component="div"
      sx={{
        height: "10vh",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        px: 5,
        flexWrap: "wrap",
        alignItems: "center",
        backgroundColor: "background.widget",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 5,
          alignItems: "center",
          // border:'1px solid white'
        }}
      >
        <Box
          component={"div"}
          sx={(theme) => ({
            cursor: "pointer",
          })}
          onClick={() => {
            dispatch(getLoggedInUserDataAsync());
            navigate("/home");
          }}
        >
          <Typography
            sx={{
              fontSize: "3rem",
              fontWeight: "bolder",
              letterSpacing: "-4px",
              fontFamily: "Agbalumo",
            }}
          >
            Social Media
          </Typography>
        </Box>
        <TextField
          id="search"
          value={search}
          // fullWidth
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={handleSearch}
          variant="outlined"
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
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  sx={{
                    mr: 0.5,
                  }}
                >
                  <IoSearch />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Modal open={searchModalOpen} onClose={() => setSearchModalOpen(false)}>
          <Box sx={style}>
            <SearchList
              searchList={searchList}
              setModalOpen={setSearchModalOpen}
            />
          </Box>
        </Modal>
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Badge badgeContent={5} color="error" overlap="circular">
          <IconButton
            // onClick={toggleDarkMode}
            sx={{
              width: 50,
              height: 50,
            }}
          >
            <LuMessageSquare />
          </IconButton>
        </Badge>
        <Badge
          badgeContent={friendRequests.length}
          color="error"
          overlap="circular"
        >
          <IconButton
            onClick={handleFriendRequestsAnchor}
            sx={{
              width: 50,
              height: 50,
            }}
          >
            <FaUserFriends />
          </IconButton>
        </Badge>
        <FriendRequests
          anchor={friendRequestsAnchor}
          setAnchorClose={handleRequestsClose}
        />
        <IconButton
          onClick={toggleDarkMode}
          sx={{
            width: 50,
            height: 50,
          }}
        >
          {darkMode ? <MdDarkMode /> : <MdOutlineLightMode />}
        </IconButton>
        <IconButton onClick={handleOpenProfileMenu}>
          <Avatar
            alt="Profile"
            src={loggedInUser.profilePicture}
            sx={{ width: 58, height: 58 }}
          />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseProfileMenu}
        >
          <MenuItem onClick={profileNavigationHandler}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <MdAccountCircle />
              <Typography>Profile</Typography>
            </Box>
          </MenuItem>

          <MenuItem onClick={logoutHandler}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IoLogOutOutline />
              <Typography>Logout</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default Navbar;
