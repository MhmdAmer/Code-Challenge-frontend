/* eslint-disable no-restricted-globals */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { trackPromise } from "react-promise-tracker";

import {
  Register,
  SsoSignUpBody,
} from "./register.type";


const initialState: Register = {
  email: undefined,
  isRegis: false,
  email_verify_url : "",
};
const {REACT_APP_URL} = process.env


const register = createAsyncThunk(
  "register/registerStatus",
  async (
    { email, password,name }: any,
    { rejectWithValue, getState }: any
  ) => {
    const pathname = "/register";
    const body: SsoSignUpBody = {
      email: email.toLowerCase().trim(),
      password: password,
      name
    };

    try {
      /** make api call */
      const response = await trackPromise(
        axios.post(REACT_APP_URL!.concat(pathname), body)
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const verify = createAsyncThunk(
  "register/verifyStatus",
  async (
   email_verify_url:any,
   { rejectWithValue, getState }: any
  ) => {
    try {
     console.log(email_verify_url.payload)
      const response = await trackPromise(
        axios.get(email_verify_url.payload)
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const registerSlice = createSlice({
  name: "register",

  initialState: initialState,

  reducers: {
    setRegister: (state, action) => {
      return { ...state, ...action.payload };
    },
    setEmail_Url:(state,payload )=>{
       state.email_verify_url = payload;
    },

    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        register.fulfilled,
        (state, { payload }) => {
          if(payload.data === "success"){
           message.success("Registered Successfully")
           state.isRegis = true
          }
         
          
        }
      )

      .addCase(register.rejected, (state, { payload, error }: any) => {
        message.error(payload?.message || error?.message);
      });

      builder
      .addCase(verify.fulfilled,(_,{payload})=>{
        if(payload.Success === 'Verified')
        message.success("Verified");
      })


  },
});

export const registerReducer = registerSlice.reducer;


export const registerActions = {
  ...registerSlice.actions,
  register,
  verify
};
