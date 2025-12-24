// import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomersAgentView = ({ data }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
    } else {
      navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    }
  }, [data, navigate]);
  const formatDate = (regdate) => {
    const date = new Date(regdate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  const modalImageSetter = (image) => {
    setCurrentImage(image);
  };
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="VIEW AGENT DETAILS"
          linkText1=" Search Agent"
          linkText2="View Agent"
          link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON}
        />

        <div>
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
                <h5
                  style={{
                    color: "white",
                    fontSize: "15px",
                    marginLeft: "20px",
                  }}
                >
                  {data.agencyName &&
                  data.agentName &&
                  data.status !== undefined
                    ? `${data.agencyName} / ${data.agentName} / ${
                        data.status ? "Active" : "In Active"
                      }`
                    : ""}
                </h5>
              </div>
            </div>
          </div>
          <form>
            <div className="panel-body">
              {/* <div className="form-group" style={{textAlign: 'center', float: 'right', display: 'flex'}}>
        <div className="input-group-addon">
          <Link to={Constants.URLConstants.CUSTOMERSAGENTSEDIT} data-bs-toggle="tooltip" title="Edit" data-placement="top">
       
            <i className="fa fa-pencil-square-o" />
          </Link>
        </div>
        <div className="input-group-addon">
          <Link to={Constants.URLConstants.CUSTOMERSAGENTSONLINESUPPLIERSETTING} data-bs-toggle="tooltip" title="Online Supplier Settings" data-placement="top">
  
            <i className="fa fa-cogs" />
          </Link>
        </div>
        <div className="input-group-addon">
          <Link to={Constants.URLConstants.CUSTOMERSAGENTSOFFLINESUPPLIERSETTING} data-bs-toggle="tooltip" title="Offline Supplier Settings" data-placement="top">
            <i className="fa fa-wrench" />
          </Link>
        </div>
        <div className="input-group-addon">
          <Link to="agent.php?action=gateway&id=319&branch_search=&consultant_search=&agent_type_search=&country_srch=&agency_name_search=&username_search=&status_search=&person_name_search=&search=agent&country_search=&city_search=&currency_search=&rate_profile_search=&email_search=&agency_id_search=" data-bs-toggle="tooltip" title="Gateway" data-placement="top">
            <i className="fa fa-credit-card" />
          </Link>
        </div>
        <div className="input-group-addon">
          <Link to="agent.php?action=inactive&id=319&admin_id=shiv&branch_search=&consultant_search=&agent_type_search=&country_srch=&agency_name_search=&username_search=&status_search=&person_name_search=&search=agent&country_search=&city_search=&currency_search=&rate_profile_search=&email_search=&agency_id_search=" data-bs-toggle="tooltip" data-placement="top" title>
         
            <i className="fa fa-check-circle" />
          </Link>
        </div>
        <div className="input-group-addon">
          <Link to="#" onclick="Javacsript:window.open(&quot;http://beta.tdonlines.com/tms/resend_email.php?action=agent_registration_email&agent_id=319&branch_search=&consultant_search=&agent_type_search=&country_srch=&agency_name_search=&username_search=&status_search=&person_name_search=&search=agent&country_search=&city_search=&currency_search=&rate_profile_search=&email_search=&agency_id_search=&quot;,&quot;RegEmail&quot;,&quot;width=400,height=400&quot;)" data-bs-toggle="tooltip" title="Reg.Email" data-placement="top">
       
            <i className="fa fa-envelope-o" />
          </Link>
        </div>
        <div className="input-group-addon">
          <Link to="#" onclick="Javacsript:window.open(&quot;http://beta.tdonlines.com/tms/resend_email.php?action=agent_confirmation_email&agent_id=319&branch_search=&consultant_search=&agent_type_search=&country_srch=&agency_name_search=&username_search=&status_search=&person_name_search=&search=agent&country_search=&city_search=&currency_search=&rate_profile_search=&email_search=&agency_id_search=&quot;,&quot;RegEmail&quot;,&quot;width=200,height=200&quot;)" data-bs-toggle="tooltip" title="Conf.Email" data-placement="top">
          
            <i className="fa fa-envelope" />
          </Link>
        </div>
        <div className="input-group-addon">
          <Link to="login_as_agent.php?id=319&username=shiv&password=d777cb83434761edd5a0fbb4a992215eb1103e6c12fb165583a1665ad050fecc&agent_code=CA0319&action_type=login&a=1&FLAG=AS_AD" target="_blank" data-bs-toggle="tooltip" title="Login as Admin" data-placement="top">
       
            <i className="fa fa-sign-in" />
          </Link>
        </div>
        <div className="input-group-addon">
          <Link to="http://beta.tdonlines.com/agent_login.php?action_type=login&txt_username=shiv&txt_password=d777cb83434761edd5a0fbb4a992215eb1103e6c12fb165583a1665ad050fecc&txt_agent_code=CA0319&FLAG=AS_AG&tms=1" target="_blank" data-bs-toggle="tooltip" title="Login As Agent" data-placement="top">
  
            <i className="fa fa-sign-in" />
          </Link>
        </div>
   
      </div> */}
              <br />
              <div className="form-group">
                <h5>Access</h5>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Username</label>
                  <div>{data.userName}</div>
                </div>
              </div>
              <div className="form-group mt-3">
                <h5>Agency Information</h5>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Agency Name</label>
                  <div>{data.agencyName}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Register Since</label>
                  <div>{formatDate(data.timestamps.createdAt)}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Company (Agency Email)</label>
                  <div>{data.agencyEmail}</div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Agent Name</label>
                  <div>{data.agentName}</div>
                </div>
              </div>
              <div className="row mt-2 mb-2">
                <div className="form-group col-md-3">
                  <label>Agent Logo</label>
                  {data.image === "" || data.image === null ? (
                    <div>
                      <div className>No Preview. </div>
                    </div>
                  ) : (
                    <div
                      className="hotelmainimage mb-4"
                      onClick={() => {
                        modalImageSetter(data.image);
                      }}
                    >
                      <img
                        src={data.image}
                        alt="Agent Logo"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Designation</label>
                  <div>{data.designation}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Nature of Business</label>
                  <div>{data.natureofbusiness}</div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <label>Address</label>
                  <div>{data.address}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>City</label>
                  <div>{data.city}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Pincode/ Zipcode</label>
                  <div>{data.pinorzip}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>IATA Status</label>
                  <div> {data.iatastatus ? "Approved" : "Not Approved"} </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Phone #</label>
                  <div>{data.phone}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Mobile #</label>
                  <div>{data.mobile}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Fax #</label>
                  <div>{data.fax}</div>
                </div>
              </div>
              <div className="form-group mt-3">
                <h5>Agent Settings</h5>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Time Zone</label>
                  <div>{data.timeZone}</div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Agent Type</label>
                  <div>- </div>
                </div>
                <div className="form-group col-md-3">
                  <label>Credit Limit</label>
                  <div>-</div>
                </div>
                {/*<div class="form-group col-md-3">
    <label>Lead Time</label>
    <div id='agent_type'>
                                      0
  &nbsp;hours
    </div>
</div>	*/}
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Branch</label>
                  <div>{data.branch.branchName}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Consultant</label>
                  <div>
                    {data.consultant &&
                    data.consultant.firstName &&
                    data.consultant.lastName
                      ? `${data.consultant.firstName} ${data.consultant.middleName} ${data.consultant.lastName}`
                          .replace(/\s+/g, " ")
                          .trim()
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="form-group mt-3">
                <h5>Rights</h5>
              </div>
              <div className="row">
                {data.rights.map((right) => (
                  <div key={right.uuid} className="col-md-3 mb-3">
                    <div className="form-group">
                      <label>{right.rightName}</label>
                      <div>Yes</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Modal */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content imageWidthSetter">
                  <div className="modal-body bodyimagecross">
                    <button
                      type="button"
                      className="btn-close imagebtnclose"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                    <img
                      src={currentImage}
                      alt="Main Hotel Pic"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="modalShowImage"
                    />
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

export default connect(mapStateToProps)(CustomersAgentView);
