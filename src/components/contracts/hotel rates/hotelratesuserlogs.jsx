import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { userIdSearchOptions } from "../../../constants/contants";

const ContractsHotelsUserlogs = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date'

  return (
    <>
      <Header2 title="USER LOG SEARCH" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="row mt-4">
              <div className="col-md-3 form-group">
                <label>User Name</label>
                <MultiSelect
                  options={userIdSearchOptions}
                  isSearchable
                  placeholder="- Select User Name -"
                  className="custom-select"
                  noOptionsMessage={() => "No User Name Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Log Type</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="name"
                />
              </div>
              <div className="form-group col-md-3">
                <label>Log Description</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="name"
                />
              </div>
              <div className="form-group col-md-3">
                <label>Raw Log</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="name"
                />
              </div>
            </div>
            {/* 2nd Row*/}
            <div className="row mt-4">
              <div className="col-md-3 form-group">
                <label>From Date</label>
                <div className="input-group col-md-12 col-xs-12">
                  <div
                    className="input-group date col-xs-12"
                    id="datetimepicker13"
                  >
                    <Flatpickr
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />

                    <span className="input-group-addon dateIcon">
                      <i className="fa fa-th" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/*    3rd Row*/}
            <div className="row mt-4 mb-4">
              <div className="form-group col-md-2">
                <button className="btn btn-dark btn-sm">
                  <i className="fa fa-search" /> Search
                </button>
              </div>
            </div>
          </form>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n  .table>tbody>tr>td {\n\nfont-size: 10px !important;\n\n  }\n",
            }}
          />
          <form className="mt-3">
            {/*Pagination panel*/}
            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-sm justify-content-center mt-4">
                <li className="page-item active">
                  <Link className="page-link" to="#">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    4
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    5
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    6
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    7
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    8
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    9
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    10
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#" aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </Link>
                </li>
              </ul>
            </nav>
            {/*- Table Creation*/}
            <div
              id="search_sup_wrapper"
              className="dataTables_wrapper form-inline dt-bootstrap no-footer"
            >
              <div className="row">
                <div className="col-sm-10" />
                <div className="col-sm-2">
                  <div id="search_sup_filter" className="dataTables_filter">
                    <label style={{ display: "flex" }}>
                      Search:
                      <input
                        type="search"
                        className="form-control form-control-sm input-sm"
                        placeholder
                        aria-controls="search_sup"
                      />
                    </label>
                  </div>
                </div>
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
                            style={{ width: "83px" }}
                          >
                            User Name
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "89px" }}
                          >
                            Log Type
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "551px" }}
                          >
                            Log Description
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "690px" }}
                          >
                            Raw Log
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "300px" }}
                          >
                            From Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-238 ## supplier_id- 31 ## company_name -
                            Mystifly ## supplier_code-mystifly ## percentage -
                            0.00 ## lead_time - 24 ==&lt;br&gt;== agent_id-238
                            ## supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 24{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '238',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            12 ,status = '1' ,priority = '8' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '8'======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            3 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            23 ,status = '' ,priority = '7' ,
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">07</div>
                              <div className="monthYear">
                                Jul
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">16:13</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent_Created</td>
                          <td>New Agent Created :318</td>
                          <td>
                            {" "}
                            agents admin_id= 'BookItNow',username=
                            'BookItNow',executive_id= '',agency_name=
                            'BookItNow',other_language_agency_name=
                            'BookItNow',first_name= 'Godrey',middle_name=
                            'Vincent',last_name= 'Pereira',sort_type=
                            'price',credit_limit_assigned= '0',credit_limit=
                            '0',credit_value=
                            '0',credit_usage='0',temp_credit_limit= '',address=
                            'Mumbai',other_language_address=
                            'Manharashtra',expiry_date= '2023-10-02
                            07:35:51',created_by= 'v3otramslive',city=
                            '64440',pincode= '400001',country=
                            '106',time_zone_off= '3',enable_dst=
                            0,branch_id='1',phone= '000-0',mobile= '000-0',fax=
                            '000',credit_distribution= ,currency= '4',email=
                            'godrey.pereira@qtechsoftware.com',website=
                            '000',password=
                            'c75f28325cfa028ea13872f977a29e0e87c99a4f390fe260f24d7e1f05fb8d75',lead_time=
                            0,debug= '1',search_by_multicurrency= 1,profile=
                            '',designation= 'QA Executive',iata_status=
                            '0',iata_number= '',nature_of_business= 'Destination
                            Management Company',can_book= '1',sales_manager_id=
                            'Paresh',comp_reg_no= 'BookItNow',allow_quotation=
                            '1',can_voucher= '1',markup=
                            ,allow_book_under_cancellation='1',create_date='2023-07-04
                            07:35:51',modify_date='',consultant_id=
                            'Beta_Tdo',agency_email= '',acc_name=
                            'BOOKITNOW',acc_email=
                            'godrey.pereira@qtechsoftware.com',acc_phone=
                            '000',man_name= 'BookItNow',man_email=
                            'godrey.pereira@qtechsoftware.com',man_phone=
                            '000',res_name= 'BOOKITNOW',res_email=
                            'godrey.pereira@qtechsoftware.com',res_phone=
                            '000',ip_addr= '103.104.226.130',apply_service_tax=
                            'no',allow_ticketing
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">04</div>
                              <div className="monthYear">
                                Jul
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">13:05</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Updated</td>
                          <td>
                            Agent 238 updated For -
                            modify_date=2023-06-26+05%3A18%3A57&amp;allow_frontend_rate_change=0&amp;allow_invoice_qr_code=0&amp;allow_cobranding=0
                            changed to -
                            modify_date=2023-06-26+05%3A24%3A08&amp;allow_frontend_rate_change=1&amp;allow_invoice_qr_code=1&amp;allow_cobranding=1
                          </td>
                          <td>
                            {" "}
                            agents currency= '6',branch_id= '1',consultant_id=
                            '',sales_manager_id= '',profile= '',
                            allow_frontend_rate_change = '1' parent_agent= '238'
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">26</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">10:54</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-238 ## supplier_id- 27 ## company_name -
                            Sabre Flight ## supplier_code-sabre ## percentage -
                            0.00 ## lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '238',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            3 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '238',supplier_id =
                            23 ,status = '' ,priority = '7' ,lea
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">26</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">10:51</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Updated</td>
                          <td>
                            Agent 238 updated For -
                            modify_date=2023-03-23+09%3A21%3A35 changed to -
                            modify_date=2023-06-26+05%3A18%3A57
                          </td>
                          <td>
                            {" "}
                            agents currency= '6',branch_id= '1',consultant_id=
                            '',sales_manager_id= '',profile= '',
                            allow_frontend_rate_change = '0' parent_agent= '238'
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">26</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">10:48</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>Supplier setting updated </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '317',supplier_id = 20 ,status = '' ,priority = ''
                            ,lead_time = '',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '317',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '317',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '317',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '317',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '317',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '317',supplier_id =
                            3 ,status = '' ,priority = '' ,lead_time =
                            '',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '317',supplier_id =
                            23 ,status = '' ,priority = '' ,lead_time =
                            '',branch_
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">26</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">10:45</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent_Created</td>
                          <td>New Agent Created :317</td>
                          <td>
                            {" "}
                            agents admin_id= 'Rohit Travels',username=
                            'rohitmhtm',executive_id= '',agency_name= 'Rohit
                            Travels',other_language_agency_name= '',first_name=
                            'Rohit',middle_name= '',last_name=
                            'Sapkota',sort_type= 'price',credit_limit_assigned=
                            '0',credit_limit= '0',credit_value=
                            '0',credit_usage='0',temp_credit_limit= '',address=
                            'Chembur, Mumbai',other_language_address= '',city=
                            '64440',pincode= '',country= '106',time_zone_off=
                            '3',enable_dst= 0,branch_id='1',phone=
                            '91-9819873707',mobile= '91-9819873707',fax=
                            '',credit_distribution= ,currency= '6',email=
                            'rohit.sapkota@qtechsoftware.com',website=
                            '',password=
                            '594d2e5fbf7a6fbd72c5a29803d38bbf30d62b747c0b0468cb84fffb892f2eec',lead_time=
                            0,debug= ,search_by_multicurrency= 1,profile=
                            '',designation= '',iata_status= '0',iata_number=
                            '',nature_of_business= '0',can_book=
                            '1',sales_manager_id= '',comp_reg_no=
                            '',allow_quotation= '1',can_voucher= '1',markup=
                            ,allow_book_under_cancellation='1',create_date='2023-06-26
                            05:14:56',modify_date='',consultant_id=
                            'Beta_Tdo',agency_email= '',acc_name=
                            'HALANCIA',acc_email=
                            'halancia.deva@qtechsoftware.com',acc_phone=
                            '',man_name= '',man_email= '',man_phone=
                            '',res_name= '',res_email= '',res_phone= '',ip_addr=
                            '103.104.226.130',apply_service_tax=
                            'no',allow_ticketing= '1',allow_invoice_qr_code=
                            '1',allow_cobranding= '1',tag_line=
                            '',site_id='0',wh_main_agent='',wh_agent='no',remarks=
                            '',logo='',allow_frontend_rate_change =
                            '0',status='A'
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">26</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">10:44</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-307 ## supplier_id- 23 ## company_name -
                            Contracted Hotels ## supplier_code-localsystem ##
                            percentage - 0.00 ## lead_time - 0{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '307',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '0',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            1 ,status = '1' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            23 ,status = '1' ,priority = '2' ,lead_ti
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">22</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">14:28</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-307 ## supplier_id- 23 ## company_name -
                            Contracted Hotels ## supplier_code-localsystem ##
                            percentage - 0.00 ## lead_time - 0{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '307',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '0',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            3 ,status = '' ,priority = '' ,lead_time =
                            '0',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '307',supplier_id =
                            23 ,status = '1' ,priority = '2' ,lead_time
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">22</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">14:28</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Updated</td>
                          <td>
                            Agent 195 updated For -
                            email=rohan.vartak%40qtechsoftware.com&amp;modify_date=2023-05-26+07%3A58%3A17
                            changed to -
                            email=pranali.mhatre%40qtechsoftware.com&amp;modify_date=2023-06-21+12%3A15%3A41
                          </td>
                          <td>
                            {" "}
                            agents currency= '4',branch_id= '1',consultant_id=
                            'Beta_Tdo',sales_manager_id= '',profile= '',
                            allow_frontend_rate_change = '1' parent_agent= '195'
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">17:45</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-195 ## supplier_id- 3 ## company_name -
                            Hotelbeds ## supplier_code-hotelbeds ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-195
                            ## supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '195',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            23 ,status = '' ,priority = '' ,lea
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">17:22</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-291 ## supplier_id- 12 ## company_name -
                            expedia ## supplier_code-expedia ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-291
                            ## supplier_id- 3 ## company_name - Hotelbeds ##
                            supplier_code-hotelbeds ## percentage - 0.00 ##
                            lead_time - 10 ==&lt;br&gt;== agent_id-291 ##
                            supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '291',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            12 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            23 ,status = '' ,priority = '4' ,l
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">17:21</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-291 ## supplier_id- 3 ## company_name -
                            Hotelbeds ## supplier_code-hotelbeds ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-291
                            ## supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '291',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            12 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            23 ,status = '' ,priority = '4' ,l
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">15:30</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-195 ## supplier_id- 3 ## company_name -
                            Hotelbeds ## supplier_code-hotelbeds ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-195
                            ## supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '195',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '195',supplier_id =
                            23 ,status = '' ,priority = '' ,lea
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">12:14</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-291 ## supplier_id- 3 ## company_name -
                            Hotelbeds ## supplier_code-hotelbeds ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-291
                            ## supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '291',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            23 ,status = '' ,priority = '4' ,le
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">12:13</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-291 ## supplier_id- 3 ## company_name -
                            Hotelbeds ## supplier_code-hotelbeds ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-291
                            ## supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '291',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            23 ,status = '' ,priority = '4' ,le
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">12:09</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-291 ## supplier_id- 3 ## company_name -
                            Hotelbeds ## supplier_code-hotelbeds ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-291
                            ## supplier_id- 6 ## company_name - Miki ##
                            supplier_code-miki ## percentage - 0.00 ## lead_time
                            - 10 ==&lt;br&gt;== agent_id-291 ## supplier_id- 30
                            ## company_name - tboholidays ##
                            supplier_code-tboholidays ## percentage - 0.00 ##
                            lead_time - 10 ==&lt;br&gt;== agent_id-291 ##
                            supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '291',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            23 ,status = '' ,priority = '4' ,le
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">19</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">17:37</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-291 ## supplier_id- 3 ## company_name -
                            Hotelbeds ## supplier_code-hotelbeds ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-291
                            ## supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '291',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            23 ,status = '' ,priority = '4' ,le
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">16</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">11:47</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-291 ## supplier_id- 3 ## company_name -
                            Hotelbeds ## supplier_code-hotelbeds ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-291
                            ## supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '291',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            23 ,status = '' ,priority = '4' ,le
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">16</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">11:45</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Updated</td>
                          <td>
                            Agent 291 updated For -
                            email=pranali.mhatre%40qtechsoftware.com&amp;modify_date=2023-06-13+12%3A08%3A40
                            changed to -
                            email=shiv.chauhan%40qtechsoftware.com&amp;modify_date=2023-06-15+10%3A38%3A56
                          </td>
                          <td>
                            {" "}
                            agents currency= '608',branch_id= '1',consultant_id=
                            'Moreshwar_Test',sales_manager_id= '',profile= '',
                            allow_frontend_rate_change = '1' parent_agent= '291'
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">15</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">16:08</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-291 ## supplier_id- 3 ## company_name -
                            Hotelbeds ## supplier_code-hotelbeds ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-291
                            ## supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '291',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            23 ,status = '' ,priority = '4' ,le
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">15</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">16:07</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Supplier settings</td>
                          <td>
                            Supplier setting updated Previous data--
                            agent_id-291 ## supplier_id- 3 ## company_name -
                            Hotelbeds ## supplier_code-hotelbeds ## percentage -
                            0.00 ## lead_time - 10 ==&lt;br&gt;== agent_id-291
                            ## supplier_id- 27 ## company_name - Sabre Flight ##
                            supplier_code-sabre ## percentage - 0.00 ##
                            lead_time - 10{" "}
                          </td>
                          <td>
                            ====== agent_supplier_tings agent_id =
                            '291',supplier_id = 20 ,status = '' ,priority = '15'
                            ,lead_time = '10',branch_id =
                            '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = '15'======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            19 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            1 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            8 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            12 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            13 ,status = '' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            3 ,status = '1' ,priority = '' ,lead_time =
                            '10',branch_id = '',visible_supplier_on_voucher =
                            '0',pricing_profile_id = ''======
                            agent_supplier_tings agent_id = '291',supplier_id =
                            23 ,status = '' ,priority = '4' ,le
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">15</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">15:32</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Flight QCT Destination Updated</td>
                          <td>
                            Flight QCT destination, Record Updated! By User :
                            v3otramslive
                          </td>
                          <td>
                            {" "}
                            qtc_table
                            destination_id=:destination_id,markup=:markup,markup_type=:markup_type,agent_id=:agent_id,modified_date=:modified_date
                            qct_id=:qct_id
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">14</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">17:39</div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>v3otramslive</td>
                          <td>Flight QCT Destination Updated</td>
                          <td>
                            Flight QCT destination, Record Updated! By User :
                            v3otramslive
                          </td>
                          <td>
                            {" "}
                            qtc_table
                            destination_id=:destination_id,markup=:markup,markup_type=:markup_type,agent_id=:agent_id,modified_date=:modified_date
                            qct_id=:qct_id
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">14</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">17:39</div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>v3otramslive</td>
                          <td>Agent Updated</td>
                          <td>
                            Agent 291 updated For -
                            modify_date=2023-06-07+12%3A47%3A18 changed to -
                            modify_date=2023-06-13+12%3A08%3A40
                          </td>
                          <td>
                            {" "}
                            agents currency= '608',branch_id= '1',consultant_id=
                            'Moreshwar_Test',sales_manager_id= '',profile= '',
                            allow_frontend_rate_change = '1' parent_agent= '291'
                          </td>
                          <td>
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">13</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                            <div className="secCont">17:38</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8"></div>
                {/*Pagination panel*/}
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-center mt-4">
                    <li className="page-item active">
                      <Link className="page-link" to="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        4
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        5
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        6
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        7
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        8
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        9
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        10
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContractsHotelsUserlogs;
