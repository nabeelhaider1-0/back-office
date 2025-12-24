import Header2 from "../header2/header2";
import Flatpickr from "react-flatpickr";
import React, { useEffect, useRef, useState } from "react";
import up from "../../assets/images/up_arrow.gif";
import down from "../../assets/images/down_arrow.gif";
import MultiSelect from "../reactMultiSelect";
import {
  AgencyOptions,
  consultantsOptions,
  maxResultsOptions,
  supplierTypeOptions,
} from "../../constants/contants";

const ReportsAccountsInvoices = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const [startDate1, setStartDate1] = useState(null); // State for the start date
  const [endDate1, setEndDate1] = useState(null); // State for the end date

  const handleTrashClick1 = () => {
    // Function to clear both start and end dates
    setStartDate1(null);
    setEndDate1(null);
  };

  const [startDate3, setStartDate3] = useState(null); // State for the start date
  const [endDate3, setEndDate3] = useState(null); // State for the end date

  const handleTrashClick3 = () => {
    // Function to clear both start and end dates
    setStartDate3(null);
    setEndDate3(null);
  };

  const [showBookingDate, setShowBookingDate] = useState(false);

  const toggleBookingDate = () => {
    setShowBookingDate(!showBookingDate);
  };

  const [showServiceDate, setShowserviceDate] = useState(false);

  const toggleServiceDate = () => {
    setShowserviceDate(!showServiceDate);
  };

  const [showStatusDate, setStatusDate] = useState(false);

  const toggleStatusDate = () => {
    setStatusDate(!showStatusDate);
  };

  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };

  const wrapper1Ref = useRef(null);
  const wrapper2Ref = useRef(null);

  useEffect(() => {
    const wrapper1 = wrapper1Ref.current;
    const wrapper2 = wrapper2Ref.current;

    const handleWrapper1Scroll = () => {
      wrapper2.scrollLeft = wrapper1.scrollLeft;
    };

    const handleWrapper2Scroll = () => {
      wrapper1.scrollLeft = wrapper2.scrollLeft;
    };

    if (wrapper1 && wrapper2) {
      wrapper1.addEventListener("scroll", handleWrapper1Scroll);
      wrapper2.addEventListener("scroll", handleWrapper2Scroll);
    }
    // Cleanup event listeners when component unmounts
    return () => {
      if (wrapper1 && wrapper2) {
        wrapper1.removeEventListener("scroll", handleWrapper1Scroll);
        wrapper2.removeEventListener("scroll", handleWrapper2Scroll);
      }
    };
  }, []);

  return (
    <>
      <Header2 title="INVOICES" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Agency</label>
                <MultiSelect
                  options={AgencyOptions}
                  isSearchable
                  placeholder=" Select Agent "
                  className="custom-select"
                  noOptionsMessage={() => "No Agency Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Booking No.</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="txt_booking_id"
                  size={50}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Services</label>
                <MultiSelect
                  options={supplierTypeOptions}
                  isSearchable
                  placeholder="- All -"
                  className="custom-select"
                  noOptionsMessage={() => "No Services Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Results per page</label>
                <MultiSelect
                  options={maxResultsOptions}
                  isSearchable
                  placeholder=" 50 "
                  className="custom-select"
                  noOptionsMessage={() => "No Results Found"}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Invoice No.</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="txt_invoice_no"
                  size={50}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Master Reference</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="reservation_id"
                  size={50}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Consultant Name</label>
                <MultiSelect
                  options={consultantsOptions}
                  isSearchable
                  placeholder=" Select Consultant Name "
                  className="custom-select"
                  noOptionsMessage={() => "No Results Found"}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="form-group col-md-3">
                <div
                  className="checkbox checkbox-success"
                  style={{ display: "inline-block" }}
                >
                  <input
                    type="checkbox"
                    defaultValue={1}
                    name="chk_booking_date"
                    id="chk_booking_date"
                    onChange={toggleBookingDate}
                  />
                  <label htmlFor="chk_booking_date"> Booking Date</label>
                </div>
                &nbsp;&nbsp;
                <div
                  name="booking_date"
                  id="booking_date"
                  style={{ display: showBookingDate ? "block" : "none" }}
                >
                  <div
                    className="input-daterange input-group date"
                    id="datetimepicker1"
                  >
                    <Flatpickr
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group col-md-3">
                <div
                  className="checkbox checkbox-success"
                  style={{ display: "inline-block" }}
                >
                  <input
                    type="checkbox"
                    defaultValue={1}
                    name="chk_service_date"
                    id="chk_service_date"
                    onChange={toggleServiceDate}
                  />
                  <label htmlFor="chk_service_date">Service Date</label>
                </div>
                &nbsp;&nbsp;
                <div
                  name="service_date"
                  id="service_date"
                  style={{ display: showServiceDate ? "block" : "none" }}
                >
                  <div
                    className="input-daterange input-group date"
                    id="datetimepicker2"
                  >
                    <Flatpickr
                      value={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate1}
                      onChange={(date) => setEndDate1(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick1}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group col-md-3">
                <div
                  className="checkbox checkbox-success"
                  style={{ display: "inline-block" }}
                >
                  <input
                    type="checkbox"
                    defaultValue={1}
                    name="chk_booking_date"
                    id="chk_booking_date"
                    onChange={toggleStatusDate}
                  />
                  <label htmlFor="chk_booking_date"> Status Date</label>
                </div>
                &nbsp;&nbsp;
                <div
                  name="booking_date"
                  id="booking_date"
                  style={{ display: showStatusDate ? "block" : "none" }}
                >
                  <div
                    className="input-daterange input-group date"
                    id="datetimepicker1"
                  >
                    <Flatpickr
                      value={startDate3}
                      onChange={(date) => setStartDate3(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate3}
                      onChange={(date) => setEndDate3(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick3}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group col-md-12">
                  <div className="col-md-2 ">
                    <button
                      type="button"
                      name="sbt1"
                      className="btn btn-dark btn-sm"
                      value="View Report"
                      onClick={toggleFormVisibility}
                    >
                      <i className="fa fa-eye" />
                      &nbsp;&nbsp;View Report
                    </button>
                  </div>
                  <div id="mesID" style={{ display: "none" }} />
                </div>
              </div>
            </div>
          </div>
        </form>

        <br />
        <form
          id="hideornot"
          style={{ display: isFormVisible ? "block" : "none" }}
        >
          <div className="panel-body removeMargins">
            <div className="row pd_tp">
              <div className="row mt-2">
                <div className="col-md-5 col_hide">
                  <div className="col-md-12">
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=invoice&sel_agent=&sel_agent_name=&txt_booking_id=&sel_selected_service=all&sel_max_results=50&txt_invoice_no=&reservation_id=&consultant_name=&booking_from_date=18-07-2023&booking_to_date=18-08-2023&service_from_date=18-07-2023&service_to_date=18-08-2023&status_from_date=18-07-2023&status_to_date=18-08-2023&sbt1=View+Report&download=1"
                    >
                      <i className="fa fa-download" />
                      &nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=invoice&sel_agent=&sel_agent_name=&txt_booking_id=&sel_selected_service=all&sel_max_results=50&txt_invoice_no=&reservation_id=&consultant_name=&booking_from_date=18-07-2023&booking_to_date=18-08-2023&service_from_date=18-07-2023&service_to_date=18-08-2023&status_from_date=18-07-2023&status_to_date=18-08-2023&sbt1=View+Report&print=1"
                      target="_blank"
                    >
                      <i className="fa fa-print" />
                      &nbsp;Print
                    </a>
                  </div>
                </div>
                <div className="col-md-5 col_hide">
                  <div className="form-group" />
                </div>
                <div className="col-md-2">
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
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <link
                rel="stylesheet"
                href="/cpfv3/css/tms/bootstrap_r/css/jquery.dataTables.css"
              />
              <link
                rel="stylesheet"
                href="/cpfv3/css/tms/bootstrap_r/css/bootstrap-select.css"
              />
              <link
                href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
                rel="stylesheet"
              />
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                        #search_agents_table1 a {\n                            text-decoration: underline;\n                        }\n\n                        #unallocatedAmountDetailContent {\n                            min-height: 400px;\n                            margin-bottom: 10px;\n                        }\n\n                        .modal-content {\n                            overflow: hidden;\n                        }\n                    ",
                }}
              />
              {/* code added by himanshu for GT-647 on 15-10-2013 */}
              <div
                id="search_agents_table1_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div className="row">
                  <div className="col-sm-6" />
                  <div className="col-sm-6" />
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div
                      className="doubleScroll-scroll-wrapper"
                      ref={wrapper1Ref}
                      id="wrapper1"
                      style={{
                        height: "20px",
                        overflow: "scroll hidden",
                        width: "2500px",
                      }}
                    >
                      <div
                        className="suwala-doubleScroll-scroll"
                        style={{ height: "20px", width: "2500px" }}
                      />
                    </div>
                    <div
                      id="wrapper2"
                      ref={wrapper2Ref}
                      style={{ overflow: "auto" }}
                    >
                      <table
                        id="search_agents_table1"
                        className="table table-bordered   table-responsive dataTable no-footer"
                        style={{ width: "2500px" }}
                        role="grid"
                        aria-describedby="search_agents_table1_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "83.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Master Ref.No &nbsp;							"
                            >
                              Master Ref.No &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "73.2px",
                              }}
                              className="row_header sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Booking No. &nbsp;								
									
								&nbsp;
								
									
								
														: activate to sort column ascending"
                            >
                              Booking No. &nbsp;{" "}
                              <a href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&sort_by=booking_id_link&order=ASC&action_type=list_members">
                                <img src={up} alt="up" border={0} />
                              </a>
                              &nbsp;
                              <a href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&sort_by=booking_id_link&order=DESC&action_type=list_members">
                                <img src={down} alt="down" border={0} />
                              </a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "76.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Agency Name &nbsp;							"
                            >
                              Agency Name &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "68.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Consultant &nbsp;							"
                            >
                              Consultant &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "74.2px",
                              }}
                              className="row_header sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Nationality &nbsp;								
									
								&nbsp;
								
									
								
														: activate to sort column ascending"
                            >
                              Nationality &nbsp;{" "}
                              <a href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&sort_by=nationality&order=ASC&action_type=list_members">
                                <img src={down} alt="up" border={0} />
                              </a>
                              &nbsp;
                              <a href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&sort_by=nationality&order=DESC&action_type=list_members">
                                <img src={down} alt="down" border={0} />
                              </a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "56.2px",
                              }}
                              className="row_header sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Country &nbsp;								
									
								&nbsp;
								
									
								
														: activate to sort column ascending"
                            >
                              Country &nbsp;{" "}
                              <a href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&sort_by=country_name&order=ASC&action_type=list_members">
                                <img src={down} alt="up" border={0} />
                              </a>
                              &nbsp;
                              <a href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&sort_by=country_name&order=DESC&action_type=list_members">
                                <img src={down} alt="down" border={0} />
                              </a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "129.2px",
                              }}
                              className="row_header sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Country Of Residence &nbsp;								
									
								&nbsp;
								
									
								
														: activate to sort column ascending"
                            >
                              Country Of Residence &nbsp;{" "}
                              <a href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&sort_by=county_of_residence&order=ASC&action_type=list_members">
                                <img src={down} alt="up" border={0} />
                              </a>
                              &nbsp;
                              <a href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&sort_by=county_of_residence&order=DESC&action_type=list_members">
                                <img src={down} alt="down" border={0} />
                              </a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "63.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Passenger &nbsp;							"
                            >
                              Passenger &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "74.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								No of Adults &nbsp;							"
                            >
                              No of Adults &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "86.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								No of Children &nbsp;							"
                            >
                              No of Children &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "76.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Booking Date &nbsp;							"
                            >
                              Booking Date &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "79.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Voucher Date &nbsp;							"
                            >
                              Voucher Date &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "51.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Check In &nbsp;							"
                            >
                              Check In &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "60.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Check Out &nbsp;							"
                            >
                              Check Out &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "61.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								ROE-Agent &nbsp;							"
                            >
                              ROE-Agent &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "126.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								ROE-Supplier to Agent &nbsp;							"
                            >
                              ROE-Supplier to Agent &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "52.2px",
                              }}
                              className="row_header       numeric-comma sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Amount &nbsp;								
									
								&nbsp;
								
									
								
														: activate to sort column ascending"
                            >
                              Amount &nbsp;{" "}
                              <a href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&sort_by=display_room_rate&order=ASC&action_type=list_members">
                                <img src={down} alt="up" border={0} />
                              </a>
                              &nbsp;
                              <a href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&sort_by=display_room_rate&order=DESC&action_type=list_members">
                                <img src={down} alt="down" border={0} />
                              </a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "58.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Currency &nbsp;							"
                            >
                              Currency &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "30.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Type &nbsp;							"
                            >
                              Type &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "41px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
								
								Action &nbsp;							"
                            >
                              Action &nbsp;{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="odd">
                            <td
                              valign="top"
                              colSpan={20}
                              className="dataTables_empty"
                            >
                              No data available in table
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                        /*@media print{\n\t.table.dataTable > thead > tr > th, .table.dataTable > thead > tr > td\n\t{\n\t\twhite-space: normal!important;\n\t\tpadding: 8px 5px 8px 5px!important;\n\t}\n\t\n\t tr.bg-primary th { color:#000 !important;}\n}*/\n                    ",
                }}
              />
            </div>
            <div className="form-group no-result">
              <h5 className="text-center">No Receipt Found.</h5>
            </div>
            <div className="row pd_tp">
              <div className="row">
                <div className="col-md-4">
                  <div className="col-md-12">
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=invoice&sel_agent=&sel_agent_name=&txt_booking_id=&sel_selected_service=all&sel_max_results=50&txt_invoice_no=&reservation_id=&consultant_name=&booking_from_date=18-07-2023&booking_to_date=18-08-2023&service_from_date=18-07-2023&service_to_date=18-08-2023&status_from_date=18-07-2023&status_to_date=18-08-2023&sbt1=View+Report&download=1"
                    >
                      <i className="fa fa-download" />
                      &nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=invoice&sel_agent=&sel_agent_name=&txt_booking_id=&sel_selected_service=all&sel_max_results=50&txt_invoice_no=&reservation_id=&consultant_name=&booking_from_date=18-07-2023&booking_to_date=18-08-2023&service_from_date=18-07-2023&service_to_date=18-08-2023&status_from_date=18-07-2023&status_to_date=18-08-2023&sbt1=View+Report&print=1"
                      target="_blank"
                    >
                      <i className="fa fa-print" />
                      &nbsp;Print
                    </a>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="form-group" />
                </div>
                <div className="col-md-1">
                  <a
                    className="btn btn-dark btn-sm form-group pull-right"
                    href="/tms/reports.php?sbt1=View Report&status_to_date=18-08-2023&status_from_date=18-07-2023&service_to_date=18-08-2023&service_from_date=18-07-2023&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&txt_invoice_no=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_agent_name=&sel_agent=&report=invoice&run=1&&Total=50&Start=50"
                  >
                    <i className="fa fa-arrow-right" />
                    &nbsp;Next
                  </a>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </form>
      </div>
    </>
  );
};
export default ReportsAccountsInvoices;
