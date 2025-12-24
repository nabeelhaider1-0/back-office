import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVisaCategories } from "../../../state/action/visaActions";
import { deleteConfirmation } from "../../../constants/globalfunctions";
import { delDATA } from "../../../Apis/API";

const VisaSearchcategory = () => {
  const dispatch = useDispatch();
  const allVisaList = useSelector((state) => state.visa.visaCategories?.data);

  const [AllVisaCategoryList, setAllVisaCategoryList] = useState([]);
  const [visaCategorySearch, setVisaCategorySearch] = useState("");

  useEffect(() => {
    setAllVisaCategoryList(allVisaList);
  }, [allVisaList]);

  useEffect(() => {
    dispatch(getAllVisaCategories());
  }, []);

  const filterVisaCategory = (e) => {
    e.preventDefault();
    const filterVisaCategory = AllVisaCategoryList?.filter((item) => {
      return item?.visaCategory
        ?.toLowerCase()
        ?.includes(visaCategorySearch?.toLowerCase());
    });
    setAllVisaCategoryList(filterVisaCategory);
  };

  const resetAll = (e) => {
    e.preventDefault();
    setVisaCategorySearch("");
    setAllVisaCategoryList(allVisaList);
  };

  const delHandler = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Category?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA,
        "Category has been deleted successfully.",
        "api/supplierVisaCategory/",
        dispatch
        // "visa"
      );

      if (isDeleted) {
        dispatch(getAllVisaCategories());

        // setOriginalHotelData((tourdata) =>
        //           tourdata.filter((transfer) => transfer.uuid !== uuid)
        //           );
        //           setHotelData((tourdata) =>
        //           tourdata.filter((transfer) => transfer.uuid !== uuid)
        //           );
        //           setCountryCityOptions(originalHotelData);
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };

  return (
    <>
      <Header2 title="SEARCH VISA CATEGORY" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 form-group " id="aofficeid">
                <label>Visa Category: </label>
                <input
                  id="vcategory"
                  name="vcategory"
                  type="text"
                  maxLength={50}
                  className="form-control form-control-sm test123"
                  value={visaCategorySearch}
                  onChange={(e) => setVisaCategorySearch(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="form-group col-md-12">
                <br />
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  onClick={filterVisaCategory}
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
                </button>
                <button
                  type="button"
                  onclick="resetAll();"
                  className="btn btn-outline-secondary btn-sm mx-1"
                  onClick={resetAll}
                >
                  <i className="fa fa-search" />
                  &nbsp;Reset
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="hpanel">
          <div
            className="panel-heading mt-5 mb-2"
            style={{ fontSize: "14pt", fontWeight: 500, color: "grey" }}
          >
            Visa Category List
          </div>
          <form>
            <div id="hotel">
              <div className="panel-body removeMargins">
                <div className="col-md-12" style={{ height: "30px" }}>
                  <div className="form-group">
                    <div className="custPaging pgType2">
                      <table
                        width="100%"
                        cellPadding={0}
                        cellSpacing={0}
                        border={0}
                        className="custPaging  pgType2"
                      >
                        <tbody className="bg-white">
                          <tr>
                            <td align="center" width="70%" />
                            <td align="right" width="30%" />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col_hide">&nbsp;</div>
                <table
                  id="tableres"
                  className="table table-bordered   table-responsive dataTable no-footer"
                >
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {AllVisaCategoryList?.map((item, index) => {
                      return (
                        <tr>
                          <td>
                            {item?.visaCategory === null
                              ? "------"
                              : item?.visaCategory}
                          </td>
                          <td align="center" className="actionlink">
                            <div className="actionCont width_table">
                              <div className="input-group-addon">
                                <Link
                                  to={`${Constants.URLConstants.VISAADDCATEGORY}?action=edit_category&id=${item?.uuid}`}
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              {/* <div class="input-group-addon"  data-toggle="tooltip" data-original-title="View" data-placement="top">
                            <Link to="visa_details.php?action=view_category&id=1">
                              <i class="fa fa-eye"></i>
                            </Link>
                          </div> */}
                              <div className="input-group-addon">
                                <Link
                                  to="visa_details.php?action=inactive_category&id=1"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Click To Deactivate"
                                >
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                title
                                data-original-title="Delete"
                              >
                                <Link onClick={() => delHandler(item?.uuid)}>
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="col-md-12" style={{ height: "30px" }}>
                  <div className="form-group">
                    <div className="custPaging pgType2">
                      <table
                        width="100%"
                        cellPadding={0}
                        cellSpacing={0}
                        border={0}
                        className="custPaging  pgType2"
                      >
                        <tbody className="bg-white">
                          <tr>
                            <td align="center" width="70%" />
                            <td align="right" width="30%" />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default VisaSearchcategory;
