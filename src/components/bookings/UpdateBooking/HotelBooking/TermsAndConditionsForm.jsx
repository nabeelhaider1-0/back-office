import React from "react";

const TermsAndConditionsForm = ({ terms, handleTermsChange }) => (
  <div className="card shadow-sm mb-4" style={{ borderTop: "4px solid #FF5015", borderRadius: "8px" }}>
    <div className="card-header bg-success text-white p-3" style={{ borderRadius: "8px 8px 0 0" }}>
      <h5 className="mb-0">
        <i className="fas fa-file-alt me-2"></i>Terms and Conditions
      </h5>
    </div>
    <div className="card-body p-4">
      <div className="row">
        <div className="form-group col-md-12 mb-3">
          <label className="font-weight-bold text-muted">Remarks</label>
          <textarea
            value={terms.remarks}
            onChange={(e) => handleTermsChange("remarks", e.target.value)}
            className="form-control form-control-sm border-secondary"
            rows="5"
            style={{ borderColor: "#6c757d", resize: "vertical" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6 mb-3">
          <label className="font-weight-bold text-muted">Comments</label>
          <textarea
            value={terms.comments}
            onChange={(e) => handleTermsChange("comments", e.target.value)}
            className="form-control form-control-sm border-secondary"
            rows="3"
            style={{ borderColor: "#6c757d", resize: "vertical" }}
          />
        </div>
        <div className="form-group col-md-6 mb-3">
          <label className="font-weight-bold text-muted">Cancellation Policy</label>
          <textarea
            value={terms.cancellationPolicy}
            onChange={(e) => handleTermsChange("cancellationPolicy", e.target.value)}
            className="form-control form-control-sm border-secondary"
            rows="3"
            style={{ borderColor: "#6c757d", resize: "vertical" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Meal Plan</label>
          <input
            type="text"
            value={terms.mealplan}
            onChange={(e) => handleTermsChange("mealplan", e.target.value)}
            className="form-control form-control-sm border-secondary"
            style={{ borderColor: "#6c757d" }}
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Board Type</label>
          <input
            type="text"
            value={terms.boardType}
            onChange={(e) => handleTermsChange("boardType", e.target.value)}
            className="form-control form-control-sm border-secondary"
            style={{ borderColor: "#6c757d" }}
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Check-in Time</label>
          <input
            type="text"
            value={terms.checkinTime}
            onChange={(e) => handleTermsChange("checkinTime", e.target.value)}
            className="form-control form-control-sm border-secondary"
            placeholder="e.g., 2:00 PM"
            style={{ borderColor: "#6c757d" }}
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Check-out Time</label>
          <input
            type="text"
            value={terms.checkoutTime}
            onChange={(e) => handleTermsChange("checkoutTime", e.target.value)}
            className="form-control form-control-sm border-secondary"
            placeholder="e.g., 12:00 PM"
            style={{ borderColor: "#6c757d" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-12 mb-3">
          <label className="font-weight-bold text-muted">Promotions (comma-separated)</label>
          <input
            type="text"
            value={terms.promotions}
            onChange={(e) => handleTermsChange("promotions", e.target.value)}
            className="form-control form-control-sm border-secondary"
            style={{ borderColor: "#6c757d" }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default TermsAndConditionsForm;