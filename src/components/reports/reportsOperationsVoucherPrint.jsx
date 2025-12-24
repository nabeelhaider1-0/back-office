import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ReportsOperationsVoucherPrint = ({ setShowHeaderAndMenuBar }) => {
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
              '\n\t@import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700);\n\n\t.email-box {\n\t\tfloat: left;\n\t\tposition: absolute;\n\t\twidth: 275px;\n\t\tbackground: url(project_folder/tdonline/images/blue-arrow-up.png) 15px 0px no-repeat #FFFFFF;\n\t\tfont-size: 15px;\n\t\tcolor: #4a4a4a;\n\t\tz-index: 10;\n\t\tpadding: 8px 0px 0px 0px;\n\t\tmargin: -3px 0px 0px -1%;\n\t}\n\n\t.email-cont {\n\t\tfloat: left;\n\t\twidth: 100%;\n\t\tbackground: #FFFFFF;\n\t\tborder: 3px solid #D0D5D7;\n\t\tpadding: 20px 20px 25px 20px;\n\t}\n\n\t.email-box-field {\n\t\tfloat: left;\n\t\twidth: 60%;\n\t\tpadding: 3px 2%;\n\t\tmargin: 6px 0 3px;\n\t\tcolor: #4a4a4a;\n\t\tfont-size: 15px;\n\t\tfont-weight: 400;\n\t}\n\n\t.email-box-field input[type="text"] {\n\t\tfloat: left;\n\t\tbackground: none;\n\t\tborder: none;\n\t\twidth: 95%;\n\t\tfont-size: 15px;\n\t\tcolor: #686C71;\n\t\tfont-weight: 400;\n\t}\n\n\t.btn-shadow {\n\t\t-webkit-box-shadow: 0 0 1px 0px rgba(50, 50, 50, 0.4);\n\t\t-moz-box-shadow: 0 0 1px 0px rgba(50, 50, 50, 0.4);\n\t\tbox-shadow: 0 0 1px 0px rgba(50, 50, 50, 0.4);\n\t}\n\n\t.btn-send {\n\t\tbackground: url(project_folder/tdonline/images/search-arrow-up.png) no-repeat 78% 63% #575d67;\n\t\tfont-weight: 400;\n\t\tfont-size: 15px;\n\t\tcolor: #FFFFFF;\n\t\tpadding: 5px 30px 5px 10px;\n\t\tmargin: 0 0 0 10px;\n\t\tborder: 4px solid #f1f1f1;\n\t\tz-index: 100;\n\t\tcursor: pointer;\n\t\toutline: none;\n\t\tbehavior: url(./PIE.htc);\n\t\tposition: relative;\n\t}\n\n\t.bdr-btm {\n\t\tborder-bottom: 1px solid #c1c1c1;\n\t}\n\n\ta.email {\n\t\tdisplay: inline-block;\n\t\tfont-size: 14px;\n\t\tpadding: 0px 20px 0px 0px;\n\t\tmargin: 0px 20px 0px 0px;\n\t}\n\n\ta.print {\n\t\tdisplay: inline-block;\n\t\tfont-size: 14px;\n\t\tpadding: 0px 20px 0px 0px;\n\t\tmargin: 0px 20px 0px 0px;\n\t}\n\n\t.pop-main-lnk {\n\t\tfloat: left;\n\t\tclear: both;\n\t\tbackground: #FFFFFF;\n\t\tpadding: 5px 30px\n\t}\n\n\t.padvchr {\n\t\tpadding: 5px 0px 5px 24px;\n\t}\n\n\t@media print {\n\t\t.nonPrintable {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t*,\n\t\ttd {\n\t\t\t-webkit-print-color-adjust: exact;\n\t\t}\n\t}\n',
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: "\nbody{\n    background-color: #fff !important;\n}\n",
          }}
        />

        <div align="center">
          <table
            width={700}
            cellSpacing={0}
            cellPadding={0}
            align="center"
            style={{
              margin: "30px auto",
              width: "700px",
              background: "#ffffff",
              border: "1px solid #dce4e7",
            }}
          >
            <tbody className="bg-white">
              <tr>
                <td
                  valign="top"
                  style={{
                    borderBottom: "2px solid #dce4e7",
                    padding: "5px",
                    height: "90px",
                    lineHeight: "0px",
                  }}
                >
                  <table
                    width={646}
                    border={0}
                    align="center"
                    cellPadding={0}
                    cellSpacing={0}
                  >
                    <tbody className="bg-white">
                      <tr>
                        <td
                          className="padvchr"
                          rowSpan={2}
                          valign="top"
                          style={{ width: "300px" }}
                        >
                          <Link href="#">
                            <img
                              src="https://beta.tdonlines.com//project_folder/tdonline/images/logo.png"
                              border={0}
                              style={{ height: "120px", paddingTop: "16px" }}
                              alt="logo"
                            />
                          </Link>
                        </td>
                        <td className="padvchr">
                          <img
                            src="https://chart.googleapis.com/chart?chs=150x150&cht=qr&choe=UTF-8&chl=https://beta.tdonlines.com/print_voucher.php?vh=e217887a7866ce7b251e4e42401c02c44104214"
                            alt="barcode"
                          />
                        </td>
                        <td
                          className="padvchr"
                          style={{
                            color: "#4a4a4a",
                            fontFamily: '"Source Sans Pro", sans-serif',
                            fontSize: "12px",
                            lineHeight: "16px",
                          }}
                        >
                          <Link href="#"></Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  className="padvchr"
                  style={{
                    color: "#4a4a4a",
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: "12px",
                    lineHeight: "16px",
                    borderBottom: "2px solid #dce4e7",
                    textAlign: "right",
                  }}
                  colSpan={3}
                >
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    <tbody className="bg-white">
                      <tr>
                        <td>
                          <div className="pop-main-lnk nonPrintable">
                            <Link
                              className="email"
                              id="email-details"
                              style={{
                                textDecoration: "none",
                                color: "#575d67",
                                fontFamily: '"Source Sans Pro", sans-serif',
                              }}
                            >
                              <i
                                className="fa fa-envelope-o"
                                style={{
                                  color: "#575d67",
                                  paddingRight: "5px",
                                }}
                                aria-hidden="true"
                                title="Email"
                              />
                              Email
                            </Link>
                            <Link
                              className="print pointer"
                              style={{
                                textDecoration: "none",
                                color: "#575d67",
                                fontFamily: '"Source Sans Pro", sans-serif',
                              }}
                            >
                              <i
                                className="fa fa-print"
                                style={{
                                  color: "#575d67",
                                  paddingRight: "5px",
                                }}
                                aria-hidden="true"
                                title="Print"
                              />
                              Print
                            </Link>
                            <Link
                              href="print_voucher.php?code=e217887a7866ce7b251e4e42401c02c44104214&download=1"
                              style={{
                                textDecoration: "none",
                                color: "#575d67",
                                fontFamily: '"Source Sans Pro", sans-serif',
                                fontSize: "14px",
                              }}
                            >
                              <i
                                className="fa fa-download "
                                style={{
                                  color: "#575d67",
                                  paddingRight: "5px",
                                }}
                                aria-hidden="true"
                                title="Download"
                              />
                              Download
                            </Link>
                            <div
                              className="email-box"
                              id="email-fields"
                              style={{ display: "none" }}
                            >
                              <div className="email-cont">
                                <form
                                  method="POST"
                                  action="print_voucher.php"
                                  id="sample_attach_src_child"
                                >
                                  <div
                                    className="email-box-field bdr-btm"
                                    style={{ width: "140px" }}
                                  >
                                    <input
                                      type="hidden"
                                      name="action_name"
                                      defaultValue="send_mail"
                                    />
                                    <input
                                      type="hidden"
                                      name="booking_id"
                                      defaultValue={14}
                                    />{" "}
                                    <input
                                      type="hidden"
                                      name="code"
                                      id="code"
                                      defaultValue="e217887a7866ce7b251e4e42401c02c44104214"
                                    />{" "}
                                    <input
                                      type="text"
                                      id="txt_email"
                                      name
                                      defaultValue
                                      placeholder="Enter email address"
                                    />
                                  </div>
                                  <div className="left">
                                    <input
                                      type="button"
                                      defaultValue="Send"
                                      className="bdr8 btn-shadow btn-send"
                                      id="btn_submit"
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontFamily: '"Source Sans Pro", sans-serif',
                            fontSize: "12px",
                            paddingRight: "10px",
                          }}
                        >
                          <span>
                            <b style={{ color: "#4a4a4a" }}>Qtech</b>
                            <br />
                            Qwer
                            <br />
                            Dubai, United Arab Emirates TEL : 91-2896574123{" "}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style={{ lineHeight: "0px" }}>
                  <table
                    width={646}
                    border={0}
                    align="center"
                    cellPadding={0}
                    cellSpacing={0}
                  >
                    <tbody className="bg-white">
                      <tr>
                        <td
                          style={{
                            color: "#686f74",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "13px",
                            textAlign: "left",
                            width: "350px",
                            height: "31px",
                          }}
                        >
                          Friday, August 25, 2023
                        </td>
                        <td
                          style={{
                            color: "#686f74",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "13px",
                            textAlign: "left",
                            width: "250px",
                            height: "31px",
                          }}
                        >
                          <i className="fa fa-mobile" aria-hidden="true" />
                          &nbsp;&nbsp;‭+973 35442552‬
                        </td>
                        <td
                          style={{
                            color: "#686f74",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "13px",
                            textAlign: "left",
                            width: "250px",
                            height: "31px",
                          }}
                        >
                          <i className="fa fa-envelope-o" aria-hidden="true" />
                          &nbsp;&nbsp;
                          <Link
                            href="mailto:asmita.kapadi@qtechsoftware.com"
                            style={{
                              color: "#686f74",
                              textDecoration: "none",
                              fontSize: "12px",
                            }}
                          >
                            asmita.kapadi@qtechsoftware.com
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  valign="top"
                  style={{
                    background: "#ecf1f2",
                    borderTop: "1px solid #dce4e7",
                    borderBottom: "1px solid #d9dfe0",
                    paddingBottom: "10px",
                  }}
                >
                  <table
                    width="100%"
                    border={0}
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody className="bg-white">
                      <tr>
                        <td
                          valign="top"
                          style={{ height: "9px", lineHeight: "9px" }}
                        >
                          <img
                            src="https://beta.tdonlines.com/project_folder/tdonline/images/emails/Hotelbooking_bg.png"
                            alt="hotel"
                            width={700}
                            height={9}
                            border={0}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ lineHeight: "0px" }}>
                          <table
                            width={646}
                            border={0}
                            align="center"
                            cellPadding={0}
                            cellSpacing={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "20px",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Your Booking status is{" "}
                                  <span
                                    style={{
                                      color: "#FF9933",
                                      fontSize: "20px",
                                    }}
                                  >
                                    Vouchered
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  valign="top"
                  style={{
                    background: "#f3f6f7",
                    borderTop: "1px solid #fff",
                    lineHeight: "normal",
                  }}
                >
                  <table
                    width={646}
                    border={0}
                    align="center"
                    cellPadding={0}
                    cellSpacing={0}
                    style={{
                      border: "1px solid #e4e8e9",
                      margin: "10px auto 0 auto",
                      background: "#fff",
                    }}
                  >
                    <tbody className="bg-white">
                      <tr>
                        <td
                          style={{
                            padding: "5px 0px 5px 24px",
                            background: "#575d67",
                            WebkitPrintColorAdjust: "exact",
                            color: "#fff",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                        >
                          Hotel Details
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "1px solid #dfe5e6" }}>
                          <table
                            width="100%"
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                >
                                  Booking Code
                                </td>
                                <td
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "0 0 0 24px",
                                    width: "155px",
                                  }}
                                >
                                  TD200014
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                >
                                  Supplier Ref. No.
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "0 0 0 24px",
                                    width: "155px",
                                  }}
                                >
                                  asdasd34234{" "}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "1px solid #dfe5e6" }}>
                          <table
                            width="100%"
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  valign="top"
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                >
                                  Hotel Name
                                </td>
                                <td
                                  valign="top"
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "0 0 10px",
                                    width: "491px",
                                  }}
                                >
                                  <div
                                    className="padvchr"
                                    style={{
                                      color: "#4a4a4a",
                                      fontFamily:
                                        '"Source Sans Pro",sans-serif',
                                      fontSize: "16px",
                                      padding: "5px 0 5px 20px",
                                      display: "inline-block",
                                      fontWeight: 400,
                                    }}
                                  >
                                    Dubai Palm
                                  </div>
                                  <span className>
                                    <Link
                                      target="blank"
                                      style={{
                                        display: "block",
                                        padding: "3px 16px 5px 16px",
                                        fontWeight: 400,
                                        fontSize: "15px",
                                        color: "#fff",
                                        textDecoration: "none !important",
                                        float: "right",
                                        marginRight: "8px",
                                        background: "#575d67",
                                        marginTop: "10px",
                                        border: "4px solid #f1f1f1",
                                        zIndex: 100,
                                        cursor: "pointer",
                                      }}
                                      to="http://maps.google.com/maps?saddr=&daddr=Dubai Palm Hotel Apartment Al Muteena Street, Deira, Dubai United Arab Emirates&ll= "
                                    >
                                      Get Directions
                                    </Link>
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "1px solid #dfe5e6" }}>
                          <table
                            width="100%"
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "0 0 0 24px",
                                    width: "129px",
                                  }}
                                >
                                  Address Details
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "491px",
                                  }}
                                >
                                  Al Muteena Street, Deira,, Dubai,United Arab
                                  Emirates
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "1px solid #dfe5e6" }}>
                          <table
                            width="100%"
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                ></td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "491px",
                                  }}
                                >
                                  0097142710021
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "1px solid #dfe5e6" }}>
                          <table
                            width="100%"
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  style={{
                                    lineHeight: "20px",
                                    width: "84px",
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                  }}
                                >
                                  Check In
                                  <br />
                                  <span
                                    className="padvchr"
                                    style={{
                                      color: "#4a4a4a",
                                      fontFamily:
                                        '"Source Sans Pro",sans-serif',
                                      fontSize: "15px",
                                      fontWeight: "normal",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    29-Dec-2017
                                  </span>
                                </td>
                                <td
                                  style={{ width: "53px", textAlign: "left" }}
                                >
                                  <img
                                    src="https://beta.tdonlines.com/project_folder/tdonline/images/emails/arrow.png"
                                    alt="email"
                                    width={20}
                                    height={16}
                                    border={0}
                                  />
                                </td>
                                <td
                                  style={{
                                    lineHeight: "20px",
                                    width: "84px",
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5 0 5 0px",
                                  }}
                                >
                                  Check Out
                                  <br />
                                  <span
                                    className="padvchr"
                                    style={{
                                      color: "#4a4a4a",
                                      fontFamily:
                                        '"Source Sans Pro",sans-serif',
                                      fontSize: "15px",
                                      fontWeight: "normal",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    30-Dec-2017
                                  </span>
                                </td>
                                <td
                                  style={{ width: "42px", textAlign: "left" }}
                                >
                                  <img
                                    src="https://beta.tdonlines.com/project_folder/tdonline/images/emails/total.png"
                                    alt="total"
                                    width={24}
                                    height={22}
                                    border={0}
                                  />
                                </td>
                                <td
                                  style={{
                                    lineHeight: "20px",
                                    width: "310px",
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5 0 5 0px",
                                  }}
                                >
                                  Total Nights
                                  <br />
                                  <span
                                    className="padvchr"
                                    style={{
                                      color: "#4a4a4a",
                                      fontFamily:
                                        '"Source Sans Pro",sans-serif',
                                      fontSize: "15px",
                                      fontWeight: "normal",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    1 Nights
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  valign="top"
                  style={{ background: "#f3f6f7", borderTop: "1px solid #fff" }}
                >
                  <table
                    width={646}
                    border={0}
                    align="center"
                    cellPadding={0}
                    cellSpacing={0}
                    style={{
                      border: "1px solid #e4e8e9",
                      margin: "10px auto 0 auto",
                      background: "#fff",
                    }}
                  >
                    <tbody className="bg-white">
                      <tr>
                        <td
                          style={{
                            padding: "5px 0px 5px 24px",
                            background: "#575d67",
                            color: "#fff",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                        >
                          Passenger Details
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "1px solid #dfe5e6" }}>
                          <table
                            width="100%"
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                  valign="top"
                                >
                                  Passengers
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "210px",
                                  }}
                                  valign="top"
                                >
                                  {" "}
                                  Mr Asmi Test <br /> Mr TBAA TBAA <br />{" "}
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                  valign="top"
                                >
                                  No. of Adult/Child
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "100px",
                                  }}
                                  valign="top"
                                >
                                  2/0
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      {/* <tr>
						<td style="border-bottom: 1px solid #dfe5e6;">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td class="padvchr" style="color: #4a4a4a; font-family:'Source Sans Pro',sans-serif; font-size: 15px; font-weight: 600; padding: 5px 0px 5px 24px; width: 129px;" valign="top">Pax Contact No.</td>
									<td class="padvchr" style="color: #4a4a4a; font-family:'Source Sans Pro',sans-serif; font-size: 15px; padding: 5px 0px 5px 24px; width: 491px;" valign="top">91-2896574123</td>
								</tr>
							</table>
						</td>
					</tr> */}
                      <tr>
                        <td style={{ borderBottom: "1px solid #dfe5e6" }}>
                          <table
                            width="100%"
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                  valign="top"
                                >
                                  Room Types
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "210px",
                                  }}
                                  valign="top"
                                >
                                  Double
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                  valign="top"
                                >
                                  No. Of Rooms
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "100px",
                                  }}
                                  valign="top"
                                >
                                  1
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  valign="top"
                  style={{ background: "#f3f6f7", borderTop: "1px solid #fff" }}
                >
                  <table
                    width={646}
                    border={0}
                    align="center"
                    cellPadding={0}
                    cellSpacing={0}
                    style={{
                      border: "1px solid #e4e8e9",
                      margin: "10px auto 0 auto",
                      background: "#fff",
                    }}
                  >
                    <tbody className="bg-white">
                      <tr>
                        <td
                          style={{
                            padding: "5px 0px 5px 24px",
                            background: "#575d67",
                            color: "#fff",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                        >
                          Additional Information
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "1px solid #dfe5e6" }}>
                          <table
                            width="100%"
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "0 0 0 24px",
                                    width: "129px",
                                  }}
                                >
                                  Passport #
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "491px",
                                  }}
                                ></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "1px solid #dfe5e6" }}>
                          <table
                            width="100%"
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                  valign="top"
                                >
                                  Flight #
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "210px",
                                  }}
                                  valign="top"
                                />
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                  valign="top"
                                >
                                  PNR #
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "100px",
                                  }}
                                  valign="top"
                                />
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "1px solid #dfe5e6" }}>
                          <table
                            width="100%"
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                  valign="top"
                                >
                                  Arrival Destination
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "210px",
                                  }}
                                  valign="top"
                                />
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    padding: "5px 0px 5px 24px",
                                    width: "129px",
                                  }}
                                  valign="top"
                                >
                                  Arrival Date
                                </td>
                                <td
                                  className="padvchr"
                                  style={{
                                    color: "#4a4a4a",
                                    fontFamily: '"Source Sans Pro",sans-serif',
                                    fontSize: "15px",
                                    padding: "5px 0px 5px 24px",
                                    width: "100px",
                                  }}
                                  valign="top"
                                />
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/*
               */}
              <tr>
                <td
                  valign="top"
                  style={{
                    background: "#f3f6f7",
                    borderTop: "1px solid #fff",
                    paddingTop: "10px",
                  }}
                >
                  <table
                    width={646}
                    border={0}
                    align="center"
                    cellPadding={0}
                    cellSpacing={0}
                    style={{ margin: "0 auto" }}
                  >
                    <tbody className="bg-white">
                      <tr>
                        <td
                          style={{
                            padding: "5px 0px 5px 24px",
                            lineHeight: "18px",
                            color: "#4a4a4a",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "13px",
                            fontWeight: "normal",
                          }}
                        >
                          <b>Emergency Contact Number::</b>
                          91-2896574123/91-9865327415 ‭+973 35442552‬
                          <br />
                        </td>
                      </tr>
                      {/*<tr class="nonPrintable">
						<td style="padding: 5px 0px 5px 24px; line-height: 18px; color: #4a4a4a; font-family:'Source Sans Pro',sans-serif; font-size: 13px; font-weight: normal;"><strong>Please check authencity of this voucher by visiting</strong><br /> <Link href='https://beta.tdonlines.com/print_voucher.php?code=e217887a7866ce7b251e4e42401c02c44104214' target='_blank' style="color: #44d071; font-size: 12px;">https://beta.tdonlines.com/print_voucher.php?code=e217887a7866ce7b251e4e42401c02c44104214</Link></td>
					</tr>	*/}
                      <tr>
                        <td
                          style={{
                            padding: "5px 0px 5px 24px",
                            lineHeight: "18px",
                            color: "#4a4a4a",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "13px",
                            fontWeight: "normal",
                          }}
                        >
                          <b>Travel Destination Online Reference : </b>1234
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            padding: "5px 0px 5px 24px",
                            lineHeight: "18px",
                            color: "#4a4a4a",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "13px",
                            fontWeight: "normal",
                          }}
                        >
                          <b>Payable through : </b>{" "}
                          <span style={{ color: "#575d67" }}>
                            Travel Destination Online
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            padding: "5 0 5 0px",
                            lineHeight: "18px",
                            color: "#4a4a4a",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "16px",
                            fontWeight: 600,
                            textAlign: "right",
                          }}
                        >
                          Thanking You
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            padding: "5 0 17px 0px",
                            lineHeight: "18px",
                            color: "#4a4a4a",
                            fontFamily: '"Source Sans Pro",sans-serif',
                            fontSize: "13px",
                            fontWeight: "normal",
                            textAlign: "right",
                          }}
                        >
                          Sales Team
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <table
          width={700}
          cellSpacing={0}
          cellPadding={0}
          align="center"
          style={{
            margin: "30px auto",
            width: "700px",
            background: "#ffffff",
            border: "1px solid #dce4e7",
            pageBreakBefore: "always",
          }}
        >
          <tbody className="bg-white">
            <tr style={{ background: "#fff" }}>
              <td
                valign="top"
                style={{
                  color: "#4a4a4a",
                  fontFamily: '"Source Sans Pro",sans-serif',
                  fontSize: "12px",
                  padding: "26px",
                  wordBreak: "break-all",
                }}
              >
                <h4
                  className="x_western"
                  style={{
                    fontFamily: "roboto",
                    color: "#4a4a4a",
                    textAlign: "center",
                    textTransform: "uppercase",
                    backgroundColor: "#f5f5f5",
                    fontSize: "12px",
                  }}
                >
                  TERMS
                </h4>
                <h4
                  className="x_western"
                  style={{
                    fontFamily:
                      'Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: "12px",
                    color: "#4a4a4a",
                    textAlign: "center",
                    textTransform: "uppercase",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <div
                    style={{
                      margin: 0,
                      padding: 0,
                      background: "#edf0f5",
                      borderLeft: "1px solid #e4e5e7",
                      transition: "all 0.4s ease 0",
                      position: "relative",
                      minHeight: "100%",
                      color: "#6a6c6f",
                    }}
                  >
                    <div className="content">
                      <div className data-child="row" data-effect="fadeInUp">
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
                                  backgroundColor: "#f5f5f5",
                                  color: "#4a4a4a",
                                  marginBottom: 0,
                                }}
                              >
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    HOTEL CHECK-IN TIME IS 1400 HOURS IST AND
                                    CHECK-OUT TIME IS 1200 HOURS.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    EARLY CHECK-IN AND LATE CHECK-OUT ARE
                                    AVAILABLE ON SUBJECT TO AVAILABILITY.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    INDIVIDUAL CANCELLATION, NO-SHOW AND
                                    AMENDMENT POLICY<strong>:&nbsp;</strong>
                                    CANCELLATION MADE 3 DAYS PRIOR TO THE
                                    ARRIVAL DATE SHALL NOT INCUR ANY
                                    CANCELLATION CHARGES ‘BEYOND 1-NIGHT
                                    RETENTION CHARGES’ WILL BE APPLICABLE.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    GROUP CANCELLATION (5 ROOMS AND ABOVE):
                                    GROUP CANCELLATION MADE 25 DAYS PRIOR TO THE
                                    ARRIVAL DATE SHALL INCUR CANCELLATION
                                    CHARGES ‘BEYOND 100% WILL BE CHARGED THROUGH
                                    LENGTH OF STAY.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    ALL STANDARD POLICIES PERTAINING TO HOTEL/
                                    HOSPITALITY INDUSTRY ARE APPLICABLE, WHEN
                                    SPECIFIC RESERVATION POLICY IS NOT MENTIONED
                                    IN THE “RESERVATION CONFIRMATION” DOCUMENT.
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
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    color: "#4a4a4a",
                    textAlign: "center",
                    textTransform: "uppercase",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  PAYMENT TERMS POLICY
                </h4>
                <h4
                  style={{
                    fontFamily:
                      '"Gotham", "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: "12px",
                    color: "rgb(74, 74, 74)",
                  }}
                >
                  <div
                    style={{
                      margin: 0,
                      padding: 0,
                      background: "rgb(237, 240, 245)",
                      borderLeft: "1px solid rgb(228, 229, 231)",
                      transition: "all 0.4s ease 0s",
                      position: "relative",
                      minHeight: "100%",
                      color: "rgb(106, 108, 111)",
                      fontFamily:
                        '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontSize: "11px",
                    }}
                  >
                    <div className="content">
                      <div className data-child="row" data-effect="fadeInUp">
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
                                  fontFamily:
                                    '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
                                  fontSize: "12px",
                                  textAlign: "center",
                                  textTransform: "uppercase",
                                  backgroundColor: "rgb(245, 245, 245)",
                                  color: "rgb(74, 74, 74)",
                                  margin: 0,
                                  padding: 0,
                                }}
                              >
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    A PRE-AUTHORIZATION WILL BE TAKEN ON YOUR
                                    CREDIT CARD UNDER THE NAME THE BOOKING IS
                                    MADE FOR THE TOTAL STAY ON YOUR ARRIVAL.
                                    EARLY CHECK-IN AND LATE CHECK-OUT ARE
                                    CHARGEABLE AS PER THE HOTEL POLICY. IT IS
                                    MANDATORY FOR GUESTS TO PRESENT VALID PHOTO
                                    IDENTIFICATION AT THE TIME OF CHECK-IN. SUCH
                                    DOCUMENTS CAN BE EITHER AN INDIAN AADHAAR
                                    CARD, INDIAN DRIVER’S LICENSE, INDIAN VOTER
                                    ID CARD, OR INDIAN OR INTERNATIONAL
                                    PASSPORT. PAN CARDS ARE NOT ACCEPTED. THE
                                    HOTEL RESERVES THE RIGHT TO REFUSE CHECK-IN
                                    IN THE ABSENCE OF A VALID IDENTIFICATION
                                    DOCUMENT.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    PAYMENT CAN BE MADE USING THE CREDIT CARD,
                                    PAYMENT GATEWAY LINK, DEPOSIT IN THE BANK
                                    ACCOUNT, OR DEMAND DRAFT BEFORE THE DUE
                                    DATE.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    APPLICABLE TAXES – TAXES ARE AS APPLICABLE
                                    AT THE TIME OF RESERVATION.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    AN EXTENSION OF STAY AT THE HOTEL IS LIABLE
                                    TO BE OFFERED AT THE RATE/OFFER APPLICABLE
                                    AT THE TIME THE EXTENSION REQUEST IS MADE.
                                    IN CASE THE ORIGINAL OFFER AT WHICH THE
                                    RESERVATION WAS BOOKED HAS EXPIRED AT THAT
                                    TIME, THE HOTEL IS NOT LIABLE TO OFFER A
                                    ROOM AT THE ORIGINAL RATES BUT AT CURRENT
                                    RATES ON OFFER.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    CERTAIN PRIVILEGED BOOKING RATES OR SPECIAL
                                    OFFERS ARE NOT ELIGIBLE FOR CANCELLATION,
                                    REFUND, OR ANY CHANGE. THE CUSTOMER IS
                                    THEREFORE ADVISED TO CHECK THE ROOM
                                    DESCRIPTION AND ANY SUCH CONDITIONS
                                    CAREFULLY PRIOR TO MAKING A BOOKING. THE
                                    HOTEL SHALL NOT BE LIABLE TO CANCEL OR
                                    REFUND ANY MONIES OR ALTER ANY BOOKINGS IF
                                    BOOKING IS MADE UNDER SUCH PRIVILEGED
                                    BOOKING RATES OR SPECIAL OFFERS.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    UPON CANCELLATION OF BOOKING, THE REFUND OF
                                    THE BOOKING AMOUNT WILL BE INITIATED. THE
                                    BOOKING AMOUNT AFTER DEDUCTION OF
                                    CANCELLATION CHARGES AND TAXES, AS
                                    APPLICABLE, WILL BE CREDITED INTO THE BANK
                                    ACCOUNT OF THE CUSTOMER USING THE SAME
                                    PAYMENT MODE (I.E. DEBIT CARD/ CREDIT CARD/
                                    NET-BANKING AND ANY ELECTRONIC MODE) BY
                                    WHICH THE BOOKING WAS MADE BY THE CUSTOMER.
                                    THE REFUND PROCESS MAY TAKE 10-15 BUSINESS
                                    DAYS.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    IN CASE THE BOOKING AMOUNT IS PAID USING A
                                    CREDIT CARD, THE REFUND WILL BE PROCESSED ON
                                    THE CREDIT CARD.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: 0 }}>
                                    CHILDREN UP TO 5 YEARS OF AGE CAN STAY FREE
                                    (CRIBS SUBJECT TO AVAILABILITY). ADDITIONAL
                                    CHARGES MAY BE APPLICABLE FOR CHILDREN
                                    BETWEEN 5 AND 12 YEARS. 13 YEARS WILL BE
                                    CHARGED AS PER THE EXTRA ADULT RATE.
                                  </p>
                                </li>
                                <li>
                                  <p>
                                    IN KEEPING WITH OUR HEIGHTENED SECURITY
                                    PROCEDURES, WE REQUEST YOU TO PROVIDE YOUR
                                    PHOTO-IDENTITY PROOF WHILE CHECKING-IN.
                                    INDIAN NATIONALS CAN PRESENT ANY OF THE
                                    FOLLOWING WHICH IS MANDATORY: PASSPORT,
                                    DRIVING LICENSE, VOTER ID CARD, PAN CARD.
                                    FOREIGN NATIONALS ARE REQUIRED TO PRESENT
                                    THEIR PASSPORT AND VALID VISA.
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
                  style={{
                    fontFamily:
                      '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: "12px",
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
                  style={{
                    fontFamily:
                      '"Gotham", "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: "12px",
                    color: "rgb(74, 74, 74)",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontSize: "11px",
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
                      <div className data-child="row" data-effect="fadeInUp">
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
                                  fontFamily: '"Roboto", sans-serif',
                                  fontSize: "12px",
                                  textAlign: "center",
                                  textTransform: "uppercase",
                                  backgroundColor: "rgb(245, 245, 245)",
                                  color: "rgb(74, 74, 74)",
                                }}
                              >
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    NO GATHERINGS AND PARTIES OF ANY NATURE ARE
                                    ALLOWED IN THE ROOM. THE HOTEL RESERVES THE
                                    RIGHT TO EVICT ANY ADDITIONAL OCCUPANTS IN
                                    THE ROOM.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    THIS RESERVATION IS NOT TRANSFERABLE.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    IN THE EVENT OF NO-SHOW, A FEE OF ONE
                                    NIGHT’S ROOM CHARGE (INCLUSIVE OF ANY
                                    APPLICABLE PREVAILING GOVERNMENT TAX) WILL
                                    BE CHARGED TO YOUR CREDIT CARD PROVIDED AT
                                    THE TIME OF RESERVATION OR AS PER ANY
                                    REVISED CONDITIONS OF BOOKING AS PER THE
                                    OFFER.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    HOTEL RESERVES THE RIGHT TO SEND GUESTS AWAY
                                    FROM THE HOTEL DUE TO THEIR CONDUCT AND
                                    BEHAVIOUR OR FOR ANY OTHER SAFETY, SECURITY,
                                    MEDICAL REASONS. THIS APPLIES IN PARTICULAR,
                                    IF GUESTS DO NOT OBSERVE INSTRUCTIONS GIVEN
                                    BY HOTEL EMPLOYEES, EXPRESS THEMSELVES IN A
                                    DISCRIMINATING MANNER, HARASS OR ENDANGER
                                    OTHER GUESTS.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    GUESTS WILL NOT BE PERMITTED TO COMPROMISE
                                    THE HEALTH, SAFETY AND SECURITY ASPECTS OF
                                    THE HOTEL AT ANY POINT OF TIME.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    GUESTS ARE BOUND TO PRODUCE AN ORIGINAL
                                    PROOF OF IDENTITY AT THE TIME ARRIVAL IN THE
                                    HOTEL
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    SPECIAL TERMS OF OFFER WILL BE APPLICABLE
                                    FOR THE RESPECTIVE BOOKINGS AND IN CASE OF
                                    CONFLICT, THE TERMS OF SUCH SPECIAL OFFERS
                                    WILL PREVAIL.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    GUESTS ARE NOT ALLOWED TO BRING FOOD AND
                                    BEVERAGE FROM OUTSIDE IN THE HOTEL OR ORDER
                                    FOOD FROM OUTSIDE THE HOTEL.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    THE HOTEL UNDERTAKES NO LIABILITY FOR THE
                                    SHELF LIFE OF THE FOOD WHICH IS TAKEN AWAY
                                    TO THE HOTEL AFTER AN EVENT AT THE HOTEL OR
                                    TAKEN OUTSIDE THE HOTEL FOR PRIVATE
                                    CONSUMPTION.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    IN CASE OF CONFLICT IN THE ACTUAL BILL
                                    PROVIDED TO YOU AFTER THE RECEIPT OF
                                    SERVICES, THE TERMS OF THE BILL WILL
                                    PREVAIL.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    NEATNESS AND HYGIENE SHOULD BE ADEQUATELY
                                    MAINTAINED BY THE GUEST. THE GUEST SHOULD
                                    ALWAYS ADHERE TO THE SAFETY, SECURITY AND
                                    HYGIENE ADVISE DULY PROVIDED BY THE HOTEL
                                    AND SHOULD AVOID BREACHING THE SAME. THE
                                    GUEST WILL BE SOLELY RESPONSIBLE FOR ANY
                                    SUCH VIOLATION IF IDENTIFIED.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    ALL THE ASSETS AND VALUABLES OF THE HOTEL
                                    SHOULD BE DULY MAINTAINED ADEQUATELY AND
                                    SHOULD NOT BE DAMAGED OR DESTROYED. THE
                                    HOTEL HAS THE DISCRETION TO LEVY ANY CHARGES
                                    IN FUTURE IF IT IS PROVEN BEYOND DOUBT THAT
                                    SUCH DAMAGE/DESTRUCTION TO THE ASSET OF THE
                                    HOTEL (BOTH MOVABLE AND IMMOVABLE) HAVE BEEN
                                    DONE OR CAUSED BY THE GUEST.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    IF YOU HAVE ANY ALLERGIES, SENSITIVITIES OR
                                    INTOLERANCE TO, BUT NOT LIMITED TO: A
                                    PARTICULAR FABRIC, MATERIAL, CLEANING
                                    PRODUCT OR FOOD, IT IS NOT HOTEL’S
                                    RESPONSIBILITY TO ADVISE HOTEL MANAGEMENT
                                    PRIOR TO ARRIVAL.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    YOUR VALUABLES CAN BE STORED IN A SAFETY
                                    DEPOSIT BOX IN YOUR ROOM OR THE HOTEL CAN
                                    STORE YOUR VALUABLES UPON REQUEST. THE HOTEL
                                    IS ENTITLED TO COLLECT A CHARGE FOR STORAGE
                                    OF THESE ITEMS.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    IN CASE THE ITEMS YOU WISH TO STORE ARE
                                    EXCEPTIONALLY VALUABLE YOU MUST NOTIFY THE
                                    HOTEL BEFORE STORING. THE HOTEL MAY REFUSE
                                    TO STORE THIS KIND OF VALUABLES.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    MANAGEMENT AND STAFF WORK HARD TO PROVIDE A
                                    SAFE AND SECURE ENVIRONMENT. WE DO
                                    EVERYTHING POSSIBLE TO ENSURE A SECURE
                                    ENVIRONMENT IS MAINTAINED AND WE ASK THAT
                                    OUR GUESTS DO ALSO. THE HOTEL TAKES NO
                                    RESPONSIBILITY FOR ANY PERSONAL POSSESSIONS
                                    THAT ARE LOST, STOLEN OR MISPLACED WHILST ON
                                    THE PREMISES DUE TO THE ACTS AND OMISSIONS
                                    OF THE GUESTS THEMSELVES.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    LOST PROPERTY FOUND ON THE PREMISES IS
                                    LOGGED AND KEPT IN A SECURE LOCATION FOR A
                                    PERIOD OF THREE (3) MONTHS. THEREAFTER ITEMS
                                    ARE EITHER DISPOSED OF OR DONATED TO
                                    CHARITY. THE HOTEL ACCEPTS NO RESPONSIBILITY
                                    FOR CONTACTING INDIVIDUALS IN RELATION TO
                                    LOST PROPERTY. PERISHABLE ITEMS RETRIEVED
                                    FROM ROOMS AFTER CHECK OUT ARE ONLY HELD
                                    UNTIL CLOSE OF BUSINESS THAT DAY.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    CLAIMED ITEMS CAN BE COLLECTED FROM THE
                                    HOTEL WITH VALID IDENTIFICATION OR
                                    ALTERNATIVELY THE HOTEL CAN ARRANGE POSTAGE
                                    ON BEHALF OF THE GUEST AT THEIR EXPENSE.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    THE HOTEL IS NOT RESPONSIBLE FOR DAMAGE OR
                                    DISAPPEARANCE OF VEHICLES KEPT IN THE
                                    PARKING AREA. THE HOTEL IS OBLIGED TO
                                    CLEARLY EXPRESS IN THE PARKING AREA THAT THE
                                    AREA IS NOT SUPERVISED AND THE HOTEL IS NOT
                                    RESPONSIBLE FOR THE PROPERTY KEPT IN THERE.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    VALET PARKING IS ALWAYS AT THE GUEST’S RISK
                                    AND ADVISE FROM THE SECURITY TEAM NEEDS TO
                                    BE STRICTLY ADHERED WITH BY THE GUEST AT THE
                                    TIME OF CHECKING IN. HOTEL WILL NOT BE
                                    ACCOUNTABLE FOR LOSS OF ANY VALUABLES FROM
                                    SUCH PARKED VEHICLES.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    THE COMPANY RESERVES THE RIGHT TO CHANGE
                                    THESE TERMS AND CONDITIONS AT ANY TIME
                                    WITHOUT PRIOR NOTICE. IN THE EVENT THAT ANY
                                    CHANGES ARE MADE, THE REVISED TERMS AND
                                    CONDITIONS SHALL BE POSTED ON THIS WEBSITE
                                    IMMEDIATELY. PLEASE CHECK THE LATEST
                                    INFORMATION POSTED HEREIN TO INFORM YOURSELF
                                    OF ANY CHANGES.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    WE DO OUR BEST TO ENSURE RESERVATION
                                    ARRANGEMENTS ARE SATISFACTORY, HOWEVER, THE
                                    HOTEL DOES NOT ACCEPT ANY LIABILITY FOR ANY
                                    LOSS FINANCIAL OR OTHERWISE, TRAVEL DELAY,
                                    INJURY, DAMAGE, ADDITIONAL EXPENSES OR
                                    INCONVENIENCE CAUSED DIRECTLY OR INDIRECTLY
                                    BY ANY EVENTS WHICH ARE BEYOND OUR
                                    CONTROL.&nbsp;THESE INCLUDE, BUT NOT LIMITED
                                    TO, FLIGHT DELAYS OR CANCELLATIONS, CIVIL
                                    DISTURBANCE, DEFECTS IN VEHICLES, STRIKES,
                                    THEFT, ACTS OF TERRORISM, NATURAL DISASTER,
                                    WAR, FIRE, FLOODS, ACTS OF GOD, ACTS OF
                                    GOVERNMENT OR OF ANY OTHER AUTHORITIES,
                                    CHANGES TO GOVERNMENT REGULATIONS, ACCIDENT
                                    TO OR FAILURE OF MACHINERY OR EQUIPMENT,
                                    MAINTENANCE REQUIREMENTS OR INDUSTRIAL
                                    ACTION.
                                  </p>
                                </li>
                                <li>
                                  <p>
                                    THE TRANSPORT TO THE AIRPORT IS PROVIDED AS
                                    AN ANCILLARY SERVICE AND THE HOTEL IS NOT
                                    ACCOUNTABLE TO WHATSOEVER HAPPENS TO THE
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
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "12px",
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
                  style={{
                    fontFamily:
                      '"Gotham", "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: "12px",
                    color: "rgb(74, 74, 74)",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontSize: "11px",
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
                      <div className data-child="row" data-effect="fadeInUp">
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
                                  fontFamily: '"Roboto", sans-serif',
                                  fontSize: "12px",
                                  textAlign: "center",
                                  textTransform: "uppercase",
                                  backgroundColor: "rgb(245, 245, 245)",
                                  color: "rgb(74, 74, 74)",
                                }}
                              >
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    BY PROCEEDING WITH THE RESERVATION, YOU
                                    FURTHER AGREE AND ACKNOWLEDGE THAT IF THE
                                    RESERVATION IS ACCEPTED BY THE HOTEL, YOUR
                                    STAY SUBSEQUENTLY SHALL BE SUBJECT TO THE
                                    HOTEL’S STANDARD TERMS AND CONDITIONS IN
                                    RESPECT OF THEIR RESERVATION / STAY AT THE
                                    HOTEL.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    YOU FURTHER AGREE THAT THE GENERAL TERMS AND
                                    CONDITIONS AS PROVIDED ON THE WEBSITE THE
                                    HOTEL DIPLOMAT.COM SHALL CONSTITUTE THE
                                    BINDING AGREEMENT BETWEEN YOURSELF AND HOTEL
                                    DIPLOMAT IN RELATION TO ANY AND ALL
                                    COMMERCIAL ARRANGEMENT INCLUDING
                                    RESERVATION, STAY, PAYMENT, USAGE OF
                                    FACILITIES, ETC. OF WHATSOEVER NATURE.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    THE HOTEL MAY, AT ITS ABSOLUTE DISCRETION,
                                    CANCEL THE RESERVATION IF THE HOTEL IS OF
                                    THE OPINION THAT THE RESERVATION INFORMATION
                                    PROVIDED IS FALSIFIED OR INCOMPLETE.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    GUEST VOLUNTARILY AGREES AND PERMITS THE
                                    HOTEL REPRESENTATIVES TO PROFILE THE GUEST
                                    FROM THE PUBLIC DOMAIN TO ASCERTAIN THE
                                    DETAILS OF THE GUEST AND RENDER ADEQUATE
                                    HOSPITALITY SERVICES TO THEM DURING THEIR
                                    STAY IN THE HOTEL.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    THE HOTEL SHALL BE ENTITLED TO VARY, AMEND
                                    AND/OR OTHERWISE CHANGE THESE TERMS AND
                                    CONDITIONS AT ANY TIME WITHOUT PRIOR NOTICE.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    YOU SHALL INDEMNIFY AND HOLD THE HOTEL
                                    HARMLESS IN RESPECT OF ANY LIABILITY, LOSS,
                                    DAMAGE, COST AND EXPENSE OF ANY NATURE
                                    ARISING OUT OF, AND/OR IN CONNECTION WITH
                                    THE ACCEPTANCE OF THE RESERVATION AND YOUR
                                    STAY IN THE HOTEL.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    THE HOTEL SHALL NOT BE LIABLE FOR ANY
                                    LOSSES, DAMAGES, COSTS OR EXPENSES INCURRED
                                    BY YOU AS A RESULT OF ANY CANCELLATION OF
                                    THE RESERVATION BY THE HOTEL.
                                  </p>
                                </li>
                                <li>
                                  <p style={{ marginBottom: "0cm" }}>
                                    THE HOTEL DOES NOT ACCEPT ANY LIABILITY FOR
                                    ANY FAILURE BY THE HOTEL TO COMPLY WITH
                                    THESE CONDITIONS WHERE SUCH FAILURE IS DUE
                                    TO CIRCUMSTANCES BEYOND ITS REASONABLE
                                    CONTROL.
                                  </p>
                                </li>
                                <li>
                                  <p>
                                    IF THE HOTEL WAIVES ANY RIGHTS AVAILABLE TO
                                    IT UNDER THESE CONDITIONS ON ONE OCCASION,
                                    THIS DOES NOT MEAN THAT THOSE RIGHTS WILL
                                    AUTOMATICALLY BE WAIVED ON ANY OTHER
                                    OCCASION.
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
                    fontFamily: '"source sans pro", sans-serif',
                    fontSize: "12px",
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
                      fontFamily:
                        '"open sans", "helvetica neue", helvetica, arial, sans-serif',
                      fontSize: "11px",
                    }}
                  >
                    <div className="content">
                      <div className data-child="row" data-effect="fadeInUp">
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
                              <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                {/* Content goes here */}
                              </div>
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
                      fontFamily:
                        '"open sans", "helvetica neue", helvetica, arial, sans-serif',
                      fontSize: "11px",
                    }}
                  />
                </h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ReportsOperationsVoucherPrint;
