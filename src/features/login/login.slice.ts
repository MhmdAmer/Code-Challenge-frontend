import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { message } from "antd";
import { Login, SsoSignInBody } from "./login.type";
import { push } from "redux-first-history";

/**
 * Initial state object
 */
const initialState: Login = {
  email: "",
  password:"",
  isLoggedIn: false,
  token: undefined,
};

const {REACT_APP_URL} = process.env

const logOut = createAsyncThunk(
  "login/logoutStatus",
  async (_, { dispatch }) => {
    // Dispatch all reset actions needed here
    dispatch(loginActions.reset());
  }
);


const logIn = createAsyncThunk(
  "login/LoginStatus",
  async ({email, password}: any, { rejectWithValue }) => {
    try {

      const body: SsoSignInBody = {
        email: email.toLowerCase().trim(),
        password: password,
      };
      const response = await trackPromise(
        axios.post(`${REACT_APP_URL}/login`, body )
      )  
      return response.data;
    
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",

  initialState: initialState,


  reducers: {
    setLogin: (state, action) => {
      return { ...state, ...action.payload };
    },
    setIsLogin:(state,action)=>{
      console.log("done")
      state.isLoggedIn=action.payload
    },
    reset: () => initialState,

  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state, action) => {
        console.log(action);
      })
      .addCase(logIn.fulfilled, (state, payload) => {
        state.isLoggedIn = true;
        console.log(state.isLoggedIn)
        state.token= payload.payload.access_token
        push('/home')
      })
      .addCase(logIn.rejected, (state, { payload,error}:any) => {
        state.isLoggedIn = false;
        message.error(payload?.message || error?.message);
      });
  },
});

export const loginReducer = loginSlice.reducer;

export const loginActions = { ...loginSlice.actions, logIn,logOut };
