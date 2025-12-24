const RoomDetailsForm = ({ roomRows, handleRoomChange, handleAddRoom, handleRemoveRoom, buttonStyles }) => (
  <div className="card shadow-sm mb-4" style={{ borderTop: "4px solid #FF5015", borderRadius: "8px" }}>
    <div className="card-header bg-info text-white p-3" style={{ borderRadius: "8px 8px 0 0" }}>
      <h5 className="mb-0">
        <i className="fas fa-bed me-2"></i>Room Details
      </h5>
    </div>
    <div className="card-body p-4">
      {roomRows.map((row, index) => (
        <div key={index} className="card mb-3" style={{ border: "1px solid #dee2e6", borderRadius: "6px" }}>
          <div className="card-body p-3">
            <div className="row">
              <div className="form-group col-md-4 mb-2">
                <label className="font-weight-bold text-muted small">Room Type</label>
                <input
                  type="text"
                  className="form-control form-control-sm border-secondary"
                  placeholder="e.g., Executive King Room"
                  value={row.room_type}
                  onChange={(e) => handleRoomChange(index, "room_type", e.target.value)}
                  required
                  style={{ borderColor: "#6c757d" }}
                />
              </div>
              <div className="form-group col-md-8 mb-2">
                <label className="font-weight-bold text-muted small">Description</label>
                <input
                  type="text"
                  className="form-control form-control-sm border-secondary"
                  placeholder="e.g., Executive Room (1 King Bed/2 Twin Beds)"
                  value={row.description}
                  onChange={(e) => handleRoomChange(index, "description", e.target.value)}
                  required
                  style={{ borderColor: "#6c757d" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 mb-2">
                <label className="font-weight-bold text-muted small"># of Rooms</label>
                <input
                  type="number"
                  className="form-control form-control-sm border-secondary"
                  value={row.no_of_rooms}
                  onChange={(e) => handleRoomChange(index, "no_of_rooms", parseInt(e.target.value))}
                  min="1"
                  required
                  style={{ borderColor: "#6c757d" }}
                />
              </div>
              <div className="form-group col-md-4 mb-2">
                <label className="font-weight-bold text-muted small"># of Adults</label>
                <input
                  type="number"
                  className="form-control form-control-sm border-secondary"
                  value={row.no_of_adults}
                  onChange={(e) => handleRoomChange(index, "no_of_adults", parseInt(e.target.value))}
                  min="1"
                  required
                  style={{ borderColor: "#6c757d" }}
                />
              </div>
              <div className="form-group col-md-4 mb-2">
                <label className="font-weight-bold text-muted small"># of Children</label>
                <input
                  type="number"
                  className="form-control form-control-sm border-secondary"
                  value={row.no_of_children}
                  onChange={(e) => handleRoomChange(index, "no_of_children", parseInt(e.target.value))}
                  min="0"
                  style={{ borderColor: "#6c757d" }}
                />
              </div>
            </div>
            <div className="row justify-content-end mt-3">
              <div className="col-auto">
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleRemoveRoom(index)}
                  onMouseEnter={(e) => (e.target.style.transform = "translateY(-1px)")}
                  onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
                  disabled={roomRows.length === 1}
                  style={roomRows.length === 1 ? { ...buttonStyles.minusButton, opacity: 0.5, cursor: "not-allowed" } : buttonStyles.minusButton}
                >
                  <i className="fas fa-minus"></i>
                </button>
                {index === roomRows.length - 1 && (
                  <button
                    type="button"
                    className="btn"
                    onClick={handleAddRoom}
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
  </div>
);

export default RoomDetailsForm;