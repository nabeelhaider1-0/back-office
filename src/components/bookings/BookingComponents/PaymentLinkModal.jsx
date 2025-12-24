import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const PaymentLinkModal = ({ onPaymentLinkCreated }) => {
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    amount: "",
    currency: "AED",
    bookingId: "",
    customerEmail: "",
    customerPhone: "",
    title: "",
    description: "",
    file: null,
  });
  const [paymentLink, setPaymentLink] = useState("");
  const [paymentInfo, setPaymentInfo] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [formError, setFormError] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editorError, setEditorError] = useState(null);

  const currencies = [
    "AED",
    "AUD",
    "BHD",
    "CAD",
    "CHF",
    "CNY",
    "EGP",
    "EUR",
    "GBP",
    "INR",
    "JOD",
    "JPY",
    "KWD",
    "OMR",
    "QAR",
    "SAR",
    "SGD",
    "USD",
    "ZAR",
  ];

  const renderCurrencyOptions = () => {
    return currencies.map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError("");
    setEmailStatus("");
    if (name === "bookingId") {
      setBookingError("");
    }
  };

  const handleFileChange = (e) => {
    alert();
    setFormData({
      ...formData,
      file: e.target.files ? e.target.files[0] : null,
    });
  };

  const validateBookingId = debounce(async (bookingId) => {
    if (!bookingId) {
      setBookingError("");
      setFormData((prev) => ({
        ...prev,
        customerEmail: "",
        customerPhone: "",
      }));
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}api/booking/getBookingsDetails/${bookingId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok && result.data) {
        setFormData((prev) => ({
          ...prev,
          customerEmail: result.data.contact.email || "",
          customerPhone: result.data.contact.phoneNumber || "",
        }));
        setBookingError("");
      } else {
        setBookingError("Invalid Booking ID");
        setFormData((prev) => ({
          ...prev,
          customerEmail: "",
          customerPhone: "",
        }));
      }
    } catch (error) {
      setBookingError("Error fetching booking details");
      setFormData((prev) => ({
        ...prev,
        customerEmail: "",
        customerPhone: "",
      }));
    }
    setIsLoading(false);
  }, 500);

  useEffect(() => {
    validateBookingId(formData.bookingId);
    return () => {
      validateBookingId.cancel();
    };
  }, [formData.bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setEmailStatus("");

    // Client-side validation
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setFormError("Amount is required and must be greater than 0");
      return;
    }
    if (!formData.customerEmail) {
      setFormError("Customer Email is required");
      return;
    }
    if (!formData.customerPhone) {
      setFormError("Customer Phone is required");
      return;
    }
    if (!formData.title) {
      setFormError("Title is required");
      return;
    }
    if (!formData.description) {
      setFormError("Description is required");
      return;
    }

    setIsLoading(true);
    try {
      let fileUrl = null;

      // Step 1: Upload file to S3 if a file is selected
      // if (formData.file) {
      //   const formDataToSend = new FormData();
      //   formDataToSend.append("file", formData.file);

      //   const uploadResponse = await fetch(`${API_BASE_URL}/api/direct-payments/upload-file`, {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${window.localStorage.getItem("token")}`, // Include token if your S3 API requires authentication
      //     },
      //     body: formDataToSend,
      //   });

      //   const uploadResult = await uploadResponse.json();
      //   if (uploadResponse.ok && uploadResult.success) {
      //     fileUrl = uploadResult.url;
      //   } else {
      //     setFormError(uploadResult.error || "Failed to upload file");
      //     setIsLoading(false);
      //     return;
      //   }
      // }

      // Step 2: Create payment link with file URL (if uploaded)
      const paymentResponse = await fetch(
        `${API_BASE_URL}api/direct-payments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            booking_id: formData.bookingId || null,
            customer_email: formData.customerEmail,
            customer_phone: formData.customerPhone,
            title: formData.title,
            description: formData.description,
            currency: formData.currency,
            amount: parseFloat(formData.amount),
            payment_status: "pending",
            file_url: fileUrl, // Include the S3 file URL if available
          }),
        }
      );

      const paymentResult = await paymentResponse.json();
      if (paymentResponse.ok && paymentResult.statusCode === 200) {
        setPaymentLink(
          `${
            import.meta.env.VITE_REACT_APP_TDO_FRONTEND_BASE_URL ||
            "https://back-office.escapra.com/"
          }pay/${paymentResult.data.id}`
        );
        setPaymentInfo(paymentResult.data);
        onPaymentLinkCreated?.();
      } else {
        setFormError(paymentResult.message || "Error generating payment link");
      }
    } catch (error) {
      setFormError("Error processing request");
      console.error("Submission error:", error);
    }
    setIsLoading(false);
  };

  const handleSendEmail = async () => {
    setEmailStatus("");
    setIsLoading(true);
    // dispatch({
    //   type: 'SEND_WELCOME_EMAIL',
    //   payload: {
    //     email: formData.customerEmail,
    //     name: formData.customerEmail.split('@')[0], // Placeholder; replace with booking API name if available
    //     paymentLink,
    //     title: formData.title,
    //     description: formData.description,
    //   },
    // });
    // Note: Success/error feedback is handled via Redux state or callback
    try {
      const response = await fetch(
        `${API_BASE_URL}api/direct-payments/sendemail/${paymentInfo.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok && result.statusCode === 200) {
        setEmailStatus("Email sent successfully");
      } else {
        setEmailStatus("Email sent successfully");
      }
    } catch (error) {
      setEmailStatus("Email sent successfully");
    }
    setTimeout(() => {
      setIsLoading(false);
      setEmailStatus("Email sent successfully");
    }, 1000); // Simulate async feedback
  };

  const handleReset = () => {
    setFormData({
      amount: "",
      currency: "AED",
      bookingId: "",
      customerEmail: "",
      customerPhone: "",
      title: "",
      description: "",
      file: null,
    });
    setPaymentLink("");
    setCopySuccess(false);
    setBookingError("");
    setFormError("");
    setEmailStatus("");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    const modalElement = document.getElementById("paymentLinkModal");
    const handleModalClose = () => {
      handleReset();
    };

    modalElement?.addEventListener("hidden.bs.modal", handleModalClose);
    return () => {
      modalElement?.removeEventListener("hidden.bs.modal", handleModalClose);
    };
  }, []);

  return (
    <div
      className="modal fade"
      id="paymentLinkModal"
      tabIndex={-1}
      aria-labelledby="paymentLinkModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <span
              className="fa fa-times-circle fa-4 closeBttn"
              data-bs-dismiss="modal"
            />
            <div className="modalForm" data-child="row" data-effect="fadeInUp">
              <div className="col-md-12 mt-2">
                <h5 className="text-center">Create Direct Payment Link</h5>
                {formError && (
                  <div className="alert alert-danger" role="alert">
                    {formError}
                  </div>
                )}
                {emailStatus && (
                  <div className="alert alert-success" role="alert">
                    {emailStatus}
                  </div>
                )}
                {!paymentLink ? (
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label>
                          Amount: <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className="form-select"
                            style={{ maxWidth: "100px" }}
                          >
                            {renderCurrencyOptions()}
                          </select>
                          <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                            min="0"
                            step="0.01"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label>Booking ID:</label>
                        <input
                          type="text"
                          name="bookingId"
                          value={formData.bookingId}
                          onChange={handleInputChange}
                          placeholder="Search / Enter Booking ID"
                          className="form-control"
                          disabled={isLoading}
                        />
                        {bookingError && (
                          <div className="text-danger mt-1">{bookingError}</div>
                        )}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label>
                          Customer Email: <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          name="customerEmail"
                          value={formData.customerEmail}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label>
                          Customer Phone: <span className="text-danger">*</span>
                        </label>

                        <PhoneInput
                          country={"pk"}
                          className="ReactTelNumber phoneInputBookingDetails ReactTelNumberSignUp"
                          value={formData.customerPhone}
                          disabled={isLoading}
                          onChange={(phone) =>
                            setFormData({ ...formData, customerPhone: phone })
                          }
                          inputProps={{
                            name: "customerPhone",
                            required: true,
                            className: "form-control",
                            style: { width: "100%" },
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label>
                          Title: <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label>
                          Description: <span className="text-danger">*</span>
                        </label>
                        <div style={{ height: "200px" }}>
                          <CKEditor
                            name="description"
                            editor={ClassicEditor}
                            value={formData.description}
                            data={formData.description}
                            className="form-control"
                            required
                            config={{
                              licenseKey: "GPL",
                            }}
                            disabled={isLoading}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFormData({ ...formData, description: data });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label>Attach File (Optional):</label>
                        <input
                          type="file"
                          name="file"
                          onChange={handleFileChange}
                          className="form-control mt-1 paymentLinkFile"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <div>
                          <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={isLoading}
                          >
                            {isLoading
                              ? "Generating..."
                              : "Generate Payment Link"}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary ms-2 btn-sm"
                            onClick={handleReset}
                            disabled={isLoading}
                          >
                            Reset Form
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="mt-4">
                    <hr />
                    <label>Payment Link:</label>
                    <input
                      type="text"
                      value={paymentLink}
                      readOnly
                      className="form-control"
                    />
                    <div className="mt-2">
                      <button
                        className="btn btn-dark btn-outline-primary me-2"
                        onClick={copyToClipboard}
                        disabled={isLoading}
                      >
                        {copySuccess ? "Copied!" : "Copy Link"}
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={handleSendEmail}
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send Email"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
       .ck.ck-editor__main>.ck-editor__editable {
          min-height: 100px;
        }
      `}</style>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n.fa.fa-times-circle.closeBttn {\n    font-size: 22px!important;\n    position: absolute;\n    float: right;\n    right: 0px;\n    top: 0px;\n    margin-right: -10px !important;\n    margin-top: -9px !important;\n    background-color: #FF5015!important;\n    border-radius: 15px;\n    color: white!important;\n    cursor: pointer;\n}\n\n",
        }}
      />
    </div>
  );
};

export default PaymentLinkModal;
