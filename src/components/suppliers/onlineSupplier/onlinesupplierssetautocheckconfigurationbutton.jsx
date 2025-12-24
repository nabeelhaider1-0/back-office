/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import loadingGif from "../../../assets/images/loadingblue.gif";
import Constants from "../../../constants/routes";

import MultiSelect from "../../reactMultiSelect";
import { ErrorApiAlert, SimpleAlert } from "../../../constants/globalfunctions";
import { getDATA, putDATA } from "../../../Apis/API";
import { Link } from "react-router-dom";
import { setEditSupplierAutoCheckConfig } from "../../../state/action/actions";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";

const SuppliersSetAutoCheckConfigurationButton = ({
  setEditSupplierAutoCheckConfig,
}) => {
  const [supplierData, setSupplierData] = useState([]);
  const [originalsupplierData, setOriginalSupplierData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryoptions, setCountryOptions] = useState([]);
  const [cityoptions, setCityOptions] = useState([]);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
  });

  const handleEdditClick = (supplier) => {
    setEditSupplierAutoCheckConfig(supplier);
  };
  const getOnlineSuppliers = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(
        ApiRoutes.SUPPLIERS.ONLINE.SEARCH_REPORT_CONFIG
      );
      if (response.data.statusCode === 200) {
        const onlinesuppliers =
          response && response.data.data ? response.data.data : [];

        setCountryCityOptions(onlinesuppliers);
        setSupplierData(onlinesuppliers);
        setOriginalSupplierData(onlinesuppliers);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Online Supplier Destination Reports");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getOnlineSuppliers();
  }, []);

  const setCountryCityOptions = async (suppliers) => {
    let uniqueCities = [];
    let uniqueCountries = [];
    // Loop through transfers to collect unique values
    suppliers.forEach((supplier) => {
      // Collect unique cities
      if (!uniqueCities.includes(supplier.city)) {
        uniqueCities.push(supplier.city);
      }

      // Collect unique countries
      if (!uniqueCountries.includes(supplier.country)) {
        uniqueCountries.push(supplier.country);
      }
    });

    // Format unique countries as an array of objects
    const uniqueCountriesOptions = uniqueCountries.map((country) => ({
      label: country,
      value: country,
    }));
    const uniqueCitiesOptions = uniqueCities.map((city) => ({
      label: city,
      value: city,
    }));
    // Add a default option
    uniqueCountriesOptions.unshift({ label: "-Select Country-", value: "" });
    uniqueCitiesOptions.unshift({ label: "-Select City -", value: "" });
    setCountryOptions(uniqueCountriesOptions);
    setCityOptions(uniqueCitiesOptions);
  };

  const handleUpdateStatus = async (uuid, status) => {
    try {
      const response = await putDATA(
        ApiRoutes.SUPPLIERS.ONLINE.SEARCH_REPORT_CONFIG_STATUS,
        uuid,
        { status: status }
      );

      if (response.data.statusCode === 200) {
        SimpleAlert(
          "success",
          "Success",
          `Online Supplier Destination Report is now ${
            status === true ? "Active" : "In Active"
          }`
        );

        const updatedOriginalsupplierData = originalsupplierData.map(
          (supplier) =>
            supplier.uuid === uuid ? { ...supplier, status: status } : supplier
        );
        setSupplierData(updatedOriginalsupplierData);
        setOriginalSupplierData(updatedOriginalsupplierData);
      } else {
        SimpleAlert(
          "error",
          "Error",
          "Failed to Update Online Supplier  Destination Report"
        );
      }
    } catch (error) {
      // Handle errors from the API call

      SimpleAlert("error", "Error", "An unexpected error occurred.");
    }
  };
  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value, // Assuming the option object has a 'value' property
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredSuppliers = originalsupplierData.filter((supplier) => {
      // Convert supplier data to lowercase for case-insensitive comparison

      const lowerCountry = (supplier.country || "").toLowerCase();
      const lowerCity = (supplier.city || "").toLowerCase();

      // Match criteria with form data

      const matchesCountry =
        !formData.country ||
        formData.country === "" ||
        lowerCountry.includes((formData.country || "").toLowerCase());
      const matchesCity =
        !formData.city ||
        formData.city === "" ||
        lowerCity.includes((formData.city || "").toLowerCase());

      // Return true if all search criteria match
      return matchesCountry && matchesCity;
    });

    setSupplierData(filteredSuppliers);
  };

  const resetform = (event) => {
    event.preventDefault();

    // First, set the form data
    setFormData({
      country: "",
      city: "",
    });
    setSupplierData(originalsupplierData);
  };

  return (
    <>
      <Header2
        title="ONLINE SUPPLIER DESTINATION REPORT"
        linkText1="Search Supplier Report"
        linkText2="Add Search Supplier Report"
        link2={
          Constants.URLConstants
            .SUPPLIERSONLINESUPPLIERSAUTOCHECKCONFIGURATIONADD
        }
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form
          name="search_report_config"
          method="post"
          action="search_suppliers.php"
        >
          <input
            type="hidden"
            name="action"
            defaultValue="search_report_data"
          />
          <input type="hidden" name="Search" defaultValue="N" />
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3 ">
                <label>Country</label>
                <MultiSelect
                  options={countryoptions}
                  isSearchable
                  placeholder="- Select Country -"
                  value={countryoptions.find(
                    (option) => option.value === formData.country
                  )}
                  onChange={(selectedOption) =>
                    handleSingleSelectChange(selectedOption, "country")
                  }
                  className="custom-select"
                />
              </div>
              <div className="col-md-3 form-group ">
                <label>City</label>
                <MultiSelect
                  options={cityoptions}
                  value={cityoptions.find(
                    (option) => option.value === formData.city
                  )}
                  onChange={(selectedOption) =>
                    handleSingleSelectChange(selectedOption, "city")
                  }
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select required"
                />
              </div>

              <br />
              <br />
              <br />
              <div className="col-md-12 form-group mt-2">
                <button
                  className="btn btn-dark btn-sm"
                  type="button"
                  onClick={(event) => handleSubmit(event)}
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="reset"
                  id="reset"
                  name="reset"
                  value="reset"
                  style={{ marginLeft: "10px" }}
                  onClick={resetform}
                  data
                >
                  <i className="fa fa-repeat" /> &nbsp;Reset
                </button>
              </div>
              <br />
              <br />
              <br />
              <div
                id="search_controller_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div className="row">
                  <div className="col-sm-6" />
                  <div className="col-sm-6" />
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div id="wrapper2" style={{ overflow: "auto" }}>
                      {loading && (
                        <div className="text-center">
                          <img src={loadingGif} alt="Loading..." height={250} />
                        </div>
                      )}
                      {!loading && (
                        <>
                          <table
                            id
                            className="table table-bordered   table-responsive dataTable no-footer"
                          >
                            <thead>
                              <tr>
                                <th>Country</th>
                                <th>City</th>
                                <th>Agent Id</th>
                                <th>Star Rating</th>
                                <th>Service Type</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {supplierData.map((supplier, index) => (
                                <tr
                                  key={supplier.uuid}
                                  style={{ textAlign: "center" }}
                                  className={`phps_row_${index + 1} odd`}
                                >
                                  <td>{supplier.country}</td>
                                  <td>{supplier.city}</td>
                                  <td>{supplier.agent}</td>
                                  <td>
                                    {supplier.rating
                                      .map((r) => r.toFixed(1))
                                      .join(" , ")}
                                  </td>
                                  <td>{supplier.serviceType}</td>
                                  <td className="actionlink">
                                    <div className="actionCont ">
                                      <div className="input-group-addon">
                                        <Link
                                          data-toggle="tooltip"
                                          data-original-title="Edit Configuration"
                                          data-placement="top"
                                          to={
                                            Constants.URLConstants
                                              .SUPPLIERSONLINESUPPLIERSAUTOCHECKCONFIGURATINEDIT
                                          }
                                          onClick={() => {
                                            handleEdditClick(supplier);
                                          }}
                                        >
                                          <i className="fa fa-pencil-square-o" />
                                        </Link>
                                      </div>
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Click To Deactivate"
                                      >
                                        {supplier.status === true ? (
                                          <Link
                                            onClick={() => {
                                              handleUpdateStatus(
                                                supplier.uuid,
                                                false
                                              );
                                            }}
                                          >
                                            <i className="fa fa-check-circle"></i>
                                          </Link>
                                        ) : (
                                          <Link
                                            onClick={() => {
                                              handleUpdateStatus(
                                                supplier.uuid,
                                                true
                                              );
                                            }}
                                          >
                                            <i className="fa fa-times-circle"></i>
                                          </Link>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default connect(null, { setEditSupplierAutoCheckConfig })(
  SuppliersSetAutoCheckConfigurationButton
);
