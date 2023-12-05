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
        <Box sx={style}>
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
      sx={{
        backgroundColor: "background.mode",
        minHeight: "90vh",
        display: "flex",
        gap: 2,
        p: 5,
      }}
    >
      <Paper
        elevation={0}
        component="div"
        sx={{
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
        }}
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
            sx={{ width: "10rem", height: "10rem", alignSelf: "start" }}
          />
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flexGrow: 1,
            }}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                // justifyContent: "",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Agbalumo",
                    fontSize: "3rem",
                    mb: -2,
                  }}
                >
                  {user.firstName + " " + user.lastName}
                </Typography>
                <Typography>{"@" + user.username}</Typography>
              </Box>
              {user._id === loggedInUser._id ? (
                <></>
              ) : (
                <>
                  <Button
                    variant="postButton"
                    startIcon={<FiUserPlus />}
                    size="large"
                    sx={{
                      px: 5,
                      py: 2,
                    }}
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
                  sx={{
                    fontFamily: "Agbalumo",
                    fontSize: "1.2rem",
                    fontWeight: "bolder",
                  }}
                >
                  Followers
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Agbalumo",
                    fontSize: "1.2rem",
                    fontWeight: "bolder",
                  }}
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
                  sx={{
                    fontFamily: "Agbalumo",
                    fontSize: "1.2rem",
                    fontWeight: "bolder",
                  }}
                >
                  Following
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Agbalumo",
                    fontSize: "1.2rem",
                    fontWeight: "bolder",
                  }}
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
          <Typography sx={{ fontSize: "2rem" }}>{user.bio}</Typography>
        </Box>
        <Divider />
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 2,

            "& > *": {
              flexGrow: 0,
              flexShrink: 1,
            },
            flexWrap: "wrap",
          }}
        >
          {user.posts.length !== 0 ? (
            user.posts.map((post: IPosts, key: any) => (
              <>
                <Box
                  component={"img"}
                  src={post.image}
                  sx={{
                    height: "20vh",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
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
