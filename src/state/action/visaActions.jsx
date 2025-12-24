import {
  showErrorToast,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import {
  ADD_VISA_CATEGORY_DATA_REQUEST,
  ADD_VISA_CATEGORY_DATA_REQUEST_ERROR,
  ADD_VISA_CATEGORY_DATA_REQUEST_FAIL,
  ADD_VISA_CATEGORY_DATA_REQUEST_SUCCESS,
  FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST,
  FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_ERROR,
  FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_FAIL,
  FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_SUCCESS,
  EDIT_VISA_CATEGORY_DATA_REQUEST,
  EDIT_VISA_CATEGORY_DATA_REQUEST_FAIL,
  EDIT_VISA_CATEGORY_DATA_REQUEST_ERROR,
  EDIT_VISA_CATEGORY_DATA_REQUEST_SUCCESS,
  ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST,
  ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_ERROR,
  ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_FAIL,
  ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_SUCCESS,
  ADD_SUPPLIER_VISA_RATE_DATA_REQUEST,
  ADD_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
  ADD_SUPPLIER_VISA_RATE_DATA_REQUEST_FAIL,
  ADD_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
  GET_SUPPLIER_VISA_RATE_DATA_REQUEST,
  GET_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
  GET_SUPPLIER_VISA_RATE_DATA_REQUEST_FAIL,
  GET_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
  DEL_SUPPLIER_VISA_RATE_DATA_REQUEST,
  DEL_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
  DEL_SUPPLIER_VISA_RATE_DATA_REQUEST_FAIL,
  DEL_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
  EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST,
  EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
  EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
  ADD_VISA_OFFLINE_DATA_REQUEST,
  ADD_VISA_OFFLINE_DATA_REQUEST_SUCCESS,
  ADD_VISA_OFFLINE_DATA_REQUEST_ERROR,
  GET_VISA_OFFLINE_DATA_REQUEST,
  GET_VISA_OFFLINE_DATA_REQUEST_SUCCESS,
  GET_VISA_OFFLINE_DATA_REQUEST_ERROR,
  GET_VISA_OFFLINE_SINGLE_REQUEST,
  GET_VISA_OFFLINE_SINGLE_REQUEST_SUCCESS,
  GET_VISA_OFFLINE_SINGLE_REQUEST_ERROR,
  GET_RATES_POSTED_REQUEST,
  GET_RATES_POSTED_REQUEST_SUCCESS,
  GET_RATES_POSTED_REQUEST_ERROR,
} from "../constants/visaConstants";

import axios from "axios";
const apiUrl2 = import.meta.env.VITE_REACT_APP_BASE_URL;
const token = localStorage.getItem("token");
// Only log token if it exists to avoid console clutter
if (token) {
  //console.log("Token found:", token);
}
// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
// };

export const addVisaCategory =
  (visaCategory, setVisaCategory) => async (dispatch) => {
    try {
      dispatch({ type: ADD_VISA_CATEGORY_DATA_REQUEST });

      const { data } = await axios.post(
        `${apiUrl2}api/supplierVisaCategory`,
        { visaCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (data.statusCode === 200) {
        console.log(data.statusCode);
        dispatch({
          type: ADD_VISA_CATEGORY_DATA_REQUEST_SUCCESS,
          payload: data,
        });
        setVisaCategory("");
        SuccessApiToast("Visa Category Added Successfully");
      }
    } catch (error) {
      console.error("Error adding visa category:", error);
      dispatch({
        type: ADD_VISA_CATEGORY_DATA_REQUEST_ERROR,
      });
      showErrorToast(error.message);
    }
  };

//...Get All Visa Category...//

export const getAllVisaCategories = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST });

    const { data } = await axios.get(`${apiUrl2}api/supplierVisaCategory`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (data.statusCode === 200) {
      console.log(data.statusCode);
      dispatch({
        type: FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_SUCCESS,
        payload: data,
      });
      // SuccessApiToast("Hotel Added Successfully");
    }
  } catch (error) {
    console.error("Error adding visa category:", error);
    dispatch({
      type: FETCH_ALL_VISA_CATEGORIES_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//...Get Visa Category For Edit..//

export const getVisaCategoryForEdit = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_VISA_CATEGORY_DATA_REQUEST });

    const { data } = await axios.get(
      `${apiUrl2}api/supplierVisaCategory/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.statusCode === 200) {
      dispatch({
        type: EDIT_VISA_CATEGORY_DATA_REQUEST_SUCCESS,
        payload: data,
      });
      return data;
    }
  } catch (error) {
    console.error("Error submitting visa rates:", error);
    dispatch({
      type: EDIT_VISA_CATEGORY_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//...Update Visa Category ..//

export const updateVisaCategory =
  (id, visaCategory, setVisaCategory) => async (dispatch) => {
    try {
      dispatch({ type: ADD_VISA_CATEGORY_DATA_REQUEST });

      const { data } = await axios.put(
        `${apiUrl2}api/supplierVisaCategory/${id}`,
        { visaCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.statusCode === 200) {
        dispatch({
          type: ADD_VISA_CATEGORY_DATA_REQUEST_SUCCESS,
          // payload: data,
        });
        setVisaCategory("");
        SuccessApiToast("Visa Category Updated Successfully");
        return data;
      }
    } catch (error) {
      console.error("Error submitting visa rates:", error);
      dispatch({
        type: ADD_VISA_CATEGORY_DATA_REQUEST_ERROR,
      });
      showErrorToast(error.message);
    }
  };

//..Add Supplier Visa Rate Child...//

export const addVisaRateChild = (ratePayload) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST });

    const { data } = await axios.post(
      `${apiUrl2}api/supplierVisaRate/`,
      ratePayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (data.statusCode === 200) {
      console.log(data.statusCode);
      console.log(data);
      dispatch({
        type: ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_SUCCESS,
        payload: data,
      });
      // SuccessApiToast("Hotel Added Successfully");
      return data;
    }
  } catch (error) {
    console.error("Error adding visa category:", error);
    dispatch({
      type: ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//..Add Supplier Visa Rate Main...//

export const addVisaRateMain =
  (formData, uuids, setFormData) => async (dispatch) => {
    try {
      dispatch({ type: ADD_SUPPLIER_VISA_RATE_DATA_REQUEST });

      const nextApiPayload = {
        applicantNationality: formData.applicantNationality,
        supplier: formData.supplier,
        currency: formData.currency,
        destinationCountry: formData.destinationCountry,
        visaCategory: formData.visaCategory,
        supplierVisaRate: uuids.map((item) => ({ uuid: item })),
      };
      console.log(nextApiPayload);

      const { data } = await axios.post(
        `${apiUrl2}api/supplierVisa/`,
        nextApiPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.statusCode === 200) {
        dispatch({
          type: ADD_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
          payload: data,
        });
        SuccessApiToast("Supplier Visa Rates Added Successfully");
        setFormData({
          applicantNationality: "",
          supplier: "",
          currency: "",
          destinationCountry: "",
          visaCategory: "",
          rates: [{ supplierRate: "", agentRate: "", ageFrom: "", ageTo: "" }],
        });
      }
    } catch (error) {
      console.error("Error submitting visa rates:", error);
      dispatch({
        type: ADD_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
      });
      showErrorToast(error.message);
    }
  };

//..Get All Supplier Visa Rates Main...//

export const getVisaRateMain = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUPPLIER_VISA_RATE_DATA_REQUEST });

    const { data } = await axios.get(`${apiUrl2}api/supplierVisa/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.statusCode === 200) {
      dispatch({
        type: GET_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.error("Error submitting visa rates:", error);
    dispatch({
      type: GET_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//..Del All Supplier Visa Rates Main...//

export const delVisaRateMain = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: DEL_SUPPLIER_VISA_RATE_DATA_REQUEST });

    const { data } = await axios.delete(`${apiUrl2}api/supplierVisa/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.statusCode === 200) {
      dispatch({
        type: DEL_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
        // payload: data,
      });
    }
  } catch (error) {
    console.error("Error submitting visa rates:", error);
    dispatch({
      type: DEL_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//...Get Visa Rate For Edit..//

export const getVisaRateFOrEdit = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST });

    const { data } = await axios.get(`${apiUrl2}api/supplierVisa/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.statusCode === 200) {
      dispatch({
        type: EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.error("Error submitting visa rates:", error);
    dispatch({
      type: EDIT_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//...Update Visa Rate..//

export const updateSupplyVisaMain =
  (uuid, supplyVisaData) => async (dispatch) => {
    try {
      console.log(
        uuid,
        "-----------------------==================---------------------"
      );
      dispatch({ type: ADD_SUPPLIER_VISA_RATE_DATA_REQUEST });

      const { data } = await axios.put(
        `${apiUrl2}api/supplierVisa/${uuid}`,
        supplyVisaData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.statusCode === 200) {
        dispatch({
          type: ADD_SUPPLIER_VISA_RATE_DATA_REQUEST_SUCCESS,
          payload: data,
        });
        return data;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error submitting visa rates:", error);
      dispatch({
        type: ADD_SUPPLIER_VISA_RATE_DATA_REQUEST_ERROR,
      });
      showErrorToast(error.message);
    }
  };

//...Update Visa Rate ..//

export const updateVisaRate = (uuid, VisaRateData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST });

    const { data } = await axios.put(
      `${apiUrl2}api/supplierVisaRate/${uuid}`,
      VisaRateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.statusCode === 200) {
      dispatch({
        type: ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_SUCCESS,
        payload: data,
      });
      SuccessApiToast("Supplier Visa Rates Updated Successfully");
      dispatch(getVisaRateMain());
      return data;
    }
  } catch (error) {
    console.error("Error submitting visa rates:", error);
    dispatch({
      type: ADD_SUPPLIER_VISA_RATE_CHILD_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//..Add Offline Vsa..//
export const addOfflineVisa = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_VISA_OFFLINE_DATA_REQUEST });

    const { data } = await axios.post(
      `${apiUrl2}api/offlineVisaBooking`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (data.statusCode === 200) {
      console.log(data, "============================");
      dispatch({
        type: ADD_VISA_OFFLINE_DATA_REQUEST_SUCCESS,
        payload: data,
      });
      SuccessApiToast("Visa Category Added Successfully");
    }
  } catch (error) {
    console.error("Error adding visa category:", error);
    dispatch({
      type: ADD_VISA_OFFLINE_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//..Get All Offline Visa ..//

export const getAllOfflineVisa = () => async (dispatch) => {
  try {
    dispatch({ type: GET_VISA_OFFLINE_DATA_REQUEST });

    const { data } = await axios.get(`${apiUrl2}api/offlineVisaBooking/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.statusCode === 200) {
      console.log(data);
      dispatch({
        type: GET_VISA_OFFLINE_DATA_REQUEST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.error("Error Occur in Getting Visa Offline:", error);
    dispatch({
      type: GET_VISA_OFFLINE_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//..Get Single Offline Visa for Edit..//

export const getSinfleOfflineVisa = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: GET_VISA_OFFLINE_SINGLE_REQUEST });

    const { data } = await axios.get(
      `${apiUrl2}api/offlineVisaBooking/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.statusCode === 200) {
      console.log(data);
      dispatch({
        type: GET_VISA_OFFLINE_SINGLE_REQUEST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.error("Error Occur in Getting Visa Offline:", error);
    dispatch({
      type: GET_VISA_OFFLINE_SINGLE_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//..Update Offline Vsa..//
export const updateOfflineVisa = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_VISA_OFFLINE_DATA_REQUEST });

    const { data } = await axios.put(
      `${apiUrl2}api/offlineVisaBooking/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (data.statusCode === 200) {
      // console.log(data , "============================");
      dispatch({
        type: ADD_VISA_OFFLINE_DATA_REQUEST_SUCCESS,
        payload: data,
      });
      SuccessApiToast("Visa Offline Updated Successfully");
    }
  } catch (error) {
    console.error("Error adding visa category:", error);
    dispatch({
      type: ADD_VISA_OFFLINE_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//..Update Offline Vsa..//
export const updateOfflineVisaImages = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: ADD_VISA_OFFLINE_DATA_REQUEST });

    const { data } = await axios.put(
      `${apiUrl2}api/offlineVisaBooking/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (data.statusCode === 200) {
      // console.log(data , "============================");
      dispatch({
        type: ADD_VISA_OFFLINE_DATA_REQUEST_SUCCESS,
        payload: data,
      });
      SuccessApiToast("Updated Successfully");
    }
  } catch (error) {
    console.error("Error Occur:", error);
    dispatch({
      type: ADD_VISA_OFFLINE_DATA_REQUEST_ERROR,
    });
    showErrorToast(error.message);
  }
};

//..Get Rates For Offline Visa Posted ...//

export const getRatesForPosted = (payload) => async (dispatch) => {
  try {
    dispatch({ type: GET_RATES_POSTED_REQUEST });

    const { data } = await axios.post(
      `${apiUrl2}api/offlineVisaBooking/findVisaRate/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.statusCode === 200) {
      console.log(data);
      dispatch({
        type: GET_RATES_POSTED_REQUEST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.error("Error Occur in Getting Visa Offline:", error);
    dispatch({
      type: GET_RATES_POSTED_REQUEST_ERROR,
    });
    showErrorToast(error.response.data.message);
  }
};



//..Send Mail offline Visa Posted ...//

export const sendOfflineVisaMail = (payload) => async (dispatch) => {
  try {
    dispatch({ type: GET_RATES_POSTED_REQUEST });

    const { data } = await axios.post(
      `${apiUrl2}api/offlineVisaBooking/sendVisaInfoEmail/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.statusCode === 200) {
      console.log(data);
      dispatch({
        type: GET_RATES_POSTED_REQUEST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.error("Error Occur in Getting Visa Offline:", error);
    dispatch({
      type: GET_RATES_POSTED_REQUEST_ERROR,
    });
    showErrorToast(error.response.data.message);
  }
};