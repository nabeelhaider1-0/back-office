import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Table, Row, Col, Badge } from "react-bootstrap";
import minus from "../../../assets/images/minus_white_img.jpg";

const PaymentLinkDetails = () => {
  const { id } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const statusColorClass = {
    pending: "label-warning",
    processing: "label-primary",
    authorised: "label-info",
    completed: "label-success",
    cancelled: "label-dark",
    failed: "label-danger",
  };
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/direct-payments/${id}`);
        if (!response.ok) throw new Error("Failed to fetch payment data");
        const data = await response.json();

        setPaymentData(data.data);
        console.log(paymentData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [id]);

  if (loading) return <Container className="my-4">Loading...</Container>;
  if (error) return <Container className="my-4">Error: {error}</Container>;
  if (!paymentData)
    return <Container className="my-4">No payment data found</Container>;

  return (
    <Container className="my-4">
      <div className="siteLogo" id="noprint">
        <img
          src="http://beta.tdonlines.com/project_folder/tdonline/images/logo.png"
          style={{ width: "100px" }}
          alt="Logo"
        />
      </div>

      {/* Payment Link Details Section */}
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center">
          <img
            src={minus}
            alt="Collapse"
            className="me-2"
            style={{ width: "20px" }}
          />
          Payment Link Information
        </Card.Header>
        <Card.Body className="bg-white">
          <Table responsive borderless>
            <tbody className="bg-white">
              <tr>
                <th scope="row">Payment ID</th>
                <td className="text-start">{paymentData.found.id}</td>
                <th scope="row">Booking ID</th>
                <td className="text-start">
                  {paymentData.found.booking_id || "N/A"}
                </td>
              </tr>
              <tr></tr>
              <tr>
                <th scope="row">Customer Email</th>
                <td className="text-start">
                  {paymentData.found.customer_email}
                </td>
                <th scope="row">Customer Phone</th>
                <td className="text-start">
                  {paymentData.found.customer_phone}
                </td>
              </tr>
              <tr>
                <th scope="row">Title</th>
                <td colSpan={3} className="text-start">
                  {paymentData.found.title}
                </td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td colSpan={3} className="text-start">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: paymentData.found.description,
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Created Date</th>
                <td className="text-start">
                  {paymentData.found.timestamps?.createdAt
                    ? new Date(
                        paymentData.found.timestamps?.createdAt
                      ).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </td>
                <th scope="row">Current Status</th>
                <td>
                  <span
                    className={`text-start mt-0 td_label ${
                      statusColorClass[paymentData.found.payment_status] ||
                      "label-secondary"
                    }`}
                  >
                    {paymentData.found.payment_status}
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Transactions Section */}
      <Card>
        <Card.Header className="d-flex align-items-center">
          <img
            src={minus}
            alt="Collapse"
            className="me-2"
            style={{ width: "20px" }}
          />
          Payment Logs
        </Card.Header>
        <Card.Body className="bg-white">
          <Table responsive striped>
            <thead>
              <tr>
                <th>Revolut Order ID</th>
                <th>State</th>
                <th>Order Amount</th>
                <th>Outstanding Amount</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Payment Method</th>
                <th>Checkout URL</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paymentData?.transactions?.length > 0 ? (
                paymentData.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.revolutOrderId || "N/A"}</td>
                    <td>
                      <span
                        className={`td_label ${
                          statusColorClass[transaction.state.toLowerCase()] ||
                          "label-secondary"
                        }`}
                      >
                        {transaction.state}
                      </span>
                    </td>
                    <td>
                      {paymentData.found.amount || "0"}{" "}
                      {paymentData.found?.currency || ""}
                    </td>
                    <td>
                      {transaction.orderOutstandingAmount?.value || "0"}{" "}
                      {transaction.orderOutstandingAmount?.currency || ""}
                    </td>
                    <td>
                      {transaction.createdAt
                        ? new Date(transaction.createdAt).toLocaleString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td>
                      {transaction.updatedAt
                        ? new Date(transaction.updatedAt).toLocaleString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td>
                      {transaction.paymentMethod?.type ? (
                        <>
                          {transaction.paymentMethod.type}
                          <br />
                          {transaction.paymentMethod.card?.card_number || "N/A"}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {transaction.checkout_url ? (
                        <a
                          href={transaction.checkout_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Checkout
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentLinkDetails;
