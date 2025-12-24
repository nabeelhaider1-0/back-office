import React, { useEffect, useState } from "react";
import MultiSelect from "../../reactMultiSelect";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Constants from "../../../constants/routes";
import { connect } from "react-redux";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SimpleAlert,
  SuccessApiToast,
} from "../../../constants/globalfunctions";
import { postDATA } from "../../../Apis/API";
import ApiRoutes from "../../../constants/ApiRoutes"
const amountorpercentoptions = [
  { value: "Percentage", label: "Percentage" },
  { value: "Amount", label: "Amount" },
];
function AddCancellationPolicy({ data }) {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date
  const navigateOnRefresh = useNavigate();
  const [transferOptions, setTransferOptions] = useState([]);
  useEffect(() => {
    console.log("DATA=>", data);
    if (data && Object.keys(data).length > 0) {
      const options = data.transfers.map((trans) => ({
        value: trans.uuid,
        label: trans.transferName,
      }));

      setTransferOptions(options);
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(
        Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON
      );
    }
  }, [data, navigateOnRefresh]);
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };
  const [formData, setFormData] = useState({
    durationin: "Hours",
    transferuuids: [],
    currency: "",
    from: "",
    to: "",
    status: true,
    policyratesData: [],
  });

  const [policyratesData, setPolicyRatesData] = useState([]);
  const [currentFromDuration, setCurrentFromDuration] = useState(0);
  const [formFields, setFormFields] = useState({
    toDuration: "",
    amountorpercent: null,
    value: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleDataInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSelectChange = (selected) => {
    setFormFields({ ...formFields, amountorpercent: selected });
  };
  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOptions,
    }));
  };
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedValues });
    } else if (type === "radio") {
      // For radio buttons, directly update the value
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddOrUpdate = () => {
    const { toDuration, amountorpercent, value } = formFields;

    if (toDuration && amountorpercent && value) {
      const newPolicyRatesData = [...policyratesData];

      if (isEditing) {
        if (parseInt(toDuration) >= currentFromDuration) {
          newPolicyRatesData[editingIndex] = {
            ...newPolicyRatesData[editingIndex],
            toDuration: parseInt(toDuration),
            amountorpercent: amountorpercent,
            value: value,
          };
          setPolicyRatesData(newPolicyRatesData);
          setIsEditing(false);
          setEditingIndex(null);
        } else {
          alert(
            "The new toDuration should be greater than or equal to the current fromDuration value."
          );
        }
      } else {
        if (
          newPolicyRatesData.length === 0 ||
          parseInt(toDuration) > currentFromDuration
        ) {
          newPolicyRatesData.push({
            fromDuration: currentFromDuration,
            toDuration: parseInt(toDuration),
            amountorpercent: amountorpercent,
            value: value,
          });

          setPolicyRatesData(newPolicyRatesData);
          setCurrentFromDuration(parseInt(toDuration));
        } else {
          SimpleAlert(
            "warning",
            "",
            "The new fromDuration should be greater than the previous fromDuration value."
          );
        }
      }
      setFormFields({ toDuration: "", amountorpercent: null, value: "" });
      setSelectedIndex(null);
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleRowSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleEdit = () => {
    if (selectedIndex !== null) {
      const selectedRow = policyratesData[selectedIndex];
      setFormFields({
        toDuration: selectedRow.toDuration.toString(),
        amountorpercent: selectedRow.amountorpercent,
        value: selectedRow.value,
      });
      setCurrentFromDuration(selectedRow.fromDuration);
      setIsEditing(true);
      setEditingIndex(selectedIndex);
    } else {
      alert("Please select a row to edit.");
    }
  };
  const handleDelete = () => {
    if (selectedIndex !== null) {
      // Show confirmation dialog before deleting
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "This will delete the row. Are you sure you want to delete it?",
        showCancelButton: true,
        confirmButtonColor: "#E6A64B", // Color for OK button background and icon
        confirmButtonText: "OK", // Text for OK button
        cancelButtonText: "Cancel", // Text for Cancel button
        cancelButtonColor: "#6c757d", // Color for Cancel button background
        reverseButtons: true, // Positions Cancel button to the left and OK button to the right
      }).then((result) => {
        if (result.isConfirmed) {
          // If user clicks OK in the dialog, proceed with deletion
          const newPolicyRatesData = [...policyratesData];
          newPolicyRatesData.splice(selectedIndex, 1);

          setPolicyRatesData(newPolicyRatesData);
          setSelectedIndex(null);
          setFormFields({ toDuration: "", amountorpercent: null, value: "" });
          setIsEditing(false);
          setEditingIndex(null);

          // Update currentFromDuration if needed
          if (newPolicyRatesData.length > 0) {
            setCurrentFromDuration(
              newPolicyRatesData[newPolicyRatesData.length - 1].toDuration
            );
          } else {
            setCurrentFromDuration(0); // Reset to 0 if no more data
          }
        }
      });
    } else {
      alert("Please select a row to delete.");
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding leading zero if needed
    const day = date.getDate().toString().padStart(2, "0"); // Adding leading zero if needed
    return `${month}/${day}/${year}`;
  };

  const checkRequired = (policydata) => {
    if (
      policydata.transferuuids.length === 0 ||
      policydata.transferuuids === undefined
    ) {
      RequiredFieldAlert(
        "Transfer is required",
        "Please select Transfer",
        "error"
      );
      return false;
    }
    if (
      policydata.from === "" ||
      policydata.from === "01/01/1970" ||
      policydata.from === undefined ||
      policydata.to === "" ||
      policydata.to === "01/01/1970" ||
      policydata.to === undefined
    ) {
      RequiredFieldAlert(
        "Date is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (
      policydata.policyratesData.length === 0 ||
      policydata.policyratesData === undefined
    ) {
      RequiredFieldAlert(
        "Policy Rates are required",
        "Please Create Policy Data",
        "error"
      );
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPolicyRatesData = policyratesData.map((item) => ({
      ...item,
      amountorpercent: item.amountorpercent.value, // Change amountorpercent to just the value
    }));

    const From = new Date(startDate);
    const To = new Date(endDate);

    const requesbody = {
      durationin: formData.durationin,
      transferuuids: formData.transferuuids.map((transfer) => transfer.value),
      currency: data.currency,
      from: formatDate(From),
      to: formatDate(To),
      status: formData.status,
      policyratesData: updatedPolicyRatesData,
    };

    const isSuccessfull = checkRequired(requesbody);
    if (isSuccessfull) {
      try {
        const response = await postDATA(
          requesbody,
          ApiRoutes.TRANSFERS.TRANSFER_TARIFF_CANCELLATION_POLICY
        );

        if (response.data.statusCode === 200) {
          SuccessApiToast("Cancelation Policy Added Successfully");

          navigateOnRefresh(
            Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON
          );
        }
      } catch (error) {
        ErrorApiAlert("Error Adding Cancelation Policy");
      }
    }
  };
  return (
    <>
      <div data-child="row" data-effect="fadeInUp">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="hpanel"
              style={{ background: "white", padding: "10px" }}
            >
              <div
                className="panel-heading"
                style={{ marginLeft: "20px", marginTop: "2px" }}
              >
                ADD CANCELLATION POLICY
              </div>
              <div
                className="panel-body sectHeader mt-3"
                style={{
                  backgroundColor: "#FF5015",
                  paddingBottom: "1px",
                  paddingTop: "4px",
                }}
              >
                <div className="row">
                  <div className="col-md-3">
                    <h5
                      style={{
                        color: "white",
                        fontSize: "15px",
                        marginLeft: "20px",
                        marginTop: "2px",
                      }}
                    >
                      Supplier : {data?.supplierName}
                    </h5>
                  </div>
                </div>
              </div>
              <input
                type="hidden"
                id="transfer_id"
                name="transfer_id"
                defaultValue={95}
              />
              <div className="panel-body">
                <div>
                  <div className="row mx-2 mt-2">
                    <input
                      id="sel_supplier_view"
                      name="sel_supplier_view"
                      type="hidden"
                      defaultValue="S000000003"
                    />
                    <div className="form-group col-md-3">
                      <label>Select Transfer</label>
                      <MultiSelect
                        options={transferOptions}
                        isSearchable
                        isMulti
                        placeholder="- Select Transfer -"
                        className="custom-select required"
                        value={formData.transferuuids}
                        onChange={(selectedOptions) =>
                          handleMultiSelectChange(
                            "transferuuids",
                            selectedOptions
                          )
                        }
                        noOptionsMessage={() => "No Transfer Found"}
                      />
                    </div>

                    <div className="form-group col-md-3">
                      <label>Date</label>
                      <div
                        className="input-daterange input-group date"
                        id="datetimepicker6"
                      >
                        <Flatpickr
                          value={startDate}
                          onChange={(date) => setStartDate(date)}
                          options={{ dateFormat: "Y-m-d" }}
                          style={{ width: "120px" }}
                          className="required"
                        />

                        <span class="input-group-addon">to</span>
                        <Flatpickr
                          value={endDate}
                          onChange={(date) => setEndDate(date)}
                          options={{ dateFormat: "Y-m-d" }}
                          style={{ width: "120px" }}
                        />
                        <span
                          className="input-group-addon"
                          id="aTrashBtn"
                          onClick={handleTrashClick}
                        >
                          <i className="fa fa-trash" />
                        </span>
                      </div>
                    </div>

                    <div className="form-group col-md-3">
                      <label>Duration In</label>
                      <br />
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          name="durationin"
                          value="Days"
                          checked={formData.durationin === "Days"}
                          onChange={handleInputChange}
                        />
                        <label>Days</label>
                      </div>
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          name="durationin"
                          value="Hours"
                          checked={formData.durationin === "Hours"}
                          onChange={handleInputChange}
                        />
                        <label>Hours</label>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Currency</label>
                      <div>{data?.currency}</div>
                    </div>
                  </div>
                  <div className="panel-body-essen mt-3">
                    <div className="form-group">
                      <div className="form-group col-md-12 mt-3 d-flex justify-content-end">
                        <button
                          className="btn btn-dark btn-sm mx-1"
                          type="button"
                          onClick={handleAddOrUpdate}
                        >
                          <i className="fa fa-plus" />
                          &nbsp;{isEditing ? "Update" : "Add"}
                        </button>
                        <button
                          className="btn btn-light btn-sm mx-1"
                          style={{
                            backgroundColor: "#6c757d",
                            borderColor: "#6c757d",
                            color: "white",
                          }}
                          type="button"
                          onClick={handleEdit}
                        >
                          <i className="fa fa-pencil" />
                          &nbsp;Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm mx-1"
                          type="button"
                          onClick={handleDelete}
                        >
                          <i className="fa fa-trash" />
                          &nbsp;Delete
                        </button>
                      </div>
                      <div className="row mt-4 form-group">
                        <div className="col-md-3">
                          <h6>From Duration </h6>
                        </div>
                        <div className="col-md-3">
                          <h6>To Duration </h6>
                        </div>
                        <div className="col-md-3">
                          <h6>In Amount(s)(% Or Amount) </h6>
                        </div>
                        <div className="col-md-3">
                          <h6>Value </h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-3">
                          <input
                            type="text"
                            name="fromDuration"
                            id="fromDuration"
                            className="form-control essential_required required"
                            value={currentFromDuration}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <input
                            type="text"
                            name="toDuration"
                            id="toDuration"
                            className="form-control essential_required required"
                            value={formFields.toDuration}
                            onChange={handleDataInputChange}
                            readOnly={isEditing}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <MultiSelect
                            options={amountorpercentoptions}
                            isSearchable
                            name="amountorpercent"
                            placeholder="- Select -"
                            className="custom-select required"
                            noOptionsMessage={() => "No Options Found"}
                            value={formFields.amountorpercent}
                            onChange={handleSelectChange}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <input
                            type="text"
                            name="value"
                            id="value"
                            className="form-control essential_required required"
                            value={formFields.value}
                            onChange={handleDataInputChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="form-group col-md-3 phps_row_1">
                          <select
                            name="sel_durationfrom"
                            id="sel_durationfrom"
                            className="form-control form-control-sm"
                            multiple
                            size={3}
                            style={{ height: "80px" }}
                            onChange={(e) => handleRowSelect(e.target.value)}
                          >
                            {policyratesData.map((data, index) => (
                              <option
                                key={index}
                                value={index}
                                selected={selectedIndex === index}
                              >
                                {data.fromDuration}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-3 phps_row_1">
                          <select
                            name="sel_durationto"
                            id="sel_durationto"
                            className="form-control form-control-sm"
                            multiple
                            size={3}
                            style={{ height: "80px" }}
                            onChange={(e) => handleRowSelect(e.target.value)}
                          >
                            {policyratesData.map((data, index) => (
                              <option
                                key={index}
                                value={index}
                                selected={selectedIndex === index}
                              >
                                {data.toDuration}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-3 phps_row_1">
                          <select
                            name="sel_percentoramount"
                            id="sel_percentoramount"
                            className="form-control form-control-sm"
                            multiple
                            size={3}
                            style={{ height: "80px" }}
                            onChange={(e) => handleRowSelect(e.target.value)}
                          >
                            {policyratesData.map((data, index) => (
                              <option
                                key={index}
                                value={index}
                                selected={selectedIndex === index}
                              >
                                {data.amountorpercent.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-3 phps_row_1">
                          <select
                            name="sel_value"
                            id="sel_value"
                            className="form-control form-control-sm"
                            multiple
                            size={3}
                            style={{ height: "80px" }}
                            onChange={(e) => handleRowSelect(e.target.value)}
                          >
                            {policyratesData.map((data, index) => (
                              <option
                                key={index}
                                value={index}
                                selected={selectedIndex === index}
                              >
                                {data.value}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-12 mt-3">
                    <button
                      className="btn btn-dark btn-sm"
                      type="button"
                      name="Submit"
                      value="submit"
                      onClick={handleSubmit}
                    >
                      <i className="fa fa-floppy-o" />
                      &nbsp;Save
                    </button>
                    {/* <button className="btn btn-dark btn-sm mx-1" type="reset" name="reset" value="Reset" >
                          <i className="fa fa-repeat" />&nbsp;Reset
                        </button> */}
                  </div>
                  <div className="form-group col-md-12">
                    {/* <div id='loading_img' style='position: absolute; display: none; padding:60px 0px 0px 490px'><center><img src='images/indicator.gif' alt=""></center></div> */}
                  </div>
                </div>
              </div>
              <div id="dataPolicyDisplay" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(AddCancellationPolicy);
