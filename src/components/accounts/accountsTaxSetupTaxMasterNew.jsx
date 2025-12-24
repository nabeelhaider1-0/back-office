import Constants from "../../constants/routes";
import Header2 from "../header2/header2";

const AccountsTaxSetupTaxMasterNew = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="ADD TAX"
          linkText1="Search Tax Master"
          link1={Constants.URLConstants.ACCOUNTSTAXSETUPTAXMASTERSEARCH}
        />

        <form>
          <div className="row">
            <div className="form-group col-md-3">
              <label>Tax Name :</label>
              <input
                className="required form-control form-control-sm test123"
                type="text"
                name="tax_name"
                size={11}
                id="tax_name"
              />
            </div>
          </div>
          {/* 2nd Row */}
          <div className="row mt-3">
            <div className="col-md-3 form-group">
              <label>Tax Percentage :</label>
              <div className="input-group col-xs-12">
                <input
                  className="form-control form-control-sm type="
                  name="tax_value"
                  placeholder="%"
                  id="tax_value"
                />
                <span
                  id="EBD_show_per"
                  className="input-group-addon "
                  style={{ textAlign: "center" }}
                >
                  %
                </span>
              </div>
            </div>
          </div>
          {/* 3rd Row */}
          <div className="row mt-3">
            <div className="form-group col-md-3">
              <label>Tax Type :</label>
              <div className="radioline1 mt-1">
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    id="tax_type_input"
                    name="tax_type"
                    defaultValue="IP"
                  />
                  <label htmlFor="tax_type_input">Input</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    id="tax_type_output"
                    name="tax_type"
                    defaultValue="OP"
                  />
                  <label htmlFor="tax_type_output">Output</label>
                </div>
              </div>
            </div>
          </div>
          {/* 4th Row */}
          <div className="row mt-3">
            <div className="form-group col-md-12">
              <button
                type="button"
                className="btn btn-dark btn-sm"
                value="Submit"
                id="submit_button"
                onclick="javaScript submit_form(document.forms['rec_frm'],'save');"
              >
                <i className="fa fa-floppy-o" />
                &nbsp;Save
              </button>
              &nbsp;&nbsp;
              <button
                type="reset"
                className="btn btn-outline-secondary btn-sm"
                value="Reset"
                onclick="reset1();"
              >
                <i className="fa fa-repeat" />
                &nbsp;Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AccountsTaxSetupTaxMasterNew;
