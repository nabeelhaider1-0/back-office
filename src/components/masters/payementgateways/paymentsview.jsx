import { connect } from "react-redux";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MasterPaymentView = ({ data }) => {
  const navigateOnRefresh = useNavigate();
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.MASTERSPAYMENTSEARCH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);

  return (
    <>
      <Header2
        title="VIEW PAYMENT GATEWAYS"
        linkText1="List Payment Gateways"
        linkText2="View Payment Gateways"
        link1={Constants.URLConstants.MASTERSPAYMENTSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n.panel-body.bg-primary {\n    background-color: #FF5015!important;\n    padding: 4px 20px!important;\n   \n}\n\n    ",
          }}
        />

        <div>
          <div className="panel-body sectHeader bg-primary">
            <div className="row">
              <div className="col-md-3">
                <h5 style={{ color: "white", fontSize: "14px" }}>
                  Name : {data.paymentGatewayName}
                </h5>
              </div>
            </div>
          </div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div
                  className="form-group col-md-3"
                  style={{ wordWrap: "break-word" }}
                >
                  <label>URL</label>
                  <br />
                  {data.paymentGatewayURL}
                </div>
                <div className="form-group col-md-3">
                  <label>Code</label>
                  <div>{data.code}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Markup %</label>
                  <div>{data.markup}</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(MasterPaymentView);
