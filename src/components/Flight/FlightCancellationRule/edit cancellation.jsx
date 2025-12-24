import { useEffect, useState } from "react";
import { flightproviders_options } from "../../../constants/contants";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { useNavigate } from "react-router-dom";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from "../../../ExcelFiles/Airport_and_Airline_Code_List.xlsx";
import { connect } from "react-redux";
import { Slide, toast } from "react-toastify";
import { updateFlightCancellationRules } from "../../../Apis/API";

const FlightCancellationEditRule = ({ data }) => {
  const [formData, setFormData] = useState({
    addRule: "",
    flightProvider: [],
    airline: [],
    leadTime: "",
  });
  const [airlineData, setAirlineData] = useState([]);
  const navigateOnRefresh = useNavigate();
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
    key: airline.Airlinecode, // Using Airlinecode as the key
  }));

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

  function filterOptionsByMyltivalues(options, value) {
    const filteredOptionMulti = options.filter((option) =>
      value.includes(option.value)
    );

    return filteredOptionMulti;
  }
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        addRule: data.addRule,
        flightProvider: data.flightProvider,
        airline: data.airline,
        leadTime: data.leadTime,
      });
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(
        Constants.URLConstants.FLIGHTFLIGHTCANCELLATIONSEARCHRULES
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateFlightCancellationRules(data.uuid, formData);
      if (response.data.statusCode === 200) {
        setFormData({
          addRule: "",
          flightProvider: [],
          airline: [],
          leadTime: "",
        });

        toast.success("Cancellation Rules Updated Successfully", {
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
        navigate(Constants.URLConstants.FLIGHTFLIGHTCANCELLATIONSEARCHRULES);
      }
    } catch (error) {}
  };
  const [flightMultiSelectCounter, setflightMultiSelectCounter] = useState(0);
  const [airlineMultiSelectCounter, setAirlineMultiSelectCounter] = useState(0);

  function multiSelectValueSetter(
    multiSelectName,
    multiSelectData,
    calledCounter
  ) {
    if (multiSelectName === "flightMultiSelect") {
      if (!formData.flightProvider || formData.flightProvider.length === 0) {
        if (calledCounter === 0) {
          return (formData.flightProvider = filterOptionsByMyltivalues(
            multiSelectData,
            data.flightProvider
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.flightProvider = filterOptionsByMyltivalues(
            multiSelectData,
            formData.flightProvider
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(
          multiSelectData,
          formData.flightProvider
        );
      }
    }
    if (multiSelectName === "airlineMultiSelect") {
      if (!formData.airline || formData.airline.length === 0) {
        if (calledCounter === 0) {
          return (formData.airline = filterOptionsByMyltivalues(
            multiSelectData,
            data.airline
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.airline = filterOptionsByMyltivalues(
            multiSelectData,
            formData.airline
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(multiSelectData, formData.airline);
      }
    }
  }

  return (
    <>
      <Header2
        title="EDIT CANCELLATION RULE"
        linkText1="Cancellation Rules List"
        linkText2="Edit Cancellation Rule"
        link1={Constants.URLConstants.FLIGHTFLIGHTCANCELLATIONSEARCHRULES}
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
                  disabled
                  autoComplete="off"
                  maxLength={50}
                  className="form-control form-control-sm required test123"
                />
                <br />
              </div>
              <div className="col-md-3 form-group">
                <label>Flight Providers : </label>
                <MultiSelect
                  options={flightproviders_options}
                  isSearchable
                  isMulti
                  value={multiSelectValueSetter(
                    "flightMultiSelect",
                    flightproviders_options,
                    flightMultiSelectCounter
                  )}
                  placeholder="- Select Flight Providers -"
                  className="custom-select"
                  noOptionsMessage={() => "No Flight Providers Found"}
                  onChange={(selectedOptions) => {
                    setflightMultiSelectCounter(
                      (prevCounter) => prevCounter + 1
                    );
                    setFormData({
                      ...formData,
                      flightProvider: selectedOptions.map(
                        (option) => option.value
                      ),
                    });
                  }}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Airline: </label>
                <MultiSelect
                  options={airlineOptions}
                  isSearchable
                  isMulti
                  value={multiSelectValueSetter(
                    "airlineMultiSelect",
                    airlineOptions,
                    airlineMultiSelectCounter
                  )}
                  placeholder="- Select Airline -"
                  className="custom-select"
                  noOptionsMessage={() => "No Airline Found"}
                  onChange={(selectedOptions) => {
                    setAirlineMultiSelectCounter(
                      (prevCounter) => prevCounter + 1
                    );
                    setFormData({
                      ...formData,
                      airline: selectedOptions.map((option) => option.value),
                    });
                  }}
                />
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
            </div>
            <div className="clearfix" />
            <div className="row">
              <div className="form-group col-md-12">
                <button type="submit" name="b1" className="btn btn-dark btn-sm">
                  &nbsp;Update Cancellation Rule
                </button>
              </div>
            </div>
          </div>
        </form>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {\n    cursor: not-allowed;\n    background-color: #eee;\n    opacity: 1;\n}\n",
          }}
        />
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(FlightCancellationEditRule);
