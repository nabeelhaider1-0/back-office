import { useEffect, useState } from "react";
import { deleteSiteMap, getAllSiteMap } from "../../Apis/API";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import loadingGif from "../../assets/images/loadingblue.gif";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { setEditSiteMapData } from "../../state/action/actions";

const SiteMap = ({ setEditSiteMapData }) => {
  const [sitemapData, setSiteMapData] = useState([]);

  const [loading, setLoading] = useState(true);
  const handleEdditClick = (sitemap) => {
    setEditSiteMapData(sitemap); // Dispatch the action to set the editBranchData in the Redux store
  };
  const getallSiteMaps = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await getAllSiteMap();

      if (response.data.statusCode === 200) {
        const sitemaps =
          response && response.data.data ? response.data.data : [];

        setSiteMapData(sitemaps);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getallSiteMaps();
  }, []);
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
        text: "Are You Sure You Want To Delete This Site Map ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteSiteMap(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your Site Map has been deleted successfully.",
                icon: "success",
              });

              setSiteMapData((prevsitemaphData) =>
                prevsitemaphData.filter((site) => site.uuid !== uuid)
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

  return (
    <>
      <Header2 title="SITE PAGES" />
      <p class="container-fluid" style={{ fontSize: "12px" }}>
        &nbsp;&nbsp;&nbsp;&nbsp;Below is a list of pages that can be assigned to
        profiles. Users can access pages based on the profiles you have assigned
        them. Users can only access pages within the profiles assigned to them.
      </p>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form>
              <div class="row mt-2 mb-4">
                <div class="form-group col-md-2">
                  <Link
                    to={Constants.URLConstants.SITEMAPADD}
                    class="btn btn-dark btn-sm"
                    style={{ fontSize: "12px" }}
                  >
                    <i class="fa fa-add"></i> Add Page
                  </Link>
                </div>
              </div>
              <table
                class="table   table-responsive table table-bordered"
                id="search_pages"
              >
                <thead>
                  <tr>
                    <th>Page Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {sitemapData.map((sitemap, index) => (
                    <tr
                      key={index}
                      className={`phps_row_${
                        index % 2 === 0 ? "dataRow" : "dataRowAlt"
                      }`}
                    >
                      <td>{sitemap.pageName}</td>
                      <td class="actionlink">
                        <div
                          class="actionCont"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <div
                            class="input-group-addon"
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Edit"
                          >
                            <Link
                              to={Constants.URLConstants.SITEMAPEDIT}
                              onClick={() => handleEdditClick(sitemap)}
                            >
                              <i class="fa fa-pencil-square-o"></i>
                            </Link>
                          </div>
                          <div
                            class="input-group-addon"
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Delete"
                          >
                            <Link
                              onClick={() => handleDeleteClick(sitemap.uuid)}
                              title="Delete"
                            >
                              <i class="fa fa-trash"></i>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default connect(null, { setEditSiteMapData })(SiteMap);
