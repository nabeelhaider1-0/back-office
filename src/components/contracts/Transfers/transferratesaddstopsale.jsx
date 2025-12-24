/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, } from "react";
import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { connect } from "react-redux";
import Constants from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { ErrorApiAlert, RequiredFieldAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import { postDATA } from "../../../Apis/API";
import ApiRoutes from "../../../constants/ApiRoutes"






const ContractsTransfersRatesAddStopSale = ({data}) => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date
  const [transferOptions, setTransferOptions] = useState([]);
  const [selectedTransfers, setSelectedTransfers] = useState();
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };
  
  const navigateOnRefresh = useNavigate();
  useEffect(() => {
   
  
    if (data && Object.keys(data).length > 0) {
      

      const options = data.transfers.map((trans) => ({
        value: trans.uuid,
        label: trans.transferName,
      }));
 
      setTransferOptions(options);
      const currentTransfer = data.currentTransfer;

      const matchingTransfer = data.transfers.find(transfer => transfer.transferName === currentTransfer);
      
      if (matchingTransfer) {
          const result = { label: matchingTransfer.transferName, value: matchingTransfer.uuid };
        setSelectedTransfers(result);
      } else {
         
      }
     }
  
     else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON);
    }
  }, [data, navigateOnRefresh]);
  const redirect = async () =>
    {navigateOnRefresh(Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON);}

 // Perform checks and redirect in useEffect
 useEffect(() => {
   if (!data || data.supplierName === undefined || data.supplierName === null) {
     redirect();
   }
   if (!data || data.currentTransfer === undefined || data.currentTransfer === null) {
     redirect();
   }
 }, [data]);
 const handleTransferChange = (selectedOptions) => {
  setSelectedTransfers(selectedOptions);

};
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding leading zero if needed
  const day = date.getDate().toString().padStart(2, "0"); // Adding leading zero if needed
  return `${month}/${day}/${year}`;
};

const checkRequired = (stopsale) => {
  if (stopsale.supplieruuid === "" || stopsale.supplieruuid === undefined) {
    RequiredFieldAlert(
      "Supplier is required",
      "Please select Transfer",
      "error"
    );
    return false;
  }
  if (stopsale.transferuuid === "" || stopsale.transferuuid === undefined) {
    RequiredFieldAlert(
      "Transfer is required",
      "Please select Transfer",
      "error"
    );
    return false;
  }


  if (stopsale.transferfrom === "" ||stopsale.transferfrom === "01/01/1970" || stopsale.transferfrom === undefined||stopsale.transferto === "" ||stopsale.transferto === "01/01/1970" || stopsale.transferto === undefined) {
    RequiredFieldAlert(
        "Date is required",
        "Please fill in the required fields",
        "error"
      );
  return false;
}

  
  
 

  return true;
};
const handleSubmit = async (e) => {
  e.preventDefault();
 // Assign values to formData fields based on conditions
 const transferfrom = new Date(startDate);
    const transferto = new Date(endDate);
const requestBody={
  transferuuid:selectedTransfers.value,
      supplieruuid:data.uuid,
       transferfrom:formatDate(transferfrom),
       transferto:formatDate(transferto)
 
}



const isSuccessfull = checkRequired(requestBody);
   if (isSuccessfull) {
try {
   
    const response = await postDATA(requestBody,ApiRoutes.TRANSFERS.TRANSFER_TARIFF_STOP_SALE);

    if (response.data.statusCode === 200) {
     
      SuccessApiToast( "Stop Sale Added Successfully");
      
      navigateOnRefresh(Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON);
    }
  } catch (error) {
    ErrorApiAlert('Error Adding Stop Sale');
    
  }

   }
};
  return (
    <>
      <Header2 title="VIEW STOP SALE" />
      <div class="container-fluid pt-0 p-4" id="content-pad">

        <form onSubmit={handleSubmit}> 
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 form-group">
                <label>Supplier</label>
                <p style={{ fontSize: '14px !important' }}>
                {data && data.supplierName !== undefined && data.supplierName !== null ? data.supplierName : "Supplier Name is undefined"}
                  <input id="sel_supplier_stop_sale" name="sel_supplier_stop_sale" type="hidden" defaultValue="S000000003" className="form-control form-control-sm" />
                </p>
              </div>
              <div className="col-md-3 form-group">
                <label>Select Transfer</label>
                {/* code added by rakesh for CC option */}
                <MultiSelect
                  options={transferOptions}
                  isSearchable
                  value={selectedTransfers}
                  placeholder="- Select Transfer -"
                  className="custom-select"
                  noOptionsMessage={() => "No Transfer Found"}
                  required
                  onChange={handleTransferChange}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Transfer Date</label>
                <div className="input-group date input-daterange" id="transferDate">
                  <Flatpickr
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                    required
                  />

                  <span class="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                    required
                  />
                  <span className="input-group-addon" id="checkTrashBtn" onClick={handleTrashClick}>
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3 form-group">
                <button className="btn btn-dark btn-sm search" type="submit" name="save_button" value="Save" id="submit_button" >
                  <i className="fa fa-floppy-o" /> Save
                </button>
              </div>
            </div>
          </div>
        </form>





      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(ContractsTransfersRatesAddStopSale);