import { Link } from "react-router-dom";
import Header2 from "../../../header2/header2";

const MastersHotelMealBasisMapping = () => {
  return (
    <>
      <Header2
        title="ROOM MEAL BASIS FILTER MAPPING"
        linkText1="Room Meal Basis Filter Mapping"
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body removeMargins">
            <div className="row mt-2">
              <div className="col-md-12">
                <div
                  id="search_transfer_wrapper"
                  className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                >
                  <div className="row">
                    <div className="col-sm-10" />
                    <div className="col-sm-2">
                      <div
                        id="search_transfer_filter"
                        className="dataTables_filter"
                      >
                        {" "}
                        <label>
                          <h5 style={{ display: "inline" }}>
                            <i
                              className="fa fa-search srchWithinPg"
                              id="magnifier"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Search within this table"
                            />
                          </h5>
                          <input
                            type="search"
                            className="form-control input-sm"
                            placeholder
                            aria-controls="search_creadit_note"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <table
                        id="search_transfer"
                        className="table table-bordered   table-responsive table-bordered dataTable no-footer"
                        role="grid"
                        aria-describedby="search_transfer_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="sorting_asc"
                              tabIndex={0}
                              aria-controls="search_transfer"
                              rowSpan={1}
                              colSpan={1}
                              aria-sort="ascending"
                              aria-label="Supplier Meal Basis: activate to sort column descending"
                              style={{ width: "576px" }}
                            >
                              Supplier Meal Basis
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_transfer"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Fronted Filter Meal Basis: activate to sort column ascending"
                              style={{ width: "671px" }}
                            >
                              Fronted Filter Meal Basis
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr
                            className="meal_basis_row  odd_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">all inclusive</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['15']"
                                id="meal_basis_select['15']"
                                data-meal-id={15}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  even"
                            role="row"
                          >
                            <td className="sorting_1">all-inclusive</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['9']"
                                id="meal_basis_select['9']"
                                data-meal-id={9}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">bed and breakfast</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['14']"
                                id="meal_basis_select['14']"
                                data-meal-id={14}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  even"
                            role="row"
                          >
                            <td className="sorting_1">breakfast buffet</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['5']"
                                id="meal_basis_select['5']"
                                data-meal-id={5}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">
                              breakfast buffet,free wifi
                            </td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['19']"
                                id="meal_basis_select['19']"
                                data-meal-id={19}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  even"
                            role="row"
                          >
                            <td className="sorting_1">
                              breakfast for 1,free wifi
                            </td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['23']"
                                id="meal_basis_select['23']"
                                data-meal-id={23}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">breakfast for 2</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['8']"
                                id="meal_basis_select['8']"
                                data-meal-id={8}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  even"
                            role="row"
                          >
                            <td className="sorting_1">
                              breakfast for 2,free wifi
                            </td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['18']"
                                id="meal_basis_select['18']"
                                data-meal-id={18}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">
                              breakfast,coffee and tea,free wifi,drinking
                              water,free fitness center access
                            </td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['21']"
                                id="meal_basis_select['21']"
                                data-meal-id={21}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  even"
                            role="row"
                          >
                            <td className="sorting_1">
                              coffee and tea,free wifi,drinking water,free
                              fitness center access
                            </td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['20']"
                                id="meal_basis_select['20']"
                                data-meal-id={20}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">continental breakfast</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['3']"
                                id="meal_basis_select['3']"
                                data-meal-id={3}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  even"
                            role="row"
                          >
                            <td className="sorting_1">
                              continental breakfast,free wifi
                            </td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['24']"
                                id="meal_basis_select['24']"
                                data-meal-id={24}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">english breakfast</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['6']"
                                id="meal_basis_select['6']"
                                data-meal-id={6}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  even"
                            role="row"
                          >
                            <td className="sorting_1">free breakfast</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['2']"
                                id="meal_basis_select['2']"
                                data-meal-id={2}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">
                              free breakfast,breakfast for 2,free wifi
                            </td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['25']"
                                id="meal_basis_select['25']"
                                data-meal-id={25}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  even"
                            role="row"
                          >
                            <td className="sorting_1">
                              free breakfast,free wifi
                            </td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['17']"
                                id="meal_basis_select['17']"
                                data-meal-id={17}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">free dinner</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['7']"
                                id="meal_basis_select['7']"
                                data-meal-id={7}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  even"
                            role="row"
                          >
                            <td className="sorting_1">free lunch</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['13']"
                                id="meal_basis_select['13']"
                                data-meal-id={13}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">free wifi</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['16']"
                                id="meal_basis_select['16']"
                                data-meal-id={16}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  even"
                            role="row"
                          >
                            <td className="sorting_1">full board</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['10']"
                                id="meal_basis_select['10']"
                                data-meal-id={10}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">full breakfast</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['11']"
                                id="meal_basis_select['11']"
                                data-meal-id={11}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  even"
                            role="row"
                          >
                            <td className="sorting_1">
                              full breakfast,free wifi
                            </td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['22']"
                                id="meal_basis_select['22']"
                                data-meal-id={22}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">full kitchen</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['12']"
                                id="meal_basis_select['12']"
                                data-meal-id={12}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  odd_row  even"
                            role="row"
                          >
                            <td className="sorting_1">half board</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['1']"
                                id="meal_basis_select['1']"
                                data-meal-id={1}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                          <tr
                            className="meal_basis_row  even_row  odd"
                            role="row"
                          >
                            <td className="sorting_1">room only</td>
                            <td>
                              <select
                                className="form-control selectpicker meal_basis_select show-menu-arrow select2-hidden-accessible bs-select-hidden"
                                name="meal_basis_select['4']"
                                id="meal_basis_select['4']"
                                data-meal-id={4}
                                tabIndex={-1}
                                style={{}}
                                aria-hidden="true"
                                data-live-search="true"
                              >
                                <option value>* Unmapped *</option>
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6" />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="form-group col-md-3">
                    <button
                      className="btn btn-dark btn-sm"
                      type="button"
                      name="b1"
                      value="SUBMIT"
                      id="meal_basis_save_button"
                    >
                      <i className="fa fa-floppy-o" /> Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ minHeight: "48px" }}>
              <div className="col-md-12">
                {/*Pagination panel*/}
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-center mt-4">
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
                      <Link className="page-link" to="#">
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default MastersHotelMealBasisMapping;
