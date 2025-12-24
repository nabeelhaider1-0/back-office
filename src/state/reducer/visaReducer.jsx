import { createReducer } from "@reduxjs/toolkit";
import {
  FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST,
  FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_ERROR,
  FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_FAIL,
  FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_SUCCESS,
  EDIT_VISA_CATEGORY_DATA_REQUEST,
  EDIT_VISA_CATEGORY_DATA_REQUEST_ERROR,
  EDIT_VISA_CATEGORY_DATA_REQUEST_SUCCESS,
  EDIT_VISA_CATEGORY_DATA_REQUEST_FAIL,
  ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST,
  ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_ERROR,
  ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_FAIL,
  ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_SUCCESS,
  GET_SUPPLIER_VISA_RATE_DATA_REQUEST,
  GET_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
  GET_SUPPLIER_VISA_RATE_DATA_REQUEST_FAIL,
  GET_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
  EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST,
  EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
  EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST_FAIL,
  EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
  ADD_VISA_OFFLINE_DATA_REQUEST_ERROR,
  ADD_VISA_OFFLINE_DATA_REQUEST,
  ADD_VISA_OFFLINE_DATA_REQUEST_FAIL,
  ADD_VISA_OFFLINE_DATA_REQUEST_SUCCESS,
  GET_VISA_OFFLINE_DATA_REQUEST,
  GET_VISA_OFFLINE_DATA_REQUEST_ERROR,
  GET_VISA_OFFLINE_DATA_REQUEST_FAIL,
  GET_VISA_OFFLINE_DATA_REQUEST_SUCCESS,
  GET_VISA_OFFLINE_SINGLE_REQUEST,
  GET_VISA_OFFLINE_SINGLE_REQUEST_ERROR,
  GET_VISA_OFFLINE_SINGLE_REQUEST_FAIL,
  GET_VISA_OFFLINE_SINGLE_REQUEST_SUCCESS,
  GET_RATES_POSTED_REQUEST,
  GET_RATES_POSTED_REQUEST_ERROR,
  GET_RATES_POSTED_REQUEST_FAIL,
  GET_RATES_POSTED_REQUEST_SUCCESS,
} from "../constants/visaConstants";

const initialState = {
  isLoading: false,
  visaCategories: [],
  editVisaCategoryData: {},
  uuids: [],
  allVisaRatesData: [],
  editData: [],
  //..... Visa Offline Data...//
  addVisaData: {},
  allOfflineVisaData: [],
  singleOfflineVisaData: {},
  visaOfflineRatesPosted: {},
};

export const visaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(
      FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_SUCCESS,
      (state, action) => {
        state.isLoading = false;
        state.visaCategories = action.payload;
        // console.log(action.payload, "from reducers");
      }
    )
    .addCase(FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_ERROR, (state) => {
      state.isLoading = false;
    })

    //..EDIt Visa CategoryReducer...//

    .addCase(EDIT_VISA_CATEGORY_DATA_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(EDIT_VISA_CATEGORY_DATA_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(EDIT_VISA_CATEGORY_DATA_REQUEST_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.editVisaCategoryData = action.payload;
      // console.log(action.payload, "from reducers");
    })
    .addCase(EDIT_VISA_CATEGORY_DATA_REQUEST_ERROR, (state) => {
      state.isLoading = false;
    })

    //..Add Supplier Visa Rate Child Reducer...//
    .addCase(ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(
      ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_SUCCESS,
      (state, action) => {
        state.isLoading = false;
        state.uuids = action.payload;
      }
    )
    .addCase(ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_ERROR, (state) => {
      state.isLoading = false;
    })

    .addCase(GET_SUPPLIER_VISA_RATE_DATA_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_SUPPLIER_VISA_RATE_DATA_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allVisaRatesData = action.payload;
      // console.log(action.payload, "from reducers");
    })
    .addCase(GET_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR, (state) => {
      state.isLoading = false;
    })

    .addCase(EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR, (state) => {
      state.isLoading = false;
    })
    .addCase(EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.editData = action.payload;
      // console.log(action.payload, "from reducers");
    })

    .addCase(ADD_VISA_OFFLINE_DATA_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(ADD_VISA_OFFLINE_DATA_REQUEST_ERROR, (state) => {
      state.isLoading = false;
    })
    .addCase(ADD_VISA_OFFLINE_DATA_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(ADD_VISA_OFFLINE_DATA_REQUEST_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.addVisaData = action.payload;
      // console.log(action.payload, "from reducers");
    })

    //....Get offline Visa Reducer...//
    .addCase(GET_VISA_OFFLINE_DATA_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_VISA_OFFLINE_DATA_REQUEST_ERROR, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_VISA_OFFLINE_DATA_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_VISA_OFFLINE_DATA_REQUEST_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allOfflineVisaData = action.payload;
      // console.log(action.payload, "from reducers");
    })

    //....Get offline Visa Reducer...//
    .addCase(GET_VISA_OFFLINE_SINGLE_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_VISA_OFFLINE_SINGLE_REQUEST_ERROR, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_VISA_OFFLINE_SINGLE_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_VISA_OFFLINE_SINGLE_REQUEST_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.singleOfflineVisaData = action.payload;
      // console.log(action.payload, "from reducers");
    })

    //....Get offline Visa Rates Posted...//
    .addCase(GET_RATES_POSTED_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_RATES_POSTED_REQUEST_ERROR, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_RATES_POSTED_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_RATES_POSTED_REQUEST_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.visaOfflineRatesPosted = action.payload;
      // console.log(action.payload, "from reducers");
    });
});
