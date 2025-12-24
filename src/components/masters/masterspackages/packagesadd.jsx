/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import Flatpickr from "react-flatpickr";
import MultiSelect from "../../reactMultiSelect";
import loadingGif from "../../../assets/images/loadingblue.gif";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from "../../../ExcelFiles/worldcities.xlsx";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SimpleAlert,
  SuccessApiToast,
  deleteConfirmation,
  filterOptionsByLabel,
  showConfirmationDialog,
} from "../../../constants/globalfunctions";
// import { EditorState } from 'draft-js';
// // import { Editor } from 'react-draft-wysiwyg';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import uploadFile from "../../../constants/filesuploader";
import { delDATA, getDATA, postDATA, putDATA } from "../../../Apis/API";
import ApiRoutes from "../../../constants/ApiRoutes";
const MastersPackagesAdd = () => {
  // FIRTS TAB STATES

  const [essentialinfoId, setEssentialInfoId] = useState("");

  const [daysadultchildData, setDaysAdultChildData] = useState({
    days: "",
    minAdult: "",
    maxAdult: "",
    minChild: "",
    maxChild: "",
  });
  const [iscityChanged, setiscityChanged] = useState(false);
  const [showAgeSelector, setShowAgeSelector] = useState(false);
  const [fromAge, setFromAge] = useState(1);
  const [toAge, setToAge] = useState(100);
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showphysicalModal, setShowPhysicalModal] = useState(false);
  const [showaddImages, setShowAddImages] = useState(false);
  const [showaddnewInfo, setShowAddNewInfo] = useState(false);
  const [countryOptions, setcountryOptions] = useState([]);
  const [countrycitydata, setcountrycitydata] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [cityOptions, setcityOptions] = useState([]);
  const [selectedCity, setselectedCity] = useState(null);
  const [showActivityPanel, setShowActivityPanel] = useState(false);
  const [showTransferPanel, setShowTransferPanel] = useState(false);
  const [packageCode, setPackageCode] = useState("");
  const [cityedit, setCityEdit] = useState("");
  const [citygalleryedit, setCityGalleryEdit] = useState("");
  const [tag, setTags] = useState("");
  const [isAutogenerate, setIsAutogenerate] = useState(false);
  const [showAccommodation, setShowAccommodation] = useState(false);
  const inputthemRef = useRef(null);
  const inputphyRef = useRef(null);
  const inputusefulinfoRef = useRef(null);
  const inputgalleryRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [isthemeedit, setIsThemeEdit] = useState(false);
  const [cities, setCities] = useState([]);
  //  GET CALL DATA HOLDER STATES

  const [themeData, setThemeData] = useState([]);
  const [edituuid, setEditUUID] = useState("");
  const [originalthemeData, setOriginalThemeData] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const [originallevelData, setOriginalLevelData] = useState([]);
  // State to store the checked values of themes (checkboxes)
  const [selectedThemes, setSelectedThemes] = useState([]);

  // State to store the checked value of physical level (radio buttons)
  const [selectedPhysicalLevel, setSelectedPhysicalLevel] = useState("");
  const [formData, setFormData] = useState({
    themename: "",
    labelforimage: "",
    Description: "",
    display_in_search: false,
    themeimage: "",
  });
  // FIRTS TAB STATES END

  // DATE  & PRICES TAB START

  const [selectedOption, setSelectedOption] = useState("day");
  const [dayValue, setDayValue] = useState(0);
  const [hourValue, setHourValue] = useState("");
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date
  const [priceratesformData, setPriceRatesFormData] = useState({
    primaryCurrency: "",
    rateType: "",
    rateBy: "",
    paxRangeFrom: "",
    paxRangeTo: "",
  });
  const [selectedOccupancies, setSelectedOccupancies] = useState([]);

  const handleOccupanciesCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOccupancies([...selectedOccupancies, value]);
    } else {
      setSelectedOccupancies(
        selectedOccupancies.filter((item) => item !== value)
      );
    }
  };
  const [selectedRate, setSelectedRate] = useState("Rate by Package");

  // Handle change event
  const handleRateChange = (event) => {
    setSelectedRate(event.target.value);
  };
  const getPolicyByUuid = (uuid) => {
    return allpolicyList.find((policy) => policy.uuid === uuid);
  };

  const handleSingleSelectChange = (selectedOption, name, formname) => {
    if (formname === "policy") {
      const matchedPolicy = getPolicyByUuid(selectedOption.value);
      if (matchedPolicy) {
        // Check if the policy already exists in the new list
        const exists = policyList.some(
          (policy) => policy.uuid === selectedOption.value
        );
        if (!exists) {
          // Add the matched policy to the new list
          setPolicyList((prevList) => [...prevList, matchedPolicy]);
        }
        setAddPolicyFormData((prevState) => ({
          ...prevState,
          [name]: selectedOption.value, // Assuming the option object has a 'value' property
        }));
      }
    } else if (formname === "DatePrices") {
      setPriceRatesFormData((prevState) => ({
        ...prevState,
        [name]: selectedOption.value, // Assuming the option object has a 'value' property
      }));
    }
  };
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };
  const handleRadioDatePriceChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDayInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setDayValue(value);
    }
  };

  const handleHourInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setHourValue(value);
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
          value: curr.currencyCode,
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
  const [uuidpricingRates, setPricingRates] = useState([]);
  const sendDataToAPI = async (data, index) => {
    // Replace with your actual API call

    try {
      // First API request
      const response = await postDATA(data, ApiRoutes.PACKAGES.PRICE_RATES);
      if (response.data.statusCode === 200) {
        const newUuid = response.data.data.uuid;
        setPricingRates((prevArray) => [...prevArray, { uuid: newUuid }]);
        if (index === paxRanges.length - 1) {
          SuccessApiToast("Rates Added Successfully");
        }

        // Navigate to a specific URL after successful addition
      }
    } catch (error) {
      // Error notification
      ErrorApiAlert("Error Adding Rates");
    }
    // Simulate API call with a delay
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };
  const addRates = async () => {
    if (
      priceratesformData.primaryCurrency === "" ||
      priceratesformData.primaryCurrency === undefined
    ) {
      RequiredFieldAlert(
        "Currency is required",
        "Please Select Currency",
        "error"
      );
      return false;
    }

    if (rateType === "By Number of Pax") {
      if (paxRanges.length === 1) {
        if (paxRanges[0].max === "") {
          RequiredFieldAlert(
            "Please Add the Max Pax",
            "Please fill in the required fields",
            "error"
          );
          return false;
        } else {
          priceratesformData.paxRangeFrom = paxRanges[0].min;
          priceratesformData.paxRangeTo = paxRanges[0].max;
        }
        priceratesformData.rateBy = selectedRate;
        priceratesformData.rateType = rateType;
        await sendDataToAPI(priceratesformData, 0);
      } else {
        const filteredPaxRanges = paxRanges.filter((range) => range.max !== "");
        setPaxRanges(filteredPaxRanges);
        let cnt = 0;
        for (const range of filteredPaxRanges) {
          try {
            await sendDataToAPI(
              {
                primaryCurrency: priceratesformData.primaryCurrency,
                rateType: rateType,
                rateBy: selectedRate,
                paxRangeFrom: range.min,
                paxRangeTo: range.max,
              },
              cnt
            );
          } catch (error) {
            console.error("Error sending data to API:", error);
          }

          cnt = cnt + 1;
        }
      }
    } else {
      priceratesformData.paxRangeFrom = "";
      priceratesformData.paxRangeTo = "";
      priceratesformData.rateBy = selectedRate;
      priceratesformData.rateType = rateType;
      await sendDataToAPI(priceratesformData, 0);
    }
  };
  const cancelRates = () => {
    setRateType("Single Rate");
    setPaxRanges([
      {
        min: 2,
        max: "",
      },
    ]);
  };
  // DATE & PRICES TAB END
  // SECOND TAB STATES

  // DETAILS START
  const [selectedImages, setSelectedImages] = useState([]);
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [detailsformData, setDetailsFormData] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    saveAsDraft: "no",
    essentialInformation: "",
    galleries: [],
    detailInformations: [],
  });

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxUsefulInfoChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCheckboxes((prevSelected) => {
      if (checked) {
        return [...prevSelected, { uuid: value }];
      } else {
        return prevSelected.filter((item) => item.uuid !== value);
      }
    });
  };
  const handleImageClick = (uuid) => {
    setSelectedImages((prevSelected) => {
      const isSelected = prevSelected.some((item) => item.uuid === uuid);
      if (isSelected) {
        return prevSelected.filter((item) => item.uuid !== uuid);
      } else {
        return [...prevSelected, { uuid }];
      }
    });
  };
  // DETAILS END
  // CANCELATION POLICY START
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [fromDays, setFromDays] = useState(0);
  const [toDays, setToDays] = useState(100);
  const [policyList, setPolicyList] = useState([]);
  const [allpolicyList, setAllPolicyList] = useState([]);
  const [policyOptions, setpolicyOptions] = useState([]);
  const [addpolicyFormData, setAddPolicyFormData] = useState({
    cancellationPolicy: "",
  });
  const [cancelationpolcyformData, setCancellationPolicyFormData] = useState({
    policyName: "",
    from: "",
    percent: "",
  });
  const handlePolicyChange = (event) => {
    setSelectedPolicy(event.target.value);
  };
  const handleRangePolicyDaysChange = (e) => {
    const { name, value } = e.target;
    if (name === "from_days") {
      setFromDays(parseInt(value));
    } else if (name === "to_days") {
      setToDays(parseInt(value));
    }
  };
  const getPolicies = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.PACKAGES.CANCELLATION_POLICY);
      if (response.data.statusCode === 200) {
        const policies =
          response && response.data.data ? response.data.data : [];

        setAllPolicyList(policies);
        const options = policies.map((p) => ({
          value: p.uuid,
          label: p.policyName,
        }));
        setpolicyOptions(options);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Cancellation Policies");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  // CANCELLATION POLICY END
  // INCLUSION & EXCULSION START
  const [inclusionformData, setInclusionFormData] = useState({
    insurance: "",
    tourGuide: "",
    otherInclusions: "",
    essentialInformation: "",
    presetInclusions: [],
  });

  const [exclusionformData, setExclusionFormData] = useState({
    Tips: "",
    tourGuide: "",
    otherExclusions: "",
    essentialInformation: "",
    presetExclusions: [],
  });

  const handleMultiSelectChange = (selectedOptions, formName) => {
    if (formName === "inclusion") {
      const newValues = selectedOptions.map((option) => ({
        uuid: option.value,
      }));

      setInclusionFormData((prevState) => {
        const updatedValues = [...prevState.presetInclusions];

        newValues.forEach((newValue) => {
          const exists = updatedValues.some(
            (value) => value.uuid === newValue.uuid
          );
          if (!exists) {
            updatedValues.push(newValue);
          }
        });

        return {
          ...prevState,
          presetInclusions: updatedValues,
        };
      });
    } else if (formName === "exclusion") {
      const newValues = selectedOptions.map((option) => ({
        uuid: option.value,
      }));

      setExclusionFormData((prevState) => {
        const updatedValues = [...prevState.presetExclusions];

        newValues.forEach((newValue) => {
          const exists = updatedValues.some(
            (value) => value.uuid === newValue.uuid
          );
          if (!exists) {
            updatedValues.push(newValue);
          }
        });

        return {
          ...prevState,
          presetExclusions: updatedValues,
        };
      });
    }
  };

  const [showpresetinclusion, setShowPresetInclusion] = useState(false);
  const inputpresetinclusionRef = useRef(null);
  const [presetinclusionformData, setPresetInclusionFormData] = useState({
    inclusionName: "",
    description: "",
  });
  const [presetinclusionOptions, setPresetInclusionOptions] = useState([]);
  const [presetData, setPresetData] = useState([]);
  const [originalpresetData, setOriginalPresetData] = useState([]);

  // Exclusiom
  const [showpresetexclusion, setShowPresetExclusion] = useState(false);
  const inputpresetexclusionRef = useRef(null);
  const [presetexclusionformData, setPresetExclusionFormData] = useState({
    exclusionName: "",
    description: "",
  });
  const [presetexclusionOptions, setPresetExclusionOptions] = useState([]);
  const [presetexclusionData, setPresetExclusionData] = useState([]);
  const [originalpresetDexclusionata, setOriginalPresetExclusionData] =
    useState([]);
  const getPresetExclusion = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.PACKAGES.PRESET_EXCLUSION);
      if (response.data.statusCode === 200) {
        const exclusion =
          response && response.data.data ? response.data.data : [];

        setPresetExclusionData(exclusion);
        setOriginalPresetExclusionData(exclusion);
        const options = exclusion.map((p) => ({
          value: p.uuid,
          label: p.exclusionName,
        }));
        setPresetExclusionOptions(options);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching PRESET EXCLUSIONS");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const getPresetInclusion = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.PACKAGES.PRESET_INCLUSION);
      if (response.data.statusCode === 200) {
        const inclusion =
          response && response.data.data ? response.data.data : [];

        setPresetData(inclusion);
        setOriginalPresetData(inclusion);
        const options = inclusion.map((p) => ({
          value: p.uuid,
          label: p.inclusionName,
        }));
        setPresetInclusionOptions(options);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching PRESET INCLUSION");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const handleButtonInclusionClick = () => {
    setShowPresetInclusion(true);
  };

  const handleCloseInclusionModal = () => {
    setShowPresetInclusion(false);
    setIsThemeEdit(false);
    setEditUUID("");
    setPresetInclusionFormData({
      inclusionName: "",
      description: "",
    });
  };

  const handleButtonExclusionClick = () => {
    setShowPresetExclusion(true);
  };

  const handleCloseExclusionModal = () => {
    setShowPresetExclusion(false);
    setIsThemeEdit(false);
    setEditUUID("");
    setPresetExclusionFormData({
      exclusionName: "",
      description: "",
    });
  };
  // INCLUSION & EXCLUSION END
  // TERMS & POLICIES  START
  const [termandpoliciesformData, setTermsAndPoliciesFormData] = useState({
    termsPolicies: "",
    ImportantNotes: "",
    OtherTerms: "",
    essentialInformation: "",
  });
  // TERMS AND POLICIES END
  const [selectedusefulinfoCity, setselectedUsefulinfoCity] = useState(null);
  const [selectedusefulinfoCountry, setselectedusefulinfoCountry] =
    useState(null);
  const [cityusefulinfoOptions, setcityusefulinfoOptions] = useState([]);
  const [usefulinfoformData, setUsefulInfoFormData] = useState({
    country: "",
    city: "",
    url: "",
    subject: "",
    usefulInformation: "",
  });
  const [selectedgalleryCity, setselectedGalleryCity] = useState(null);
  const [selectedgalleryCountry, setselectedGalleryCountry] = useState(null);
  const [citygalleryOptions, setcityGalleryOptions] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [originalgalleryData, setOriginalGalleryData] = useState([]);
  const [galleryformData, setGalleryFormData] = useState({
    country: "",
    city: "",
    labelForImage: "",
    image: "",
    shortDescription: "",
    description: "",
  });
  const [rateType, setRateType] = useState("Single Rate"); // Default rate type
  const [paxRanges, setPaxRanges] = useState([{ min: 2, max: "" }]);

  const addMorePaxRange = () => {
    const lastRange = paxRanges[paxRanges.length - 1];
    if (parseInt(lastRange.min) >= 2 && parseInt(lastRange.max) >= 2) {
      setPaxRanges([...paxRanges, { min: "2", max: "" }]);
    } else {
      SimpleAlert("warning", "Range Should be 2", "");
    }
  };

  const removePaxRange = (index) => {
    const newPaxRanges = [...paxRanges];
    newPaxRanges.splice(index, 1);
    setPaxRanges(newPaxRanges);
  };

  const handleInputPaxChange = (e, index, type) => {
    const newPaxRanges = [...paxRanges];
    if (type === "min") {
      newPaxRanges[index].min = e.target.value;
    } else {
      newPaxRanges[index].max = e.target.value;
    }
    setPaxRanges(newPaxRanges);
  };
  const handleRateTypeChange = (event) => {
    setRateType(event.target.value);
    // Toggle visibility of pax range div based on rate type
    const paxRangeDiv = document.getElementById("pax_range_full_div");
    if (event.target.value === "By Number of Pax") {
      paxRangeDiv.style.display = "block";
    } else {
      paxRangeDiv.style.display = "none";
    }
  };
  const [iscitygalleryChanged, setiscitygalleryChanged] = useState(false);
  useEffect(() => {
    // Extract city options based on selected country
    if (selectedgalleryCountry) {
      const cities = countrycitydata.CountryCities.filter(
        (item) => item.iso3 === selectedgalleryCountry.value
      ).map((item) => ({ value: item.city, label: item.city }));
      setcityGalleryOptions(cities);
    } else {
      setcityGalleryOptions([]);
    }
  }, [selectedgalleryCountry]);
  const handleCountryGalleryChange = (selectedOption) => {
    setselectedGalleryCountry(selectedOption);
    setselectedGalleryCity(null);
  };

  const handleCityGalleryChange = (selectedOption) => {
    setiscitygalleryChanged(true);
    setselectedGalleryCity(selectedOption);
  };

  const handleCityGallerySelection = () => {
    if (!selectedgalleryCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select country first", "", "warning");
    }
  };

  const [usefulinfoData, setUsefulInfoData] = useState([]);
  const [originalusefulinfoData, setOriginalUsefulInfoData] = useState([]);

  useEffect(() => {
    // Extract city options based on selected country
    if (selectedusefulinfoCountry) {
      const cities = countrycitydata.CountryCities.filter(
        (item) => item.iso3 === selectedusefulinfoCountry.value
      ).map((item) => ({ value: item.city, label: item.city }));
      setcityusefulinfoOptions(cities);
    } else {
      setcityusefulinfoOptions([]);
    }
  }, [selectedusefulinfoCountry]);
  const handleCountryusefulinfoChange = (selectedOption) => {
    setselectedusefulinfoCountry(selectedOption);
    setselectedUsefulinfoCity(null);
  };

  const handleCityusefulinfoChange = (selectedOption) => {
    setiscityChanged(true);
    setselectedUsefulinfoCity(selectedOption);
  };

  const handleCityusefulinfoSelection = () => {
    if (!selectedusefulinfoCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select country first", "", "warning");
    }
  };

  // SECOND TAB STATES END
  const handleThemeCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedThemes = [...selectedThemes];
    if (checked) {
      // If checkbox is checked and the value is not already in the array, add it
      if (!updatedThemes.includes(value)) {
        updatedThemes.push({ uuid: value });
      }
    } else {
      // If checkbox is unchecked, remove the value from the array
      updatedThemes = updatedThemes.filter((theme) => theme.uuid !== value);
    }
    // Update the state with the updated array
    setSelectedThemes(updatedThemes);
  };

  // Function to handle physical level radio button change
  const handlePhysicalLevelRadioChange = (event) => {
    setSelectedPhysicalLevel(event.target.value);
  };
  const [levelformData, setLevelFormData] = useState({
    physicalLevelName: "",
  });

  const tabData = [
    { id: "subtab1", label: "Essential Information" },
    { id: "subtab2", label: "Details" },
    { id: "subtab3", label: "Itinerary" },
    { id: "subtab4", label: "Dates & Prices" },
    { id: "subtab5", label: "Cancellation Policy" },
    { id: "subtab6", label: "Terms & Policies" },
    { id: "subtab7", label: "Inclusion & Exclusions" },
  ];

  const generatePackageCode = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
    return `PKG${randomNum}`;
  };

  const handleStayInChange = (event) => {
    if (event.target.value === "stayin") {
      setShowAccommodation(true);
    } else {
      setShowAccommodation(false);
    }
  };
  const handleInputSearchChange = (event, filter) => {
    const { value } = event.target;

    setSearchInput(value);

    if (filter === "Theme") {
      // Perform filtering as the user types
      const filtereData = originalthemeData.filter((pr) =>
        pr.themeName.toLowerCase().includes(value.toLowerCase())
      );

      setThemeData(filtereData);
    } else if (filter === "Level") {
      const filtereData = originallevelData.filter((pr) =>
        pr.physicalLevelName.toLowerCase().includes(value.toLowerCase())
      );

      setLevelData(filtereData);
    } else if (filter === "usefulinfo") {
      const filtereData = originalusefulinfoData.filter((pr) =>
        pr.subject.toLowerCase().includes(value.toLowerCase())
      );

      setUsefulInfoData(filtereData);
    } else if (filter === "galleryimage") {
      const filtereData = originalgalleryData.filter((pr) =>
        pr.labelForImage.toLowerCase().includes(value.toLowerCase())
      );

      setGalleryData(filtereData);
    } else if (filter === "exclusion") {
      const filtereData = originalpresetDexclusionata.filter((pr) =>
        pr.exclusionName.toLowerCase().includes(value.toLowerCase())
      );

      setPresetExclusionData(filtereData);
    } else if (filter === "inclusion") {
      const filtereData = originalpresetData.filter((pr) =>
        pr.inclusionName.toLowerCase().includes(value.toLowerCase())
      );

      setPresetData(filtereData);
    }
  };

  const handleCheckboxChange = () => {
    setIsAutogenerate(!isAutogenerate);
    if (!isAutogenerate) {
      setPackageCode(generatePackageCode());
    } else {
      setPackageCode(""); // Clear the code if unchecked
    }
  };

  const handleActivityCheckboxChange = (event) => {
    setShowActivityPanel(event.target.checked);
  };

  const handleTransferCheckboxChange = (event) => {
    setShowTransferPanel(event.target.checked);
  };
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
    } catch (error) {}
  };

  const handleFileInput = async (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleInputChange = (e, formname) => {
    const { name, value, type, checked } = e.target;
    if (formname === "themeform") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else if (formname === "Level") {
      setLevelFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (formname === "essential") {
      setTags(value);
    } else if (formname === "daysadultchildData") {
      if (/^\d*$/.test(value) || value === "") {
        setDaysAdultChildData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else if (formname === "usefulinfo") {
      setUsefulInfoFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (formname === "galleryimage") {
      setGalleryFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (formname === "Details") {
      setDetailsFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (formname === "policy") {
      if (name !== "percent") {
        setCancellationPolicyFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else {
        const numericValue = value.replace(/[^0-9]/g, "");
        setCancellationPolicyFormData((prevState) => ({
          ...prevState,
          [name]: numericValue,
        }));
      }
    } else if (formname === "termsandpolicies") {
      setTermsAndPoliciesFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (formname === "presetInclusion") {
      setPresetInclusionFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (formname === "presetexclusion") {
      setPresetExclusionFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (formname === "exclusion") {
      setExclusionFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (formname === "inclusion") {
      setInclusionFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      themename: "",
      labelforimage: "",
      Description: "",
      display_in_search: false,
      themeimage: "",
    });
    setSelectedFile(null);
    setIsThemeEdit(false);
    setEditUUID("");
    setSearchInput("");
  };
  const handleButtonNewImageClick = () => {
    setShowAddImages(true);
  };

  const handleCloseNewImageModal = () => {
    setShowAddImages(false);
    setiscitygalleryChanged(false);
    setselectedGalleryCity(null);
    setselectedGalleryCountry(null);
    setGalleryFormData({
      country: "",
      city: "",
      labelForImage: "",
      image: "",
      shortDescription: "",
      description: "",
    });
  };

  const handleButtonNewInfoClick = () => {
    setShowAddNewInfo(true);
  };

  const handleCloseNewInfoModal = () => {
    setShowAddNewInfo(false);
    setiscityChanged(false);
    setselectedUsefulinfoCity(null);
    setselectedusefulinfoCountry(null);
    setUsefulInfoFormData({
      country: "",
      city: "",
      url: "",
      subject: "",
      usefulInformation: "",
    });
  };
  const handlePhysicalButtonClick = () => {
    setShowPhysicalModal(true);
  };

  const handlePhysicalCloseModal = () => {
    setShowPhysicalModal(false);

    setLevelFormData({ physicalLevelName: "" });

    setIsThemeEdit(false);
    setEditUUID("");
    setSearchInput(" ");
  };
  const handleRadioChange = (e) => {
    const { value } = e.target;
    if (value === "group") {
      setShowAgeSelector(true);
    } else {
      setShowAgeSelector(false);
    }
  };
  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === "from_age") {
      setFromAge(parseInt(value));
    } else if (name === "to_age") {
      setToAge(parseInt(value));
    }
  };

  const handleCountryCityRadioChange = (uuid, field, value) => {
    setCities(
      cities.map((city) =>
        city.uuid === uuid ? { ...city, [field]: value } : city
      )
    );
  };

  const [activeTab, setActiveTab] = useState("subtab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    fetchExcelData();
    getCurrencies();
    getPolicies();
    getPresetInclusion();
    getPresetExclusion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  const handleCityChange = (selectedOption) => {
    setselectedCity(selectedOption);
  };

  const handleCitySelection = () => {
    if (!selectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select country first", "", "warning");
    }
  };
  function getCheckedRadioValue(name) {
    const checkedRadio = document.querySelector(
      `input[type="radio"][name="${name}"]:checked`
    );
    return checkedRadio ? checkedRadio.value : "";
  }

  const checkRequired = (essentialformdata, formname) => {
    if (formname === "essentialinfo") {
      if (
        essentialformdata.packageCode === "" ||
        essentialformdata.packageCode === undefined
      ) {
        RequiredFieldAlert(
          "Package Code is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.type === "" ||
        essentialformdata.type === undefined
      ) {
        RequiredFieldAlert(
          "Type is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.subType === "" ||
        essentialformdata.type === undefined
      ) {
        RequiredFieldAlert(
          "Sub Type is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.servicesIncluded.length === 0 ||
        essentialformdata.servicesIncluded === undefined
      ) {
        RequiredFieldAlert(
          "Services are required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.themeCategory.length === 0 ||
        essentialformdata.themeCategory === undefined
      ) {
        RequiredFieldAlert(
          "Category is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.physicalLevel === "" ||
        essentialformdata.physicalLevel === undefined
      ) {
        RequiredFieldAlert(
          "Physical Level is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.noOfDays === "" ||
        essentialformdata.noOfDays === undefined
      ) {
        RequiredFieldAlert(
          "No. of Days is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.minNoOfAdult === "" ||
        essentialformdata.minNoOfAdult === undefined
      ) {
        RequiredFieldAlert(
          "Min No. of Adult is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.maxNoOfAdult === "" ||
        essentialformdata.maxNoOfAdult === undefined
      ) {
        RequiredFieldAlert(
          "Max No. of Adult is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.minNoOfChild === "" ||
        essentialformdata.minNoOfChild === undefined
      ) {
        RequiredFieldAlert(
          "Min No. of Child is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.maxNoOfChild === "" ||
        essentialformdata.maxNoOfChild === undefined
      ) {
        RequiredFieldAlert(
          "Max No. of Child is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }

      return true;
    } else if (formname === "usefulinfo") {
      if (
        essentialformdata.country === "" ||
        essentialformdata.country === undefined
      ) {
        RequiredFieldAlert(
          "Country is required",
          "Please select Country",
          "error"
        );
        return false;
      } else if (
        essentialformdata.city === "" ||
        essentialformdata.city === undefined
      ) {
        RequiredFieldAlert("City is required", "Please select City", "error");
        return false;
      } else if (
        essentialformdata.url === "" ||
        essentialformdata.url === undefined
      ) {
        RequiredFieldAlert(
          "Url is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.subject === "" ||
        essentialformdata.subject === undefined
      ) {
        RequiredFieldAlert(
          "Subject is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }

      return true;
    } else if (formname === "galleryimage") {
      if (
        essentialformdata.country === "" ||
        essentialformdata.country === undefined
      ) {
        RequiredFieldAlert(
          "Country is required",
          "Please select Country",
          "error"
        );
        return false;
      } else if (
        essentialformdata.city === "" ||
        essentialformdata.city === undefined
      ) {
        RequiredFieldAlert("City is required", "Please select City", "error");
        return false;
      } else if (
        essentialformdata.image === "" ||
        essentialformdata.image === undefined
      ) {
        RequiredFieldAlert(
          "Image is required",
          "Please Upload the Image",
          "error"
        );
        return false;
      }

      return true;
    } else if (formname === "Details") {
      if (
        essentialformdata.name === "" ||
        essentialformdata.name === undefined
      ) {
        RequiredFieldAlert(
          "Package Name is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      } else if (
        essentialformdata.essentialInformation === "" ||
        essentialformdata.essentialInformation === undefined
      ) {
        RequiredFieldAlert(
          "Essential Information is required",
          "Please Check if your Essential Information is Added Correctly?",
          "error"
        );
        return false;
      }

      return true;
    }
  };

  const handleSubmit = async (e, formname) => {
    e.preventDefault();

    if (formname === "themeform") {
      if (formData.themename === "" || formData.themename === undefined) {
        RequiredFieldAlert(
          "Theme Name is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      }

      const resp = await uploadFile(selectedFile);
      if (resp.success === true) {
        setFormData((prevState) => ({
          ...prevState,
          themeimage: resp.imagelink,
        }));
      } else {
      }

      // Constructing profileBody
      const themeBody = {
        themeName: formData.themename,
        labelForImage: formData.labelforimage,
        image: formData.themeimage,
        description: formData.Description,
        addForSlider: formData.display_in_search,
      };

      try {
        // First API request
        const response = await postDATA(themeBody, ApiRoutes.PACKAGES.THEME);
        if (response.data.statusCode === 200) {
          await getThemes();
          setFormData({
            themename: "",
            labelforimage: "",
            Description: "",
            display_in_search: false,
            themeimage: "",
          });
          setSelectedFile(null);

          // Success notification
          SuccessApiToast("Theme Added Successfully");
          // Navigate to a specific URL after successful addition
        }
      } catch (error) {
        // Error notification
        ErrorApiAlert("Error Adding Theme");
      }
    } else if (formname === "Physical Level") {
      if (
        levelformData.physicalLevelName === "" ||
        levelformData.physicalLevelName === undefined
      ) {
        RequiredFieldAlert(
          "Physical Level Name is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      }
      try {
        // First API request
        const response = await postDATA(
          levelformData,
          ApiRoutes.PACKAGES.NEW_LEVELS
        );
        if (response.data.statusCode === 200) {
          await getphysicalLevels();
          setLevelFormData({
            physicalLevelName: "",
          });

          // Success notification
          SuccessApiToast("Physical Level Added Successfully");
          // Navigate to a specific URL after successful addition
        }
      } catch (error) {
        // Error notification
        ErrorApiAlert("Error Adding Physical Level");
      }
    } else if (formname === "CountryCity") {
      const requestbody = {
        country: (selectedCountry && selectedCountry.label) || "",
        city: (selectedCity && selectedCity.label) || "",
        visaIncluded: false,
        showVisaRequirements: false,
      };

      if (cities.length > 0) {
        const cityExists = cities.some(
          (c) =>
            c.country === requestbody.country && c.city === requestbody.city
        );
        if (cityExists) {
          const userConfirmed = await showConfirmationDialog(
            "Country City already added. Would you like to add it again?"
          );
          if (!userConfirmed) {
            return;
          }
        }
      }
      try {
        // First API request
        const response = await postDATA(
          requestbody,
          ApiRoutes.PACKAGES.COUNTRY_CITY_INFO
        );
        if (response.data.statusCode === 200) {
          setCities([...cities, response.data.data]);

          SuccessApiToast("Country City Added Successfully");
        }
      } catch (error) {
        // Error notification
        ErrorApiAlert("Error Adding Country City");
      }
    } else if (formname === "EssentialInformation") {
      var typeradioButtons = document.querySelectorAll(
        'input[type="radio"][name="type"]'
      );
      var type;
      for (var i = 0; i < typeradioButtons.length; i++) {
        if (typeradioButtons[i].checked) {
          // Step 3: Retrieve the value of the checked radio button
          type = typeradioButtons[i].value;
          break; // Exit the loop since we found the checked radio button
        }
      }
      var subtypecheckboxes = document.querySelectorAll(
        'input[type="checkbox"][name="sub_type[]"]'
      );
      var subcheckedValues = [];
      for (var j = 0; j < subtypecheckboxes.length; j++) {
        if (subtypecheckboxes[j].checked) {
          // Step 3: Retrieve the value of the checked checkbox
          subcheckedValues.push(subtypecheckboxes[j].value);
        }
      }
      var servicescheckboxes = document.querySelectorAll(
        'input[type="checkbox"][name="services[]"]'
      );
      var servicescheckedValues = [];
      for (var k = 0; k < servicescheckboxes.length; k++) {
        if (servicescheckboxes[k].checked) {
          // Step 3: Retrieve the value of the checked checkbox
          servicescheckedValues.push(servicescheckboxes[k].value);
        }
      }
      const selectedActivityPackageType = getCheckedRadioValue(
        "activity_package_type"
      );
      const selectedTransferPackageType = getCheckedRadioValue(
        "transfer_package_type"
      );
      let agegroup = "";
      if (showAgeSelector) {
        agegroup = fromAge;
      } else {
        agegroup = "all";
      }
      const requestbody = {
        packageCode: packageCode,
        type: type,
        subType: subcheckedValues,
        servicesIncluded: servicescheckedValues,
        activityType: selectedActivityPackageType,
        transferType: selectedTransferPackageType,
        tags: [tag],
        ageGroup: agegroup,
        noOfDays: daysadultchildData.days,
        minNoOfAdult: daysadultchildData.minAdult,
        maxNoOfAdult: daysadultchildData.maxAdult,
        minNoOfChild: daysadultchildData.minChild,
        maxNoOfChild: daysadultchildData.maxChild,
        themeCategory: selectedThemes,
        physicalLevel: selectedPhysicalLevel,
        cities: cities.map((city) => ({ uuid: city.uuid })),
      };
      const isSuccessfull = checkRequired(requestbody, "essentialinfo");
      if (isSuccessfull) {
        try {
          const response = await postDATA(
            requestbody,
            ApiRoutes.PACKAGES.ESSENTIAL_INFORMATION
          );

          if (response.data.statusCode === 200) {
            SuccessApiToast("Essential Information Added Successfully");
            setEssentialInfoId(response.data.data.uuid);
            localStorage.setItem("days", parseInt(response.data.data.noOfDays));

            localStorage.setItem("packageCode", response.data.data.packageCode);

            setActiveTab("subtab2");
          }
        } catch (error) {
          ErrorApiAlert("Error Adding Essential Information");
        }
      }
    } else if (formname === "usefulinfo") {
      usefulinfoformData.country =
        (selectedusefulinfoCountry && selectedusefulinfoCountry.label) || "";
      usefulinfoformData.city =
        (selectedusefulinfoCity && selectedusefulinfoCity.label) || "";

      const isSuccessfull = checkRequired(usefulinfoformData, "usefulinfo");
      if (isSuccessfull) {
        try {
          const response = await postDATA(
            usefulinfoformData,
            ApiRoutes.PACKAGES.USEFUL_INFORMATION
          );

          if (response.data.statusCode === 200) {
            SuccessApiToast("Useful Information Added Successfully");
            setiscityChanged(false);
            setselectedUsefulinfoCity(null);
            setselectedusefulinfoCountry(null);
            setUsefulInfoFormData({
              country: "",
              city: "",
              url: "",
              subject: "",
              usefulInformation: "",
            });

            await getUsefulInfo();
          }
        } catch (error) {
          ErrorApiAlert("Error Adding Useful Information");
        }
      }
    } else if (formname === "GalleryImage") {
      let img = "";
      try {
        const resp = await uploadFile(selectedFile);

        if (resp.success === true) {
          img = resp.imagelink;
        } else {
        }
      } catch (error) {
        img = "";
      }
      galleryformData.country =
        (selectedgalleryCountry && selectedgalleryCountry.label) || "";
      galleryformData.city =
        (selectedgalleryCity && selectedgalleryCity.label) || "";
      galleryformData.image = img;
      const isSuccessfull = checkRequired(galleryformData, "galleryimage");
      if (isSuccessfull) {
        try {
          const response = await postDATA(
            galleryformData,
            ApiRoutes.PACKAGES.GALLERY_IMAGE
          );

          if (response.data.statusCode === 200) {
            SuccessApiToast("Gallery Image Added Successfully");
            setiscitygalleryChanged(false);
            setselectedGalleryCity(null);
            setselectedGalleryCountry(null);
            setGalleryFormData({
              country: "",
              city: "",
              labelForImage: "",
              image: "",
              shortDescription: "",
              description: "",
            });

            await getGallery();
          }
        } catch (error) {
          ErrorApiAlert("Error Gallery Image");
        }
      }
    } else if (formname === "Details" || formname === "DetailsSaveDraft") {
      detailsformData.galleries = selectedImages;
      detailsformData.detailInformations = selectedCheckboxes;
      detailsformData.saveAsDraft =
        formname === "DetailsSaveDraft" ? "yes" : "no";
      detailsformData.essentialInformation = essentialinfoId;

      const isSuccessfull = checkRequired(detailsformData, "Details");
      if (isSuccessfull) {
        try {
          const response = await postDATA(
            detailsformData,
            ApiRoutes.PACKAGES.DETAILS
          );

          if (response.data.statusCode === 200) {
            SuccessApiToast("Details Added Successfully");
          }
        } catch (error) {
          ErrorApiAlert("Error Adding Details");
        }
      }
    } else if (formname === "datesandRates") {
      const dateObject = new Date(startDate);

      const dateObject2 = new Date(endDate);

      // Constructing profileBody
      const requestBody = {
        startDate: formatDate(dateObject),
        endDate: formatDate(dateObject2),
        releasePeriod: selectedOption === "hour" ? hourValue : dayValue,
        occupancy: selectedOccupancies,
        essentialInformation: essentialinfoId,
        pricingRates: uuidpricingRates,
      };

      if (requestBody.startDate === "" || requestBody.startDate === undefined) {
        RequiredFieldAlert(
          "Start Date is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      } else if (
        requestBody.endDate === "" ||
        requestBody.endDate === undefined
      ) {
        RequiredFieldAlert(
          "End Date is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      } else if (
        requestBody.releasePeriod === "" ||
        requestBody.releasePeriod === undefined
      ) {
        RequiredFieldAlert(
          "Release Period is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      } else if (
        requestBody.essentialInformation === "" ||
        requestBody.essentialInformation === undefined
      ) {
        RequiredFieldAlert(
          "Essential Information is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      } else if (
        requestBody.occupancy.length === 0 ||
        requestBody.occupancy === undefined
      ) {
        RequiredFieldAlert(
          "Occupancy is required",
          "Please select occupancy",
          "error"
        );
        return;
      } else if (
        requestBody.pricingRates.length === 0 ||
        requestBody.pricingRates === undefined
      ) {
        RequiredFieldAlert(
          "Pricing Rate is required",
          "Please Add Pricing Rates First",
          "error"
        );
        return;
      }

      try {
        // First API request
        const response = await postDATA(
          requestBody,
          ApiRoutes.PACKAGES.DATES_AND_PRICE
        );
        if (response.data.statusCode === 200) {
          // Success notification
          SuccessApiToast("Dates and Prices Added Successfully");
          // Navigate to a specific URL after successful addition
        }
      } catch (error) {
        // Error notification
        ErrorApiAlert("Error Adding Dates and Prices");
      }
    } else if (formname === "policy") {
      if (selectedPolicy === "create") {
        cancelationpolcyformData.from = fromDays;
        if (
          cancelationpolcyformData.policyName === "" ||
          cancelationpolcyformData.policyName === undefined
        ) {
          RequiredFieldAlert(
            "Policy Name is required",
            "Please fill in the required fields",
            "error"
          );
          return;
        } else if (
          cancelationpolcyformData.percent === "" ||
          cancelationpolcyformData.percent === undefined
        ) {
          RequiredFieldAlert(
            "Percentage is required",
            "Please fill in the required fields",
            "error"
          );
          return;
        }
        try {
          // First API request
          const response = await postDATA(
            cancelationpolcyformData,
            ApiRoutes.PACKAGES.CANCELLATION_POLICY_ADD
          );
          if (response.data.statusCode === 200) {
            const newPolicy = response.data.data;
            setPolicyList((prevList) => [...prevList, newPolicy]);
            await getPolicies();

            // Success notification
            SuccessApiToast("Cancellation Policy Created Successfully");
            // Navigate to a specific URL after successful addition
          }
        } catch (error) {
          // Error notification
          ErrorApiAlert("Error Adding Cancellation Policy");
        }
      } else if (selectedPolicy === "select") {
        const requestBody = {
          policy: "",
          saveAsDraft: false,
          essentialInformation: essentialinfoId,
          cancellationPolicy: addpolicyFormData.cancellationPolicy,
        };

        if (
          requestBody.essentialInformation === "" ||
          requestBody.essentialInformation === undefined
        ) {
          RequiredFieldAlert(
            "Essential Information is required",
            "Please fill in the required fields",
            "error"
          );
          return;
        } else if (
          requestBody.cancellationPolicy === "" ||
          requestBody.cancellationPolicy === undefined
        ) {
          RequiredFieldAlert(
            "Cancellation Policy is required",
            "Please fill in the required fields",
            "error"
          );
          return;
        }
        try {
          // First API request
          const response = await postDATA(
            requestBody,
            ApiRoutes.PACKAGES.CANCELLATION_POLICY_ADD
          );

          if (response.data.statusCode === 200) {
            // Success notification
            SuccessApiToast("Cancellation Policy Added Successfully");
            // Navigate to a specific URL after successful addition
          }
        } catch (error) {
          // Error notification
          ErrorApiAlert("Error Adding Cancellation Policy");
        }
      }
    } else if (formname === "policySaveDraft") {
      if (selectedPolicy === "select") {
        const requestBody = {
          policy: "",
          saveAsDraft: true,
          essentialInformation: essentialinfoId,
          cancellationPolicy: addpolicyFormData.cancellationPolicy,
        };

        if (
          requestBody.essentialInformation === "" ||
          requestBody.essentialInformation === undefined
        ) {
          RequiredFieldAlert(
            "Essential Information is required",
            "Please fill in the required fields",
            "error"
          );
          return;
        } else if (
          requestBody.cancellationPolicy === "" ||
          requestBody.cancellationPolicy === undefined
        ) {
          RequiredFieldAlert(
            "Cancellation Policy is required",
            "Please fill in the required fields",
            "error"
          );
          return;
        }
        try {
          // First API request
          const response = await postDATA(
            requestBody,
            ApiRoutes.PACKAGES.CANCELLATION_POLICY_ADD
          );

          if (response.data.statusCode === 200) {
            // Success notification
            SuccessApiToast("Cancellation Policy Added Successfully");
            // Navigate to a specific URL after successful addition
          }
        } catch (error) {
          // Error notification
          ErrorApiAlert("Error Adding Cancellation Policy");
        }
      }
    } else if (formname === "termsandpolicies") {
      termandpoliciesformData.essentialInformation = essentialinfoId;
      if (
        termandpoliciesformData.essentialInformation === "" ||
        termandpoliciesformData.essentialInformation === undefined
      ) {
        RequiredFieldAlert(
          "Essential Information is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      }

      try {
        // First API request
        const response = await postDATA(
          termandpoliciesformData,
          ApiRoutes.PACKAGES.TERMS_AND_CONDITION
        );

        if (response.data.statusCode === 200) {
          // Success notification
          SuccessApiToast("Terms & Policies Added Successfully");
          // Navigate to a specific URL after successful addition
        }
      } catch (error) {
        // Error notification
        ErrorApiAlert("Error Adding Terms & Policies");
      }
    } else if (formname === "presetInclusion") {
      if (
        presetinclusionformData.inclusionName === "" ||
        presetinclusionformData.inclusionName === undefined
      ) {
        RequiredFieldAlert(
          "Inclusion Name  is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      }

      try {
        // First API request
        const response = await postDATA(
          presetinclusionformData,
          ApiRoutes.PACKAGES.PRESET_INCLUSION
        );

        if (response.data.statusCode === 200) {
          await getPresetInclusion();
          setPresetInclusionFormData({
            inclusionName: "",
            description: "",
          });
          // Success notification
          SuccessApiToast("Preset Inclusion Added Successfully");
          // Navigate to a specific URL after successful addition
        }
      } catch (error) {
        // Error notification
        ErrorApiAlert("Error Adding Preset Inclusion");
      }
    } else if (formname === "presetExclusion") {
      if (
        presetexclusionformData.exclusionName === "" ||
        presetexclusionformData.exclusionName === undefined
      ) {
        RequiredFieldAlert(
          "Exclusion Name  is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      }

      try {
        // First API request
        const response = await postDATA(
          presetexclusionformData,
          ApiRoutes.PACKAGES.PRESET_EXCLUSION
        );

        if (response.data.statusCode === 200) {
          await getPresetExclusion();
          setPresetExclusionFormData({
            exclusionName: "",
            description: "",
          });
          // Success notification
          SuccessApiToast("Preset Exclusion Added Successfully");
          // Navigate to a specific URL after successful addition
        }
      } catch (error) {
        // Error notification
        ErrorApiAlert("Error Adding Preset Exclusion");
      }
    } else if (formname === "inclusionexclusion") {
      inclusionformData.essentialInformation = essentialinfoId;
      exclusionformData.essentialInformation = essentialinfoId;
      if (
        inclusionformData.essentialInformation === "" ||
        inclusionformData.essentialInformation === undefined
      ) {
        RequiredFieldAlert(
          "Essential Information is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      } else if (
        inclusionformData.presetInclusions.length === 0 ||
        inclusionformData.presetInclusions === undefined
      ) {
        RequiredFieldAlert(
          "Preset Inclusion is required",
          "Please select preset inclusions",
          "error"
        );
        return;
      }

      if (
        exclusionformData.essentialInformation === "" ||
        exclusionformData.essentialInformation === undefined
      ) {
        RequiredFieldAlert(
          "Essential Information is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      } else if (
        exclusionformData.presetExclusions.length === 0 ||
        exclusionformData.presetExclusions === undefined
      ) {
        RequiredFieldAlert(
          "Preset Exclusion is required",
          "Please select preset exclusions",
          "error"
        );
        return;
      }

      try {
        // First API request
        const response = await postDATA(
          inclusionformData,
          ApiRoutes.PACKAGES.PRESET_INCLUSION
        );

        if (response.data.statusCode === 200) {
          // Success notification
          SuccessApiToast("Inclusion Added Successfully");
          // Navigate to a specific URL after successful addition
        }
      } catch (error) {
        // Error notification
        ErrorApiAlert("Error Adding Inclusion");
      }
      try {
        // First API request
        const response = await postDATA(
          exclusionformData,
          ApiRoutes.PACKAGES.PRESET_EXCLUSION
        );

        if (response.data.statusCode === 200) {
          // Success notification
          SuccessApiToast("Exclusion Added Successfully");
          // Navigate to a specific URL after successful addition
        }
      } catch (error) {
        // Error notification
        ErrorApiAlert("Error Adding Exclusion");
      }
    }
  };

  // PACKAGES GET API CALLS
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding leading zero if needed
    const day = date.getDate().toString().padStart(2, "0"); // Adding leading zero if needed
    return `${month}/${day}/${year}`;
  };

  const getThemes = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.PACKAGES.THEME);
      if (response.data.statusCode === 200) {
        const themes = response && response.data.data ? response.data.data : [];

        setThemeData(themes);
        setOriginalThemeData(themes);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Themes");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  const getphysicalLevels = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.PACKAGES.NEW_LEVELS);
      if (response.data.statusCode === 200) {
        const level = response && response.data.data ? response.data.data : [];

        setLevelData(level);
        setOriginalLevelData(level);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Themes");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  const getUsefulInfo = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.PACKAGES.USEFUL_INFORMATION);
      if (response.data.statusCode === 200) {
        const info = response && response.data.data ? response.data.data : [];

        setUsefulInfoData(info);
        setOriginalUsefulInfoData(info);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Useful Information");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  const getGallery = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.PACKAGES.GALLERY_IMAGE);
      if (response.data.statusCode === 200) {
        const info = response && response.data.data ? response.data.data : [];

        setGalleryData(info);
        setOriginalGalleryData(info);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Gallery Images ");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getThemes();
    getphysicalLevels();
    getUsefulInfo();
    getGallery();
  }, []);

  // PACKAGES DELETE CALLS

  const handleDeleteClick = async (uuid, endpoint, title) => {
    try {
      const isDeleted = await deleteConfirmation(
        `Are You Sure You Want To Delete This ${title}?`,
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        `${title} has been deleted successfully.`,
        endpoint
      );

      if (isDeleted) {
        if (title === "Theme") {
          setOriginalThemeData((th) => th.filter((t) => t.uuid !== uuid));
          setThemeData((th) => th.filter((t) => t.uuid !== uuid));
        } else if (title === "Physical Level") {
          setOriginalLevelData((th) => th.filter((t) => t.uuid !== uuid));
          setLevelData((th) => th.filter((t) => t.uuid !== uuid));
        } else if (title === "Country City") {
          setCities((th) => th.filter((t) => t.uuid !== uuid));
        } else if (title === "Useful Information") {
          setOriginalUsefulInfoData((th) => th.filter((t) => t.uuid !== uuid));
          setUsefulInfoData((th) => th.filter((t) => t.uuid !== uuid));
        } else if (title === "Gallery Image") {
          setOriginalGalleryData((th) => th.filter((t) => t.uuid !== uuid));
          setGalleryData((th) => th.filter((t) => t.uuid !== uuid));
        } else if (title === "Cancellation Policy") {
          setPolicyList((th) => th.filter((t) => t.uuid !== uuid));
          await getPolicies();
        } else if (title === "Preset Inclusion") {
          setPresetData((th) => th.filter((t) => t.uuid !== uuid));
          setOriginalPresetData((th) => th.filter((t) => t.uuid !== uuid));
          await getPresetInclusion();
        } else if (title === "Preset Exclusion") {
          setPresetExclusionData((th) => th.filter((t) => t.uuid !== uuid));
          setOriginalPresetExclusionData((th) =>
            th.filter((t) => t.uuid !== uuid)
          );
          await getPresetExclusion();
        }
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  // PACKAGES EDIT DATA SETTER

  const handleEdditClick = (data, toedit) => {
    if (toedit === "Theme") {
      setEditUUID(data.uuid);
      setFormData({
        themename: data.themeName,
        labelforimage: data.labelForImage,
        Description: data.description,
        display_in_search: data.addForSlider,
        themeimage: data.image,
      });
      if (inputthemRef.current) {
        inputthemRef.current.focus();
      }
      setIsThemeEdit(true);
    } else if (toedit === "PhysicalLevel") {
      setIsThemeEdit(true);
      setEditUUID(data.uuid);
      setLevelFormData({
        physicalLevelName: data.physicalLevelName,
      });
      if (inputphyRef.current) {
        inputphyRef.current.focus();
      }
    } else if (toedit === "usefulinfo") {
      setIsThemeEdit(true);
      setEditUUID(data.uuid);
      if (countryOptions && countryOptions.length > 0) {
        // Check if pickupselectedCountry is not set and pickupcountryValue has some value
        if (!selectedusefulinfoCountry) {
          // Ensure data.pickupCountry is defined before calling filterOptionsByLabel
          if (data.country) {
            const countryValue = filterOptionsByLabel(
              countryOptions,
              data.country
            );
            setselectedusefulinfoCountry(countryValue);

            const cityValue = filterOptionsByLabel(cityOptions, data.city);
            setselectedUsefulinfoCity(cityValue);
          }
        }
      }

      setCityEdit(data.city);

      setUsefulInfoFormData({
        country: data.country,
        city: data.city,
        url: data.url,
        subject: data.subject,
        usefulInformation: data.usefulInformation,
      });
      if (inputusefulinfoRef.current) {
        inputusefulinfoRef.current.focus();
      }
    } else if (toedit === "galleryimage") {
      setIsThemeEdit(true);
      setEditUUID(data.uuid);
      if (countryOptions && countryOptions.length > 0) {
        // Check if pickupselectedCountry is not set and pickupcountryValue has some value
        if (!selectedgalleryCountry) {
          // Ensure data.pickupCountry is defined before calling filterOptionsByLabel
          if (data.country) {
            const countryValue = filterOptionsByLabel(
              countryOptions,
              data.country
            );
            setselectedGalleryCountry(countryValue);

            const cityValue = filterOptionsByLabel(cityOptions, data.city);
            setselectedGalleryCity(cityValue);
          }
        }
      }

      setCityGalleryEdit(data.city);

      setGalleryFormData({
        country: data.country,
        city: data.city,
        labelForImage: data.labelForImage,
        image: data.image,
        shortDescription: data.shortDescription,
        description: data.description,
      });
      if (inputgalleryRef.current) {
        inputgalleryRef.current.focus();
      }
    } else if (toedit === "presetinclusion") {
      setIsThemeEdit(true);
      setEditUUID(data.uuid);

      if (inputpresetinclusionRef.current) {
        inputpresetinclusionRef.current.focus();
      }
      setPresetInclusionFormData({
        inclusionName: data.inclusionName,
        description: data.description,
      });
    } else if (toedit === "presetexclusion") {
      setIsThemeEdit(true);
      setEditUUID(data.uuid);

      if (inputpresetexclusionRef.current) {
        inputpresetexclusionRef.current.focus();
      }
      setPresetExclusionFormData({
        exclusionName: data.exclusionName,
        description: data.description,
      });
    }
  };
  // EDIT API CALL
  const Edit = async (e, endpoint, title, additionaldataifany = null) => {
    e.preventDefault();

    if (title === "Theme") {
      if (formData.themename === "" || formData.themename === undefined) {
        RequiredFieldAlert(
          "Theme Name is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      }
      const resp = await uploadFile(selectedFile);
      let img = "";
      if (resp.success === true) {
        img = resp.imagelink;
      } else {
      }
      const themeBody = {
        themeName: formData.themename,
        labelForImage: formData.labelforimage,
        image: img,
        description: formData.Description,
        addForSlider: formData.display_in_search,
      };

      try {
        // Make an API call to update the staff's active status

        const response = await putDATA(endpoint, edituuid, themeBody);

        // Check the response and handle it accordingly
        if (response.data.statusCode === 200) {
          SuccessApiToast(`${title} Updated Successfully`);

          setEditUUID("");

          await getThemes();
          setFormData({
            themename: "",
            labelforimage: "",
            Description: "",
            display_in_search: false,
            themeimage: "",
          });
          setSelectedFile(null);
          setIsThemeEdit(false);
        } else {
          SimpleAlert("error", "Error", `Failed to Update ${title}`);
        }
      } catch (error) {
        // Handle errors from the API call

        SimpleAlert("error", "Error", "An unexpected error occurred.");
      }
    } else if (title === "Physical Level") {
      if (
        levelformData.physicalLevelName === "" ||
        levelformData.physicalLevelName === undefined
      ) {
        RequiredFieldAlert(
          "Physical Level Name is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      }

      try {
        // Make an API call to update the staff's active status

        const response = await putDATA(endpoint, edituuid, levelformData);

        // Check the response and handle it accordingly
        if (response.data.statusCode === 200) {
          SuccessApiToast(`${title} Updated Successfully`);

          setEditUUID("");

          await getphysicalLevels();
          setLevelFormData({
            physicalLevelName: "",
          });
          setSelectedFile(null);
          setIsThemeEdit(false);
        } else {
          SimpleAlert("error", "Error", `Failed to Update ${title}`);
        }
      } catch (error) {
        // Handle errors from the API call

        SimpleAlert("error", "Error", "An unexpected error occurred.");
      }
    } else if (title === "Country City") {
      try {
        // Make an API call to update the staff's active status

        const response = await putDATA(endpoint, additionaldataifany.uuid, {
          country: additionaldataifany.country,
          city: additionaldataifany.city,
          visaIncluded: additionaldataifany.visaIncluded,
          showVisaRequirements: additionaldataifany.showVisaRequirements,
        });

        // Check the response and handle it accordingly
        if (response.data.statusCode === 200) {
          SuccessApiToast(`${title} Updated Successfully`);

          setEditUUID("");

          await getphysicalLevels();
          setLevelFormData({
            physicalLevelName: "",
          });
          setSelectedFile(null);
          setIsThemeEdit(false);
        } else {
          SimpleAlert("error", "Error", `Failed to Update ${title}`);
        }
      } catch (error) {
        // Handle errors from the API call

        SimpleAlert("error", "Error", "An unexpected error occurred.");
      }
    } else if (title === "Useful Information") {
      usefulinfoformData.country =
        (selectedusefulinfoCountry && selectedusefulinfoCountry.label) || "";
      usefulinfoformData.city = iscityChanged
        ? (selectedusefulinfoCity && selectedusefulinfoCity.label) || ""
        : cityedit;

      const isSuccessfull = checkRequired(usefulinfoformData, "usefulinfo");
      if (isSuccessfull) {
        try {
          // Make an API call to update the staff's active status

          const response = await putDATA(
            endpoint,
            edituuid,
            usefulinfoformData
          );

          // Check the response and handle it accordingly
          if (response.data.statusCode === 200) {
            SuccessApiToast(`${title} Updated Successfully`);
            setiscityChanged(false);
            setEditUUID("");
            setselectedUsefulinfoCity(null);
            setselectedusefulinfoCountry(null);
            setUsefulInfoFormData({
              country: "",
              city: "",
              url: "",
              subject: "",
              usefulInformation: "",
            });
            await getUsefulInfo();
            setCityEdit("");

            setIsThemeEdit(false);
          } else {
            SimpleAlert("error", "Error", `Failed to Update ${title}`);
          }
        } catch (error) {
          // Handle errors from the API call

          SimpleAlert("error", "Error", "An unexpected error occurred.");
        }
      }
    } else if (title === "Gallery Image") {
      galleryformData.country =
        (selectedgalleryCountry && selectedgalleryCountry.label) || "";
      galleryformData.city = iscitygalleryChanged
        ? (selectedgalleryCity && selectedgalleryCity.label) || ""
        : citygalleryedit;

      const resp = await uploadFile(selectedFile);
      let img = "";
      if (resp.success === true) {
        img = resp.imagelink;
      } else {
      }
      galleryformData.image = img === "" ? galleryformData.image : img;

      const isSuccessfull = checkRequired(galleryformData, "galleryimage");
      if (isSuccessfull) {
        try {
          // Make an API call to update the staff's active status

          const response = await putDATA(endpoint, edituuid, galleryformData);

          // Check the response and handle it accordingly
          if (response.data.statusCode === 200) {
            SuccessApiToast(`${title} Updated Successfully`);
            setiscitygalleryChanged(false);
            setEditUUID("");
            setselectedGalleryCity(null);
            setselectedGalleryCountry(null);
            setGalleryFormData({
              country: "",
              city: "",
              labelForImage: "",
              image: "",
              shortDescription: "",
              description: "",
            });
            await getGallery();
            setCityGalleryEdit("");

            setIsThemeEdit(false);
          } else {
            SimpleAlert("error", "Error", `Failed to Update ${title}`);
          }
        } catch (error) {
          // Handle errors from the API call

          SimpleAlert("error", "Error", "An unexpected error occurred.");
        }
      }
    } else if (title === "Preset Inclusion") {
      if (
        presetinclusionformData.inclusionName === "" ||
        presetinclusionformData.inclusionName === undefined
      ) {
        RequiredFieldAlert(
          "Inclusion Name  is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      }
      try {
        // Make an API call to update the staff's active status

        const response = await putDATA(
          endpoint,
          edituuid,
          presetinclusionformData
        );

        // Check the response and handle it accordingly
        if (response.data.statusCode === 200) {
          SuccessApiToast(`${title} Updated Successfully`);

          setEditUUID("");
          await getPresetInclusion();
          setPresetInclusionFormData({
            inclusionName: "",
            description: "",
          });

          setIsThemeEdit(false);
        } else {
          SimpleAlert("error", "Error", `Failed to Update ${title}`);
        }
      } catch (error) {
        // Handle errors from the API call

        SimpleAlert("error", "Error", "An unexpected error occurred.");
      }
    } else if (title === "Preset exclusion") {
      if (
        presetexclusionformData.exclusionName === "" ||
        presetexclusionformData.exclusionName === undefined
      ) {
        RequiredFieldAlert(
          "Exclusion Name  is required",
          "Please fill in the required fields",
          "error"
        );
        return;
      }
      try {
        // Make an API call to update the staff's active status

        const response = await putDATA(
          endpoint,
          edituuid,
          presetexclusionformData
        );

        // Check the response and handle it accordingly
        if (response.data.statusCode === 200) {
          SuccessApiToast(`${title} Updated Successfully`);

          setEditUUID("");
          await getPresetExclusion();
          setPresetExclusionFormData({
            exclusionName: "",
            description: "",
          });

          setIsThemeEdit(false);
        } else {
          SimpleAlert("error", "Error", `Failed to Update ${title}`);
        }
      } catch (error) {
        // Handle errors from the API call

        SimpleAlert("error", "Error", "An unexpected error occurred.");
      }
    }
  };
  function getNumberOfDays() {
    const days = localStorage.getItem("days");

    return parseInt(days, 10); // Convert to integer
  }
  return (
    <>
      <Header2
        title="ADD A NEW PACKAGE"
        linkText1="Search Packages"
        link1={Constants.URLConstants.MASTERSPACKAGESSEARCH}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: "\n.nav-item{\n    cursor: pointer !important;\n}\n",
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        h4 {\n            font-size: 13px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n\n        h4 {\n\n            font-weight: 700;\n            text-transform: capitalize;\n        }\n\n        h4,\n        .h4,\n        h5,\n        .h5,\n        h6,\n        .h6 {\n            margin-top: 10px;\n            margin-bottom: 10px;\n        }\n        .panel-group .panel-heading {\n    padding: 13px 15px;\n    background: #edf0f5;\n}\n.panel-default {\n    border-color: #ddd;\n}\n.panel-group .panel {\n    margin-bottom: 0;\n    border-radius: 4px;\n}\n\n.form-control, .form-control:focus, .has-error .form-control:focus, .has-success .form-control:focus, .has-warning .form-control:focus, .navbar-collapse, .navbar-form, .navbar-form-custom .form-control:focus, .navbar-form-custom .form-control:hover, .open .btn.dropdown-toggle, .panel, .popover, .progress, .progress-bar {\n    box-shadow: none;\n}\n.panel {\n\n    background-color: #fff;\n    border: 1px solid grey;\n}\n.navlink{\ncursor:pointer;\n}\n    ",
        }}
      />

      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div
          className="tab-pane fade show active"
          id="products"
          role="tabpanel"
          aria-labelledby="products-tab"
        >
          <ul className="nav nav-tabs" id="productsSubTabs" role="tablist">
            {tabData.map((tab) => (
              <li className="nav-item" key={tab.id}>
                <Link
                  className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => handleTabClick(tab.id)}
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
          <form
            style={{ borderTop: "2px solid #FF5015!important", padding: "0px" }}
          >
            <div
              className="tab-content"
              id="productsSubTabContent"
              style={{
                paddingLeft: "11px",
                paddingRight: "0px",
                paddingTop: "5px",
                paddingBottom: "6px",
              }}
            >
              {tabData.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab-pane fade show ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  id={tab.id}
                  role="tabpanel"
                  aria-labelledby={`${tab.id}-tab`}
                >
                  {/* Essential Information */}

                  {tab.id === "subtab1" && (
                    <div>
                      <div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>Essential Information</h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-3 pack_code">
                              <label>Package Code</label>
                              <input
                                type="text"
                                name="code"
                                size={15}
                                maxLength={100}
                                placeholder="Package code"
                                className="form-control form-control-sm required test123"
                                id="package_code"
                                value={packageCode}
                                onChange={(e) => setPackageCode(e.target.value)}
                                disabled={isAutogenerate}
                              />
                            </div>
                            <div className="form-group col-md-3 mt-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="autogenerate"
                                  type="checkbox"
                                  name="autogenerate"
                                  checked={isAutogenerate}
                                  onChange={handleCheckboxChange}
                                />
                                <label htmlFor="autogenerate">
                                  Autogenerate
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>
                                Type<sup>*</sup>
                              </h5>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="form-group col-md-2 static">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="static"
                                  type="radio"
                                  className="essential_required"
                                  name="type"
                                  defaultValue="static"
                                />
                                <label htmlFor="static">Static</label>
                              </div>
                            </div>

                            <div class="form-group col-md-2 semi-dynamic">
                              <div class="radio radio-success radio-inline">
                                <input
                                  id="semi_dynamic"
                                  class="essential_required"
                                  type="radio"
                                  name="type"
                                  value="Semi Dynamic"
                                />
                                <label for="semi_dynamic">Semi Dynamic</label>
                              </div>
                            </div>
                            {/* <div class="form-group col-md-2">
                                                  <div class="radio radio-success radio-inline">
                                                      <input id="fixed_series_departure" class="essential_required" type='radio' name='type' value='fixed'>
                                                      <label for="fixed_series_departure">Fixed/Series Departure</label>
                                                  </div>
                                              </div> */}
                            {/* 
                                              </div> */}
                            {/* <div class="form-group col-md-2">
                                                  <div class="radio radio-success radio-inline">
                                                      <input id="dynamic" class="essential_required" type='radio' name='type' value='dynamic'>
                                                      <label for="dynamic">Dynamic</label>
                                                  </div>
                                              </div> */}
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>
                                Sub Type<sup>*</sup>
                              </h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="inbound"
                                  className="essential_required"
                                  type="checkbox"
                                  name="sub_type[]"
                                  defaultValue="Inbound"
                                />
                                <label htmlFor="inbound">Inbound</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="outbound"
                                  className="essential_required"
                                  type="checkbox"
                                  name="sub_type[]"
                                  defaultValue="Outbound"
                                />
                                <label htmlFor="outbound">Outbound</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="domestic"
                                  className="essential_required"
                                  type="checkbox"
                                  name="sub_type[]"
                                  defaultValue="Domestic"
                                />
                                <label htmlFor="domestic">Domestic</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>
                                Services Included<sup>*</sup>
                              </h5>
                            </div>
                          </div>
                          <div className="row" id="services_div">
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="services_1"
                                  type="checkbox"
                                  className="essential_required"
                                  name="services[]"
                                  defaultValue="Hotel"
                                />
                                <label htmlFor="services_1">&nbsp;Hotel</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="services_2"
                                  type="checkbox"
                                  className="essential_required"
                                  name="services[]"
                                  defaultValue="Activity"
                                  onChange={handleActivityCheckboxChange}
                                />
                                <label htmlFor="services_2">
                                  &nbsp;Activity
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="services_3"
                                  type="checkbox"
                                  className="essential_required"
                                  name="services[]"
                                  defaultValue="Transfer"
                                  onChange={handleTransferCheckboxChange}
                                />
                                <label htmlFor="services_3">
                                  &nbsp;Transfer
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row" id="lang_div"></div>
                        </div>
                        {showActivityPanel && (
                          <div className="panel-body-essen">
                            <div className="row mt-4 form-group">
                              <div className="col-md-12">
                                <h5>Activity Type</h5>
                              </div>
                            </div>

                            <div className="row" id="transfer_type">
                              <div className="form-group col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <br />
                                  <input
                                    id="activity_sic"
                                    type="radio"
                                    className
                                    name="activity_package_type"
                                    defaultValue="SIC"
                                  />
                                  <label htmlFor="activity_sic">SIC</label>
                                </div>
                              </div>
                              <div className="form-group col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <br />
                                  <input
                                    id="activity_private"
                                    type="radio"
                                    className
                                    name="activity_package_type"
                                    defaultValue="Private"
                                  />
                                  <label htmlFor="activity_private">
                                    Private
                                  </label>
                                </div>
                              </div>
                              {/* <div className="form-group col-md-2">
        <div className="radio radio-success radio-inline">
          <br />
          <input id="activity_private_per_pax" type="radio" className name="activity_package_type" defaultValue="private_per_pax" />
          <label htmlFor="activity_private_per_pax">Private per pax</label>
        </div>
      </div> */}
                            </div>
                          </div>
                        )}
                        {showTransferPanel && (
                          <div className="panel-body-essen">
                            <div className="row mt-4 form-group">
                              <div className="col-md-12">
                                <h5>Transfer Type</h5>
                              </div>
                            </div>
                            <div className="row" id="transfer_type">
                              <div className="form-group col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <br />
                                  <input
                                    id="transfer_sic"
                                    type="radio"
                                    className
                                    name="transfer_package_type"
                                    defaultValue="SIC"
                                  />
                                  <label htmlFor="transfer_sic">SIC</label>
                                </div>
                              </div>
                              <div className="form-group col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <br />
                                  <input
                                    id="transfer_private"
                                    type="radio"
                                    className
                                    name="transfer_package_type"
                                    defaultValue="Private"
                                  />
                                  <label htmlFor="transfer_private">
                                    Private
                                  </label>
                                </div>
                              </div>
                              {/* <div className="form-group col-md-2">
        <div className="radio radio-success radio-inline">
          <br />
          <input id="transfer_private_per_pax" type="radio" className name="transfer_package_type" defaultValue="private_per_pax" />
          <label htmlFor="transfer_private_per_pax">Private per pax</label>
        </div>
      </div> */}
                            </div>
                          </div>
                        )}
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>
                                Category Theme<sup>*</sup>
                              </h5>
                            </div>
                          </div>
                          <div className="row" id="theme_div">
                            {originalthemeData.map((theme) => (
                              <div
                                key={theme.uuid}
                                className="form-group col-md-4"
                              >
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <br />
                                  <input
                                    id={`theme_${theme.uuid}`}
                                    type="checkbox"
                                    className="essential_required"
                                    name="theme[]"
                                    value={theme.uuid}
                                    onChange={handleThemeCheckboxChange}
                                  />
                                  <label htmlFor={`theme_${theme.uuid}`}>
                                    &nbsp;{theme.themeName}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <button
                                type="button"
                                name="add"
                                id="button"
                                value="Add"
                                className="btn btn-dark btn-sm form-group"
                                onClick={handleButtonClick}
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Add New Themes
                              </button>
                            </div>
                          </div>
                          {showModal && (
                            <div className="modal-wrapper-theme">
                              <div className="modal-theme">
                                <div className="modal-header-theme">
                                  <h5 className="modal-title-theme">
                                    THEME/CATEGORY
                                  </h5>
                                  <button
                                    type="button"
                                    className="close-theme"
                                    aria-label="Close"
                                    onClick={handleCloseModal}
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body-theme">
                                  {/* Form with text fields, textarea, checkbox, and add button */}
                                  <form id="addnewthemeform">
                                    {/* <input type="hidden" name="action" defaultValue="insert" /> */}
                                    <div className="panel-body">
                                      {/* <div className="message" style={{ display: 'none' }}></div> */}
                                      <div className="form-group col-md-12">
                                        <label>Theme Name</label>
                                        <input
                                          className="required form-control form-control-sm"
                                          type="text"
                                          name="themename"
                                          id="themename"
                                          ref={inputthemRef}
                                          value={formData.themename}
                                          onChange={(event) =>
                                            handleInputChange(
                                              event,
                                              "themeform"
                                            )
                                          }
                                          required
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>Label For Image</label>
                                        <input
                                          className="form-control form-control-sm"
                                          type="text"
                                          name="labelforimage"
                                          id="labelforimage"
                                          value={formData.labelforimage}
                                          onChange={(event) =>
                                            handleInputChange(
                                              event,
                                              "themeform"
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>Image</label>
                                        <span className="uniqFile input-group">
                                          <span className="input-group-addon fa fa-upload myInputFile">
                                            <input
                                              type="file"
                                              name="themeimage"
                                              size={39}
                                              className="file_font"
                                              accept="image/*"
                                              onChange={handleFileInput}
                                            />
                                          </span>
                                        </span>
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>Description</label>
                                        <textarea
                                          className="form-control form-control-sm"
                                          rows={4}
                                          cols={50}
                                          name="Description"
                                          id="Description"
                                          value={formData.Description}
                                          onChange={(event) =>
                                            handleInputChange(
                                              event,
                                              "themeform"
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-md-12 form-group mt-3">
                                        <div className="checkbox checkbox-success">
                                          <input
                                            id="checkbox1"
                                            type="checkbox"
                                            name="display_in_search"
                                            className="test123"
                                            checked={formData.display_in_search}
                                            onChange={(event) =>
                                              handleInputChange(
                                                event,
                                                "themeform"
                                              )
                                            }
                                          />
                                          <label htmlFor="checkbox1">
                                            {" "}
                                            Add for Slider
                                          </label>
                                        </div>
                                      </div>
                                      <button
                                        className="btn btn-dark btn-sm form-group mt-3"
                                        type="button"
                                        onClick={(event) =>
                                          isthemeedit === false
                                            ? handleSubmit(event, "themeform")
                                            : Edit(
                                                event,
                                                ApiRoutes.PACKAGES.THEME,
                                                "Theme"
                                              )
                                        }
                                      >
                                        <i
                                          className={
                                            isthemeedit === false
                                              ? "fa fa-plus"
                                              : "fa fa-floppy-o"
                                          }
                                        />
                                        &nbsp;
                                        {isthemeedit === false ? "Add" : "Save"}
                                      </button>
                                    </div>
                                  </form>
                                  <div className="container-fluid">
                                    {loading && (
                                      <div className="text-center">
                                        <img
                                          src={loadingGif}
                                          alt="Loading..."
                                          height={250}
                                        />
                                      </div>
                                    )}
                                    {!loading && (
                                      <>
                                        <form name="search_area_from">
                                          <div className="panel-body removeMargins">
                                            <div className="dataTables_scroll">
                                              <div
                                                className="row pd_tp"
                                                style={{
                                                  paddingLeft: "25px",
                                                  paddingBottom: "10px",
                                                }}
                                              >
                                                <div className="col-md-12">
                                                  <style
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                                                    }}
                                                  />
                                                  <div className="row pr-5">
                                                    <div
                                                      className="form-group col-md-2 new_search_icon"
                                                      style={{
                                                        textAlign: "right",
                                                        paddingRight: "0px",
                                                      }}
                                                    >
                                                      <h5
                                                        style={{
                                                          display: "inline",
                                                        }}
                                                      >
                                                        <i
                                                          className="fa fa-search srchWithinPg"
                                                          id="magnifiers"
                                                          data-toggle="tooltip"
                                                          data-placement="top"
                                                          data-original-title="Search within this table"
                                                        />
                                                      </h5>
                                                    </div>
                                                    <div className="form-group col-md-4 bookingsrc mt-3">
                                                      <input
                                                        type="text"
                                                        className="tablesearch form-control form-control-sm search_new"
                                                        placeholder="Theme"
                                                        value={searchInput}
                                                        onChange={(event) =>
                                                          handleInputSearchChange(
                                                            event,
                                                            "Theme"
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                id="search_transfer_wrapper"
                                                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                                              >
                                                <div className="row">
                                                  <div className="col-sm-6" />
                                                  <div className="col-sm-6" />
                                                </div>
                                                <div className="row">
                                                  <div className="col-sm-12">
                                                    <div
                                                      className="doubleScroll-scroll-wrapper"
                                                      id="wrapper1"
                                                      style={{
                                                        height: "20px",
                                                        overflow:
                                                          "scroll hidden",
                                                        width: "1320px",
                                                      }}
                                                    ></div>
                                                    <div
                                                      id="wrapper2"
                                                      style={{
                                                        overflow: "auto",
                                                      }}
                                                    >
                                                      <table
                                                        id="search_transfer"
                                                        className="table table-bordered   table-responsive dataTable no-footer"
                                                        role="grid"
                                                        aria-describedby="search_transfer_info"
                                                      >
                                                        <thead>
                                                          <tr role="row">
                                                            <th
                                                              className="sorting_asc"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-sort="ascending"
                                                              aria-label="Currency Name: activate to sort column descending"
                                                              style={{
                                                                width:
                                                                  "222.2px",
                                                              }}
                                                            >
                                                              THEME
                                                            </th>
                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Currency Code: activate to sort column ascending"
                                                              style={{
                                                                width:
                                                                  "885.2px",
                                                              }}
                                                            >
                                                              DESCERIPTION
                                                            </th>
                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Action: activate to sort column ascending"
                                                              style={{
                                                                width: "123px",
                                                              }}
                                                            >
                                                              Actions
                                                            </th>
                                                          </tr>
                                                        </thead>
                                                        <tbody className="bg-white">
                                                          {themeData.map(
                                                            (thm, index) => (
                                                              <React.Fragment
                                                                key={index}
                                                              >
                                                                <tr
                                                                  className={
                                                                    "phps_row_" +
                                                                    (index %
                                                                      2 ===
                                                                    0
                                                                      ? "0 even"
                                                                      : "1 odd")
                                                                  }
                                                                  role="row"
                                                                >
                                                                  <td className="sorting_1">
                                                                    {
                                                                      thm.themeName
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      thm.description
                                                                    }
                                                                  </td>
                                                                  <td className="actionlink">
                                                                    <div
                                                                      className="actionCont"
                                                                      style={{
                                                                        width:
                                                                          "58px",
                                                                      }}
                                                                    >
                                                                      <div className="input-group-addon">
                                                                        <Link
                                                                          data-toggle="tooltip"
                                                                          data-placement="top"
                                                                          title
                                                                          data-original-title="Edit"
                                                                          onClick={() =>
                                                                            handleEdditClick(
                                                                              thm,
                                                                              "Theme"
                                                                            )
                                                                          }
                                                                        >
                                                                          <i className="fa fa-pencil-square-o" />
                                                                        </Link>
                                                                      </div>
                                                                      <div className="input-group-addon">
                                                                        <Link
                                                                          data-toggle="tooltip"
                                                                          data-placement="top"
                                                                          title
                                                                          data-original-title="Delete"
                                                                          onClick={() =>
                                                                            handleDeleteClick(
                                                                              thm.uuid,
                                                                              ApiRoutes
                                                                                .PACKAGES
                                                                                .THEME,
                                                                              "Theme"
                                                                            )
                                                                          }
                                                                        >
                                                                          <i className="fa fa-trash" />
                                                                        </Link>
                                                                      </div>
                                                                    </div>
                                                                  </td>
                                                                </tr>
                                                              </React.Fragment>
                                                            )
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-sm-6">
                                                    <div
                                                      className="dataTables_info"
                                                      id="search_transfer_info"
                                                      role="status"
                                                      aria-live="polite"
                                                    ></div>
                                                  </div>
                                                  <div className="col-sm-6" />
                                                </div>
                                              </div>
                                              <div className="form-group no-result">
                                                <h5 className="text-center">
                                                  Use Search Criteria to Match
                                                  Your Requirement.
                                                </h5>
                                              </div>
                                              <div className="row pd_tp">
                                                <div className="row">
                                                  <div className="col-md-4 col_hide">
                                                    <div className="form-group col-md-6">
                                                      &nbsp;
                                                    </div>
                                                  </div>
                                                  <div className="col-md-5"></div>
                                                  <div className="col-md-3 col_hide">
                                                    &nbsp;
                                                  </div>
                                                </div>
                                              </div>
                                              <br />
                                              <br />
                                            </div>
                                          </div>
                                        </form>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="container"></div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>
                                Physical Level<sup>*</sup>
                              </h5>
                            </div>
                          </div>
                          <div className="row" id="physical_level_div">
                            {originallevelData.map((level) => (
                              <div
                                className="form-group col-md-3"
                                key={level.uuid}
                              >
                                <div className="radio radio-success radio-inline">
                                  <input
                                    id={`pl_${level.uuid}`}
                                    type="radio"
                                    name="physical_level"
                                    className="essential_required"
                                    value={level.uuid}
                                    onChange={handlePhysicalLevelRadioChange}
                                  />
                                  <label htmlFor={`pl_${level.uuid}`}>
                                    &nbsp;{level.physicalLevelName}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-12">
                              <button
                                type="button"
                                name="add"
                                id="edit_level"
                                data-target="#phy_modal"
                                data-toggle="modal"
                                value="Add"
                                className="btn btn-dark btn-sm form-group"
                                onClick={handlePhysicalButtonClick}
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Add New Levels
                              </button>
                              <div className="container"></div>
                            </div>
                          </div>
                          {showphysicalModal && (
                            <div className="modal-wrapper-theme">
                              <div className="modal-theme">
                                <div className="modal-header-theme">
                                  <h5 className="modal-title-theme">
                                    PHYSICAL LEVELS
                                  </h5>
                                  <button
                                    type="button"
                                    className="close-theme"
                                    aria-label="Close"
                                    onClick={handlePhysicalCloseModal}
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body-theme">
                                  {/* Form with text fields, textarea, checkbox, and add button */}
                                  <form id="addnewthemeform">
                                    <input
                                      type="hidden"
                                      name="action"
                                      defaultValue="insert"
                                    />
                                    <div className="panel-body">
                                      <div
                                        className="message"
                                        style={{ display: "none" }}
                                      ></div>
                                      <div className="form-group col-md-12">
                                        <label>Physical Level Name</label>
                                        <input
                                          className="required form-control form-control-sm"
                                          type="text"
                                          name="physicalLevelName"
                                          id="physicalLevelName"
                                          ref={inputphyRef}
                                          value={
                                            levelformData.physicalLevelName
                                          }
                                          onChange={(event) =>
                                            handleInputChange(event, "Level")
                                          }
                                          required
                                        />
                                      </div>

                                      <button
                                        className="btn btn-dark btn-sm form-group mt-3"
                                        type="button"
                                        onClick={(event) =>
                                          isthemeedit === false
                                            ? handleSubmit(
                                                event,
                                                "Physical Level"
                                              )
                                            : Edit(
                                                event,
                                                ApiRoutes.PACKAGES.NEW_LEVELS,
                                                "Physical Level"
                                              )
                                        }
                                      >
                                        <i
                                          className={
                                            isthemeedit === false
                                              ? "fa fa-plus"
                                              : "fa fa-floppy-o"
                                          }
                                        />
                                        &nbsp;
                                        {isthemeedit === false ? "Add" : "Save"}
                                      </button>
                                    </div>
                                  </form>
                                  <div className="container-fluid">
                                    {loading && (
                                      <div className="text-center">
                                        <img
                                          src={loadingGif}
                                          alt="Loading..."
                                          height={250}
                                        />
                                      </div>
                                    )}
                                    {!loading && (
                                      <>
                                        <form name="search_area_from">
                                          <div className="panel-body removeMargins">
                                            <div className="dataTables_scroll">
                                              <div
                                                className="row pd_tp"
                                                style={{
                                                  paddingLeft: "25px",
                                                  paddingBottom: "10px",
                                                }}
                                              >
                                                <div className="col-md-12">
                                                  <style
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                                                    }}
                                                  />
                                                  <div className="row pr-5">
                                                    <div
                                                      className="form-group col-md-2 new_search_icon"
                                                      style={{
                                                        textAlign: "right",
                                                        paddingRight: "0px",
                                                      }}
                                                    >
                                                      <h5
                                                        style={{
                                                          display: "inline",
                                                        }}
                                                      >
                                                        <i
                                                          className="fa fa-search srchWithinPg"
                                                          id="magnifiers"
                                                          data-toggle="tooltip"
                                                          data-placement="top"
                                                          data-original-title="Search within this table"
                                                        />
                                                      </h5>
                                                    </div>
                                                    <div className="form-group col-md-4 bookingsrc mt-3">
                                                      <input
                                                        type="text"
                                                        className="tablesearch form-control form-control-sm search_new"
                                                        placeholder="Physical Level"
                                                        value={searchInput}
                                                        onChange={(event) =>
                                                          handleInputSearchChange(
                                                            event,
                                                            "Level"
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                id="search_transfer_wrapper"
                                                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                                              >
                                                <div className="row">
                                                  <div className="col-sm-6" />
                                                  <div className="col-sm-6" />
                                                </div>
                                                <div className="row">
                                                  <div className="col-sm-12">
                                                    <div
                                                      className="doubleScroll-scroll-wrapper"
                                                      id="wrapper1"
                                                      style={{
                                                        height: "20px",
                                                        overflow:
                                                          "scroll hidden",
                                                        width: "1320px",
                                                      }}
                                                    >
                                                      <div
                                                        className="suwala-doubleScroll-scroll"
                                                        style={{
                                                          height: "20px",
                                                          width: "1320px",
                                                        }}
                                                      />
                                                    </div>
                                                    <div
                                                      id="wrapper2"
                                                      style={{
                                                        overflow: "auto",
                                                      }}
                                                    >
                                                      <table
                                                        id="search_transfer"
                                                        className="table table-bordered   table-responsive dataTable no-footer"
                                                        role="grid"
                                                        aria-describedby="search_transfer_info"
                                                      >
                                                        <thead>
                                                          <tr role="row">
                                                            <th
                                                              className="sorting_asc"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-sort="ascending"
                                                              aria-label="Currency Name: activate to sort column descending"
                                                              style={{
                                                                width:
                                                                  "222.2px",
                                                              }}
                                                            >
                                                              PHYSICAL LEVEL
                                                            </th>

                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Action: activate to sort column ascending"
                                                              style={{
                                                                width: "123px",
                                                              }}
                                                            >
                                                              Actions
                                                            </th>
                                                          </tr>
                                                        </thead>
                                                        <tbody className="bg-white">
                                                          {levelData.map(
                                                            (phy, index) => (
                                                              <React.Fragment
                                                                key={index}
                                                              >
                                                                <tr
                                                                  className={
                                                                    "phps_row_" +
                                                                    (index %
                                                                      2 ===
                                                                    0
                                                                      ? "0 even"
                                                                      : "1 odd")
                                                                  }
                                                                  role="row"
                                                                >
                                                                  <td className="sorting_1">
                                                                    {
                                                                      phy.physicalLevelName
                                                                    }
                                                                  </td>

                                                                  <td className="actionlink">
                                                                    <div
                                                                      className="actionCont"
                                                                      style={{
                                                                        width:
                                                                          "58px",
                                                                      }}
                                                                    >
                                                                      <div className="input-group-addon">
                                                                        <Link
                                                                          // to={Constants.URLConstants.MASTERSCURRENCIESEDIT}
                                                                          data-toggle="tooltip"
                                                                          data-placement="top"
                                                                          title
                                                                          data-original-title="Edit"
                                                                          onClick={() =>
                                                                            handleEdditClick(
                                                                              phy,
                                                                              "PhysicalLevel"
                                                                            )
                                                                          }
                                                                        >
                                                                          <i className="fa fa-pencil-square-o" />
                                                                        </Link>
                                                                      </div>
                                                                      <div className="input-group-addon">
                                                                        <Link
                                                                          data-toggle="tooltip"
                                                                          data-placement="top"
                                                                          title
                                                                          data-original-title="Delete"
                                                                          onClick={() =>
                                                                            handleDeleteClick(
                                                                              phy.uuid,
                                                                              ApiRoutes
                                                                                .PACKAGES
                                                                                .NEW_LEVELS,
                                                                              "Physical Level"
                                                                            )
                                                                          }
                                                                        >
                                                                          <i className="fa fa-trash" />
                                                                        </Link>
                                                                      </div>
                                                                    </div>
                                                                  </td>
                                                                </tr>
                                                              </React.Fragment>
                                                            )
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-sm-6">
                                                    <div
                                                      className="dataTables_info"
                                                      id="search_transfer_info"
                                                      role="status"
                                                      aria-live="polite"
                                                    ></div>
                                                  </div>
                                                  <div className="col-sm-6" />
                                                </div>
                                              </div>
                                              <div className="form-group no-result">
                                                <h5 className="text-center">
                                                  Use Search Criteria to Match
                                                  Your Requirement.
                                                </h5>
                                              </div>
                                              <div className="row pd_tp">
                                                <div className="row">
                                                  <div className="col-md-4 col_hide">
                                                    <div className="form-group col-md-6">
                                                      &nbsp;
                                                    </div>
                                                  </div>
                                                  <div className="col-md-5"></div>
                                                  <div className="col-md-3 col_hide">
                                                    &nbsp;
                                                  </div>
                                                </div>
                                              </div>
                                              <br />
                                              <br />
                                            </div>
                                          </div>
                                        </form>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4">
                            <div className="form-group col-md-5">
                              <h4>Tags</h4>
                              <input
                                type="text"
                                size={40}
                                maxLength={100}
                                placeholder
                                id="package_code"
                                name="tag"
                                onChange={(event) =>
                                  handleInputChange(event, "essential")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>Age Group</h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-2">
                              <br />
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="all_ages"
                                  type="radio"
                                  className="essential_required"
                                  name="age"
                                  value="all"
                                  defaultChecked="checked"
                                  onChange={handleRadioChange}
                                />
                                <label htmlFor="all_ages">All Ages</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <br />
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="select_age"
                                  type="radio"
                                  className="essential_required"
                                  name="age"
                                  value="group"
                                  onChange={handleRadioChange}
                                />
                                <label htmlFor="select_age">Select Age</label>
                              </div>
                            </div>
                            <div
                              className="form-group col-md-3 select_age_div2"
                              id="select_age_div"
                              style={{
                                display: showAgeSelector ? "block" : "none",
                              }}
                            >
                              <label>From (age) </label>{" "}
                              <span id="age_from"> {fromAge}</span>-
                              <span id="age_to">{toAge}</span>
                              <br />
                              <input
                                type="range"
                                name="from_age"
                                id="from_age"
                                defaultValue={fromAge}
                                min="1"
                                max="100"
                                onChange={handleRangeChange}
                              />
                              <div
                                id="ageslider"
                                className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                              >
                                <div
                                  className="ui-slider-range ui-widget-header ui-corner-all"
                                  style={{ left: "0%", width: "100%" }}
                                />
                                <span
                                  className="ui-slider-handle ui-state-default ui-corner-all"
                                  tabIndex={0}
                                  style={{ left: "0%" }}
                                />
                                <span
                                  className="ui-slider-handle ui-state-default ui-corner-all"
                                  tabIndex={0}
                                  style={{ left: "100%" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="form-group">
                            <div className="row mt-4 form-group">
                              <div className="col-md-2">
                                <h5>No. of Days : </h5>
                              </div>
                              <div className="col-md-2">
                                <h5>Min No. of Adult : </h5>
                              </div>
                              <div className="col-md-2">
                                <h5>Max No. of Adult : </h5>
                              </div>
                              <div className="col-md-2">
                                <h5>Min No. of Child : </h5>
                              </div>
                              <div className="col-md-2">
                                <h5>Max No. of Child : </h5>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-2">
                                <input
                                  type="text"
                                  name="days"
                                  id="days"
                                  className="form-control essential_required required"
                                  value={daysadultchildData.days}
                                  onChange={(event) =>
                                    handleInputChange(
                                      event,
                                      "daysadultchildData"
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group col-md-2">
                                <input
                                  type="text"
                                  name="minAdult"
                                  id="min_adult"
                                  className="form-control essential_required required"
                                  value={daysadultchildData.minAdult}
                                  onChange={(event) =>
                                    handleInputChange(
                                      event,
                                      "daysadultchildData"
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group col-md-2">
                                <input
                                  type="text"
                                  name="maxAdult"
                                  id="max_adult"
                                  className="form-control essential_required required"
                                  value={daysadultchildData.maxAdult}
                                  onChange={(event) =>
                                    handleInputChange(
                                      event,
                                      "daysadultchildData"
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group col-md-2">
                                <input
                                  type="text"
                                  name="minChild"
                                  id="min_child"
                                  className="form-control essential_required required"
                                  value={daysadultchildData.minChild}
                                  onChange={(event) =>
                                    handleInputChange(
                                      event,
                                      "daysadultchildData"
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group col-md-2">
                                <input
                                  type="text"
                                  name="maxChild"
                                  id="max_child"
                                  className="form-control essential_required required"
                                  value={daysadultchildData.maxChild}
                                  onChange={(event) =>
                                    handleInputChange(
                                      event,
                                      "daysadultchildData"
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>Destinations</h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-3">
                              <label>Countries</label>
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
                              className="form-group col-md-3"
                              onClick={handleCitySelection}
                            >
                              <label>Cities</label>

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
                              className="form-group col-md-2 "
                              style={
                                selectedCity == null
                                  ? { display: "none" }
                                  : { display: "" }
                              }
                            >
                              <button
                                className="btn"
                                onClick={(event) =>
                                  handleSubmit(event, "CountryCity")
                                }
                                style={{
                                  backgroundColor: "#FF5015",
                                  color: "#fff",
                                  marginLeft: "10px",
                                  marginTop: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-md-12">
                              {cities.length > 0 && (
                                <div className="dataTables_scroll">
                                  <table
                                    id="visa_requirements_table"
                                    className="table   table-responsive"
                                  >
                                    <thead>
                                      <tr className="bg-primary">
                                        <th>Country</th>
                                        <th>City</th>
                                        <th>Visa Included</th>
                                        <th>Show Visa Requirements</th>
                                        <th>Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody id="visa_requirements_tr">
                                      {cities.map((cityInfo, index) => (
                                        <tr key={index}>
                                          <td>{cityInfo.country}</td>
                                          <td>{cityInfo.city}</td>
                                          <td>
                                            <div className="radio radio-success radio-inline">
                                              <input
                                                type="radio"
                                                name={`visaIncluded${index}`}
                                                id={`visaIncludedYes${index}`}
                                                value="yes"
                                                checked={cityInfo.visaIncluded}
                                                onChange={() =>
                                                  handleCountryCityRadioChange(
                                                    cityInfo.uuid,
                                                    "visaIncluded",
                                                    true
                                                  )
                                                }
                                              />
                                              <label
                                                className="form-check-label ml-1"
                                                htmlFor={`visaIncludedYes${index}`}
                                              >
                                                Yes
                                              </label>
                                            </div>
                                            <div className="radio radio-success radio-inline">
                                              <input
                                                type="radio"
                                                name={`visaIncluded${index}`}
                                                id={`visaIncludedNo${index}`}
                                                value="no"
                                                checked={!cityInfo.visaIncluded}
                                                onChange={() =>
                                                  handleCountryCityRadioChange(
                                                    cityInfo.uuid,
                                                    "visaIncluded",
                                                    false
                                                  )
                                                }
                                              />
                                              <label
                                                className="form-check-label ml-1"
                                                htmlFor={`visaIncludedNo${index}`}
                                              >
                                                No
                                              </label>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="radio radio-success radio-inline">
                                              <input
                                                type="radio"
                                                name={`showVisaRequirements${index}`}
                                                id={`showVisaRequirementsYes${index}`}
                                                value="yes"
                                                checked={
                                                  cityInfo.showVisaRequirements
                                                }
                                                onChange={() =>
                                                  handleCountryCityRadioChange(
                                                    cityInfo.uuid,
                                                    "showVisaRequirements",
                                                    true
                                                  )
                                                }
                                              />
                                              <label
                                                className="form-check-label ml-1"
                                                htmlFor={`showVisaRequirementsYes${index}`}
                                              >
                                                Yes
                                              </label>
                                            </div>
                                            <div className="radio radio-success radio-inline">
                                              <input
                                                type="radio"
                                                name={`showVisaRequirements${index}`}
                                                id={`showVisaRequirementsNo${index}`}
                                                value="no"
                                                checked={
                                                  !cityInfo.showVisaRequirements
                                                }
                                                onChange={() =>
                                                  handleCountryCityRadioChange(
                                                    cityInfo.uuid,
                                                    "showVisaRequirements",
                                                    false
                                                  )
                                                }
                                              />
                                              <label
                                                className="form-check-label ml-1"
                                                htmlFor={`showVisaRequirementsNo${index}`}
                                              >
                                                No
                                              </label>
                                            </div>
                                          </td>
                                          <td className="actionlink">
                                            <div className="d-flex justify-content-center align-items-center">
                                              <div className="input-group-addon">
                                                <Link
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title="Update"
                                                  to="#"
                                                  onClick={(event) =>
                                                    Edit(
                                                      event,
                                                      ApiRoutes.PACKAGES
                                                        .COUNTRY_CITY_INFO,
                                                      "Country City",
                                                      cityInfo
                                                    )
                                                  }
                                                >
                                                  <i className="fa fa-upload" />
                                                </Link>{" "}
                                              </div>
                                              <div className="input-group-addon">
                                                <Link
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title="Delete"
                                                  to="#"
                                                  // Assuming you have a link destination or use an onClick handler for deletion
                                                  onClick={() =>
                                                    handleDeleteClick(
                                                      cityInfo.uuid,
                                                      ApiRoutes.PACKAGES
                                                        .COUNTRY_CITY_INFO,
                                                      "Country City"
                                                    )
                                                  }
                                                >
                                                  <i className="fa fa-trash" />
                                                </Link>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                              <br />
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <button
                                    type="button"
                                    name="continue"
                                    id="button"
                                    value="continue"
                                    className="btn btn-dark btn-sm form-group"
                                    onClick={(event) =>
                                      handleSubmit(
                                        event,
                                        "EssentialInformation"
                                      )
                                    }
                                  >
                                    Continue&nbsp;
                                    <i className="fa fa-arrow-right" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Details */}

                  {tab.id === "subtab2" && (
                    <div className="hpanel">
                      <form
                        id="package_details_info"
                        name="package_details_info"
                        className="ng-pristine ng-valid"
                      >
                        <div className="form-group">
                          <h4>Package Details</h4>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label>Name</label>
                            <input
                              type="text"
                              placeholder="Package name"
                              name="name"
                              id="name"
                              value={detailsformData.name}
                              onChange={(event) =>
                                handleInputChange(event, "Details")
                              }
                              size={15}
                              maxLength={100}
                              className="form-control form-control-sm detail_required required"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label>Short Description</label>
                            <textarea
                              className="form-control form-control-sm"
                              rows={4}
                              cols={50}
                              name="shortDescription"
                              id="shortDescription"
                              value={detailsformData.shortDescription}
                              onChange={(event) =>
                                handleInputChange(event, "Details")
                              }
                            />
                          </div>
                          {/* <div className="col-md-6">
      <label className="editor-label">Short Description</label>
      <div className="editor-container">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-textarea"
        />
      </div>
    </div> */}

                          {/* <div className="col-md-6">
      <label className="editor-label">Long Description</label>
      <div className="editor-container">
        <Editor
          editorState={editorbState}
          onEditorStateChange={handleEditorbChange}
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-textarea"
        />
      </div>
    </div> */}
                          <div className="form-group col-md-6">
                            <label>Long Description</label>
                            <textarea
                              className="form-control form-control-sm"
                              rows={4}
                              cols={50}
                              name="longDescription"
                              id="longDescription"
                              value={detailsformData.longDescription}
                              onChange={(event) =>
                                handleInputChange(event, "Details")
                              }
                            />
                          </div>
                        </div>
                        <br />
                        <div className="panel-body-essen">
                          <div className="form-group">
                            <h4>Useful Information</h4>
                          </div>
                          <div className="row" id="useful_info">
                            {originalusefulinfoData.map((info) => (
                              <div
                                key={info.uuid}
                                className="form-group col-md-4"
                              >
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <br />
                                  <input
                                    id={`info${info.uuid}`}
                                    type="checkbox"
                                    className="useful_info"
                                    name="usefulinfo[]"
                                    value={info.uuid}
                                    checked={selectedCheckboxes.some(
                                      (item) => item.uuid === info.uuid
                                    )}
                                    onChange={handleCheckboxUsefulInfoChange}
                                  />
                                  <label htmlFor={`info${info.uuid}`}>
                                    &nbsp;{info.subject}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            name="add"
                            id="edit_info"
                            data-target="#use_modal"
                            data-toggle="modal"
                            value="Add"
                            className="btn btn-dark btn-sm form-group mt-2"
                            onClick={handleButtonNewInfoClick}
                          >
                            <i className="fa fa-plus" />
                            &nbsp;Add New Information
                          </button>
                          {showaddnewInfo && (
                            <div className="modal-wrapper-theme">
                              <div className="modal-theme">
                                <div className="modal-header-theme">
                                  <h5 className="modal-title-theme">
                                    USEFUL INFORMATION
                                  </h5>
                                  <button
                                    type="button"
                                    className="close-theme"
                                    aria-label="Close"
                                    onClick={handleCloseNewInfoModal}
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body-theme">
                                  {/* Form with text fields, textarea, checkbox, and add button */}
                                  <form id="addnewInformationform">
                                    <input
                                      type="hidden"
                                      name="action"
                                      defaultValue="insert"
                                    />
                                    <div className="panel-body">
                                      <div
                                        className="message"
                                        style={{ display: "none" }}
                                      ></div>
                                      <div className="form-group col-md-12">
                                        <label>Country</label>
                                        <MultiSelect
                                          options={countryOptions}
                                          isSearchable
                                          value={selectedusefulinfoCountry}
                                          placeholder="- Select Country -"
                                          className="custom-select required"
                                          onChange={
                                            handleCountryusefulinfoChange
                                          }
                                          noOptionsMessage={() =>
                                            "No Country Found"
                                          }
                                          required
                                        />
                                      </div>
                                      <div
                                        className="form-group col-md-12"
                                        onClick={handleCityusefulinfoSelection}
                                      >
                                        <label>Cities</label>
                                        <MultiSelect
                                          options={cityusefulinfoOptions}
                                          value={
                                            iscityChanged === false
                                              ? selectedusefulinfoCountry
                                                ? filterOptionsByLabel(
                                                    cityusefulinfoOptions,
                                                    cityedit
                                                  )
                                                : ""
                                              : selectedusefulinfoCountry
                                              ? filterOptionsByLabel(
                                                  cityusefulinfoOptions,
                                                  selectedusefulinfoCity
                                                )
                                              : ""
                                          }
                                          isSearchable
                                          placeholder="- Select City -"
                                          className="custom-select required"
                                          onChange={handleCityusefulinfoChange}
                                          isDisabled={
                                            !selectedusefulinfoCountry
                                          }
                                          noOptionsMessage={() =>
                                            "No City Found"
                                          }
                                          required
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>Url</label>
                                        <input
                                          className="form-control form-control-sm required"
                                          type="text"
                                          name="url"
                                          id="url"
                                          ref={inputusefulinfoRef}
                                          value={usefulinfoformData.url}
                                          onChange={(event) =>
                                            handleInputChange(
                                              event,
                                              "usefulinfo"
                                            )
                                          }
                                          required
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>Subjects</label>
                                        <input
                                          className="form-control form-control-sm required"
                                          type="text"
                                          name="subject"
                                          id="subject"
                                          value={usefulinfoformData.subject}
                                          onChange={(event) =>
                                            handleInputChange(
                                              event,
                                              "usefulinfo"
                                            )
                                          }
                                          required
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>Useful Information</label>
                                        <textarea
                                          className="form-control form-control-sm"
                                          rows={4}
                                          cols={50}
                                          name="usefulInformation"
                                          id="usefulInformation"
                                          value={
                                            usefulinfoformData.usefulInformation
                                          }
                                          onChange={(event) =>
                                            handleInputChange(
                                              event,
                                              "usefulinfo"
                                            )
                                          }
                                        />
                                      </div>

                                      <button
                                        className="btn btn-dark btn-sm form-group mt-3"
                                        type="button"
                                        onClick={(event) =>
                                          isthemeedit === false
                                            ? handleSubmit(event, "usefulinfo")
                                            : Edit(
                                                event,
                                                ApiRoutes.PACKAGES
                                                  .USEFUL_INFORMATION,
                                                "Useful Information"
                                              )
                                        }
                                      >
                                        <i
                                          className={
                                            isthemeedit === false
                                              ? "fa fa-plus"
                                              : "fa fa-floppy-o"
                                          }
                                        />
                                        &nbsp;
                                        {isthemeedit === false ? "Add" : "Save"}
                                      </button>
                                    </div>
                                  </form>

                                  <div className="container-fluid">
                                    {loading && (
                                      <div className="text-center">
                                        <img
                                          src={loadingGif}
                                          alt="Loading..."
                                          height={250}
                                        />
                                      </div>
                                    )}
                                    {!loading && (
                                      <>
                                        <form name="search_area_from">
                                          <div className="panel-body removeMargins">
                                            <div className="dataTables_scroll">
                                              <div
                                                className="row pd_tp"
                                                style={{
                                                  paddingLeft: "25px",
                                                  paddingBottom: "10px",
                                                }}
                                              >
                                                <div className="col-md-12">
                                                  <style
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                                                    }}
                                                  />
                                                  <div className="row pr-5">
                                                    <div
                                                      className="form-group col-md-2 new_search_icon"
                                                      style={{
                                                        textAlign: "right",
                                                        paddingRight: "0px",
                                                      }}
                                                    >
                                                      <h5
                                                        style={{
                                                          display: "inline",
                                                        }}
                                                      >
                                                        <i
                                                          className="fa fa-search srchWithinPg"
                                                          id="magnifiers"
                                                          data-toggle="tooltip"
                                                          data-placement="top"
                                                          data-original-title="Search within this table"
                                                        />
                                                      </h5>
                                                    </div>

                                                    <div className="form-group col-md-4 bookingsrc mt-3">
                                                      <input
                                                        type="text"
                                                        className="tablesearch form-control form-control-sm search_new"
                                                        placeholder="Subject"
                                                        value={searchInput}
                                                        onChange={(event) =>
                                                          handleInputSearchChange(
                                                            event,
                                                            "usefulinfo"
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                id="search_transfer_wrapper"
                                                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                                              >
                                                <div className="row">
                                                  <div className="col-sm-6" />
                                                  <div className="col-sm-6" />
                                                </div>
                                                <div className="row">
                                                  <div className="col-sm-12">
                                                    <div
                                                      className="doubleScroll-scroll-wrapper"
                                                      id="wrapper1"
                                                      style={{
                                                        height: "20px",
                                                        overflow:
                                                          "scroll hidden",
                                                        width: "1320px",
                                                      }}
                                                    ></div>
                                                    <div
                                                      id="wrapper2"
                                                      style={{
                                                        overflow: "auto",
                                                      }}
                                                    >
                                                      <table
                                                        id="search_transfer"
                                                        className="table table-bordered   table-responsive dataTable no-footer"
                                                        role="grid"
                                                        aria-describedby="search_transfer_info"
                                                      >
                                                        <thead>
                                                          <tr role="row">
                                                            <th
                                                              className="sorting_asc"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-sort="ascending"
                                                              aria-label="Currency Name: activate to sort column descending"
                                                              style={{
                                                                width:
                                                                  "222.2px",
                                                              }}
                                                            >
                                                              COUNTRY
                                                            </th>
                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Currency Code: activate to sort column ascending"
                                                              style={{
                                                                width:
                                                                  "222.2px",
                                                              }}
                                                            >
                                                              CITY
                                                            </th>
                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Action: activate to sort column ascending"
                                                              style={{
                                                                width:
                                                                  "885.2px",
                                                              }}
                                                            >
                                                              INFORMATION
                                                            </th>
                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Currency Code: activate to sort column ascending"
                                                              style={{
                                                                width:
                                                                  "222.2px",
                                                              }}
                                                            >
                                                              URL
                                                            </th>
                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Currency Code: activate to sort column ascending"
                                                              style={{
                                                                width:
                                                                  "222.2px",
                                                              }}
                                                            >
                                                              SUBJECT
                                                            </th>
                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Currency Code: activate to sort column ascending"
                                                              style={{
                                                                width: "123px",
                                                              }}
                                                            >
                                                              ACTIONS
                                                            </th>
                                                          </tr>
                                                        </thead>
                                                        <tbody className="bg-white">
                                                          {usefulinfoData.map(
                                                            (info, index) => (
                                                              <React.Fragment
                                                                key={index}
                                                              >
                                                                <tr
                                                                  className={
                                                                    "phps_row_" +
                                                                    (index %
                                                                      2 ===
                                                                    0
                                                                      ? "0 even"
                                                                      : "1 odd")
                                                                  }
                                                                  role="row"
                                                                >
                                                                  <td className="sorting_1">
                                                                    {
                                                                      info.country
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {info.city}
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      info.usefulInformation
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {info.url}
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      info.subject
                                                                    }
                                                                  </td>
                                                                  <td className="actionlink">
                                                                    <div
                                                                      className="actionCont"
                                                                      style={{
                                                                        width:
                                                                          "58px",
                                                                      }}
                                                                    >
                                                                      <div className="input-group-addon">
                                                                        <Link
                                                                          data-toggle="tooltip"
                                                                          data-placement="top"
                                                                          title
                                                                          data-original-title="Edit"
                                                                          onClick={() =>
                                                                            handleEdditClick(
                                                                              info,
                                                                              "usefulinfo"
                                                                            )
                                                                          }
                                                                        >
                                                                          <i className="fa fa-pencil-square-o" />
                                                                        </Link>
                                                                      </div>
                                                                      <div className="input-group-addon">
                                                                        <Link
                                                                          data-toggle="tooltip"
                                                                          data-placement="top"
                                                                          title
                                                                          data-original-title="Delete"
                                                                          onClick={() =>
                                                                            handleDeleteClick(
                                                                              info.uuid,
                                                                              ApiRoutes
                                                                                .PACKAGES
                                                                                .USEFUL_INFORMATION,
                                                                              "Useful Information"
                                                                            )
                                                                          }
                                                                        >
                                                                          <i className="fa fa-trash" />
                                                                        </Link>
                                                                      </div>
                                                                    </div>
                                                                  </td>
                                                                </tr>
                                                              </React.Fragment>
                                                            )
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-sm-6">
                                                    <div
                                                      className="dataTables_info"
                                                      id="search_transfer_info"
                                                      role="status"
                                                      aria-live="polite"
                                                    ></div>
                                                  </div>
                                                  <div className="col-sm-6" />
                                                </div>
                                              </div>
                                              <div className="form-group no-result">
                                                <h5 className="text-center">
                                                  Use Search Criteria to Match
                                                  Your Requirement.
                                                </h5>
                                              </div>
                                              <div className="row pd_tp">
                                                <div className="row">
                                                  <div className="col-md-4 col_hide">
                                                    <div className="form-group col-md-6">
                                                      &nbsp;
                                                    </div>
                                                  </div>
                                                  <div className="col-md-5"></div>
                                                  <div className="col-md-3 col_hide">
                                                    &nbsp;
                                                  </div>
                                                </div>
                                              </div>
                                              <br />
                                              <br />
                                            </div>
                                          </div>
                                        </form>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <br />
                          <div className="container"></div>
                          {/* modal for usefull info details */}
                        </div>
                        <div className="panel-body-essen">
                          <h4>Gallery Image</h4>
                          <div className="row">
                            {originalgalleryData.map((item) => (
                              <div className="col-md-3" key={item.uuid}>
                                <div
                                  className=" mb-4 image-card"
                                  onClick={() => handleImageClick(item.uuid)}
                                >
                                  <div className="image-container">
                                    <img
                                      src={item.image}
                                      className="card-img-top"
                                      alt={item.labelForImage}
                                    />
                                    {selectedImages.some(
                                      (selectedItem) =>
                                        selectedItem.uuid === item.uuid
                                    ) && <div className="tick-mark">✔</div>}
                                  </div>
                                  {/* Uncomment this section if you want to display additional info
            <div className="card-body">
              <h5 className="card-title">{item.labelForImage}</h5>
              <p className="card-text">{item.shortDescription}</p>
              <p className="card-text"><small className="text-muted">{item.city}, {item.country}</small></p>
            </div> */}
                                </div>
                              </div>
                            ))}
                          </div>

                          <button
                            type="button"
                            name="continue"
                            id="img_btn"
                            className="btn btn-dark btn-sm form-group"
                            data-target="#gallery_modal"
                            data-toggle="modal"
                            onClick={handleButtonNewImageClick}
                          >
                            <i className="fa fa-plus" />
                            Add New Images&nbsp;
                          </button>
                          {showaddImages && (
                            <div className="modal-wrapper-theme">
                              <div className="modal-theme">
                                <div className="modal-header-theme">
                                  <h5 className="modal-title-theme">
                                    ADD GALLERY
                                  </h5>
                                  <button
                                    type="button"
                                    className="close-theme"
                                    aria-label="Close"
                                    onClick={handleCloseNewImageModal}
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body-theme">
                                  {/* Form with text fields, textarea, checkbox, and add button */}
                                  <form id="addnewInformationform">
                                    <input
                                      type="hidden"
                                      name="action"
                                      defaultValue="insert"
                                    />
                                    <div className="panel-body">
                                      <div
                                        className="message"
                                        style={{ display: "none" }}
                                      ></div>
                                      <div className="form-group col-md-12">
                                        <label>Country</label>
                                        <MultiSelect
                                          options={countryOptions}
                                          isSearchable
                                          value={selectedgalleryCountry}
                                          placeholder="- Select Country -"
                                          className="custom-select required"
                                          onChange={handleCountryGalleryChange}
                                          noOptionsMessage={() =>
                                            "No Country Found"
                                          }
                                          required
                                        />
                                      </div>
                                      <div
                                        className="form-group col-md-12"
                                        onClick={handleCityGallerySelection}
                                      >
                                        <label>City</label>
                                        <MultiSelect
                                          options={citygalleryOptions}
                                          value={
                                            iscitygalleryChanged === false
                                              ? selectedgalleryCountry
                                                ? filterOptionsByLabel(
                                                    citygalleryOptions,
                                                    citygalleryedit
                                                  )
                                                : ""
                                              : selectedgalleryCountry
                                              ? filterOptionsByLabel(
                                                  citygalleryOptions,
                                                  selectedgalleryCity
                                                )
                                              : ""
                                          }
                                          isSearchable
                                          placeholder="- Select City -"
                                          className="custom-select required"
                                          onChange={handleCityGalleryChange}
                                          isDisabled={!selectedgalleryCountry}
                                          noOptionsMessage={() =>
                                            "No City Found"
                                          }
                                          required
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>Label For Image</label>
                                        <input
                                          className="form-control form-control-sm"
                                          type="text"
                                          ref={inputgalleryRef}
                                          name="labelForImage"
                                          id="labelForImage"
                                          value={galleryformData.labelForImage}
                                          onChange={(event) =>
                                            handleInputChange(
                                              event,
                                              "galleryimage"
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>
                                          Upload Image
                                          {/* ( Size 500 x 500 ) */}
                                        </label>
                                        <span className="uniqFile input-group">
                                          <span className="input-group-addon fa fa-upload myInputFile">
                                            <input
                                              type="file"
                                              name="image"
                                              size={39}
                                              className="file_font"
                                              accept="image/*"
                                              onChange={handleFileInput}
                                            />
                                          </span>
                                        </span>
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>Short Description</label>
                                        <textarea
                                          className="form-control form-control-sm"
                                          rows={4}
                                          cols={50}
                                          name="shortDescription"
                                          id="shortDescription"
                                          value={
                                            galleryformData.shortDescription
                                          }
                                          onChange={(event) =>
                                            handleInputChange(
                                              event,
                                              "galleryimage"
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>Description</label>
                                        <textarea
                                          className="form-control form-control-sm"
                                          rows={4}
                                          cols={50}
                                          name="description"
                                          id="description"
                                          value={galleryformData.description}
                                          onChange={(event) =>
                                            handleInputChange(
                                              event,
                                              "galleryimage"
                                            )
                                          }
                                        />
                                      </div>

                                      <button
                                        className="btn btn-dark btn-sm form-group mt-3"
                                        type="button"
                                        onClick={(event) =>
                                          isthemeedit === false
                                            ? handleSubmit(
                                                event,
                                                "GalleryImage"
                                              )
                                            : Edit(
                                                event,
                                                ApiRoutes.PACKAGES
                                                  .GALLERY_IMAGE,
                                                "Gallery Image"
                                              )
                                        }
                                      >
                                        <i
                                          className={
                                            isthemeedit === false
                                              ? "fa fa-plus"
                                              : "fa fa-floppy-o"
                                          }
                                        />
                                        &nbsp;
                                        {isthemeedit === false ? "Add" : "Save"}
                                      </button>
                                    </div>
                                  </form>
                                  <div className="container-fluid">
                                    {loading && (
                                      <div className="text-center">
                                        <img
                                          src={loadingGif}
                                          alt="Loading..."
                                          height={250}
                                        />
                                      </div>
                                    )}
                                    {!loading && (
                                      <>
                                        <form name="search_area_from">
                                          <div className="panel-body removeMargins">
                                            <div className="dataTables_scroll">
                                              <div
                                                className="row pd_tp"
                                                style={{
                                                  paddingLeft: "25px",
                                                  paddingBottom: "10px",
                                                }}
                                              >
                                                <div className="col-md-12">
                                                  <style
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                                                    }}
                                                  />
                                                  <div className="row pr-5">
                                                    <div
                                                      className="form-group col-md-2 new_search_icon"
                                                      style={{
                                                        textAlign: "right",
                                                        paddingRight: "0px",
                                                      }}
                                                    >
                                                      <h5
                                                        style={{
                                                          display: "inline",
                                                        }}
                                                      >
                                                        <i
                                                          className="fa fa-search srchWithinPg"
                                                          id="magnifiers"
                                                          data-toggle="tooltip"
                                                          data-placement="top"
                                                          data-original-title="Search within this table"
                                                        />
                                                      </h5>
                                                    </div>
                                                    <div className="form-group col-md-4 bookingsrc mt-3">
                                                      <input
                                                        type="text"
                                                        className="tablesearch form-control form-control-sm search_new"
                                                        placeholder="Label"
                                                        value={searchInput}
                                                        onChange={(event) =>
                                                          handleInputSearchChange(
                                                            event,
                                                            "galleryimage"
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                id="search_transfer_wrapper"
                                                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                                              >
                                                <div className="row">
                                                  <div className="col-sm-6" />
                                                  <div className="col-sm-6" />
                                                </div>
                                                <div className="row">
                                                  <div className="col-sm-12">
                                                    <div
                                                      className="doubleScroll-scroll-wrapper"
                                                      id="wrapper1"
                                                      style={{
                                                        height: "20px",
                                                        overflow:
                                                          "scroll hidden",
                                                        width: "1320px",
                                                      }}
                                                    ></div>
                                                    <div
                                                      id="wrapper2"
                                                      style={{
                                                        overflow: "auto",
                                                      }}
                                                    >
                                                      <table
                                                        id="search_transfer"
                                                        className="table table-bordered   table-responsive dataTable no-footer"
                                                        role="grid"
                                                        aria-describedby="search_transfer_info"
                                                      >
                                                        <thead>
                                                          <tr role="row">
                                                            <th
                                                              className="sorting_asc"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-sort="ascending"
                                                              aria-label="Currency Name: activate to sort column descending"
                                                              style={{
                                                                width:
                                                                  "222.2px",
                                                              }}
                                                            >
                                                              COUNTRY
                                                            </th>
                                                            <th
                                                              className="sorting_asc"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-sort="ascending"
                                                              aria-label="Currency Name: activate to sort column descending"
                                                              style={{
                                                                width:
                                                                  "222.2px",
                                                              }}
                                                            >
                                                              CITY
                                                            </th>
                                                            <th
                                                              className="sorting_asc"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-sort="ascending"
                                                              aria-label="Currency Name: activate to sort column descending"
                                                              style={{
                                                                width:
                                                                  "222.2px",
                                                              }}
                                                            >
                                                              LABEL FOR IMAGE
                                                            </th>
                                                            <th
                                                              className="sorting_asc"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-sort="ascending"
                                                              aria-label="Currency Name: activate to sort column descending"
                                                              style={{
                                                                width:
                                                                  "222.2px",
                                                              }}
                                                            >
                                                              IMAGE
                                                            </th>
                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Currency Code: activate to sort column ascending"
                                                              style={{
                                                                width:
                                                                  "885.2px",
                                                              }}
                                                            >
                                                              SHORT DESCERIPTION
                                                            </th>
                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Currency Code: activate to sort column ascending"
                                                              style={{
                                                                width:
                                                                  "885.2px",
                                                              }}
                                                            >
                                                              DESCERIPTION
                                                            </th>
                                                            <th
                                                              className="sorting"
                                                              tabIndex={0}
                                                              aria-controls="search_transfer"
                                                              rowSpan={1}
                                                              colSpan={1}
                                                              aria-label="Action: activate to sort column ascending"
                                                              style={{
                                                                width: "123px",
                                                              }}
                                                            >
                                                              Actions
                                                            </th>
                                                          </tr>
                                                        </thead>
                                                        <tbody className="bg-white">
                                                          {galleryData.map(
                                                            (gal, index) => (
                                                              <React.Fragment
                                                                key={index}
                                                              >
                                                                <tr
                                                                  className={
                                                                    "phps_row_" +
                                                                    (index %
                                                                      2 ===
                                                                    0
                                                                      ? "0 even"
                                                                      : "1 odd")
                                                                  }
                                                                  role="row"
                                                                >
                                                                  <td>
                                                                    {
                                                                      gal.country
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {gal.city}
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      gal.labelForImage
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {gal.image}
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      gal.shortDescription
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      gal.description
                                                                    }
                                                                  </td>{" "}
                                                                  <td className="actionlink">
                                                                    <div
                                                                      className="actionCont"
                                                                      style={{
                                                                        width:
                                                                          "58px",
                                                                      }}
                                                                    >
                                                                      <div className="input-group-addon">
                                                                        <Link
                                                                          // to={Constants.URLConstants.MASTERSCURRENCIESEDIT}
                                                                          data-toggle="tooltip"
                                                                          data-placement="top"
                                                                          title
                                                                          data-original-title="Edit"
                                                                          onClick={() =>
                                                                            handleEdditClick(
                                                                              gal,
                                                                              "galleryimage"
                                                                            )
                                                                          }
                                                                        >
                                                                          <i className="fa fa-pencil-square-o" />
                                                                        </Link>
                                                                      </div>
                                                                      <div className="input-group-addon">
                                                                        <Link
                                                                          data-toggle="tooltip"
                                                                          data-placement="top"
                                                                          title
                                                                          data-original-title="Delete"
                                                                          onClick={() =>
                                                                            handleDeleteClick(
                                                                              gal.uuid,
                                                                              ApiRoutes
                                                                                .PACKAGES
                                                                                .GALLERY_IMAGE,
                                                                              "Gallery Image"
                                                                            )
                                                                          }
                                                                        >
                                                                          <i className="fa fa-trash" />
                                                                        </Link>
                                                                      </div>
                                                                    </div>
                                                                  </td>
                                                                </tr>
                                                              </React.Fragment>
                                                            )
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-sm-6">
                                                    <div
                                                      className="dataTables_info"
                                                      id="search_transfer_info"
                                                      role="status"
                                                      aria-live="polite"
                                                    ></div>
                                                  </div>
                                                  <div className="col-sm-6" />
                                                </div>
                                              </div>
                                              <div className="form-group no-result">
                                                <h5 className="text-center">
                                                  Use Search Criteria to Match
                                                  Your Requirement.
                                                </h5>
                                              </div>
                                              <div className="row pd_tp">
                                                <div className="row">
                                                  <div className="col-md-4 col_hide">
                                                    <div className="form-group col-md-6">
                                                      &nbsp;
                                                    </div>
                                                  </div>
                                                  <div className="col-md-5"></div>
                                                  <div className="col-md-3 col_hide">
                                                    &nbsp;
                                                  </div>
                                                </div>
                                              </div>
                                              <br />
                                              <br />
                                            </div>
                                          </div>
                                        </form>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="container"></div>
                          <div className="row" id="destination_block">
                            <div className="col-md-12">
                              <ul className="city-list">
                                {cities.map((cityInfo, index) => (
                                  <li key={index} className="city-list-item">
                                    {cityInfo.city}
                                  </li>
                                ))}
                              </ul>
                              <div className>
                                {/* <div className="form-group" id="destination_nme64440">
                      <h4>Mumbai</h4>
                    </div> */}
                                {/* <div className="searchable-container">
                      <div className="items">
                        <div className="info-block block-info clearfix">
                          <div data-toggle="buttons" className="btn-group bizmoduleselect" id="img_list_dest64440"><label className="btn btn-default imageButtons64440" id="imageLabel15">
                              <div className="bizcontent" id="img_15" style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: 'url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_134251.png)'}}>
                                <input type="checkbox" name="selected_img[]" id="selected_img_15" className="selected_img" autoComplete="off" defaultValue={15} /><span className="glyphicon glyphicon-ok glyphicon-lg" />
                              </div>
                            </label><label className="btn btn-default imageButtons64440" id="imageLabel3">
                              <div className="bizcontent" id="img_3" style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: 'url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_102029.png)'}}>
                                <input type="checkbox" name="selected_img[]" id="selected_img_3" className="selected_img" autoComplete="off" defaultValue={3} /><span className="glyphicon glyphicon-ok glyphicon-lg" />
                              </div>
                            </label><label className="btn btn-default imageButtons64440" id="imageLabel4">
                              <div className="bizcontent" id="img_4" style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: 'url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_112822.png)'}}>
                                <input type="checkbox" name="selected_img[]" id="selected_img_4" className="selected_img" autoComplete="off" defaultValue={4} /><span className="glyphicon glyphicon-ok glyphicon-lg" />
                              </div>
                            </label><label className="btn btn-default imageButtons64440" id="imageLabel7">
                              <div className="bizcontent" id="img_7" style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: 'url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_120447.png)'}}>
                                <input type="checkbox" name="selected_img[]" id="selected_img_7" className="selected_img" autoComplete="off" defaultValue={7} /><span className="glyphicon glyphicon-ok glyphicon-lg" />
                              </div>
                            </label><label className="btn btn-default imageButtons64440" id="imageLabel8">
                              <div className="bizcontent" id="img_8" style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: 'url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_121803.png)'}}>
                                <input type="checkbox" name="selected_img[]" id="selected_img_8" className="selected_img" autoComplete="off" defaultValue={8} /><span className="glyphicon glyphicon-ok glyphicon-lg" />
                              </div>
                            </label><label className="btn btn-default imageButtons64440" id="imageLabel12">
                              <div className="bizcontent" id="img_12" style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: 'url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_123745.png)'}}>
                                <input type="checkbox" name="selected_img[]" id="selected_img_12" className="selected_img" autoComplete="off" defaultValue={12} /><span className="glyphicon glyphicon-ok glyphicon-lg" />
                              </div>
                            </label></div>
                        </div>
                      </div>
                    </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <button
                              type="button"
                              name="continue"
                              id="detail_button"
                              value="continue"
                              className="btn btn-dark btn-sm form-group"
                              onClick={(event) =>
                                handleSubmit(event, "Details")
                              }
                            >
                              Continue&nbsp;
                              <i className="fa fa-arrow-right" />
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              name="save_as_draft_details_btn"
                              id="save_as_draft_details_btn"
                              value="save_as_draft"
                              className="btn btn-dark btn-sm form-group"
                              onClick={(event) =>
                                handleSubmit(event, "DetailsSaveDraft")
                              }
                            >
                              <i className="fa fa-floppy-o"> </i>
                              &nbsp;Save as Draft
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Itinerary */}

                  {tab.id === "subtab3" && (
                    <div className="tab-pane active" id="3a">
                      <div className="form-group">
                        <h4>Itinerary</h4>
                      </div>
                      <hr />
                      <div className="row form-group">
                        <div className="col-md-6">
                          <div className="pull-left">
                            <h6 className="pack_code">
                              <span
                                className="pack_head"
                                style={{ fontSize: "14px", fontWeight: 600 }}
                              >
                                Package Code :
                              </span>
                              <span>{localStorage.getItem("packageCode")}</span>
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="pull-right packages_selected_lang" />
                        </div>
                      </div>
                      <br />
                      <div
                        className="panel-group"
                        id="accordion"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        {/* Loop to render panels */}
                        {[...Array(getNumberOfDays()).keys()].map(
                          (dayIndex) => {
                            const dayNumber = dayIndex + 1;

                            return (
                              <div
                                className="panel panel-default ng-scope"
                                key={dayIndex}
                              >
                                <div
                                  className="panel-heading"
                                  role="tab"
                                  id={`heading${dayNumber}`}
                                >
                                  <h4 className="panel-title">
                                    <a
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontWeight: "bold",
                                      }}
                                      role="button"
                                      data-bs-toggle="collapse"
                                      data-bs-parent="#accordion"
                                      href={`#collapse${dayNumber}`}
                                      aria-expanded="true"
                                      aria-controls={`collapse${dayNumber}`}
                                      className="ng-binding"
                                    >
                                      Day {dayNumber}
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id={`collapse${dayNumber}`}
                                  className="panel-collapse collapse"
                                  role="tabpanel"
                                  aria-labelledby={`heading${dayNumber}`}
                                >
                                  <form
                                    name={`itinerary_form${dayNumber}`}
                                    id={`itinerary_form${dayNumber}`}
                                    className="ng-valid ng-dirty ng-valid-parse"
                                  >
                                    <input
                                      type="hidden"
                                      id={`itinerary_day${dayNumber}`}
                                      defaultValue={dayNumber}
                                      name={`itinerary_day${dayNumber}`}
                                    />
                                    <div
                                      className="panel-body noMargin removeMargins"
                                      style={{ marginBottom: "0px" }}
                                    >
                                      <div className="row">
                                        <div className="form-group col-md-2">
                                          <label>Destination</label>
                                          <MultiSelect
                                            isSearchable
                                            placeholder="- Nothing Selected -"
                                            className="custom-select required"
                                            onChange={handleCountryChange}
                                            noOptionsMessage={() =>
                                              "No Country Found"
                                            }
                                            required
                                          />
                                        </div>
                                        <div className="form-group col-md-2">
                                          <label>Start Meeting Point</label>
                                          <MultiSelect
                                            isSearchable
                                            placeholder="- Nothing Selected -"
                                            className="custom-select required"
                                            onChange={handleCountryChange}
                                            noOptionsMessage={() =>
                                              "No Country Found"
                                            }
                                            required
                                          />
                                        </div>
                                        <div className="form-group col-md-3">
                                          <label>Start Point Address</label>
                                          <MultiSelect
                                            isSearchable
                                            placeholder="- Nothing Selected -"
                                            className="custom-select required"
                                            onChange={handleCountryChange}
                                            noOptionsMessage={() =>
                                              "No Country Found"
                                            }
                                            required
                                          />
                                        </div>
                                        <div className="form-group col-md-2">
                                          <label>End Meeting Point</label>
                                          <MultiSelect
                                            isSearchable
                                            placeholder="- Nothing Selected -"
                                            className="custom-select required"
                                            onChange={handleCountryChange}
                                            noOptionsMessage={() =>
                                              "No Country Found"
                                            }
                                            required
                                          />
                                        </div>
                                        <div className="form-group col-md-3">
                                          <label>End Point Address</label>
                                          <MultiSelect
                                            isSearchable
                                            placeholder="- Nothing Selected -"
                                            className="custom-select required"
                                            onChange={handleCountryChange}
                                            noOptionsMessage={() =>
                                              "No Country Found"
                                            }
                                            required
                                          />
                                        </div>
                                        <input
                                          type="hidden"
                                          id={`latitude${dayNumber}`}
                                          name={`latitude${dayNumber}`}
                                        />
                                        <input
                                          type="hidden"
                                          id={`longitude${dayNumber}`}
                                          name={`longitude${dayNumber}`}
                                        />
                                      </div>
                                      <div className="row">
                                        <div className="form-group col-md-12">
                                          <label>Day Description</label>
                                          <textarea
                                            name={`day_description${dayNumber}`}
                                            id={`day_description${dayNumber}`}
                                            className="form-control summernote itinerary_required"
                                            rows={5}
                                            defaultValue={""}
                                          />
                                        </div>
                                      </div>
                                      {/* Stay in */}
                                      <div
                                        className="row panel-body2 ng-scope"
                                        id={`stay_in_parent_div${dayNumber}`}
                                      >
                                        <div className="row col-md-12 ml-4">
                                          <h4>
                                            Stay in{" "}
                                            <small>
                                              {" "}
                                              ( Required for Accommodation )
                                            </small>{" "}
                                          </h4>
                                          <div className="radio radio-success radio-inline">
                                            <input
                                              id={`stayin${dayNumber}`}
                                              className="radio-select dyn_radio"
                                              type="radio"
                                              name={`stayin${dayNumber}`}
                                              value={`stayin${dayNumber}`}
                                              // onChange={(e) => handleStayInChange(e, dayNumber)} // Include appropriate function for radio button change
                                            />
                                            <label
                                              htmlFor={`stayin${dayNumber}`}
                                            >
                                              Dubai
                                            </label>
                                          </div>
                                        </div>
                                        {/* Stay In */}
                                        <div
                                          className="row ng-scope tab-pane active"
                                          id={`acc_on_stayin${dayNumber}`}
                                        >
                                          <input
                                            type="hidden"
                                            id={`hotel_count${dayNumber}`}
                                            name={`hotel_count${dayNumber}`}
                                            data-day={dayNumber}
                                          />
                                          {/* Accommodation content goes here */}
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                  {/* Dates & Prices */}

                  {tab.id === "subtab4" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <div className="tab-pane" id="4a">
                        <form
                          method="post"
                          name="date_price_form"
                          id="date_price_form"
                          className="ng-pristine ng-valid"
                        >
                          <input
                            type="hidden"
                            name="insert"
                            id="insert"
                            defaultValue="insert"
                          />
                          <input
                            type="hidden"
                            name="validity_date_count"
                            id="validity_date_count"
                          />
                          <input
                            type="hidden"
                            name="min_value_inventory_hidden"
                            id="min_value_inventory_hidden"
                          />
                          <input
                            type="hidden"
                            name="max_value_inventory_hidden"
                            id="max_value_inventory_hidden"
                          />
                          <input
                            type="hidden"
                            name="currency_json"
                            id="currency_json"
                          />
                          <input type="hidden" name="rate_id" id="rate_id" />
                          {/* <div className="form-group">
                  <h4>Dates and Price</h4>
                </div> */}
                          <hr />
                          <div className="form-group">
                            <div className="form-group col-md-12">
                              <div className="col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <input
                                    id="open_dates"
                                    type="radio"
                                    name="dates_and_price"
                                    defaultValue="open"
                                    defaultChecked="checked"
                                    onclick='showDateDiv("open")'
                                    className
                                  />
                                  <label htmlFor="open_dates">Open Dates</label>
                                </div>
                              </div>
                              {/* <div className="col-md-2">
                      <div className="radio radio-success radio-inline">
                        <input id="series_dates" type="radio" name="dates_and_price" onclick="showDateDiv(&quot;series&quot;)" defaultValue="series" className />
                        <label htmlFor="series_dates">Series Departure</label>
                      </div>
                    </div> */}
                            </div>
                          </div>
                          <br />
                          <div
                            id="exTab1"
                            style={{ display: "block", padding: "0px 20px" }}
                          >
                            <div>
                              <br />
                              <div className="tab-pane active" id="1a_date">
                                <div className="panel-body-essen">
                                  <div className="form-group">
                                    <h4>Start Date and End Date</h4>
                                  </div>{" "}
                                  <br />
                                  <div className="row">
                                    <div className="form-group col-md-2">
                                      <div className="radio radio-success radio-inline">
                                        <input
                                          id="period"
                                          type="radio"
                                          name="period_season"
                                          defaultValue="period"
                                          defaultChecked
                                          className
                                        />
                                        <label htmlFor="period">Period</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row add_more_dates_div">
                                    <div
                                      className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12"
                                      id="search_from_date"
                                    >
                                      <Flatpickr
                                        value={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        options={{ dateFormat: "d-m-Y" }}
                                        name="startdate_pricedate"
                                      />
                                      <span className="input-group-addon">
                                        to
                                      </span>
                                      <Flatpickr
                                        value={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        options={{ dateFormat: "d-m-Y" }}
                                        name="enddate_pricedate"
                                      />
                                      <span
                                        className="input-group-addon"
                                        id="datespricetrash"
                                        onClick={handleTrashClick}
                                      >
                                        <i className="fa fa-trash" />
                                      </span>
                                    </div>
                                    <div
                                      className="form-group col-md-3 seasons_div"
                                      id="select_age_div"
                                      style={{ display: "none" }}
                                    >
                                      <br />
                                      <select
                                        data-live-search="true"
                                        name="seasons[]"
                                        className="selectpicker required show-menu-arrow form-control bs-select-hidden"
                                        multiple
                                        id="seasons_dropdown"
                                        data-actions-box="true"
                                      >
                                        <option value={0}>
                                          Select Options
                                        </option>
                                      </select>
                                    </div>
                                    <div className="form-group col-md-2 plus_dates  d-none">
                                      {" "}
                                      <span className="input-group">
                                        <span
                                          className="input-group-addon"
                                          id="plus"
                                          onclick="add_more_dates_func();"
                                        >
                                          <i className="fa fa-plus" />
                                        </span>
                                        <span
                                          className="input-group-addon"
                                          id="minus"
                                          onclick="remove_more_dates_func()"
                                        >
                                          <i className="fa fa-minus" />
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="extra_dates_div row" />
                                  <div
                                    className="row interval-div"
                                    style={{ display: "none" }}
                                  >
                                    <div className="form-group col-md-2">
                                      <div className="radio radio-success radio-inline">
                                        <input
                                          id="daily"
                                          type="radio"
                                          name="fixed_departures"
                                          defaultValue="daily"
                                          className
                                          onchange="periodSelect(this)"
                                        />
                                        <label htmlFor="daily">Daily</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                      <div className="radio radio-success radio-inline">
                                        <input
                                          id="weekly"
                                          type="radio"
                                          name="fixed_departures"
                                          defaultValue="weekly"
                                          onchange="periodSelect(this)"
                                          className
                                        />
                                        <label htmlFor="weekly">Weekly</label>
                                      </div>
                                      <br />
                                      <div
                                        id="weekly_limit"
                                        className="periodselect"
                                        style={{ display: "none" }}
                                      >
                                        <select
                                          data-live-search="true"
                                          name="weekly[]"
                                          id="weekly_dropdown"
                                          className="selectpicker show-menu-arrow form-control bs-select-hidden"
                                          multiple
                                          data-actions-box="true"
                                        >
                                          <option value disabled>
                                            Select Options
                                          </option>
                                          <option value={7}>Sunday</option>
                                          <option value={1}>Monday</option>
                                          <option value={2}>Tuesday</option>
                                          <option value={3}>Wednesday</option>
                                          <option value={4}>Thursday</option>
                                          <option value={5}>Friday</option>
                                          <option value={6}>Saturday</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                      <div className="radio radio-success radio-inline">
                                        <input
                                          id="monthly"
                                          type="radio"
                                          name="fixed_departures"
                                          defaultValue="monthly"
                                          onchange="periodSelect(this)"
                                          className
                                        />
                                        <label htmlFor="monthly">Monthly</label>
                                      </div>
                                      <br />
                                      <div
                                        id="monthly_limit"
                                        className="periodselect"
                                        style={{ display: "none" }}
                                      >
                                        <select
                                          data-live-search="true"
                                          name="monthly[]"
                                          id="monthly_dropdown"
                                          className="selectpicker show-menu-arrow form-control bs-select-hidden"
                                          multiple
                                          data-actions-box="true"
                                        >
                                          <option value disabled>
                                            Select Options
                                          </option>
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                          <option value={6}>6</option>
                                          <option value={7}>7</option>
                                          <option value={8}>8</option>
                                          <option value={9}>9</option>
                                          <option value={10}>10</option>
                                          <option value={11}>11</option>
                                          <option value={12}>12</option>
                                          <option value={13}>13</option>
                                          <option value={14}>14</option>
                                          <option value={15}>15</option>
                                          <option value={16}>16</option>
                                          <option value={17}>17</option>
                                          <option value={18}>18</option>
                                          <option value={19}>19</option>
                                          <option value={20}>20</option>
                                          <option value={21}>21</option>
                                          <option value={22}>22</option>
                                          <option value={23}>23</option>
                                          <option value={24}>24</option>
                                          <option value={25}>25</option>
                                          <option value={26}>26</option>
                                          <option value={27}>27</option>
                                          <option value={28}>28</option>
                                          <option value={29}>29</option>
                                          <option value={30}>30</option>
                                          <option value={31}>31</option>
                                        </select>
                                      </div>
                                      {/* <input class="form-control" name="month" id="month_limit" type="text" readonly> */}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="panel-body-essen"
                                  style={{ display: "none" }}
                                >
                                  <div className="row fixed_depart">
                                    <div className="form-group col-md-12">
                                      <h4>Fixed Departures</h4>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_mon1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="mon"
                                          className
                                        />
                                        <label htmlFor="fd_mon1">Mon</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_tue1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="tue"
                                          className
                                        />
                                        <label htmlFor="fd_tue1">Tue</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_wed1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="wed"
                                          className
                                        />
                                        <label htmlFor="fd_wed1">Wed</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_thu1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="thurs"
                                          className
                                        />
                                        <label htmlFor="fd_thu1">Thu</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_fri1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="fri"
                                          className
                                        />
                                        <label htmlFor="fd_fri1">Fri</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_sat1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="sat"
                                          className
                                        />
                                        <label htmlFor="fd_sat1">Sat</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_sun1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="sun"
                                          className
                                        />
                                        <label htmlFor="fd_sun1">Sun</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                      <button
                                        type="button"
                                        name="select_from_calendar"
                                        id="select_from_calendar"
                                        value="Add"
                                        className="btn btn-primary form-group"
                                      >
                                        <h6>
                                          <i className="fa fa-check-circle" />
                                          &nbsp;Select From Calendar
                                        </h6>
                                      </button>
                                    </div>
                                    <div
                                      className="form-group col-md-3"
                                      id="select_from_calendar_div"
                                      style={{ display: "none" }}
                                    >
                                      <div
                                        className="input-daterange input-group date validity_date"
                                        id="validity0"
                                      >
                                        <input
                                          className="form-control date_price_required input_valid_from"
                                          defaultValue="26-09-2017"
                                          name="fixed_depart_from_date"
                                          id="validity_from0"
                                          type="text"
                                        />{" "}
                                        <span className="input-group-addon">
                                          to
                                        </span>
                                        <input
                                          className="form-control date_price_required input_valid_to"
                                          defaultValue="27-09-2017"
                                          name="fixed_depart_to_date"
                                          id="validity_to0"
                                          type="text"
                                        />{" "}
                                        <span
                                          className="input-group-addon clear_func"
                                          alt="clear"
                                          title="clear"
                                          onclick="clear1('validity_to0')"
                                        >
                                          <i className="fa fa-trash" />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel-body-essen">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="row form-group">
                                        <div className="col-md-12">
                                          <h4>Release Period</h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="form-group col-md-2">
                                          <div className="radio radio-success radio-inline">
                                            <input
                                              id="release_period_days"
                                              type="radio"
                                              name="days_or_hours"
                                              value="day"
                                              checked={selectedOption === "day"}
                                              onChange={
                                                handleRadioDatePriceChange
                                              }
                                            />
                                            <label htmlFor="release_period_days">
                                              In Days
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control required form-group days_text row"
                                              name="days_text"
                                              id="day_resp"
                                              placeholder="days"
                                              value={dayValue}
                                              onChange={handleDayInputChange}
                                              style={{
                                                display:
                                                  selectedOption === "day"
                                                    ? "block"
                                                    : "none",
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="form-group col-md-2">
                                          <div className="radio radio-success radio-inline">
                                            <input
                                              id="release_period_hours"
                                              type="radio"
                                              name="days_or_hours"
                                              value="hour"
                                              checked={
                                                selectedOption === "hour"
                                              }
                                              onChange={
                                                handleRadioDatePriceChange
                                              }
                                            />
                                            <label htmlFor="release_period_hours">
                                              In Hours
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control required hours_text"
                                              name="hours_text"
                                              placeholder="Hours"
                                              value={hourValue}
                                              onChange={handleHourInputChange}
                                              style={{
                                                display:
                                                  selectedOption === "hour"
                                                    ? "block"
                                                    : "none",
                                              }}
                                            />
                                          </div>
                                        </div>
                                        (Use 0 for no release period)
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* ngIf: !dynamicCheck */}
                                <div
                                  ng-if="!dynamicCheck"
                                  className="hide-for-dynamic panel-body-essen ng-scope"
                                >
                                  <div className="row form-group col-md-12">
                                    <h4>Occupancy</h4>
                                    <div className="row occupancy_div" />
                                    <div className="row">
                                      <div className="form-group col-md-2">
                                        <div className="checkbox checkbox-success checkbox-inline">
                                          <br />
                                          <input
                                            id="single"
                                            className="essential_required"
                                            type="checkbox"
                                            name="occupancy[]"
                                            value="Single"
                                            onChange={
                                              handleOccupanciesCheckboxChange
                                            }
                                          />
                                          <label htmlFor="single">Single</label>
                                        </div>
                                      </div>
                                      <div className="form-group col-md-2">
                                        <div className="checkbox checkbox-success checkbox-inline">
                                          <br />
                                          <input
                                            id="double"
                                            className="essential_required"
                                            type="checkbox"
                                            name="occupancy[]"
                                            value="Double"
                                            onChange={
                                              handleOccupanciesCheckboxChange
                                            }
                                          />
                                          <label htmlFor="double">Double</label>
                                        </div>
                                      </div>
                                      <div className="form-group col-md-2">
                                        <div className="checkbox checkbox-success checkbox-inline">
                                          <br />
                                          <input
                                            id="triple"
                                            className="essential_required"
                                            type="checkbox"
                                            name="occupancy[]"
                                            value="Triple"
                                            onChange={
                                              handleOccupanciesCheckboxChange
                                            }
                                          />
                                          <label htmlFor="triple">Triple</label>
                                        </div>
                                      </div>
                                      <div className="form-group col-md-2">
                                        <div className="checkbox checkbox-success checkbox-inline">
                                          <br />
                                          <input
                                            id="quad"
                                            className="essential_required"
                                            type="checkbox"
                                            name="occupancy[]"
                                            value="Quad"
                                            onChange={
                                              handleOccupanciesCheckboxChange
                                            }
                                          />
                                          <label htmlFor="quad">Quad</label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* end ngIf: !dynamicCheck */}
                                {/* ngIf: !dynamicCheck */}
                                <div>
                                  <div className="hide-for-dynamic row occupancy_div">
                                    <div className="row form-group">
                                      <div className="form-group col-md-12">
                                        <h4>Others</h4>
                                      </div>
                                      <div className="col-md-3">
                                        <label>Primary Currency</label>
                                        <MultiSelect
                                          options={currencyOptions}
                                          isSearchable
                                          placeholder="- Select Currency -"
                                          className="custom-select required"
                                          value={currencyOptions.find(
                                            (option) =>
                                              option.value ===
                                              priceratesformData.primaryCurrency
                                          )}
                                          onChange={(selectedOption) =>
                                            handleSingleSelectChange(
                                              selectedOption,
                                              "primaryCurrency",
                                              "DatePrices"
                                            )
                                          }
                                          noOptionsMessage={() =>
                                            "No Currency Found"
                                          }
                                          required
                                        />
                                      </div>
                                    </div>
                                    <br />
                                    <div
                                      className="row form-group"
                                      id="rateByDiv"
                                    >
                                      <div
                                        className="form-group col-md-6"
                                        id="rate_type_parent"
                                      >
                                        <div className="form-group col-md-12 no-padd">
                                          <h4>Rate Type</h4>
                                        </div>
                                        <div
                                          className="form-group col-md-6 no-padd"
                                          id="single_rate_div"
                                        >
                                          <div className="radio radio-success radio-inline">
                                            <input
                                              id="single_rate"
                                              type="radio"
                                              name="rates_single_rate"
                                              value="Single Rate"
                                              defaultChecked={
                                                rateType === "Single Rate"
                                              }
                                              onChange={handleRateTypeChange}
                                            />
                                            <label htmlFor="single_rate">
                                              Single Rate
                                            </label>
                                          </div>
                                        </div>
                                        {/* ngIf: package_activity_type!="private" || package_transfer_type!="private" */}
                                        <div
                                          className="form-group col-md-6 no-padd ng-scope"
                                          id="by_number_of_pax_div"
                                        >
                                          <div className="radio radio-success radio-inline">
                                            <input
                                              id="by_number_of_pax"
                                              type="radio"
                                              name="rates_single_rate"
                                              value="By Number of Pax"
                                              defaultChecked={
                                                rateType === "By Number of Pax"
                                              }
                                              onChange={handleRateTypeChange}
                                            />
                                            <label htmlFor="by_number_of_pax">
                                              By Number of Pax
                                            </label>
                                          </div>
                                        </div>
                                        {/* end ngIf: package_activity_type!="private" || package_transfer_type!="private" */}
                                      </div>
                                      <div
                                        className="form-group col-md-6"
                                        id="rate_by_parent"
                                      >
                                        <div className="form-group col-md-12 no-padd">
                                          <h4>Rate By</h4>
                                        </div>
                                        <div
                                          className="form-group col-md-4 no-padd"
                                          id="ratebypackage_div"
                                        >
                                          <div className="radio radio-success radio-inline">
                                            <input
                                              id="rate_by_package"
                                              type="radio"
                                              name="rate_by_type"
                                              value="Rate by Package"
                                              onChange={handleRateChange}
                                              checked={
                                                selectedRate ===
                                                "Rate by Package"
                                              }
                                            />
                                            <label htmlFor="rate_by_package">
                                              Rate by Package
                                            </label>
                                          </div>
                                        </div>
                                        <div
                                          className="form-group col-md-4 no-padd"
                                          id="ratebyservice_div"
                                        >
                                          <div className="radio radio-success radio-inline">
                                            <input
                                              id="rate_by_service"
                                              type="radio"
                                              name="rate_by_type"
                                              value="Rate by Service"
                                              onChange={handleRateChange}
                                              checked={
                                                selectedRate ===
                                                "Rate by Service"
                                              }
                                            />
                                            <label htmlFor="rate_by_service">
                                              Rate by Service
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      {/*  */}
                                      {paxRanges.map((range, index) => (
                                        <div
                                          key={index}
                                          className="form-group row pax_range_full_div"
                                          id="pax_range_full_div"
                                          style={{
                                            display:
                                              rateType === "By Number of Pax"
                                                ? "block"
                                                : "none",
                                          }}
                                        >
                                          <div className="pax_range col-md-6">
                                            <label
                                              style={{
                                                width: "100%",
                                                float: "left",
                                              }}
                                            >
                                              Pax Range
                                            </label>
                                            <input
                                              className="form-control min_pax_range"
                                              value={range.min}
                                              type="text"
                                              readOnly
                                              style={{
                                                width: "30%",
                                                float: "left",
                                              }}
                                            />
                                            <span
                                              style={{
                                                width: "5%",
                                                float: "left",
                                                margin: "0px 5% 0px 5%",
                                                textAlign: "center",
                                              }}
                                            >
                                              TO
                                            </span>
                                            <input
                                              className="form-control max_pax_range"
                                              value={range.max}
                                              type="number"
                                              onChange={(e) =>
                                                handleInputPaxChange(
                                                  e,
                                                  index,
                                                  "max"
                                                )
                                              }
                                              style={{
                                                width: "30%",
                                                float: "left",
                                              }}
                                            />
                                          </div>
                                          {index > 0 && (
                                            <div
                                              className="form-group col-md-3"
                                              id="pax_btns"
                                              style={{
                                                float: "left",
                                                width: "5%",
                                              }}
                                            >
                                              <span className="input-group">
                                                <span
                                                  className="input-group-addon"
                                                  id="minus"
                                                  onClick={() =>
                                                    removePaxRange(index)
                                                  }
                                                  style={{
                                                    padding:
                                                      "6px 12px!important",
                                                  }}
                                                >
                                                  <i className="fa fa-minus" />
                                                </span>
                                              </span>
                                            </div>
                                          )}
                                          {index === paxRanges.length - 1 && (
                                            <div
                                              className="form-group col-md-3"
                                              id="pax_btns"
                                              style={{
                                                float: "left",
                                                width: "5%",
                                              }}
                                            >
                                              <span className="input-group">
                                                <span
                                                  className="input-group-addon"
                                                  id="plus"
                                                  onClick={addMorePaxRange}
                                                  style={{
                                                    padding:
                                                      "6px 12px!important",
                                                  }}
                                                >
                                                  <i className="fa fa-plus" />
                                                </span>
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                      <br />
                                      <div
                                        className="col-md-12 mt-3 mb-2"
                                        style={{ float: "right" }}
                                      >
                                        <Link
                                          type="button"
                                          className="btn btn-dark btn-sm "
                                          id="matrix_rate"
                                          onClick={addRates}
                                          style={{ marginRight: "15px" }}
                                        >
                                          <i className="fa fa-plus" />
                                          Add Rates
                                        </Link>
                                        <Link
                                          type="button"
                                          className="btn btn-dark btn-sm"
                                          id="cancel_rate"
                                          onClick={cancelRates}
                                        >
                                          <i className="fa fa-trash" />
                                          Cancel Rates
                                        </Link>
                                      </div>
                                    </div>
                                  </div>

                                  <br />

                                  <div className="add_rates">
                                    <div className="row">
                                      <div
                                        className="form-group col-md-2"
                                        style={{ display: "none" }}
                                      >
                                        <div className="checkbox checkbox-success checkbox-inline">
                                          <br />
                                          <input
                                            id="see_currency"
                                            type="checkbox"
                                            name="sell_currency"
                                            defaultValue="Y"
                                          />
                                          <label htmlFor="see_currency">
                                            See only in these currencies
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="row form-group col-md-12 pax_table_header"
                                      style={{ display: "none" }}
                                    >
                                      <h4>Price</h4>
                                    </div>
                                    <div
                                      id="for_package"
                                      style={{ display: "none" }}
                                    >
                                      <div
                                        className="multiple_ranges"
                                        id="multiple_ranges0"
                                      >
                                        <div
                                          className="form-group row pax_range_full_div"
                                          style={{ display: "none" }}
                                        >
                                          <div className="form-group col-md-8">
                                            <h4>
                                              <span
                                                className="min_range_table"
                                                id="min_range_pax0"
                                              >
                                                1
                                              </span>{" "}
                                              to{" "}
                                              <span
                                                className="max_range_table"
                                                id="max_range_pax0"
                                              />{" "}
                                              pax
                                            </h4>
                                          </div>
                                        </div>
                                        <div className="form-group table_for_rates" />
                                      </div>
                                      <div className="multiple_ranges_new_div" />
                                      {/* Rate By Packages child extrabed start*/}
                                      {/* ngIf: !paxSelected */}
                                      <div
                                        className="dataTables_scroll ng-scope"
                                        ng-if="!paxSelected"
                                      >
                                        {/* ngIf: itinerary_hotel */}
                                        {/* ngIf: itinerary_hotel */}
                                      </div>
                                      {/* end ngIf: !paxSelected */}
                                      {/*Rate By Packages child extrabed extrabed end*/}
                                    </div>
                                    <div
                                      id="pax_package"
                                      style={{ display: "none" }}
                                    >
                                      <label>
                                        Valid From:{" "}
                                        <span
                                          ng-bind="getDateMonth(paxPackageTable.valid_from)"
                                          className="ng-binding"
                                        >
                                          NaN undefined NaN
                                        </span>
                                      </label>
                                      <label>
                                        To:{" "}
                                        <span
                                          ng-bind="getDateMonth(paxPackageTable.valid_to)"
                                          className="ng-binding"
                                        >
                                          NaN undefined NaN
                                        </span>
                                      </label>
                                      {/* ngRepeat: rangesLoop in paxPackageTable.ranges track by $index */}
                                    </div>
                                    <div
                                      id="for_service"
                                      style={{ display: "none" }}
                                    >
                                      <div id="servicePaxBox">
                                        {/* table for Rate by Services > Number of Pax > On click of Edit button And On click of Add Rates (starts here) */}
                                        {/* ngRepeat: paxLoop in paxCount track by $index */}
                                        {/* table for Rate by Services > Number of Pax > On click of Edit button And On click of Add Rates (ends here) */}
                                        {/* table for Rate by Services > Single Rate > On click of Edit button And On click of Add Rates (starts here) */}
                                        {/* ngRepeat: (keyDay,valueDay) in itineraryResponse.days track by $index */}
                                        {/* table for Rate by Services > Single Rate > On click of Edit button And On click of Add Rates (ends here) */}
                                      </div>
                                    </div>
                                    <hr
                                      className="pax_table_header"
                                      style={{ display: "none" }}
                                    />
                                  </div>
                                  <div className="row occupancy_div" />
                                </div>
                                {/* end ngIf: !dynamicCheck */}
                                <br /> <br />
                                <div className="row col-md-12 mt-5">
                                  <div className="form-group">
                                    <Link
                                      type="button"
                                      className="btn btn-dark btn-sm form-group"
                                      id="continue_date_price"
                                      onClick={(event) =>
                                        handleSubmit(event, "datesandRates")
                                      }
                                    >
                                      Continue&nbsp;
                                      <i className="fa fa-arrow-right" />
                                    </Link>
                                    &nbsp;
                                    {/* ngIf: !dynamicCheck */}
                                    <button
                                      ng-if="!dynamicCheck"
                                      type="button"
                                      name="add_another_rate_btn"
                                      id="add_another_rate_btn"
                                      value
                                      className="hide-for-dynamic btn btn-dark btn-sm form-group ng-scope"
                                      onclick="add_dates_prices_func('continue')"
                                    >
                                      <i className="fa fa-floppy-o" />
                                      &nbsp;Add rates for another date
                                    </button>
                                    {/* end ngIf: !dynamicCheck */}&nbsp;
                                  </div>
                                </div>
                                {/* ngIf: dynamicCheck */}
                                {/* Rate by Package edit view*/}
                                {/* ngIf: !dynamicCheck */}
                                <div
                                  ng-if="!dynamicCheck"
                                  className="hide-for-dynamic ng-scope"
                                  id="outer"
                                  style={{ width: "100%", float: "left" }}
                                >
                                  <h3
                                    id="table_text_header"
                                    style={{ display: "none" }}
                                  >
                                    Edit Dates and Price details
                                  </h3>
                                  <div className="panel-body11">
                                    {/* ngRepeat: d in paxDatatable track by $index */}
                                    {/* service table without pax starts here for onload */}
                                    {/* ngRepeat: d in serviceDatatable track by $index */}
                                    {/* service table without pax ends here for onload */}
                                    {/* table for Rate by Services > Number of Pax > On Load (starts here) */}
                                    {/* ngRepeat: d in serviceDatatable track by $index */}
                                    {/* table for Rate by Services > Number of Pax > On Load (ends here) */}
                                  </div>
                                </div>
                                {/* end ngIf: !dynamicCheck */}
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane" id="2a_date" />
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Cancellation Policy */}

                  {tab.id === "subtab5" && (
                    <div>
                      <div className="tab-pane" id="5a">
                        <div className="form-group">
                          <h4>Cancellation Policy</h4>
                        </div>
                        <form
                          name="add_cancellaltion_policy"
                          id="add_cancellaltion_policy"
                          className="ng-pristine ng-valid"
                        >
                          <input
                            type="hidden"
                            name="definer_cancellation"
                            id="definer_cancellation"
                            defaultValue="CANCELLATION_POLICY_DEADLINE"
                          />
                          <input
                            type="hidden"
                            name="multiple_cancellation"
                            id="multiple_cancellation"
                            defaultValue="Y"
                          />
                          <div className="row panel-body2 padd-top-30">
                            <div className="form-group row">
                              <div className="form-group col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <input
                                    id="select_a_policy1"
                                    className="cancellation_policy_required required"
                                    type="radio"
                                    name="select_a_policy"
                                    value="select"
                                    onChange={handlePolicyChange}
                                  />
                                  <label htmlFor="select_a_policy1">
                                    Select a Policy
                                  </label>
                                </div>
                              </div>
                              <div className="form-group col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <input
                                    id="create_a_new_policy1"
                                    type="radio"
                                    className="cancellation_policy_required"
                                    name="select_a_policy"
                                    value="create"
                                    onChange={handlePolicyChange}
                                  />
                                  <label htmlFor="create_a_new_policy1">
                                    Create a New Policy
                                  </label>
                                </div>
                              </div>
                            </div>
                            {selectedPolicy === "select" && (
                              <div
                                className="form-group row"
                                id="select_existing_policy"
                              >
                                <div className="form-group col-md-3 select_age_div14 mt-2">
                                  <label>Policies</label>
                                  <MultiSelect
                                    options={policyOptions}
                                    isSearchable
                                    placeholder="- Select Policy -"
                                    className="custom-select required"
                                    value={policyOptions.find(
                                      (option) =>
                                        option.value ===
                                        addpolicyFormData.cancellationPolicy
                                    )}
                                    onChange={(selectedOption) =>
                                      handleSingleSelectChange(
                                        selectedOption,
                                        "cancellationPolicy",
                                        "policy"
                                      )
                                    }
                                    noOptionsMessage={() => "No Policy Found"}
                                    required
                                  />
                                </div>
                              </div>
                            )}

                            {selectedPolicy === "create" && (
                              <div
                                className="form-group add_policy_package"
                                id="add_policy_package"
                              >
                                <div className="row">
                                  <div className="form-group col-md-3">
                                    <label>Policy Name</label>
                                    <input
                                      type="text"
                                      name="policyName"
                                      id="policyName"
                                      value={
                                        cancelationpolcyformData.policyName
                                      }
                                      onChange={(event) =>
                                        handleInputChange(event, "policy")
                                      }
                                      size={15}
                                      maxLength={100}
                                      className="form-control required"
                                    />
                                  </div>
                                  <div className="form-group col-md-3">
                                    <label>From (days) </label>{" "}
                                    <span id="days_from"> {fromDays}</span>-
                                    <span id="days_to">{toDays}</span>
                                    <br />
                                    <input
                                      type="range"
                                      name="from_days"
                                      id="from_days"
                                      defaultValue={fromDays}
                                      min="1"
                                      max="100"
                                      onChange={handleRangePolicyDaysChange}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div
                                    className="form-group col-md-2"
                                    style={{ display: "none" }}
                                  >
                                    <div className="radio radio-success radio-inline">
                                      <input
                                        id="percentage_cp"
                                        type="radio"
                                        name="cp"
                                        defaultValue="percent"
                                        defaultChecked="checked"
                                      />
                                      <label htmlFor="percentage_cp">
                                        Percentage
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="form-group col-md-2">
                                    <label>Percent</label>
                                    <input
                                      type="text"
                                      name="percent"
                                      id="percent"
                                      value={cancelationpolcyformData.percent}
                                      onChange={(event) =>
                                        handleInputChange(event, "policy")
                                      }
                                      size={15}
                                      maxLength={100}
                                      className="form-control required"
                                      onKeyUp={(event) =>
                                        !isNaN(event.key) &&
                                        event.preventDefault()
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </form>
                        <div className="row">
                          {selectedPolicy === "select" && (
                            <div
                              className="form-group col-md-2 single_policy"
                              id="single_policy"
                            >
                              <button
                                type="button"
                                name="add"
                                id="button"
                                value="Add"
                                className="btn btn-dark btn-sm form-group"
                                onClick={(event) =>
                                  handleSubmit(event, "policy")
                                }
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Add
                              </button>
                            </div>
                          )}
                          {selectedPolicy === "create" && (
                            <div
                              className="form-group col-md-2 multiple_policy"
                              id="multiple_policy"
                            >
                              <button
                                type="button"
                                name="add"
                                id="button"
                                value="Add"
                                className="btn btn-dark btn-sm form-group"
                                onClick={(event) =>
                                  handleSubmit(event, "policy")
                                }
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Create
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="package_cancellation_policy_list">
                          <div className="panel-body removeMargins">
                            <div className="dataTables_scroll">
                              <div
                                id="cancellation_table1_wrapper"
                                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                              >
                                <div className="row">
                                  <div className="col-sm-6" />
                                  <div className="col-sm-6" />
                                </div>
                                <div className="row mt-4">
                                  <div className="col-sm-12">
                                    {policyList.length > 0 ? (
                                      <table
                                        id="cancellation_table1"
                                        className="table   table-responsive dataTable no-footer"
                                        role="grid"
                                        aria-describedby="cancellation_table1_info"
                                      >
                                        <thead>
                                          <tr className="bg-primary" role="row">
                                            <th
                                              className="sorting_disabled"
                                              style={{ width: "0px" }}
                                            >
                                              From
                                            </th>
                                            <th
                                              className="sorting_disabled"
                                              style={{ width: "0px" }}
                                            >
                                              To
                                            </th>
                                            <th
                                              className="sorting_disabled"
                                              style={{ width: "0px" }}
                                            >
                                              Charge
                                            </th>
                                            <th
                                              className="sorting_disabled"
                                              style={{ width: "0px" }}
                                            >
                                              Action
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody id="cancellation_listing">
                                          {policyList.map((policy, index) => (
                                            <tr
                                              key={policy.uuid}
                                              className={
                                                index % 2 === 0 ? "even" : "odd"
                                              }
                                            >
                                              <td>{policy.from}</td>
                                              <td>
                                                {/* Add logic to display "To" value if available */}
                                              </td>
                                              <td>{policy.percent}%</td>
                                              <td className="actionlink">
                                                <div
                                                  className="actionCont"
                                                  style={{ width: "58px" }}
                                                >
                                                  <div className="input-group-addon">
                                                    <Link
                                                      data-toggle="tooltip"
                                                      data-placement="top"
                                                      title
                                                      data-original-title="Delete"
                                                      onClick={() =>
                                                        handleDeleteClick(
                                                          policy.uuid,
                                                          ApiRoutes.PACKAGES
                                                            .CANCELLATION_POLICY,
                                                          "Cancellation Policy"
                                                        )
                                                      }
                                                    >
                                                      <i className="fa fa-trash" />
                                                    </Link>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>
                                </div>
                                {/* <div className="row">
                        <div className="col-sm-6">
                          <div className="dataTables_info" id="cancellation_table1_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries
                          </div>
                        </div>
                        <div className="col-sm-6" />
                      </div> */}
                              </div>
                            </div>
                            <br />
                            <div className="row">
                              <div className="form-group col-md-12">
                                <button
                                  type="button"
                                  name="continue"
                                  id="button"
                                  onclick="add_policy()"
                                  value="continue"
                                  className="btn btn-dark btn-sm form-group"
                                >
                                  Continue&nbsp;
                                  <i className="fa fa-arrow-right" />
                                </button>
                                &nbsp;
                                <button
                                  type="button"
                                  name="save_as_drafts_cancellation_btn"
                                  id="save_as_drafts_cancellation_btn"
                                  value="save_as_draft"
                                  className="btn btn-dark btn-sm form-group"
                                  onClick={(event) =>
                                    handleSubmit(event, "policySaveDraft")
                                  }
                                >
                                  <i className="fa fa-floppy-o" />
                                  &nbsp;Save as Draft
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Term & Policies */}

                  {tab.id === "subtab6" && (
                    <div>
                      <div className="tab-pane" id="6a">
                        <form
                          id="terms_policies_form"
                          name="terms_policies_form"
                          className="ng-pristine ng-valid"
                        >
                          <div className="row">
                            <br />
                            <div className="col-md-12">
                              <div
                                className="pull-right"
                                id="term_policy_lang"
                              />
                            </div>
                          </div>
                          {/* Cancellation */}
                          <div className="form-group">
                            <h4>Terms Policies</h4>
                          </div>
                          <hr className="mr_bt" />
                          <div className="row">
                            <div className="form-group col-md-12">
                              <label style={{ visibility: "hidden" }}>
                                Cancellation Policy
                              </label>
                              <div style={{ width: "100%" }}>
                                <textarea
                                  name="termsPolicies"
                                  id="termsPolicies"
                                  value={termandpoliciesformData.termsPolicies}
                                  onChange={(event) =>
                                    handleInputChange(event, "termsandpolicies")
                                  }
                                  defaultValue={""}
                                  style={{
                                    width: "100%",
                                    height: "10em",
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    boxShadow:
                                      "inset 0 1px 2px rgba(0,0,0,0.1)",
                                    boxSizing: "border-box",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {/* Cancellation */}
                          {/* Important Notes */}
                          <div className="form-group">
                            <h4>Important Notes</h4>
                          </div>
                          <hr className="mr_bt" />
                          <div className="row">
                            <div className="form-group col-md-12">
                              <label style={{ visibility: "hidden" }}>
                                Important Notes
                              </label>
                              <div>
                                <textarea
                                  name="ImportantNotes"
                                  id="ImportantNotes"
                                  value={termandpoliciesformData.ImportantNotes}
                                  onChange={(event) =>
                                    handleInputChange(event, "termsandpolicies")
                                  }
                                  defaultValue={""}
                                  style={{
                                    width: "100%",
                                    height: "10em",
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    boxShadow:
                                      "inset 0 1px 2px rgba(0,0,0,0.1)",
                                    boxSizing: "border-box",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {/* Important Notes */}
                          {/* Important Notes */}
                          <div className="form-group">
                            <h4>Other Terms &amp; Conditions</h4>
                          </div>
                          <hr className="mr_bt" />
                          <div className="row">
                            <div className="form-group col-md-12">
                              <label style={{ visibility: "hidden" }}>
                                Other Terms &amp; Conditions
                              </label>
                              <div style={{ width: "100%" }}>
                                <textarea
                                  name="OtherTerms"
                                  id="OtherTerms"
                                  value={termandpoliciesformData.OtherTerms}
                                  onChange={(event) =>
                                    handleInputChange(event, "termsandpolicies")
                                  }
                                  defaultValue={""}
                                  style={{
                                    width: "100%",
                                    height: "10em",
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    boxShadow:
                                      "inset 0 1px 2px rgba(0,0,0,0.1)",
                                    boxSizing: "border-box",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {/* Important Notes */}
                          <br />
                          <div className="row">
                            <div className="col-md-12">
                              <button
                                type="button"
                                name="continue"
                                id="button"
                                onClick={(event) =>
                                  handleSubmit(event, "termsandpolicies")
                                }
                                value="continue"
                                className="btn btn-dark btn-sm form-group"
                              >
                                Continue&nbsp;
                                <i className="fa fa-arrow-right" />
                              </button>
                              &nbsp;
                              <button
                                type="button"
                                name="save_as_drafts_term_btn"
                                id="save_as_drafts_term_btn"
                                value="save_as_draft"
                                className="btn btn-dark btn-sm form-group"
                                onclick="save_as_drafts_term()"
                              >
                                <i className="fa fa-floppy-o" />
                                &nbsp;Save as Draft
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Inclusion & Exclusions */}
                  {tab.id === "subtab7" && (
                    <div>
                      <div className="tab-pane" id="7a">
                        <form
                          className="inclusion_exclusion_data ng-pristine ng-valid"
                          id="inclusion_exclusion_data"
                        >
                          <div className="row">
                            <br />
                            <div className="col-md-12">
                              <div className="pull-right packages_selected_lang" />
                            </div>
                          </div>
                          {/* Cancellation */}
                          <div className="form-group">
                            <h3>Inclusions</h3>
                          </div>
                          <hr />
                          {/* Inclusions */}
                          <div className="row">
                            <div className="form-group col-md-12">
                              <h4>Insurance</h4>
                              <div>
                                <textarea
                                  name="insurance"
                                  id="insurance"
                                  value={inclusionformData.insurance}
                                  onChange={(event) =>
                                    handleInputChange(event, "inclusion")
                                  }
                                  defaultValue={""}
                                  style={{
                                    width: "100%",
                                    height: "10em",
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    boxShadow:
                                      "inset 0 1px 2px rgba(0,0,0,0.1)",
                                    boxSizing: "border-box",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-12">
                              <h4>Tour Guide</h4>
                              <div>
                                <textarea
                                  name="tourGuide"
                                  id="tourGuide"
                                  value={inclusionformData.tourGuide}
                                  onChange={(event) =>
                                    handleInputChange(event, "inclusion")
                                  }
                                  defaultValue={""}
                                  style={{
                                    width: "100%",
                                    height: "10em",
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    boxShadow:
                                      "inset 0 1px 2px rgba(0,0,0,0.1)",
                                    boxSizing: "border-box",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-12">
                              <div className="row">
                                <div className="col-md-3 form-group">
                                  <h4>Preset Inclusions</h4>

                                  <MultiSelect
                                    options={presetinclusionOptions}
                                    isSearchable
                                    placeholder="- Select -"
                                    className="custom-select required"
                                    isMulti
                                    noOptionsMessage={() =>
                                      "No Inclusion Found"
                                    }
                                    onChange={(selectedOptions) =>
                                      handleMultiSelectChange(
                                        selectedOptions,
                                        "inclusion"
                                      )
                                    }
                                    required
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                name="add"
                                id="button"
                                value="Add"
                                className="btn btn-dark btn-sm form-group mt-3"
                                data-target="#inModal"
                                data-toggle="modal"
                                onClick={handleButtonInclusionClick}
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Add Preset inclusions
                              </button>
                              {showpresetinclusion && (
                                <div className="modal-wrapper-theme">
                                  <div className="modal-theme">
                                    <div className="modal-header-theme">
                                      <h5 className="modal-title-theme">
                                        PRESET INCLUSION
                                      </h5>
                                      <button
                                        type="button"
                                        className="close-theme"
                                        aria-label="Close"
                                        onClick={handleCloseInclusionModal}
                                      >
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="modal-body-theme">
                                      {/* Form with text fields, textarea, checkbox, and add button */}
                                      <form id="addnewInformationform">
                                        <input
                                          type="hidden"
                                          name="action"
                                          defaultValue="insert"
                                        />
                                        <div className="panel-body">
                                          <div
                                            className="message"
                                            style={{ display: "none" }}
                                          ></div>

                                          <div className="form-group col-md-12">
                                            <label>Inclusion Name</label>
                                            <input
                                              className="form-control form-control-sm required"
                                              type="text"
                                              name="inclusionName"
                                              id="inclusionName"
                                              ref={inputpresetinclusionRef}
                                              value={
                                                presetinclusionformData.inclusionName
                                              }
                                              onChange={(event) =>
                                                handleInputChange(
                                                  event,
                                                  "presetInclusion"
                                                )
                                              }
                                              required
                                            />
                                          </div>

                                          <div className="form-group col-md-12">
                                            <label>Description</label>
                                            <textarea
                                              className="form-control form-control-sm"
                                              rows={4}
                                              cols={50}
                                              name="description"
                                              id="description"
                                              value={
                                                presetinclusionformData.description
                                              }
                                              onChange={(event) =>
                                                handleInputChange(
                                                  event,
                                                  "presetInclusion"
                                                )
                                              }
                                            />
                                          </div>

                                          <button
                                            className="btn btn-dark btn-sm form-group mt-3"
                                            type="button"
                                            onClick={(event) =>
                                              isthemeedit === false
                                                ? handleSubmit(
                                                    event,
                                                    "presetInclusion"
                                                  )
                                                : Edit(
                                                    event,
                                                    ApiRoutes.PACKAGES
                                                      .PRESET_INCLUSION,
                                                    "Preset Inclusion"
                                                  )
                                            }
                                          >
                                            <i
                                              className={
                                                isthemeedit === false
                                                  ? "fa fa-plus"
                                                  : "fa fa-floppy-o"
                                              }
                                            />
                                            &nbsp;
                                            {isthemeedit === false
                                              ? "Add"
                                              : "Save"}
                                          </button>
                                        </div>
                                      </form>

                                      <div className="container-fluid">
                                        {loading && (
                                          <div className="text-center">
                                            <img
                                              src={loadingGif}
                                              alt="Loading..."
                                              height={250}
                                            />
                                          </div>
                                        )}
                                        {!loading && (
                                          <>
                                            <form name="search_area_from">
                                              <div className="panel-body removeMargins">
                                                <div className="dataTables_scroll">
                                                  <div
                                                    className="row pd_tp"
                                                    style={{
                                                      paddingLeft: "25px",
                                                      paddingBottom: "10px",
                                                    }}
                                                  >
                                                    <div className="col-md-12">
                                                      <style
                                                        dangerouslySetInnerHTML={{
                                                          __html:
                                                            "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                                                        }}
                                                      />
                                                      <div className="row pr-5">
                                                        <div
                                                          className="form-group col-md-2 new_search_icon"
                                                          style={{
                                                            textAlign: "right",
                                                            paddingRight: "0px",
                                                          }}
                                                        >
                                                          <h5
                                                            style={{
                                                              display: "inline",
                                                            }}
                                                          >
                                                            <i
                                                              className="fa fa-search srchWithinPg"
                                                              id="magnifiers"
                                                              data-toggle="tooltip"
                                                              data-placement="top"
                                                              data-original-title="Search within this table"
                                                            />
                                                          </h5>
                                                        </div>

                                                        <div className="form-group col-md-4 bookingsrc mt-3">
                                                          <input
                                                            type="text"
                                                            className="tablesearch form-control form-control-sm search_new"
                                                            placeholder="INCLUSION"
                                                            value={searchInput}
                                                            onChange={(event) =>
                                                              handleInputSearchChange(
                                                                event,
                                                                "inclusion"
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div
                                                    id="search_transfer_wrapper"
                                                    className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                                                  >
                                                    <div className="row">
                                                      <div className="col-sm-6" />
                                                      <div className="col-sm-6" />
                                                    </div>
                                                    <div className="row">
                                                      <div className="col-sm-12">
                                                        <div
                                                          className="doubleScroll-scroll-wrapper"
                                                          id="wrapper1"
                                                          style={{
                                                            height: "20px",
                                                            overflow:
                                                              "scroll hidden",
                                                            width: "1320px",
                                                          }}
                                                        ></div>
                                                        <div
                                                          id="wrapper2"
                                                          style={{
                                                            overflow: "auto",
                                                          }}
                                                        >
                                                          <table
                                                            id="search_transfer"
                                                            className="table table-bordered   table-responsive dataTable no-footer"
                                                            role="grid"
                                                            aria-describedby="search_transfer_info"
                                                          >
                                                            <thead>
                                                              <tr role="row">
                                                                <th
                                                                  className="sorting_asc"
                                                                  tabIndex={0}
                                                                  aria-controls="search_transfer"
                                                                  rowSpan={1}
                                                                  colSpan={1}
                                                                  aria-sort="ascending"
                                                                  aria-label="Currency Name: activate to sort column descending"
                                                                  style={{
                                                                    width:
                                                                      "222.2px",
                                                                  }}
                                                                >
                                                                  INCLUSION
                                                                </th>

                                                                <th
                                                                  className="sorting"
                                                                  tabIndex={0}
                                                                  aria-controls="search_transfer"
                                                                  rowSpan={1}
                                                                  colSpan={1}
                                                                  aria-label="Action: activate to sort column ascending"
                                                                  style={{
                                                                    width:
                                                                      "885.2px",
                                                                  }}
                                                                >
                                                                  DESCRIPTION
                                                                </th>
                                                                <th
                                                                  className="sorting"
                                                                  tabIndex={0}
                                                                  aria-controls="search_transfer"
                                                                  rowSpan={1}
                                                                  colSpan={1}
                                                                  aria-label="Currency Code: activate to sort column ascending"
                                                                  style={{
                                                                    width:
                                                                      "123px",
                                                                  }}
                                                                >
                                                                  ACTIONS
                                                                </th>
                                                              </tr>
                                                            </thead>
                                                            <tbody className="bg-white">
                                                              {presetData.map(
                                                                (
                                                                  prc,
                                                                  index
                                                                ) => (
                                                                  <React.Fragment
                                                                    key={index}
                                                                  >
                                                                    <tr
                                                                      className={
                                                                        "phps_row_" +
                                                                        (index %
                                                                          2 ===
                                                                        0
                                                                          ? "0 even"
                                                                          : "1 odd")
                                                                      }
                                                                      role="row"
                                                                    >
                                                                      <td className="sorting_1">
                                                                        {
                                                                          prc.inclusionName
                                                                        }
                                                                      </td>

                                                                      <td>
                                                                        {
                                                                          prc.description
                                                                        }
                                                                      </td>

                                                                      <td className="actionlink">
                                                                        <div
                                                                          className="actionCont"
                                                                          style={{
                                                                            width:
                                                                              "58px",
                                                                          }}
                                                                        >
                                                                          <div className="input-group-addon">
                                                                            <Link
                                                                              data-toggle="tooltip"
                                                                              data-placement="top"
                                                                              title
                                                                              data-original-title="Edit"
                                                                              onClick={() =>
                                                                                handleEdditClick(
                                                                                  prc,
                                                                                  "presetinclusion"
                                                                                )
                                                                              }
                                                                            >
                                                                              <i className="fa fa-pencil-square-o" />
                                                                            </Link>
                                                                          </div>
                                                                          <div className="input-group-addon">
                                                                            <Link
                                                                              data-toggle="tooltip"
                                                                              data-placement="top"
                                                                              title
                                                                              data-original-title="Delete"
                                                                              onClick={() =>
                                                                                handleDeleteClick(
                                                                                  prc.uuid,
                                                                                  ApiRoutes
                                                                                    .PACKAGES
                                                                                    .PRESET_INCLUSION,
                                                                                  "Preset Inclusion"
                                                                                )
                                                                              }
                                                                            >
                                                                              <i className="fa fa-trash" />
                                                                            </Link>
                                                                          </div>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  </React.Fragment>
                                                                )
                                                              )}
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="row">
                                                      <div className="col-sm-6">
                                                        <div
                                                          className="dataTables_info"
                                                          id="search_transfer_info"
                                                          role="status"
                                                          aria-live="polite"
                                                        ></div>
                                                      </div>
                                                      <div className="col-sm-6" />
                                                    </div>
                                                  </div>
                                                  <div className="form-group no-result">
                                                    <h5 className="text-center">
                                                      Use Search Criteria to
                                                      Match Your Requirement.
                                                    </h5>
                                                  </div>
                                                  <div className="row pd_tp">
                                                    <div className="row">
                                                      <div className="col-md-4 col_hide">
                                                        <div className="form-group col-md-6">
                                                          &nbsp;
                                                        </div>
                                                      </div>
                                                      <div className="col-md-5"></div>
                                                      <div className="col-md-3 col_hide">
                                                        &nbsp;
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <br />
                                                  <br />
                                                </div>
                                              </div>
                                            </form>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="container"></div>
                            <div className="form-group col-md-12">
                              <h4>Other Inclusions</h4>
                              <div>
                                <textarea
                                  name="otherInclusions"
                                  id="otherInclusions"
                                  value={inclusionformData.otherInclusions}
                                  onChange={(event) =>
                                    handleInputChange(event, "inclusion")
                                  }
                                  defaultValue={""}
                                  style={{
                                    width: "100%",
                                    height: "10em",
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    boxShadow:
                                      "inset 0 1px 2px rgba(0,0,0,0.1)",
                                    boxSizing: "border-box",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <h3>Exclusions</h3>
                          </div>
                          <hr />
                          {/* Inclusions */}
                          {/* Exclusions */}
                          <div className="row">
                            <div className="form-group col-md-12">
                              <h4>Tour Guide</h4>
                              <div>
                                <textarea
                                  name="tourGuide"
                                  id="tourGuide"
                                  value={exclusionformData.tourGuide}
                                  onChange={(event) =>
                                    handleInputChange(event, "exclusion")
                                  }
                                  defaultValue={""}
                                  style={{
                                    width: "100%",
                                    height: "10em",
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    boxShadow:
                                      "inset 0 1px 2px rgba(0,0,0,0.1)",
                                    boxSizing: "border-box",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-12">
                              <h4>Tips and Porterage</h4>
                              <div>
                                <textarea
                                  name="Tips"
                                  id="Tips"
                                  value={exclusionformData.Tips}
                                  onChange={(event) =>
                                    handleInputChange(event, "exclusion")
                                  }
                                  defaultValue={""}
                                  style={{
                                    width: "100%",
                                    height: "10em",
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    boxShadow:
                                      "inset 0 1px 2px rgba(0,0,0,0.1)",
                                    boxSizing: "border-box",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-12">
                              <div className="row">
                                <div className="col-md-3 form-group">
                                  <h4>Preset Exclusions</h4>
                                  <MultiSelect
                                    options={presetexclusionOptions}
                                    isSearchable
                                    placeholder="- Select -"
                                    className="custom-select required"
                                    isMulti
                                    noOptionsMessage={() =>
                                      "No Exclusion Found"
                                    }
                                    onChange={(selectedOptions) =>
                                      handleMultiSelectChange(
                                        selectedOptions,
                                        "exclusion"
                                      )
                                    }
                                    required
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                name="add"
                                id="button"
                                value="Add"
                                className="btn btn-dark btn-sm form-group mt-3"
                                data-target="#exModal"
                                data-toggle="modal"
                                onClick={handleButtonExclusionClick}
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Add Preset exclusions
                              </button>
                              {showpresetexclusion && (
                                <div className="modal-wrapper-theme">
                                  <div className="modal-theme">
                                    <div className="modal-header-theme">
                                      <h5 className="modal-title-theme">
                                        PRESET EXCLUSION
                                      </h5>
                                      <button
                                        type="button"
                                        className="close-theme"
                                        aria-label="Close"
                                        onClick={handleCloseExclusionModal}
                                      >
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="modal-body-theme">
                                      {/* Form with text fields, textarea, checkbox, and add button */}
                                      <form id="addnewInformationform">
                                        <input
                                          type="hidden"
                                          name="action"
                                          defaultValue="insert"
                                        />
                                        <div className="panel-body">
                                          <div
                                            className="message"
                                            style={{ display: "none" }}
                                          ></div>

                                          <div className="form-group col-md-12">
                                            <label>Exclusion Name</label>
                                            <input
                                              className="form-control form-control-sm required"
                                              type="text"
                                              name="exclusionName"
                                              id="exclusionName"
                                              ref={inputpresetexclusionRef}
                                              value={
                                                presetexclusionformData.exclusionName
                                              }
                                              onChange={(event) =>
                                                handleInputChange(
                                                  event,
                                                  "presetexclusion"
                                                )
                                              }
                                              required
                                            />
                                          </div>

                                          <div className="form-group col-md-12">
                                            <label>Description</label>
                                            <textarea
                                              className="form-control form-control-sm"
                                              rows={4}
                                              cols={50}
                                              name="description"
                                              id="description"
                                              value={
                                                presetexclusionformData.description
                                              }
                                              onChange={(event) =>
                                                handleInputChange(
                                                  event,
                                                  "presetexclusion"
                                                )
                                              }
                                            />
                                          </div>

                                          <button
                                            className="btn btn-dark btn-sm form-group mt-3"
                                            type="button"
                                            onClick={(event) =>
                                              isthemeedit === false
                                                ? handleSubmit(
                                                    event,
                                                    "presetExclusion"
                                                  )
                                                : Edit(
                                                    event,
                                                    ApiRoutes.PACKAGES
                                                      .PRESET_EXCLUSION,
                                                    "Preset exclusion"
                                                  )
                                            }
                                          >
                                            <i
                                              className={
                                                isthemeedit === false
                                                  ? "fa fa-plus"
                                                  : "fa fa-floppy-o"
                                              }
                                            />
                                            &nbsp;
                                            {isthemeedit === false
                                              ? "Add"
                                              : "Save"}
                                          </button>
                                        </div>
                                      </form>

                                      <div className="container-fluid">
                                        {loading && (
                                          <div className="text-center">
                                            <img
                                              src={loadingGif}
                                              alt="Loading..."
                                              height={250}
                                            />
                                          </div>
                                        )}
                                        {!loading && (
                                          <>
                                            <form name="search_area_from">
                                              <div className="panel-body removeMargins">
                                                <div className="dataTables_scroll">
                                                  <div
                                                    className="row pd_tp"
                                                    style={{
                                                      paddingLeft: "25px",
                                                      paddingBottom: "10px",
                                                    }}
                                                  >
                                                    <div className="col-md-12">
                                                      <style
                                                        dangerouslySetInnerHTML={{
                                                          __html:
                                                            "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                                                        }}
                                                      />
                                                      <div className="row pr-5">
                                                        <div
                                                          className="form-group col-md-2 new_search_icon"
                                                          style={{
                                                            textAlign: "right",
                                                            paddingRight: "0px",
                                                          }}
                                                        >
                                                          <h5
                                                            style={{
                                                              display: "inline",
                                                            }}
                                                          >
                                                            <i
                                                              className="fa fa-search srchWithinPg"
                                                              id="magnifiers"
                                                              data-toggle="tooltip"
                                                              data-placement="top"
                                                              data-original-title="Search within this table"
                                                            />
                                                          </h5>
                                                        </div>

                                                        <div className="form-group col-md-4 bookingsrc mt-3">
                                                          <input
                                                            type="text"
                                                            className="tablesearch form-control form-control-sm search_new"
                                                            placeholder="EXCLUSION"
                                                            value={searchInput}
                                                            onChange={(event) =>
                                                              handleInputSearchChange(
                                                                event,
                                                                "exclusion"
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div
                                                    id="search_transfer_wrapper"
                                                    className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                                                  >
                                                    <div className="row">
                                                      <div className="col-sm-6" />
                                                      <div className="col-sm-6" />
                                                    </div>
                                                    <div className="row">
                                                      <div className="col-sm-12">
                                                        <div
                                                          className="doubleScroll-scroll-wrapper"
                                                          id="wrapper1"
                                                          style={{
                                                            height: "20px",
                                                            overflow:
                                                              "scroll hidden",
                                                            width: "1320px",
                                                          }}
                                                        ></div>
                                                        <div
                                                          id="wrapper2"
                                                          style={{
                                                            overflow: "auto",
                                                          }}
                                                        >
                                                          <table
                                                            id="search_transfer"
                                                            className="table table-bordered   table-responsive dataTable no-footer"
                                                            role="grid"
                                                            aria-describedby="search_transfer_info"
                                                          >
                                                            <thead>
                                                              <tr role="row">
                                                                <th
                                                                  className="sorting_asc"
                                                                  tabIndex={0}
                                                                  aria-controls="search_transfer"
                                                                  rowSpan={1}
                                                                  colSpan={1}
                                                                  aria-sort="ascending"
                                                                  aria-label="Currency Name: activate to sort column descending"
                                                                  style={{
                                                                    width:
                                                                      "222.2px",
                                                                  }}
                                                                >
                                                                  EXCLUSION
                                                                </th>

                                                                <th
                                                                  className="sorting"
                                                                  tabIndex={0}
                                                                  aria-controls="search_transfer"
                                                                  rowSpan={1}
                                                                  colSpan={1}
                                                                  aria-label="Action: activate to sort column ascending"
                                                                  style={{
                                                                    width:
                                                                      "885.2px",
                                                                  }}
                                                                >
                                                                  DESCRIPTION
                                                                </th>
                                                                <th
                                                                  className="sorting"
                                                                  tabIndex={0}
                                                                  aria-controls="search_transfer"
                                                                  rowSpan={1}
                                                                  colSpan={1}
                                                                  aria-label="Currency Code: activate to sort column ascending"
                                                                  style={{
                                                                    width:
                                                                      "123px",
                                                                  }}
                                                                >
                                                                  ACTIONS
                                                                </th>
                                                              </tr>
                                                            </thead>
                                                            <tbody className="bg-white">
                                                              {presetexclusionData.map(
                                                                (
                                                                  prc,
                                                                  index
                                                                ) => (
                                                                  <React.Fragment
                                                                    key={index}
                                                                  >
                                                                    <tr
                                                                      className={
                                                                        "phps_row_" +
                                                                        (index %
                                                                          2 ===
                                                                        0
                                                                          ? "0 even"
                                                                          : "1 odd")
                                                                      }
                                                                      role="row"
                                                                    >
                                                                      <td className="sorting_1">
                                                                        {
                                                                          prc.exclusionName
                                                                        }
                                                                      </td>

                                                                      <td>
                                                                        {
                                                                          prc.description
                                                                        }
                                                                      </td>

                                                                      <td className="actionlink">
                                                                        <div
                                                                          className="actionCont"
                                                                          style={{
                                                                            width:
                                                                              "58px",
                                                                          }}
                                                                        >
                                                                          <div className="input-group-addon">
                                                                            <Link
                                                                              data-toggle="tooltip"
                                                                              data-placement="top"
                                                                              title
                                                                              data-original-title="Edit"
                                                                              onClick={() =>
                                                                                handleEdditClick(
                                                                                  prc,
                                                                                  "presetexclusion"
                                                                                )
                                                                              }
                                                                            >
                                                                              <i className="fa fa-pencil-square-o" />
                                                                            </Link>
                                                                          </div>
                                                                          <div className="input-group-addon">
                                                                            <Link
                                                                              data-toggle="tooltip"
                                                                              data-placement="top"
                                                                              title
                                                                              data-original-title="Delete"
                                                                              onClick={() =>
                                                                                handleDeleteClick(
                                                                                  prc.uuid,
                                                                                  ApiRoutes
                                                                                    .PACKAGES
                                                                                    .PRESET_EXCLUSION,
                                                                                  "Preset Exclusion"
                                                                                )
                                                                              }
                                                                            >
                                                                              <i className="fa fa-trash" />
                                                                            </Link>
                                                                          </div>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  </React.Fragment>
                                                                )
                                                              )}
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="row">
                                                      <div className="col-sm-6">
                                                        <div
                                                          className="dataTables_info"
                                                          id="search_transfer_info"
                                                          role="status"
                                                          aria-live="polite"
                                                        ></div>
                                                      </div>
                                                      <div className="col-sm-6" />
                                                    </div>
                                                  </div>
                                                  <div className="form-group no-result">
                                                    <h5 className="text-center">
                                                      Use Search Criteria to
                                                      Match Your Requirement.
                                                    </h5>
                                                  </div>
                                                  <div className="row pd_tp">
                                                    <div className="row">
                                                      <div className="col-md-4 col_hide">
                                                        <div className="form-group col-md-6">
                                                          &nbsp;
                                                        </div>
                                                      </div>
                                                      <div className="col-md-5"></div>
                                                      <div className="col-md-3 col_hide">
                                                        &nbsp;
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <br />
                                                  <br />
                                                </div>
                                              </div>
                                            </form>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="container"></div>
                            <div className="form-group col-md-12">
                              <h4>Other Exclusions</h4>
                              <div>
                                <textarea
                                  name="otherExclusions"
                                  id="otherExclusions"
                                  value={exclusionformData.otherExclusions}
                                  onChange={(event) =>
                                    handleInputChange(event, "exclusion")
                                  }
                                  defaultValue={""}
                                  style={{
                                    width: "100%",
                                    height: "10em",
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    boxShadow:
                                      "inset 0 1px 2px rgba(0,0,0,0.1)",
                                    boxSizing: "border-box",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {/* Exclusions */}
                        </form>
                        <br />
                        <div className="row">
                          <div className="col-md-12">
                            <button
                              type="button"
                              name="continue"
                              id="button"
                              onClick={(event) =>
                                handleSubmit(event, "inclusionexclusion")
                              }
                              value="continue"
                              className="btn btn-dark btn-sm form-group"
                            >
                              <i className="fa fa-floppy-o" />
                              &nbsp;Save
                            </button>
                            &nbsp;
                          </div>
                        </div>
                      </div>
                      {/* <div className="tab-pane" id="8a">
              <br />
              <div className="row">
                <div className="col-md-12">
                  <div className="pull-right packages_selected_lang" />
                </div>
              </div>
              <div className="form-group">
                <h4>Reviews</h4>
              </div>
              <hr />
              <form name="add_review_form" id="add_review_form" className="ng-pristine ng-valid">
                <div className="row">
                  <div className="form-group col-md-3">
                    <label>Name</label>
                    <input type="text" name="review_cust_name" id="review_cust_name" className="form-control review_required required"   />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Nationality</label>
                    <select data-live-search="true" name="select_nationality_review" id="select_nationality_review" className="show-menu-arrow form-control review_required required">
                      <option value>Select Nationality</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-3">
                    <label>Package Date</label>
                    <div className="input-group date col-md-12 col-sm-12 col-xs-12" id="period_date4">
                      <input id="datepicker1" name="review_date" className="review_required form-control review_date required" type="text"   /> <span className="input-group-addon"><i className="fa fa-th" /></span>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <label>Ratings</label>
                    <div className="star_rating" id="star_rating">
                      <div className="jr-ratenode jr-nomal" />
                      <div className="jr-ratenode jr-nomal " />
                      <div className="jr-ratenode jr-nomal " />
                      <div className="jr-ratenode jr-nomal " />
                      <div className="jr-ratenode jr-nomal " />
                      <input type="hidden" name="rating" id="rating" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label>Reviews</label>
                    <div>
                    <textarea id="tiny2" defaultValue={""} style={{
  width: '100%',
  height: '10em',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.2s',
}} />
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="form-group col-md-3">
                    <label>Image</label>
                    <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile"><input type="file" id="review_img" name="review_img" size={40} /></span></span>
                    <img src="project_folder/tdonline/uploads/package_images/" id="show_review_image" width={50} height={50} alt='pak'/>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <br />
                    <button type="button" name="add" id="review_button" onclick="update_review()" value="Update" className="btn btn-dark btn-sm form-group">
                      <i className="fa fa-plus" />
                      &nbsp;Update
                    </button>
                  </div>
                </div>
              </form>
              <div className="panel-body removeMargins">
                <table id="reviews_table" className="table   table-responsive">
                  <thead>
                    <tr>
                      <th>
                        <div className="checkbox checkbox-success checkbox-inline">
                          <input id="single" type="checkbox" name="occupancy"   />
                          <label htmlFor="single">&nbsp;</label>
                        </div>
                      </th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Nationality</th>
                      <th>Tour Date</th>
                      <th>Rating</th>
                      <th>Review</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="reviews_table_body">
                  </tbody>
                </table>
                <br />
                <br />
                <div className="form-group">
                </div>
              </div>
            </div> */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </form>
          {/* End */}
        </div>
      </div>
    </>
  );
};
export default MastersPackagesAdd;
