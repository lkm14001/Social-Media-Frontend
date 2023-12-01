import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {
  UserLoginAPI,
  UserLogoutAPI,
  UserRegisterAPI,
  UserUpdateBioAPI,
  acceptFriendRequestAPI,
  addCommentAPI,
  addPostAPI,
  checkAuthAPI,
  editPostAPI,
  getLoggedInUserDataAPI,
  getUpdatedPost,
  getUserAPI,
  likePostAPI,
  removeFriendAPI,
  removeLikePostAPI,
  sendFriendRequestAPI,
  userSearchAPI,
} from "./userAPI";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture: string;
  bio: string;
  followers: Array<IUser>;
  following: Array<IUser>;
  sentFriendRequests: Array<IUser>;
  friendRequests: Array<IUser>;
  likedPosts: Array<IPosts>;
  posts: Array<IPosts>;
}

export interface IPosts {
  _id: string;
  content: string;
  user: string | IUser;
  likes: Array<string>;
  comments: Array<IComments>;
  image: string;
}

export interface IComments {
  _id: string;
  comment: string;
  post: string;
  user: IUser;
}

export const loginUserAsync = createAsyncThunk(
  "socialMedia/loginAsync",
  async (loginData: any, { rejectWithValue }) => {
    try {
      const response = await UserLoginAPI(loginData);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const registerAsync = createAsyncThunk(
  "socialMedia/registerAsync",
  async (registerData: any, { rejectWithValue }) => {
    try {
      const response = await UserRegisterAPI(registerData);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "socialMedia/logoutUserAsync",
  async () => {
    const response = await UserLogoutAPI();
    return response;
  }
);

export const searchUserAsync = createAsyncThunk(
  "socialMedia/searchUserAsync",
  async (searchData: any, { rejectWithValue }) => {
    try {
      const response = await userSearchAPI(searchData);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const UpdateBioAsync = createAsyncThunk(
  "socialMedia/updateBioAsync",
  async (updateData: any, { rejectWithValue }) => {
    try {
      const response = await UserUpdateBioAPI(updateData.bio, updateData.email);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addPostAsync = createAsyncThunk(
  "socialMedia/addPost",
  async (postData: any, { rejectWithValue }) => {
    try {
      const response = await addPostAPI(postData.email, postData.post);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const editPostAsync = createAsyncThunk(
  "socialMedia/editPostAsync",
  async (editPostData: any, { rejectWithValue }) => {
    try {
      const response = await editPostAPI(
        editPostData.email,
        editPostData.postId,
        editPostData.post
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addCommentAsync = createAsyncThunk(
  "socialMedia/addCommentAsync",
  async (commentData: any, { rejectWithValue }) => {
    try {
      const response = await addCommentAPI(
        commentData.email,
        commentData.postId,
        commentData.comment
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const likePostAsync = createAsyncThunk(
  "socialMedia/likePostAsync",
  async (likeData: any, { rejectWithValue }) => {
    try {
      const response = await likePostAPI(likeData.email, likeData.postId);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removePostLikeAsync = createAsyncThunk(
  "socialMedia/removeLikePostAsync",
  async (removeData: any, { rejectWithValue }) => {
    try {
      const response = await removeLikePostAPI(
        removeData.email,
        removeData.postId
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const sendFriendRequestAsync = createAsyncThunk(
  "socialMedia/sendFriendRequestAsync",
  async (requestData: any, { rejectWithValue }) => {
    try {
      const response = await sendFriendRequestAPI(
        requestData.userId,
        requestData.friendId
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const acceptFriendRequestAsync = createAsyncThunk(
  "socialMedia/acceptFriendRequestAsync",
  async (requestData: any, { rejectWithValue }) => {
    try {
      const response = await acceptFriendRequestAPI(
        requestData.userId,
        requestData.friendId
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeFriendAsync = createAsyncThunk(
  "socialMedia/removeFriendAsync",
  async (removeData: any, { rejectWithValue }) => {
    try {
      const response = await removeFriendAPI(
        removeData.userId,
        removeData.friendId
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const userSearchAsync = createAsyncThunk(
  "socialMedia/userSearchAsync",
  async (user: string, { rejectWithValue }) => {
    try {
      const response = await userSearchAPI(user);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getuserAsync = createAsyncThunk(
  "socialMedia/getUserAsync",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getUserAPI(userId);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getLoggedInUserDataAsync = createAsyncThunk(
  "socialMedia/getLoggedInUserAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLoggedInUserDataAPI();
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  "socialMedia/checkAuthAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkAuthAPI();
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getUpdatedPostAsync = createAsyncThunk(
  "socialMedia/getUpdatedPostAsync",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await getUpdatedPost(postId);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface InitialState {
  loggedInUser: IUser;
  loginLoadingState: boolean;
  isLoggedIn: boolean;
  loginError: string | null;
  registerLoadingState: boolean;
  registerError: string | null;
  selecteduser: IUser;
  searchLoading: boolean;
  userSearchList: IUser[];
  darkMode: boolean;
  action: {
    message: string;
    type: "success" | "error";
  };
  friendsPosts: IPosts[];
}

const initialState: InitialState = {
  loggedInUser: {} as IUser,
  isLoggedIn: false,
  loginLoadingState: false,
  loginError: null,
  registerLoadingState: false,
  registerError: null,
  selecteduser: {} as IUser,
  searchLoading: false,
  userSearchList: [],
  darkMode: true,
  action: {
    message: "",
    type: "success",
  },
  friendsPosts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleColorMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    getFriendsPosts: (state) => {
      state.friendsPosts = state.loggedInUser.following
        .reduce((acc: any, obj) => acc.concat(obj.posts), [])
        .sort(
          (a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
    },
    // recieveUpdatedPostContent: (state, action) => {
    //   state.friendsPosts.map();
    // },
    clearState: (state) => {
      state = initialState;
      // localStorage.removeItem("persist:root");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthAsync.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(checkAuthAsync.rejected, (state, action) => {
      state.isLoggedIn = false;
      console.trace("Checing Auth");
      state.action = { message: action.payload as string, type: "error" };
    });
    builder.addCase(getLoggedInUserDataAsync.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
    });
    builder.addCase(getLoggedInUserDataAsync.rejected, (state, action) => {
      state.action = { message: action.payload as string, type: "error" };
    });
    builder.addCase(loginUserAsync.pending, (state, action) => {
      state.loginLoadingState = true;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
      state.loginError = null;
      state.isLoggedIn = true;
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.loginError = action.payload as string | null;
      state.loginLoadingState = false;
    });

    builder.addCase(registerAsync.pending, (state, action) => {
      state.registerLoadingState = true;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.registerError = null;
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.registerError = action.payload as string | null;
      state.registerLoadingState = false;
    });
    builder.addCase(logoutAsync.fulfilled, (state, action) => {
      state.action = { message: action.payload, type: "success" };
    });
    builder.addCase(searchUserAsync.pending, (state) => {
      state.searchLoading = true;
    });
    builder.addCase(searchUserAsync.fulfilled, (state, action) => {
      state.searchLoading = false;
      state.userSearchList = action.payload;
    });
    builder.addCase(searchUserAsync.rejected, (state, action) => {
      state.searchLoading = false;
      state.action = { message: action.payload as string, type: "error" };
    });
    builder.addCase(UpdateBioAsync.fulfilled, (state, action) => {
      state.action = { message: action.payload as string, type: "success" };
    });
    builder.addCase(UpdateBioAsync.rejected, (state, action) => {
      state.action = { message: action.payload as string, type: "error" };
    });
    builder.addCase(addPostAsync.fulfilled, (state, action) => {
      state.action = { message: action.payload as string, type: "success" };
    });
    builder.addCase(addPostAsync.rejected, (state, action) => {
      state.action = { message: action.payload as string, type: "error" };
    });
    builder.addCase(editPostAsync.fulfilled, (state, action) => {
      state.action = { message: action.payload as string, type: "success" };
    });
    builder.addCase(editPostAsync.rejected, (state, action) => {
      state.action = { message: action.payload as string, type: "error" };
    });
    builder.addCase(getUpdatedPostAsync.fulfilled, (state, action) => {
      state.friendsPosts.forEach((post: IPosts) => {
        if (post._id === action.payload._id) {
          post = action.payload;
        }
      });
    });
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.action = { message: action.payload as string, type: "success" };
    });
    builder.addCase(addCommentAsync.rejected, (state, action) => {
      state.action = { message: action.payload as string, type: "error" };
    });
    builder.addCase(likePostAsync.fulfilled, (state, action) => {
      state.action = { message: action.payload as string, type: "success" };
    });
    builder.addCase(likePostAsync.rejected, (state, action) => {
      state.action = { message: action.payload as string, type: "error" };
    });
    builder.addCase(removePostLikeAsync.fulfilled, (state, action) => {
      state.action = { message: action.payload as string, type: "success" };
    });
    builder.addCase(sendFriendRequestAsync.fulfilled, (state, action) => {
      state.action = { message: action.payload as string, type: "success" };
    });
    builder.addCase(acceptFriendRequestAsync.fulfilled, (state, action) => {
      state.action = { message: action.payload as string, type: "success" };
    });
    builder.addCase(removeFriendAsync.fulfilled, (state, action) => {
      state.action = { message: action.payload as string, type: "success" };
    });
    builder.addCase(userSearchAsync.fulfilled, (state, action) => {
      state.userSearchList = action.payload;
    });
    builder.addCase(getuserAsync.fulfilled, (state, action) => {
      state.selecteduser = action.payload;
    });
  },
});

export const { toggleColorMode, getFriendsPosts, clearState } =
  userSlice.actions;
export default userSlice.reducer;
export const userState = (state: RootState) => state.user;
