import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import {
  add_options,
  agentOptions,
  pageOptions,
  serviceOptions,
  suppliersPreset,
} from "../../../constants/contants";

const PresetText = () => {
  return (
    <>
      <Header2
        title="PRESET TEXT"
        linkText1="Preset Text"
        linkText2="View Preset Text"
        link1={Constants.URLConstants.TOOLSPRESETTEXT}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 form-group">
                  <label>Label Name</label>
                  <input
                    type="text"
                    name="preset_name"
                    size={10}
                    className="form-control form-control-sm required test123"
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Page Name</label>
                  <MultiSelect
                    options={pageOptions}
                    isSearchable
                    placeholder="VOUCHER_PAGE"
                    className="custom-select required"
                    noOptionsMessage={() => "No Page Found"}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Service Name</label>
                  <MultiSelect
                    options={serviceOptions}
                    isSearchable
                    isMulti
                    placeholder="Select Service"
                    className="custom-select required"
                    noOptionsMessage={() => "No Service Found"}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Supplier</label>
                  <MultiSelect
                    options={suppliersPreset}
                    isSearchable
                    isMulti
                    placeholder=" - Select Supplier -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Supplier Found"}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-3 form-group">
                  <label>Branch</label>
                  <MultiSelect
                    options={add_options}
                    isSearchable
                    isMulti
                    placeholder=" - Select Branch -"
                    className="custom-select"
                    noOptionsMessage={() => "No Branch Found"}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Agent</label>
                  <MultiSelect
                    options={agentOptions}
                    isSearchable
                    isMulti
                    placeholder=" - Select Agent -"
                    className="custom-select"
                    noOptionsMessage={() => "No Agent Found"}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group phps_row_0">
                  <label>Description</label>
                  <textarea
                    id="summernote"
                    className="form-control form-control-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-2 form-group">
                  <button
                    type="button"
                    name="add"
                    id="button"
                    value="Add"
                    className="btn btn-dark btn-sm form-group"
                    onclick="add_preset_text()"
                  >
                    <i className="fa fa-plus" />
                    &nbsp;Add
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
          <form>
            <div className="panel-body removeMargins">
              <div
                id="tableres_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div className="row">
                  <div className="col-sm-10" />
                  <div className="col-sm-2">
                    <div id="tableres_filter" className="dataTables_filter">
                      {" "}
                      <label>
                        <h5 style={{ display: "inline" }}>
                          <i
                            className="fa fa-search srchWithinPg"
                            id="magnifier"
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Search within this table"
                          />
                        </h5>
                        <input
                          type="search"
                          className="form-control input-sm"
                          placeholder
                          aria-controls="search_creadit_note"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-12">
                    <table
                      id="tableres"
                      className="table table-bordered   table-responsive dataTable no-footer"
                      role="grid"
                      aria-describedby="tableres_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            className="sorting_asc"
                            tabIndex={0}
                            aria-controls="tableres"
                            rowSpan={1}
                            colSpan={1}
                            aria-sort="ascending"
                            aria-label="Service Name: activate to sort column descending"
                            style={{ width: "191.2px" }}
                          >
                            Service Name
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="tableres"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Preset Label: activate to sort column ascending"
                            style={{ width: "77.2px" }}
                          >
                            Preset Label
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="tableres"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Page Name: activate to sort column ascending"
                            style={{ width: "74.2px" }}
                          >
                            Page Name
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="tableres"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Description: activate to sort column ascending"
                            style={{ width: "927.2px" }}
                          >
                            Description
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="tableres"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Actions: activate to sort column ascending"
                            style={{ width: "85px" }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr role="row" className="odd">
                          <td className="sorting_1">
                            hotel,sightseeing,transfer,airline
                          </td>
                          <td>Term1</td>
                          <td>voucher_page</td>
                          <td>
                            <h4
                              className="x_western"
                              style={{
                                fontFamily: "roboto",
                                color: "rgb(74, 74, 74)",
                                textAlign: "center",
                                textTransform: "uppercase",
                                backgroundColor: "rgb(245, 245, 245)",
                              }}
                            >
                              TERMS
                            </h4>
                            <h4
                              className="x_western"
                              style={{ fontFamily: "Gotham," }}
                            >
                              <div
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  background: "rgb(237, 240, 245)",
                                  borderLeft: "1px solid rgb(228, 229, 231)",
                                  transition: "all 0.4s ease 0s",
                                  position: "relative",
                                  minHeight: "100%",
                                  color: "rgb(106, 108, 111)",
                                }}
                              >
                                <div className="content">
                                  <div
                                    className
                                    data-child="row"
                                    data-effect="fadeInUp"
                                  >
                                    <div className="row">
                                      <div
                                        className="hpanel col-md-12"
                                        style={{
                                          position: "initial",
                                          float: "none",
                                          width: "auto",
                                        }}
                                      >
                                        <div className="panel-body removeMargins">
                                          <ul
                                            style={{
                                              fontFamily: "roboto",
                                              fontSize: "12px",
                                              textAlign: "center",
                                              textTransform: "uppercase",
                                              backgroundColor:
                                                "rgb(245, 245, 245)",
                                              color: "rgb(74, 74, 74)",
                                            }}
                                          >
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                HOTEL CHECK-IN TIME IS 1400
                                                HOURS IST AND CHECK-OUT TIME IS
                                                1200 HOURS.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                EARLY CHECK-IN AND LATE
                                                CHECK-OUT ARE AVAILABLE ON
                                                SUBJECT TO AVAILABILITY.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                INDIVIDUAL CANCELLATION, NO-SHOW
                                                AND AMENDMENT POLICY
                                                <strong>:&nbsp;</strong>
                                                CANCELLATION MADE 3 DAYS PRIOR
                                                TO THE ARRIVAL DATE SHALL NOT
                                                INCUR ANY CANCELLATION CHARGES
                                                ‘BEYOND 1-NIGHT RETENTION
                                                CHARGES’ WILL BE APPLICABLE.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                GROUP CANCELLATION (5 ROOMS AND
                                                ABOVE): GROUP CANCELLATION MADE
                                                25 DAYS PRIOR TO THE ARRIVAL
                                                DATE SHALL INCUR CANCELLATION
                                                CHARGES ‘BEYOND 100% WILL BE
                                                CHARGED THROUGH LENGTH OF STAY.
                                              </p>
                                            </li>
                                            <li>
                                              <p>
                                                ALL STANDARD POLICIES PERTAINING
                                                TO HOTEL/ HOSPITALITY INDUSTRY
                                                ARE APPLICABLE, WHEN SPECIFIC
                                                RESERVATION POLICY IS NOT
                                                MENTIONED IN THE “RESERVATION
                                                CONFIRMATION” DOCUMENT.
                                              </p>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </h4>
                            <h4
                              className="x_western"
                              style={{
                                fontFamily: "roboto",
                                color: "rgb(74, 74, 74)",
                                textAlign: "center",
                                textTransform: "uppercase",
                                backgroundColor: "rgb(245, 245, 245)",
                              }}
                            >
                              PAYMENT TERMS POLICY
                            </h4>
                            <h4
                              className="x_western"
                              style={{ fontFamily: "Gotham," }}
                            >
                              <div
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  background: "rgb(237, 240, 245)",
                                  borderLeft: "1px solid rgb(228, 229, 231)",
                                  transition: "all 0.4s ease 0s",
                                  position: "relative",
                                  minHeight: "100%",
                                  color: "rgb(106, 108, 111)",
                                }}
                              >
                                <div className="content">
                                  <div
                                    className
                                    data-child="row"
                                    data-effect="fadeInUp"
                                  >
                                    <div className="row">
                                      <div
                                        className="hpanel col-md-12"
                                        style={{
                                          position: "initial",
                                          float: "none",
                                          width: "auto",
                                        }}
                                      >
                                        <div className="panel-body removeMargins">
                                          <ul
                                            style={{
                                              fontFamily: "roboto",
                                              fontSize: "12px",
                                              textAlign: "center",
                                              textTransform: "uppercase",
                                              backgroundColor:
                                                "rgb(245, 245, 245)",
                                              color: "rgb(74, 74, 74)",
                                            }}
                                          >
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                A PRE-AUTHORISATION WILL BE
                                                TAKEN ON YOUR CREDIT CARD UNDER
                                                THE NAME BOOKING IS MADE FOR THE
                                                TOTAL STAY ON YOUR ARRIVAL.
                                                EARLY CHECK-IN AND LATE
                                                CHECK-OUT ARE CHARGEABLE AS PER
                                                THE HOTEL POLICY. IT IS
                                                MANDATORY FOR GUESTS TO PRESENT
                                                VALID PHOTO IDENTIFICATION AT
                                                THE TIME OF CHECK-IN. SUCH
                                                DOCUMENTS CAN BE EITHER AN
                                                INDIAN AADHAAR CARD, INDIAN
                                                DRIVER’S LICENSE, INDIAN VOTER
                                                ID CARD OR INDIAN OR
                                                INTERNATIONAL PASSPORT. PAN
                                                CARDS ARE NOT ACCEPTED. HOTEL
                                                RESERVES THE RIGHT TO REFUSE
                                                CHECK-IN IN THE ABSENCE OF A
                                                VALID IDENTIFICATION DOCUMENT.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                PAYMENT CAN BE MADE USING THE
                                                CREDIT CARD, PAYMENT GATEWAY
                                                LINK, DEPOSIT IN THE BANK
                                                ACCOUNT OR DEMAND DRAFT BEFORE
                                                THE DUE DATE.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                APPLICABLE TAXES – TAXES ARE AS
                                                APPLICABLE AT THE TIME OF
                                                RESERVATION.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                AN EXTENSION OF STAY AT THE
                                                HOTEL IS LIABLE TO BE OFFERED AT
                                                RATE/OFFER APPLICABLE AT THE
                                                TIME THE EXTENSION REQUEST IS
                                                MADE. IN CASE, THE ORIGINAL
                                                OFFER AT WHICH THE RESERVATION
                                                WAS BOOKED HAS EXPIRED AT THAT
                                                TIME, THE HOTEL IS NOT LIABLE TO
                                                OFFER A ROOM AT THE ORIGINAL
                                                RATES BUT AT CURRENT RATES ON
                                                OFFER.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                CERTAIN PRIVILEGED BOOKING RATES
                                                OR SPECIAL OFFERS ARE NOT
                                                ELIGIBLE FOR CANCELLATION,
                                                REFUND OR ANY CHANGE. THE
                                                CUSTOMER IS THEREFORE ADVISED TO
                                                CHECK THE ROOM DESCRIPTION AND
                                                ANY SUCH CONDITIONS CAREFULLY
                                                PRIOR TO MAKING A BOOKING. HOTEL
                                                SHALL NOT BE LIABLE TO CANCEL OR
                                                REFUND ANY MONIES OR ALTER ANY
                                                BOOKINGS IF BOOKING IS MADE
                                                UNDER SUCH PRIVILEGED BOOKING
                                                RATES OR SPECIAL OFFERS.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                UPON CANCELLATION OF BOOKING,
                                                THE REFUND OF THE BOOKING AMOUNT
                                                WILL BE INITIATED. THE BOOKING
                                                AMOUNT AFTER DEDUCTION OF
                                                CANCELLATION CHARGES AND TAXES,
                                                AS APPLICABLE, WILL BE CREDITED
                                                INTO THE BANK ACCOUNT OF THE
                                                CUSTOMER USING THE SAME PAYMENT
                                                MODE (I.E. DEBIT CARD/ CREDIT
                                                CARD/ NET-BANKING AND ANY
                                                ELECTRONIC MODE) BY WHICH THE
                                                BOOKING WAS MADE BY THE
                                                CUSTOMER. THE REFUND PROCESS MAY
                                                TAKE 10-15 BUSINESS DAYS.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                IN CASE THE BOOKING AMOUNT IS
                                                PAID USING CREDIT CARD, THE
                                                REFUND WILL BE PROCESSED ON THE
                                                CREDIT CARD.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                CHILDREN UP-TO 5 YEARS OF AGE
                                                CAN STAY FREE (CRIBS SUBJECT TO
                                                AVAILABILITY). ADDITIONAL
                                                CHARGES MAY BE APPLICABLE FOR
                                                CHILDREN BETWEEN 5 AND 12 YEARS.
                                                13 YEARS WILL BE CHARGED AS PER
                                                EXTRA ADULT RATE.
                                              </p>
                                            </li>
                                            <li>
                                              <p>
                                                IN KEEPING WITH OUR HEIGHTENED
                                                SECURITY PROCEDURES, WE REQUEST
                                                YOU TO PROVIDE YOUR
                                                PHOTO-IDENTITY PROOF WHILE
                                                CHECKING-IN. INDIAN NATIONALS
                                                CAN PRESENT ANY OF THE FOLLOWING
                                                WHICH IS MANDATORY: PASSPORT,
                                                DRIVING LICENSE, VOTER ID CARD,
                                                PAN CARD. FOREIGN NATIONALS ARE
                                                REQUIRED TO PRESENT THEIR
                                                PASSPORT AND VALID VISA.
                                              </p>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </h4>
                            <h4
                              className="x_western"
                              style={{
                                fontFamily: "roboto",
                                color: "rgb(74, 74, 74)",
                                textAlign: "center",
                                textTransform: "uppercase",
                                backgroundColor: "rgb(245, 245, 245)",
                              }}
                            >
                              STANDARD TERMS AND CONDITIONS
                            </h4>
                            <h4
                              className="x_western"
                              style={{ fontFamily: "Gotham," }}
                            >
                              <div
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  background: "rgb(237, 240, 245)",
                                  borderLeft: "1px solid rgb(228, 229, 231)",
                                  transition: "all 0.4s ease 0s",
                                  position: "relative",
                                  minHeight: "100%",
                                  color: "rgb(106, 108, 111)",
                                }}
                              >
                                <div className="content">
                                  <div
                                    className
                                    data-child="row"
                                    data-effect="fadeInUp"
                                  >
                                    <div className="row">
                                      <div
                                        className="hpanel col-md-12"
                                        style={{
                                          position: "initial",
                                          float: "none",
                                          width: "auto",
                                        }}
                                      >
                                        <div className="panel-body removeMargins">
                                          <ol
                                            style={{
                                              fontFamily: "roboto",
                                              fontSize: "12px",
                                              textAlign: "center",
                                              textTransform: "uppercase",
                                              backgroundColor:
                                                "rgb(245, 245, 245)",
                                              color: "rgb(74, 74, 74)",
                                            }}
                                          >
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                NO GATHERINGS AND PARTIES OF ANY
                                                NATURE ARE ALLOWED IN THE ROOM.
                                                THE HOTEL RESERVES THE RIGHT TO
                                                EVICT ANY ADDITIONAL OCCUPANTS
                                                IN THE ROOM.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                THIS RESERVATION IS NOT
                                                TRANSFERABLE.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                IN THE EVENT OF NO-SHOW, A FEE
                                                OF ONE NIGHT’S ROOM CHARGE
                                                (INCLUSIVE OF ANY APPLICABLE
                                                PREVAILING GOVERNMENT TAX) WILL
                                                BE CHARGED TO YOUR CREDIT CARD
                                                PROVIDED AT THE TIME OF
                                                RESERVATION OR AS PER ANY
                                                REVISED CONDITIONS OF BOOKING AS
                                                PER THE OFFER.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                HOTEL RESERVES THE RIGHT TO SEND
                                                GUESTS AWAY FROM THE HOTEL DUE
                                                TO THEIR CONDUCT AND BEHAVIOUR
                                                OR FOR ANY OTHER SAFETY,
                                                SECURITY, MEDICAL REASONS. THIS
                                                APPLIES IN PARTICULAR, IF GUESTS
                                                DO NOT OBSERVE INSTRUCTIONS
                                                GIVEN BY HOTEL EMPLOYEES,
                                                EXPRESS THEMSELVES IN A
                                                DISCRIMINATING MANNER, HARASS OR
                                                ENDANGER OTHER GUESTS.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                GUESTS WILL NOT BE PERMITTED TO
                                                COMPROMISE THE HEALTH, SAFETY
                                                AND SECURITY ASPECTS OF THE
                                                HOTEL AT ANY POINT OF TIME.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                GUESTS ARE BOUND TO PRODUCE AN
                                                ORIGINAL PROOF OF IDENTITY AT
                                                THE TIME ARRIVAL IN THE HOTEL
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                SPECIAL TERMS OF OFFER WILL BE
                                                APPLICABLE FOR THE RESPECTIVE
                                                BOOKINGS AND IN CASE OF
                                                CONFLICT, THE TERMS OF SUCH
                                                SPECIAL OFFERS WILL PREVAIL.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                GUESTS ARE NOT ALLOWED TO BRING
                                                FOOD AND BEVERAGE FROM OUTSIDE
                                                IN THE HOTEL OR ORDER FOOD FROM
                                                OUTSIDE THE HOTEL.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                THE HOTEL UNDERTAKES NO
                                                LIABILITY FOR THE SHELF LIFE OF
                                                THE FOOD WHICH IS TAKEN AWAY TO
                                                THE HOTEL AFTER AN EVENT AT THE
                                                HOTEL OR TAKEN OUTSIDE THE HOTEL
                                                FOR PRIVATE CONSUMPTION.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                IN CASE OF CONFLICT IN THE
                                                ACTUAL BILL PROVIDED TO YOU
                                                AFTER THE RECEIPT OF SERVICES,
                                                THE TERMS OF THE BILL WILL
                                                PREVAIL.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                NEATNESS AND HYGIENE SHOULD BE
                                                ADEQUATELY MAINTAINED BY THE
                                                GUEST. THE GUEST SHOULD ALWAYS
                                                ADHERE TO THE SAFETY, SECURITY
                                                AND HYGIENE ADVISE DULY PROVIDED
                                                BY THE HOTEL AND SHOULD AVOID
                                                BREACHING THE SAME. THE GUEST
                                                WILL BE SOLELY RESPONSIBLE FOR
                                                ANY SUCH VIOLATION IF
                                                IDENTIFIED.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                ALL THE ASSETS AND VALUABLES OF
                                                THE HOTEL SHOULD BE DULY
                                                MAINTAINED ADEQUATELY AND SHOULD
                                                NOT BE DAMAGED OR DESTROYED. THE
                                                HOTEL HAS THE DISCRETION TO LEVY
                                                ANY CHARGES IN FUTURE IF IT IS
                                                PROVEN BEYOND DOUBT THAT SUCH
                                                DAMAGE/DESTRUCTION TO THE ASSET
                                                OF THE HOTEL (BOTH MOVABLE AND
                                                IMMOVABLE) HAVE BEEN DONE OR
                                                CAUSED BY THE GUEST.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                IF YOU HAVE ANY ALLERGIES,
                                                SENSITIVITIES OR INTOLERANCE TO,
                                                BUT NOT LIMITED TO: A PARTICULAR
                                                FABRIC, MATERIAL, CLEANING
                                                PRODUCT OR FOOD, IT IS NOT
                                                HOTEL’S RESPONSIBILITY TO ADVISE
                                                HOTEL MANAGEMENT PRIOR TO
                                                ARRIVAL.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                YOUR VALUABLES CAN BE STORED IN
                                                A SAFETY DEPOSIT BOX IN YOUR
                                                ROOM OR THE HOTEL CAN STORE YOUR
                                                VALUABLES UPON REQUEST. THE
                                                HOTEL IS ENTITLED TO COLLECT A
                                                CHARGE FOR STORAGE OF THESE
                                                ITEMS.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                IN CASE THE ITEMS YOU WISH TO
                                                STORE ARE EXCEPTIONALLY VALUABLE
                                                YOU MUST NOTIFY THE HOTEL BEFORE
                                                STORING. THE HOTEL MAY REFUSE TO
                                                STORE THIS KIND OF VALUABLES.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                MANAGEMENT AND STAFF WORK HARD
                                                TO PROVIDE A SAFE AND SECURE
                                                ENVIRONMENT. WE DO EVERYTHING
                                                POSSIBLE TO ENSURE A SECURE
                                                ENVIRONMENT IS MAINTAINED AND WE
                                                ASK THAT OUR GUESTS DO ALSO. THE
                                                HOTEL TAKES NO RESPONSIBILITY
                                                FOR ANY PERSONAL POSSESSIONS
                                                THAT ARE LOST, STOLEN OR
                                                MISPLACED WHILST ON THE PREMISES
                                                DUE TO THE ACTS AND OMISSIONS OF
                                                THE GUESTS THEMSELVES.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                LOST PROPERTY FOUND ON THE
                                                PREMISES IS LOGGED AND KEPT IN A
                                                SECURE LOCATION FOR A PERIOD OF
                                                THREE (3) MONTHS. THEREAFTER
                                                ITEMS ARE EITHER DISPOSED OF OR
                                                DONATED TO CHARITY. THE HOTEL
                                                ACCEPTS NO RESPONSIBILITY FOR
                                                CONTACTING INDIVIDUALS IN
                                                RELATION TO LOST PROPERTY.
                                                PERISHABLE ITEMS RETRIEVED FROM
                                                ROOMS AFTER CHECK OUT ARE ONLY
                                                HELD UNTIL CLOSE OF BUSINESS
                                                THAT DAY.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                CLAIMED ITEMS CAN BE COLLECTED
                                                FROM THE HOTEL WITH VALID
                                                IDENTIFICATION OR ALTERNATIVELY
                                                THE HOTEL CAN ARRANGE POSTAGE ON
                                                BEHALF OF THE GUEST AT THEIR
                                                EXPENSE.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                THE HOTEL IS NOT RESPONSIBLE FOR
                                                DAMAGE OR DISAPPEARANCE OF
                                                VEHICLES KEPT IN THE PARKING
                                                AREA. THE HOTEL IS OBLIGED TO
                                                CLEARLY EXPRESS IN THE PARKING
                                                AREA THAT THE AREA IS NOT
                                                SUPERVISED AND THE HOTEL IS NOT
                                                RESPONSIBLE FOR THE PROPERTY
                                                KEPT IN THERE.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                VALET PARKING IS ALWAYS AT THE
                                                GUEST’S RISK AND ADVISE FROM THE
                                                SECURITY TEAM NEEDS TO BE
                                                STRICTLY ADHERED WITH BY THE
                                                GUEST AT THE TIME OF CHECKING
                                                IN. HOTEL WILL NOT BE
                                                ACCOUNTABLE FOR LOSS OF ANY
                                                VALUABLES FROM SUCH PARKED
                                                VEHICLES.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                THE COMPANY RESERVES THE RIGHT
                                                TO CHANGE THESE TERMS AND
                                                CONDITIONS AT ANY TIME WITHOUT
                                                PRIOR NOTICE. IN THE EVENT THAT
                                                ANY CHANGES ARE MADE, THE
                                                REVISED TERMS AND CONDITIONS
                                                SHALL BE POSTED ON THIS WEBSITE
                                                IMMEDIATELY. PLEASE CHECK THE
                                                LATEST INFORMATION POSTED HEREIN
                                                TO INFORM YOURSELF OF ANY
                                                CHANGES.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                WE DO OUR BEST TO ENSURE
                                                RESERVATION ARRANGEMENTS ARE
                                                SATISFACTORY, HOWEVER, THE HOTEL
                                                DOES NOT ACCEPT ANY LIABILITY
                                                FOR ANY LOSS FINANCIAL OR
                                                OTHERWISE, TRAVEL DELAY, INJURY,
                                                DAMAGE, ADDITIONAL EXPENSES OR
                                                INCONVENIENCE CAUSED DIRECTLY OR
                                                INDIRECTLY BY ANY EVENTS WHICH
                                                ARE BEYOND OUR
                                                CONTROL.&nbsp;THESE INCLUDE, BUT
                                                NOT LIMITED TO, FLIGHT DELAYS OR
                                                CANCELLATIONS, CIVIL
                                                DISTURBANCE, DEFECTS IN
                                                VEHICLES, STRIKES, THEFT, ACTS
                                                OF TERRORISM, NATURAL DISASTER,
                                                WAR, FIRE, FLOODS, ACTS OF GOD,
                                                ACTS OF GOVERNMENT OR OF ANY
                                                OTHER AUTHORITIES, CHANGES TO
                                                GOVERNMENT REGULATIONS, ACCIDENT
                                                TO OR FAILURE OF MACHINERY OR
                                                EQUIPMENT, MAINTENANCE
                                                REQUIREMENTS OR INDUSTRIAL
                                                ACTION.
                                              </p>
                                            </li>
                                            <li>
                                              <p>
                                                THE TRANSPORT TO THE AIRPORT IS
                                                PROVIDED AS AN ANCILLARY SERVICE
                                                AND THE HOTEL IS NOT ACCOUNTABLE
                                                TO WHATSOEVER HAPPENS TO THE
                                                GUESTS DURING SUCH TRANSITS.
                                              </p>
                                            </li>
                                          </ol>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </h4>
                            <h4
                              className="x_western"
                              style={{
                                fontFamily: "roboto",
                                color: "rgb(74, 74, 74)",
                                textAlign: "center",
                                textTransform: "uppercase",
                                backgroundColor: "rgb(245, 245, 245)",
                              }}
                            >
                              GENERAL PROVISIONS
                            </h4>
                            <h4
                              className="x_western"
                              style={{ fontFamily: "Gotham," }}
                            >
                              <div
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  background: "rgb(237, 240, 245)",
                                  borderLeft: "1px solid rgb(228, 229, 231)",
                                  transition: "all 0.4s ease 0s",
                                  position: "relative",
                                  minHeight: "100%",
                                  color: "rgb(106, 108, 111)",
                                }}
                              >
                                <div className="content">
                                  <div
                                    className
                                    data-child="row"
                                    data-effect="fadeInUp"
                                  >
                                    <div className="row">
                                      <div
                                        className="hpanel col-md-12"
                                        style={{
                                          position: "initial",
                                          float: "none",
                                          width: "auto",
                                        }}
                                      >
                                        <div className="panel-body removeMargins">
                                          <ol
                                            style={{
                                              fontFamily: "roboto",
                                              fontSize: "12px",
                                              textAlign: "center",
                                              textTransform: "uppercase",
                                              backgroundColor:
                                                "rgb(245, 245, 245)",
                                              color: "rgb(74, 74, 74)",
                                            }}
                                          >
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                BY PROCEEDING WITH THE
                                                RESERVATION, YOU FURTHER AGREE
                                                AND ACKNOWLEDGE THAT IF THE
                                                RESERVATION IS ACCEPTED BY THE
                                                HOTEL, YOUR STAY SUBSEQUENTLY
                                                SHALL BE SUBJECT TO THE HOTEL’S
                                                STANDARD TERMS AND CONDITIONS IN
                                                RESPECT OF THEIR RESERVATION /
                                                STAY AT THE HOTEL.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                YOU FURTHER AGREE THAT THE
                                                GENERAL TERMS AND CONDITIONS AS
                                                PROVIDED ON THE WEBSITE THE
                                                HOTEL DIPLOMAT.COM SHALL
                                                CONSTITUTE THE BINDING AGREEMENT
                                                BETWEEN YOURSELF AND HOTEL
                                                DIPLOMAT IN RELATION TO ANY AND
                                                ALL COMMERCIAL ARRANGEMENT
                                                INCLUDING RESERVATION, STAY,
                                                PAYMENT, USAGE OF FACILITIES,
                                                ETC. OF WHATSOEVER NATURE.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                THE HOTEL MAY, AT ITS ABSOLUTE
                                                DISCRETION, CANCEL THE
                                                RESERVATION IF THE HOTEL IS OF
                                                THE OPINION THAT THE RESERVATION
                                                INFORMATION PROVIDED IS
                                                FALSIFIED OR INCOMPLETE.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                GUEST VOLUNTARILY AGREES AND
                                                PERMITS THE HOTEL
                                                REPRESENTATIVES TO PROFILE THE
                                                GUEST FROM THE PUBLIC DOMAIN TO
                                                ASCERTAIN THE DETAILS OF THE
                                                GUEST AND RENDER ADEQUATE
                                                HOSPITALITY SERVICES TO THEM
                                                DURING THEIR STAY IN THE HOTEL.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                THE HOTEL SHALL BE ENTITLED TO
                                                VARY, AMEND AND/OR OTHERWISE
                                                CHANGE THESE TERMS AND
                                                CONDITIONS AT ANY TIME WITHOUT
                                                PRIOR NOTICE.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                YOU SHALL INDEMNIFY AND HOLD THE
                                                HOTEL HARMLESS IN RESPECT OF ANY
                                                LIABILITY, LOSS, DAMAGE, COST
                                                AND EXPENSE OF ANY NATURE
                                                ARISING OUT OF, AND/OR IN
                                                CONNECTION WITH THE ACCEPTANCE
                                                OF THE RESERVATION AND YOUR STAY
                                                IN THE HOTEL.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                THE HOTEL SHALL NOT BE LIABLE
                                                FOR ANY LOSSES, DAMAGES, COSTS
                                                OR EXPENSES INCURRED BY YOU AS A
                                                RESULT OF ANY CANCELLATION OF
                                                THE RESERVATION BY THE HOTEL.
                                              </p>
                                            </li>
                                            <li>
                                              <p
                                                style={{ marginBottom: "0cm" }}
                                              >
                                                THE HOTEL DOES NOT ACCEPT ANY
                                                LIABILITY FOR ANY FAILURE BY THE
                                                HOTEL TO COMPLY WITH THESE
                                                CONDITIONS WHERE SUCH FAILURE IS
                                                DUE TO CIRCUMSTANCES BEYOND ITS
                                                REASONABLE CONTROL.
                                              </p>
                                            </li>
                                            <li>
                                              <p>
                                                IF THE HOTEL WAIVES ANY RIGHTS
                                                AVAILABLE TO IT UNDER THESE
                                                CONDITIONS ON ONE OCCASION, THIS
                                                DOES NOT MEAN THAT THOSE RIGHTS
                                                WILL AUTOMATICALLY BE WAIVED ON
                                                ANY OTHER OCCASION.
                                              </p>
                                            </li>
                                          </ol>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </h4>
                            <h4
                              className="x_western"
                              style={{
                                color: "rgb(74, 74, 74)",
                                fontFamily: "",
                              }}
                            >
                              <div
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  background: "rgb(237, 240, 245)",
                                  borderLeft: "1px solid rgb(228, 229, 231)",
                                  transition: "all 0.4s ease 0s",
                                  position: "relative",
                                  minHeight: "100%",
                                  color: "rgb(106, 108, 111)",
                                  fontFamily: "",
                                }}
                              >
                                <div className="content">
                                  <div
                                    className
                                    data-child="row"
                                    data-effect="fadeInUp"
                                  >
                                    <div className="row">
                                      <div
                                        className="hpanel col-md-12"
                                        style={{
                                          position: "initial",
                                          float: "none",
                                          width: "auto",
                                        }}
                                      >
                                        <div className="panel-body removeMargins">
                                          <div className="dataTables_wrapper form-inline dt-bootstrap no-footer"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{ clear: "both" }} />
                                </div>
                              </div>
                              <span
                                className="uniqFile input-group"
                                style={{
                                  color: "rgb(106, 108, 111)",
                                  fontFamily: "",
                                }}
                              />
                            </h4>
                          </td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={Constants.URLConstants.TOOLSPRESETEDIT}
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_preset_text(1)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
export default PresetText;
