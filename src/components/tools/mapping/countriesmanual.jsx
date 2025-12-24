import { Link } from "react-router-dom";
import { useState } from "react";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
const CountriesManual = () => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const checkboxes = document.querySelectorAll(".select-option");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !selectAll;
    });
  };

  return (
    <>
      <Header2
        title="SEARCH COUNTRY"
        linkText1="List Country"
        linkText2="Add Country"
        link2={Constants.URLConstants.TOOLSMAPPINGCOUNTRIESMANUALADD}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form name="search_area_from" method="get" action="area.php">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-2 form-group">
                <label>Country Name</label>
                <input type="hidden" name="action" />
                <input
                  class="form-control form-control-sm test123"
                  type="text"
                  name="search_cname"
                  size="30"
                  maxlength="75"
                  value=""
                />
              </div>
              <div class="col-md-2 form-group">
                <label>Code</label>
                <input
                  class="form-control form-control-sm"
                  type="text"
                  name="search_ccode"
                  size="15"
                  maxlength="15"
                  value=""
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Agoda Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Amadeus Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Localflight Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Dhisco Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Dotw Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Expedia Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Group Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Hotelbeds Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Hbsight Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Hotelbedstransfer Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Miki Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Package Supplier Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Mystifly Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Redapple Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Restel Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Sabre Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Snehal Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Tboholidays Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group row">
                <div class="col-md-5 col-sm-6 col-xs-6">
                  <div>
                    <label>Whitesands Code</label>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <div class="btn-group">
                    <button
                      name="Block"
                      type="button"
                      class="btn btn-default btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Block"
                    >
                      <h6>
                        <i class="fa fa-times-circle fa-xs"></i>
                      </h6>
                    </button>

                    <button
                      name="UnBlock"
                      type="button"
                      class="btn btn-dark  btn-xs"
                      title=""
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Unblock"
                    >
                      <h6>
                        <i class="fa fa-check-circle fa-xs"></i>
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-3 form-group">
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  value="Search"
                >
                  <i class="fa fa-search"></i>&nbsp;Search
                </button>
              </div>
            </div>
          </div>
        </form>
        <br />
        <form>
          <div class="panel-body removeMargins">
            <div class="dataTables_scroll">
              <div class="row pd_tp">
                <div class="row mt-4">
                  <div class="col-md-5">
                    <div class="form-group col-md-12">
                      <div class="row">
                        <div class="col-md-12 form-group">
                          <button
                            type="button"
                            width="45"
                            value="Delete"
                            class="btn btn-danger btn-sm"
                          >
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                            &nbsp;Delete
                          </button>
                          <button
                            type="button"
                            value="Activate"
                            class="btn btn-success btn-sm"
                            name="Activate"
                          >
                            <i
                              class="fa fa-check-circle"
                              id="tickwhite"
                              aria-hidden="true"
                            ></i>
                            &nbsp;Activate
                          </button>
                          <button
                            type="button"
                            value="Deactivate"
                            class="btn btn-deactivate btn-sm"
                            name="Deactivate"
                          >
                            <i
                              class="fa fa-times-circle"
                              id="crossgrey"
                              aria-hidden="true"
                            ></i>
                            &nbsp;Deactivate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="form-group">
                      <div class="col-md-5">
                        {/* <!--Pagination panel--> */}
                        <nav aria-label="Page navigation example">
                          <ul class="pagination pagination-sm justify-content-center">
                            <li class="page-item active">
                              <Link class="page-link" to="#">
                                1
                              </Link>
                            </li>
                            <li class="page-item">
                              <Link class="page-link" to="#">
                                2
                              </Link>
                            </li>
                            <li class="page-item">
                              <Link class="page-link" to="#">
                                3
                              </Link>
                            </li>
                            <li class="page-item">
                              <Link class="page-link" to="#">
                                4
                              </Link>
                            </li>
                            <li class="page-item">
                              <Link class="page-link" to="#">
                                5
                              </Link>
                            </li>
                            <li class="page-item">
                              <Link class="page-link" to="#">
                                6
                              </Link>
                            </li>
                            <li class="page-item">
                              <Link class="page-link" to="#">
                                7
                              </Link>
                            </li>
                            <li class="page-item">
                              <Link class="page-link" to="#">
                                8
                              </Link>
                            </li>
                            <li class="page-item">
                              <Link class="page-link" to="#">
                                9
                              </Link>
                            </li>
                            <li class="page-item">
                              <Link class="page-link" to="#">
                                10
                              </Link>
                            </li>

                            <li class="page-item">
                              <Link class="page-link" to="#" aria-label="Next">
                                <span aria-hidden="true">»</span>
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2 search_option">
                    <div
                      class="form-group col-md-2 new_search_icon"
                      style={{ textAlign: "right", paddingRight: "0px" }}
                    >
                      <h5 style={{ display: "inline" }}>
                        <i
                          class="fa fa-search srchWithinPg"
                          id="magnifiers"
                          data-toggle="tooltip"
                          data-placement="top"
                          data-original-title="Search within this table"
                        ></i>
                      </h5>
                    </div>
                    <div class="form-group col-md-10 bookingsrc">
                      <input
                        type="text"
                        class="tablesearch form-control form-control-sm search_new"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="search_transfer_wrapper"
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
                      style={{
                        height: "20px",
                        overflow: "scroll hidden",
                        width: "1320px",
                      }}
                    >
                      <div
                        class="suwala-doubleScroll-scroll"
                        style={{ height: "20px", width: "1320px" }}
                      ></div>
                    </div>
                    <div id="wrapper2" style={{ overflow: "auto" }}>
                      <table
                        id="search_transfer"
                        class="table table-bordered   table-responsive dataTable no-footer"
                        role="grid"
                        aria-describedby="search_transfer_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              class="no-sort"
                              rowspan="1"
                              colspan="1"
                              aria-label="
                                        
                                            
                                            
                                        
                                    "
                              style={{ width: "81.2px" }}
                            >
                              <div class="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="selectAll"
                                  id="selectAll"
                                  style={{ marginLeft: "-13px" }}
                                  checked={selectAll}
                                  onChange={handleSelectAll}
                                />
                                <label htmlFor="selectAll"></label>
                              </div>
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="search_transfer"
                              rowspan="1"
                              colspan="1"
                              aria-label=" Status: activate to sort column ascending"
                              style={{ width: "114.2px" }}
                            >
                              {" "}
                              Status
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="search_transfer"
                              rowspan="1"
                              colspan="1"
                              aria-label="Country Name: activate to sort column ascending"
                              style={{ width: "441.2px" }}
                            >
                              Country Name
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="search_transfer"
                              rowspan="1"
                              colspan="1"
                              aria-label="Code: activate to sort column ascending"
                              style={{ width: "89.2px" }}
                            >
                              Code
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="search_transfer"
                              rowspan="1"
                              colspan="1"
                              aria-label="Mapped/Unmapped: activate to sort column ascending"
                              style={{ width: "262.2px" }}
                            >
                              Mapped/Unmapped
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="search_transfer"
                              rowspan="1"
                              colspan="1"
                              aria-label="Blocked: activate to sort column ascending"
                              style={{ width: "131.2px" }}
                            >
                              Blocked
                            </th>
                            <th
                              class="no-sort sorting_disabled"
                              rowspan="1"
                              colspan="1"
                              aria-label="Actions"
                              style={{ width: "234px" }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="97"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label htmlFor="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Afghanistan</td>
                            <td align="center">&nbsp;97</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=97&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie97">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(97, 5, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>8</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=97');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=97&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="43"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Albania</td>
                            <td align="center">&nbsp;43</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=43&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie43">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(43, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=43');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=43&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/delete.gif" alt="Delete" border=0>--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="142"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Algeria</td>
                            <td align="center">&nbsp;142</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=142&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie142">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(142, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=142');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=142&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="44"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Andorra</td>
                            <td align="center">&nbsp;44</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=44&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie44">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(44, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=44');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=44&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="143"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Angola</td>
                            <td align="center">&nbsp;143</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=143&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie143">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(143, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=143');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/activate.gif" alt="Active" border=0></Link>--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=143&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/delete.gif" alt="Delete" border=0>--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="213"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Antigua And Barbuda</td>
                            <td align="center">&nbsp;230</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=213&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie213">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(213, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=213');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/activate.gif" alt="Active" border=0></Link>--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=213&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/delete.gif" alt="Delete" border=0>--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="29"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Argentina</td>
                            <td align="center">&nbsp;29</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=29&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie29">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(29, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=29');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/activate.gif" alt="Active" border=0></Link>--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=29&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/delete.gif" alt="Delete" border=0>--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="45"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Armenia</td>
                            <td align="center">&nbsp;45</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=45&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie45">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(45, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=45');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/activate.gif" alt="Active" border=0></Link>--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=45&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/delete.gif" alt="Delete" border=0>--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="214"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Aruba</td>
                            <td align="center">&nbsp;231</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=214&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie214">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(214, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=214');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/activate.gif" alt="Active" border=0></Link>--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=214&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/delete.gif" alt="Delete" border=0>--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="196"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Australia</td>
                            <td align="center">&nbsp;196</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=196&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie196">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(196, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=196');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/activate.gif" alt="Active" border=0></Link>--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=196&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/delete.gif" alt="Delete" border=0>--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="46"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Austria</td>
                            <td align="center">&nbsp;46</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=46&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie46">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(46, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=46');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/activate.gif" alt="Active" border=0></Link>--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=46&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/delete.gif" alt="Delete" border=0>--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="47"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Azerbaijan</td>
                            <td align="center">&nbsp;47</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=47&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie47">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(47, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=47');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=47&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="3"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Bahamas</td>
                            <td align="center">&nbsp;3</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=3&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie3">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(3, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=3');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=3&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="98"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Bahrain</td>
                            <td align="center">&nbsp;98</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=98&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie98">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(98, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=98');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=98&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="99"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Bangladesh</td>
                            <td align="center">&nbsp;99</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=99&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie99">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(99, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=99');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDelet/eAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=99&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="4"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Barbados</td>
                            <td align="center">&nbsp;4</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=4&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie4">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(4, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=4');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=4&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="48"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Belarus</td>
                            <td align="center">&nbsp;48</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=48&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie48">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(48, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=48');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=48&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="49"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Belgium</td>
                            <td align="center">&nbsp;49</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=49&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie49">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(49, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=49');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=49&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="5"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Belize</td>
                            <td align="center">&nbsp;5</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=5&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie5">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(5, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=5');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=5&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="144"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Benin</td>
                            <td align="center">&nbsp;144</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=144&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie144">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(144, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=144');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=144&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="6"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Bermuda</td>
                            <td align="center">&nbsp;6</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=6&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie6">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(6, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=6');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=6&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="100"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Bhutan</td>
                            <td align="center">&nbsp;100</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=100&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie100">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(100, 6, 8);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>5</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=100');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=100&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="30"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Bolivia</td>
                            <td align="center">&nbsp;30</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=30&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie30">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(30, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=30');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=30&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_0 even" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="227"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">
                              &nbsp;Bonaire, Sint Eustatius and Saba
                            </td>
                            <td align="center">&nbsp;416</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=227&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie227">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(227, 4, 15);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>0</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=227');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=227&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="phps_row_1 odd" role="row">
                            <td class="sorting_1">
                              <div class="checkbox checkbox-success">
                                <input
                                  class="select-option"
                                  type="checkbox"
                                  name="chk[]"
                                  id="chk[]"
                                  value="50"
                                  style={{
                                    position: "absolute",
                                    marginleft: "-20px",
                                  }}
                                />
                                <label for="chk[]"></label>
                              </div>
                            </td>
                            <td align="center">&nbsp;A</td>
                            <td align="center">&nbsp;Bosnia and Herzegovina</td>
                            <td align="center">&nbsp;50</td>

                            <td>
                              <Link to="country.php?action=view&amp;id=50&amp;search=&amp;search_ccode=&amp;search_cname=">
                                <span class="pieChart" id="pie50">
                                  <canvas
                                    width="45"
                                    height="45"
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalalign: "top",
                                    }}
                                  ></canvas>
                                </span>
                                <script type="text/javascript">
                                  drawPieChart(50, 11, 6);
                                </script>
                              </Link>
                            </td>
                            <td>
                              <h5>2</h5>
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont">
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALEDIT
                                    }
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCOUNTRIESMANUALVIEW
                                    }
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('country.php?search=&amp;search_ccode=&amp;search_cname=&amp;action=inactive&amp;id=50');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','country.php?action=delete&amp;id=50&amp;search=&amp;search_ccode=&amp;search_cname=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                  >
                                    {/* <!--<img src="images/edit.gif" border=0 alt="Edit">--> */}
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div
                      class="dataTables_info"
                      id="search_transfer_info"
                      role="status"
                      aria-live="polite"
                    ></div>
                  </div>
                  <div class="col-sm-6"></div>
                </div>
              </div>
              <div class="form-group no-result">
                <h5 class="text-center">No result found.</h5>
              </div>
              <br />
              <div class="row pd_tp">
                <div class="row">
                  <div class="col-md-4 col_hide">
                    <div class="form-group col-md-12">&nbsp;</div>
                  </div>
                  <div class="col-md-5">
                    <nav aria-label="Page navigation example">
                      <ul class="pagination pagination-sm justify-content-center mt-4">
                        <li class="page-item active">
                          <Link class="page-link" to="#">
                            1
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link" to="#">
                            2
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link" to="#">
                            3
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link" to="#">
                            4
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link" to="#">
                            5
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link" to="#">
                            6
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link" to="#">
                            7
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link" to="#">
                            8
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link" to="#">
                            9
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link" to="#">
                            10
                          </Link>
                        </li>

                        <li class="page-item">
                          <Link class="page-link" to="#" aria-label="Next">
                            <span aria-hidden="true">»</span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  <div class="col-md-3 col_hide">&nbsp;</div>
                </div>
              </div>
              <br />
              <br />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CountriesManual;
