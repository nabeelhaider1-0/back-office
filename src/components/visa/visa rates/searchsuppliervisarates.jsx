import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import {
  nationalityOptions,
  offlineHotelSuppliersOptions,
  visaTypeOptions,
} from "../../../constants/contants";
import Constants from "../../../constants/routes";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVisaCategories,
  getVisaRateFOrEdit,
  getVisaRateMain,
  updateSupplyVisaMain,
  updateVisaRate,
} from "../../../state/action/visaActions";
import { deleteConfirmation } from "../../../constants/globalfunctions";
import { delDATA } from "../../../Apis/API";
// import {
//   fetchCountries,
//   getofflinesuppliers,
// } from "../../../state/action/commonApisActions";

const VisaSearchSuplierVisaRates = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const allVisaRatesList = useSelector((state) => state.visa.allVisaRatesData);
  console.log(allVisaRatesList);
  // const countries = useSelector((state) => state.countries.countries);
  // const offlineSuppliers = useSelector(
  //   (state) => state.countries.offlineSuppliers
  // );
  // const visaCategories = useSelector((state) => state.visa.visaCategories);
  const isEdit = useSelector((state) => state.visa.editData.data);
  console.log(isEdit);

  const [formData, setFormData] = useState({
    nationality: null,
    supplier: null,
    visaCategory: null,
    destinationCountry: null,
  });

  const [formDataa, setFormDataa] = useState({
    applicantNationality: "",
    supplier: "",
    currency: "",
    destinationCountry: "",
    visaCategory: "",
    rates: [{ supplierRate: "", agentRate: "", ageFrom: "", ageTo: "" }],
  });

  const [allVisaRates, setAllVisaRates] = useState([]);

  useEffect(() => {
    dispatch(getVisaRateMain());

    // if (countries?.length === 0) {
    //   dispatch(fetchCountries());
    // }
    // if (offlineSuppliers?.length === 0) {
    //   dispatch(getofflinesuppliers());
    // }
    // if (visaCategories?.length === 0) {
    //   dispatch(getAllVisaCategories());
    // }
  }, []);

  useEffect(() => {
    setAllVisaRates(allVisaRatesList?.data);
  }, [allVisaRatesList]);

  // console.log(formData);
  // console.log(countries);
  // console.log(offlineSuppliers);
  console.log(allVisaRatesList);
  // console.log(visaCategories);

  useEffect(() => {
    if (isEdit) {
      setFormDataa({
        applicantNationality: isEdit.applicantNationality || "",
        supplier: isEdit.supplier || "",
        currency: isEdit.currency || "",
        destinationCountry: isEdit.destinationCountry || "",
        visaCategory: isEdit.visaCategory || "",
        rates:
          isEdit.supplierVisaRate && isEdit.supplierVisaRate.length > 0
            ? isEdit.supplierVisaRate.map((rate) => ({
                supplierRate: rate.supplierRate || "",
                agentRate: rate.agentRate || "",
                ageFrom: rate.age ? rate.age.split(",")[0] : "",
                ageTo: rate.age ? rate.age.split(",")[1] : "",
              }))
            : [{ supplierRate: "", agentRate: "", ageFrom: "", ageTo: "" }],
      });
    }
  }, [isEdit]);
  console.log(isEdit);
  console.log(formDataa);

  const handleRateChange = (e, index, field) => {
    const { value } = e.target;
    setFormDataa((prevData) => {
      const newRates = [...prevData.rates];
      newRates[index][field] = value;
      return {
        ...prevData,
        rates: newRates,
      };
    });
  };
  const handleCurrencyChange = (e) => {
    const { value } = e.target;
    setFormDataa((prevData) => ({
      ...prevData,
      currency: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const supplyVisaData = {
        applicantNationality: formDataa.applicantNationality,
        supplier: formDataa.supplier,
        currency: formDataa.currency,
        destinationCountry: formDataa.destinationCountry,
        visaCategory: formDataa.visaCategory,
      };
      const response = dispatch(
        updateSupplyVisaMain(isEdit.uuid, supplyVisaData)
      );

      // console.log(response, "--------------");

      if (response) {
        await Promise.all(
          formDataa.rates.map((rate, index) => {
            const rateData = {
              supplierRate: rate.supplierRate,
              agentRate: rate.agentRate,
              age: `${rate.ageFrom},${rate.ageTo}`,
            };

            const rateUuid = isEdit?.supplierVisaRate?.[index]?.uuid;

            return dispatch(updateVisaRate(rateUuid, rateData));
          })
        );
        //...Visa Edit Modal Close...//
        modalRef.current.classList.remove("show");
        modalRef.current.style.display = "none";
        modalRef.current.setAttribute("aria-hidden", "true");
        modalRef.current.removeAttribute("aria-modal");

        const modalBackdrop = document.querySelector(".modal-backdrop");
        if (modalBackdrop) {
          modalBackdrop.parentNode.removeChild(modalBackdrop);
        }
      }
    } catch (error) {
      console.error("Error submitting visa rates:", error);
    }
  };

  const handleMultiSelectChange = (field) => (selected) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: selected,
    }));
  };

  const searchHandler = () => {
    const filteredData = allVisaRates?.filter((item) => {
      return (
        (formData.nationality?.label &&
          item?.applicantNationality
            ?.toLowerCase()
            ?.includes(formData.nationality?.label?.toLowerCase())) ||
        (formData.supplier?.label &&
          item?.supplier
            ?.toLowerCase()
            ?.includes(formData.supplier?.label?.toLowerCase())) ||
        (formData.visaCategory?.label &&
          item?.visaCategory
            ?.toLowerCase()
            ?.includes(formData.visaCategory?.label?.toLowerCase())) ||
        (formData.destinationCountry?.label &&
          item?.destinationCountry
            ?.toLowerCase()
            ?.includes(formData.destinationCountry?.label?.toLowerCase()))
      );
    });

    console.log(filteredData);
    setAllVisaRates(filteredData);
  };
  const handleReset = () => {
    setAllVisaRates(allVisaRatesList?.data);
  };

  const editHandler = (uuid) => {
    console.log(uuid);
    dispatch(getVisaRateFOrEdit(uuid));
  };

  const delHandler = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Supplier Visa?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA,
        "Supplier Visa has been deleted successfully.",
        "api/supplierVisa/",
        dispatch
        // "visa"
      );

      if (isDeleted) {
        dispatch(getVisaRateMain());

        // setOriginalHotelData((tourdata) =>
        //           tourdata.filter((transfer) => transfer.uuid !== uuid)
        //           );
        //           setHotelData((tourdata) =>
        //           tourdata.filter((transfer) => transfer.uuid !== uuid)
        //           );
        //           setCountryCityOptions(originalHotelData);
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };

  return (
    <>
      <Header2
        title="ADD SUPPLIER VISA RATES"
        linkText1="Add Supplier Visa Rates"
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row form-group">
              <div className="col-md-3 form-group">
                <label>Applicant Nationality</label>
                <MultiSelect
                  options={allVisaRates?.map((item) => ({
                    value: item?.applicantNationality,
                    label: item?.applicantNationality,
                  }))}
                  value={formData.nationality}
                  onChange={handleMultiSelectChange("nationality")}
                  isSearchable
                  placeholder="- All -"
                  className="custom-select "
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Supplier</label>
                <MultiSelect
                  options={allVisaRates?.map((item) => ({
                    value: item?.supplier?.supplierName,
                    label: item?.supplier?.supplierName,
                  }))}
                  value={formData.supplier}
                  onChange={handleMultiSelectChange("supplier")}
                  isSearchable
                  placeholder="- All -"
                  className="custom-select "
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Visa category</label>
                <MultiSelect
                  options={allVisaRates?.map((item) => ({
                    value: item?.visaCategory,
                    label: item?.visaCategory,
                  }))}
                  value={formData.visaCategory}
                  onChange={handleMultiSelectChange("visaCategory")}
                  isSearchable
                  placeholder="- All -"
                  className="custom-select "
                />
              </div>
              <div className="form-group col-md-3">
                <label>Destination Country</label>
                <MultiSelect
                  options={allVisaRates?.map((item) => ({
                    value: item?.destinationCountry,
                    label: item?.destinationCountry,
                  }))}
                  value={formData.destinationCountry}
                  onChange={handleMultiSelectChange("destinationCountry")}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select "
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3 form-group">
                <button
                  className="btn btn-dark btn-sm"
                  type="button"
                  value="Search"
                  onClick={searchHandler}
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  value="Search"
                  onClick={handleReset}
                >
                  <i className="fa fa-search" />
                  &nbsp;Reset
                </button>
              </div>
            </div>
          </div>
        </form>
        <br />
        <form>
          <div className="panel-body removeMargins">
            <div className="dataTables_scroll">
              <div
                id="edit_visa_rate_form"
                title="Edit Visa Rate"
                style={{ textAlign: "left" }}
              />
              <Link to={Constants.URLConstants.VISAADDSUPPLIERVISARATES}>
                {" "}
                <button
                  className="btn btn-dark btn-sm form-group"
                  type="button"
                  value="Add Supplier Visa Rates"
                >
                  <i className="fa fa-plus" />
                  &nbsp;&nbsp;Add Supplier Visa Rates
                </button>
              </Link>
              <div style={{ clear: "both" }} />
              <div
                className="doubleScroll-scroll-wrapper mt-3"
                id="wrapper1"
                style={{
                  height: "20px",
                  overflow: "scroll hidden",
                  width: "1491.4px",
                }}
              >
                <div
                  className="suwala-doubleScroll-scroll"
                  style={{ height: "20px", width: "1489.4px" }}
                />
              </div>
              <div id="wrapper2" style={{ overflow: "auto" }}>
                <link
                  rel="stylesheet"
                  href="/cpfv3/css/tms/bootstrap_r/css/bootstrap-select.css"
                />
                <table
                  id="search_sup"
                  className="table   table-responsive table-bordered"
                >
                  <thead>
                    <tr>
                      <th className="no-sort">No.</th>
                      <th className="no-sort">Applicant Nationality</th>
                      <th className="no-sort">Destination Country</th>
                      <th className="no-sort">Supplier</th>
                      <th className="no-sort">Visa category</th>
                      <th className="no-sort">Supplier Rate</th>
                      <th className="no-sort">Agent Rate</th>
                      <th className="no-sort">Currency</th>
                      <th className="no-sort">
                        AGE
                        <br />
                        From (Year) — TO (Year)
                      </th>
                      <th className="no-sort">Action</th>
                    </tr>
                  </thead>
                  <tbody id="result_container">
                    {allVisaRates?.map((item, index) => {
                      return (
                        <tr>
                          <td>{index}</td>
                          <td>{item?.applicantNationality}</td>
                          <td>{item?.destinationCountry}</td>
                          <td>{item?.supplier?.supplierName}</td>
                          <td>{item?.visaCategory}</td>
                          <td>
                            {item?.supplierVisaRate?.length > 1 ? (
                              <ul>
                                {item.supplierVisaRate.map((rate, index) => (
                                  <li key={index}>{rate.supplierRate}</li>
                                ))}
                              </ul>
                            ) : (
                              item?.supplierVisaRate[0]?.supplierRate
                            )}
                          </td>{" "}
                          <td>
                            {item?.supplierVisaRate?.length > 1 ? (
                              <ul>
                                {item.supplierVisaRate.map((rate, index) => (
                                  <li key={index}>{rate.agentRate}</li>
                                ))}
                              </ul>
                            ) : (
                              item?.supplierVisaRate[0]?.agentRate
                            )}
                          </td>
                          <td>{item?.currency}</td>
                          <td>
                            {item?.supplierVisaRate?.length > 1 ? (
                              <ul>
                                {item.supplierVisaRate.map((rate, index) => (
                                  <li key={index}>{rate.age}</li>
                                ))}
                              </ul>
                            ) : (
                              item?.supplierVisaRate[0]?.age
                            )}
                          </td>
                          <td>
                            <div className="actionCont">
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#visa_Rate"
                                className="btn btn-dark btn-sm"
                                type="button"
                                value="Edit"
                                onClick={() => editHandler(item?.uuid)}
                              >
                                <i className="fa fa-pencil" />
                                &nbsp;Edit
                              </button>
                              <button
                                className="btn btn-dark btn-sm"
                                type="button"
                                value="Delete"
                                onClick={() => {
                                  delHandler(item?.uuid);
                                }}
                              >
                                <i className="fa fa-trash" />
                                &nbsp;Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n        .actionCont {\n          display: flex;\n        }\n      ",
            }}
          />
        </form>
        <div
          className="modal fade"
          id="visa_Rate"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
          ref={modalRef}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <span
                className="fa fa-times-circle fa-4 closeBtn"
                data-dismiss="modal"
                style={{ color: "black !important", marginLeft: "97%" }}
              />
              <div className="color-line" />
              <div className="modal-body">
                <div>
                  <link
                    rel="stylesheet"
                    href="/cpfv3/css/tms/bootstrap_r/css/bootstrap-select.css"
                  />
                  <form
                    name="edit_visa_rate_form"
                    id="edit_visa_rate_form"
                    action="visa_details.php?action=update_visa_rate"
                    onSubmit={handleSubmit}
                  >
                    <div
                      className="modalForm"
                      data-child="row"
                      data-effect="fadeInUp"
                    >
                      <div className="modal-body">
                        {/* Iterate over rates to show each set of fields in one row */}
                        {formDataa.rates.map((rate, index) => (
                          <div key={index} className="row form-group">
                            {/* Supplier Rate */}
                            <div className="col-md-4 form-group phps_row_1">
                              <label>Supplier Rate</label>
                              <input
                                type="text"
                                className="form-control"
                                name={`supplier_rate_${index}`}
                                value={rate.supplierRate}
                                onChange={(e) =>
                                  handleRateChange(e, index, "supplierRate")
                                }
                              />
                            </div>

                            {/* Agent Rate */}
                            <div className="col-md-4 form-group phps_row_0">
                              <label>Agent Rate</label>
                              <input
                                type="text"
                                className="form-control"
                                name={`agent_rate_${index}`}
                                value={rate.agentRate}
                                onChange={(e) =>
                                  handleRateChange(e, index, "agentRate")
                                }
                              />
                            </div>

                            {/* Currency */}
                            <div className="col-md-4 form-group phps_row_1">
                              <label>Currency</label>
                              <select
                                name="currency"
                                className="form-control show-menu-arrow"
                                value={formDataa.currency} // Bind this to the formData currency state
                                onChange={(e) => handleCurrencyChange(e)}
                              >
                                <option value="GBP">GBP</option>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                                <option value="BHD">BHD</option>
                                <option value="AED">AED</option>
                                <option value="SGD">SGD</option>
                                <option value="MYR">MYR</option>
                                <option value="CAD">CAD</option>
                                <option value="SAR">SAR</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-12 form-group phps_row_0">
                          <button
                            className="btn btn-dark btn-sm"
                            type="submit"
                            name="b1"
                            value="SUBMIT"
                          >
                            <i className="fa fa-floppy-o" />
                            &nbsp;Save
                          </button>
                          <span id="loading" style={{ display: "none" }}>
                            <img src="images/loading.gif" alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VisaSearchSuplierVisaRates;
