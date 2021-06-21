import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { message } from "antd";
import {Admin } from "./admin.type";
import {loginActions} from "../login/login.slice"
import { useDispatch } from "react-redux";

/**
 * Initial state object
 */
const initialState: Admin = {
customers:null,
perPage:5,
page:1,
lastPage:1,
filter:null,
filterSearch:"",
totalPages:null,
type:"hours",
time:24,
average:null
};
const {REACT_APP_URL} = process.env
const getCustomers = createAsyncThunk(
  "admin/getCustomerStatus",
  async ({page,perPage,filter,filterSearch}: any, { rejectWithValue }) => {
    try {
var response : any;
        if(filter !== null){
             response = await trackPromise(
          
                axios.get(`${REACT_APP_URL}/customers?page=${page}&perPage=${perPage}&${filter}=${filterSearch}` )
              ) 
        }else {
        response = await trackPromise(
          
        axios.get(`${REACT_APP_URL}/customers?page=${page}&perPage=${perPage}` )
      ) 
        }
      return response.data;
    
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const getAverage = createAsyncThunk(
  "admin/getAverageStatus",
  async ({type,time}: any, { rejectWithValue }) => {
    try {
var response : any;
        if(time !== null){
             response = await trackPromise(
          
                axios.get(`${REACT_APP_URL}/average?type=${type}&time=${time}` )
              ) 
        }else {
        response = await trackPromise(
          
        axios.get(`${REACT_APP_URL}/average` )
      ) 
        }
      return response.data;
    
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",

  initialState: initialState,


  reducers: {
    setPage: (state, payload) => {
     
    state.page=payload.payload 
    },
    setPerPage: (state,payload)=>{
        state.perPage=payload.payload
    },
    setFilter: (state,payload)=>{
        state.filter=payload.payload
    },
    setFilterSearch: (state,payload)=>{
        state.filterSearch=payload.payload
    },
    setType: (state,payload)=>{
        state.type=payload.payload
    },
    setTime: (state,payload)=>{
        state.time=payload.payload
    },
    reset: () => initialState,

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state, action) => {
        console.log(action);
      })
      .addCase(getCustomers.fulfilled, (state, payload) => {
          console.log(payload.payload.status);
          if(payload.payload?.status === "Token is Expired"){
           message.error("Log Out The Login")
          }else{
        state.customers = payload.payload.data.data
        state.totalPages=payload.payload.total
        state.page=payload.payload.data.current_page}
      })
      .addCase(getCustomers.rejected, (state, { payload,error}:any) => {
        message.error(payload?.message || error?.message);
      });
   
      builder
      .addCase(getAverage.pending, (state, action) => {
        console.log(action);
      })
      .addCase(getAverage.fulfilled, (state, payload) => {
        state.average = payload.payload.data
      })
      .addCase(getAverage.rejected, (state, { payload,error}:any) => {
        message.error(payload?.message || error?.message);
      });
  },
});

export const adminReducer = adminSlice.reducer;

export const adminActions = { ...adminSlice.actions, getCustomers,getAverage };
