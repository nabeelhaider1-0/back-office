import React from "react";
import minus from "../../../assets/images/minus_white_img.jpg";

const HotelRateInfo = ({ bookingData }) => {
  const hotelInfo = bookingData?.hotelinfo;
  const fareComponents = hotelInfo?.searchedRoomDetails?.fare?.components || [];
  const totalPrice = hotelInfo?.searchedRoomDetails?.price || 0;
  const currency = hotelInfo?.searchedRoomDetails?.currency || "USD";

  return (
    <>
      <tr className="phps_row_0 tblHeading" id="acc5">
        <td colSpan={2} width="50%">
          <img src={minus} id="moreFilterBtn5" alt="cri" /> Supplier Rate
          Breakdown
        </td>
        <td colSpan={2} width="50%">
          <b style={{ color: "#FF5015" }}>
            Total Price ={(totalPrice || 0).toFixed(2)} {currency}
          </b>
        </td>
      </tr>
      <tr id="accCont5" className="accContent">
        <td colSpan={4}>
          <div className="contwrap" id="r_5">
            <table
              cellPadding={0}
              cellSpacing={0}
              width="100%"
              className="table table-bordered  table-responsive agent-text"
            >
              <thead>
                <tr className="phps_header">
                  <td width="25%" style={{ textAlign: "center !important" }}>
                    Component
                  </td>
                  <td
                    align="center"
                    width="25%"
                    style={{ textAlign: "center !important" }}
                  >
                    Amount
                  </td>
                  <td
                    align="center"
                    width="25%"
                    style={{ textAlign: "center !important" }}
                  >
                    Currency
                  </td>
                  <td
                    align="center"
                    width="25%"
                    style={{ textAlign: "center !important" }}
                  >
                    Status
                  </td>
                </tr>
              </thead>
              <tbody className="bg-white">
                {fareComponents.length > 0 ? (
                  fareComponents.map((component, index) => (
                    <tr key={component.name || index}>
                      <td
                        align="center"
                        style={{
                          padding: "10px",
                          textAlign: "center !important",
                        }}
                      >
                        {component.name || "Unknown Component"}
                      </td>
                      <td
                        align="center"
                        style={{ textAlign: "center !important" }}
                      >
                        {component.amount || 0}
                      </td>
                      <td
                        align="center"
                        style={{ textAlign: "center !important" }}
                      >
                        {component.currency || currency}
                      </td>
                      <td
                        align="center"
                        style={{ textAlign: "center !important" }}
                      >
                        {component.included ? "Included" : "Pay at Hotel"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      align="center"
                      style={{
                        padding: "10px",
                        textAlign: "center !important",
                      }}
                    >
                      No price components available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </>
  );
};

export default HotelRateInfo;
