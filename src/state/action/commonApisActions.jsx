import {
  FETCH_COUNTRIES_DATA_REQUEST,
  FETCH_COUNTRIES_DATA_REQUEST_ERROR,
  FETCH_COUNTRIES_DATA_REQUEST_FAIL,
  FETCH_COUNTRIES_DATA_REQUEST_SUCCESS,
  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
  GET_CURRENCIES_FAILURE,
  GET_OFFLINE_SUPPLIER_ERROR,
  GET_OFFLINE_SUPPLIER_REQUEST,
  GET_OFFLINE_SUPPLIER_SUCCESS,
} from "../constants/commonApisConstants";
import excelFileContentt from "../../ExcelFiles/worldcities.xlsx";
import excelfilereader from "../../constants/excelfilereader";
import { getDATA } from "../../Apis/API";
import { ErrorApiAlert } from "../../constants/globalfunctions";
import ApiRoutes from "../../constants/ApiRoutes";

export const fetchCountries = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COUNTRIES_DATA_REQUEST });

    const data = await excelfilereader(excelFileContentt);
    console.log(data);

    if (data && data.CountryCities && Array.isArray(data.CountryCities)) {
      const uniqueCountries = Array.from(
        new Set(data.CountryCities.map((item) => item.country))
      ).map((country) => ({
        value: data.CountryCities.find((item) => item.country === country).iso3,
        label: country,
      }));
      console.log(uniqueCountries, "from Redux");
      dispatch({
        type: FETCH_COUNTRIES_DATA_REQUEST_SUCCESS,
        payload: uniqueCountries,
      });
    } else {
      throw new Error("Invalid data structure");
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
    dispatch({
      type: FETCH_COUNTRIES_DATA_REQUEST_ERROR,
      payload: error.message,
    });
  }
};

export const getofflinesuppliers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_OFFLINE_SUPPLIER_REQUEST });

    const response = await getDATA(ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);
    if (response.data.statusCode === 200) {
      const offlinesuppliers =
        response && response.data.data ? response.data.data : [];
      console.log("OFFLINE SUPPLIERS", offlinesuppliers);
      dispatch({
        type: GET_OFFLINE_SUPPLIER_SUCCESS,
        payload: offlinesuppliers,
      });
      // const options = offlinesuppliers
      //   .filter((op) => op.status === true) // Filter agents with status true
      //   .map((op) => ({
      //     value: op.uuid,
      //     label: op.supplierName,
      //   }));

      // setOfflineSupplierOptions(options);
    }

    // Handle successful authentication, e.g., set user state, redirect, etc.
  } catch (error) {
    ErrorApiAlert("Error Fetching Offline Suppliers");
    dispatch({ type: GET_OFFLINE_SUPPLIER_ERROR });
  } finally {
    // Set loading to false after data is fetched (whether successful or not)
  }
};

export const getAllCurrencies = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CURRENCIES_REQUEST });

    const response = await getDATA(ApiRoutes.CURRENCIES.CURRENCY);
    if (response.data.statusCode === 200) {
      const currencies =
        response && response.data.data ? response.data.data : [];
      dispatch({
        type: GET_CURRENCIES_SUCCESS,
        payload: currencies,
      });
    }
    //   const options = currencies.map((curr) => ({
    //     value: curr.uuid,
    //     label: curr.currency,
    //   }));
    //   setcurrencyOptions(options);
    // }

    // Handle successful authentication, e.g., set user state, redirect, etc.
  } catch (error) {
    ErrorApiAlert("Error Fetching Offline Suppliers");
    dispatch({ type: GET_CURRENCIES_ERROR });
  }
};
