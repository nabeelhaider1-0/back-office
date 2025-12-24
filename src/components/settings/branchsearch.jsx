import { Link } from "react-router-dom";
import Constants from "../../constants/routes";
import { useState, useEffect } from "react";
import Header2 from "../header2/header2";
import { deleteBranch, getAllBranches } from "../../Apis/API";
import { connect } from "react-redux";
import { setEditBranchData } from "../../state/action/actions";
import Swal from "sweetalert2";
import loadingGif from "../../assets/images/loadingblue.gif";
// import loadingGif from "../../assets/images/loader2.mov"

const BranchSearch = ({ setEditBranchData }) => {
  const [loading, setLoading] = useState(true); // Initially, set loading to true

  const handleEdditClick = (branch) => {
    setEditBranchData(branch); // Dispatch the action to set the editBranchData in the Redux store
  };

  const handleDeleteClick = async (uuid) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-warning swal-confirm",
        cancelButton: "btn btn-default swal-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "Are You Sure You Want To Delete This Branch ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteBranch(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your branch has been deleted successfully.",
                icon: "success",
              });

              setBranchData((prevBranchData) =>
                prevBranchData.filter((branch) => branch.uuid !== uuid)
              );
              // localStorage.setItem('token', response.data.data.token)
            }
          } catch (error) {
            swalWithBootstrapButtons.fire({
              title: "Error On Deletion",
              icon: "error",
            });
            // console.error(error);
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  const [branchData, setBranchData] = useState([]);
  const [originalBranchData, setOriginalBranchData] = useState([]);

  const getbranches = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await getAllBranches();

      if (response.data.statusCode === 200) {
        const branches =
          response && response.data.data ? response.data.data : [];

        setBranchData(branches);
        setOriginalBranchData(branches);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };

  useEffect(() => {
    getbranches();
  }, []);
  const [serachBranchData, setSerachBranchData] = useState({
    branchname_search: "",
  });
  const [searchInput, setSearchInput] = useState("");

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredBranchData = originalBranchData.filter((branch) =>
      branch.branchName.toLowerCase().includes(value.toLowerCase())
    );

    setBranchData(filteredBranchData);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSerachBranchData({
      ...serachBranchData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredBranchData = originalBranchData.filter((branch) =>
      branch.branchName
        .toLowerCase()
        .includes(serachBranchData.branchname_search.toLowerCase())
    );

    setBranchData(filteredBranchData);
    // Add your logic to handle the form data (e.g., send it to the server)
  };

  return (
    <>
      <Header2
        title="Branch Details"
        linkText1="List Branch"
        linkText2="Add branch"
        link2={Constants.URLConstants.BRANCHNEW}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="row mt-2">
            <div className="col-md-3 form-group">
              <label>Branch Name</label>
              <input
                className="form-control form-control-sm test123"
                type="text"
                name="branchname_search"
                value={serachBranchData.branchname_search}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="form-group col-md-2">
              <button type="submit" className="btn btn-dark btn-sm">
                <i className="fa fa-search" aria-hidden="true"></i> Search
              </button>
            </div>
          </div>
        </form>
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form className="mt-2">
              <div className="panel-body removeMargins">
                <div className="dataTables_scroll">
                  <div className="row pd_tp">
                    <div className="row">
                      <div className="col-md-4 col_hide">
                        <div className="form-group col-md-12">&nbsp;</div>
                      </div>
                      <div className="col-md-5"></div>
                      <div className="col-md-3 search_option">
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
                              aria-hidden="true"
                            ></i>
                          </h5>
                        </div>
                        <div className="form-group col-md-10 bookingsrc">
                          <input
                            type="text"
                            className="tablesearch form-control form-control-sm search_new"
                            placeholder="Branch Name"
                            value={searchInput}
                            onChange={handleInputSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                  <div className="container-fluid">
                    <div
                      id="search_sup_wrapper"
                      className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6"></div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div
                            className="doubleScroll-scroll-wrapper"
                            style={{ height: "20px", width: "1320px" }}
                          >
                            <div
                              className="suwala-doubleScroll-scroll"
                              style={{ height: "20px", width: "1320px" }}
                            ></div>
                          </div>
                          <div id="scrollCont" style={{ overflow: "auto" }}>
                            <table
                              id="search_sup"
                              className="table   table-responsive dataTable no-footertable table-bordered"
                              role="grid"
                              aria-describedby="search_sup_info"
                            >
                              <thead>
                                <tr role="row">
                                  <th
                                    className="sorting"
                                    tabIndex="0"
                                    aria-controls="search_sup"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="Branch Name: activate to sort column ascending"
                                    style={{ width: "869.889px" }}
                                  >
                                    Branch Name
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="Action"
                                    style={{ width: "566px" }}
                                  >
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {branchData.map((branch, index) => (
                                  <tr
                                    key={index}
                                    className={`phps_row_${
                                      index % 2 === 0 ? "0 even" : "1 odd"
                                    }`}
                                    role="row"
                                  >
                                    <td>{branch.branchName}</td>
                                    <td className="actionlink">
                                      <div
                                        className="actionCont"
                                        style={{ width: "58px" }}
                                      >
                                        <div className="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants.EDITBRANCH
                                            }
                                            onClick={() =>
                                              handleEdditClick(branch)
                                            }
                                          >
                                            <i className="fa fa-pencil-square-o"></i>
                                          </Link>
                                        </div>
                                        <div className="input-group-addon">
                                          <Link
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title=""
                                            data-original-title="Delete"
                                            onClick={() =>
                                              handleDeleteClick(branch.uuid)
                                            }
                                          >
                                            <i className="fa fa-trash"></i>
                                          </Link>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {/* <nav aria-label="Page navigation example">
                              <ul className="pagination pagination-sm justify-content-center mt-4">
                                <li className="page-item">
                                  <Link
                                    className="page-link"
                                    to="#"
                                    aria-label="Previous"
                                  >
                                    <span aria-hidden="true">&laquo;</span>
                                  </Link>
                                </li>
                                <li className="page-item active">
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
                                  <Link
                                    className="page-link"
                                    to="#"
                                    aria-label="Next"
                                  >
                                    <span aria-hidden="true">&raquo;</span>
                                  </Link>
                                </li>
                              </ul>
                            </nav> */}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div
                            className="dataTables_info"
                            id="search_sup_info"
                            role="status"
                            aria-live="polite"
                          ></div>
                        </div>
                        <div className="col-sm-6"></div>
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

export default connect(null, { setEditBranchData })(BranchSearch);
