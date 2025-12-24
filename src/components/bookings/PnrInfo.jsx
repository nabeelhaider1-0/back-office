import React from "react";
import {
  Accordion,
  Card,
  Row,
  Col,
  Badge,
  OverlayTrigger,
  Tooltip,
  Table,
} from "react-bootstrap";
import { BiChevronDown } from "react-icons/bi";
import "./PnrInfo.css";

const PnrInfo = ({ tripDetails }) => {
  if (!tripDetails) {
    return null;
  }

  return (
    <div className="">
      <Card className="shadow-sm border-light">
        <Accordion defaultActiveKey={["0", "1", "2", "3", "4", "5"]}>
          {/* Booking Information */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <BiChevronDown size={22} className="me-2" /> Booking Information
            </Accordion.Header>
            <Accordion.Body>
              <div className="pnr-info-grid">
                <Row className="justify-content-center g-3 mb-3">
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Supplier Reference#</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo?.bookingId}
                    </div>
                  </Col>
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Booking Status</div>
                    <div className="pnr-value">
                      <Badge
                        bg={
                          tripDetails.bookingInfo.status === "Booked"
                            ? "success"
                            : "warning"
                        }
                        className="px-3 py-2"
                      >
                        {tripDetails.bookingInfo.status}
                      </Badge>
                    </div>
                  </Col>
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Ticket Status</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo.ticketStatus}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center g-3 mb-3">
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Fare Type</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo.fareType}
                    </div>
                  </Col>
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Trip Type</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo.tripType}
                    </div>
                  </Col>
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Origin</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo.origin}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center g-3 mb-3">
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Destination</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo.destination}
                    </div>
                  </Col>
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Booking Created On</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo.bookingCreatedOn}
                    </div>
                  </Col>
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Ticketing Time Limit</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo.ticketingTimeLimit}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center g-3">
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Rerouting Allowed</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo.reroutingAllowed}
                    </div>
                  </Col>
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Voiding Window</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo.voidingWindow}
                    </div>
                  </Col>
                  <Col md={4} sm={12} className="pnr-info-item">
                    {/* Empty column for alignment */}
                  </Col>
                </Row>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* Passenger Information */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <BiChevronDown size={22} className="me-2" /> Passenger Information
            </Accordion.Header>
            <Accordion.Body>
              {Array.isArray(tripDetails.passengers) &&
              tripDetails.passengers.length > 0 ? (
                <Table responsive striped hover className="pnr-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Nationality</th>
                      <th>Passport Number</th>
                      <th>Date of Birth</th>
                      <th>Gender</th>
                      <th>Passenger Type</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Passport Expiry</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Country</th>
                      <th>Ticket Number</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {tripDetails.passengers.map((passenger, index) => (
                      <tr key={index}>
                        <td>{passenger.name}</td>
                        <td>{passenger.nationality}</td>
                        <td>{passenger.passportNumber}</td>
                        <td>{passenger.dateOfBirth}</td>
                        <td>{passenger.gender}</td>
                        <td>{passenger.passengerType}</td>
                        <td>{passenger.email}</td>
                        <td>{passenger.phone}</td>
                        <td>{passenger.passportExpiresOn}</td>
                        <td>{passenger.address}</td>
                        <td>{passenger.city}</td>
                        <td>{passenger.country}</td>
                        <td>{passenger.ticketNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center text-muted">
                  No passenger information available
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>

          {/* Flight Details */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <BiChevronDown size={22} className="me-2" /> Flight Details
            </Accordion.Header>
            <Accordion.Body>
              {Array.isArray(tripDetails.flights) &&
              tripDetails.flights.length > 0 ? (
                <Table responsive striped hover className="pnr-table">
                  <thead>
                    <tr>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Flight Number</th>
                      <th>Airline</th>
                      <th>Cabin Class</th>
                      <th>Baggage Allowance</th>
                      <th>Cabin Baggage</th>
                      <th>Journey Duration</th>
                      <th>Aircraft Type</th>
                      <th>Departure Date/Time</th>
                      <th>Arrival Date/Time</th>
                      <th>Arrival Terminal</th>
                      <th>Departure Terminal</th>
                      <th>PNR</th>
                      <th>Fare Family</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {tripDetails.flights.map((flight, index) => (
                      <tr key={index}>
                        <td>{flight.origin}</td>
                        <td>{flight.destination}</td>
                        <td>{flight.flightNumber}</td>
                        <td>{flight.airline}</td>
                        <td>{flight.cabinClass}</td>
                        <td>{flight.baggageAllowance}</td>
                        <td>{flight.cabinBaggageAllowance}</td>
                        <td>{flight.journeyDuration}</td>
                        <td>{flight.aircraftType}</td>
                        <td>{flight.departureDateTime}</td>
                        <td>{flight.arrivalDateTime}</td>
                        <td>{flight.arrivalTerminal}</td>
                        <td>{flight.departureTerminal || "N/A"}</td>
                        <td>{flight.pnr}</td>
                        <td>{flight.fareFamily}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center text-muted">
                  No flight information available
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>

          {/* Fare Details */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <BiChevronDown size={22} className="me-2" /> Fare Details
            </Accordion.Header>
            <Accordion.Body>
              {Array.isArray(tripDetails.fareBreakdowns) &&
              tripDetails.fareBreakdowns.length > 0 ? (
                <Table responsive striped hover className="pnr-table">
                  <thead>
                    <tr>
                      <th>Passenger Type</th>
                      <th>Quantity</th>
                      <th>Total Fare</th>
                      <th>Base Fare</th>
                      <th>Taxes</th>
                      <th>Service Tax</th>
                      <th>Tax Breakdown</th>
                      <th>Refund Policy</th>
                      <th>Exchange Policy</th>
                      <th>Baggage Allowance</th>
                      <th>Cabin Baggage Allowance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {tripDetails.fareBreakdowns.map((fare, index) => (
                      <tr key={index}>
                        <td>{fare.passengerType}</td>
                        <td>{fare.quantity}</td>
                        <td>{fare.totalFare}</td>
                        <td>{fare.baseFare}</td>
                        <td>{fare.taxes}</td>
                        <td>{fare.serviceTax}</td>
                        <td>
                          {fare.taxBreakdown}{" "}
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="tax-breakdown-tooltip">
                                Detailed tax components
                              </Tooltip>
                            }
                          >
                            <i
                              className="bi bi-info-circle ms-1"
                              aria-hidden="true"
                            />
                          </OverlayTrigger>
                        </td>
                        <td>{fare.refundPolicy}</td>
                        <td>{fare.exchangePolicy}</td>
                        <td>{fare.baggageInfo?.[0] || "Not Available"}</td>
                        <td>{fare.cabinBaggageInfo?.[0] || "Not Available"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center text-muted">
                  No fare information available
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>

          {/* Transactions */}
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <BiChevronDown size={22} className="me-2" /> Transactions
            </Accordion.Header>
            <Accordion.Body>
              {Array.isArray(tripDetails.transactions) &&
              tripDetails.transactions.length > 0 ? (
                <Table responsive striped hover className="pnr-table">
                  <thead>
                    <tr>
                      <th>Transaction</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {tripDetails.transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center text-muted">
                  No transaction information available
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>

          {/* Additional Information */}
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <BiChevronDown size={22} className="me-2" /> Additional
              Information
            </Accordion.Header>
            <Accordion.Body>
              <div className="pnr-info-grid">
                <Row className="justify-content-center g-3 mb-3">
                  <Col md={4} sm={12} className="pnr-info-item">
                    <div className="pnr-label">Booking Notes</div>
                    <div className="pnr-value">
                      {tripDetails.bookingInfo.bookingNotes}
                    </div>
                  </Col>
                  <Col md={4} sm={12} className="pnr-info-item">
                    {/* Empty column for alignment */}
                  </Col>
                  <Col md={4} sm={12} className="pnr-info-item">
                    {/* Empty column for alignment */}
                  </Col>
                </Row>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
    </div>
  );
};

export default PnrInfo;
