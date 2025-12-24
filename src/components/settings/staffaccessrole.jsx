import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { deleteProfile, getAllProfiles } from "../../Apis/API";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import loadingGif from "../../assets/images/loadingblue.gif";
import { setProfileRights } from "../../state/action/actions";
import { connect } from "react-redux";
const Roles = ({ setProfileRights }) => {
  const [profileData, setProfileData] = useState([]);
  const [originalProfileData, setOriginalProfileData] = useState([]);
  const [loading, setLoading] = useState(true); // Initially, set loading to true
  const gEtProfiles = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getAllProfiles();

      if (response.data.statusCode === 200) {
        const profiles = response.data.data || [];

        setProfileData(profiles);
        setOriginalProfileData(profiles);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  useEffect(() => {
    gEtProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        text: "Are You Sure You Want To Delete This Reminder Setting ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteProfile(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Profile has been deleted successfully.",
                icon: "success",
              });

              setProfileData((prevProfileData) =>
                prevProfileData.filter((profile) => profile.uuid !== uuid)
              );
            }
          } catch (error) {
            swalWithBootstrapButtons.fire({
              title: "Error On Deletion",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };
  const [searchInput, setSearchInput] = useState("");

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredProfileData = originalProfileData.filter((profile) =>
      profile.profileName.toLowerCase().includes(value.toLowerCase())
    );

    setProfileData(filteredProfileData);
  };

  const handleEditClick = (p) => {
    setProfileRights(p);
    // Perform any other actions related to editing
  };
  return (
    <div>
      <Header2 title="REPORT ACCESS" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="row mb-2">
            <div className="col-md-2 form-group">
              <Link
                to={Constants.URLConstants.ADDPROFILE}
                className="btn btn-dark btn-sm"
              >
                <i className="fa fa-plus"></i> Add Roles
              </Link>
            </div>
            <div className="col-md-4 form-group">
              <Link
                to={Constants.URLConstants.STAFFACCESSCREATEPROFILES}
                className="btn btn-dark btn-sm"
              >
                <i className="fa fa-plus"></i> Create Profile
              </Link>
            </div>
            <div className="col-md-2 form-group"></div>
            <div className="form-group col-md-2 new_search_icon"></div>
            <div className="col-md-2 form-group">
              <h5 style={{ display: "inline", marginLeft: "34px" }}>
                <i
                  className="fa fa-search srchWithinPg"
                  id="magnifiers"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="Search within this table"
                />
              </h5>
              <input
                type="text"
                className="tablesearch form-control form-control-sm search_new"
                placeholder="ProfileName Search"
                value={searchInput}
                onChange={handleInputSearchChange}
              />
            </div>
          </div>
          {/* //Table */}

          {loading && (
            <div className="text-center">
              <img src={loadingGif} alt="Loading..." height={250} />
            </div>
          )}
          {!loading && (
            <>
              <div id="scrollCont " style={{ overflow: " auto" }}>
                <table
                  id="add_profiles"
                  className="table   table-responsive dataTable no-footer table-bordered mt-4 mb-2"
                  role="grid"
                  aria-describedby="add_profiles_info"
                >
                  <thead>
                    <tr role="row">
                      <th
                        className="sorting"
                        tabindex="0"
                        aria-controls="add_profiles"
                        rowspan="1"
                        colspan="1"
                        aria-label="Profile Name: activate to sort column ascending"
                        style={{ width: "991.75px;" }}
                      >
                        Profile Name
                      </th>
                      <th
                        className="no-sort sorting_disabled"
                        rowspan="1"
                        colspan="1"
                        aria-label="Actions"
                        style={{ width: "580px;" }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {profileData
                      .filter((profile) => profile.profileName)
                      .map((profile, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "dataRow odd" : "dataRowAlt even"
                          }
                          role="row"
                        >
                          <td style={{ textAlign: "left" }}>
                            {profile.profileName}
                          </td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Edit"
                              >
                                <Link
                                  to={Constants.URLConstants.EDITPROFILE}
                                  onClick={() => handleEditClick(profile)}
                                  title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o"></i>
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Delete"
                              >
                                <Link
                                  onClick={() =>
                                    handleDeleteClick(profile.uuid)
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
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default connect(null, { setProfileRights })(Roles);
