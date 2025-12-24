import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
const BookingReConcilationAuto = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="AUTO RECON" />

        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3 ">
                  <label>Date</label>
                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div
                        className="input-group date col-md-12 col-sm-12 col-xs-12 arrival_date"
                        id="arrival_date"
                      >
                        <Flatpickr
                          value={startDate}
                          onChange={(date) => setStartDate(date)}
                          options={{ dateFormat: "Y-m-d" }}
                        />
                        <span className="input-group-addon">
                          <i className="fa fa-th" aria-hidden="true" />
                        </span>
                        <span
                          className="input-group-addon pointer"
                          id="b1TrashBtn"
                          onClick={handleTrashClick}
                        >
                          <i className="fa fa-trash" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-3 ">
                  <label>Display Full Log</label>
                  <br />
                  <div className="radioline1">
                    <div className="radio radio-success radio-inline">
                      <input
                        id="y"
                        type="radio"
                        name="display"
                        defaultValue="all"
                      />
                      <label htmlFor="y">Yes</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        id="app"
                        type="radio"
                        name="display"
                        defaultValue
                        defaultChecked
                      />
                      <label htmlFor="n">No</label>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="form-group col-md-3 ">
                  <a
                    href
                    className="btn btn-dark btn-sm"
                    type="submit"
                    value="Show Report"
                  >
                    <i className="fa fa-eye" />
                    &nbsp;Show Report
                  </a>
                </div>
              </div>
            </div>
          </form>
          <br />
          <form>
            <div className="panel-body removeMargins">
              <div className="form-group">
                <table
                  id="search_agents_table1"
                  className="table   table-responsive"
                >
                  <thead />
                  <tbody className="bg-white">
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; dotw
                        <br />
                        <label>Reading Path</label>=&gt;
                        /home/otrams/public_html/beta/project_folder/tdonline_protected/supplier_logs/d1/19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; restel <br />
                        <font color="red">
                          As restel suplier does not provide booking price at
                          Reservation Response, Please check these bookings
                          manually at supplier system
                        </font>
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; hotelbedstransfer <br />
                        <label>Reading Path</label>=&gt;
                        /home/otrams/public_html/beta/project_folder/tdonline_protected/supplier_logs/h1/19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; visa
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; whitesands
                        <br />
                        <font color="red">
                          As whitesands suplier does not provide booking price
                          at Reservation Response, Please check these bookings
                          manually at supplier system
                        </font>
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; miki
                        <br />
                        <label>Reading Path</label>=&gt;
                        /home/otrams/public_html/beta/project_folder/tdonline_protected/supplier_logs/m1/19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; travco
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; egyptexpress <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; localtransfer <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; localsightseeing <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; expedia
                        <br />
                        <label>Reading Path</label>=&gt;
                        /home/otrams/public_html/beta/project_folder/tdonline_protected/supplier_logs/e1/19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; expediapackage <br />
                        <label>Reading Path</label>=&gt;
                        /home/otrams/public_html/beta/project_folder/tdonline_protected/supplier_logs/e1p/19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; group
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; misc
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; hbsight
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; redapple
                        <br />
                        <label>Reading Path</label>=&gt;
                        /home/otrams/public_html/beta/project_folder/tdonline_protected/supplier_logs//19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; dhisco_rotana <br />
                        <label>Reading Path</label>=&gt;
                        /home/otrams/public_html/beta/project_folder/tdonline_protected/supplier_logs/d2/19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; agoda
                        <br />
                        <label>Reading Path</label>=&gt;
                        /home/otrams/public_html/beta/project_folder/tdonline_protected/supplier_logs/a5/19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; pricelinemor <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; localflight
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; localsystem
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; Package Supplier <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; Snehal
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; amadeus
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; sabre
                        <br />
                        <label>Reading Path</label>=&gt;
                        /home/otrams/public_html/beta/project_folder/tdonline_protected/supplier_logs/fsbr/19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; tboholidays
                        <br />
                        <label>Reading Path</label>=&gt; /19_08_2023
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "10px 30px" }}>
                        <label>Supplier</label>-&gt; mystifly
                        <br />
                        <font color="red">
                          Note : As Mystifly suplier does not provide booking
                          price at Reservation Response, Please check these
                          bookings manually at supplier system
                        </font>
                        <br />
                        <label>Reading Path</label>=&gt;
                        /home/otrams/public_html/beta/project_folder/tdonline_protected/supplier_logs/mystifly/19_08_2023
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  id
                  style={{ marginTop: "10px" }}
                  border={1}
                  className="table table-bordered   table-responsive"
                >
                  <thead>
                    <tr>
                      <th>Supplier</th>
                      <th>In System</th>
                      <th>In Logs</th>
                      <th>Diff</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td>Total</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
          <div className="panel-footer">
            <font color="red">
              Notes on Action to be Taken:
              <br />
              File size is zero: Check booking on Supplier System.
              <br />
              Response file does not exist: Check booking on Supplier System.
              <br />
              Not Found: Booking Posted on Supplier System but not exist on our
              System. Take decision on this booking.
              <br />
              Others Errors: We received a response from the supplier with
              errors.
              <br />
              File Size had Invalid XML Data. Read the File and see the issue:
              Check booking on Supplier System.
            </font>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    .panel-footer{\n        color: inherit;\n    border: 1px solid #e4e5e7;\n    border-top: none;\n    font-size: 75%;\n    background: #f7f9fa;\n    margin-top: -15px;\n    padding: 10px 15px;\n    background-color: #f5f5f5;\n    border-top: 1px solid #ddd;\n    border-bottom-right-radius: 3px;\n    border-bottom-left-radius: 3px;\n    }\n    td{\n        text-align: left !important;\n    }\n",
            }}
          />
        </div>
      </div>
    </>
  );
};
export default BookingReConcilationAuto;
