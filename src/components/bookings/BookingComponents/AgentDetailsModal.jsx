import React from "react";

const AgentDetailsModal = () => {
  return (
    <div className="modal fade" id="emailCont" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content" style={{ width: "460px", marginTop: "175px" }}>
          <div className="color-line"></div>
          <div className="modal-body">
            <span className="fa fa-times-circle fa-4 closeBtn" data-bs-dismiss="modal" />
            <div className="modalForm" data-child="row" data-effect="fadeInUp">
              <div className="col-md-12 mt-2">
                <h5>Agent Details</h5>
                <div className="row mt-2 mb-4">
                  <div className="col-md-4">
                    <label>City :</label>
                    <span>Kulkata</span>
                  </div>
                  <div className="col-md-4">
                    <label>Country : </label>
                    <span>India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailsModal;