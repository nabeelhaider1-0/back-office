import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";

const MastersTaxesSearch = () => {
  return (
    <>
      <Header2
        title="SEARCH TAX"
        linkText1="Tax List"
        linkText2="Add Tax"
        link1={Constants.URLConstants.MASTERSTAXESNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row pd_tp">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group col-md-12">
                    <Link
                      to={Constants.URLConstants.MASTERSTAXESNEW}
                      className="btn btn-dark btn-sm leftTopBtn pull-left"
                    >
                      <i className="fa fa-plus" />
                      &nbsp;Add New Tax
                    </Link>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group" />
                </div>
                <div className="col-md-3 search_option">
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                            .table tr[visible='false'],\n                            .no-result {\n                                display: none;\n                                border: 1px solid #ddd;\n                                padding: 10px;\n                                margin-top: -2px;\n                            }\n\n                            .table tr[visible='true'] {\n                                display: table-row;\n                            }\n\n                            .counter {\n                                padding: 8px;\n                                color: #ccc;\n                            }\n\n                            .search_new {\n                                float: right;\n                                height: 35px;\n                                margin-bottom: 0px;\n                                padding-left: 5px;\n                            }\n                        ",
                    }}
                  />
                  <div
                    className="form-group col-md-2 new_search_icon"
                    style={{ textAlign: "right", paddingRight: "0px" }}
                  >
                    <h5 style={{ display: "inline" }}>
                      <i
                        className="fa fa-search srchWithinPg"
                        id="magnifiers"
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="Search within this table"
                      />
                    </h5>
                  </div>
                  <div className="form-group col-md-10 bookingsrc">
                    <input
                      type="text"
                      className="tablesearch form-control form-control-sm search_new"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="detail_header mt-4">
              <div className="form-group mesID1">
                <h6 className="text-center alert alert-danger">
                  No Result Found.
                </h6>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default MastersTaxesSearch;
