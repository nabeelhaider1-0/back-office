import { connect } from "react-redux";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { filterOptionsByValue } from "../../../constants/globalfunctions";
import { timezoneOptions } from "../../../constants/contants";

 
const OfflineSuppliersView = ({data}) => {
    const navigateOnRefresh = useNavigate();
    useEffect(() => {
     
      if (data && Object.keys(data).length > 0) {
  
  
       }
  
       else {
        // If data is not available, navigate to the branch search page
        navigateOnRefresh(Constants.URLConstants.OFFLINESUPPLIERSEARCH);
      }
    }, [data, navigateOnRefresh]);
  
  return (
    <div>
      <Header2
        title="SUPPLIER DETAILS"
        linkText1="List Offline Suppliers "
        linkText2="View Offline Supplier"
        link1={Constants.URLConstants.OFFLINESUPPLIER}
      />
     

     <div className="container-fluid pt-0 p-4" id="content-pad">
    <form>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Supplier Username:</strong></div>
        <div className="col-md-3">{data.userName}</div>
        <div className="col-md-3"><strong>Supplier Name:</strong></div>
        <div className="col-md-3">{data.supplierName}</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Contact Person Name 1:</strong></div>
        <div className="col-md-3">{data.contactPerson1}</div>
        <div className="col-md-3"><strong>Contact Person Name 2:</strong></div>
        <div className="col-md-3">{data.contactPerson2}</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Opening Balance:</strong></div>
        <div className="col-md-3">{data.openingBalance}</div>
        <div className="col-md-3"><strong>Marked Up Percentage:</strong></div>
        <div className="col-md-3">-</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Currency:</strong></div>
        <div className="col-md-3">{data.currency}</div>
        <div className="col-md-3"><strong>Country:</strong></div>
        <div className="col-md-3">{data.country}</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>City:</strong></div>
        <div className="col-md-3">{data.city}</div>
        <div className="col-md-3"><strong>Phone Number:</strong></div>
        <div className="col-md-3">{data.telephone}</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Mobile Number:</strong></div>
        <div className="col-md-3">{data.mobile}</div>
        <div className="col-md-3"><strong>Fax Number:</strong></div>
        <div className="col-md-3">{data.fax}</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Address:</strong></div>
        <div className="col-md-9">{data.supplierAddress}</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Email:</strong></div>
        <div className="col-md-9">
          {data.email.map((email, index) => (
            <React.Fragment key={index}>
              {email}
              {index < data.email.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Reservation Email:</strong></div>
        <div className="col-md-9">
          {data.reservationEmail.map((email, index) => (
            <React.Fragment key={index}>
              {email}
              {index < data.reservationEmail.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Cancellation Email:</strong></div>
        <div className="col-md-9">
          {data.cancellationEmail.map((email, index) => (
            <React.Fragment key={index}>
              {email}
              {index < data.cancellationEmail.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Modification Email:</strong></div>
        <div className="col-md-9">-</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Technical Email:</strong></div>
        <div className="col-md-9">-</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Time Zone:</strong></div>
        <div className="col-md-9">
          {filterOptionsByValue(timezoneOptions, parseInt(data.timeZone.replace(/[^0-9-]/g, '')))[0].label}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Remarks:</strong></div>
        <div className="col-md-9">{data.remarks}</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3"><strong>Commissionable:</strong></div>
        <div className="col-md-9">-</div>
      </div>
    </form>
  </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    data: state.data,
  });
  
  export default connect(mapStateToProps)(OfflineSuppliersView);