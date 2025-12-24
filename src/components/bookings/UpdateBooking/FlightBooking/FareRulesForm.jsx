import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

const FareRulesForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    fields: fareRules,
    append: handleAddFareRule,
    remove: handleRemoveFareRule,
  } = useFieldArray({
    control,
    name: "fareRules", // This will be an array in the form data
  });

  // Determine if we can add a new rule (last one must have category & ruleText filled)
  const lastRuleFilled =
    fareRules.length > 0 &&
    fareRules[fareRules.length - 1]?.category &&
    fareRules[fareRules.length - 1]?.ruleText;

  const customAddButtonStyle = {
    background: "#1a385a",
    border: "none",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <div className="card shadow-sm mb-4" style={{ borderRadius: "8px" }}>
      <div
        className="card-header text-white p-3"
        style={{ borderRadius: "8px 8px 0 0", background: "#1A385A" }}
      >
        <h5 className="mb-0">Fare Rules</h5>
      </div>

      <div className="card-body p-4 bg-white">
        {fareRules.length === 0 ? (
          <div className="text-center text-muted py-4">
            <p className="editBookingFareRules mb-4">
              No fare rules available. Add a new rule to start.
            </p>
            <button
              type="button"
              onClick={() =>
                handleAddFareRule({
                  category: "",
                  ruleText: "",
                  changes: "",
                  cancellations: "",
                })
              }
              style={customAddButtonStyle}
              onMouseEnter={(e) => (e.target.style.transform = "translateY(-1px)")}
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
            >
              <i className="fas fa-plus"></i> Add Fare Rule
            </button>
          </div>
        ) : (
          <>
            {fareRules.map((rule, index) => (
              <div key={rule.id} className="mb-4 pb-4 border-bottom">
                <div className="row">
                  <div className="form-group col-md-3 mb-3">
                    <label className="font-weight-bold text-muted small">
                      Category <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm border-secondary"
                      placeholder="e.g., Cancellation"
                      {...register(`fareRules.${index}.category`, {
                        required: "Category is required",
                      })}
                      style={{ borderColor: "#6c757d" }}
                    />
                    {errors.fareRules?.[index]?.category && (
                      <small className="text-danger">
                        {errors.fareRules[index].category.message}
                      </small>
                    )}
                  </div>

                  <div className="form-group col-md-9 mb-3">
                    <label className="font-weight-bold text-muted small">
                      Rule Text <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control form-control-sm border-secondary"
                      rows="3"
                      placeholder="Enter detailed rule text..."
                      {...register(`fareRules.${index}.ruleText`, {
                        required: "Rule text is required",
                      })}
                      style={{ borderColor: "#6c757d", resize: "none" }}
                    />
                    {errors.fareRules?.[index]?.ruleText && (
                      <small className="text-danger">
                        {errors.fareRules[index].ruleText.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-6 mb-3">
                    <label className="font-weight-bold text-muted small">
                      Changes
                    </label>
                    <textarea
                      className="form-control form-control-sm border-secondary"
                      rows="2"
                      {...register(`fareRules.${index}.changes`)}
                      style={{ borderColor: "#6c757d", resize: "none" }}
                    />
                  </div>

                  <div className="form-group col-md-6 mb-3">
                    <label className="font-weight-bold text-muted small">
                      Cancellations
                    </label>
                    <textarea
                      className="form-control form-control-sm border-secondary"
                      rows="2"
                      {...register(`fareRules.${index}.cancellations`)}
                      style={{ borderColor: "#6c757d", resize: "none" }}
                    />
                  </div>
                </div>

                <div className="row justify-content-end align-items-center mt-3">
                  <div className="col-auto d-flex align-items-center gap-3">
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveFareRule(index)}
                      disabled={fareRules.length === 1}
                      className="btn btn-link text-danger p-0"
                      style={{
                        opacity: fareRules.length === 1 ? 0.5 : 1,
                        cursor: fareRules.length === 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      <i className="fa fa-trash" style={{ fontSize: "18px" }}></i>
                    </button>

                    {/* Add Button - only show on last rule and if filled */}
                    {index === fareRules.length - 1 && lastRuleFilled && (
                      <button
                        type="button"
                        onClick={() =>
                          handleAddFareRule({
                            category: "",
                            ruleText: "",
                            changes: "",
                            cancellations: "",
                          })
                        }
                        className="btn btn-link text-primary p-0"
                        style={{
                          color: "#ff5015",
                          borderBottom: "3px solid #ff5015",
                          fontWeight: "500",
                        }}
                      >
                        <i className="fas fa-plus mr-1"></i> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Initial Add Button when there are rules but last one is not filled */}
            {fareRules.length > 0 && !lastRuleFilled && (
              <div className="text-center mt-4">
                <small className="text-muted">
                  Fill the current rule to add another
                </small>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FareRulesForm;