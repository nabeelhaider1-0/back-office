import axios from "axios";

const { VITE_REACT_APP_AXIOS_RETRY } = import.meta.env;
const AXIOS_RETRY = VITE_REACT_APP_AXIOS_RETRY;
const apiUrl2 = import.meta.env.VITE_REACT_APP_BASE_URL;
const API_BASE_URL = import.meta.env.VITE_SCMS_API_URL || "https://static-cms.stg.escapra.com";
console.log("API_BASE_URL:", API_BASE_URL, apiUrl2);
export const auth = async (email, password) => {
  try {
    const loginData = {
      email,
      password,
    };

    const response = await axios.post(
      `${apiUrl2}auth/staff/login/`,
      loginData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

// login function
export const authenticateStaff = async (email, password) => {
  try {
    const requestData = {
      email,
      password,
    };

    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/auth/staff/login/`;

    const response = await axios.post(apiUrl, requestData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// this is get call nabeel we are using this pattern
//   getallbranches
export const getAllBranches = async () => {
  return axios.get(`${apiUrl2}api/branch/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

export const getOneBranch = async (uuid, token) => {
  try {
    const apiUrl = `${apiUrl2}api/branch/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBranch = (branchData) => {
  if (branchData.active) {
    branchData.active = "yes";
  } else {
    branchData.active = "no";
  }

  if (branchData.receivedBookingEmails) {
    branchData.receivedBookingEmails = "yes";
  } else {
    branchData.receivedBookingEmails = "no";
  }

  if (branchData.jointVenture) {
    branchData.jointVenture = "yes";
  } else {
    branchData.jointVenture = "no";
  }

  return axios.post(`${apiUrl2}api/branch/`, branchData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // [CONTENT_TYPE]: APPLICATION_X_WWW_FORM_URLENCODED,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
    // errorHandling: {
    //   global: true,
    // },
  });
};

export const updateBranch = (uuid, branchData) => {
  if (branchData.active) {
    branchData.active = "yes";
  } else {
    branchData.active = "no";
  }

  if (branchData.receivedBookingEmails) {
    branchData.receivedBookingEmails = "yes";
  } else {
    branchData.receivedBookingEmails = "no";
  }

  if (branchData.jointVenture) {
    branchData.jointVenture = "yes";
  } else {
    branchData.jointVenture = "no";
  }

  return axios.put(`${apiUrl2}api/branch/${uuid}`, branchData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // [CONTENT_TYPE]: APPLICATION_X_WWW_FORM_URLENCODED,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
    // errorHandling: {
    //   global: true,
    // },
  });
};

//   deleteBranch
// sample calling paramter
// const branchUuid = '886f668f-25c1-421a-be7b-c287b6b0d242'; /
export const deleteBranch = (uuid) => {
  return axios.delete(`${apiUrl2}api/branch/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // [CONTENT_TYPE]: APPLICATION_X_WWW_FORM_URLENCODED,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
    // errorHandling: {
    //   global: true,
    // },
  });
};

// getAllOfflineBookingHotels
export const getAllOfflineBookingHotels = async (token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingHotel/`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//   getOneOfflineBookingHotel
// samplecallingparameter
// const hotelUuid = '727112ed-52f4-4c8e-a7ac-ea2abcdb0685';
export const getOneOfflineBookingHotel = async (uuid, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingHotel/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//   createOfflineBookingHotel
// sample calling parameter
// const bookingData = {
//     country: 'testing',
//     city: 'testing',
//     checkIn: '12/08/2023',
//     checkOut: '13/08/2023',
//     totalNights: '2',
//     hotelAddress: 'testing',
//     hotelPhone: 'testing',
//     bookingStatus: 'testing',
//     supplierReference: 'testing',
//     agentReference: 'testing',
//     passengerNationality: 'testing',
//     roomNo: ['01', '02'],
//     paxDetail: ['name12', 'name23'],
//     supplierType: 'testing',
//     supplierName: 'testing',
//     supplierProfile: 'testing',
//     supplierCurrency: 'testing',
//     agentCurrency: 'testing',
//     appliedMultiplier: 'testing',
//     markupType: 'testing',
//     agentMarkup: 'testing',
//     totalMarkup: 'testing',
//     roomDescription: 'testing',
//     roomType: ['Double', 'Single'],
//     totalRooms: ['2', '3'],
//     date: 'testing',
//     supplierDiscount: 'testing',
//     agentDiscount: 'testing',
//     applicableTax: 'testing',
//     paymentGatewayCharge: 'testing',
//     passportNumber: 'testing',
//     flightNumber: 'testing',
//     PNR: 'testing',
//     arrivalDestination: 'testing',
//     arrivalDate: 'testing',
//     emergencyContact: 'testing',
//     cancellationDate: 'testing',
//     cancellationPolicyForAgent: 'testing',
//     cancellationPolicyForSupplier: 'testing',
//     termsAndCondition: 'testing',
//     remarks: 'testing',
//     emailTo: 'testing',
//     hotelUuid: '5368ec68-1bad-466f-ae07-6649fcb0f1b0',
//     roomMealBasisUuid: '77c12dd6-5f45-42bf-bf26-20f87908e977',
//     agentUuid: 'cc67927e-d081-4e72-a5c0-19cdeddaa2bd',
//   };

export const createOfflineBookingHotel = async (bookingData, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingHotel/`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, bookingData, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//   updateOfflineBookingHotel

// sample calling parameters
// const bookingUuid = '74acecb1-4d4f-451d-8cb7-d1b08778fef9'; // Replace with the actual booking UUID

// // Define the updated booking data
// const updatedBookingData = {
//   country: 'testing12',
//   city: 'testing12',
//   checkIn: '12/08/2023',
//   checkOut: '13/08/2023',
//   totalNights: '2',
//   hotelAddress: 'testing',
//   hotelPhone: 'testing',
//   bookingStatus: 'testing',
//   supplierReference: 'testing',
//   agentReference: 'testing',
//   passengerNationality: 'testing',
//   roomNo: ['01', '02'],
//   paxDetail: ['name12', 'name23'],
//   supplierType: 'testing',
//   supplierName: 'testing',
//   supplierProfile: 'testing',
//   supplierCurrency: 'testing',
//   agentCurrency: 'testing',
//   appliedMultiplier: 'testing',
//   markupType: 'testing',
//   agentMarkup: 'testing',
//   totalMarkup: 'testing',
//   roomDescription: 'testing',
//   roomType: ['Double', 'Single'],
//   totalRooms: ['2', '3'],
//   date: 'testing',
//   supplierDiscount: 'testing',
//   agentDiscount: 'testing',
//   applicableTax: 'testing',
//   paymentGatewayCharge: 'testing',
//   passportNumber: 'testing',
//   flightNumber: 'testing',
//   PNR: 'testing',
//   arrivalDestination: 'testing',
//   arrivalDate: 'testing',
//   emergencyContact: 'testing',
//   cancellationDate: 'testing',
//   cancellationPolicyForAgent: 'testing',
//   cancellationPolicyForSupplier: 'testing',
//   termsAndCondition: 'testing',
//   remarks: 'testing',
//   emailTo: 'testing',
//   hotelUuid: '5368ec68-1bad-466f-ae07-6649fcb0f1b0',
//   roomMealBasisUuid: '77c12dd6-5f45-42bf-bf26-20f87908e977',
//   agentUuid: 'cc67927e-d081-4e72-a5c0-19cdeddaa2bd',
// };

export const updateOfflineBookingHotel = async (
  uuid,
  updatedBookingData,
  token
) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingHotel/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.put(apiUrl, updatedBookingData, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// deleteOfflineBookingHotel
// samplecalling parameter
// const bookingUuid = 'adb99e62-a8b7-4316-ab60-4dc0939a2de5';
export const deleteOfflineBookingHotel = async (uuid, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingHotel/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// getAllOfflineBookingFlights

export const getAllOfflineBookingFlights = async (token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingFlight/`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//   getOneOfflineBookingFlight

// sample calling parameter
// const flightUuid = '727112ed-52f4-4c8e-a7ac-ea2abcdb0685';
export const getOneOfflineBookingFlight = async (uuid, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingFlight/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//   createOfflineBookingFlight

// Define the offline booking flight data
//  const offlineBookingFlightData = {
//     tripType: 'testing',
//     flightProvider: 'testing',
//     bookingPNR: 'testing',
//     ticketingPNR: 'testing',
//     bookingStatus: 'testing',
//     airline: 'testing',
//     flightNumber: 'testing',
//     travelClass: 'testing',
//     departure: 'testing',
//     arrival: 'testing',
//     departureDate: 'testing',
//     arrivalDate: 'testing',
//     departureTime: 'testing',
//     arrivalTime: 'testing',
//     meal: 'testing',
//     baggageInformation: 'testing',
//     supplierCurrency: 'testing',
//     agentCurrency: 'testing',
//     currencyMultiplier: 'testing',
//     currentRate: 'testing',
//     supplierRate: 'testing',
//     agentMarkup: 'testing',
//     totalMarkup: 'testing',
//     bookingAmount: 'testing',
//     salutation: 'testing',
//     firstName: 'testing',
//     lastName: 'testing',
//     passengerType: 'testing',
//     DOB: 'testing',
//     passportNumber: 'testing',
//     passportExpiryDate: 'testing',
//     country: 'testing',
//     ticketNumber: 'testing',
//     frequentFlyer: 'testing',
//     frequentFlyerNumber: 'testing',
//     contactSalutation: 'testing',
//     contactFirstName: 'testing',
//     contactLastName: 'testing',
//     street: 'testing',
//     town: 'testing',
//     postalCode: 'testing',
//     province: 'testing',
//     contactCountry: 'testing',
//     phone: 'testing',
//     email: 'testing',
//     agentUuid: 'cc67927e-d081-4e72-a5c0-19cdeddaa2bd',
//   };
export const createOfflineBookingFlight = async (bookingData, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingFlight/`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, bookingData, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// updateOfflineBookingFlight
// sample calling parameters
// const flightUuid = 'd822516a-a803-4231-baf5-15e9599d8ba4';

// const updatedOfflineBookingFlightData = {
//     tripType: 'testing12',
//     flightProvider: 'testing12',
//     bookingPNR: 'testing',
//     ticketingPNR: 'testing',
//     bookingStatus: 'testing',
//     airline: 'testing',
//     flightNumber: 'testing',
//     travelClass: 'testing',
//     departure: 'testing',
//     arrival: 'testing',
//     departureDate: 'testing',
//     arrivalDate: 'testing',
//     departureTime: 'testing',
//     arrivalTime: 'testing',
//     meal: 'testing',
//     baggageInformation: 'testing',
//     supplierCurrency: 'testing',
//     agentCurrency: 'testing',
//     currencyMultiplier: 'testing',
//     currentRate: 'testing',
//     supplierRate: 'testing',
//     agentMarkup: 'testing',
//     totalMarkup: 'testing',
//     bookingAmount: 'testing',
//     salutation: 'testing',
//     firstName: 'testing',
//     lastName: 'testing',
//     passengerType: 'testing',
//     DOB: 'testing',
//     passportNumber: 'testing',
//     passportExpiryDate: 'testing',
//     country: 'testing',
//     ticketNumber: 'testing',
//     frequentFlyer: 'testing',
//     frequentFlyerNumber: 'testing',
//     contactSalutation: 'testing',
//     contactFirstName: 'testing',
//     contactLastName: 'testing',
//     street: 'testing',
//     town: 'testing',
//     postalCode: 'testing',
//     province: 'testing',
//     contactCountry: 'testing',
//     phone: 'testing',
//     email: 'testing',
//     agentUuid: 'cc67927e-d081-4e72-a5c0-19cdeddaa2bd',
//   };

export const updateOfflineBookingFlight = async (uuid, updatedData, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingFlight/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.put(apiUrl, updatedData, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// deleteOfflineBookingFlight
// sample calling parameter
// const flightUuid = 'd822516a-a803-4231-baf5-15e9599d8ba4';
export const deleteOfflineBookingFlight = async (uuid, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingFlight/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// getAllOfflineBookingTransfers

export const getAllOfflineBookingTransfers = async (token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingTransfer`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// getOneOfflineBookingTransfer
// sample calling parameter
// const transferUuid = '727112ed-52f4-4c8e-a7ac-ea2abcdb0685'; //

export const getOneOfflineBookingTransfer = async (uuid, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingTransfer/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//   createOfflineBookingTransfer
// sample calling parameters
// const transferData = {
//     "nationality": "testing",
//     "country": "testing",
//     "city": "testing",
//     "transferDate": "testing",
//     "bookingStatus": "testing",
//     "agentReferenceNumber": "testing",
//     "confirmationNumber": "testing",
//     "supplierType": "testing",
//     "supplierProfile": "testing",
//     "transferName": "testing",
//     "supplierCurrency": "testing",
//     "agentCurrency": "testing",
//     "appliedMultiplier": "testing",
//     "currencyExchangeRate": "testing",
//     "agentMarkup": "testing",
//     "totalMarkup": "testing",
//     "leaderSalutation": "testing",
//     "leaderFirstName": "testing",
//     "leaderLastName": "testing",
//     "vehicleNumber": "testing",
//     "adults": "testing",
//     "children": "testing",
//     "leadName": "testing",
//     "parkingFee": "testing",
//     "driverTip": "testing",
//     "representativeCost": "testing",
//     "guideCost": "testing",
//     "touristicEntranceFee": "testing",
//     "vehicleSupplierRate": "testing",
//     "agentRate": "testing",
//     "supplierSurcharge": "testing",
//     "agentSurcharge": "testing",
//     "supplierRate": "testing",
//     "totalSupplierRate": "testing",
//     "applyTax": "testing",
//     "totalAgentRate": "testing",
//     "agentCancellationDeadline": "testing",
//     "meetingPoint": "testing",
//     "cancellationPolicy": "testing",
//     "supplierCancellationPolicy": "testing",
//     "remarks": "testing",
//     "emailTo": "testing",
//     "offlineSupplierUuid": "4dcf6602-576a-481b-b362-1ee44103fd5f",
//     "onlineSupplierUuid": "5682bd1c-29f2-470f-8bef-2491569251b8",
//     "vehicleUuid": "43a4706d-fee2-4477-bc47-2833eb651ae8",
//     "agentUuid": "cc67927e-d081-4e72-a5c0-19cdeddaa2bd"
//   };

export const createOfflineBookingTransfer = async (transferData, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingTransfer/`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(apiUrl, transferData, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// updateOfflineBookingTransfer
// sample calling parameter
//  const transferUuid = '38846edd-68a8-4774-bc7b-b1d9baae0cf1';
// const updatedTransferData = {
//     "nationality": "testing12",
//     "country": "updatedCountry",
//     "city": "updatedCity",
//     "transferDate": "updatedTransferDate",
//     "bookingStatus": "updatedBookingStatus",
//     "agentReferenceNumber": "updatedAgentReferenceNumber",
//     "confirmationNumber": "updatedConfirmationNumber",
//     "supplierType": "updatedSupplierType",
//     "supplierProfile": "updatedSupplierProfile",
//     "transferName": "updatedTransferName",
//     "supplierCurrency": "updatedSupplierCurrency",
//     "agentCurrency": "updatedAgentCurrency",
//     "appliedMultiplier": "updatedAppliedMultiplier",
//     "currencyExchangeRate": "updatedCurrencyExchangeRate",
//     "agentMarkup": "updatedAgentMarkup",
//     "totalMarkup": "updatedTotalMarkup",
//     "leaderSalutation": "updatedLeaderSalutation",
//     "leaderFirstName": "updatedLeaderFirstName",
//     "leaderLastName": "updatedLeaderLastName",
//     "vehicleNumber": "updatedVehicleNumber",
//     "adults": "updatedAdults",
//     "children": "updatedChildren",
//     "leadName": "updatedLeadName",
//     "parkingFee": "updatedParkingFee",
//     "driverTip": "updatedDriverTip",
//     "representativeCost": "updatedRepresentativeCost",
//     "guideCost": "updatedGuideCost",
//     "touristicEntranceFee": "updatedTouristicEntranceFee",
//     "vehicleSupplierRate": "updatedVehicleSupplierRate",
//     "agentRate": "updatedAgentRate",
//     "supplierSurcharge": "updatedSupplierSurcharge",
//     "agentSurcharge": "updatedAgentSurcharge",
//     "supplierRate": "updatedSupplierRate",
//     "totalSupplierRate": "updatedTotalSupplierRate",
//     "applyTax": "updatedApplyTax",
//     "totalAgentRate": "updatedTotalAgentRate",
//     "agentCancellationDeadline": "updatedAgentCancellationDeadline",
//     "meetingPoint": "updatedMeetingPoint",
//     "cancellationPolicy": "updatedCancellationPolicy",
//     "supplierCancellationPolicy": "updatedSupplierCancellationPolicy",
//     "remarks": "updatedRemarks",
//     "emailTo": "updatedEmailTo",
//     "offlineSupplierUuid": "updatedOfflineSupplierUuid",
//     "onlineSupplierUuid": "updatedOnlineSupplierUuid",
//     "vehicleUuid": "updatedVehicleUuid",
//     "agentUuid": "updatedAgentUuid",
//   };

export const updateOfflineBookingTransfer = async (
  uuid,
  transferData,
  token
) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingTransfer/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.put(apiUrl, transferData, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// deleteOfflineBookingTransfer
// sample calling parameters
// const uuid = '38846edd-68a8-4774-bc7b-b1d9baae0cf1';
export const deleteOfflineBookingTransfer = async (uuid, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingTransfer/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//   getAllOfflineBookingTour
export const getAllOfflineBookingTour = async (token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingTour/`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// getOneOfflineBookingTour
// sample calling parameters
// const uuid = '727112ed-52f4-4c8e-a7ac-ea2abcdb0685';

export const getOneOfflineBookingTour = async (uuid, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingTour/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//createOfflineBookingTour
// const bookingData = {
//     "nationality": "USA",
//     "country": "Canada",
//     "city": "Vancouver",
//     "adults": 2,
//     "children": 1,
//     "leaderSalutation": "Mr",
//     "leaderFirstName": "John",
//     "leaderLastName": "Doe",
//     "passengerSalutation": "Ms",
//     "passengerFirstName": "Jane",
//     "passengerLastName": "Doe",
//     "supplierType": "Hotel",
//     "supplierProfile": "5-star",
//     "activity": "Sightseeing",
//     "bookingStatus": "Confirmed",
//     "activityDate": "2024-01-20T10:00:00",
//     "agentExpirationDate": "2024-01-25T23:59:59",
//     "confirmationNumber": "123456",
//     "agentReferenceNumber": "ABC789",
//     "pickupPoint": "Downtown",
//     "vehicleNumber": "XYZ123",
//     "pickupTime": "10:30 AM",
//     "dropoffPoint": "Tourist Attraction",
//     "dropoffTime": "3:00 PM",
//     "supplierCurrency": "USD",
//     "agentCurrency": "CAD",
//     "appliedMultiplier": 1.5,
//     "currentRate": 100.0,
//     "agentMarkup": 20.0,
//     "totalMarkup": 30.0,
//     "applicableTax": 5.0,
//     "supplierAdultRate": 80.0,
//     "supplierChildrenRate": 40.0,
//     "supplierDiscount": 10.0,
//     "totalSupplierRate": 100.0,
//     "agentAdultRate": 120.0,
//     "agentChildrenRate": 60.0,
//     "agentDiscount": 15.0,
//     "totalAgentRate": 150.0,
//     "agentRateWithTax": 157.5,
//     "paymentGatewayCharge": 5.0,
//     "cancellationPolicy": "Free cancellation up to 48 hours",
//     "supplierCancellationPolicy": "No cancellation allowed",
//     "remarks": "Special requests: Non-smoking room",
//     "inclusion": "Guided tour, Transportation",
//     "exclusion": "Meals",
//     "termsAndCondition": "Subject to weather conditions",
//     "emailTo": "john.doe@example.com",
//     "offlineSupplierUuid": "4dcf6602-576a-481b-b362-1ee44103fd5f",
//     "onlineSupplierUuid": "5682bd1c-29f2-470f-8bef-2491569251b8",
//     "agentUuid": "cc67927e-d081-4e72-a5c0-19cdeddaa2bd"
//   };
export const createOfflineBookingTour = async (bookingData, token) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingTour/`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, bookingData, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// updateOfflineBookingTour
// const uuid = '42f86fb5-af32-48e2-9792-edef0b6cc60f';
// const bookingData = {
//   // Your updated booking data object here
//   "nationality": "testing12",
//   "country": "testing",
//   "city": "testing",
//   "adults": "testing",
//   "children": "testing",
//   "leaderSalutation": "testing",
//   "leaderFirstName": "testing",
//   "leaderLastName": "testing",
//   "passengerSalutation": "testing",
//   "passengerFirstName": "testing",
//   "passengerLastName": "testing",
//   "supplierType": "testing",
//   "supplierProfile": "testing",
//   "activity": "testing",
//   "bookingStatus": "testing",
//   "activityDate": "testing",
//   "agentExpirationDate": "testing",
//   "confirmationNumber": "testing",
//   "agentReferenceNumber": "testing",
//   "pickupPoint": "testing",
//   "vehicleNumber": "testing",
//   "pickupTime": "testing",
//   "dropoffPoint": "testing",
//   "dropoffTime": "testing",
//   "supplierCurrency": "testing",
//   "agentCurrency": "testing",
//   "appliedMultiplier": "testing",
//   "currentRate": "testing",
//   "agentMarkup": "testing",
//   "totalMarkup": "testing",
//   "applicableTax": "testing",
//   "supplierAdultRate": "testing",
//   "supplierChildrenRate": "testing",
//   "supplierDiscount": "testing",
//   "totalSupplierRate": "testing",
//   "agentAdultRate": "testing",
//   "agentChildrenRate": "testing",
//   "agentDiscount": "testing",
//   "totalAgentRate": "testing",
//   "agentRateWithTax": "testing",
//   "paymentGatewayCharge": "testing",
//   "cancellationPolicy": "testing",
//   "supplierCancellationPolicy": "testing",
//   "remarks": "testing",
//   "inclusion": "testing",
//   "exclusion": "testing",
//   "termsAndCondition": "testing",
//   "emailTo": "testing",
//   "offlineSupplierUuid": "4dcf6602-576a-481b-b362-1ee44103fd5f",
//   "onlineSupplierUuid": "5682bd1c-29f2-470f-8bef-2491569251b8",
//   "agentUuid": "cc67927e-d081-4e72-a5c0-19cdeddaa2bd"
// };

export const updateOfflineBookingTour = async (uuid, bookingData, token) => {
  try {
    const apiUrl = `http://localhost:${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingTour/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.put(apiUrl, bookingData, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// deleteOfflineBookingTour
// const uuid = '42f86fb5-af32-48e2-9792-edef0b6cc60f';
export const deleteOfflineBookingTour = async (uuid, token) => {
  try {
    const apiUrl = `http://localhost:${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingTour/${uuid}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(apiUrl, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// getOneStaff
// const uuid = '3b12c8b4-0458-41cf-af61-dfc38f84bc63';
export const getOneStaff = async (uuid) => {
  try {
    const apiUrl = `http://{{port}}/staff/${uuid}`;

    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create Staff
export const createStaff = async (staffData) => {
  if (staffData.accountActive) {
    staffData.accountActive = "yes";
  } else {
    staffData.accountActive = "no";
  }

  if (staffData.jointVenture) {
    staffData.jointVenture = "yes";
  } else {
    staffData.jointVenture = "no";
  }

  if (staffData.canDebug) {
    staffData.canDebug = "yes";
  } else {
    staffData.canDebug = "no";
  }
  if (staffData.bookUnderCancellationPolicy) {
    staffData.bookUnderCancellationPolicy = "yes";
  } else {
    staffData.bookUnderCancellationPolicy = "no";
  }
  if (staffData.cancellationAfterVoucher) {
    staffData.cancellationAfterVoucher = "yes";
  } else {
    staffData.cancellationAfterVoucher = "no";
  }
  if (staffData.receivedBookingEmails) {
    staffData.receivedBookingEmails = "yes";
  } else {
    staffData.receivedBookingEmails = "no";
  }

  return axios.post(`${apiUrl2}api/staff/`, staffData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

export const getAllStaff = async () => {
  return axios.get(`${apiUrl2}api/staff/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

export const deleteStaff = (uuid) => {
  return axios.delete(`${apiUrl2}api/staff/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

// Function to update staff Active Status
export const updateStaffActiveStatus = (uuid, isActive) => {
  const requestBody = {
    accountActive: isActive ? "yes" : "no",
  };

  return axios.put(`${apiUrl2}api/staff/updateStatus/${uuid}`, requestBody, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

// Function to update staff password
export const updateStaffPassword = (uuid, newPassword) => {
  const requestBody = {
    password: newPassword,
  };

  return axios.put(`${apiUrl2}api/staff/updatePassword/${uuid}`, requestBody, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // Add other headers if needed
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

// Function to assign branches to staff
export const assignBranchesToStaff = async (staffUuid, branchUuids) => {
  try {
    const response = await axios.post(
      `${apiUrl2}api/staff/assignBranches/`,
      {
        uuid: staffUuid,
        branchUuid: branchUuids,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        [AXIOS_RETRY]: {
          retries: 3,
        },
      }
    );

    // You can return the response if necessary
    return response;
  } catch (error) {
    // Handle errors

    throw error; // You may want to handle or propagate the error accordingly
  }
};

// Function to update  staff
export const updateStaff = (uuid, staffData) => {
  if (staffData.canDebug) {
    staffData.canDebug = "yes";
  } else {
    staffData.canDebug = "no";
  }

  if (staffData.bookUnderCancellationPolicy) {
    staffData.bookUnderCancellationPolicy = "yes";
  } else {
    staffData.bookUnderCancellationPolicy = "no";
  }

  if (staffData.cancellationAfterVoucher) {
    staffData.cancellationAfterVoucher = "yes";
  } else {
    staffData.cancellationAfterVoucher = "no";
  }

  if (staffData.receivedBookingEmails) {
    staffData.receivedBookingEmails = "yes";
  } else {
    staffData.receivedBookingEmails = "no";
  }

  if (staffData.jointVenture) {
    staffData.jointVenture = "yes";
  } else {
    staffData.jointVenture = "no";
  }

  return axios.put(`${apiUrl2}/staff/${uuid}`, staffData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // [CONTENT_TYPE]: APPLICATION_X_WWW_FORM_URLENCODED,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
    // errorHandling: {
    //   global: true,
    // },
  });
};

//Todays APi calling Work
//Get Email Search Setting
export const getEmailSearch = async () => {
  return axios.get(`${apiUrl2}api/emailSetting/emailSearch`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Get USerLogs Search Setting
export const getUserLog = async () => {
  return axios.get(`${apiUrl2}api/logs/logsuser`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Create Reminders

export const createReminder = async (reminderData) => {
  return await axios.post(`${apiUrl2}api/setreminder`, reminderData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Get all Reminders
export const getAllReminders = async () => {
  return axios.get(`${apiUrl2}api/setreminder`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Delete Reminder Setting
export const deleteReminderSetting = (uuid) => {
  return axios.delete(`${apiUrl2}api/setreminder/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Update Reminder Setting
export const updateReminderSetting = (uuid, reminderData) => {
  return axios.put(`${apiUrl2}api/setreminder/${uuid}`, reminderData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // [CONTENT_TYPE]: APPLICATION_X_WWW_FORM_URLENCODED,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
    // errorHandling: {
    //   global: true,
    // },
  });
};

//Function to Get all Reminders Notifications
export const getAllRemindersNotifications = async () => {
  return axios.get(`${apiUrl2}api/notification`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Update  Reminders Notifications
export const updateReminderReadStatus = (readOrNot) => {
  return axios.put(`${apiUrl2}api/notification/`, readOrNot, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // [CONTENT_TYPE]: APPLICATION_X_WWW_FORM_URLENCODED,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
    // errorHandling: {
    //   global: true,
    // },
  });
};

//Function to Send all Reminders Notifications
export const SendRemindersNotifications = async () => {
  return axios.get(`${apiUrl2}api/setreminder/CurrentReminders/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Get all Reminders Notifications
export const getAllProfiles = async () => {
  return axios.get(`${apiUrl2}api/profile`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Create Rights

export const createRights = async (rightsData) => {
  return await axios.post(`${apiUrl2}api/profileRights`, rightsData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Get all Rights Data
export const getAllRights = async () => {
  return axios.get(`${apiUrl2}api/profileRights`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Get All Profiles

export const getAllProfilesData = async () => {
  return axios.get(`${apiUrl2}api/profile`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Create Profiles

export const createProfiles = async (profilesData) => {
  return await axios.post(`${apiUrl2}api/profile`, profilesData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Delete Profile
export const deleteProfile = (uuid) => {
  return axios.delete(`${apiUrl2}api/profile/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

export const assignRightstoProfile = async (profilerights) => {
  return await axios.post(
    `${apiUrl2}api/profile/assignRights/`,
    profilerights,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      [AXIOS_RETRY]: {
        retries: 3,
      },
    }
  );
};

export const updateProfile = (uuid, profileData) => {
  return axios.put(`${apiUrl2}/profile/${uuid}`, profileData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Create Sub Menu
export const createSubMenu = async (submenu) => {
  return axios.post(`${apiUrl2}api/subMenu/`, submenu, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Create Sub Menu
export const createAgent = async (agentdata) => {
  return axios.post(`${apiUrl2}api/agent/`, agentdata, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Get All Agents
export const getAllAgents = async () => {
  return axios.get(`${apiUrl2}api/agent/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

export const getAllSiteMap = async () => {
  return axios.get(`${apiUrl2}api/sitemap/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
// delete sitemao
export const deleteSiteMap = (uuid) => {
  return axios.delete(`${apiUrl2}api/sitemap/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // [CONTENT_TYPE]: APPLICATION_X_WWW_FORM_URLENCODED,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
    // errorHandling: {
    //   global: true,
    // },
  });
};
export const createSiteMap = (sitemapData) => {
  return axios.post(`${apiUrl2}api/sitemap/`, sitemapData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // [CONTENT_TYPE]: APPLICATION_X_WWW_FORM_URLENCODED,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
    // errorHandling: {
    //   global: true,
    // },
  });
};
export const updateSiteMap = (sitemapData) => {
  return axios.put(`${apiUrl2}api/sitemap/`, sitemapData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // [CONTENT_TYPE]: APPLICATION_X_WWW_FORM_URLENCODED,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
    // errorHandling: {
    //   global: true,
    // },
  });
};
// EMAIL LOGS CALLING
//Get All Agents
export const getEmailLogs = async () => {
  return axios.get(`${apiUrl2}api/logs/emaillogs/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
// Mid Office Settings
export const midofficeSystemSettings = (systemsettings) => {
  return axios.post(`${apiUrl2}api/midoffice/`, systemsettings, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      // [CONTENT_TYPE]: APPLICATION_X_WWW_FORM_URLENCODED,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
    // errorHandling: {
    //   global: true,
    // },
  });
};
export const createEmailSetting = async (emailSettingData) => {
  return axios.post(`${apiUrl2}api/emailSetting/emailnew`, emailSettingData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
export const deleteEmailSetting = (uuid) => {
  return axios.delete(`${apiUrl2}api/emailSetting/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
export const createReport = async (report) => {
  return axios.post(`${apiUrl2}api/report`, report, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Get all Rights Data
export const getAllReports = async () => {
  return axios.get(`${apiUrl2}api/report`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
// assign reports to staff
export const assignReportstoStaff = async (reportstostaff) => {
  return await axios.post(
    `${apiUrl2}api/staff/assignReports/`,
    reportstostaff,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      [AXIOS_RETRY]: {
        retries: 3,
      },
    }
  );
};
// MENUS WORK
//Create Menu
export const createMenu = async (menu) => {
  return axios.post(`${apiUrl2}api/menu/`, menu, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Get All Menues
export const getAllMenues = async () => {
  return axios.get(`${apiUrl2}api/menu/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
export const deleteMenues = (uuid) => {
  return axios.delete(`${apiUrl2}api/menu/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
export const updateMenu = (uuid, menustatusdata) => {
  return axios.put(`${apiUrl2}api/menu/${uuid}`, menustatusdata, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
export const assignMenustoProfile = async (profilemenus) => {
  return await axios.post(`${apiUrl2}api/profile/assignMenu/`, profilemenus, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//  FLights APIS

//Function to Add Flight Rules

export const flightAddRules = async (flightRuleData) => {
  return await axios.post(`${apiUrl2}api/flightRule`, flightRuleData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to GET ALL Flight Rules

export const getAllFlightRules = async () => {
  return axios.get(`${apiUrl2}api/flightRule/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Delete Flight Rules
export const deleteFlightRules = (uuid) => {
  return axios.delete(`${apiUrl2}api/flightRule/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Update  Flight Rules
export const updateFlightRules = (uuid, flightRuleData) => {
  return axios.put(`${apiUrl2}api/flightRule/${uuid}`, flightRuleData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Update  Flight Rules
export const updateFlightRulesAll = (uuid, flightRuleData) => {
  return axios.put(`${apiUrl2}api/flightRule/agent/${uuid}`, flightRuleData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Add Flight PCC OFFICE ID

export const flightAddPccOfficeID = async (flightPCCRuleOfficeIdData) => {
  return await axios.post(`${apiUrl2}api/officeID`, flightPCCRuleOfficeIdData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Get All Flight PCC OFFICE ID
export const getAllflightOfficeID = async () => {
  return axios.get(`${apiUrl2}api/officeID/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Delete Flight PCC OFFICE ID
export const deleteFlightOfficeID = (uuid) => {
  return axios.delete(`${apiUrl2}api/officeID/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Update  PCC OFFICE ID
export const updateFlightOfficeID = (uuid, flightRuleOfficeData) => {
  return axios.put(`${apiUrl2}api/officeID/${uuid}`, flightRuleOfficeData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Add Flight PCC RULES

export const flightAddPccRuless = async (flightPCCRuleData) => {
  return await axios.post(`${apiUrl2}api/flightPCC`, flightPCCRuleData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Get Flight PCC RULES
export const flightGetPccRules = async () => {
  return axios.get(`${apiUrl2}api/flightPCC/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Delete Flight PCC Rules
export const deleteFlightPCCRules = (uuid) => {
  return axios.delete(`${apiUrl2}api/flightPCC/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Update  Flight PCC Rules
export const updateFlightPCCRules = (uuid, flightPCCRuleData) => {
  return axios.put(`${apiUrl2}api/flightPCC/${uuid}`, flightPCCRuleData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Update  Flight PCC Rules
export const updateFlightPCCRulesAll = (uuid, flightPCCRuleData) => {
  return axios.put(`${apiUrl2}api/flightPCC/agent/${uuid}`, flightPCCRuleData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Add Flight QCT RULES

export const flightAddQCTRules = async (flightQCTRuleData) => {
  return await axios.post(`${apiUrl2}api/flightQCTRule`, flightQCTRuleData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to GET Flight QCT RULES

export const flightGetQCTRules = async () => {
  return axios.get(`${apiUrl2}api/flightQCTRule/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Delete Flight QCT RULES

export const deleteFlightQCTRules = (uuid) => {
  return axios.delete(`${apiUrl2}api/flightQCTRule/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Update  Flight QCT Rules
export const updateFlightQCTRules = (uuid, flightQCTRuleData) => {
  return axios.put(`${apiUrl2}api/flightQCTRule/${uuid}`, flightQCTRuleData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Update  Flight QCT Rules
export const updateFlightQCTRulesAll = (uuid, flightQCTRuleData) => {
  return axios.put(
    `${apiUrl2}api/flightQCTRule/agent/${uuid}`,
    flightQCTRuleData,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      [AXIOS_RETRY]: {
        retries: 3,
      },
    }
  );
};
//Function to Add Flight Cancellation RULES

export const flightAddCancellationRules = async (
  flightCancellationRuleData
) => {
  return await axios.post(
    `${apiUrl2}api/flightCancellationRule`,
    flightCancellationRuleData,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      [AXIOS_RETRY]: {
        retries: 3,
      },
    }
  );
};
//Function to GET Flight Cancellation RULES

export const flightGetCancellationRules = async () => {
  return axios.get(`${apiUrl2}api/flightCancellationRule/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Delete Flight Cancellation RULES

export const deleteFlightCancellationRules = (uuid) => {
  return axios.delete(`${apiUrl2}api/flightCancellationRule/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Update  Flight Cancellation Rules
export const updateFlightCancellationRules = (
  uuid,
  flightCancellationRuleData
) => {
  return axios.put(
    `${apiUrl2}api/flightCancellationRule/${uuid}`,
    flightCancellationRuleData,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      [AXIOS_RETRY]: {
        retries: 3,
      },
    }
  );
};

//Masters Section
// Hotels Section

//Function to Add Hotel Amenities

export const addHotelAmenities = async (hotelAmenitiesData) => {
  return await axios.post(`${apiUrl2}api/hotelAmenity`, hotelAmenitiesData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Get All Hotel Amenities

export const gretHotelAmenities = async () => {
  return axios.get(`${apiUrl2}api/hotelAmenity/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Delete Hotel Amenities

export const deleteHotelAmenities = (uuid) => {
  return axios.delete(`${apiUrl2}api/hotelAmenity/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
//Function to Update  Hotel Amenities
export const updateHotelAmenities = (uuid, hotelAmenitiesData) => {
  return axios.put(`${apiUrl2}api/hotelAmenity/${uuid}`, hotelAmenitiesData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
// OPTIMIZED GLOBAL CURDS
export const postDATA = async (data, endpoint) => {
  return await axios.post(`${apiUrl2}${endpoint}`, data, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Add Hotel Locations

export const addHotelLocations = async (hotellocationData) => {
  return await axios.post(`${apiUrl2}api/hotelLocation`, hotellocationData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Get All Hotel Locations

export const gretHotelLocations = async () => {
  return axios.get(`${apiUrl2}api/hotelLocation/`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Delete Hotel Locations

export const deleteHotellocations = (uuids) => {
  return axios.delete(`${apiUrl2}api/hotelLocation/`, {
    data: uuids, // Pass uuids as an object to the data property
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

//Function to Update  Hotel Locations
export const updateHotellocations = (uuid, hotellocationData) => {
  return axios.put(`${apiUrl2}api/hotelLocation/${uuid}`, hotellocationData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

export const updateHotelLocationsAll = async (updates) => {
  try {
    const response = await axios.put(
      `${apiUrl2}api/hotelLocation/`,
      { updates },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        retries: 3, // You can directly specify retries here
      }
    );
    return response.data; // Return response data if needed
  } catch (error) {
    throw error; // Throw error to handle it where the function is called
  }
};

export const getDATA = async (endpoint) => {
  return axios.get(`${apiUrl2}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};


export const getDATAONE = async (endpoint,uuid) => {
  return axios.get(`${apiUrl2}${endpoint}/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

export const delDATA = async (endpoint, uuid) => {
  
  return axios.delete(`${apiUrl2}${endpoint}/${uuid}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};
export const delMultiDATA = (endpoint,uuids) => {
  return axios.delete(`${apiUrl2}${endpoint}`, {
    data: uuids, // Pass uuids as an object to the data property
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

export const putMultiDATA = (endpoint,
  data
) => {
  return axios.put(
    `${apiUrl2}${endpoint}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      [AXIOS_RETRY]: {
        retries: 3,
      },
    }
  );
};


export const putDATA = (endpoint,
  uuid,
  data
) => {
  return axios.put(
    `${apiUrl2}${endpoint}${uuid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      [AXIOS_RETRY]: {
        retries: 3,
      },
    }
  );
};
export const putDataActivate_DeactivateMulti = async (endpoint,updates) => {
  try {
    const response = await axios.put(
      `${apiUrl2}${endpoint}`,
      { updates },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        retries: 3, // You can directly specify retries here
      }
    );
    return response.data; // Return response data if needed
  } catch (error) {
    throw error; // Throw error to handle it where the function is called
  }
};

//Function to Add Inventory Room Category

export const addInventoryRoomCategory = async (inventoryRoomCategoryData) => {
  return await axios.post(
    `${apiUrl2}api/inventoryRoom`,
    inventoryRoomCategoryData,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      [AXIOS_RETRY]: {
        retries: 3,
      },
    }
  );
};


// export const createSupplier = async (bookingData, token) => {
//   try {
//     const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_PORT}/offlineBookingHotel/`;

//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     const response = await axios.post(apiUrl, bookingData, { headers });

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };


// // ================================
// // Create / Insert Supplier
// // ================================
// export const insertSupplier = async (supplierData, token) => {
//   try {
//     const apiUrl = `${apiUrl2}api/suppliers/`;

//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     const response = await axios.post(apiUrl, supplierData, { headers });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // ================================
// // Get All Suppliers
// // ================================
// export const getAllSuppliers = async () => {
//   try {
//     const apiUrl = `${apiUrl2}api/suppliers/`;
// console.log(`${window.localStorage.getItem("token")}`);
//     return axios.get(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem("token")}`,
//       },
//       [AXIOS_RETRY]: {
//         retries: 3,
//       },
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// // ================================
// // Update Supplier
// // ================================
// export const updateSupplier = async (supplierId, supplierData, token) => {
//   try {
//     const apiUrl = `${apiUrl2}api/suppliers/update-supplier/${supplierId}`;

//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     const response = await axios.put(apiUrl, supplierData, { headers });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // ================================
// // Enable / Disable Supplier
// // ================================
// export const toggleSupplierStatus = async (supplierId, status, token) => {
//   try {
//     const apiUrl = `${apiUrl2}api/suppliers/update-supplier/${supplierId}`;

//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     const response = await axios.put(
//       apiUrl,
//       { status }, // example: { status: "enabled" } or { status: "disabled" }
//       { headers }
//     );

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // ================================
// // Delete Supplier
// // ================================
// export const deleteSupplier = async (supplierId, token) => {
//   try {
//     const apiUrl = `${apiUrl2}api/suppliers/${supplierId}`;

//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     const response = await axios.delete(apiUrl, { headers });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };




// // Get all keys
// export const getRedisKeys = async () => {
//      try {
//     const apiUrl = `${apiUrl2}api/redis/all-values`;
// console.log(`${window.localStorage.getItem("token")}`);
//     return axios.get(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem("token")}`,
//       },
//       [AXIOS_RETRY]: {
//         retries: 3,
//       },
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// // Get a single key’s value
// export const getRedisValue = async (key, token) => {
//    const apiUrl = `${apiUrl2}api/redis`;
//   return await axios.get(`${apiUrl}/${key}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // Update key
// export const updateRedisKey = async (key, value, token) => {
//   const apiUrl = `${apiUrl2}api/redis`;
//   return await axios.put(
//     `${apiUrl}/${key}`,
//     { value },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
// };

// // Delete key
// export const deleteRedisKey = async (key, token) => {
//   const apiUrl = `${apiUrl2}api/redis`;
//   return await axios.delete(`${apiUrl}/${key}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // Clear all Redis data
// export const clearRedis = async (token) => {
//   const apiUrl = `${apiUrl2}api/redis`;
//   return await axios.delete(apiUrl, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };




export const createSupplier = async (bookingData, token) => {
  try {
    const apiUrl = `http://${process.env.REACT_APP_API_PORT}/offlineBookingHotel/`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, bookingData, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};


// ================================
// Create / Insert Supplier
// ================================
export const insertSupplier = async (supplierData, token) => {
  try {
    const apiUrl = `${apiUrl2}api/suppliers/`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, supplierData, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ================================
// Get All Suppliers
// ================================
export const getAllSuppliers = async () => {
  try {
    const apiUrl = `${apiUrl2}api/suppliers/`;
console.log(`${window.localStorage.getItem("token")}`);
    return axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      [AXIOS_RETRY]: {
        retries: 3,
      },
    });
  } catch (error) {
    throw error;
  }
};

// ================================
// Update Supplier
// ================================
export const updateSupplier = async (supplierId, supplierData, token) => {
  try {
    const apiUrl = `${apiUrl2}api/suppliers/update-supplier/${supplierId}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.put(apiUrl, supplierData, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ================================
// Enable / Disable Supplier
// ================================
export const toggleSupplierStatus = async (supplierId, status, token) => {
  try {
    const apiUrl = `${apiUrl2}api/suppliers/update-supplier/${supplierId}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.put(
      apiUrl,
      { status }, // example: { status: "enabled" } or { status: "disabled" }
      { headers }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// ================================
// Delete Supplier
// ================================
export const deleteSupplier = async (supplierId, token) => {
  try {
    const apiUrl = `${apiUrl2}api/suppliers/${supplierId}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(apiUrl, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};




// Get all keys
export const getRedisKeys = async () => {
     try {
    const apiUrl = `${apiUrl2}api/redis/all-values`;
console.log(`${window.localStorage.getItem("token")}`);
    return axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      [AXIOS_RETRY]: {
        retries: 3,
      },
    });
  } catch (error) {
    throw error;
  }
};

// Get a single key’s value
export const getRedisValue = async (key, token) => {
   const apiUrl = `${apiUrl2}api/redis`;
  return await axios.get(`${apiUrl}/${key}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update key
export const updateRedisKey = async (key, value, token) => {
  const apiUrl = `${apiUrl2}api/redis`;
  return await axios.put(
    `${apiUrl}/${key}`,
    { value },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Delete key
export const deleteRedisKey = async (key, token) => {
  const apiUrl = `${apiUrl2}api/redis`;
  return await axios.delete(`${apiUrl}/${key}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Clear all Redis data
export const clearRedis = async (token) => {
  const apiUrl = `${apiUrl2}api/redis`;
  return await axios.delete(apiUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
};



// ================================================
// 🌐 Base API Configuration
// ================================================


// Helper to attach token headers
const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// ================================================
// 🏷 LABELS
// ================================================

// ➕ Create Item
export const createItem = (type, data, token) => {
  return axios.post(`${API_BASE_URL}/${type}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllLabels = (token, lang = "en",) =>
  axios.get(`${API_BASE_URL}/labels?lang=${lang}`, authHeader(token));

export const createLabel = (data, token) =>
  axios.post(`${API_BASE_URL}/labels`, data, authHeader(token));

export const updateLabel = (id, data, token) =>
  axios.put(`${API_BASE_URL}/labels/${id}`, data, authHeader(token));

export const deleteLabel = (id, token) =>
  axios.delete(`${API_BASE_URL}/labels/${id}`, authHeader(token));

export const publishLabel = (id, token) =>
  axios.post(`${API_BASE_URL}/labels/${id}/publish`, {}, authHeader(token));

export const rejectLabel = (id, reason, token) =>
  axios.post(`${API_BASE_URL}/labels/${id}/reject`, { reason }, authHeader(token));

// ================================================
// 📄 PAGES
// ================================================
export const getAllPages = (token, lang = 'en') =>
  axios.get(`${API_BASE_URL}/pages?lang=${lang}`, authHeader(token));

export const createPage = (data, token) =>
  axios.post(`${API_BASE_URL}/pages`, data, authHeader(token));

export const updatePage = (id, data, token) =>
  axios.put(`${API_BASE_URL}/pages/${id}`, data, authHeader(token));

export const deletePage = (id, token) =>
  axios.delete(`${API_BASE_URL}/pages/${id}`, authHeader(token));

export const publishPage = (id, token) =>
  axios.post(`${API_BASE_URL}/pages/${id}/publish`, {}, authHeader(token));

export const rejectPage = (id, reason, token) =>
  axios.post(`${API_BASE_URL}/pages/${id}/reject`, { reason }, authHeader(token));

// ================================================
// 🧩 PAGE SECTIONS
// ================================================
export const getAllPageSections = (token, lang = "en") =>
  axios.get(`${API_BASE_URL}/page-sections?lang=${lang}`, authHeader(token));

export const createPageSection = (data, token) =>
  axios.post(`${API_BASE_URL}/page-sections`, data, authHeader(token));

export const updatePageSection = (id, data, token) =>
  axios.put(`${API_BASE_URL}/page-sections/${id}`, data, authHeader(token));

export const deletePageSection = (id, token) =>
  axios.delete(`${API_BASE_URL}/page-sections/${id}`, authHeader(token));

export const publishPageSection = (id, token) =>
  axios.post(`${API_BASE_URL}/page-sections/${id}/publish`, {}, authHeader(token));

export const rejectPageSection = (id, reason, token) =>
  axios.post(`${API_BASE_URL}/page-sections/${id}/reject`, { reason }, authHeader(token));

export const getPageDetailsWithSections = async (slug, token, lang = "en") => {
  return axios.get(`${API_BASE_URL}/pages/${slug}/details?lang=${lang}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPageVersions = (slug, token) => {
  return axios.get(`${API_BASE_URL}/pages/${slug}/versions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const restorePageVersion = (versionId, token) => {
  return axios.post(`${API_BASE_URL}/pages/restore/${versionId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


// ================================================
// 🚨 ALERTS
// ================================================
export const getAllAlerts = (token) =>
  axios.get(`${API_BASE_URL}/alerts`, authHeader(token));

export const createAlert = (data, token) =>
  axios.post(`${API_BASE_URL}/alerts`, data, authHeader(token));

export const updateAlert = (id, data, token) =>
  axios.put(`${API_BASE_URL}/alerts/${id}`, data, authHeader(token));

export const deleteAlert = (id, token) =>
  axios.delete(`${API_BASE_URL}/alerts/${id}`, authHeader(token));

export const publishAlert = (id, token) =>
  axios.post(`${API_BASE_URL}/alerts/${id}/publish`, {}, authHeader(token));

export const rejectAlert = (id, reason, token) =>
  axios.post(`${API_BASE_URL}/alerts/${id}/reject`, { reason }, authHeader(token));

// ================================================
// ❓ FAQS
// ================================================
export const getAllFaqs = (token) =>
  axios.get(`${API_BASE_URL}/faqs`, authHeader(token));

export const createFaq = (data, token) =>
  axios.post(`${API_BASE_URL}/faqs`, data, authHeader(token));

export const updateFaq = (id, data, token) =>
  axios.put(`${API_BASE_URL}/faqs/${id}`, data, authHeader(token));

export const deleteFaq = (id, token) =>
  axios.delete(`${API_BASE_URL}/faqs/${id}`, authHeader(token));

export const publishFaq = (id, token) =>
  axios.post(`${API_BASE_URL}/faqs/${id}/publish`, {}, authHeader(token));

export const rejectFaq = (id, reason, token) =>
  axios.post(`${API_BASE_URL}/faqs/${id}/reject`, { reason }, authHeader(token));

// ================================================
// 🧠 GENERIC CMS ACTIONS (used in StaticContentManagement.jsx)
// ================================================
export const publishItem = async (type, id, token) => {
  const url = `${API_BASE_URL}/${type}/${id}/publish`;

  const config = {
    headers: authHeader(token)
  };

  console.log("🔹 Publishing item...");
  console.log("➡️ API URL:", url);
  console.log("📦 Request Headers:", config);

  try {
    const response = await axios.put(url, {}, config);
    console.log("✅ Publish Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Publish Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};



export const rejectItem = (type, id, reason, token) =>
  axios.post(`${API_BASE_URL}/${type}/${id}/reject`, { reason }, authHeader(token));

export const deleteItem = (type, id, token) =>
  axios.delete(`${API_BASE_URL}/${type}/${id}`, authHeader(token));

export const updateItem = (type, id, data, token) =>
  axios.put(`${API_BASE_URL}/${type}/${id}`, data, authHeader(token));



export const getHeaderLabels = (token, lang = "en") =>
  axios.get(`${API_BASE_URL}/labels/namespace?namespace=header?lang=${lang}`, authHeader(token));