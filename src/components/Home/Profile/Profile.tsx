import {
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  IPosts,
  IUser,
  sendFriendRequestAsync,
  userState,
} from "../../../redux/slices/userSlice/userSlice";
import { FiUserPlus } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Post from "../Post/Post";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.widget",
  boxShadow: 24,
  borderRadius: 4,
  // p: 3,
};

interface IPostModal {
  postModalOpen: boolean;
  setPostModalOpen: (value: React.SetStateAction<boolean>) => void;
  post: IPosts;
  user: IUser;
}

const PostModal = ({
  postModalOpen,
  setPostModalOpen,
  post,
  user,
}: IPostModal) => {
  return (
    <>
      <Modal open={postModalOpen} onClose={() => setPostModalOpen(false)}>
        <Box sx={(theme) => ({
          ...style,
          [theme.breakpoints.down('sm')]:{
            width:'80vw'
          }
        })}>
          <Post
            postId={post._id}
            userId={user._id}
            comments={post.comments}
            content={post.content}
            firstName={user.firstName}
            image={post.image}
            lastName={user.lastName}
            profilePic={user.profilePicture}
            username={user.username}
          />
        </Box>
      </Modal>
    </>
  );
};

const Profile = () => {
  // const { userId } = useParams();
  // useEffect(() => {
  //   dispatch(getuserAsync(userId as string));
  // }, [userId]);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userState).selecteduser;
  const loggedInUser = useAppSelector(userState).loggedInUser;

  const [postModalOpen, setPostModalOpen] = useState<boolean>(false);

  const sendFriendRequestHandler = () => {
    const payload = {
      userId: loggedInUser._id,
      friendId: user._id,
    };
    dispatch(sendFriendRequestAsync(payload));
  };

  const [postModalData, setPostModalData] = useState<IPosts>({} as IPosts);

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        backgroundColor: "background.mode",
        minHeight: "90vh",
        display: "flex",
        gap: 2,
        p: 5,
        [theme.breakpoints.down("sm")]: {
          p: 3,
        },
      })}
    >
      <Paper
        elevation={0}
        component="div"
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          // border:'1px solid ',
          backgroundColor: "background.widget",
          borderRadius: 4,
          p: 5,
          gap: 3,
          hieght: "100%",
          width: "100%",
          flexShrink: 1,
          // alignSelf:'start'
          flexWrap: "wrap",
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          "& > *": {
            flexShrink: 1,
          },
          [theme.breakpoints.down('sm')]:{
            p:3
          }
        })}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 5,
            flexShrink: 1,
            // flexWrap:'wrap'
          }}
        >
          <Avatar
            alt="profile"
            src={user.profilePicture}
            sx={(theme) => ({
              width: "10rem",
              height: "10rem",
              [theme.breakpoints.down('ipad')]:{
                width:'7.5rem',
                height:'7.5rem'
              },
              [theme.breakpoints.down("sm")]: {
                width: "5rem",
                height: "5rem",
              },
              alignSelf: "start",
            })}
          />
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems:'start',
              gap: 4,
              flexGrow: 1,
            }}
          >
            <Box
              component="div"
              sx={(theme) => ({
                display: "flex",
                // justifyContent: "",

                gap: 10,
                alignItems: "center",
                [theme.breakpoints.down('ipad')]:{
                  gap:5,
                },
                [theme.breakpoints.down('sm')]:{
                  gap:4,
                  flexDirection:'column'
                }
              })}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={(theme) => ({
                    fontFamily: "Agbalumo",
                    fontSize: "3rem",
                    [theme.breakpoints.down('ipad')]:{
                      fontSize:'2rem'
                    },
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "1.8rem",
                    },
                    mb: -2,
                  })}
                >
                  {user.firstName + " " + user.lastName}
                </Typography>
                <Typography
                  sx={(theme) => ({
                    fontFamily: "Agbalumo",
                    fontSize: "1.8rem",
                    color: "grey",
                    [theme.breakpoints.down('ipad')]:{
                      fontSize:'1.4rem'
                    },
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "1.1rem",
                    },
                    mb: -2,
                  })}
                >
                  {"@" + user.username}
                </Typography>
              </Box>
              {user._id === loggedInUser._id ? (
                <></>
              ) : (
                <>
                  <Button
                    variant="postButton"
                    startIcon={<FiUserPlus />}
                    sx={(theme) => ({
                      borderRadius:3,
                      px: 5,
                      py: 2,
                      [theme.breakpoints.down('ipad')]:{
                        px:3,
                        py:1
                      },
                      // [theme.breakpoints.down('sm')]:{
                      //   px:1.5,
                      //   py:1
                      // }
                    })}
                    onClick={sendFriendRequestHandler}
                  >
                    Follow
                  </Button>
                </>
              )}
            </Box>
            <Box
              component="div"
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={(theme) => ({
                    fontFamily: "Agbalumo",
                    fontSize: "1.4rem",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "1rem",
                    },
                  })}
                >
                  Followers
                </Typography>
                <Typography
                  sx={(theme) => ({
                    fontFamily: "Agbalumo",
                    fontSize: "1.4rem",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "1rem",
                    },
                  })}
                >
                  {user.followers ? user.followers.length : 0}
                </Typography>
              </Box>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={(theme) => ({
                    fontFamily: "Agbalumo",
                    fontSize: "1.4rem",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "1rem",
                    },
                  })}
                >
                  Following
                </Typography>
                <Typography
                  sx={(theme) => ({
                    fontFamily: "Agbalumo",
                    fontSize: "1.4rem",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "1rem",
                    },
                  })}
                >
                  {user.following ? user.following.length : 0}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            width: "100%",
          }}
        >
          <Typography
            sx={(theme) => ({
              fontFamily: "Agbalumo",
              fontSize: "2rem",
              color:'grey',
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.5rem",
              },
            })}
          >
            {user.bio}
          </Typography>
        </Box>
        <Divider />
        <Box
          component="div"
          sx={(theme) => ({
            display: "flex",
            gap: 2,
            [theme.breakpoints.down('sm')]:{
              justifyContent:'center'
            },
            "& > *": {
              flexGrow: 0,
              flexShrink: 1,
            },
            flexWrap: "wrap",
          })}
        >
          {user.posts.length !== 0 ? (
            user.posts.map((post: IPosts, key: any) => (
              <>
                <Box
                  component={"img"}
                  src={post.image}
                  sx={(theme) => ({
                    height: "20vh",
                    [theme.breakpoints.down('lg')]:{
                      width:'25vw'
                    },
                    // [theme.breakpoints.down('ipad')]:{
                    //   width:'30vw'
                    // },
                    [theme.breakpoints.down('sm')]:{
                      height:'16vh',
                      width:'65vw',
                    },
                    width:'20vw',
                    borderRadius: 4,
                    cursor: "pointer",
                  })}
                  onClick={() => {
                    setPostModalOpen(true);
                    setPostModalData(post);
                  }}
                  key={key}
                />
              </>
            ))
          ) : (
            <>
              {loggedInUser._id === user._id ? (
                <>
                  <Typography>You Have not posted anything yet.</Typography>
                </>
              ) : (
                <>
                  {user.posts.length === 0 && (
                    <Typography>
                      This User has not posted anything yet.
                    </Typography>
                  )}
                </>
              )}
            </>
          )}
          <PostModal
            postModalOpen={postModalOpen}
            setPostModalOpen={setPostModalOpen}
            post={postModalData}
            user={user}
          />
        </Box>
      </Paper>
    </Paper>
  );
};

export default Profile;
