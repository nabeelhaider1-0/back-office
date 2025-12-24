import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
const SearchBookingTablePrintInvoice = ({ setShowHeaderAndMenuBar }) => {
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
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n\n\n\n:root {\n  --color-primary: #0B4C84;\n  --color-secondary: #598EC2;\n}\nbody {\n    padding: 0px !important;\n    margin: 0px !important;\n    background-color: #fff !important;\n}\n.voucher_main_div{\n\n    background-color: #fff;\n  \n    box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.3);\n    \n}\n.header_div{\n    height: 32vh;\n    background-color: var(--color-secondary);\n    padding: 0px;\n    display: flex;\n    justify-content: center;\n    flex-direction: row;\n}\n.header_div .header_logo{\n    width: 50%;\n    background-color: var(--color-primary);\n    height: inherit;\n    clip-path: polygon(0 0, 74% 0, 100% 100%, 0% 100%);\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    padding: 20px;\n}\n.header_div .header_logo .header_logo_img{\n    width: 170px;\n    height: 130px;\n\n    padding: 20px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    margin-left: 100px;\n}\n.header_div .header_logo_img img{\n    width: 200px;\n    height: 120px;\n    padding: 5px;\n}\n.header_div .header_text{\n    width: 50%;\n    background-color: var(--color-secondary);\n    height: inherit;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n\n}\n.header_div .header_text h1{\n    color: #fff;\n    font-size: 44px;\n    letter-spacing: 1px;\n    margin-left: -70px;\n}\n.header_div .header_text p {\n    color: rgba(255,255,255,0.7) !important;\n    font-size: 16px !important;\n    margin-left: -70px;\n}\n.invoice_info{\n    height: 45vh;\n    /*box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.3);*/\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    padding: 0px;\n}\n.invoice_info .invoice_to{\n    width: 50%;\n    height: inherit;\n    /*background-color: pink;*/\n    padding: 25px;\n    padding-bottom: 30px;\n    padding-left: 70px;\n\n}\n.invoice_to_div1{\n    display: flex;\n    flex-direction: row;\n}\n.invoice_info .invoice_to h4{\n    color: #000;\n    font-size: 18px;\n    font-weight: bold;\n}\n.invoice_info .invoice_to span{\n    font-weight: 600;\n        color: #212529 !important;\n}\n.invoice_info .invoice_to p{\n        font-size: 14px !important;\n    margin: 4px !important;\n        color: #212529 !important;\n}\n.invoice_info .invoice_data{\n    width: 50%;\n    height: inherit;\n    /*background-color: orange;*/\n    text-align: left;\n    padding: 25px;\n    padding-bottom: 30px;\n    padding-left: 100px;\n       color: #212529 !important;\n\n}\n.invoice_info .invoice_data p{\n       font-size: 14px !important;\n    color: #212529 !important;\n}\n\n\n.invoice_table{\n    height: 70vh;\n    /*background-color: powderblue;*/\n    margin-bottom: 10px;\n    padding:20px 50px;\n}\ntable {\n  font-family: arial, sans-serif;\n  border-collapse: collapse;\n  width: 100%;\n}\nth{\n    background-color: var(--color-primary);\n    height: 60px;\n    color: #fff;\n    font-size: 1rem;\n}\ntbody>tr>td {\n    font-size: 12pt !important;\n    text-transform: capitalize !important;\n    vertical-align: middle !important;\n    font-weight: normal !important;\n    color: #212529 !important;\n}\ntd, th {\n  /*border: 1px solid #dddddd;*/\n  text-align: left !important;\n  padding: 8px;\n}\ntd{\n    height: 50px;\n}\n\ntr:nth-child(even) {\n  background-color: #dddddd;\n}\n.invoice_table_total{\n    height: 10vh;\n    /*background-color: red;*/\n    display: flex;\n    justify-content: flex-end;\n    padding: 0px;\n}\n.invoice_table_total_text{\n    width: 25%;\n    height: inherit;\n    /*background-color: pink;*/\n    display: flex;\n    justify-content: space-between;\n    padding: 10px 30px;\n}\n.invoice_table_total_text h1{\n    margin-top: 2px;\n    font-size: 16px;\n}\n.invoice_table_total_text p{\n   font-size: 16px !important;\n    color: #212529 !important;\n}\n.invoice_table_total2{\n    height: 10vh;\n    background-color: var(--color-primary);\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 10px;\n    color: #fff;\n}\n.invoice_table_total2 h1{\n    font-size: 18px;\n}\n.invoice_table_total2 p{\n   font-size: 18px !important;\n    color: #fff !important;\n}\n}\n.invoice_note{\n    height: 20vh !important;\n    /*background-color: orange;*/\n    padding:0px 50px !important;\n    margin-bottom: 100px !important;\n}\n.invoice_note_text{\n    height: inherit;\n    /*background-color: pink;*/\n        height: 20vh;\n    /* background-color: orange; */\n    padding: 0px 50px;\n    margin-bottom: 100px;\n}\n.invoice_note_text p{\n    text-align: left;\n    font-size: 16px !important;\n    color: #212529 !important;\n}\n.invoice_note_text h4{\n    font-size: 17px;\n}\n\n@media print{\n \n    .header_div{\n        height: 15vh;\n    \n    }\n    .invoice_table{\nmargin-top: -323px;\n}\n.invoice_table_total2{\n    height: 3vh;\n    margin-top: -83px;\n}\n\n.invoice_note{\n \n    margin-top:-523px;\n}\n.header_div .header_logo .header_logo_img {\n    width: 135px;\n    height: 99px;\n\n}\ntable{\nheight: 175px !important;\n}\n\n@page {\n        size: auto; /* Set the page size to auto */\n        margin: 0; /* Set margins to 0 to remove default margins */\n    }\n\n    /* Set margins for the body to create space for content */\n    body {\n     margin-top: 1cm;\n\n    }\n}\n\n\n\n\n\n\n",
          }}
        />

        <main className="d-flex justify-content-center">
          <div className="voucher_main_div col-lg-8 col-12">
            <div className="container-fluid header_div col-lg-12">
              <div className="header_logo">
                <div className="header_logo_img">
                  <img src={logo} alt="cri" />
                </div>
              </div>
              <div className="header_text">
                <h1>INVOICE</h1>
                <p>Invoice No. 2023/93259</p>
              </div>
            </div>
            <div className="container-fluid invoice_info col-lg-12">
              <div className="invoice_to">
                <h4>Invoice To:</h4>
                <p>
                  <span>TDO-Cinu</span>
                  <br />
                  Manama Bahrain, Manama , Bahrain , .
                </p>
                <div className="invoice_to_div1">
                  <div>
                    <p>
                      <span>Account Code :</span> CD1525
                    </p>
                    <p>
                      <span>Consultant :</span> Cinu
                    </p>
                    <p>
                      <span>Issued Date :</span> 01-08-2023
                    </p>
                    <p>
                      <span>Fax :</span> 12345
                    </p>
                    <p>
                      <span>Tel No :</span> 973-33054288
                    </p>
                  </div>
                  <div>
                    <p>
                      <span>Agent Ref :</span> 12345
                    </p>
                    <p>
                      <span>Payment Type :</span> Credit Booking
                    </p>
                    <p>
                      <span>Booking ID :</span> TD864192
                    </p>
                  </div>
                </div>
              </div>
              <div className="invoice_data">
                <p>
                  <b>Travel Destination Online ,Rest Of World Market</b>
                </p>
                <p>
                  Office 222, Building 79, Road 2802, Block 428
                  <br />
                  Nordic Tower Seef, Kingdom Of Bahrain
                </p>
                <p>
                  <b>Tel :</b> <span>+973 13302122</span> <br /> <b>Fax :</b>{" "}
                  <span>+973 17682396</span>
                </p>
                <p>
                  <b>E-mail :</b> <span>support@tdonlines.com</span>
                  <br />
                  <b>URL :</b> <span>https://www.tdonlines.com</span>
                </p>
              </div>
            </div>
            <div className="container-fluid invoice_table col-lg-12">
              <table>
                <tbody className="bg-white">
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>QTY</th>
                    <th>Room Type</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                  <tr>
                    <td>11/08/2023 - 12/08/2023</td>
                    <td>Scandic Helsinki Aviacongress</td>
                    <td>01</td>
                    <td>1 triplepluschild</td>
                    <td>50.620</td>
                    <td>50.62</td>
                  </tr>
                  <tr>
                    <td>11/08/2023 - 12/08/2023</td>
                    <td>Scandic Helsinki Aviacongress</td>
                    <td>01</td>
                    <td>1 triplepluschild</td>
                    <td>50.620</td>
                    <td>50.62</td>
                  </tr>
                  <tr>
                    <td>11/08/2023 - 12/08/2023</td>
                    <td>Scandic Helsinki Aviacongress</td>
                    <td>01</td>
                    <td>1 triplepluschild</td>
                    <td>50.620</td>
                    <td>50.62</td>
                  </tr>
                </tbody>
              </table>
              <div className="invoice_table_total col-12">
                <div className="invoice_table_total_text">
                  <h1>Invoice Total (BHD):</h1>
                  <p>105.430</p>
                </div>
              </div>
              <div className="invoice_table_total2 col-12">
                <h1>Total:</h1>
                <p>105.430</p>
              </div>
            </div>
            <div className="container-fluid invoice_note col-12">
              <div className="invoice_note_text col-lg-12">
                <p>
                  <strong>Note:</strong> Please Note That The Balance Of 105.430
                  Is Due By 01-08-2023.
                </p>
                <h4>BANK DETAILS</h4>
                <p>
                  Payment should be made payable by telegraphic transfer to:-
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default SearchBookingTablePrintInvoice;
