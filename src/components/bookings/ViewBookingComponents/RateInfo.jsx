import React from "react";
import minus from "../../../assets/images/minus_white_img.jpg";

const RateInfo = ({ bookingData }) => {
  const flightData = bookingData?.iternary_details || {};
  console.log("Flight Rate Infos:", flightData);
  const pax = flightData?.pax || { AD: 0, CD: 0, IN: 0 };
  const fare = flightData?.fare || [];
  const totalPrice = flightData?.total_fare || 0;
  const currency = flightData?.fare_currency || "USD";

  // Derive fare components for Adult, Child, and Infant
  const adultFareData = fare.find((f) => f.adult)?.adult || {
    total: 0,
    tax: 0,
  };
  const childFareData = fare.find((f) => f.child)?.child || {
    total: 0,
    tax: 0,
  };
  const infantFareData = fare.find((f) => f.infant)?.infant || {
    total: 0,
    tax: 0,
  };

  // Calculate base fare (total - tax) for each passenger type
  const adultBaseFare = adultFareData.total;
  const childBaseFare = childFareData.total;
  const infantBaseFare = infantFareData.total;

  // Build fare components array
  const fareComponents = [];

  if (pax.AD > 0) {
    fareComponents.push(
      {
        name: `Adult Base Fare (${pax.AD} pax)`,
        amount: adultBaseFare * pax.AD,
        currency: currency,
        included: true,
      },
      {
        name: `Adult Taxes and Fees (${pax.AD} pax)`,
        amount: adultFareData.tax * pax.AD,
        currency: currency,
        included: true,
      }
    );
  }

  if (pax.CD > 0) {
    fareComponents.push(
      {
        name: `Child Base Fare (${pax.CD} pax)`,
        amount: childBaseFare * pax.CD,
        currency: currency,
        included: true,
      },
      {
        name: `Child Taxes and Fees (${pax.CD} pax)`,
        amount: childFareData.tax * pax.CD,
        currency: currency,
        included: true,
      }
    );
  }

  if (pax.IN > 0) {
    fareComponents.push(
      {
        name: `Infant Base Fare (${pax.IN} pax)`,
        amount: infantBaseFare * pax.IN,
        currency: currency,
        included: true,
      },
      {
        name: `Infant Taxes and Fees (${pax.IN} pax)`,
        amount: infantFareData.tax * pax.IN,
        currency: currency,
        included: true,
      }
    );
  }

  return (
    <>
      <tr className="phps_row_0 tblHeading" id="acc5">
        <td colSpan={2} width="50%">
          <img src={minus} id="moreFilterBtn5" alt="cri" /> Supplier Rate
          Breakdown
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
                        {component.included ? "Included" : "Pay at Check-in"}
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
                <tr className="phps_row_1">
                  <td
                    align="center"
                    style={{ padding: "10px", textAlign: "center !important" }}
                  >
                    Total Price
                  </td>
                  <td align="center" style={{ textAlign: "center !important" }}>
                    <span style={{ color: "#d23600" }}>{totalPrice}</span>
                  </td>
                  <td align="center" style={{ textAlign: "center !important" }}>
                    {currency}
                  </td>
                  <td
                    align="center"
                    style={{ textAlign: "center !important" }}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <br></br>
      <br></br>
    </>
  );
};

export default RateInfo;
