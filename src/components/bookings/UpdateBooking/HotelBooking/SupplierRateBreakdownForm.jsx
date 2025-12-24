import React from "react";

const SupplierRateBreakdownForm = ({ formData, fareComponents, handleInputChange, handleComponentChange, handleAddComponent, handleRemoveComponent, buttonStyles }) => {
  // Calculate total from included components
  const includedTotal = fareComponents.reduce((sum, comp) => sum + (comp.included ? parseFloat(comp.amount) || 0 : 0), 0);
  const isTotalValid = Math.abs(includedTotal - parseFloat(formData.supplierTotalPrice)) <= 0.01;

  return (
    <div className="card shadow-sm mb-4" style={{ borderTop: "4px solid #FF5015", borderRadius: "8px" }}>
      <div className="card-header bg-secondary text-white p-3" style={{ borderRadius: "8px 8px 0 0" }}>
        <h5 className="mb-0">
          <i className="fas fa-calculator me-2"></i>Supplier Rate Breakdown
        </h5>
      </div>
      <div className="card-body p-4">
        <div className="row">
          <div className="form-group col-md-4 mb-3">
            <label className="font-weight-bold text-muted">Supplier Currency</label>
            <input
              type="text"
              name="supplierCurrency"
              value={formData.supplierCurrency}
              onChange={handleInputChange}
              className="form-control form-control-sm required"
              required
              style={{ borderColor: "#6c757d" }}
            />
          </div>
          <div className="form-group col-md-4 mb-3">
            <label className="font-weight-bold text-muted">Supplier Base Price</label>
            <input
              type="number"
              name="supplierBasePrice"
              value={formData.supplierBasePrice}
              onChange={handleInputChange}
              className="form-control form-control-sm required"
              required
              min="0"
              step="0.01"
              style={{ borderColor: "#6c757d" }}
            />
          </div>
          <div className="form-group col-md-4 mb-3">
            <label className="font-weight-bold text-muted">Supplier Total Price</label>
            <input
              type="number"
              name="supplierTotalPrice"
              value={formData.supplierTotalPrice}
              onChange={handleInputChange}
              className="form-control form-control-sm required"
              required
              min="0"
              step="0.01"
              style={{ borderColor: "#6c757d" }}
            />
          </div>
        </div>
        <div className="mt-4">
          <h6 className="font-weight-bold text-muted">Fare Components</h6>
          {fareComponents.map((comp, index) => (
            <div key={index} className="card mb-3" style={{ border: "1px solid #dee2e6", borderRadius: "6px" }}>
              <div className="card-body p-3">
                <div className="row">
                  <div className="form-group col-md-3 mb-2">
                    <label className="font-weight-bold text-muted small">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm border-secondary"
                      value={comp.name}
                      onChange={(e) => handleComponentChange(index, "name", e.target.value)}
                      required
                      style={{ borderColor: "#6c757d" }}
                    />
                  </div>
                  <div className="form-group col-md-3 mb-2">
                    <label className="font-weight-bold text-muted small">Type</label>
                    <select
                      className="form-control form-control-sm border-secondary"
                      value={comp.type}
                      onChange={(e) => handleComponentChange(index, "type", e.target.value)}
                      required
                      style={{ borderColor: "#6c757d" }}
                    >
                      <option value="">Select Type</option>
                      <option value="base">Base</option>
                      <option value="tax">Tax</option>
                      <option value="charge">Charge</option>
                      <option value="total">Total</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2 mb-2">
                    <label className="font-weight-bold text-muted small">Amount</label>
                    <input
                      type="number"
                      className="form-control form-control-sm border-secondary"
                      value={comp.amount}
                      onChange={(e) => handleComponentChange(index, "amount", e.target.value)}
                      min="0"
                      step="0.01"
                      required
                      style={{ borderColor: "#6c757d" }}
                    />
                  </div>
                  <div className="form-group col-md-2 mb-2">
                    <label className="font-weight-bold text-muted small">Currency</label>
                    <input
                      type="text"
                      className="form-control form-control-sm border-secondary"
                      value={comp.currency}
                      onChange={(e) => handleComponentChange(index, "currency", e.target.value)}
                      required
                      style={{ borderColor: "#6c757d" }}
                    />
                  </div>
                  <div className="form-group col-md-2 mb-2 d-flex align-items-end">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={comp.included}
                        onChange={(e) => handleComponentChange(index, "included", e.target.checked ? "true" : "false")}
                        style={{ borderColor: "#6c757d" }}
                      />
                      <label className="form-check-label text-muted small">Included</label>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-end mt-3">
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleRemoveComponent(index)}
                      onMouseEnter={(e) => (e.target.style.transform = "translateY(-1px)")}
                      onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
                      disabled={fareComponents.length === 1}
                      style={fareComponents.length === 1 ? { ...buttonStyles.minusButton, opacity: 0.5, cursor: "not-allowed" } : buttonStyles.minusButton}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    {index === fareComponents.length - 1 && (
                      <button
                        type="button"
                        className="btn"
                        onClick={handleAddComponent}
                        onMouseEnter={(e) => (e.target.style.transform = "translateY(-1px)")}
                        onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
                        style={buttonStyles.plusButton}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <p className="font-weight-bold text-muted mb-1">Included Total</p>
            <p className={isTotalValid ? "text-dark" : "text-danger"}>
              {formData.supplierCurrency} {includedTotal.toFixed(2)}
              {!isTotalValid && (
                <small className="d-block text-danger">
                  Must equal Supplier Total Price ({formData.supplierTotalPrice})
                </small>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierRateBreakdownForm;