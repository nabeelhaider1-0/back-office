/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";

import MultiSelect from "../reactMultiSelect";
import { useEffect, useState } from "react";
import { deleteEmailSetting, getEmailSearch } from "../../Apis/API";
import loadingGif from "../../assets/images/loadingblue.gif";
import { setEditEmailData } from "../../state/action/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";

const EmailSearch = ({ setEditEmailData }) => {
  // const handleEdditClick = (email) => {
  //     email.selectedrecipient=email.recipientType;
  //     email.selectedemailtype=email.emailType;
  //     email.recipientType=getRecipentTypeWithLabelValue(emailData);
  //     email.emailType=getEmailTypeWithLabelValue(emailData);

  //     setEditEmailData(email); // Dispatch the action to set the editBranchData in the Redux store
  // };

  const [loading, setLoading] = useState(true); // Initially, set loading to true

  const [emailData, setEmailData] = useState([]);
  const [originalEmailData, setOriginalEmailData] = useState([]);
  function getEmailTypeWithLabelValue(emailData) {
    const uniqueUserNames = [
      ...new Set(emailData.map((type) => type.emailType)),
    ];
    const uniqueUserNamesWithLabelValue = uniqueUserNames.map((emailType) => ({
      label: emailType,
      value: emailType,
    }));
    return uniqueUserNamesWithLabelValue;
  }
  function getRecipentTypeWithLabelValue(emailData) {
    // Filter out empty recipientType values
    const filteredUniqueUserNames = [
      ...new Set(emailData.map((recipent) => recipent.recipientType)),
    ].filter((type) => type.trim() !== "");

    // Map the filtered uniqueUserNames to objects with label and value
    const uniqueUserNamesWithLabelValue = filteredUniqueUserNames.map(
      (recepientType) => ({
        label: recepientType,
        value: recepientType,
      })
    );

    return uniqueUserNamesWithLabelValue;
  }

  const getEmails = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getEmailSearch();

      if (response.data.statusCode === 200) {
        const emails = response && response.data.data ? response.data.data : [];

        setEmailData(emails);
        setOriginalEmailData(emails);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  useEffect(() => {
    getEmails();
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereEmailData = originalEmailData.filter((email) =>
      email.email.toLowerCase().includes(value.toLowerCase())
    );

    setEmailData(filtereEmailData);
  };
  const [searchUserData, setSearchUserData] = useState({
    email_search: "",
    email_type: "",
    recepient_type: "",
  });

  const handleUserSearchInputChange = (event) => {
    const { name, value } = event.target;
    setSearchUserData((prevSearchUserData) => ({
      ...prevSearchUserData,
      [name]: value,
    }));
  };
  const handleUserSearchDropdownChange = (selectedOption, name) => {
    setSearchUserData((prevSearchUserData) => ({
      ...prevSearchUserData,
      [name]: selectedOption,
    }));
  };

  const handleUserSearchSubmit = (event) => {
    event.preventDefault();

    const filteredEmailData = originalEmailData.filter((email) => {
      const lowerEmail = email.email ? email.email.toLowerCase() : "";
      const lowerEmailType = email.emailType
        ? email.emailType.toLowerCase()
        : "";
      const lowerRecipientType = email.recipientType
        ? email.recipientType.toLowerCase()
        : "";

      const emailSearch = searchUserData.email_search
        ? searchUserData.email_search.toLowerCase()
        : "";
      const emailTypeValue = searchUserData.email_type
        ? searchUserData.email_type.value.toLowerCase()
        : "";
      const recipientTypeValue = searchUserData.recepient_type
        ? searchUserData.recepient_type.value.toLowerCase()
        : "";

      return (
        lowerEmail.trim().includes(emailSearch.trim()) &&
        (emailTypeValue === "" ||
          lowerEmailType.trim().includes(emailTypeValue.trim())) &&
        (recipientTypeValue === "" ||
          lowerRecipientType.trim().includes(recipientTypeValue.trim()))
      );
    });

    setEmailData(filteredEmailData);
  };

  const handleDeleteClick = async (uuid) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-warning swal-confirm",
        cancelButton: "btn btn-default swal-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "Are You Sure You Want To Delete This Email Setting ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteEmailSetting(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "EmailSetting has been deleted successfully.",
                icon: "success",
              });

              setEmailData((prevEmailData) =>
                prevEmailData.filter((email) => email.uuid !== uuid)
              );
              setOriginalEmailData((prevEmailData) =>
                prevEmailData.filter((email) => email.uuid !== uuid)
              );
            }
          } catch (error) {
            swalWithBootstrapButtons.fire({
              title: "Error On Deletion",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  const resetform = async () => {
    setEmailData(originalEmailData);
    setSearchUserData({
      email_type: "",
      email_search: "",
      recepient_type: "",
    });
  };

  return (
    <>
      <Header2
        title="EMAIL SEARCH CRITERIA "
        linkText1=" List Email Setting"
        linkText2="Add email setting"
        link2={Constants.URLConstants.EMAILNEW}
      />

      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleUserSearchSubmit}>
          <div className="row mt-2">
            <div className="col-md-3 form-group">
              <label>Email Type</label>
              <MultiSelect
                options={getEmailTypeWithLabelValue(originalEmailData)}
                isSearchable
                placeholder="- Select Email Type -"
                className="custom-select"
                name="email_type"
                value={searchUserData.email_type}
                onChange={(selectedOption) =>
                  handleUserSearchDropdownChange(selectedOption, "email_type")
                }
              />
            </div>
            <div className="form-group col-md-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control form-control-sm"
                name="email_search"
                value={searchUserData.email_search}
                onChange={handleUserSearchInputChange}
              />
            </div>
            <div className="col-md-3 form-group">
              <label>Recepient Type</label>
              <div name="email_recepient_serach">
                <MultiSelect
                  options={getRecipentTypeWithLabelValue(originalEmailData)}
                  isSearchable
                  placeholder="- Select Recipient Type -"
                  className="custom-select"
                  name="recepient_type"
                  value={searchUserData.recepient_type}
                  onChange={(selectedOption) =>
                    handleUserSearchDropdownChange(
                      selectedOption,
                      "recepient_type"
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-2 form-group">
              <span id="submit_td">
                <button className="btn btn-dark btn-sm">
                  <i className="fa fa-search" aria-hidden="true"></i> Search
                </button>
              </span>
              &nbsp;&nbsp;
              <button
                className="btn btn-outline-secondary btn-sm"
                type="reset"
                id="reset"
                name="reset"
                value="Reset"
                onClick={() => resetform()}
                data
              >
                <i className="fa fa-repeat" /> &nbsp;Reset
              </button>
            </div>
          </div>
        </form>
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form class="mt-3">
              <div class="dataTables_scroll">
                <div class="row pd_tp">
                  <div class="row">
                    <div class="col-md-4 col_hide">
                      <div class="form-group col-md-12">&nbsp;</div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="custPaging pgType2">
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            class="custPaging  pgType2"
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td align="center" width="70%"></td>
                                <td align="right" width="30%"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 search_option">
                      <div
                        class="form-group col-md-2 new_search_icon"
                        style={{ textAlign: "right", paddingRight: "0px" }}
                      >
                        <h5 style={{ display: "inline;" }}>
                          <i
                            class="fa fa-search srchWithinPg"
                            id="magnifiers1"
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Search within this table"
                          ></i>
                        </h5>
                      </div>
                      <div class="form-group col-md-10 bookingsrc">
                        <input
                          type="text"
                          class="tablesearch form-control form-control-sm search_new"
                          placeholder="Email"
                          value={searchInput}
                          onChange={handleInputSearchChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="container-fluid mt-3">
                  <div
                    id="search_sup_wrapper"
                    class="dataTables_wrapper form-inline dt-bootstrap no-footer table table-bordered"
                  >
                    <div class="row">
                      <div class="col-sm-6"></div>
                      <div class="col-sm-6"></div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div
                          class="doubleScroll-scroll-wrapper"
                          id="wrapper1"
                          style={{ height: "20px,", width: "1320px" }}
                        >
                          <div
                            class="suwala-doubleScroll-scroll"
                            style={{ height: "20px,", width: "1320px" }}
                          ></div>
                        </div>
                        <div id="wrapper2" style={{ overflow: "auto" }}>
                          <table
                            id="search_sup"
                            class="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                            aria-describedby="search_sup_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "267.889px" }}
                                >
                                  Email Type{" "}
                                </th>
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "314.889px " }}
                                >
                                  Email
                                </th>
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "129.889px " }}
                                >
                                  Recepient Type{" "}
                                </th>
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "588.889px  " }}
                                >
                                  Email Description{" "}
                                </th>
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "106px" }}
                                >
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {emailData.map((email, index) => (
                                <tr
                                  key={index}
                                  className={`phps_row_${
                                    index % 2 === 0 ? "0 even" : "1 odd"
                                  }`}
                                  role="row"
                                >
                                  <td>{email.emailType}</td>
                                  <td>{email.email}</td>
                                  <td>{email.recipientType}</td>
                                  <td>{email.description}</td>
                                  <td className="actionlink">
                                    <div
                                      className="actionCont"
                                      style={{
                                        width: "58px",
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <div className="input-group-addon">
                                        <Link
                                          onClick={() =>
                                            handleDeleteClick(email.uuid)
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title=""
                                          data-original-title="Delete"
                                        >
                                          <i className="fa fa-trash"></i>
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div
                          class="dataTables_info"
                          id="search_sup_info"
                          role="status"
                          aria-live="polite"
                        ></div>
                      </div>
                      <div class="col-sm-6"></div>
                    </div>
                  </div>

                  <br />
                  <div class="row pd_tp">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group col-md-12 col_hide">&nbsp;</div>
                      </div>
                      <div class="col-md-5">
                        <div class="form-group">
                          <div class="custPaging pgType2">
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              class="custPaging  pgType2"
                            >
                              <tbody className="bg-white">
                                <tr>
                                  <td align="center" width="70%"></td>
                                  <td align="right" width="30%"></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 col_hide">&nbsp;</div>
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
    </>
  );
};
export default connect(null, { setEditEmailData })(EmailSearch);
