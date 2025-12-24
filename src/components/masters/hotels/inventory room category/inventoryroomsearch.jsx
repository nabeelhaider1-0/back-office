import { Link } from "react-router-dom";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import { useEffect, useState } from "react";
import { delDATA, getDATA } from "../../../../Apis/API";
import loadingGif from "../../../../assets/images/loadingblue.gif";
import {
  PaginationSetter,
  deleteConfirmation,
} from "../../../../constants/globalfunctions";
import { setHotelsInventoryRoomCategoryDataRedux } from "../../../../state/action/actions";
import { connect } from "react-redux";
import ApiRoutes from "../../../../constants/ApiRoutes";

const MastersHotelInventoryRoomCategorySearch = ({
  setHotelsInventoryRoomCategoryDataRedux,
}) => {
  const handleEditClick = (Inventory) => {
    setHotelsInventoryRoomCategoryDataRedux(Inventory); // Dispatch the action to set the editBranchData in the Redux store
  };

  const [loading, setLoading] = useState(true); // Initially, set loading to true
  const [currentPage, setCurrentPage] = useState(1);
  const [inventoryRoomCategoriesData, setInventoryRoomCategoriesData] =
    useState([]);
  const [
    originalInventoryRoomCategoriesData,
    setOriginalInventoryRoomCategoriesData,
  ] = useState([]);
  const getInventoryRoomCategories = async () => {
    try {
      setLoading(true);
      const response = await getDATA(ApiRoutes.HOTELS.INVENTORY_ROOM_CATEGORY);

      if (response.data.statusCode === 200) {
        const InventoryRoomCategories =
          response && response.data.data ? response.data.data : [];
        setInventoryRoomCategoriesData(InventoryRoomCategories);
        setOriginalInventoryRoomCategoriesData(InventoryRoomCategories);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInventoryRoomCategories();
  }, []);

  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Inventory Room Category?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Inventory Room Category has been deleted successfully.",
        ApiRoutes.HOTELS.INVENTORY_ROOM_CATEGORY
      );

      if (isDeleted) {
        setInventoryRoomCategoriesData((previnventoryData) =>
          previnventoryData.filter((inventory) => inventory.uuid !== uuid)
        );
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };

  const [inventorySearch, setInventorySearch] = useState("");
  const handleSearch = () => {
    // Filter data based on location name, selected country, and selected city
    const filteredData = originalInventoryRoomCategoriesData.filter(
      (inventoryName) => {
        const locationNameMatch = inventoryName.inventoryRoomCategory
          .toLowerCase()
          .includes(inventorySearch.toLowerCase());

        return locationNameMatch;
      }
    );

    setInventoryRoomCategoriesData(filteredData);
  };

  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    inventoryRoomCategoriesData
  );
  const totalPages = noofPages;
  const currentInventory = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header2
        title="INVENTORY ROOM CATEGORY"
        linkText1="List Inventory Room Category"
        linkText2="Add Inventory Room Category"
        link2={Constants.URLConstants.MASTERSINVENTORYROOMCATEGORYNEW}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="col-md-3 form-group">
              <label>Inventory Room</label>
              <input
                className="form-control form-control-sm test123"
                type="text"
                name="inventory"
                size={45}
                maxLength={255}
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-3 form-group">
              <button
                className="btn btn-dark btn-sm form-group search"
                name="submit1"
                type="button"
                onClick={handleSearch}
              >
                <i className="fa fa-search" /> Search
              </button>
            </div>
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
              <div className="dataTables_scroll">
                <div className="row">
                  <div className="row">
                    <div className="col-md-4 col_hide">
                      <div className="form-group col-md-12">&nbsp;</div>
                    </div>
                    <div className="col-md-5 col_hide">
                      <div className="form-group">
                        {/*Pagination panel*/}
                        <nav aria-label="Page navigation example">
                          <ul className="pagination pagination-sm justify-content-center mt-4">
                            {Array.from({ length: totalPages }).map(
                              (_, index) => (
                                <li key={index} className="page-item">
                                  <Link
                                    to="#"
                                    className="page-link"
                                    onClick={() => paginate(index + 1)}
                                    style={{
                                      backgroundColor:
                                        currentPage === index + 1
                                          ? "#FF5015"
                                          : "transparent",
                                      color:
                                        currentPage === index + 1
                                          ? "white"
                                          : "black", // Highlighting logic
                                      // Add more styles as needed
                                    }}
                                  >
                                    {index + 1}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </nav>
                      </div>
                      &nbsp;
                    </div>
                    <div className="col-md-3">&nbsp;</div>
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
                                style={{ width: "852px" }}
                              >
                                Inventory Room Category
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "445px" }}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {currentInventory.map((inventory, index) => (
                              <tr
                                key={inventory.uuid}
                                className={
                                  index % 2 === 0
                                    ? "phps_row_0 even"
                                    : "phps_row_1 odd"
                                }
                                role="row"
                              >
                                <td>{inventory.inventoryRoomCategory}</td>
                                <td className="actionlink">
                                  <div className="actionCont">
                                    <div className="input-group-addon">
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .MASTERSINVENTORYROOMCATEGORYEDIT
                                        }
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title
                                        data-original-title="Edit"
                                        onClick={() =>
                                          handleEditClick(inventory)
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
                                          handleDeleteClick(inventory.uuid)
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
            </>
          )}
        </form>
      </div>
    </>
  );
};
export default connect(null, { setHotelsInventoryRoomCategoryDataRedux })(
  MastersHotelInventoryRoomCategorySearch
);
