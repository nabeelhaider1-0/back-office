import React from "react";
import minus from "../../../assets/images/minus_white_img.jpg";
import { Link } from "react-router-dom";
const Transactionslist = ({ bookingData }) => {
  const transactions = bookingData?.transactions || [];

  // Function to convert string to capital case
  const toCapitalCase = (str) => {
    if (!str) return str;
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Function to format nested objects (e.g., fees, paymentMethod)
  const formatNestedObject = (obj) => {
    if (!obj || Object.keys(obj).length === 0) return "N/A";
    return Object.entries(obj)
      .map(
        ([key, value]) =>
          `${toCapitalCase(key.replace(/([A-Z])/g, " $1"))}: ${value || "N/A"}`
      )
      .join(", ");
  };

  // Function to format fees array
  const formatFees = (fees) => {
    if (!fees || fees.length === 0) return "N/A";
    return fees
      .map((fee, index) => `Fee ${index + 1}: ${formatNestedObject(fee)}`)
      .join("; ");
  };

  return (
    <>
      {/* Transactions Table */}
      <tr className="phps_row_1 tblHeading" id="acc4">
        <td colSpan={4}>
          <img src={minus} id="moreFilterBtn4" alt="cri" /> Transaction Details
        </td>
      </tr>
      <tr className="phps_row_0 accContent" id="accCont4">
        <td colSpan={4}>
          <div className="contwrap" id="r_4">
            <table className="table table-bordered  table-responsive agent-text">
              <thead>
                <tr className="subHeader">
                  <td>Transaction ID</td>
                  <td>Revolut Order ID</td>
                  <td>Token</td>
                  <td>Type</td>
                  <td>State</td>
                  <td>Order Amount</td>
                  <td>Outstanding Amount</td>
                  <td>Description</td>
                  <td>Created At</td>
                  <td>Updated At</td>
                  <td>Capture Mode</td>
                  <td>Fees</td>
                  <td>Payment Method</td>
                  <td>Checkout URL</td>
                  <td>Risk Level</td>
                  <td>Settled Amount</td>
                  <td>Enforce Challenge</td>
                </tr>
              </thead>
              <tbody className="bg-white">
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>
                        {" "}
                        <Link
                          to={`/transactions?txid=${transaction.id}`}
                          target="_blank"
                        >
                          {transaction.id || "N/A"}
                        </Link>
                      </td>
                      <td>{transaction.revolutOrderId || "N/A"}</td>
                      <td>{transaction.token || "N/A"}</td>
                      <td>{toCapitalCase(transaction.type) || "N/A"}</td>
                      <td>{toCapitalCase(transaction.state) || "N/A"}</td>
                      <td>
                        {transaction.orderAmount?.value
                          ? `${transaction.orderAmount.currency} ${
                              transaction.orderAmount.value / 100
                            }`
                          : "N/A"}
                      </td>
                      <td>
                        {transaction.orderOutstandingAmount?.value
                          ? `${transaction.orderOutstandingAmount.currency} ${
                              transaction.orderOutstandingAmount.value / 100
                            }`
                          : "N/A"}
                      </td>
                      <td>{toCapitalCase(transaction.description) || "N/A"}</td>
                      <td>
                        {transaction.createdAt
                          ? new Date(transaction.createdAt).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>
                        {transaction.updatedAt
                          ? new Date(transaction.updatedAt).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>{toCapitalCase(transaction.captureMode) || "N/A"}</td>
                      <td>{formatFees(transaction.fees)}</td>
                      <td>{formatNestedObject(transaction.paymentMethod)}</td>
                      <td>
                        {transaction.checkout_url ? (
                          <a
                            href={transaction.checkout_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Link
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>{toCapitalCase(transaction.riskLevel) || "N/A"}</td>
                      <td>
                        {transaction.settledAmount != null
                          ? `${transaction.orderAmount?.currency || "USD"} ${
                              transaction.settledAmount / 100
                            }`
                          : "N/A"}
                      </td>
                      <td>
                        {toCapitalCase(transaction.enforceChallenge) || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={17}>No transactions available.</td>
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

export default Transactionslist;
