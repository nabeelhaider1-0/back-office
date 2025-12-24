import { Link } from "react-router-dom";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { deleteMenues, getAllMenues, updateMenu } from "../../Apis/API";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { setEditMenuData } from "../../state/action/actions";

const MenuSearch = ({ setEditMenuData }) => {
  const [allMenus, setAllMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [parents, setParents] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [formData, setFormData] = useState({
    menuName: "",
    pageLink: "",
    parent: null,
  });

  const handleEdditClick = (menu) => {
    setEditMenuData(menu); // Dispatch the action to set the editBranchData in the Redux store
  };
  const getMenus = async () => {
    try {
      const response = await getAllMenues();
      if (response.data.statusCode === 200) {
        const allMenusData = response.data.data || [];

        setAllMenus(allMenusData);

        const topLevelMenus = allMenusData.filter(
          (menu) => menu.parent === null
        );
        const options = topLevelMenus.map((menu) => ({
          value: menu.uuid,
          label: menu.menuName,
        }));
        setParents(options);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleParentChange = (selectedOption) => {
    const parentUuid = selectedOption.value;
    const name = "parent";
    setFormData((prevState) => ({
      ...prevState,
      [name]: parentUuid,
    }));
    setSelectedMenus([{ name: "parent", value: parentUuid }]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const extractMenuData = (
    menus,
    targetUuid = null,
    label = null,
    pageLink = null
  ) => {
    const collectedData = [];

    const findMenu = (menu) => {
      if (targetUuid !== null) {
        if (pageLink !== "" && label !== "") {
          if (menu.children && menu.children.length > 0) {
            const matcheditem = [];
            menu.children.forEach((item, index) => {
              if (
                item.menuName.toLowerCase() === label.toLowerCase() &&
                item.pageLink.toLowerCase() === pageLink.toLowerCase()
              ) {
                matcheditem.push(item);
              }
            });
            menu.children = matcheditem;
            collectedData.push(menu);
          }
        } else {
          if (menu.uuid === targetUuid) {
            if (label !== "") {
              if (menu.children && menu.children.length > 0) {
                const matcheditem = [];
                menu.children.forEach((item, index) => {
                  if (item.menuName.toLowerCase() === label.toLowerCase()) {
                    matcheditem.push(item);
                  }
                });
                menu.children = matcheditem;
                collectedData.push(menu);
              }
            }

            if (pageLink !== "") {
              if (menu.children && menu.children.length > 0) {
                const matcheditem = [];
                menu.children.forEach((item, index) => {
                  if (item.pageLink.toLowerCase() === pageLink.toLowerCase()) {
                    matcheditem.push(item);
                  }
                });
                menu.children = matcheditem;
                collectedData.push(menu);
              }
            }
          }
          if (pageLink === "" && label === "") {
            if (menu.uuid === targetUuid) {
              // If targetUuid matches and optional filters are satisfied, add the menu to collectedData
              collectedData.push(menu);
            }
          }
        }
      } else {
        if (pageLink !== "" && label !== "") {
          if (label.toLowerCase() === menu.menuName.toLowerCase()) {
            if (menu.children && menu.children.length > 0) {
              const matcheditem = [];
              menu.children.forEach((item, index) => {
                if (item.pageLink.toLowerCase() === pageLink.toLowerCase()) {
                  matcheditem.push(item);
                }
              });
              menu.children = matcheditem;
              collectedData.push(menu);
            }
          }
        } else {
          if (label !== "") {
            if (label.toLowerCase() === menu.menuName.toLowerCase()) {
              collectedData.push(menu);
            }
          }

          if (pageLink !== "") {
            if (pageLink.toLowerCase() === menu.pageLink.toLowerCase()) {
              collectedData.push(menu);
            }
          }
        }
      }
    };

    // Iterate through all menus to find the targetUuid
    for (const menu of menus) {
      findMenu(menu);
    }

    return collectedData;
  };

  const handleUpdateStatus = async (uuid, isActive) => {
    try {
      // Make an API call to update the staff's active status
      const requestBody = {
        status: isActive ? "Active" : "In Active",
      };

      const response = await updateMenu(uuid, requestBody);

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        setAllMenus((prevMenuData) =>
          prevMenuData.map((menu) => {
            if (menu.uuid === uuid) {
              // If UUID matches, update the status based on the current status
              return {
                ...menu,
                status: isActive ? "Active" : "In Active", // Toggle status
              };
            } else {
              // If UUID doesn't match, return the menu item unchanged
              return menu;
            }
          })
        );

        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Menu is now ${isActive ? "active" : "inactive"}.`,
        });

        // You may want to fetch the updated staff data or update the local state accordingly
      } else {
        // Handle other response statuses or errors

        // Show SweetAlert notification for error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update Menu active status.",
        });
      }
    } catch (error) {
      // Handle errors from the API call

      // Show SweetAlert notification for error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };
  const handleChildChange = (selectedOption, index) => {
    const childUuid = selectedOption.value;
    const name = "parent";
    setFormData((prevState) => ({
      ...prevState,
      [name]: childUuid,
    }));
    const children = allMenus.filter(
      (menu) => menu.parent && menu.parent.uuid === childUuid
    );

    // Check if there are further children
    if (children.length > 0) {
      const updatedMenus = selectedMenus
        .slice(0, index + 1)
        .concat([{ name: "child", value: childUuid }]);

      updatedMenus.push(
        ...children.map((child) => ({ name: "child", value: child.uuid }))
      );

      setSelectedMenus(updatedMenus);
    } else {
      // If no further children, remove any additional empty dropdowns
      // const updatedMenus = selectedMenus.slice(0, index+1 );
      // setSelectedMenus(updatedMenus);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFilteredMenus(
      extractMenuData(
        allMenus,
        formData.parent,
        formData.menuName,
        formData.pageLink
      )
    );
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
        text: "Are You Sure You Want To Delete This Email Setting ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteMenues(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Menu has been deleted successfully.",
                icon: "success",
              });

              setAllMenus((prevMenuData) =>
                prevMenuData.filter((menu) => menu.uuid !== uuid)
              );
              setParents((prevparentsData) =>
                prevparentsData.filter((parent) => parent.value !== uuid)
              );
            }
          } catch (error) {
            swalWithBootstrapButtons.fire({
              title:
                "Error On Deletion ( You can only delete single child not parent )",
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
  useEffect(() => {
    getMenus();
  }, []);

  return (
    <>
      <Header2
        title="SEARCH MENU PAGES"
        linkText1="List Menu pages"
        linkText2="Add Menu"
        link2={Constants.URLConstants.ADDMENU}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="row mt-2">
            {parents.length > 0 && (
              <div className="col-md-3 form-group phps_row_1">
                <label htmlFor="exampleInputEmail1">Parent</label>
                <MultiSelect
                  options={parents}
                  isSearchable
                  placeholder="- Select Parent -"
                  className="required custom-select"
                  name="menu"
                  onChange={handleParentChange}
                />
              </div>
            )}

            {selectedMenus.map((menu, index) => {
              const filteredChildren = allMenus
                .filter((m) => m.parent && m.parent.uuid === menu.value)
                .map((child) => ({ value: child.uuid, label: child.menuName }));
              // Check if index is less than the length minus 1 when length is greater than or equal to 3
              return (
                <>
                  {(selectedMenus.length < 3 ||
                    index < selectedMenus.length - 1) &&
                    filteredChildren.length > 0 && (
                      <div
                        key={index}
                        className="col-md-3 form-group phps_row_1"
                      >
                        <label htmlFor={`child-${index}`}>{`Child ${
                          index + 1
                        }`}</label>
                        <MultiSelect
                          options={filteredChildren}
                          isSearchable
                          placeholder={`- Select Child ${index + 1} -`}
                          className="required custom-select"
                          name={`child-${index}`}
                          onChange={(selectedOption) =>
                            handleChildChange(selectedOption, index)
                          }
                        />
                      </div>
                    )}
                </>
              );
            })}
            <div className="form-group phps_row_1 col-md-3">
              <label>Page Title</label>
              <input
                type="text"
                name="menuName"
                value={formData.menuName}
                onChange={handleInputChange}
                className="required form-control form-control-sm"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Page Link</label>
              <input
                type="text"
                className="required form-control form-control-sm"
                name="pageLink"
                value={formData.pageLink}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row mt-4 mb-4">
            <div className="form-group col-md-2">
              <button type="submit" className="btn btn-dark btn-sm">
                <i className="fa fa-search" aria-hidden="true"></i> Search
              </button>
            </div>
          </div>
        </form>
        <form class="mt-2">
          <div class="container-fluid">
            <div
              id="search_menu_wrapper"
              class="dataTables_wrapper form-inline dt-bootstrap no-footer"
            >
              <div class="row">
                <div class="col-sm-6"></div>
                <div class="col-sm-6"></div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div
                    class="doubleScroll-scroll-wrapper"
                    id="wrapper1"
                    style={{ height: "20px", width: "1320px" }}
                  >
                    <div
                      class="suwala-doubleScroll-scroll"
                      style={{ height: "20px", width: "1320px" }}
                    ></div>
                  </div>
                  <div id="wrapper2" style={{ overflow: "auto" }}>
                    <table
                      id="search_menu"
                      class="table   table-responsive dataTable no-footer table table-bordered"
                      role="grid"
                      aria-describedby="search_menu_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: " 147.889px" }}
                          >
                            Parent
                          </th>
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "144.889px;" }}
                          >
                            Child 1
                          </th>
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "144.889px;" }}
                          >
                            Child 2
                          </th>
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "144.889px;" }}
                          >
                            Child 3
                          </th>
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "243.889px;" }}
                          >
                            Label
                          </th>
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "230.889px;" }}
                          >
                            Link
                          </th>
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "323px;" }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {filteredMenus.length > 0
                          ? filteredMenus.map((menu) => {
                              return (
                                <>
                                  {menu.children.length > 0 ? (
                                    // Render rows for each child if children exist
                                    menu.children.map((child) => (
                                      <tr
                                        className="phps_row_1 odd"
                                        key={child.uuid}
                                        role="row"
                                      >
                                        <td>
                                          {menu.parent == null
                                            ? menu.menuName
                                            : menu.parent.menuName}
                                        </td>
                                        <td>
                                          {menu.parent == null
                                            ? ""
                                            : menu.menuName}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td>{child.menuName}</td>
                                        <td>{child.pageLink}</td>
                                        <td className="actionlink">
                                          <div className="actionCont">
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              alt="Edit"
                                              title=""
                                              data-original-title="Edit"
                                            >
                                              <Link
                                                to={
                                                  Constants.URLConstants
                                                    .EDITMENU
                                                }
                                                onClick={() =>
                                                  handleEdditClick(menu)
                                                }
                                              >
                                                <i className="fa fa-pencil-square-o"></i>
                                              </Link>
                                            </div>
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title=""
                                              data-original-title="Click To Deactivate"
                                            >
                                              {menu.status === "Active" ? (
                                                <Link
                                                  onClick={() => {
                                                    handleUpdateStatus(
                                                      menu.uuid,
                                                      false
                                                    );
                                                  }}
                                                >
                                                  <i className="fa fa-check-circle"></i>
                                                </Link>
                                              ) : (
                                                <Link
                                                  onClick={() => {
                                                    handleUpdateStatus(
                                                      menu.uuid,
                                                      true
                                                    );
                                                  }}
                                                >
                                                  <i className="fa fa-times-circle"></i>
                                                </Link>
                                              )}
                                            </div>
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              alt="Delete"
                                              title=""
                                              data-original-title="Delete"
                                            >
                                              <Link
                                                onClick={() =>
                                                  handleDeleteClick(menu.uuid)
                                                }
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title=""
                                                data-original-title="Delete"
                                              >
                                                <i className="fa fa-trash"></i>
                                              </Link>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    // Render row for menu if no children exist
                                    <tr
                                      className="phps_row_1 odd"
                                      key={menu.uuid}
                                      role="row"
                                    >
                                      <td>
                                        {menu.parent == null
                                          ? menu.menuName
                                          : menu.parent.menuName}
                                      </td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td>
                                        {menu.parent == null
                                          ? ""
                                          : menu.menuName}
                                      </td>
                                      <td>
                                        {menu.pageLink == null
                                          ? ""
                                          : menu.pageLink}
                                      </td>
                                      <td className="actionlink">
                                        <div className="actionCont">
                                          <div
                                            className="input-group-addon"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            alt="Edit"
                                            title=""
                                            data-original-title="Edit"
                                          >
                                            <Link
                                              to={
                                                Constants.URLConstants.EDITMENU
                                              }
                                              onClick={() =>
                                                handleEdditClick(menu)
                                              }
                                            >
                                              <i className="fa fa-pencil-square-o"></i>
                                            </Link>
                                          </div>
                                          <div
                                            className="input-group-addon"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title=""
                                            data-original-title="Click To Deactivate"
                                          >
                                            {menu.status === "Active" ? (
                                              <Link
                                                onClick={() => {
                                                  handleUpdateStatus(
                                                    menu.uuid,
                                                    false
                                                  );
                                                }}
                                              >
                                                <i className="fa fa-check-circle"></i>
                                              </Link>
                                            ) : (
                                              <Link
                                                onClick={() => {
                                                  handleUpdateStatus(
                                                    menu.uuid,
                                                    true
                                                  );
                                                }}
                                              >
                                                <i className="fa fa-times-circle"></i>
                                              </Link>
                                            )}
                                          </div>
                                          <div
                                            className="input-group-addon"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            alt="Delete"
                                            title=""
                                            data-original-title="Delete"
                                          >
                                            <Link
                                              onClick={() =>
                                                handleDeleteClick(menu.uuid)
                                              }
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title=""
                                              data-original-title="Delete"
                                            >
                                              <i className="fa fa-trash"></i>
                                            </Link>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </>
                              );
                            })
                          : allMenus.map((menu) => {
                              if (menu.parent === null) {
                                return (
                                  <tr
                                    className="phps_row_1 odd"
                                    key={menu.uuid}
                                    role="row"
                                  >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{menu.menuName}</td>
                                    <td></td>
                                    <td className="actionlink">
                                      <div className="actionCont">
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          alt="Edit"
                                          title=""
                                          data-original-title="Edit"
                                        >
                                          <Link
                                            to={Constants.URLConstants.EDITMENU}
                                            onClick={() =>
                                              handleEdditClick(menu)
                                            }
                                          >
                                            <i className="fa fa-pencil-square-o"></i>
                                          </Link>
                                        </div>
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title=""
                                          data-original-title="Click To Deactivate"
                                        >
                                          {menu.status === "Active" ? (
                                            <Link
                                              onClick={() => {
                                                handleUpdateStatus(
                                                  menu.uuid,
                                                  false
                                                );
                                              }}
                                            >
                                              <i className="fa fa-check-circle"></i>
                                            </Link>
                                          ) : (
                                            <Link
                                              onClick={() => {
                                                handleUpdateStatus(
                                                  menu.uuid,
                                                  true
                                                );
                                              }}
                                            >
                                              <i className="fa fa-times-circle"></i>
                                            </Link>
                                          )}
                                        </div>
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          alt="Delete"
                                          title=""
                                          data-original-title="Delete"
                                        >
                                          <Link
                                            onClick={() =>
                                              handleDeleteClick(menu.uuid)
                                            }
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title=""
                                            data-original-title="Delete"
                                          >
                                            <i className="fa fa-trash"></i>
                                          </Link>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              } else {
                                return null; // If parent is not null, return null to skip rendering
                              }
                            })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default connect(null, { setEditMenuData })(MenuSearch);
