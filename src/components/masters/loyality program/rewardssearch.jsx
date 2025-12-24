/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import loadingGif from "../../../assets/images/loadingblue.gif";
import MultiSelect from "../../reactMultiSelect";
import React, { useEffect, useState } from "react";
import {
  ErrorApiAlert,
  PaginationSetter,
  deleteConfirmation,
} from "../../../constants/globalfunctions";
import { delDATA, getDATA } from "../../../Apis/API";
import { connect } from "react-redux";
import { setMastersLoyaltyProductEdit } from "../../../state/action/actions";
import ApiRoutes from "../../../constants/ApiRoutes";

const MastersLoyalityProgramRewardsSearch = ({
  setMastersLoyaltyProductEdit,
}) => {
  const [RewardsData, setRewardsData] = useState([]);
  const [originalRewardsData, setOriginalRewardsData] = useState([]);
  const [productCategoryOptions, setproductCategoryOptions] = useState([]);
  const [loyaltyTierOptions, setloyaltyTierOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    productName: "",
    productCategoryUuid: "",
    tierUuid: "",
  });

  const handleEdditClick = (prod) => {
    setMastersLoyaltyProductEdit(prod);
  };

  const getloyaltyRewards = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.LOYALTY_PROGRAM.REWARDS);
      if (response.data.statusCode === 200) {
        const rewards =
          response && response.data.data ? response.data.data : [];

        setRewardsData(rewards);
        setOriginalRewardsData(rewards);
        extractuniquvalues(rewards);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Loyalty Products");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getloyaltyRewards();
  }, []);
  const extractuniquvalues = (data) => {
    // Extracting unique product categories
    const uniqueProductCategories = [
      ...new Set(data.map((item) => item.productCategoryUuid.uuid)),
    ].map((uuid) => {
      const category = data.find(
        (item) => item.productCategoryUuid.uuid === uuid
      );
      return {
        value: category.productCategoryUuid.productCategoryName,
        label: category.productCategoryUuid.productCategoryName,
      };
    });

    // Adding default option for uniqueProductCategories
    uniqueProductCategories.unshift({
      value: "",
      label: "- Select Category -",
    });

    // Extracting unique tiers
    const uniqueTiers = [
      ...new Set(data.map((item) => item.tierUuid.uuid)),
    ].map((uuid) => {
      const tier = data.find((item) => item.tierUuid.uuid === uuid);
      return { value: tier.tierUuid.tierName, label: tier.tierUuid.tierName };
    });

    // Adding default option for uniqueTiers
    uniqueTiers.unshift({ value: "", label: "- Select Loyalty Tier -" });

    // Setting state variables
    setloyaltyTierOptions(uniqueTiers);
    setproductCategoryOptions(uniqueProductCategories);
  };

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalRewardsData.filter((rewards) =>
      rewards.productName.toLowerCase().includes(value.toLowerCase())
    );

    setRewardsData(filtereData);
  };

  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Loyalty Product?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Loyalty Product has been deleted successfully.",
        ApiRoutes.LOYALTY_PROGRAM.REWARDS
      );

      if (isDeleted) {
        setOriginalRewardsData((rewards) =>
          rewards.filter((r) => r.uuid !== uuid)
        );

        setRewardsData((rewards) => rewards.filter((r) => r.uuid !== uuid));
        extractuniquvalues(originalRewardsData);
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value, // Assuming the option object has a 'value' property
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredRewards = originalRewardsData.filter((reward) => {
      // Convert strings to lowercase for case-insensitive comparison
      const lowerProductName = reward.productName.toLowerCase();
      const lowerCategoryName =
        reward.productCategoryUuid.productCategoryName.toLowerCase();
      const lowerTierName = reward.tierUuid.tierName.toLowerCase();

      // Check if each field matches the corresponding search criteria
      const matchesProductName = lowerProductName.includes(
        formData.productName.toLowerCase()
      );
      const matchesCategoryName =
        formData.productCategoryUuid === "" ||
        lowerCategoryName.includes(formData.productCategoryUuid.toLowerCase());
      const matchesTierName =
        formData.tierUuid === "" ||
        lowerTierName.includes(formData.tierUuid.toLowerCase());
      // Return true if all search criteria match
      return matchesCategoryName && matchesProductName && matchesTierName;
    });

    setRewardsData(filteredRewards);
  };

  const resetform = (event) => {
    event.preventDefault();

    // First, set the form data
    setFormData({
      productName: "",
      productCategoryUuid: "",
      tierUuid: "",
    });
    setRewardsData(originalRewardsData);
  };
  const { currentdata, noofPages } = PaginationSetter(currentPage, RewardsData);
  const totalPages = noofPages;
  const currentrewards = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2
        title="PRODUCTS"
        linkText1="Search Product"
        linkText2="Add Product"
        link2={Constants.URLConstants.MASTERSLOYALITYPROGRAMREWARDSNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit} id="rewardssearchform">
          <div className="panel-body">
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Product Category</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={productCategoryOptions}
                  isSearchable
                  placeholder="- Select Category -"
                  className="custom-select"
                  name="productCategoryUuid"
                  value={productCategoryOptions.find(
                    (option) => option.value === formData.productCategoryUuid
                  )}
                  onChange={(selectedOption) =>
                    handleSingleSelectChange(
                      selectedOption,
                      "productCategoryUuid"
                    )
                  }
                  noOptionsMessage={() => "No Category Found"}
                />
              </div>
              {/* <div className="col-md-2 form-group">
                <label>Product ID</label>
                <input type="text" className="form-control form-control-sm" name="search_product_id"   />
              </div> */}
              <div className="col-md-2 form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="productName"
                  id="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Loyalty Tier</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={loyaltyTierOptions}
                  isSearchable
                  placeholder="- Select Loyalty Tier -"
                  className="custom-select"
                  name="tierUuid"
                  value={loyaltyTierOptions.find(
                    (option) => option.value === formData.tierUuid
                  )}
                  onChange={(selectedOption) =>
                    handleSingleSelectChange(selectedOption, "tierUuid")
                  }
                  noOptionsMessage={() => "No Loyalty Tier Found"}
                />
              </div>
            </div>
            <br />
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
                <div id="tour_div" className="dataTables_scroll">
                  <div
                    id="search_controller_wrapper"
                    className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                  >
                    <div className="row">
                      <div className="col-sm-6" />
                      <div className="col-sm-6" />
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
                              style={{
                                textAlign: "right",
                                paddingRight: "0px",
                              }}
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
                                placeholder="Product Name"
                                value={searchInput}
                                onChange={handleInputSearchChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
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
                            className="table   table-responsive dataTable no-footer table table-bordered"
                            role="grid"
                            aria-describedby="search_sup_info"
                          >
                            <thead>
                              <tr>
                                {/* <th align="center">Product ID</th> */}
                                <th align="center">Product Image</th>
                                <th align="center">Product Name</th>
                                <th align="center">Product Category</th>
                                <th align="center">Points Required</th>
                                <th align="center">Available Products</th>
                                <th align="center">Loyalty Tier</th>
                                <th align="center">Action</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentrewards.map((reward, index) => (
                                <React.Fragment key={index}>
                                  <tr
                                    className={
                                      "phps_row_" +
                                      (index % 2 === 0 ? "0 even" : "1 odd")
                                    }
                                    role="row"
                                  >
                                    {/* <td align="center">{reward.uuid}</td> */}
                                    <td align="center">
                                      {reward.productImage !== "" ? (
                                        <Link
                                          to={reward.productImage}
                                          target="_blank"
                                        >
                                          <img
                                            alt="Product"
                                            src={reward.productImage}
                                            border={0}
                                            width={50}
                                            height={50}
                                          />
                                        </Link>
                                      ) : (
                                        "NO IMAGE"
                                      )}
                                    </td>
                                    <td align="center">{reward.productName}</td>
                                    <td align="center">
                                      {
                                        reward.productCategoryUuid
                                          .productCategoryName
                                      }
                                    </td>
                                    <td align="center">
                                      {reward.pointsRequired}
                                    </td>
                                    <td align="center">
                                      {reward.availableProduct}
                                    </td>
                                    <td align="center">
                                      {reward.tierUuid.tierName}
                                    </td>
                                    <td className="actionlink">
                                      <div className="actionCont">
                                        <div className="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .MASTERSLOYALITYPROGRAMREWARDSEDIT
                                            }
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            data-original-title="Edit"
                                            onClick={() =>
                                              handleEdditClick(reward)
                                            }
                                          >
                                            <i className="fa fa-pencil-square-o" />
                                          </Link>
                                        </div>
                                        <div className="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .MASTERSLOYALITYPROGRAMREWARDSVIEW
                                            }
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            data-original-title="view"
                                            onClick={() =>
                                              handleEdditClick(reward)
                                            }
                                          >
                                            <i className="fa fa-eye" />
                                          </Link>
                                        </div>
                                        <div className="input-group-addon">
                                          <Link
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title
                                            data-original-title="Delete"
                                            onClick={() =>
                                              handleDeleteClick(reward.uuid)
                                            }
                                          >
                                            <i className="fa fa-trash" />
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
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default connect(null, { setMastersLoyaltyProductEdit })(
  MastersLoyalityProgramRewardsSearch
);
