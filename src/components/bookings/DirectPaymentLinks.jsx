import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import PaymentLinkModal from "../bookings/BookingComponents/PaymentLinkModal";
import axios from "axios";
import PaymentLinkDetails from "./BookingComponents/PaymentLinkDetails";
const DirectPaymentLinks = () => {
  const [paymentLinks, setPaymentLinks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [meta, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const statusColorClass = {
    pending: "label-warning",
    processing: "label-primary",
    authorised: "label-info",
    completed: "label-success",
    cancelled: "label-dark",
    failed: "label-danger",
  };
  const fetchPaymentLinks = async () => {
    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL; // Fallback URL

      const response = await axios.get(
        `${API_BASE_URL}api/direct-payments?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const result = response;
      console.log(`result`, result.data.statusCode);
      if (result.data.statusCode === 200) {
        console.log("data", result.data.data);
        console.log(result.data.data.meta);
        setPaymentLinks(result.data.data);
        setTotalPages(result.data.meta);
      } else {
        console.error("Error fetching payment links:", result.message);
      }
    } catch (error) {
      console.error("Error fetching payment links:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPaymentLinks();
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < meta.totalPages) setPage(page + 1);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment link?")) {
      try {
        const response = await fetch(`/direct_payments_links/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (result.statusCode === 200) {
          fetchPaymentLinks(); // Refresh list
        } else {
          console.error("Error deleting payment link:", result.message);
        }
      } catch (error) {
        console.error("Error deleting payment link:", error);
      }
    }
  };

  return (
    <>
      <Header2 title="Direct Payments" linkText1="Direct Payments" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form className="mt-5">
          <div className="row mt-4 align-items-center">
            {/* Search Input (Left) */}
            <div className="col-md-2" style={{ position: "relative" }}>
              <input
                type="text"
                className="tablesearch form-control form-control-sm search_new"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
                style={{ paddingRight: "30px" }}
              />
              <i
                className="fa fa-search fa-lg"
                style={{
                  color: "#fff",
                  position: "absolute",
                  top: "50%",
                  right: "18px",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Spacer / Empty Column */}
            <div className="col-md-8" />

            {/* Generate Payment Button (Right) */}
            <div className="col-md-2 text-end">
              <button
                className="btn btn-dark btn-sm"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#paymentLinkModal"
              >
                Generate Payment
              </button>
            </div>
          </div>

          <div
            id="search_controller_wrapper"
            className="dataTables_wrapper form-inline dt-bootstrap no-footer"
          >
            <div className="row">
              <div className="col-sm-12">
                <div
                  className="doubleScroll-scroll-wrapper"
                  id="wrapper1"
                  style={{
                    height: "20px",
                    overflow: "scroll hidden",
                    width: "1320px",
                  }}
                />
                <div
                  id="wrapper2"
                  className="mt-3"
                  style={{ overflow: "auto" }}
                >
                  <table
                    id="searchbookingTable"
                    className="table  table-responsive dataTable no-footer table table-bordered"
                    role="grid"
                    aria-describedby="search_sup_info"
                    width="2500px"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Payment ID</th>
                        <th>Booking Id</th>
                        <th>Customer Email</th>
                        <th>Customer Phone</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th className="no-sort lastColumn sorting_disabled">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {loading ? (
                        <tr>
                          <td colSpan={11} className="text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : paymentLinks.length === 0 ? (
                        <tr>
                          <td colSpan={11} className="text-center">
                            No payment links found
                          </td>
                        </tr>
                      ) : (
                        paymentLinks.map((link, index) => (
                          <tr key={link.id}>
                            <td>{(page - 1) * limit + index + 1}</td>
                            <td>{link.payment_id}</td>
                            <td>{link.booking_id || "-"}</td>
                            <td>{link.customer_email}</td>
                            <td>{link.customer_phone}</td>
                            <td>{link.title}</td>

                            <td>{`${link.currency} ${link.amount}`}</td>
                            <td>
                              <span
                                className={`td_label 
                              ${
                                statusColorClass[link.payment_status] ||
                                "label-secondary"
                              }`}
                              >
                                {link.payment_status}
                              </span>
                            </td>
                            <td>
                              {new Date(
                                link.timestamps.createdAt
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              <Link
                                className="btn btn-sm btn-danger"
                                to={`/direct-payments/detail/${link.id}`}
                              >
                                View
                              </Link>
                              {/* <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(link.id)}
                              >
                                Delete
                              </button> */}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                <div className="row mt-3">
                  <div className="col-sm-12 col-md-5">
                    <div>
                      Showing {(page - 1) * limit + 1} to{" "}
                      {Math.min(
                        page * limit,
                        paymentLinks.length + (page - 1) * limit
                      )}{" "}
                      of {meta.total} entries
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-7 text-end">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={handlePreviousPage}
                      disabled={page === 1}
                    >
                      Previous
                    </button>
                    <span>
                      Page {page} of {meta.totalPages}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={handleNextPage}
                      disabled={page === meta.totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* Render the PaymentLinkModal */}
        <PaymentLinkModal />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .fa.fa-times-circle.closeBtn {
                font-size: 1.6em!important;
                position: absolute;
                float: right;
                right: 0px;
                top: 0px;
                margin-right: -10px;
                margin-top: -136px;
                background-color: white;
                border-radius: 15px;
                color: #000!important;
                cursor: pointer;
              }
              .td_label {
                padding: 2px 6px;
                border-radius: 4px;
                color: white;
              }
              .label-pending {
                background-color: #ffc107;
              }
              .label-confirmed {
                background-color: #28a745;
              }
              .label-failed {
                background-color: #dc3545;
              }
            `,
          }}
        />
      </div>
    </>
  );
};

export default DirectPaymentLinks;
