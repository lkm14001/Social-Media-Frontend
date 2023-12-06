import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { IoPersonAddSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import {
  IUser,
  getLoggedInUserDataAsync,
  getuserAsync,
  sendFriendRequestAsync,
  userState,
} from "../../../redux/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

interface SearchListProps {
  searchList: IUser[];
  setModalOpen: (state: boolean) => void;
}

const SearchList: React.FC<SearchListProps> = ({
  searchList,
  setModalOpen,
}) => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(userState).loggedInUser;

  const sendFriendRequestHandler = (userId: string) => {
    const payload = {
      userId: loggedInUser._id,
      friendId: userId,
    };
    dispatch(sendFriendRequestAsync(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getLoggedInUserDataAsync());
      }
    });
  };

  const isUserIncluded = (userList: IUser[], user: IUser) => {
    for (let i = 0; i < userList.length; i++) {
      if (userList[i]._id === user._id) {
        return true;
      }
      return false;
    }
  };

  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        borderRadius: 4,
        width:'25vw',
        [theme.breakpoints.down('md')]:{
          width:'35vw',
        },
        [theme.breakpoints.down('ipad')]:{
          width:'40vw'
        },
        [theme.breakpoints.down("sm")]: {
          width: "65vw",
        },
      })}
    >
      {searchList.map((user: IUser, key: any) => (
        <Box
          component="div"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent:'space-between'
          })}
          key={key}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-around",
              //   p: 3,
              width: "100%",
              gap: 2,
              cursor: "pointer",
            }}
            onClick={() =>
              dispatch(getuserAsync(user._id)).then(() => {
                navigate(`/profile/${user._id}`);
                setModalOpen(false);
              })
            }
          >
            <Avatar
              alt="profile"
              src={user.profilePicture}
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
                {user.firstName + " " + user.lastName}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{
                  color: "subtitle2.color",
                }}
              >
                {"@" + user.username}
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
            {isUserIncluded(loggedInUser.following, user) ? (
              <>
                {isUserIncluded(loggedInUser.followers, user) ? (
                  <>
                    <IconButton disabled>
                      <TiTick />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Button disabled>Request Sent!</Button>
                  </>
                )}
              </>
            ) : (
              <IconButton onClick={() => sendFriendRequestHandler(user._id)}>
                <IoPersonAddSharp />
              </IconButton>
            )}
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default SearchList;
