import { flightproviders_options } from "../../../constants/contants";
import excelfilereader from "../../../constants/excelfilereader";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Swal from "sweetalert2";
import excelFileContent from "../../../ExcelFiles/Airport_and_Airline_Code_List.xlsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flightAddCancellationRules } from "../../../Apis/API";
import { Slide, toast } from "react-toastify";
import Constants from "../../../constants/routes";

const FlightCancellationAddRule = () => {
  const [airlineData, setAirlineData] = useState([]);
  const [formData, setFormData] = useState({
    addRule: "",
    leadTime: "",
    status: "Active",
    airline: [],
    flightProvider: [],
  });
  const fetchExcelData = async () => {
    try {
      // Pass the Excel file content directly to the readExcelFile function
      const data = await excelfilereader(excelFileContent);

      setAirlineData(data.AirlineList);
    } catch (error) {}
  };
  useEffect(() => {
    fetchExcelData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const airlineOptions = airlineData.map((airline) => ({
    label: airline.Airlinename,
    value: airline.Airlinecode,
  }));

  const handleMultiSelectChange = (selectedOption, fieldName) => {
    const selectedValues = selectedOption.map((option) => option.value);
    const updatedValues = selectedValues.includes("")
      ? selectedValues.filter((val) => val !== "")
      : selectedValues;
    setFormData({ ...formData, [fieldName]: updatedValues });
  };
  // Event handler for form inputs change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const checkRequired = (cancellationdata) => {
    if (
      cancellationdata.addRule === "" ||
      cancellationdata.addRule === undefined
    ) {
      Swal.fire(
        "Rule name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    if (
      cancellationdata.leadTime === "" ||
      cancellationdata.leadTime === undefined
    ) {
      Swal.fire(
        "Lead Time is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    return true;
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isSuccessfull = checkRequired(formData);
    if (isSuccessfull) {
      try {
        const response = await flightAddCancellationRules(formData);

        if (response.data.statusCode === 200) {
          toast.success("Flight Cancelation Rules Added Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });

          setFormData({
            addRule: "",
            leadTime: "",
            status: "Active",
            airline: [],
            flightProvider: [],
          });
          navigate(Constants.URLConstants.FLIGHTFLIGHTCANCELLATIONSEARCHRULES);
        }
      } catch (error) {}
    }
  };
  return (
    <>
      <Header2
        title="ADD CANCELLATION RULE"
        linkText1="ADD Cancellation Rule"
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 form-group">
                <label>Rule Name</label>
                <input
                  type="text"
                  name="addRule"
                  value={formData.addRule}
                  onChange={handleInputChange}
                  maxLength={50}
                  className="form-control form-control-sm required test123"
                />
                <br />
              </div>

              <div className="col-md-3 form-group">
                <label>Lead Time (HRS) : </label>
                <input
                  type="text"
                  name="leadTime"
                  value={formData.leadTime}
                  onChange={handleInputChange}
                  maxLength={100}
                  className="form-control form-control-sm required"
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Status:</label>
                <br />
                <div className="radioline1">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="status_active"
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleInputChange}
                      name="status"
                    />
                    <label htmlFor="status_active">Active</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="status_inactive"
                      value="In Active"
                      checked={formData.status === "In Active"}
                      onChange={handleInputChange}
                      name="status"
                    />
                    <label htmlFor="status_inactive">In Active</label>
                  </div>
                </div>
              </div>
              <div className="col-md-3 form-group">
                <label>Flight Providers : </label>
                <MultiSelect
                  options={flightproviders_options}
                  isSearchable
                  isMulti
                  placeholder="- Select Flight Providers -"
                  onChange={(selectedOption) =>
                    handleMultiSelectChange(selectedOption, "flightProvider")
                  }
                  className="custom-select"
                  noOptionsMessage={() => "No Flight Providers Found"}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Airline: </label>
                <MultiSelect
                  options={airlineOptions}
                  isSearchable
                  isMulti
                  placeholder="- Select Airline -"
                  className="custom-select"
                  noOptionsMessage={() => "No Airline Found"}
                  onChange={(selectedOption) =>
                    handleMultiSelectChange(selectedOption, "airline")
                  }
                />
              </div>
            </div>
            <div className="clearfix" />
            <div className="row mt-3">
              <div className="form-group col-md-12">
                <button type="submit" name="b1" className="btn btn-dark btn-sm">
                  <i className="fa fa-plus" />
                  &nbsp;Add Cancellation Rule
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default FlightCancellationAddRule;
