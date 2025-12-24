import { createReducer } from "@reduxjs/toolkit";
import {
  FETCH_COUNTRIES_DATA_REQUEST,
  FETCH_COUNTRIES_DATA_REQUEST_ERROR,
  FETCH_COUNTRIES_DATA_REQUEST_FAIL,
  FETCH_COUNTRIES_DATA_REQUEST_SUCCESS,
  GET_OFFLINE_SUPPLIER_ERROR,
  GET_OFFLINE_SUPPLIER_FAILURE,
  GET_OFFLINE_SUPPLIER_REQUEST,
  GET_OFFLINE_SUPPLIER_SUCCESS,
  GET_CURRENCIES_ERROR,
  GET_CURRENCIES_FAILURE,
  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_SUCCESS,
} from "../constants/commonApisConstants";

const initialState = {
  isLoading: false,
  countries: [],
  offlineSuppliers: [],
  currencies: [],
};

export const countriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH_COUNTRIES_DATA_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(FETCH_COUNTRIES_DATA_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(FETCH_COUNTRIES_DATA_REQUEST_ERROR, (state) => {
      state.isLoading = false;
    })
    .addCase(FETCH_COUNTRIES_DATA_REQUEST_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.countries = action.payload;
    })
    //...Offline Supplier Reducer...//
    .addCase(GET_OFFLINE_SUPPLIER_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_OFFLINE_SUPPLIER_FAILURE, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_OFFLINE_SUPPLIER_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.offlineSuppliers = action.payload;
    })
    .addCase(GET_OFFLINE_SUPPLIER_ERROR, (state) => {
      state.isLoading = false;
    })

      //...Currencies Reducer...//
      .addCase(GET_CURRENCIES_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(GET_CURRENCIES_FAILURE, (state) => {
        state.isLoading = false;
      })
      .addCase(GET_CURRENCIES_SUCCESS, (state, action) => {
        state.isLoading = false;
        state.currencies = action.payload;
      })
      .addCase(GET_CURRENCIES_ERROR, (state) => {
        state.isLoading = false;
      });
});
