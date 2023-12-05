import axios from "axios";
import { IPosts, IUser } from "./userSlice";
import { axiosAuthInstance } from "../../../utils/instance.axios";

export const checkAuthAPI = () => {
  return new Promise<IUser>(async (resolve, reject) => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_REFRESH_TOKEN}`,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          axios
            .get(
              `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/get-updated-details`,
              { withCredentials: true }
            )
            .then((res) => {
              resolve(res.data.user);
            })
            .catch((error) => {
              // console.log("IN", error);
              reject(new Error(error.response?.data?.error));
            });
        }
      })
      .catch((error) => {
        // console.log("OUT", error);
        reject(
          new Error(error.response?.data?.error) || new Error(error).message
        );
      });
  });
};

export const UserLoginAPI = (loginData: any) => {
  return new Promise<any>((resolve, reject) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_USER_LOGIN}`,
        loginData,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error.response.data.error));
      });
  });
};

export const getLoggedInUserDataAPI = () => {
  return new Promise<IUser>((resolve, reject) => {
    axiosAuthInstance
      .get(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/get-updated-details`,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data.user);
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.error));
      });
  });
};

export const UserRegisterAPI = (registerData: any) => {
  return new Promise<any>((resolve, reject) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_USER_REGISTER}`,
        registerData
      )
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.error));
      });
  });
};

export const UserLogoutAPI = () => {
  return new Promise<any>(async (resolve, reject) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_USER_LOGOUT}`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        resolve("User Logged Out.");
      });
  });
};

export const UserUpdateBioAPI = (bio: string, email: string) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/${email}${process.env.REACT_APP_UPDATE_BIO}`,
        { bio }
      )
      .then((res) => {
        if (res.status === 200) {
          resolve("Bio Updated");
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.error));
      });
  });
};

export const addPostAPI = (email: string, post: any) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/${email}${process.env.REACT_APP_ADD_POST}`,
        post
      )
      .then((res) => {
        if (res.status === 200) {
          resolve("Post Added");
        }
      })
      .catch((error) => {
        reject(new Error(error.response?.data?.error || "Error Posting Data"));
      });
  });
};

export const getUpdatedPost = (postId: string) => {
  return new Promise<IPosts>((resolve, reject) => {
    axiosAuthInstance
      .get(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}${process.env.REACT_APP_GET_UPDATED_POST}/${postId}`
      )
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data.updatedPost);
        }
      })
      .catch((error) => {
        reject(new Error(error.response?.data?.error));
      });
  });
};

export const editPostAPI = (email: string, postId: string, post: any) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/${email}${process.env.REACT_APP_EDIT_POST}/${postId}`,
        post
      )
      .then((res) => {
        if (res.status === 200) {
          resolve("Post Edited");
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.error));
      });
  });
};

export const deletePostAPI = (userId: string, postId: string) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/${userId}${process.env.REACT_APP_DELETE_POST}/${postId}`
      )
      .then((res) => {
        if (res.status === 200) {
          resolve("Deleted Successfully!");
        }
      })
      .catch((error) => {
        reject(new Error(error.response?.data?.error));
      });
  });
};

export const addCommentAPI = (email: string, postId: string, comment: any) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/${email}${process.env.REACT_APP_ADD_COMMENT}/${postId}`,
        { comment }
      )
      .then((res) => {
        if (res.status === 200) {
          resolve("Comment Added");
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.error));
      });
  });
};

export const likePostAPI = (email: string, postId: string) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/${email}${process.env.REACT_APP_LIKE_POST}/${postId}`
      )
      .then((res) => {
        if (res.status === 200) {
          resolve("Post Liked");
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.error));
      });
  });
};

export const removeLikePostAPI = (email: string, postId: string) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/${email}${process.env.REACT_APP_REMOVE_LIKE}/${postId}`
      )
      .then((res) => {
        if (res.status === 200) {
          resolve("Post like removed");
        }
      })
      .catch((error) => {
        reject(new Error(error.reponse.data.error));
      });
  });
};

export const sendFriendRequestAPI = (userId: string, friendId: string) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/${userId}${process.env.REACT_APP_SEND_FRIEND_REQUEST}/${friendId}`
      )
      .then((res) => {
        if (res.status === 200) {
          resolve("Friend Request Sent");
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.error));
      });
  });
};

export const acceptFriendRequestAPI = (userId: string, friendId: string) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/${userId}${process.env.REACT_APP_ACCEPT_FRIEND_REQUEST}/${friendId}`
      )
      .then((res) => {
        if (res.status === 200) {
          resolve("Accepted Friend Request");
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.error));
      });
  });
};

export const removeFriendAPI = (userId: string, friendId: string) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .post(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}/${userId}${process.env.REACT_APP_REMOVE_FRIEND}/${friendId}`
      )
      .then((res) => {
        if (res.status === 200) {
          resolve("Friend removed from Friend List");
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.error));
      });
  });
};

export const userSearchAPI = (user: string) => {
  return new Promise<IUser[]>((resolve, reject) => {
    axiosAuthInstance
      .get(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}${process.env.REACT_APP_SEARCH}/${user}`,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data.users);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error.message));
      });
  });
};

export const getUserAPI = (userId: string) => {
  return new Promise<any>((resolve, reject) => {
    axiosAuthInstance
      .get(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROFILE}${process.env.REACT_APP_GET_USER}/${userId}`
      )
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data.user);
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.error));
      });
  });
};
