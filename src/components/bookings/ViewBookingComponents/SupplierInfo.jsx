import React from "react";
import minus from "../../../assets/images/minus_white_img.jpg";

const SupplierInfo = (bookingData) => {
  const bookingDetail = bookingData.bookingData;
  console.log("bookingDetailbookingDetailbookingDetail", bookingDetail);
  return (
    <>
      <tr className="phps_row_0 tblHeading" id="acc7">
        <td colSpan={4}>
          <img src={minus} id="moreFilterBtn6" alt="cri" /> Supplier Information
        </td>
      </tr>
      <tr className="phps_row_1 accContent" id="accCont7">
        <td colSpan={4}>
          <div className="contwrap" id="r_6">
            <table
              width="100%"
              cellPadding={2}
              cellSpacing={1}
              align="center"
              border={0}
              className="table table-bordered table-responsive table-box tableborder"
            >
              <tbody className="bg-white">
                <tr className="phps_row_0">
                  <td width="25%">Supplier</td>
                  <td width="25%">{bookingDetail.supplier}</td>
                  <td width="25%">Supplier Confirmation #</td>
                  <td width="25%">
                    {bookingDetail.supplierrefno ||
                      bookingDetail?.hotel_booking_id ||
                      "N/A"}
                  </td>
                </tr>
                {/* <tr className="phps_row_1">
                  <td width="25%">Supplier Profile</td>
                  <td width="25%">{bookingDetail.supplier}</td>
                  <td width="25%">Supplier Itinerary Id</td>
                  <td width="25%">{bookingDetail?.pnr || bookingDetail?.hotel_booking_id}</td>
                </tr> */}
              </tbody>
            </table>
            <br />
            {/* <h6 className="header2">Supplier Rate Break up</h6>
            <table
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              className="table table-bordered  table-responsive tableborder"
              style={{ fontSize: "12px !important" }}
            >
              <thead>
                <tr className="phps_header">
                  <td width="25%" style={{ textAlign: "center !important" }}>
                    Room Type
                  </td>
                  <td align="center" width="25%" style={{ textAlign: "center !important" }}>
                    Room(s)
                  </td>
                  <td align="center" width="40%" style={{ textAlign: "center !important" }}>
                    Break Up
                  </td>
                </tr>
              </thead>
                <tbody className="bg-white">
                <tr>
                  <td align="left" style={{ padding: "10px", textAlign: "center !important" }}>
                    Deluxe Room ROOM ONLY
                  </td>
                  <td align="center" style={{ textAlign: "center !important" }}>
                    1
                  </td>
                  <td width="100%">
                    <table width="100%">
                        <tbody className="bg-white">
                        <tr>
                          <td align="center" className="para padd_5" style={{ borderBottom: "0px" }}>
                            Day 1<br />
                            <span style={{ color: "#d23600" }}>261.10</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ padding: "10px", textAlign: "center !important" }}>
                    Deluxe Room ROOM ONLY
                  </td>
                  <td align="center" style={{ textAlign: "center !important" }}>
                    1
                  </td>
                  <td width="100%">
                    <table width="100%">
                        <tbody className="bg-white">
                        <tr>
                          <td align="center" className="para padd_5" style={{ borderBottom: "0px" }}>
                            Day 1<br />
                            <span style={{ color: "#d23600" }}>261.10</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ padding: "10px", textAlign: "center !important" }}>
                    Deluxe Room ROOM ONLY
                  </td>
                  <td align="center" style={{ textAlign: "center !important" }}>
                    1
                  </td>
                  <td width="100%">
                    <table width="100%">
                        <tbody className="bg-white">
                        <tr>
                          <td align="center" className="para padd_5" style={{ borderBottom: "0px" }}>
                            Day 1<br />
                            <span style={{ color: "#d23600" }}>261.10</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              width="100%"
              cellPadding={2}
              cellSpacing={1}
              align="center"
              border={0}
              className="table table-responsive table-box tableborder"
            >
                <tbody className="bg-white">
                <tr className="phps_row_1">
                  <td width="25%">Supplier Rate</td>
                  <td width="25%">
                    783.300 EUR X 1.14734 = 898.711422 USD
                  </td>
                  <td width="25%">Supplier Discount Rate</td>
                  <td width="25%">EUR 0.000</td>
                </tr>
              </tbody>
            </table> */}
          </div>
        </td>
      </tr>
      <>
        <br></br>
        <br></br>
      </>
    </>
  );
};

export default SupplierInfo;
