/* eslint-disable react-hooks/exhaustive-deps */

import minus from "../../assets/images/minus_white_img.jpg";
import plus from "../../assets/images/plus_white_img.jpg";
import React, { useEffect, useRef, useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import {
  bookingStatusOptions,
  childSalutations,
  hmmm_options,
  hotel_rating_options,
  mm_options,
  offline_child_options,
  pickup_options,
  room_options,
  salutations,
  supplierProfileOptions,
} from "../../constants/contants";
import Constants from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import excelFileContent from "../../ExcelFiles/worldcities.xlsx";
import excelfilereader from "../../constants/excelfilereader";
import {
  Dateformater,
  ErrorApiAlert,
  generateDateRange,
  parseDate,
  RequiredFieldAlert,
} from "../../constants/globalfunctions";
import { getDATA } from "../../Apis/API";
import ApiRoutes from "../../constants/ApiRoutes";

const BookingAddOfflineHotelInner = ({ data }) => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  // const [startDate1, setStartDate1] = useState(null); // State for the start date
  // const [startDate2, setStartDate2] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the start date
  const [countryOptions, setcountryOptions] = useState([]);
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [countrycitydata, setcountrycitydata] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [cityOptions, setcityOptions] = useState([]);
  const [selectedCity, setselectedCity] = useState(null);
  const [selectedHotel, setselectedHotel] = useState(null);
  const [totalNights, setTotalNights] = useState(null);
  const [hotelData, setHotelData] = useState([]);
  const [hotelDetailsData, setDetailsHotelData] = useState([]);
  const [hoteloptions, setHotelOptions] = useState([]);
  const [onlinesupplierOptions, setOnlineSupplierOptions] = useState([]);
  const [offlinesupplierOptions, setOfflineSupplierOptions] = useState([]);
  const navigateOnRefresh = useNavigate();
  const [isContentVisible, setIsContentVisible] = useState({});
  const contentRefs = useRef([]);
  const [dates, setDates] = useState([]);
  const [roomNo, setRoomNo] = useState([]);
  const [paxDetail, setPaxDetail] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [mealOptionsData, setMealOptionsData] = useState([]);
  const [markupType, setMarkupType] = useState("P");
  const [agentMarkupReadOnly, setAgentMarkupReadOnly] = useState(false);
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelPhone, setHotelPhone] = useState("");
  const [bookingStatus, setBookingStatus] = useState([]);
  const [supplierReference, setSupplierReference] = useState("");
  const [agentReference, setAgentReference] = useState("");
  const [passengerNationality, setPassengerNationality] = useState([]);

  const [supplierType, setSupplierType] = useState("O");
  const [formState, setFormState] = useState({
    supplierName: "",
    supplierProfile: "",
    supplierCurrency: "",
    agentCurrency: "",
    appliedMultiplier: "",
    markupType: "P",
    agentMarkup: "",
    totalMarkup: "",
  });
  const [formData, setFormData] = useState({
    passportNumber: "",
    flightNumber: "",
    PNR: "",
    arrivalDestination: "",
    arrivalDate: "",
    emergencyContact: "",
    specialRemarks: "",
    cancellationDate: "",
    cancellationPolicyForAgent: "",
    cancellationPolicyForSupplier: "",
    termsAndCondition: "",
    remarks: "",
    supplierDiscount: "",
    agentDiscount: "",
    applicableTax: "",
    paymentGatewayCharge: "",
    agentCommission: "",
    supplierCommission: "",

    emailTo: [],
  });

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmailToChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const newEmailTo = checked
        ? [...prevState.emailTo, value]
        : prevState.emailTo.filter((email) => email !== value);
      return {
        ...prevState,
        emailTo: newEmailTo,
      };
    });
  };
  // const handleMarkupTypeChange = (value) => {
  //     setMarkupType(value);
  //     setAgentMarkupReadOnly(value === 'A');
  // };

  useEffect(() => {
    if (
      hotelDetailsData &&
      hotelDetailsData.roomType &&
      hotelDetailsData.totalRooms &&
      dates
    ) {
      const initializeRoomData = () => {
        return hotelDetailsData.roomType.map((roomType, roomTypeIndex) => ({
          roomNo: roomTypeIndex + 1,
          roomDescription: roomType,
          roomMealBasis: [],
          noofRooms: hotelDetailsData.totalRooms[roomTypeIndex],
          rates: dates.map((date) => ({
            date: date,
            supplierRoomRate: "",
            agentRoomRate: "",
          })),
        }));
      };

      setRoomData(initializeRoomData());
    }
  }, [hotelDetailsData, dates]);

  const handleDescriptionChange = (roomTypeIndex, value) => {
    setRoomData((prevData) =>
      prevData.map((room, index) =>
        index === roomTypeIndex ? { ...room, roomDescription: value } : room
      )
    );
  };

  const handleMealBasisChange = (roomTypeIndex, value) => {
    setRoomData((prevData) =>
      prevData.map((room, index) =>
        index === roomTypeIndex ? { ...room, roomMealBasis: value } : room
      )
    );
  };

  const handleRateChange = (roomTypeIndex, dateIndex, rateType, value) => {
    setRoomData((prevData) =>
      prevData.map((room, index) =>
        index === roomTypeIndex
          ? {
              ...room,
              rates: room.rates.map((rate, rIndex) =>
                rIndex === dateIndex ? { ...rate, [rateType]: value } : rate
              ),
            }
          : room
      )
    );
  };

  const toggleContentVisibility = (index) => {
    setIsContentVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    if (hotelDetailsData?.roomType) {
      // Reset contentRefs to have the same length as roomType
      contentRefs.current = contentRefs.current.slice(
        0,
        hotelDetailsData.roomType.length
      );
    }
  }, [hotelDetailsData?.roomType]);

  const fetchExcelData = async () => {
    try {
      // Pass the Excel file content directly to the readExcelFile function
      const data = await excelfilereader(excelFileContent);
      setcountrycitydata(data);

      const uniqueCountries = Array.from(
        new Set(data.CountryCities.map((item) => item.country))
      ).map((country) => ({
        value: data.CountryCities.find((item) => item.country === country).iso3,
        label: country,
      }));
      setcountryOptions(uniqueCountries);
      setNationalityOptions(uniqueCountries);
    } catch (error) {}
  };

  const getOnlineSuppliers = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.SUPPLIERS.ONLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const onlinesuppliers =
          response && response.data.data ? response.data.data : [];
        console.log("ONLINE SUPPLIERS", onlinesuppliers);
        const options = onlinesuppliers
          .filter((op) => op.status === true) // Filter agents with status true
          .map((op) => ({
            value: op.uuid,
            label: op.supplierName,
          }));

        setOnlineSupplierOptions(options);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Online Suppliers");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const getCurrencies = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.CURRENCIES.CURRENCY);
      if (response.data.statusCode === 200) {
        const currencies =
          response && response.data.data ? response.data.data : [];

        const options = currencies.map((curr) => ({
          value: curr.uuid,
          label: curr.currency,
        }));
        setcurrencyOptions(options);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Currencies");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const getMealBasis = async () => {
    try {
      const response = await getDATA(ApiRoutes.HOTELS.ROOM_MEAL);

      if (response.data.statusCode === 200) {
        const Meals = response && response.data.data ? response.data.data : [];
        const options = Meals.map((curr) => ({
          value: curr.uuid,
          label: curr.roomMealBasis,
        }));
        setMealOptionsData(options);
      }
    } catch (error) {
    } finally {
    }
  };
  const gethotels = async () => {
    try {
      const response = await getDATA(ApiRoutes.HOTELS.MASTERS_HOTELS);

      if (response.data.statusCode === 200) {
        const hotels = response && response.data.data ? response.data.data : [];

        console.log("HOTELS ARE", hotels);

        setHotelData(hotels);
      }
    } catch (error) {
    } finally {
    }
  };
  const getofflinesuppliers = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const offlinesuppliers =
          response && response.data.data ? response.data.data : [];
        console.log("OFFLINE SUPPLIERS", offlinesuppliers);
        const options = offlinesuppliers
          .filter((op) => op.status === true) // Filter agents with status true
          .map((op) => ({
            value: op.uuid,
            label: op.supplierName,
          }));

        setOfflineSupplierOptions(options);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Offline Suppliers");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log(data);

      setDetailsHotelData(data);
      fetchExcelData();
      gethotels();
      getOnlineSuppliers();
      getofflinesuppliers();
      getCurrencies();
      getMealBasis();
      setStartDate(data.checkIn);
      setEndDate(data.checkOut);
      setTotalNights(data.totalNights);
    } else {
      navigateOnRefresh(Constants.URLConstants.BOOKINGSADDOFFLINEHOTELS);
    }
  }, [data, navigateOnRefresh]);
  useEffect(() => {
    if (hotelDetailsData.checkIn && hotelDetailsData.checkOut) {
      const checkInDate = parseDate(hotelDetailsData.checkIn);
      const checkOutDate = parseDate(hotelDetailsData.checkOut);
      const datesArray = generateDateRange(checkInDate, checkOutDate);
      console.log("DATES ARRAY IS ", datesArray);
      setDates(datesArray);
    }
  }, [hotelDetailsData]);

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setFormData({ arrivalDate: "" });
  };

  // const [isContentVisible1, setContentVisibility1] = useState(false);
  // const toggleContentVisibility = (index) => {
  //     if (index === 1) {
  //       setContentVisibility1(!isContentVisible1);
  //     } }
  useEffect(() => {
    // Extract city options based on selected country
    if (selectedCountry) {
      const cities = countrycitydata.CountryCities.filter(
        (item) => item.iso3 === selectedCountry.value
      ).map((item) => ({ value: item.city, label: item.city }));
      setcityOptions(cities);
    } else {
      setcityOptions([]);
    }
  }, [selectedCountry]);
  const handleCountryChange = (selectedOption) => {
    setselectedCountry(selectedOption);
    setselectedCity(null);
  };
  const handleHotelChange = (selectedOption) => {
    const matchedCityHotelData = hotelData.filter(
      (hotel) => hotel.uuid === selectedOption.value
    );
    console.log("MATCHED HOTEL IS ", matchedCityHotelData);
    setHotelAddress(matchedCityHotelData[0]?.address || "");
    setHotelPhone(matchedCityHotelData[0]?.phone || "");
    setselectedHotel(matchedCityHotelData[0]?.uuid);
  };

  const handleCityChange = (selectedOption) => {
    setselectedCity(selectedOption);
    const matchedCityHotelData = hotelData.filter(
      (hotel) => hotel.city === selectedOption.label
    );

    const newOptions = matchedCityHotelData.map((hotel) => ({
      value: hotel.uuid,
      label: hotel.hotelName,
    }));
    setHotelOptions(newOptions);
  };

  useEffect(() => {
    if (hotelDetailsData?.roomType && hotelDetailsData?.totalRooms) {
      const initialRoomNos = hotelDetailsData.roomType.flatMap(
        (roomType, roomTypeIndex) => {
          const roomCount = hotelDetailsData.totalRooms[roomTypeIndex] || 0;
          return Array.from({ length: roomCount }, (_, i) => i + 1);
        }
      );
      setRoomNo(initialRoomNos);
    }
  }, [hotelDetailsData]);

  const handleCitySelection = () => {
    if (!selectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select country first", "", "warning");
    }
  };

  const handleHotelSelection = () => {
    if (!selectedCity) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select City first", "", "warning");
    }
  };
  //   const handleSupplierTypeChange = (event) => {
  //     setSupplierType(event.target.value);
  //   };
  const handlePaxChange = (roomIndex, paxIndex, field, value) => {
    setPaxDetail((prevPaxDetail) => {
      const updatedPaxDetail = [...prevPaxDetail];
      if (!updatedPaxDetail[roomIndex]) {
        updatedPaxDetail[roomIndex] = [];
      }
      if (!updatedPaxDetail[roomIndex][paxIndex]) {
        updatedPaxDetail[roomIndex][paxIndex] = {};
      }
      updatedPaxDetail[roomIndex][paxIndex][field] = value;
      return updatedPaxDetail;
    });
  };

  const handleSupplierTypeChange = (event) => {
    setSupplierType(event.target.value);
  };

  const handleMarkupTypeChange = (type) => {
    setMarkupType(type);
    setAgentMarkupReadOnly(type === "A");
  };

  const handleMultiSelectChange = (selectedOption, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: selectedOption ? selectedOption.label : "",
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Function to format dates to match checkIn/checkOut format
    const formatDate = (date) => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    };

    // Process room rates to format dates and roomMealBasis
    const processedRoomRates = (roomData || []).map((room) => ({
      ...room,
      roomMealBasis: room.roomMealBasis.label,
      rates: room.rates.map((rate) => ({
        ...rate,
        date: formatDate(rate.date),
      })),
    }));

    // Process pax details to only include strings for salutation and age
    const processedPaxDetail = (paxDetail || []).map((room) =>
      room.map((pax) => ({
        ...pax,
        salutation: pax.salutation?.label || "",
        age: pax.age?.label || "",
      }))
    );

    const requestBody = {
      country: selectedCountry?.label || "",
      city: selectedCity?.label || "",
      checkIn: data?.checkIn || "",
      checkOut: data?.checkOut || "",
      totalNights: data?.totalNights || "",
      hotelAddress: hotelAddress || "",
      hotelPhone: hotelPhone || "",
      bookingStatus: bookingStatus?.label || "",
      supplierReference: supplierReference || "",
      agentReference: agentReference || "",
      passengerNationality: passengerNationality?.label || "",
      roomNo: roomNo || [],
      paxDetail: processedPaxDetail,
      supplierType:
        supplierType === "O" ? "Online" : supplierType === "L" ? "Local" : "",
      supplierName: formState?.supplierName || "",
      supplierProfile: formState?.supplierProfile || "",
      supplierCurrency: formState?.supplierCurrency || "",
      agentCurrency: formState?.agentCurrency || "",
      appliedMultiplier: formState?.appliedMultiplier || "",
      markupType: formState?.markupType || "",
      agentMarkup: formState?.agentMarkup || "",
      totalMarkup: formState?.totalMarkup || "",
      roomRates: processedRoomRates,
      roomType: hotelDetailsData?.roomType || [],
      totalRooms: hotelDetailsData?.totalRooms || [],
      supplierDiscount: formData?.supplierDiscount || "",
      agentDiscount: formData?.agentDiscount || "",
      applicableTax: formData?.applicableTax || "",
      paymentGatewayCharge: formData?.paymentGatewayCharge || "",
      passportNumber: formData?.passportNumber || "",
      flightNumber: formData?.flightNumber || "",
      PNR: formData?.PNR || "",
      arrivalDestination: formData?.arrivalDestination || "",
      arrivalDate: formatDate(formData?.arrivalDate) || "",
      emergencyContact: formData?.emergencyContact || "",
      cancellationDate: formatDate(formData?.cancellationDate) || "",
      cancellationPolicyForAgent: formData?.cancellationPolicyForAgent || "",
      cancellationPolicyForSupplier:
        formData?.cancellationPolicyForSupplier || "",
      termsAndCondition: formData?.termsAndCondition || "",
      remarks: formData?.remarks || "",
      emailTo: formData?.emailTo || "",
      hotelUuid: selectedHotel || "",
      agentUuid: hotelDetailsData?.agentUuid || "",
      specialRemark: formData?.specialRemarks || "",
      agentCommission: formData?.agentCommission || "",
      supplierCommission: formData?.supplierCommission || "",
    };

    console.log("Complete Form Data Is ", requestBody);
  };

  if (!hotelDetailsData || hotelDetailsData.length === 0) {
    return null;
  }
  if (
    !hotelDetailsData ||
    !hotelDetailsData.roomType ||
    !hotelDetailsData.totalRooms
  ) {
    return <div>Loading...</div>; // Render a loading state or fallback UI
  }
  if (
    !hotelDetailsData ||
    !hotelDetailsData.roomType ||
    !hotelDetailsData.totalRooms
  ) {
    return <div>Loading...</div>;
  }
  if (!hotelDetailsData || !dates) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="ADDING NEW SECTOR"
          linkText1="Search Bookings"
          linkText2="Booking Modification"
          link1="/"
        />

        <div>
          {/* First Row*/}
          {/* <ul
                        className="nav nav-tabs"
                        id="myTab"
                        role="tablist"
                        style={{ borderBottom: "2px solid #FF5015!important" }}
                    >
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                id="tab1-tab"
                                data-bs-toggle="tab"
                                href="#tab1"
                                role="tab"
                                aria-controls="tab1"
                                aria-selected="true"
                            >
                                Add Offline Trasfer Booking
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                id="tab2-tab"
                                data-bs-toggle="tab"
                                href="#tab2"
                                role="tab"
                                aria-controls="tab2"
                                aria-selected="false"
                            >
                                Pick-up &amp; Drop-off
                            </a>
                        </li>
                    </ul> */}
          <form
            id="OfflinehotelBookingsDetailsForm"
            onSubmit={(e) => handleSubmit(e)}
          >
            {/* Tab Content */}
            <div className="tab-content" id="myTabContent">
              {/* Tab 1 Content */}
              <div
                className="tab-pane fade show active"
                id="tab1"
                role="tabpanel"
                aria-labelledby="tab1-tab"
              >
                <div className="panel-body">
                  <div className="row">
                    <div className="form-group col-md-4 phps_row_1">
                      <label>Country</label>
                      <input
                        type="hidden"
                        name="sel_countries_name"
                        className="form-control form-control-sm"
                      />
                      <MultiSelect
                        options={countryOptions}
                        isSearchable
                        placeholder="- Select Country -"
                        className="custom-select required"
                        onChange={handleCountryChange}
                        noOptionsMessage={() => "No Country Found"}
                        required
                      />
                    </div>
                    <div
                      className="form-group col-md-4"
                      onClick={handleCitySelection}
                    >
                      <label>City</label>
                      <MultiSelect
                        options={cityOptions}
                        value={selectedCity}
                        isSearchable
                        placeholder="- Select City -"
                        className="custom-select required"
                        onChange={handleCityChange}
                        isDisabled={!selectedCountry}
                        noOptionsMessage={() => "No City Found"}
                        required
                      />
                    </div>
                    <div
                      className="form-group col-md-4 phps_row_1"
                      onClick={handleHotelSelection}
                    >
                      <label>Hotel</label>
                      <MultiSelect
                        options={hoteloptions}
                        isSearchable
                        placeholder="- Select Hotel -"
                        className="custom-select required"
                        onChange={handleHotelChange}
                        isDisabled={!selectedCity}
                        noOptionsMessage={() => "No Hotel Found"}
                        required
                      />
                      {/* <div className="input-group date col-md-12 col-xs-12">
                                                <input
                                                    type="hidden"
                                                    name="sel_hotels_name"
                                                    className="form-control form-control-sm"
                                                />
                                                <select
                                                    name="sel_hotels"
                                                    id="sel_hotels"
                                                    onfocus="javascriptcheckCountryCity(document.forms['modify_booking_form']);"
                                                    onchange="showOtherHotelTextBox(this.value);get_hotel_address();"
                                                    className="required selectpicker show-menu-arrow form-control form-control-sm bs-select-hidden"
                                                    data-live-search="true"
                                                >
                                                    <option value={0}>Select Hotel</option>
                                                </select>
                                                <input
                                                    type="hidden"
                                                    name="txt_other_hotel"
                                                    id="txt_other_hotel"
                                                />
                                                <span
                                                    className="input-group-addon"
                                                    onclick="javascriptshow_other_hotel();"
                                                    style={{ marginLeft: "6px" }}
                                                >
                                                    <i className="fa fa-plus" />
                                                </span>
                                            </div> */}
                    </div>
                    <div
                      className="form-group col-md-3 phps_row_0"
                      id="add_hotel"
                      style={{ display: "none" }}
                    >
                      <label>Enter Hotel Name</label>
                      <div className="input-group date col-md-12 col-xs-12">
                        <input
                          id="txt_add_hotel"
                          className="form-control form-control-sm"
                          type="text"
                          name="txt_add_hotel"
                        />
                        <span
                          className="input-group-addon"
                          onclick="add_other_hotel();"
                          title
                          data-placement="top"
                          data-toggle="tooltip"
                          data-original-title="Submit"
                        >
                          <i className="fa fa-check" />
                        </span>
                      </div>
                      <div className="input-group date col-md-12 col-xs-12">
                        <label>Select Hotel Rating</label>
                        <MultiSelect
                          options={hotel_rating_options}
                          isSearchable
                          isMulti
                          placeholder="- Select Hotel Rating -"
                          className="custom-select "
                          noOptionsMessage={() => "No Option Found"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row form-group mt-1">
                    <div className="col-md-12 phps_row_1">
                      <label>Hotel Address</label>
                      <textarea
                        name="hotel_address1"
                        className="form-control form-control-sm"
                        id="hotel_address1"
                        rows={4}
                        cols={40}
                        value={hotelAddress}
                        onChange={(e) => setHotelAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-3 phps_row_0">
                      <label>Hotel Phone</label>
                      <input
                        type="text"
                        name="hotel_phone"
                        id="hotel_phone"
                        className="form-control form-control-sm"
                        maxLength={15}
                        value={hotelPhone}
                        onChange={(e) => setHotelPhone(e.target.value)}
                      />
                      {/* required */}
                    </div>
                    <div className="form-group col-md-3 phps_row_1">
                      <label>Booking Status</label>
                      <MultiSelect
                        options={bookingStatusOptions}
                        isSearchable
                        placeholder="- Select Hotel Rating -"
                        className="custom-select required"
                        noOptionsMessage={() => "No Option Found"}
                        value={bookingStatus}
                        onChange={setBookingStatus}
                        required
                      />
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor="exampleInputEmail1">
                        Check-in / Check-out
                      </label>
                      <div
                        className="input-daterange input-group date"
                        id="checkinOut"
                      >
                        <input
                          type="text"
                          name="check-in_date"
                          defaultValue={startDate}
                          className="required form-control form-control-sm "
                          readOnly="readonly"
                          required
                        />
                        <span className="input-group-addon">to</span>
                        <input
                          type="text"
                          name="check-out_date"
                          defaultValue={endDate}
                          className="form-control form-control-sm required"
                          readOnly="readonly"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-3 phps_row_1">
                      <label>Total Nights</label>
                      <input
                        type="text"
                        name="total_night"
                        defaultValue={totalNights}
                        className="required form-control form-control-sm"
                        readOnly="readonly"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-2 mb-4">
                    <div className="form-group col-md-3 phps_row_0">
                      {/* <div id="conf_no"></div> */}
                      <label>Confirmation Number/Supplier ref#</label>
                      <input
                        type="text"
                        name="confirmation_number"
                        maxLength={100}
                        className="form-control form-control-sm"
                        value={supplierReference}
                        onChange={(e) => setSupplierReference(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-3 phps_row_1">
                      <label>Agent Reference</label>
                      <input
                        type="text"
                        name="agent_ref_no"
                        maxLength={100}
                        className="form-control form-control-sm"
                        value={agentReference}
                        onChange={(e) => setAgentReference(e.target.value)}
                      />
                    </div>
                  </div>
                  <div
                    className="form-group panel-body"
                    style={{
                      border: "1px solid #e4e5e7",
                      paddingTop: "7px",
                      paddingBottom: "23px",
                      paddingLeft: "13px",
                      paddingRight: "20px",
                      overflow: "auto",
                    }}
                  >
                    <div className="row">
                      <div className="form-group col-md-12">
                        <h5>Passenger Details</h5>
                      </div>
                      <div className="form-group col-md-3 phps_row_0">
                        <label>Passenger Nationality</label>
                        <MultiSelect
                          options={nationalityOptions}
                          isSearchable
                          placeholder="- Select Nationality -"
                          noOptionsMessage={() => "No Country Found"}
                          className="custom-select required"
                          value={passengerNationality}
                          onChange={setPassengerNationality}
                          required
                        />
                      </div>
                      <div className="container mt-2">
                        {hotelDetailsData.roomType.map(
                          (roomType, roomTypeIndex) => {
                            const roomOption = room_options.find(
                              (option) => option.value === roomType
                            );
                            const totalPeople = roomOption
                              ? roomOption.adults + roomOption.children
                              : 0;
                            const roomCount =
                              hotelDetailsData.totalRooms[roomTypeIndex] || 0;

                            return (
                              <div key={roomTypeIndex}>
                                <div className="col-md-12 phps_row_1">
                                  <div className="row">
                                    <div className="col-md-12 form-group">
                                      <img
                                        src={
                                          isContentVisible[roomTypeIndex]
                                            ? minus
                                            : plus
                                        }
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          toggleContentVisibility(roomTypeIndex)
                                        }
                                        alt="toggle"
                                      />
                                      &nbsp;
                                      <label>{roomType}</label>
                                    </div>
                                  </div>
                                  <div
                                    ref={(el) =>
                                      (contentRefs.current[roomTypeIndex] = el)
                                    }
                                    className={`datapop ${
                                      isContentVisible[roomTypeIndex]
                                        ? "expand"
                                        : ""
                                    }`}
                                    style={{
                                      maxHeight: isContentVisible[roomTypeIndex]
                                        ? `${contentRefs.current[roomTypeIndex]?.scrollHeight}px`
                                        : "0",
                                      overflow: "visible",
                                    }}
                                  >
                                    {Array.from({ length: roomCount }).map(
                                      (_, roomIndex) => (
                                        <div key={roomIndex}>
                                          <label>
                                            <b>
                                              Room{" "}
                                              {
                                                roomNo[
                                                  roomTypeIndex * roomCount +
                                                    roomIndex
                                                ]
                                              }
                                            </b>
                                          </label>
                                          {Array.from({
                                            length: totalPeople,
                                          }).map((_, paxIndex) => {
                                            const isChild =
                                              paxIndex >= roomOption.adults;
                                            return (
                                              <div
                                                key={paxIndex}
                                                className="row mt-2"
                                              >
                                                <div className="form-group col-md-2">
                                                  <div
                                                    style={{
                                                      paddingLeft: "120px",
                                                    }}
                                                  >
                                                    <label>
                                                      Pax {paxIndex + 1}
                                                    </label>
                                                  </div>
                                                </div>
                                                <div className="form-group col-md-2 phps_row_0">
                                                  <MultiSelect
                                                    options={
                                                      isChild
                                                        ? childSalutations
                                                        : salutations
                                                    }
                                                    isSearchable
                                                    placeholder={
                                                      isChild
                                                        ? "Child"
                                                        : "Title"
                                                    }
                                                    noOptionsMessage={() =>
                                                      "No Option Found"
                                                    }
                                                    className="custom-select required"
                                                    onChange={(
                                                      selectedOptions
                                                    ) =>
                                                      handlePaxChange(
                                                        roomTypeIndex *
                                                          roomCount +
                                                          roomIndex,
                                                        paxIndex,
                                                        "salutation",
                                                        selectedOptions
                                                      )
                                                    }
                                                    required
                                                  />
                                                </div>
                                                <div className="form-group col-md-3 phps_row_1">
                                                  <input
                                                    name={`${roomType}_first_name[]`}
                                                    placeholder="First Name"
                                                    id={`first_name_${roomTypeIndex}_${roomIndex}_${paxIndex}`}
                                                    type="text"
                                                    size={15}
                                                    className="required first form-control form-control-sm"
                                                    onChange={(e) =>
                                                      handlePaxChange(
                                                        roomTypeIndex *
                                                          roomCount +
                                                          roomIndex,
                                                        paxIndex,
                                                        "firstName",
                                                        e.target.value
                                                      )
                                                    }
                                                    required
                                                  />
                                                </div>
                                                <div className="form-group col-md-3 phps_row_0">
                                                  <div className="input-group date col-md-12 col-xs-12">
                                                    <input
                                                      name={`${roomType}_last_name[]`}
                                                      placeholder="Last Name"
                                                      id={`last_name_${roomTypeIndex}_${roomIndex}_${paxIndex}`}
                                                      type="text"
                                                      size={15}
                                                      className="required last form-control form-control-sm"
                                                      onChange={(e) =>
                                                        handlePaxChange(
                                                          roomTypeIndex *
                                                            roomCount +
                                                            roomIndex,
                                                          paxIndex,
                                                          "lastName",
                                                          e.target.value
                                                        )
                                                      }
                                                      required
                                                    />
                                                  </div>
                                                </div>
                                                {isChild && (
                                                  <div className="form-group col-md-2 phps_row_0">
                                                    <MultiSelect
                                                      options={
                                                        offline_child_options
                                                      }
                                                      isSearchable
                                                      placeholder="- Age -"
                                                      noOptionsMessage={() =>
                                                        "No Age Found"
                                                      }
                                                      className="custom-select "
                                                      onChange={(
                                                        selectedOptions
                                                      ) =>
                                                        handlePaxChange(
                                                          roomTypeIndex *
                                                            roomCount +
                                                            roomIndex,
                                                          paxIndex,
                                                          "age",
                                                          selectedOptions
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                )}
                                                <input
                                                  name={`${roomType}_age[]`}
                                                  id={`age_${roomTypeIndex}_${roomIndex}_${paxIndex}`}
                                                  type="hidden"
                                                />
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="form-group col-md-12 phps_row_1">
                      <h5>Supplier Type</h5>
                      <div className="radioline1">
                        <div className="radio radio-success radio-inline">
                          <input
                            id="rdSupplierType1"
                            type="radio"
                            name="rdSupplierType"
                            value="O"
                            onClick={handleSupplierTypeChange}
                            defaultChecked
                          />
                          <label htmlFor="rdSupplierType1">
                            Online Supplier
                          </label>
                        </div>
                        <div className="radio radio-success radio-inline">
                          <input
                            id="rdSupplierType2"
                            type="radio"
                            name="rdSupplierType"
                            value="L"
                            onClick={handleSupplierTypeChange}
                          />
                          <label htmlFor="rdSupplierType2">
                            Local Supplier
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12 phps_row_0">
                      <div
                        id="onlineSupp"
                        style={{
                          width: "100%",
                          display: supplierType === "O" ? "block" : "none",
                        }}
                      >
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label>Supplier</label>
                            <MultiSelect
                              options={onlinesupplierOptions}
                              isSearchable
                              placeholder="- Select Online Supplier -"
                              noOptionsMessage={() => "No Supplier Found"}
                              className="custom-select required"
                              onChange={(selected) =>
                                handleMultiSelectChange(
                                  selected,
                                  "supplierName"
                                )
                              }
                              required={supplierType === "O" ? true : false}
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Supplier Profile</label>
                            <MultiSelect
                              options={supplierProfileOptions}
                              isSearchable
                              placeholder="- Select Supplier Profile -"
                              noOptionsMessage={() => "No Supplier Found"}
                              className="custom-select required"
                              required={supplierType === "O" ? true : false}
                              onChange={(selected) =>
                                handleMultiSelectChange(
                                  selected,
                                  "supplierProfile"
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        id="localSupp"
                        style={{
                          width: "100%",
                          display: supplierType === "L" ? "block" : "none",
                        }}
                      >
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label>Supplier</label>
                            <MultiSelect
                              options={offlinesupplierOptions}
                              isSearchable
                              placeholder="- Select Local Supplier -"
                              noOptionsMessage={() => "No Supplier Found"}
                              className="custom-select required"
                              required={supplierType === "L" ? true : false}
                              onChange={(selected) =>
                                handleMultiSelectChange(
                                  selected,
                                  "supplierName"
                                )
                              }
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Supplier Profile</label>
                            <MultiSelect
                              options={supplierProfileOptions}
                              isSearchable
                              placeholder="- Select Supplier Profile -"
                              required={supplierType === "L" ? true : false}
                              noOptionsMessage={() => "No Supplier Found"}
                              className="custom-select required"
                              onChange={(selected) =>
                                handleMultiSelectChange(
                                  selected,
                                  "supplierProfile"
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label>Supplier Currency</label>
                      <MultiSelect
                        options={currencyOptions}
                        isSearchable
                        placeholder="- Select Currency -"
                        noOptionsMessage={() => "No Currency Found"}
                        className="custom-select required"
                        required
                        onChange={(selected) =>
                          handleMultiSelectChange(selected, "supplierCurrency")
                        }
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Agent Currency</label>
                      <MultiSelect
                        options={currencyOptions}
                        isSearchable
                        placeholder="- Select Currency -"
                        noOptionsMessage={() => "No Currency Found"}
                        className="custom-select required"
                        onChange={(selected) =>
                          handleMultiSelectChange(selected, "agentCurrency")
                        }
                        required
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Applied Multiplier</label>
                      <input
                        type="text"
                        className="required form-control form-control-sm"
                        id="applied_multiplier"
                        name="appliedMultiplier"
                        defaultValue="1.14734"
                        onBlur={handleInputChange}
                        onKeyUp={handleInputChange}
                        required
                      />
                      <span id="nc1"> EUR </span> To <span id="dc1">USD </span>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Current Rate</label>
                      <br />
                      <span id="currency_conversion_1">1.14734</span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label>Markup Type</label>
                      <div className="radioline1">
                        <div className="radio radio-success radio-inline">
                          <input
                            type="radio"
                            id="percentage"
                            name="rdMarkupType"
                            value="P"
                            onChange={() => handleMarkupTypeChange("P")}
                            defaultChecked={markupType === "P"}
                          />
                          <label htmlFor="percentage">Percentage</label>
                        </div>
                        <div className="radio radio-success radio-inline">
                          <input
                            type="radio"
                            name="rdMarkupType"
                            id="app"
                            value="A"
                            onChange={() => handleMarkupTypeChange("A")}
                            defaultChecked={markupType === "A"}
                          />
                          <label htmlFor="amount">Amount</label>
                        </div>
                      </div>
                    </div>
                    {markupType === "A" && (
                      <div className="form-group col-md-3" id="amountmarkup">
                        <label>Markup Amount</label>
                        <input
                          type="text"
                          name="amount_markup"
                          id="amount_markup"
                          className="form-control"
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                    <div className="form-group col-md-3">
                      <label>Agent Markup</label>
                      <div className="input-group date col-md-12 col-xs-12">
                        <input
                          type="text"
                          name="txt_agent_markup"
                          id="txt_agent_markup"
                          className="form-control"
                          // defaultValue="23.596798270365"
                          size={5}
                          readOnly={agentMarkupReadOnly}
                          onChange={handleInputChange}
                        />
                        <span className="input-group-addon">%</span>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Total Markup</label>
                      <div className="input-group date col-md-12 col-xs-12">
                        <input
                          type="text"
                          readOnly
                          name="txt_markup"
                          id="txt_markup"
                          className="form-control"
                          // defaultValue="23.596798270365"
                          size={5}
                        />
                        <span className="input-group-addon">%</span>
                        <input
                          type="hidden"
                          name="txt_wh_markup"
                          defaultValue={0}
                          size={5}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className=" form-group col-md-12 phps_row_0">
                    <h5>Room Rates (Per room supplier rate)</h5>
                    <table id="search_sup" className="table   table-responsive">
                      <input
                        type="hidden"
                        name="room_type[]"
                        defaultValue="single"
                      />
                      <tbody className="bg-white">
                        {roomData.map((room, roomTypeIndex) => (
                          <table key={roomTypeIndex} className="table">
                            <div
                              className="panel-body"
                              style={{
                                backgroundColor: "#FF5015",
                                paddingBottom: "1px",
                                paddingTop: "4px",
                              }}
                            >
                              <div className="row">
                                <div className="col-md-12">
                                  <h6
                                    style={{
                                      backgroundColor: "#FF5015",
                                      padding: "8px",
                                      color: "white",
                                    }}
                                  >
                                    {hotelDetailsData.roomType[roomTypeIndex]}
                                  </h6>
                                </div>
                              </div>
                            </div>
                            <tbody className="bg-white">
                              <tr>
                                <td colSpan={3}>
                                  <div className="row">
                                    <div
                                      className="form-group col-md-3"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>Room Description</label>
                                      <input
                                        type="text"
                                        name={`${room.roomNo}_description`}
                                        value={room.roomDescription}
                                        size={50}
                                        className="form-control required"
                                        required
                                        onChange={(e) =>
                                          handleDescriptionChange(
                                            roomTypeIndex,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group col-md-3"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>Room/Meal Basis</label>
                                      <MultiSelect
                                        options={mealOptionsData}
                                        isSearchable
                                        placeholder="Select"
                                        className="custom-select required"
                                        noOptionsMessage={() =>
                                          "No Option Found"
                                        }
                                        value={room.roomMealBasis}
                                        required
                                        onChange={(value) =>
                                          handleMealBasisChange(
                                            roomTypeIndex,
                                            value
                                          )
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group col-md-3"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>Number of Rooms</label>
                                      <input
                                        type="text"
                                        name={`${room.roomNo}_number_of_rooms`}
                                        value={room.noofRooms}
                                        size={5}
                                        readOnly
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3}>
                                  <div className="row">
                                    <div
                                      className="form-group col-md-3"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>Date</label>
                                    </div>
                                    <div
                                      className="form-group col-md-3"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>&nbsp;Supplier Room Rate</label>
                                    </div>
                                    <div
                                      className="form-group col-md-3"
                                      style={{ textAlign: "left" }}
                                    >
                                      <label>&nbsp;Agent Room Rate</label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              {room.rates.map((rate, dateIndex) => (
                                <tr key={dateIndex}>
                                  <td colSpan={3}>
                                    <div className="row">
                                      <div
                                        className="form-group col-md-3"
                                        style={{ textAlign: "left" }}
                                      >
                                        {Dateformater(rate.date)}
                                      </div>
                                      <div
                                        className="form-group col-md-3"
                                        style={{ textAlign: "left" }}
                                      >
                                        <div className="input-group col-md-12 col-sm-12">
                                          <input
                                            type="text"
                                            id="supplier_rate"
                                            name={`${room.roomNo}_native_rate[]`}
                                            value={rate.supplierRoomRate}
                                            size={10}
                                            className="single form-control form-control-sm required"
                                            onChange={(e) =>
                                              handleRateChange(
                                                roomTypeIndex,
                                                dateIndex,
                                                "supplierRoomRate",
                                                e.target.value
                                              )
                                            }
                                            required
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="form-group col-md-3"
                                        style={{ textAlign: "left" }}
                                      >
                                        <div className="input-group col-md-12 col-sm-12">
                                          <input
                                            type="text"
                                            id={`${room.roomNo}_display_rate${dateIndex}`}
                                            name={`${room.roomNo}_display_rate[]`}
                                            value={rate.agentRoomRate}
                                            size={10}
                                            className="agentrate form-control"
                                            onChange={(e) =>
                                              handleRateChange(
                                                roomTypeIndex,
                                                dateIndex,
                                                "agentRoomRate",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <input
                                        type="hidden"
                                        id={`${room.roomNo}_wh_display_rate${dateIndex}`}
                                        name={`${room.roomNo}_wh_display_rate[]`}
                                        value={rate.agentRoomRate}
                                        size={10}
                                        className="form-control form-control-sm"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ))}
                        <tr>
                          <td colSpan={3}>
                            <div className="row">
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              ></div>
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <label>Supplier rate :</label>{" "}
                                <span id="total_supplier_rate"></span>
                                <span id="nc4">EUR</span>
                              </div>
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <div className="row">
                                  <div className="col-md-12">
                                    <label>Agent rate :</label>{" "}
                                    <span id="total_agent_rate"></span>
                                    <span id="dc8">USD</span>
                                  </div>
                                  <div
                                    className="col-md-12"
                                    style={{ display: "none" }}
                                  >
                                    <label>Wh Agent rate</label>
                                    <span id="wh_total_display_rate"></span>{" "}
                                    <span id="dc5">USD</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div className="row">
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <label>Supplier Discount</label>
                              </div>
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <input
                                  type="text"
                                  name="supplierDiscount"
                                  className="form-control form-control-sm"
                                  value={formData.supplierDiscount}
                                  onChange={handleNewInputChange}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div className="row">
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <label>Agent Display Discount</label>
                              </div>
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <input
                                  type="text"
                                  name="agentDiscount"
                                  className="form-control form-control-sm"
                                  value={formData.agentDiscount}
                                  onChange={handleNewInputChange}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div className="row">
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <label>Agent Commission</label>
                              </div>
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <input
                                  type="text"
                                  name="agentCommission"
                                  className="form-control form-control-sm"
                                  value={formData.agentCommission}
                                  onChange={handleNewInputChange}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div className="row">
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <label>Supplier Commission</label>
                              </div>
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <input
                                  type="text"
                                  name="supplierCommission"
                                  className="form-control form-control-sm"
                                  value={formData.supplierCommission}
                                  onChange={handleNewInputChange}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div className="row">
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <label>Total Supplier Rate Of Room(s)</label>
                              </div>
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <span id="total_native_rate"> </span>{" "}
                                <span id="nc4">EUR</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div className="row">
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <label>Total Agent Rate Of Room(s) </label>
                              </div>
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <span id="total_display_rate"></span>
                                <span id="dc6">USD</span>
                                &nbsp;
                                <i
                                  className="fa fa-info-circle"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Service Tax is included in Total Booking Cost."
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div className="row">
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <label>Applicable Tax</label>
                              </div>
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <div className="input-group col-md-12 col-sm-12">
                                  <input
                                    type="text"
                                    name="applicableTax"
                                    className="form-control form-control-sm"
                                    value={formData.applicableTax}
                                    onChange={handleNewInputChange}
                                    readOnly
                                  />
                                  <span className="input-group-addon">
                                    <span id="dc7">USD</span>
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6" id="tax" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div className="row">
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <label>
                                  Payment Gateway Charges Of Room(s)
                                </label>
                              </div>
                              <div
                                className="form-group col-md-3"
                                style={{ textAlign: "left !important" }}
                              >
                                <div className="input-group col-md-12 col-sm-12">
                                  <input
                                    type="text"
                                    name="paymentGatewayCharge"
                                    className="form-control form-control-sm"
                                    value={formData.paymentGatewayCharge}
                                    onChange={handleNewInputChange}
                                    defaultValue={0.0}
                                  />
                                  <span className="input-group-addon">
                                    <span id="dc7">USD</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr />
                  <div
                    className="form-group panel-body mb-3"
                    style={{
                      border: "1px solid #e4e5e7",
                      paddingTop: "7px",
                      paddingBottom: "23px",
                      paddingLeft: "13px",
                      paddingRight: "20px",
                    }}
                  >
                    <div className="row">
                      <div className="form-group col-md-12">
                        <h5>Passport Details</h5>
                      </div>
                      <div className="form-group col-md-3 phps_row_1">
                        <label>Passport Number</label>
                        <input
                          type="text"
                          name="passportNumber"
                          id="passport_number"
                          size={15}
                          className="form-control form-control-sm"
                          value={formData.passportNumber}
                          onChange={handleNewInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="form-group panel-body"
                    style={{
                      border: "1px solid #e4e5e7",
                      paddingTop: "7px",
                      paddingBottom: "23px",
                      paddingLeft: "13px",
                      paddingRight: "20px",
                    }}
                  >
                    <div className="row">
                      <div className="form-group col-md-12">
                        <h5>Flight Details</h5>
                      </div>
                      <div className="form-group col-md-3 phps_row_0">
                        <label>Flight Number</label>
                        <input
                          type="text"
                          name="flightNumber"
                          id="flight_number"
                          className="form-control form-control-sm"
                          value={formData.flightNumber}
                          onChange={handleNewInputChange}
                        />
                      </div>
                      <div className="form-group col-md-3 phps_row_1">
                        <label>PNR</label>
                        <input
                          type="text"
                          name="PNR"
                          id="flight_pnr_number"
                          maxLength={20}
                          className="form-control form-control-sm"
                          value={formData.PNR}
                          onChange={handleNewInputChange}
                        />
                      </div>
                      <div className="form-group col-md-3 phps_row_0">
                        <label>Arrival Destination</label>
                        <input
                          type="text"
                          name="arrivalDestination"
                          id="flight_arrival_destination"
                          className="form-control form-control-sm"
                          value={formData.arrivalDestination}
                          onChange={handleNewInputChange}
                        />
                      </div>
                      <div className="form-group col-md-3 phps_row_1">
                        <label>Arrival Date</label>
                        <div
                          className="input-group date col-md-12 col-xs-12 col-sm-12 flt_arrival_date"
                          id="flt_arrival_date"
                        >
                          <Flatpickr
                            value={formData.arrivalDate}
                            onChange={(date) =>
                              setFormData({ ...formData, arrivalDate: date })
                            }
                            options={{ dateFormat: "Y-m-d" }}
                            style={{ width: "200px" }}
                          />

                          <span
                            className="input-group-addon pointer"
                            id="flightTrashBtn"
                            onClick={handleTrashClick}
                          >
                            <i className="fa fa-trash" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-12 phps_row_0">
                      <label>Special Remark</label>
                      <textarea
                        id="special_remark_other"
                        name="specialRemarks"
                        rows={4}
                        cols={70}
                        className="form-control form-control-sm"
                        value={formData.specialRemarks}
                        onChange={handleNewInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-12 phps_row_0">
                      <label>Emergency Contact</label>
                      <textarea
                        id="special_remark_other"
                        name="emergencyContact"
                        rows={4}
                        cols={70}
                        className="form-control form-control-sm"
                        value={formData.emergencyContact}
                        onChange={handleNewInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-3 phps_row_0">
                      <label>Cancellation date</label>
                      <div className="input-group date col-md-12 col-xs-12 col-sm-12">
                        <Flatpickr
                          value={formData.cancellationDate}
                          onChange={(date) =>
                            setFormData({ ...formData, cancellationDate: date })
                          }
                          options={{ dateFormat: "Y-m-d" }}
                          className="required"
                          style={{ width: "300px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-12 phps_row_1">
                      <label>Cancellation Policy (Policy for agents)</label>
                      <textarea
                        id="cancellation_policy"
                        name="cancellationPolicyForAgent"
                        rows={4}
                        className="form-control form-control-sm"
                        cols={60}
                        value={formData.cancellationPolicyForAgent}
                        onChange={handleNewInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-12 phps_row_0">
                      <label>
                        Supplier Cancellation Policy (Policy provided by
                        supplier for internal use)
                      </label>
                      <textarea
                        name="cancellationPolicyForSupplier"
                        rows={4}
                        cols={70}
                        className="form-control"
                        value={formData.cancellationPolicyForSupplier}
                        onChange={handleNewInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-12 phps_row_1">
                      <label>
                        Comment Contract (Terms and conditions provided by
                        supplier will be displayed on booking)
                      </label>
                      <textarea
                        name="termsAndCondition"
                        rows={4}
                        cols={70}
                        className="form-control form-control-sm"
                        value={formData.termsAndCondition}
                        onChange={handleNewInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-12 phps_row_0">
                      <label>
                        Remark (Important notes for backoffice team)
                      </label>
                      <textarea
                        name="remarks"
                        rows={4}
                        cols={70}
                        className="form-control form-control-sm"
                        value={formData.remarks}
                        onChange={handleNewInputChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="form-group col-md-12 phps_row_1">
                      <h5>Email To</h5>
                      <div className="radioline1 mt-1">
                        <div className="checkbox checkbox-success checkbox-inline">
                          <input
                            id="mailtoagent"
                            type="checkbox"
                            value="Agent and Consultant"
                            onChange={handleEmailToChange}
                          />
                          <label htmlFor="mailtoagent">
                            Agent and Consultant
                          </label>
                        </div>
                        <div className="checkbox checkbox-success checkbox-inline">
                          <input
                            id="mailtocommon"
                            type="checkbox"
                            value="Email Settings"
                            onChange={handleEmailToChange}
                          />
                          <label htmlFor="mailtocommon">Email Settings</label>
                        </div>
                        <div className="checkbox checkbox-success checkbox-inline">
                          <input
                            id="mailtosupplier"
                            type="checkbox"
                            value="Supplier"
                            onChange={handleEmailToChange}
                          />
                          <label htmlFor="mailtosupplier">Supplier</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="form-group col-md-3 phps_row_0">
                      <span id="loading" style={{ display: "none" }}>
                        <img src="/cpfv3/images/loading.gif" alt="" />
                      </span>
                      <span id="save_button" style={{ display: "block" }}>
                        <button
                          type="submit"
                          className="btn btn-dark btn-sm"
                          name="b1"
                          id="b1"
                          value="Save"
                        >
                          <i className="fa fa-floppy-o" />
                          &nbsp;Save
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tab 2 Content */}
              <div
                className="tab-pane fade"
                id="tab2"
                role="tabpanel"
                aria-labelledby="tab2-tab"
              >
                <div className="panel-body1">
                  <div className="row">
                    <div className="form-group col-md-3">
                      <label>Transfer Duration (Format - 1 hr 30 mins)</label>
                      <br />
                      <MultiSelect
                        options={hmmm_options}
                        isSearchable
                        isMulti
                        placeholder="-"
                        className="custom-select required"
                        noOptionsMessage={() => "No Time Found"}
                      />

                      <MultiSelect
                        options={mm_options}
                        isSearchable
                        isMulti
                        placeholder="-"
                        className="custom-select required"
                        noOptionsMessage={() => "No Time Found"}
                      />
                      <input
                        type="hidden"
                        name="trans_duration"
                        id="trans_duration"
                        defaultValue="1 hr 00 min"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <div className="panel-body">
                        <div className="form-group">
                          <label>Pick Up</label>

                          <MultiSelect
                            options={pickup_options}
                            isSearchable
                            isMulti
                            placeholder="Select pick-up"
                            className="custom-select "
                            noOptionsMessage={() => "No Option Found"}
                          />
                        </div>
                        <div
                          id="pickup_airport"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Pick up from</label>
                              <select
                                name="pickup_airport_code"
                                id="pickup_airport_code"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Arriving from</label>
                              <select
                                name="pickup_sel_arr_from"
                                id="pickup_sel_arr_from"
                                className="selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>--</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Flight Number and Airline Code </label>
                              <input
                                type="text"
                                name="pickup_flight_number"
                                className="required form-control form-control-sm"
                                id="pickup_flight_number"
                                maxLength={15}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>
                                Estimated time of arrival (Hours : Minutes)
                              </label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="pickup_accom"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Pick up time (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Pick up from</label>
                              <select
                                name="sel_pickup_from_hotel"
                                id="sel_pickup_from_hotel"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>--</option>
                                <option label value={0} />
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-12">
                              <div className>
                                <div className="clear" />
                                <div className="form-group col-md-12 checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    name="chk_pickup"
                                    id="pickup"
                                    defaultValue={1}
                                    onclick="callmedisplay_pickup();"
                                  />
                                  <label htmlFor="pickup">
                                    Click here for an alternative address{" "}
                                  </label>
                                </div>
                              </div>
                              <div className="clear" />
                              <div
                                id="address_display_pickup"
                                className="row"
                                style={{ display: "none" }}
                              >
                                <div className="form-group col-md-12">
                                  <h5>Pick up from</h5>
                                </div>
                                <div className="form-group col-md-12">
                                  <label>Address 1</label>
                                  <input
                                    type="textbox"
                                    name="txt_pickup_hotel_address1"
                                    className="required form-control form-control-sm"
                                    maxLength={40}
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>Address 2</label>
                                  <input
                                    type="textbox"
                                    name="txt_pickup_hotel_address2"
                                    defaultValue
                                    className="required form-control form-control-sm"
                                    maxLength={40}
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>City</label>
                                  <input
                                    type="textbox"
                                    className="form-control form-control-sm"
                                    name="txt_pickup_hotel_city"
                                    id="txt_pickup_hotel_city"
                                    readOnly
                                  />
                                  <input
                                    type="hidden"
                                    className="form-control form-control-sm"
                                    name="sel_pickup_hotel_city"
                                    id="sel_pickup_hotel_city"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Country</label>
                                  <br />
                                  <input
                                    type="textbox"
                                    name="txt_pickup_hotel_country"
                                    id="txt_pickup_hotel_country"
                                    className="required form-control form-control-sm"
                                    maxLength={20}
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Postcode/Zipcode</label>
                                  <input
                                    type="textbox"
                                    name="txt_pickup_hotel_postcode"
                                    id="txt_pickup_hotel_postcode"
                                    className="required form-control form-control-sm"
                                    maxLength={25}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Phone Number</label>
                                  <input
                                    type="textbox"
                                    name="txt_pickup_hotel_phone"
                                    id="txt_pickup_hotel_phone"
                                    className="required form-control form-control-sm"
                                    maxLength={15}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="pickup_port"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Pickup Time (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Arriving From</label>
                              <input
                                type="text"
                                name="txt_pickup_port_arriving_from"
                                className="required form-control form-control-sm"
                                maxLength={100}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="pickup_station"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Arriving From </label>
                              <select
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                name="sel_pickup_station_arriving_from"
                                id="sel_pickup_station_arriving_from"
                                data-live-search="true"
                              >
                                <option value>- Select a station -</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Train Name/Number </label>
                              <input
                                className="required form-control form-control-sm"
                                type="text"
                                name="txt_pickup_station_train_name"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Arrival Station </label>
                              <select
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                name="sel_pickup_station_arriving_station"
                                id="sel_pickup_station_arriving_station"
                                data-live-search="true"
                              >
                                <option value>- Select a station -</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>
                                Estimated Time of Arrival (Hours : Minutes)
                              </label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="pickup_other"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Pick Up Time (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Address 1</label>
                              <input
                                type="text"
                                name="txt_pickup_other_address1"
                                className="required form-control form-control-sm"
                                maxLength={35}
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Address 2</label>
                              <input
                                type="text"
                                name="txt_pickup_other_address2"
                                className="required form-control form-control-sm"
                                maxLength={35}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Town/City</label>
                              <br />
                              <input
                                type="text"
                                name="txt_pickup_other_city"
                                className="required form-control form-control-sm"
                                maxLength={50}
                              />
                              <input
                                type="hidden"
                                name="txt_pickup_other_city_code"
                                id="txt_pickup_other_city_code"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Country/State </label>
                              <input
                                type="text"
                                name="txt_pickup_other_country"
                                className="required form-control form-control-sm"
                                maxLength={50}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Postcode/Zipcode </label>
                              <input
                                type="text"
                                name="txt_pickup_other_postcode"
                                className="required form-control form-control-sm"
                                maxLength={10}
                                onblur="extractNumber(this,2,false);"
                                onkeyup="extractNumber(this,2,false);"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Phone Number </label>
                              <input
                                type="text"
                                name="txt_pickup_other_phone"
                                className="required form-control form-control-sm"
                                maxLength={15}
                                onblur="extractNumber(this,2,false);"
                                onkeyup="extractNumber(this,2,false);"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="pickup_terminal"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Arrival Terminal</label>
                              <br />
                              <select
                                name="pickup_code"
                                id="pickup_code"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>- Select a Terminal -</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>
                                Estimated Time of Arrival (Hours : Minutes)
                              </label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div className="panel-body">
                        <div className="form-group">
                          <label>Drop Off</label>

                          <MultiSelect
                            options={pickup_options}
                            isSearchable
                            isMulti
                            placeholder="Select drop-off"
                            className="custom-select "
                            noOptionsMessage={() => "No Option Found"}
                          />
                        </div>
                        <div
                          id="drop_off_airport"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Drop off to : </label>
                              <select
                                name="dropoff_airport_code"
                                id="dropoff_airport_code"
                                className="required select_style selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>--</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Flight Destination </label>
                              <select
                                name="drop_off_sel_arr_from"
                                id="drop_off_sel_arr_from"
                                className="select_style selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>--</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Flight Number and Airline Code </label>
                              <input
                                type="text"
                                name="drop_off_flight_number"
                                maxLength={15}
                                className="required form-control form-control-sm"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Time of Departure (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="drop_off_accom"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label> </label>
                              <select
                                name="sel_drop_off_from_hotel"
                                id="sel_drop_off_from_hotel"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>--</option>
                                <option label value={0} />
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-12">
                              <div className>
                                <div className="clear" />
                                <div className="form-group col-md-12 checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    name="chk_dropoff"
                                    id="dropoff"
                                    defaultValue={1}
                                    onclick="callmedisplay_dropoff();"
                                  />
                                  <label htmlFor="dropoff">
                                    Click here for an alternative address{" "}
                                  </label>
                                </div>
                              </div>
                              <div className="clear" />
                              <div
                                id="address_display_dropoff"
                                className="row"
                                style={{ display: "none" }}
                              >
                                <div className="form-group col-md-12">
                                  <h5>Select Drop Off </h5>
                                </div>
                                <div className="form-group col-md-12">
                                  <label>Address 1</label>
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_address1"
                                    id="txt_dropoff_hotel_address1"
                                    className="required form-control form-control-sm"
                                    maxLength={40}
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>Address 2</label>
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_address2"
                                    id="txt_dropoff_hotel_address2"
                                    className="required form-control form-control-sm"
                                    maxLength={40}
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>City</label>
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_city"
                                    id="txt_dropoff_hotel_city"
                                    className="required form-control form-control-sm"
                                    maxLength={20}
                                  />
                                  <input
                                    type="hidden"
                                    className="form-control form-control-sm"
                                    name="sel_dropoff_hotel_city"
                                    id="sel_dropoff_hotel_city"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Country</label>
                                  <br />
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_country"
                                    id="txt_dropoff_hotel_country"
                                    className="required form-control form-control-sm"
                                    maxLength={20}
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Postcode/Zipcode</label>
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_postcode"
                                    id="txt_dropoff_hotel_postcode"
                                    className="required form-control form-control-sm"
                                    maxLength={25}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Phone Number</label>
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_phone"
                                    id="txt_dropoff_hotel_phone"
                                    className="required form-control form-control-sm"
                                    maxLength={15}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                  />
                                </div>
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="drop_off_port"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Shipping Destination</label>
                              <input
                                type="text"
                                name="txt_dropoff_port_shipdestination"
                                className="required form-control form-control-sm"
                                maxLength={15}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="drop_off_station"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Train Destination</label>
                              <select
                                name="txt_dropoff_station_destination"
                                id="txt_dropoff_station_destination"
                                className="selectpicker form-control form-control-sm required show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>- Select Destination -</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Train Name/Number</label>
                              <input
                                type="text"
                                name="txt_dropoff_station_train"
                                className="required form-control form-control-sm"
                                maxLength={20}
                                size={28}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Departure Station</label>
                              <select
                                name="sel_dropoff_station"
                                id="sel_dropoff_station"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>
                                  - Select Departure station -
                                </option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Time of Departure (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="drop_off_other"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Time of Departure (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Address 1</label>
                              <input
                                type="text"
                                name="txt_dropoff_other_address1"
                                maxLength={35}
                                className="required form-control form-control-sm"
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Address 2</label>
                              <input
                                type="text"
                                name="txt_dropoff_other_address2"
                                maxLength={35}
                                className="required form-control form-control-sm"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Town/City</label>
                              <br />
                              <input
                                type="text"
                                name="txt_dropoff_other_city"
                                maxLength={35}
                                className="required form-control form-control-sm"
                              />
                              <input
                                type="hidden"
                                name="txt_dropoff_other_city_code"
                                id="txt_dropoff_other_city_code"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Country/State</label>
                              <input
                                type="text"
                                name="txt_dropoff_other_country"
                                maxLength={35}
                                className="required form-control form-control-sm"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Postcode/Zipcode</label>
                              <input
                                type="text"
                                name="txt_dropoff_other_postcode"
                                maxLength={15}
                                className="required form-control form-control-sm"
                                onblur="extractNumber(this,2,false);"
                                onkeyup="extractNumber(this,2,false);"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Phone Number</label>
                              <input
                                type="text"
                                name="txt_dropoff_other_phone"
                                maxLength={15}
                                className="required form-control form-control-sm"
                                onblur="extractNumber(this,2,false);"
                                onkeyup="extractNumber(this,2,false);"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="drop_off_terminal"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Departure Terminal</label>
                              <select
                                name="dropoff_code"
                                id="dropoff_code"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>- Select Terminal -</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Time of Departure (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(BookingAddOfflineHotelInner);
