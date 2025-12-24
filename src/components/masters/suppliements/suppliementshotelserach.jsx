import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import { deleteConfirmation } from "../../../constants/globalfunctions";
import { delDATA, getDATA } from "../../../Apis/API";
import { useEffect, useState } from "react";
import loadingGif from "../../../assets/images/loadingblue.gif";
import { setSupplementsDataRedux } from "../../../state/action/actions";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";

const MastersSuppliementsHotelSerach = ({ setSupplementsDataRedux }) => {
  const handleEditClick = (supplement) => {
    setSupplementsDataRedux(supplement); // Dispatch the action to set the editBranchData in the Redux store
  };
  const [loading, setLoading] = useState(true); // Initially, set loading to true

  const [supplementData, setSupplementData] = useState([]);
  const [originalSupplementData, setOriginalSupplementData] = useState([]);
  const getSupplements = async () => {
    try {
      setLoading(true);
      const response = await getDATA(ApiRoutes.HOTELS.SUPPLEMENTS);

      if (response.data.statusCode === 200) {
        const supplements =
          response && response.data.data ? response.data.data : [];
        setSupplementData(supplements);
        setOriginalSupplementData(supplements);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSupplements();
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredSupplementsData = originalSupplementData.filter(
      (supplement) =>
        supplement.supplementName.toLowerCase().includes(value.toLowerCase())
    );

    setSupplementData(filteredSupplementsData);
  };
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This SupplementName?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Supplement has been deleted successfully.",
        ApiRoutes.HOTELS.SUPPLEMENTS
      );

      if (isDeleted) {
        setSupplementData((prevViewData) =>
          prevViewData.filter((viewBase) => viewBase.uuid !== uuid)
        );
      } else {
      }
    } catch (error) {}
  };

  const [supplementSearch, setSupplementSearch] = useState("");
  const handleSearch = () => {
    // Filter data based on location name, selected country, and selected city
    const filteredData = originalSupplementData.filter((SupplementName) => {
      const supplementNameMatch = SupplementName.supplementName
        .toLowerCase()
        .includes(supplementSearch.toLowerCase());

      return supplementNameMatch;
    });

    setSupplementData(filteredData);
  };

  return (
    <>
      <Header2
        title="SEARCH SUPPLEMENT DETAILS
"
        linkText1="List Supplement"
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-3">
                <div className="form-group">
                  <label>Supplement Name</label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="txt_area_name"
                    id="txt_area_name"
                    size={20}
                    maxLength={50}
                    value={supplementSearch}
                    onChange={(e) => setSupplementSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <br />
            <div id="save_btn">
              <button
                className="btn btn-dark btn-sm form-group search"
                name="submit1"
                type="button"
                onClick={handleSearch}
              >
                <i className="fa fa-search" /> Search
              </button>
            </div>
            {/* <div id='save_loading' style='display:none'><img src='/cpfv3/images/ajax_pagination_loading.gif' alt=""></div> */}
          </div>
        </form>
        <br />
        <form>
          {loading && (
            <div className="text-center">
              <img src={loadingGif} alt="Loading..." height={250} />
            </div>
          )}
          {!loading && (
            <>
              <div className="panel-body removeMargins">
                <div className="dataTables_scroll">
                  <div className="row pd_tp">
                    <div className="row mt-4">
                      <div className="col-md-4 col_hide">
                        <div className="form-group col-md-12">&nbsp;</div>
                      </div>
                      <div className="col-md-6 col_hide">
                        {/* <div class="form-group"></div> */}
                        &nbsp;
                      </div>
                      <div className="col-md-2">
                        <style
                          dangerouslySetInnerHTML={{
                            __html:
                              "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
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
                            placeholder="Supplements Search"
                            value={searchInput}
                            onChange={handleInputSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="search_sup_wrapper"
                    className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                  >
                    <div className="row">
                      <div className="col-sm-6" />
                      <div className="col-sm-6" />
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div
                          className="doubleScroll-scroll-wrapper"
                          id="wrapper1"
                          style={{
                            height: "20px",
                            overflow: "scroll hidden",
                            width: "1320px",
                          }}
                        >
                          <div
                            className="suwala-doubleScroll-scroll"
                            style={{ height: "20px", width: "1320px" }}
                          />
                        </div>
                        <div id="wrapper2" style={{ overflow: "auto" }}>
                          <table
                            id="search_suppliment"
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                            aria-describedby="search_suppliment_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "860.2px" }}
                                >
                                  Supplement Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "608px" }}
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {supplementData.map((supplements, index) => (
                                <tr
                                  key={supplements.uuid}
                                  className={
                                    index % 2 === 0
                                      ? "phps_row_0 even"
                                      : "phps_row_1 odd"
                                  }
                                  role="row"
                                >
                                  <td>{supplements.supplementName}</td>
                                  <td className="actionlink">
                                    <div
                                      className="actionCont"
                                      style={{ width: "58px" }}
                                    >
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSSUPPLIEMENTSHOTELEDIT
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Edit"
                                          onClick={() =>
                                            handleEditClick(supplements)
                                          }
                                        >
                                          <i className="fa fa-pencil-square-o" />
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Delete"
                                          onClick={() =>
                                            handleDeleteClick(supplements.uuid)
                                          }
                                        >
                                          {/*<img src="images/delete.gif" alt="Delete" border=0>*/}
                                          <i className="fa fa-trash" />
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};
export default connect(null, { setSupplementsDataRedux })(
  MastersSuppliementsHotelSerach
);
