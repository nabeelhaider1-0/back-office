import React, { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import {
  currencyOptionsa,
  nationalityOptions,
  offlineHotelSuppliersOptions,
  visaTypeOptions,
} from "../../../constants/contants";
import { useDispatch, useSelector } from "react-redux";
import {
  addVisaRateChild,
  addVisaRateMain,
  getAllVisaCategories,
} from "../../../state/action/visaActions";
import {
  fetchCountries,
  getAllCurrencies,
  getofflinesuppliers,
} from "../../../state/action/commonApisActions";

const VisaAddSuplierVisaRates = () => {
  const dispatch = useDispatch();
  const counties = useSelector((state) => state.countries.countries);
  const offlineSuppliers = useSelector(
    (state) => state.countries.offlineSuppliers
  );
  const currencies = useSelector((state) => state.countries.currencies);
  const allVisaList = useSelector((state) => state.visa.visaCategories?.data);
  console.log(allVisaList);

  // console.log(offlineSuppliers);
  // console.log(currencies);
  // console.log(counties);
  // const uuids = useSelector((state) => state.visa.uuids);
  // console.log(uuids);
  const [formData, setFormData] = useState({
    applicantNationality: "",
    supplier: "",
    currency: "",
    destinationCountry: "",
    visaCategory: "",
    rates: [{ supplierRate: "", agentRate: "", ageFrom: "", ageTo: "" }],
  });
  console.log(formData);
  const [showSecondRow, setShowSecondRow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchCountries()),
          dispatch(getofflinesuppliers()),
          dispatch(getAllCurrencies()),
          dispatch(getAllVisaCategories()),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleInputChange = (index, field, value) => {
    const newRates = [...formData.rates];
    newRates[index][field] = value;
    setFormData({ ...formData, rates: newRates });
  };

  const handleSelectChange = (field, value) => {
    console.log(value);
    setFormData({ ...formData, [field]: value });
  };

  const handleToggleRow = () => {
    if (!showSecondRow) {
      setFormData({
        ...formData,
        rates: [
          ...formData.rates,
          { supplierRate: "", agentRate: "", ageFrom: "", ageTo: "" },
        ],
      });
    } else {
      setFormData({
        ...formData,
        rates: formData.rates.slice(0, 1),
      });
    }
    setShowSecondRow(!showSecondRow);
  };

  const handleSubmit = async () => {
    try {
      const ratePayloads = formData.rates.map((rate) => ({
        supplierRate: rate.supplierRate,
        agentRate: rate.agentRate,
        age: `${rate.ageFrom},${rate.ageTo}`,
      }));

      const dispatchPromises = ratePayloads.map((payload) =>
        dispatch(addVisaRateChild(payload))
      );

      const uuidsResponses = await Promise.all(dispatchPromises);
      // console.log(uuidsResponses, 'responses');
      const uuids = uuidsResponses.map((response) => response?.data?.uuid);
      // console.log(uuids, 'uuids');

      await dispatch(addVisaRateMain(formData, uuids, setFormData));
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <Header2
        title="ADD SUPPLIER VISA RATES"
        linkText1="Add Supplier Visa Rates"
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Applicant Nationality</label>
                <MultiSelect
                  options={counties?.map((country) => ({
                    value: country.value,
                    label: country.label,
                  }))}
                  isSearchable
                  placeholder="Select Country"
                  className="custom-select"
                  onChange={(value) =>
                    handleSelectChange("applicantNationality", value.label)
                  }
                />
              </div>
              <div className="form-group col-md-3">
                <label>Supplier</label>
                <MultiSelect
                  options={offlineSuppliers?.map((supplier) => ({
                    value: supplier.uuid,
                    label: supplier.supplierName,
                  }))}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select"
                  onChange={(value) =>
                    handleSelectChange("supplier", value.value)
                  }
                />
              </div>
              <div className="form-group col-md-3">
                <label>Currency</label>
                <MultiSelect
                  options={currencies?.map((currency) => ({
                    value: currency.currencyCode,
                    label: currency.currency,
                  }))}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select"
                  onChange={(value) =>
                    handleSelectChange("currency", value.label)
                  }
                />
              </div>
              <div className="form-group col-md-3">
                <label>Destination Country</label>
                <MultiSelect
                  options={counties?.map((country) => ({
                    value: country.value,
                    label: country.label,
                  }))}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select"
                  onChange={(value) =>
                    handleSelectChange("destinationCountry", value.label)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Visa category</label>
                <MultiSelect
                  options={allVisaList?.map((visa) => ({
                    value: visa.visaCategory,
                    label: visa.visaCategory,
                  }))}
                  isSearchable
                  placeholder="- Select visa category -"
                  className="custom-select"
                  onChange={(value) =>
                    handleSelectChange("visaCategory", value.label)
                  }
                />
              </div>
              <div className="form-group col-md-12 mt-2">
                <h5>Rate</h5>
              </div>

              {/* First Row */}
              <div
                className="card form-group row mt-2"
                style={{ padding: "5px 23px", marginLeft: "7px" }}
              >
                <div className="row">
                  <div className="col-md-3">
                    <label>Supplier Rate</label>
                    <input
                      type="number"
                      name="supplier_rate_1"
                      maxLength={10}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        handleInputChange(0, "supplierRate", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label>Agent Rate</label>
                    <input
                      type="number"
                      name="agent_rate_1"
                      maxLength={10}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        handleInputChange(0, "agentRate", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label>Age</label>
                    <div className="input-group date input-daterange">
                      <select
                        id="visa_rate_age_from_id_1"
                        name="visa_rate_age_from_1"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          handleInputChange(0, "ageFrom", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {Array.from({ length: 101 }, (_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                      <span className="input-group-addon">to</span>
                      <select
                        id="visa_rate_age_to_id_1"
                        name="visa_rate_age_to_1"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          handleInputChange(0, "ageTo", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {Array.from({ length: 101 }, (_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label>&nbsp;</label>
                    <div className="input-group">
                      {!showSecondRow && (
                        <span
                          id="add_rate_link"
                          className="input-group-addon"
                          onClick={handleToggleRow}
                          style={{ cursor: "pointer" }}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Add Rate"
                        >
                          <i className="fa fa-plus" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row (Conditional Rendering) */}
              {showSecondRow && (
                <div
                  className="card form-group row mt-2"
                  style={{ padding: "5px 23px", marginLeft: "7px" }}
                >
                  <div className="row">
                    <div className="col-md-3">
                      <label>Supplier Rate</label>
                      <input
                        type="number"
                        name="supplier_rate_2"
                        maxLength={10}
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          handleInputChange(1, "supplierRate", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <label>Agent Rate</label>
                      <input
                        type="number"
                        name="agent_rate_2"
                        maxLength={10}
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          handleInputChange(1, "agentRate", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <label>Age</label>
                      <div className="input-group date input-daterange">
                        <select
                          id="visa_rate_age_from_id_2"
                          name="visa_rate_age_from_2"
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            handleInputChange(1, "ageFrom", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          {Array.from({ length: 101 }, (_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                        <span className="input-group-addon">to</span>
                        <select
                          id="visa_rate_age_to_id_2"
                          name="visa_rate_age_to_2"
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            handleInputChange(1, "ageTo", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          {Array.from({ length: 101 }, (_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label>&nbsp;</label>
                      <div className="input-group">
                        <span
                          id="add_rate_link"
                          className="input-group-addon"
                          onClick={handleToggleRow}
                          style={{ cursor: "pointer" }}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Remove Rate"
                        >
                          <i className="fa fa-minus" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default VisaAddSuplierVisaRates;
