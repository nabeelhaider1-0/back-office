import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";

const AccountsSuppliersPaymentAllocation = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null);
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };
  // Function to handle the click event on the "Select All" checkbox
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const rowCheckboxes = document.querySelectorAll(".row_chkbox");

    rowCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
      // You can perform additional actions here if needed
    });
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="PAYMENT BOOKING ALLOCATION" />

        <div>
          {/* First Row*/}
          <form>
            <div className="panel-body">
              <div className="row form-group">
                <div className="col-md-2 form-group">
                  <label>Document #</label>
                  <input
                    type="text"
                    className="form-control form-control-sm test123"
                    name="search_id"
                  />
                  <input
                    type="hidden"
                    id="payment_type"
                    name="payment_type"
                    defaultValue="debit_note"
                  />
                </div>
                <div className="col-sm-3 form-group ">
                  <label>Invoice Date</label>
                  <div
                    className="input-group date input-daterange"
                    name="invoice_in_date"
                    id="invoice_in_date"
                  >
                    <Flatpickr
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span className="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                <div className="col-sm-3 form-group">
                  <label>Booking Id</label>
                  <span
                    className=" pull-right"
                    style={{
                      float: "right",
                      fontSize: "12px",
                      marginTop: "5px",
                    }}
                  >
                    (eg.: l001234<b>,</b>l001234)
                  </span>
                  <input
                    type="text"
                    name="txt_booking_id"
                    id="txt_booking_id"
                    size={40}
                    className="form-control form-control-sm input_text"
                  />
                </div>
                <div className="col-sm-3 form-group">
                  <label>Results</label>
                  <select
                    className="selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                    name="sel_max_results"
                    data-live-search="true"
                  >
                    <option value={100}>1-100</option>
                    <option value={200}>101-200</option>
                    <option value={300}>201-300</option>
                    <option value={400}>301-400</option>
                    <option value={500}>401-500</option>
                    <option value={600}>501-600</option>
                    <option value={700}>601-700</option>
                    <option value={800}>701-800</option>
                    <option value={900}>801-900</option>
                    <option value={1000}>901-1000</option>
                  </select>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-3 form-group">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    name="sbt1"
                    value="Submit"
                    onclick="javascriptcheck_date_id()"
                  >
                    <i className="fa fa-search" />
                    &nbsp;Search
                  </button>
                  &nbsp;
                </div>
              </div>
            </div>
          </form>
          <br />
          <form>
            <div className="panel-body removeMargins">
              <div className="dataTables_scroll">
                <input type="hidden" name="action" />
                <input type="hidden" name="payment_id" defaultValue={55} />
                <input type="hidden" name="currency_code" defaultValue="BHD" />
                <input
                  type="hidden"
                  name="payment_amount"
                  defaultValue={10.0}
                />
                <input type="hidden" name="supplier_id" defaultValue="sabre" />
                <input
                  type="hidden"
                  name="supplier_type"
                  defaultValue="online"
                />
                <input type="hidden" name="amountRemain" defaultValue={10.0} />
                <input
                  type="hidden"
                  name="payment_type"
                  defaultValue="debit_note"
                />
                <input type="hidden" name="payment_debit_note_id" />
                <input type="hidden" name="booking_id_selected" />
                <input
                  type="hidden"
                  name="selected_supplier_invoice_from_date"
                />
                <input type="hidden" name="selected_supplier_invoice_to_date" />
                <input type="hidden" name="selected_invoice_from_date" />
                <input type="hidden" name="selected_invoice_to_date" />
                <input type="hidden" name="selected_supplier_invoice_number" />
                <div className="row form-group">
                  <div className="col-md-12">
                    <div
                      id="search_sup1_wrapper"
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
                            id="wrapper1"
                            style={{
                              height: "20px",
                              overflow: "scroll hidden",
                              width: "1320px",
                            }}
                          >
                            <div
                              className="suwala-doubleScroll-scroll"
                              style={{ height: "20px", width: "1320px" }}
                            />
                          </div>
                          <div id="wrapper2" style={{ overflow: "auto" }}>
                            <table
                              id="search_sup1"
                              className="table table-bordered   table-responsive dataTable no-footer"
                              role="grid"
                              aria-describedby="search_sup1_info"
                            >
                              <thead>
                                <tr role="row">
                                  <th
                                    style={{
                                      textAlign: "center",
                                      width: "92.2px",
                                    }}
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                  >
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        className="select-all"
                                        invoice_number
                                        onChange={handleSelectAll}
                                      />
                                      <label />
                                    </div>
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "129.2px" }}
                                  >
                                    Documnet #
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "115.2px" }}
                                  >
                                    Booking Id
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "137.2px" }}
                                  >
                                    Service Date
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "131.2px" }}
                                  >
                                    Type
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "135.2px" }}
                                  >
                                    Source Type
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "149.2px" }}
                                  >
                                    Total Amount
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "99.2px" }}
                                  >
                                    Received
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "175.2px" }}
                                  >
                                    Pending Amount
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "173px" }}
                                  >
                                    Amount
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={0}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27954}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13001}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27954</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Ammended</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 10.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={10.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 10.000
                                    <input
                                      id="hid_amt_0"
                                      className="pending-amt"
                                      defaultValue={10.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(10,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={1}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27554}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12645}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27554</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Ammended</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 20.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={20.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 20.000
                                    <input
                                      id="hid_amt_1"
                                      className="pending-amt"
                                      defaultValue={20.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(20,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={2}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27559}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12655}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27559</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Ammended</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 1.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={1.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 1.000
                                    <input
                                      id="hid_amt_2"
                                      className="pending-amt"
                                      defaultValue={1.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(1,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={3}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27559}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12653}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27559</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Ammended</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 5.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={5.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 5.000
                                    <input
                                      id="hid_amt_3"
                                      className="pending-amt"
                                      defaultValue={5.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(5,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={4}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27581}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12690}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27581</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Ammended</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 45.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={45.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 45.000
                                    <input
                                      id="hid_amt_4"
                                      className="pending-amt"
                                      defaultValue={45.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(45,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={5}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27557}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12663}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27557</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Ammended</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 1.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={1.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 1.000
                                    <input
                                      id="hid_amt_5"
                                      className="pending-amt"
                                      defaultValue={1.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(1,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={6}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27558}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12659}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27558</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Ammended</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 1.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={1.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 1.000
                                    <input
                                      id="hid_amt_6"
                                      className="pending-amt"
                                      defaultValue={1.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(1,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={7}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27562}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12649}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27562</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Ammended</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 1.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={1.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 1.000
                                    <input
                                      id="hid_amt_7"
                                      className="pending-amt"
                                      defaultValue={1.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(1,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={8}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27587}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12715}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27587</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Cancelled</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 101.400
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="101.400"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 101.400
                                    <input
                                      id="hid_amt_8"
                                      className="pending-amt"
                                      defaultValue="101.400"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(101.4,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={9}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27533}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12634}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27533</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Cancelled</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_9"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={10}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={29347}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14744}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;29347</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2023
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 87.500
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="87.500"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 87.500
                                    <input
                                      id="hid_amt_10"
                                      className="pending-amt"
                                      defaultValue="87.500"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(87.5,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={11}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={29346}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14742}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;29346</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2023
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 87.500
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="87.500"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 87.500
                                    <input
                                      id="hid_amt_11"
                                      className="pending-amt"
                                      defaultValue="87.500"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(87.5,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={12}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={29344}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14746}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;29344</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2023
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 86.500
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="86.500"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 86.500
                                    <input
                                      id="hid_amt_12"
                                      className="pending-amt"
                                      defaultValue="86.500"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(86.5,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={13}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={29202}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14533}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;29202</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2023
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 51.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={51.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 51.000
                                    <input
                                      id="hid_amt_13"
                                      className="pending-amt"
                                      defaultValue={51.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(51,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={14}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={29208}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14541}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;29208</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2023
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 102.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={102.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 102.000
                                    <input
                                      id="hid_amt_14"
                                      className="pending-amt"
                                      defaultValue={102.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(102,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={15}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={29008}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14363}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;29008</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2022
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 68.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="68.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 68.600
                                    <input
                                      id="hid_amt_15"
                                      className="pending-amt"
                                      defaultValue="68.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(68.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={16}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={29000}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14355}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;29000</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2022
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.200
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.200"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.200
                                    <input
                                      id="hid_amt_16"
                                      className="pending-amt"
                                      defaultValue="66.200"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.2,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={17}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={29005}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14361}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;29005</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2022
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.200
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.200"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.200
                                    <input
                                      id="hid_amt_17"
                                      className="pending-amt"
                                      defaultValue="66.200"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.2,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={18}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={29004}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14359}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;29004</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2022
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.200
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.200"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.200
                                    <input
                                      id="hid_amt_18"
                                      className="pending-amt"
                                      defaultValue="66.200"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.2,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={19}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={29003}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14357}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;29003</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2022
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.200
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.200"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.200
                                    <input
                                      id="hid_amt_19"
                                      className="pending-amt"
                                      defaultValue="66.200"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.2,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={20}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28304}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13361}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28304</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2022
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 701.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={701.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 701.000
                                    <input
                                      id="hid_amt_20"
                                      className="pending-amt"
                                      defaultValue={701.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(701,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={21}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28302}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13357}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28302</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">07</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2022
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.900
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.900"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.900
                                    <input
                                      id="hid_amt_21"
                                      className="pending-amt"
                                      defaultValue="95.900"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.9,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={22}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28734}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14013}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28734</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2022
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 102.400
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="102.400"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 102.400
                                    <input
                                      id="hid_amt_22"
                                      className="pending-amt"
                                      defaultValue="102.400"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(102.4,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={23}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28733}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14011}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28733</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2022
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 102.400
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="102.400"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 102.400
                                    <input
                                      id="hid_amt_23"
                                      className="pending-amt"
                                      defaultValue="102.400"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(102.4,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={24}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28900}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14233}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28900</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 92.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={92.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 92.000
                                    <input
                                      id="hid_amt_24"
                                      className="pending-amt"
                                      defaultValue={92.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(92,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={25}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28902}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14235}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28902</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 92.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={92.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 92.000
                                    <input
                                      id="hid_amt_25"
                                      className="pending-amt"
                                      defaultValue={92.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(92,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={26}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28731}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14009}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28731</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 96.700
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="96.700"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 96.700
                                    <input
                                      id="hid_amt_26"
                                      className="pending-amt"
                                      defaultValue="96.700"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(96.7,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={27}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28729}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14005}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28729</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 96.700
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="96.700"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 96.700
                                    <input
                                      id="hid_amt_27"
                                      className="pending-amt"
                                      defaultValue="96.700"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(96.7,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={28}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28750}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14033}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28750</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 96.700
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="96.700"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 96.700
                                    <input
                                      id="hid_amt_28"
                                      className="pending-amt"
                                      defaultValue="96.700"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(96.7,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={29}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28574}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13725}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28574</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.300"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      id="hid_amt_29"
                                      className="pending-amt"
                                      defaultValue="95.300"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.3,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={30}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28303}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13359}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28303</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 92.800
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="92.800"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 92.800
                                    <input
                                      id="hid_amt_30"
                                      className="pending-amt"
                                      defaultValue="92.800"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(92.8,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={31}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28727}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={14001}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28727</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 92.800
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="92.800"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 92.800
                                    <input
                                      id="hid_amt_31"
                                      className="pending-amt"
                                      defaultValue="92.800"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(92.8,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={32}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28238}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13260}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28238</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.200
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.200"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.200
                                    <input
                                      id="hid_amt_32"
                                      className="pending-amt"
                                      defaultValue="95.200"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.2,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={33}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28292}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13339}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28292</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 96.700
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="96.700"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 96.700
                                    <input
                                      id="hid_amt_33"
                                      className="pending-amt"
                                      defaultValue="96.700"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(96.7,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={34}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27912}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12950}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27912</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 678.400
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="678.400"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 678.400
                                    <input
                                      id="hid_amt_34"
                                      className="pending-amt"
                                      defaultValue="678.400"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(678.4,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={35}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27989}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13022}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27989</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 44.200
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="44.200"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 44.200
                                    <input
                                      id="hid_amt_35"
                                      className="pending-amt"
                                      defaultValue="44.200"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(44.2,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={36}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28295}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13345}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28295</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.300"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      id="hid_amt_36"
                                      className="pending-amt"
                                      defaultValue="95.300"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.3,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={37}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27962}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13011}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27962</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.300"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      id="hid_amt_37"
                                      className="pending-amt"
                                      defaultValue="95.300"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.3,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={38}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27999}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13028}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27999</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.300"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      id="hid_amt_38"
                                      className="pending-amt"
                                      defaultValue="95.300"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.3,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={39}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27945}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12983}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27945</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 309.200
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="309.200"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 309.200
                                    <input
                                      id="hid_amt_39"
                                      className="pending-amt"
                                      defaultValue="309.200"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(309.2,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={40}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27947}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12981}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27947</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 309.200
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="309.200"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 309.200
                                    <input
                                      id="hid_amt_40"
                                      className="pending-amt"
                                      defaultValue="309.200"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(309.2,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={41}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27963}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13009}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27963</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.300"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      id="hid_amt_41"
                                      className="pending-amt"
                                      defaultValue="95.300"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.3,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={42}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27611}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12739}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27611</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.900
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.900"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.900
                                    <input
                                      id="hid_amt_42"
                                      className="pending-amt"
                                      defaultValue="95.900"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.9,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={43}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27998}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13026}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27998</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.300"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      id="hid_amt_43"
                                      className="pending-amt"
                                      defaultValue="95.300"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.3,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={44}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27610}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12735}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27610</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 57.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={57.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 57.000
                                    <input
                                      id="hid_amt_44"
                                      className="pending-amt"
                                      defaultValue={57.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(57,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={45}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27942}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12976}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27942</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 76.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="76.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 76.600
                                    <input
                                      id="hid_amt_45"
                                      className="pending-amt"
                                      defaultValue="76.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(76.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={46}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28067}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13078}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28067</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 54.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="54.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 54.600
                                    <input
                                      id="hid_amt_46"
                                      className="pending-amt"
                                      defaultValue="54.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(54.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={47}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27954}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12996}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27954</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 100.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={100.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 100.000
                                    <input
                                      id="hid_amt_47"
                                      className="pending-amt"
                                      defaultValue={100.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(100,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={48}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27996}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13024}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27996</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.300"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      id="hid_amt_48"
                                      className="pending-amt"
                                      defaultValue="95.300"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.3,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={49}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28065}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13076}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28065</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 54.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="54.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 54.600
                                    <input
                                      id="hid_amt_49"
                                      className="pending-amt"
                                      defaultValue="54.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(54.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={50}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27953}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12994}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27953</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.300"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.300
                                    <input
                                      id="hid_amt_50"
                                      className="pending-amt"
                                      defaultValue="95.300"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.3,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={51}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27608}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12731}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27608</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.900
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.900"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.900
                                    <input
                                      id="hid_amt_51"
                                      className="pending-amt"
                                      defaultValue="95.900"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.9,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={52}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28066}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13074}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28066</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 54.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="54.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 54.600
                                    <input
                                      id="hid_amt_52"
                                      className="pending-amt"
                                      defaultValue="54.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(54.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={53}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27950}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12992}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27950</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 182.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={182.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 182.000
                                    <input
                                      id="hid_amt_53"
                                      className="pending-amt"
                                      defaultValue={182.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(182,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={54}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27941}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12974}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27941</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.900
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="95.900"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.900
                                    <input
                                      id="hid_amt_54"
                                      className="pending-amt"
                                      defaultValue="95.900"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95.9,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={55}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27607}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12723}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27607</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 108.800
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="108.800"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 108.800
                                    <input
                                      id="hid_amt_55"
                                      className="pending-amt"
                                      defaultValue="108.800"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(108.8,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={56}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27931}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12958}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27931</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 76.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="76.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 76.600
                                    <input
                                      id="hid_amt_56"
                                      className="pending-amt"
                                      defaultValue="76.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(76.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={57}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28053}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13070}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28053</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 229.200
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="229.200"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 229.200
                                    <input
                                      id="hid_amt_57"
                                      className="pending-amt"
                                      defaultValue="229.200"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(229.2,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={58}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27645}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12784}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27645</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 76.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="76.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 76.600
                                    <input
                                      id="hid_amt_58"
                                      className="pending-amt"
                                      defaultValue="76.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(76.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={59}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={28037}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13054}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;28037</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 54.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="54.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 54.600
                                    <input
                                      id="hid_amt_59"
                                      className="pending-amt"
                                      defaultValue="54.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(54.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={60}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27542}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12608}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27542</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Mar
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_60"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={61}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27678}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12798}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27678</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Mar
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_61"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={62}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27633}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12766}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27633</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Mar
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_62"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={63}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27644}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12780}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27644</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Mar
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_63"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={64}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27727}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12820}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27727</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">26</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 58.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="58.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 58.600
                                    <input
                                      id="hid_amt_64"
                                      className="pending-amt"
                                      defaultValue="58.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(58.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={65}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27986}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={13020}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27986</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_65"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={66}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27709}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12815}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27709</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 95.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={95.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 95.000
                                    <input
                                      id="hid_amt_66"
                                      className="pending-amt"
                                      defaultValue={95.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(95,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={67}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27540}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12606}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27540</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_67"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={68}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27620}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12749}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27620</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_68"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={69}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27520}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12595}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27520</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_69"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={70}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27528}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12628}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27528</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 108.400
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="108.400"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 108.400
                                    <input
                                      id="hid_amt_70"
                                      className="pending-amt"
                                      defaultValue="108.400"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(108.4,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={71}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27641}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12774}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27641</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 124.800
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="124.800"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 124.800
                                    <input
                                      id="hid_amt_71"
                                      className="pending-amt"
                                      defaultValue="124.800"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(124.8,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={72}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27527}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12626}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27527</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_72"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={73}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27710}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12813}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27710</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 90.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={90.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 90.000
                                    <input
                                      id="hid_amt_73"
                                      className="pending-amt"
                                      defaultValue={90.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(90,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={74}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27640}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12772}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27640</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_74"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={75}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27479}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12545}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27479</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 55.200
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="55.200"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 55.200
                                    <input
                                      id="hid_amt_75"
                                      className="pending-amt"
                                      defaultValue="55.200"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(55.2,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={76}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27543}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12638}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27543</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_76"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={77}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27526}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12624}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27526</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_77"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={78}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27946}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12979}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27946</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 182.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={182.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 182.000
                                    <input
                                      id="hid_amt_78"
                                      className="pending-amt"
                                      defaultValue={182.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(182,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={79}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27591}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12699}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27591</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_79"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={80}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27647}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12786}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27647</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_80"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={81}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27524}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12599}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27524</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 1.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={1.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 1.000
                                    <input
                                      id="hid_amt_81"
                                      className="pending-amt"
                                      defaultValue={1.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(1,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={82}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27605}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12729}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27605</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_82"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={83}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27573}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12675}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27573</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_83"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={84}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27510}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12569}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27510</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 108.400
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="108.400"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 108.400
                                    <input
                                      id="hid_amt_84"
                                      className="pending-amt"
                                      defaultValue="108.400"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(108.4,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={85}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27475}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12543}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27475</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_85"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={86}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27541}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12636}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27541</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_86"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={87}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27579}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12684}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27579</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 93.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={93.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 93.000
                                    <input
                                      id="hid_amt_87"
                                      className="pending-amt"
                                      defaultValue={93.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(93,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={88}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27509}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12567}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27509</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_88"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={89}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27576}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12682}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27576</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_89"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={90}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27575}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12679}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27575</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="65.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 65.600
                                    <input
                                      id="hid_amt_90"
                                      className="pending-amt"
                                      defaultValue="65.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(65.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={91}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27511}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12583}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27511</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_91"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={92}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27574}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12677}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27574</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_92"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={93}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27515}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12573}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27515</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_93"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={94}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27935}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12970}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27935</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 81.300
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="81.300"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 81.300
                                    <input
                                      id="hid_amt_94"
                                      className="pending-amt"
                                      defaultValue="81.300"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(81.3,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={95}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27929}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12962}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27929</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 212.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={212.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 212.000
                                    <input
                                      id="hid_amt_95"
                                      className="pending-amt"
                                      defaultValue={212.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(212,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={96}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27930}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12960}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27930</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 212.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={212.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 212.000
                                    <input
                                      id="hid_amt_96"
                                      className="pending-amt"
                                      defaultValue={212.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(212,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={97}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27924}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12952}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27924</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 212.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={212.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 212.000
                                    <input
                                      id="hid_amt_97"
                                      className="pending-amt"
                                      defaultValue={212.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(212,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_0 odd" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={98}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27940}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12972}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27940</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 500.000
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue={500.0}
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 500.000
                                    <input
                                      id="hid_amt_98"
                                      className="pending-amt"
                                      defaultValue={500.0}
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(500,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                                <tr className="phps_row_1 even" role="row">
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        id="chk[]"
                                        className="row_chkbox"
                                        defaultValue={99}
                                        onclick="total_allocation_amount_set();"
                                      />
                                      <label />
                                      <input
                                        type="hidden"
                                        name="booking_id[]"
                                        defaultValue={27553}
                                      />
                                      <input
                                        type="hidden"
                                        name="booking_rate_id[]"
                                        defaultValue={12639}
                                      />
                                      <input
                                        type="hidden"
                                        name="source_type[]"
                                        defaultValue="sabre"
                                      />
                                      <input
                                        type="hidden"
                                        name="serviceType[]"
                                        defaultValue="Airline"
                                      />
                                      <input type="hidden" name="pay_id[]" />
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;27553</td>
                                  <td>
                                    &nbsp;
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>Sale</td>
                                  <td>&nbsp;sabre</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      type="hidden"
                                      name="total_amount[]"
                                      defaultValue="66.600"
                                    />
                                  </td>
                                  <td align="right">&nbsp;0.000</td>
                                  <td align="right">
                                    &nbsp; 66.600
                                    <input
                                      id="hid_amt_99"
                                      className="pending-amt"
                                      defaultValue="66.600"
                                      type="hidden"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control select_style"
                                      name="amount[]"
                                      size={10}
                                      onblur="extractNumber(this,3,true),checkAmount(66.6,this);total_allocation_amount();"
                                      onkeyup="extractNumber(this,3,true);"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="hidden"
                      name="total_count"
                      defaultValue={100}
                    />
                    <div className="fixedBtn">
                      <div className="text-center mt-2">
                        <button
                          type="button"
                          className="btn btn-default pull-left"
                          value="Allocate"
                          name="Allocate"
                          id="Allocate"
                          style={{ float: "left" }}
                          onclick="javascriptvalidate_chk(document.forms['payments_booking_allocation'],'edit_data');"
                        >
                          <i className="fa fa-check" />
                          &nbsp;Allocate
                        </button>
                        <img
                          id="allocate_loader"
                          src="images/loading.gif"
                          alt="cri"
                          style={{ display: "none" }}
                        />
                        <span id="allocationDisp">
                          Payment <strong>2021/11355</strong> has BHD{" "}
                          <span id="amt_remaning">10.000 </span> pending
                          allocations.
                        </span>
                      </div>
                    </div>
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
export default AccountsSuppliersPaymentAllocation;
