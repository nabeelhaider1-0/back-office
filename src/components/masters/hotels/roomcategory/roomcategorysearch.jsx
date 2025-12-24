/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import MultiSelect from "../../../reactMultiSelect";
import React, { useEffect, useState } from "react";
import { delDATA, getDATA } from "../../../../Apis/API";
import {
  PaginationSetter,
  deleteConfirmation,
  filterOptionsByValue,
} from "../../../../constants/globalfunctions";
import loadingGif from "../../../../assets/images/loadingblue.gif";
import { room_options } from "../../../../constants/contants";
import { setMastersRoomCategoryEdit } from "../../../../state/action/actions";
import { connect } from "react-redux";
import ApiRoutes from "../../../../constants/ApiRoutes";

const MastersHotelRoomCategorySearch = ({ setMastersRoomCategoryEdit }) => {
  const [loading, setLoading] = useState(true); // Initially, set loading to true
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [RoomData, setRoomData] = useState([]);
  const [originalRoomData, setOriginalRoomData] = useState([]);
  const [InventoryRoomCategoryOptions, setInventoryRoomCategoryOptions] =
    useState([]);
  const [SupplierOptions, setSupplierOptions] = useState([]);
  const [formData, setFormData] = useState({
    inventoryroomcategory: "",
    supplier: "",
    roomcategory: "",
  });
  const getRoomCategories = async () => {
    try {
      setLoading(true);
      const response = await getDATA(ApiRoutes.HOTELS.ROOM_CATEGORY);

      if (response.data.statusCode === 200) {
        const categories =
          response && response.data.data ? response.data.data : [];
        setRoomData(categories);
        setOriginalRoomData(categories);
        await extractvalues(categories);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const extractvalues = async (categories) => {
    const uniqueInventoryRoomCategories = [
      ...new Set(
        categories.map((item) => item.inventoryRoom.inventoryRoomCategory)
      ),
    ];

    // Extract unique suppliers
    const uniqueSuppliers = [
      ...new Set(categories.map((item) => item.supplier.supplierName)),
    ];

    // Create options for inventory room categories
    const inventoryRoomCategoryOptions = uniqueInventoryRoomCategories.map(
      (category) => ({
        value: category,
        label: category,
      })
    );

    // Create options for suppliers
    const supplierOptions = uniqueSuppliers.map((supplier) => ({
      value: supplier,
      label: supplier,
    }));

    // Add default options for both
    const defaultInventoryRoomCategory = { value: "", label: "- Select -" };
    const defaultSupplier = { value: "", label: "- Select -" };

    setInventoryRoomCategoryOptions([
      defaultInventoryRoomCategory,
      ...inventoryRoomCategoryOptions,
    ]);
    setSupplierOptions([defaultSupplier, ...supplierOptions]);
  };

  useEffect(() => {
    getRoomCategories();
  }, []);
  const handleEdditClick = (room) => {
    setMastersRoomCategoryEdit(room);
  };
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Room Category?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Room Category has been deleted successfully.",
        ApiRoutes.HOTELS.ROOM_CATEGORY
      );

      if (isDeleted) {
        setOriginalRoomData((room) => room.filter((r) => r.uuid !== uuid));

        setRoomData((room) => room.filter((r) => r.uuid !== uuid));
        extractvalues(originalRoomData);
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalRoomData.filter((room) =>
      room.inventoryRoom.inventoryRoomCategory
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setRoomData(filtereData);
  };
  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value, // Assuming the option object has a 'value' property
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const filteredData = originalRoomData.filter((roomdata) => {
      // Convert strings to lowercase for case-insensitive comparison
      const lowerRoomCategory = filterOptionsByValue(
        room_options,
        roomdata.roomType
      )[0]
        .label.toLowerCase()
        .trim();
      const lowerInventoryRoomCategory =
        roomdata.inventoryRoom.inventoryRoomCategory.toLowerCase().trim();
      const lowerSupplier = roomdata.supplier.supplierName.toLowerCase().trim();

      // // Check if each field matches the corresponding search criteria
      const matchesRoomCat = lowerRoomCategory.includes(
        formData.roomcategory.toLowerCase().trim()
      );
      const matchesInventorcat =
        !formData.inventoryroomcategory ||
        formData.inventoryroomcategory === "" ||
        lowerInventoryRoomCategory ===
          (formData.inventoryroomcategory || "").toLowerCase().trim();
      const matchesSupplier =
        !formData.supplier ||
        formData.supplier === "" ||
        lowerSupplier === (formData.supplier || "").toLowerCase().trim();
      // Return true if all search criteria match
      return matchesInventorcat && matchesSupplier && matchesRoomCat;
    });

    setRoomData(filteredData);
  };

  const resetform = (event) => {
    event.preventDefault();

    // First, set the form data
    setFormData({
      inventoryroomcategory: "",
      supplier: "",
      roomcategory: "",
    });
    setRoomData(originalRoomData);
  };
  const { currentdata, noofPages } = PaginationSetter(currentPage, RoomData);
  const totalPages = noofPages;
  const currentrooms = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2
        title="SEARCH ROOM TYPE DETAILS"
        linkText1="List Room Category"
        linkText2="Add Room Category"
        link2={Constants.URLConstants.MASTERSROOMCATEGORYNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit} id="roomcategorysearchform">
          <div className="panel-body">
            <div className="row form-group">
              <div className="col-md-3 form-group">
                <label>Inventory Room Category</label>
                <MultiSelect
                  options={InventoryRoomCategoryOptions}
                  isSearchable
                  placeholder="- Select Inventory -"
                  className="custom-select"
                  name="inventoryroomcategory"
                  value={InventoryRoomCategoryOptions.find(
                    (option) => option.value === formData.inventoryroomcategory
                  )}
                  onChange={(selectedOption) =>
                    handleSingleSelectChange(
                      selectedOption,
                      "inventoryroomcategory"
                    )
                  }
                  noOptionsMessage={() => "No Inventory Found"}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Supplier</label>
                <MultiSelect
                  options={SupplierOptions}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select "
                  name="supplier"
                  value={SupplierOptions.find(
                    (option) => option.value === formData.supplier
                  )}
                  onChange={(selectedOption) =>
                    handleSingleSelectChange(selectedOption, "supplier")
                  }
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Room Category</label>
                <input
                  className="form-control form-control-sm selectpicker show-menu-arrow"
                  type="text"
                  name="roomcategory"
                  id="roomcategory"
                  value={formData.roomcategory}
                  onChange={handleInputChange}
                  size={10}
                  data-live-search="true"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12 form-group">
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  value="Search"
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
                </button>
                <button
                  className="btn btn-dark btn-sm mx-1"
                  type="reset"
                  id="reset"
                  name="reset"
                  value="reset"
                  onClick={resetform}
                  data
                >
                  <i className="fa fa-repeat" /> &nbsp;Reset
                </button>
              </div>
            </div>
          </div>
        </form>
        <br />
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form>
              <div className="panel-body removeMargins">
                <div className="mesID" style={{ display: "none" }}></div>
                <div className="row pd_tp">
                  <div className="row mt-4">
                    <div className="col-md-5"></div>
                    <div className="col-md-3 col_hide">
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
                    </div>
                    <div className="col-md-2" />
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
                          placeholder="Inventory Room"
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
                        ></div>
                      </div>
                      <div id="wrapper2" style={{ overflow: "auto" }}>
                        <table
                          id="search_transfer"
                          className="table   table-responsive dataTable no-footer table table-bordered"
                          role="grid"
                          aria-describedby="search_transfer_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "254px" }}
                              >
                                Inventory Room Category
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "231px" }}
                              >
                                Supplier{" "}
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "159px" }}
                              >
                                Room Category
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "117px" }}
                              >
                                Minimum Adults
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "202px" }}
                              >
                                Max Pax(without Extrabed)
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "75px" }}
                              >
                                Extra Bed
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "121px" }}
                              >
                                Non Refundable
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "60px" }}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {currentrooms.map((room, index) => (
                              <React.Fragment key={index}>
                                <tr
                                  className={
                                    "phps_row_" +
                                    (index % 2 === 0 ? "0 even" : "1 odd")
                                  }
                                  role="row"
                                >
                                  <td>
                                    {room.inventoryRoom.inventoryRoomCategory}
                                  </td>
                                  <td>{room.supplier.supplierName}</td>
                                  <td>
                                    {
                                      filterOptionsByValue(
                                        room_options,
                                        room.roomType
                                      )[0].label
                                    }
                                  </td>
                                  <td>-</td>
                                  <td>{room.maxPax}</td>
                                  <td>{room.extraBed}</td>
                                  <td>{room.nonRefundable}</td>

                                  <td className="actionlink">
                                    <div className="actionCont">
                                      <div className="input-group-addon">
                                        <Link
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Delete"
                                          onClick={() =>
                                            handleDeleteClick(room.uuid)
                                          }
                                        >
                                          <i className="fa fa-trash" />
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSROOMCATEGORYEDIT
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Edit"
                                          onClick={() => handleEdditClick(room)}
                                        >
                                          <i className="fa fa-pencil-square-o" />
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div
                        className="dataTables_info"
                        id="search_transfer_info"
                        role="status"
                        aria-live="polite"
                      ></div>
                    </div>
                    <div className="col-sm-6" />
                  </div>
                </div>
                <div className="form-group no-result">
                  <h5 className="text-center">
                    No Room Category found in the system.
                  </h5>
                </div>
                <div className="row pd_tp">
                  <div className="row">
                    <div className="col-md-4 col_hide">
                      <div className="form-group col-md-6 col_hide">&nbsp;</div>
                    </div>
                    <div className="col-md-5">
                      <div className="form-group">
                        {/*Pagination panel*/}
                        {/* <nav aria-label="Page navigation example">
                      <ul className="pagination pagination-sm justify-content-center mt-1">
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            1
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            2
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            3
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            4
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#" aria-label="Next">
                            <span aria-hidden="true">»</span>
                          </Link>
                        </li>
                      </ul>
                    </nav> */}
                      </div>
                    </div>
                    <div className="col-md-3 col_hide">&nbsp;</div>
                  </div>
                </div>
                <br />
                <br />
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default connect(null, { setMastersRoomCategoryEdit })(
  MastersHotelRoomCategorySearch
);
