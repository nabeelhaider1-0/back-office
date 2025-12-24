import { Link } from "react-router-dom";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import { useEffect, useState } from "react";
import { delDATA, getDATA } from "../../../../Apis/API";
import loadingGif from "../../../../assets/images/loadingblue.gif";
import { deleteConfirmation } from "../../../../constants/globalfunctions";
import { setHotelsViewBasisDataRedux } from "../../../../state/action/actions";
import { connect } from "react-redux";
import ApiRoutes from "../../../../constants/ApiRoutes";
const MastersHotelRoomViewSearch = ({ setHotelsViewBasisDataRedux }) => {
  const handleEditClick = (Views) => {
    setHotelsViewBasisDataRedux(Views); // Dispatch the action to set the editBranchData in the Redux store
  };

  const [loading, setLoading] = useState(true); // Initially, set loading to true

  const [roomViewData, setRoomViewData] = useState([]);
  const [originalRoomViewData, setOriginalRoomViewData] = useState([]);
  const getViewBasis = async () => {
    try {
      setLoading(true);
      const response = await getDATA(ApiRoutes.HOTELS.ROOM_VIEW);

      if (response.data.statusCode === 200) {
        const viewBase =
          response && response.data.data ? response.data.data : [];
        setRoomViewData(viewBase);
        setOriginalRoomViewData(viewBase);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getViewBasis();
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredviewData = originalRoomViewData.filter((view) =>
      view.viewBasis.toLowerCase().includes(value.toLowerCase())
    );

    setRoomViewData(filteredviewData);
  };
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Room/View Base?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Room/Meal Base has been deleted successfully.",
        ApiRoutes.HOTELS.ROOM_VIEW
      );

      if (isDeleted) {
        setRoomViewData((prevViewData) =>
          prevViewData.filter((viewBase) => viewBase.uuid !== uuid)
        );
      } else {
      }
    } catch (error) {}
  };

  return (
    <>
      <Header2
        title="SEARCH VIEW BASIS DETAILS"
        linkText1="List View Basis "
        linkText2="Add New Basis"
        link2={Constants.URLConstants.MASTERSROOMVIEWNEW}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
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
                  <br />
                  <div className="row pd_tp">
                    <div className="row">
                      <div className="col-md-5 col_hide">
                        <div className="form-group col-md-12">&nbsp;</div>
                      </div>
                      <div className="col-md-5 col_hide">
                        {/* <div class="form-group"></div> */}
                        &nbsp;
                      </div>
                      <div className="col-md-2">
                        <style
                          dangerouslySetInnerHTML={{
                            __html:
                              "\n                                .table tr[visible='false'],\n                                .no-result {\n                                    display: none;\n                                    border: 1px solid #ddd;\n                                    padding: 10px;\n                                    margin-top: -2px;\n                                }\n\n                                .table tr[visible='true'] {\n                                    display: table-row;\n                                }\n\n                                .counter {\n                                    padding: 8px;\n                                    color: #ccc;\n                                }\n\n                                .search_new {\n                                    float: right;\n                                    height: 35px;\n                                    margin-bottom: 0px;\n                                    padding-left: 5px;\n                                }\n                            ",
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
                            placeholder="View/Basis Search"
                            value={searchInput}
                            onChange={handleInputSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="search_transfer_wrapper"
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
                            id="search_transfer"
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                            aria-describedby="search_transfer_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "993px" }}
                                  id="search_transfer-col-0"
                                >
                                  View Basis
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "304px" }}
                                  id="search_transfer-col-1"
                                >
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {roomViewData.map((views, index) => (
                                <tr
                                  key={views.uuid}
                                  className={
                                    index % 2 === 0
                                      ? "phps_row_0 even"
                                      : "phps_row_1 odd"
                                  }
                                  role="row"
                                >
                                  <td
                                    colSpan={1}
                                    data-columns="search_transfer-col-0"
                                  >
                                    &nbsp;{views.viewBasis}
                                  </td>
                                  <td
                                    className="actionlink"
                                    colSpan={1}
                                    data-columns="search_transfer-col-1"
                                  >
                                    <div
                                      className="actionCont"
                                      style={{ width: "67px" }}
                                    >
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSROOMVIEWEDIT
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Edit"
                                          onClick={() => handleEditClick(views)}
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
                                            handleDeleteClick(views.uuid)
                                          }
                                        >
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
export default connect(null, { setHotelsViewBasisDataRedux })(
  MastersHotelRoomViewSearch
);
