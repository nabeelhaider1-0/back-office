import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { useEffect, useState } from "react";
import { deleteReminderSetting, getAllReminders } from "../../Apis/API";
import loadingGif from "../../assets/images/loadingblue.gif";
import { setReminderDataRedux } from "../../state/action/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";

const SettingReminderSearch = ({ setReminderDataRedux }) => {
  const handleEdditClick = (reminder) => {
    setReminderDataRedux(reminder); // Dispatch the action to set the editBranchData in the Redux store
  };

  const [reminderData, setReminderData] = useState([]);
  const [originalReminderData, setOriginalReminderData] = useState([]);
  const [loading, setLoading] = useState(true); // Initially, set loading to true

  function getSetbyWithLabelValue(setByData) {
    const uniqueUserNames = [
      ...new Set(setByData.map((type) => type.userName)),
    ];
    const uniqueUserNamesWithLabelValue = uniqueUserNames.map((userName) => ({
      label: userName,
      value: userName,
    }));
    return uniqueUserNamesWithLabelValue;
  }

  const gEtReminders = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getAllReminders();

      if (response.data.statusCode === 200) {
        const reminders = response.data.data || [];

        setReminderData(reminders);
        setOriginalReminderData(reminders);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  useEffect(() => {
    gEtReminders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        text: "Are You Sure You Want To Delete This Reminder Setting ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteReminderSetting(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "EmailSetting has been deleted successfully.",
                icon: "success",
              });

              setReminderData((prevReminderData) =>
                prevReminderData.filter((reminder) => reminder.uuid !== uuid)
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

  const [searchInput, setSearchInput] = useState("");

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredReminderData = originalReminderData.filter((reminder) =>
      reminder.note.toLowerCase().includes(value.toLowerCase())
    );

    setReminderData(filteredReminderData);
  };

  const [searchReminderData, setSearchReminderData] = useState({
    messageInput: "",
    bookingIdInput: "",
    setBy: "",
  });
  const handleReminderSearchInputChange = (event) => {
    const { name, value } = event.target;
    setSearchReminderData((prevsearchReminderData) => ({
      ...prevsearchReminderData,
      [name]: value,
    }));
  };
  const handleReminderSearchDropdownChange = (selectedOption, name) => {
    setSearchReminderData((prevsearchReminderData) => ({
      ...prevsearchReminderData,
      [name]: selectedOption,
    }));
  };
  const handleUserSearchSubmit = (event) => {
    event.preventDefault();
    const filteredReminderData = originalReminderData.filter((reminder) => {
      const lowerMessage = reminder.note.toLowerCase();
      const lowerBookingId = reminder.bookingId.toLowerCase();
      const lowerSetBy = reminder.userName.toLowerCase();
      const setByValue = searchReminderData.setBy
        ? searchReminderData.setBy.value.toLowerCase()
        : "";
      return (
        lowerMessage.includes(searchReminderData.messageInput.toLowerCase()) &&
        lowerBookingId.includes(
          searchReminderData.bookingIdInput.toLowerCase()
        ) &&
        (setByValue === "" || lowerSetBy.includes(setByValue))
      );
    });

    setReminderData(filteredReminderData);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SEARCH NOTE"
          linkText1="Search Note"
          linkText2="Compose Note"
          link2={Constants.URLConstants.SETTINGREMINDERNEW}
        />

        <div>
          <form onSubmit={handleUserSearchSubmit}>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 form-group">
                  <label>Message</label>
                  <input
                    type="text"
                    name="messageInput"
                    size={30}
                    className="form-control form-control-sm test123"
                    value={searchReminderData.messageInput}
                    onChange={handleReminderSearchInputChange}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Set By</label>

                  <MultiSelect
                    options={getSetbyWithLabelValue(originalReminderData)}
                    // isMulti
                    isSearchable
                    placeholder="- Select -"
                    noOptionsMessage={() => "No Options Found"}
                    className="custom-select "
                    name="setBy"
                    onChange={(selectedOption) =>
                      handleReminderSearchDropdownChange(
                        selectedOption,
                        "setBy"
                      )
                    }
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Booking ID</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="bookingIdInput"
                    value={searchReminderData.bookingIdInput}
                    onChange={handleReminderSearchInputChange}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3 form-group">
                  <button
                    className="btn btn-dark btn-sm"
                    onclick="javascriptcallSearch(document.forms['search_note_from']);"
                  >
                    <i className="fa fa-search" />
                    &nbsp;Search
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
          {loading && (
            <div className="text-center">
              <img src={loadingGif} alt="Loading..." height={250} />
            </div>
          )}
          {!loading && (
            <>
              <form>
                <div className="panel-body removeMargins">
                  <div className="row pd_tp">
                    <div className="row">
                      <div className="col-md-4 col_hide">
                        <div className="form-group col-md-12">&nbsp;</div>
                      </div>
                      <div className="col-md-5 col_hide">
                        <div className="custPaging" />
                      </div>
                      <div className="col-md-3">
                        <style
                          dangerouslySetInnerHTML={{
                            __html:
                              "\n                                .table tr[visible='false'],\n                                .no-result {\n                                    display: none;\n                                    border: 1px solid #ddd;\n                                    padding: 10px;\n                                    margin-top: -2px;\n                                }\n\n                                .table tr[visible='true'] {\n                                    display: table-row;\n                                }\n\n                                .counter {\n                                    padding: 8px;\n                                    color: #ccc;\n                                }\n\n                                .search_new {\n                                    float: right;\n                                    height: 35px;\n                                    margin-bottom: 0px;\n                                    padding-left: 5px;\n                                }\n                            ",
                          }}
                        />
                        <div
                          className="form-group col-md-2 new_search_icon"
                          style={{ textAlign: "right", paddingRight: "0px" }}
                        >
                          <h5 style={{ display: "inline" }}>
                            <i
                              className="fa fa-search srchWithinPg"
                              id="magnifiers"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Search within this table"
                            />
                          </h5>
                        </div>
                        <div className="form-group col-md-10 bookingsrc">
                          <input
                            type="text"
                            className="tablesearch form-control form-control-sm search_new"
                            placeholder="Message Search"
                            value={searchInput}
                            onChange={handleInputSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <div
                        className="doubleScroll-scroll-wrapper"
                        id="wrapper1"
                        style={{
                          height: "20px",
                          overflow: "scroll hidden",
                          width: "1491.4px",
                        }}
                      >
                        <div
                          className="suwala-doubleScroll-scroll"
                          style={{ height: "20px", width: "1491px" }}
                        />
                      </div>
                      <div id="wrapper2" style={{ overflow: "auto" }}>
                        <table
                          id="search_sup"
                          className="table table-bordered   table-responsive dataTable no-footer"
                          role="grid"
                          aria-describedby="search_sup_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "358.2px" }}
                              >
                                &nbsp;Message
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "134.2px" }}
                              >
                                &nbsp;Set By
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "218.2px" }}
                              >
                                &nbsp;Booking Id
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "170.2px" }}
                              >
                                &nbsp;Set Date
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "309px" }}
                              >
                                &nbsp;Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {reminderData.map((reminder, index) => (
                              <tr key={index}>
                                <td align="center">{reminder.note}</td>
                                <td align="center">{reminder.userName}</td>
                                <td align="center">{reminder.bookingId}</td>
                                <td>
                                  <div className="dateWrapper withTime">
                                    <div className="onlyDate">
                                      {new Date(
                                        reminder.timestamps.createdAt
                                      ).getDate()}
                                    </div>
                                    <div className="monthYear">
                                      {new Date(
                                        reminder.timestamps.createdAt
                                      ).toLocaleString("default", {
                                        month: "short",
                                      })}
                                      <br />
                                      {new Date(
                                        reminder.timestamps.createdAt
                                      ).getFullYear()}
                                    </div>
                                  </div>
                                  <div className="secCont">
                                    {new Date(
                                      reminder.timestamps.createdAt
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                </td>
                                <td align="center" className="actionlink">
                                  <div className="actionCont">
                                    <div className="input-group-addon">
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .SETTINGREMINDERVIEW
                                        }
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title
                                        data-original-title="View"
                                        onClick={() =>
                                          handleEdditClick(reminder)
                                        }
                                      >
                                        <i className="fa fa-eye" />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .SETTINGREMINDERSET
                                        }
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title
                                        data-original-title="Set Reminder"
                                        onClick={() =>
                                          handleEdditClick(reminder)
                                        }
                                      >
                                        <i className="fa-regular fa-clipboard">
                                          <sub
                                            className="fa-regular fa-clock"
                                            style={{ marginLeft: "-2px" }}
                                          />
                                        </i>
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        onClick={() =>
                                          handleDeleteClick(reminder.uuid)
                                        }
                                      >
                                        <i className="fa fa-trash" />
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
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default connect(null, { setReminderDataRedux })(SettingReminderSearch);
