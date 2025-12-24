import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import chart from "../../assets/images/chart.png";
import logo2 from "../../assets/images/logo2-removebg-preview.png";
const SearchBookingTablePrintVoucher = ({ setShowHeaderAndMenuBar }) => {
  // Update the state to hide Header and MenuBar
  useEffect(() => {
    setShowHeaderAndMenuBar(false);
    // Cleanup function to reset the state when the component unmounts
    return () => setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);
  useEffect(() => {
    // Function to trigger the print dialog
    const handlePrint = () => {
      window.print();
    };

    // Call the print function when the component mounts
    handlePrint();

    // Clean up any resources (optional)
    return () => {
      // Clean-up code, if needed
    };
  }, []);
  return (
    <>
      <div>
        <main className="d-flex justify-content-center">
          <div className="voucher_main_div col-lg-8 col-12">
            <div className="voucher_header col-12">
              <div className="voucher_logo col-4">
                <img src={logo} alt="cri" />
              </div>
              <div className="voucher_qrcode col-4">
                <img src={chart} alt="cri" />
              </div>
              <div className="voucher_profileImg col-4">
                <img src={logo2} alt="cri" />
              </div>
            </div>
            <div className="voucher_info col-12">
              <div className="voucher_info_div1">
                <p>
                  <strong>Tdo-Cinu</strong>
                  <br />
                  Manama Bahrain
                  <br />
                  Manama, Bahrain TEL : 973-33054288
                </p>
              </div>
              <div className="voucher_info_div2">
                <p>Thursday, August 3, 2023</p>
                <p>
                  <i className="fa fa-mobile" aria-hidden="true" /> +973
                  13302122
                </p>
                <p>
                  <i className="fa fa-envelope" aria-hidden="true" />{" "}
                  ops@tdonlines.com
                </p>
              </div>
            </div>
            <div className="voucher_table col-12">
              <h1>
                Your Booking status is <span>Vouchered</span>
              </h1>
              <h4 className="table_heading">Hotel Details</h4>
              <table>
                <tbody className="bg-white">
                  <tr>
                    <th>Booking Code</th>
                    <td>TD864192</td>
                  </tr>
                  <tr>
                    <th>Supplier Ref. No. </th>
                    <td>TG04252724</td>
                  </tr>
                  <tr>
                    <th>Hotel Name</th>
                    <td>Scandic Helsinki Aviacongress</td>
                  </tr>
                  <tr>
                    <th>Address Details </th>
                    <td>Robert Huberin Tie 4 01510 Vantaa, Helsinki,Finland</td>
                  </tr>
                  <tr>
                    <th>Check In</th>
                    <td>11-Aug-2023</td>
                  </tr>
                  <tr>
                    <th>Check Out</th>
                    <td>13-Aug-2023</td>
                  </tr>
                  <tr>
                    <th>Total Nights</th>
                    <td>2 Nights</td>
                  </tr>
                </tbody>
              </table>
              <br />

              {/* <table>
            <tr>
              <th>Passengers</th>
              <td>
                Mr SRIKANES ALAGAN<br>
                Mrs VASANTHI SRIKANES<br>
                Mr AVINNESSH SRIKANES<br>
                Child KABISHRAGHAV SRIKANES (Age : 8 Yrs.)
              </td>
            </tr>
            <tr>
              <th>No. of Adult/Child</th>
              <td>3 / 1</td>
            </tr>
            <tr>
              <th>Room Types</th>
              <td>FAMILY ROOM STANDARD ( Breakfast Included )</td>
            </tr>
            <tr>
              <th>No. of Rooms</th>
              <td>1</td>
            </tr>
          </table> */}

              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n:root {\n    --color-primary: #0B4C84;\n    --color-secondary: #598EC2;\n  }\n  body{\n        padding: 0px !important;\n    margin: 10px !important;\n    background-color: #fff !important;\n  }\n  .voucher_main_div{\n      height: auto;\n      background-color: #fff;\n      padding: 0px;\n      box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.3);\n      \n  }\n  .voucher_header{\n      height: 30vh;\n      background-color: var(--color-secondary);\n      padding: 0px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      flex-direction: row;\n  }\n  .voucher_logo{\n\n      background-color: var(--color-primary);\n      height: inherit;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      clip-path: polygon(0 0, 74% 0, 100% 100%, 0% 100%);\n  }\n  .voucher_logo img{\n      width: 150px;\n      height: 90px;\n      margin-left: -10px;\n  }\n  .voucher_qrcode{\n\n      /*background-color: green;*/\n      height: inherit;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      \n  }\n  .voucher_profileImg{\n \n      background-color: var(--color-primary);\n      height: inherit;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      clip-path: polygon(0 0, 100% 0%, 100% 100%, 21% 100%);\n  }\n  .voucher_profileImg img{\n      width: 150px;\n      height: 150px;\n  }\n  .voucher_info{\n      height: 18vh;\n      background-color: #fff;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 10px 20px;\n  }\n  .voucher_info p{\n      font-size: 15px;\n      margin: 5px 0px;\n  }\n  .voucher_info i{\n      font-size: 18px;\n  }\n  .voucher_info .fa-envelope{\n      font-size: 14px;\n  }\n  .voucher_info_div2{\n      text-align: right;\n  }\n  .voucher_info p{\n      font-size: 14px;\n  }\n  .voucher_table{\n      background-color: #fff;\n      height: auto;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      padding: 15px;\n  }\n  .voucher_table_div{\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      flex-direction: row;\n  }\n  .voucher_table h1{\n      font-size: 22px;\n      font-weight: bold;\n  }\n  .table_heading{\n      height: 8vh;\n      background-color: var(--color-primary);\n      width: 100%;\n      margin: 0px;\n      padding: 0px 8px;\n      display: flex;\n      align-items: center;\n      font-size: 22px;\n      font-weight: bold;\n      color: #fff;\n  }\n  .voucher_table_coloumns{\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      flex-direction: row;\n  }\n  .fa{\n  color:#333;\n  }\n  .fa:hover{\n   color:#333;\n  }\n  table {\n    font-family: arial, sans-serif;\n    border-collapse: collapse;\n    width: 100%;\n    /*height: 300px;*/\n  }\n  tr{\n      height: 20px;\n      border-left: 1px solid #000;\n      border-right: 1px solid #000;\n      border-bottom: 1px solid #000;\n  }\n  td, th {\n    text-align: left !important;\n    padding: 8px;\n    color: black !important;\n  }\n  \n  tr:nth-child(even) {\n    background-color: #dddddd;\n  }\n  .voucher_footer_info{\n    text-align: left;\n    padding-left: 16px;\n  }\n  \n  \n  @media print{\n   \n  .voucher_header {\n      height: 9vh !important;\n  \n   }\n   .voucher_logo img {\n      width: 140px !important;\n      height: 70px !important;\n  }\n  .voucher_qrcode img{\n      width: 80px !important;\n      height: 80px !important;\n  }\n  .voucher_profileImg img {\n      width: 80px !important;\n      height: 80px !important;\n  }\n  .voucher_info_div1{\n  margin-top: -110px !important;\n  }\n  .voucher_info_div2{\n  margin-top: -110px !important;\n  }\n  .voucher_table h1 {\n      font-size: 20px !important;\n      margin-top: -120px !important;\n  }\n  .table_heading {\n      height: 3vh !important;\n      font-size: 20px !important;\n  }\n  .voucher_footer_info {\n      margin-top: 0px !important;\n  }\n  }\n",
                }}
              />
            </div>
            <div
              className="voucher_table col-12"
              style={{ marginTop: "-35px" }}
            >
              <h4 className="table_heading">Passenger Details</h4>
              <table>
                <tbody className="bg-white">
                  <tr>
                    <th>Passengers</th>
                    <td>
                      <li>Mr SRIKANES ALAGAN</li>
                      <li>Mrs VASANTHI SRIKANES</li>
                      <li>Mr AVINNESSH SRIKANES</li>
                      <li>
                        Child KABISHRAGHAV SRIKANES{" "}
                        <strong>(Age : 8 Yrs.)</strong>
                      </li>
                    </td>
                  </tr>
                  <tr>
                    <th>No. of Adult</th>
                    <td>3</td>
                  </tr>
                  <tr>
                    <th>No. of Child</th>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>Room Types</th>
                    <td>FAMILY ROOM STANDARD ( Breakfast Included )</td>
                  </tr>
                  <tr>
                    <th>No. of Rooms</th>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
            <div
              className="voucher_table col-12"
              style={{ marginTop: "-35px" }}
            >
              <h4 className="table_heading">Additional Information</h4>
              <table>
                <tbody className="bg-white">
                  <tr>
                    <th>Passport # </th>
                    <td>NULL</td>
                  </tr>
                  <tr>
                    <th>Flight # </th>
                    <td>NULL</td>
                  </tr>
                  <tr>
                    <th>Arrival Destination</th>
                    <td>NULL</td>
                  </tr>
                  <tr>
                    <th>PNR #</th>
                    <td>NULL</td>
                  </tr>
                  <tr>
                    <th>Arrival Date</th>
                    <td>NULL</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
            <div className="voucher_footer_info col-12">
              <p>
                <strong>Emergency Contact No:</strong> 973-33054288/973-33054288
                +97313302122
              </p>
              <p>
                <strong>Travel Destination Online Reference :</strong> Support
                Team
              </p>
              <p>
                <strong>Payable through :</strong> Travel Destination Online
              </p>
              <p>
                <strong>Website :</strong>{" "}
                <a href="https://www.tdonlines.com/">www.tdonlines.com</a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default SearchBookingTablePrintVoucher;
