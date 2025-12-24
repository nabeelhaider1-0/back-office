import React from "react";
import minus from "../../../assets/images/minus_white_img.jpg";

const EscapraRateInfo = ({ bookingData }) => {
  const flightData = bookingData?.iternary_details || {};
  const appliedRevenueRules = flightData?.appliedRevenueRules || {};
  console.log("Escapra Rate Infos:", appliedRevenueRules);
  const escapra_total = appliedRevenueRules?.escapra_total || {};
  const escapra_passenger = appliedRevenueRules?.escapra_passenger || {};
  const pax = flightData?.pax || { AD: 0, CD: 0, IN: 0 };
  const currency = flightData?.fare_currency || "USD";
  const fare = flightData?.fare || [];
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
  // Build fare breakdown per passenger type
  const fareComponents = [];
  console.log("escapra_passenger", escapra_passenger);
  if (pax.AD > 0) {
    const adult = escapra_passenger?.adult || {};

    fareComponents.push(
      {
        name: `Adult Fare`,
        amount: adultFareData.total,
        currency,
        included: true,
      },
      {
        name: `Adult Taxes`,
        amount: adultFareData.tax,
        currency: currency,
        included: true,
      },
      {
        name: `Adult Markup`,
        amount: adult?.markup || 0,
        currency,
        included: true,
      },
      {
        name: `Adult Discount`,
        amount: -adult?.discount || 0, // Show discount as negative
        currency,
        included: true,
      }
    );
    console.log("fareComponentsfareComponentsfareComponents", fareComponents);
  }

  if (pax.CD > 0) {
    const child = escapra_passenger?.child || {};
    fareComponents.push(
      {
        name: `Child Fare`,
        amount: childFareData.total,
        currency,
        included: true,
      },
      {
        name: `Child Taxes`,
        amount: childFareData.tax || 0,
        currency: currency,
        included: true,
      },
      {
        name: `Child Markup`,
        amount: child?.markup || 0,
        currency,
        included: true,
      },
      {
        name: `Child Discount`,
        amount: -child?.discount || 0,
        currency,
        included: true,
      }
    );
  }

  if (pax.IN > 0) {
    const infant = escapra_passenger?.infant || {};
    fareComponents.push(
      {
        name: `Infant Fare`,
        amount: infantFareData.total || 0,
        currency,
        included: true,
      },
      {
        name: `Infant Taxes`,
        amount: infantFareData.tax || 0,
        currency: currency,
        included: true,
      },
      {
        name: `Infant Markup`,
        amount: infant?.markup || 0,
        currency,
        included: true,
      },
      {
        name: `Infant Discount`,
        amount: -infant?.discount || 0,
        currency,
        included: true,
      }
    );
  }

  // Add total level markup/discount breakdown
  fareComponents.push(
    {
      name: "Total Markup",
      amount: escapra_total.totalMarkup || 0,
      currency,
      included: true,
    },
    {
      name: "Total Discount",
      amount: -escapra_total.totalDiscount || 0,
      currency,
      included: true,
    }
  );

  return (
    <>
      <tr className="phps_row_0 tblHeading mt-5" id="acc5">
        <td colSpan={2} width="50%">
          <img src={minus} id="moreFilterBtn5" alt="cri" /> Escapra Rate
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
                        {component.currency}{" "}
                        {Number(component.amount || 0).toFixed(2)}
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
                    Grand Total (After Escapra Adjustments)
                  </td>
                  <td align="center" style={{ textAlign: "center !important" }}>
                    <span style={{ color: "#d23600" }}>
                      {" "}
                      {currency} {escapra_total.finalTotalFare?.toFixed(2)}
                    </span>
                  </td>
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

export default EscapraRateInfo;
