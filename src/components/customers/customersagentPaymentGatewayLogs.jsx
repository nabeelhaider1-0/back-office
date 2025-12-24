import Header2 from "../header2/header2";

const CustomersAgentPayementgatewayLogs = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="PAYMENT GATEWAY LOGS" />

        {/* First Row*/}
        <div
          className="panel-body"
          style={{
            backgroundColor: "#FF5015",
            paddingBottom: "1px",
            paddingTop: "4px",
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <h5
                style={{ color: "white", fontSize: "15px", marginLeft: "20px" }}
              >
                CA0319 / Shiv Travels / Shiv Chauhan / Active
              </h5>
            </div>
          </div>
        </div>
        <form style={{ paddingRight: "12px", paddingBottom: "1px" }}>
          <div className="panel-body">
            <div
              className="alert alert-danger text-center"
              style={{
                color: "var(--color-white) !important",
                backgroundColor: "#f2dede !important",
                fontWeight: "normal !important",
                fontSize: "12px !important",
              }}
            >
              <h5
                style={{
                  fontWeight: "normal !important",
                  fontSize: "16px !important",
                }}
              >
                No Data Found.
              </h5>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CustomersAgentPayementgatewayLogs;
