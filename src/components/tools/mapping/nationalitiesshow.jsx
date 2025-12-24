import { nationalityoptions } from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";

const NationalitiesMappingReportShow = () => {
  return (
    <>
      <Header2 title="NATIONALITY MAPPING REPORT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .form-inline .radio, .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n}\ntable.dataTable tbody tr {\n    background-color: #ffffff;\n}\n",
          }}
        />
        <form>
          <div className="panel-body">
            <div className="row form-group">
              <div className="form-group col-md-3">
                <label>Suppplier</label>
                <MultiSelect
                  options={nationalityoptions}
                  isSearchable
                  placeholder="- Select Supplier -"
                  noOptionsMessage={() => "No Supplier Found"}
                  className="custom-select required"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-md-12">
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  onclick="mapping_report('show')"
                  value="Show Report"
                >
                  <i className="fa fa-eye" />
                  &nbsp;Show
                </button>
              </div>
            </div>
          </div>
        </form>
        <form className="mt-2">
          <div className="form-group">
            <div
              id="national_supplier_mapping_wrapper"
              className="dataTables_wrapper form-inline dt-bootstrap no-footer"
            >
              <div className="row">
                <div className="col-sm-10" />
                <div className="col-sm-2">
                  <div
                    id="national_supplier_mapping_filter"
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
                      id="national_supplier_mapping"
                      className="table table-bordered   table-responsive dataTable no-footer"
                      role="grid"
                      aria-describedby="national_supplier_mapping_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "69.2px" }}
                          >
                            No.
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "361.2px" }}
                          >
                            System Country
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "243.2px" }}
                          >
                            Supplier Country
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "382.2px" }}
                          >
                            Supplier Code
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "344px" }}
                          >
                            <div className="checkbox checkbox-success">
                              <input
                                type="checkbox"
                                defaultValue
                                className="selectDeselect"
                                onclick="SetAllCheckBoxes('frmcity_map', 'myCheckbox',this.checked);"
                              />
                              <label style={{ color: "white" }}>
                                &nbsp;Action
                              </label>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="phps_row_1 odd" role="row">
                          <td>1</td>
                          <td>Afghanistan</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata1"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[97]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink1"
                              onclick="showLIST(id,'1','97')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>2</td>
                          <td>Albania</td>
                          <td>ALBANIA</td>
                          <td>53</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[43]"
                                        defaultValue={53}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[43]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check243"> 
								 		<input type="radio" id="myradio"  name=block_countries[43] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check143">
								 		<input type="radio" id="myradio1"  name=block_countries[43] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>3</td>
                          <td>Algeria</td>
                          <td>
                            <span className="green">143</span>
                          </td>
                          <td>
                            <span className="green">143</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[142]"
                                defaultValue
                                id="check142"
                              />
                              <label htmlFor="check142">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>4</td>
                          <td>Andorra</td>
                          <td>
                            <span className="green">189</span>
                          </td>
                          <td>
                            <span className="green">189</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[44]"
                                defaultValue
                                id="check44"
                              />
                              <label htmlFor="check44"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>5</td>
                          <td>Angola</td>
                          <td>ANGOLA</td>
                          <td>290</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[143]"
                                        defaultValue={290}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[143]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2143"> 
								 		<input type="radio" id="myradio"  name=block_countries[143] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1143">
								 		<input type="radio" id="myradio1"  name=block_countries[143] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>6</td>
                          <td>ANTIGUA &amp; BARBUDA</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata6"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[230]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink6"
                              onclick="showLIST(id,'6','230')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>7</td>
                          <td>Argentina</td>
                          <td>
                            <span className="green">5</span>
                          </td>
                          <td>
                            <span className="green">5</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[29]"
                                defaultValue
                                id="check29"
                              />
                              <label htmlFor="check29"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>8</td>
                          <td>Armenia</td>
                          <td>ARMENIA</td>
                          <td>246</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[45]"
                                        defaultValue={246}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[45]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check245"> 
								 		<input type="radio" id="myradio"  name=block_countries[45] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check145">
								 		<input type="radio" id="myradio1"  name=block_countries[45] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>9</td>
                          <td>Australia</td>
                          <td>
                            <span className="green">139</span>
                          </td>
                          <td>
                            <span className="green">139</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[196]"
                                defaultValue
                                id="check196"
                              />
                              <label htmlFor="check196">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>10</td>
                          <td>Austria</td>
                          <td>
                            <span className="green">130</span>
                          </td>
                          <td>
                            <span className="green">130</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[46]"
                                defaultValue
                                id="check46"
                              />
                              <label htmlFor="check46"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>11</td>
                          <td>Azerbaijan</td>
                          <td>
                            <span className="green">135</span>
                          </td>
                          <td>
                            <span className="green">135</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[47]"
                                defaultValue
                                id="check47"
                              />
                              <label htmlFor="check47"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>12</td>
                          <td>Bahamas</td>
                          <td>BAHAMAS</td>
                          <td>60</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[3]"
                                        defaultValue={60}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[3]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check23"> 
								 		<input type="radio" id="myradio"  name=block_countries[3] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check13">
								 		<input type="radio" id="myradio1"  name=block_countries[3] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>13</td>
                          <td>Bahrain</td>
                          <td>
                            <span className="green">202</span>
                          </td>
                          <td>
                            <span className="green">202</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[98]"
                                defaultValue
                                id="check98"
                              />
                              <label htmlFor="check98"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>14</td>
                          <td>Bangladesh</td>
                          <td>
                            <span className="green">117</span>
                          </td>
                          <td>
                            <span className="green">117</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[99]"
                                defaultValue
                                id="check99"
                              />
                              <label htmlFor="check99"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>15</td>
                          <td>Barbados</td>
                          <td>BARBADOS</td>
                          <td>94</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[4]"
                                        defaultValue={94}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[4]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check24"> 
								 		<input type="radio" id="myradio"  name=block_countries[4] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check14">
								 		<input type="radio" id="myradio1"  name=block_countries[4] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>16</td>
                          <td>Belarus</td>
                          <td>BELARUS</td>
                          <td>21</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[48]"
                                        defaultValue={21}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[48]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check248"> 
								 		<input type="radio" id="myradio"  name=block_countries[48] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check148">
								 		<input type="radio" id="myradio1"  name=block_countries[48] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>17</td>
                          <td>Belgium</td>
                          <td>
                            <span className="green">118</span>
                          </td>
                          <td>
                            <span className="green">118</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[49]"
                                defaultValue
                                id="check49"
                              />
                              <label htmlFor="check49"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>18</td>
                          <td>Belize</td>
                          <td>BELIZE</td>
                          <td>88</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[5]"
                                        defaultValue={88}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[5]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check25"> 
								 		<input type="radio" id="myradio"  name=block_countries[5] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check15">
								 		<input type="radio" id="myradio1"  name=block_countries[5] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>19</td>
                          <td>Benin</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata19"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[144]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink19"
                              onclick="showLIST(id,'19','144')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>20</td>
                          <td>Bermuda</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata20"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[6]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink20"
                              onclick="showLIST(id,'20','6')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>21</td>
                          <td>Bhutan</td>
                          <td>
                            <span className="green">291</span>
                          </td>
                          <td>
                            <span className="green">291</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[100]"
                                defaultValue
                                id="check100"
                              />
                              <label htmlFor="check100">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>22</td>
                          <td>Bolivia</td>
                          <td>BOLIVIA</td>
                          <td>15</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[30]"
                                        defaultValue={15}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[30]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check230"> 
								 		<input type="radio" id="myradio"  name=block_countries[30] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check130">
								 		<input type="radio" id="myradio1"  name=block_countries[30] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>23</td>
                          <td>Bosnia and Herzegovina</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata23"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[50]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink23"
                              onclick="showLIST(id,'23','50')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>24</td>
                          <td>Botswana</td>
                          <td>
                            <span className="green">206</span>
                          </td>
                          <td>
                            <span className="green">206</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[145]"
                                defaultValue
                                id="check145"
                              />
                              <label htmlFor="check145">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>25</td>
                          <td>Brazil</td>
                          <td>
                            <span className="green">207</span>
                          </td>
                          <td>
                            <span className="green">207</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[31]"
                                defaultValue
                                id="check31"
                              />
                              <label htmlFor="check31"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>26</td>
                          <td>British Virgin Islands</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata26"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[7]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink26"
                              onclick="showLIST(id,'26','7')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>27</td>
                          <td>Brunei</td>
                          <td>
                            <span className="green">63</span>
                          </td>
                          <td>
                            <span className="green">63</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[101]"
                                defaultValue
                                id="check101"
                              />
                              <label htmlFor="check101">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>28</td>
                          <td>Bulgaria</td>
                          <td>
                            <span className="green">126</span>
                          </td>
                          <td>
                            <span className="green">126</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[51]"
                                defaultValue
                                id="check51"
                              />
                              <label htmlFor="check51"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>29</td>
                          <td>Burkina Faso</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata29"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[146]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink29"
                              onclick="showLIST(id,'29','146')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>30</td>
                          <td>Burundi</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata30"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[147]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink30"
                              onclick="showLIST(id,'30','147')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>31</td>
                          <td>Cambodia</td>
                          <td>
                            <span className="green">163</span>
                          </td>
                          <td>
                            <span className="green">163</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[102]"
                                defaultValue
                                id="check102"
                              />
                              <label htmlFor="check102">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>32</td>
                          <td>Cameroon</td>
                          <td>CAMEROON</td>
                          <td>36</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[148]"
                                        defaultValue={36}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[148]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2148"> 
								 		<input type="radio" id="myradio"  name=block_countries[148] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1148">
								 		<input type="radio" id="myradio1"  name=block_countries[148] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>33</td>
                          <td>Canada</td>
                          <td>
                            <span className="green">100</span>
                          </td>
                          <td>
                            <span className="green">100</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[2]"
                                defaultValue
                                id="check2"
                              />
                              <label htmlFor="check2"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>34</td>
                          <td>Cape Verde</td>
                          <td>CAPE VERDE</td>
                          <td>292</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[149]"
                                        defaultValue={292}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[149]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2149"> 
								 		<input type="radio" id="myradio"  name=block_countries[149] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1149">
								 		<input type="radio" id="myradio1"  name=block_countries[149] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>35</td>
                          <td>Cayman Islands</td>
                          <td>CAYMAN ISLANDS</td>
                          <td>142</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[8]"
                                        defaultValue={142}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[8]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check28"> 
								 		<input type="radio" id="myradio"  name=block_countries[8] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check18">
								 		<input type="radio" id="myradio1"  name=block_countries[8] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>36</td>
                          <td>Central African Republic</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata36"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[150]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink36"
                              onclick="showLIST(id,'36','150')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>37</td>
                          <td>Chad</td>
                          <td>CHAD</td>
                          <td>236</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[151]"
                                        defaultValue={236}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[151]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2151"> 
								 		<input type="radio" id="myradio"  name=block_countries[151] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1151">
								 		<input type="radio" id="myradio1"  name=block_countries[151] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>38</td>
                          <td>Chile</td>
                          <td>CHILE</td>
                          <td>69</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[32]"
                                        defaultValue={69}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[32]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check232"> 
								 		<input type="radio" id="myradio"  name=block_countries[32] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check132">
								 		<input type="radio" id="myradio1"  name=block_countries[32] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>39</td>
                          <td>China</td>
                          <td>
                            <span className="green">191</span>
                          </td>
                          <td>
                            <span className="green">191</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[103]"
                                defaultValue
                                id="check103"
                              />
                              <label htmlFor="check103">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>40</td>
                          <td>Colombia</td>
                          <td>
                            <span className="green">10</span>
                          </td>
                          <td>
                            <span className="green">10</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[33]"
                                defaultValue
                                id="check33"
                              />
                              <label htmlFor="check33"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>41</td>
                          <td>Congo-Brazzaville</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata41"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[152]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink41"
                              onclick="showLIST(id,'41','152')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>42</td>
                          <td>Congo-Kinshasa</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata42"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[153]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink42"
                              onclick="showLIST(id,'42','153')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>43</td>
                          <td>Costa Rica</td>
                          <td>
                            <span className="green">40</span>
                          </td>
                          <td>
                            <span className="green">40</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[9]"
                                defaultValue
                                id="check9"
                              />
                              <label htmlFor="check9"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>44</td>
                          <td>Croatia</td>
                          <td>
                            <span className="green">128</span>
                          </td>
                          <td>
                            <span className="green">128</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[52]"
                                defaultValue
                                id="check52"
                              />
                              <label htmlFor="check52"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>45</td>
                          <td>Cuba</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata45"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[10]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink45"
                              onclick="showLIST(id,'45','10')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>46</td>
                          <td>Cyprus</td>
                          <td>
                            <span className="green">24</span>
                          </td>
                          <td>
                            <span className="green">24</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[53]"
                                defaultValue
                                id="check53"
                              />
                              <label htmlFor="check53"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>47</td>
                          <td>Czech Republic</td>
                          <td>
                            <span className="green">13</span>
                          </td>
                          <td>
                            <span className="green">13</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[54]"
                                defaultValue
                                id="check54"
                              />
                              <label htmlFor="check54"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>48</td>
                          <td>Denmark</td>
                          <td>
                            <span className="green">158</span>
                          </td>
                          <td>
                            <span className="green">158</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[55]"
                                defaultValue
                                id="check55"
                              />
                              <label htmlFor="check55"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>49</td>
                          <td>Djibouti</td>
                          <td>DJIBOUTI</td>
                          <td>244</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[154]"
                                        defaultValue={244}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[154]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2154"> 
								 		<input type="radio" id="myradio"  name=block_countries[154] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1154">
								 		<input type="radio" id="myradio1"  name=block_countries[154] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>50</td>
                          <td>Dominica</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata50"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[11]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink50"
                              onclick="showLIST(id,'50','11')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>51</td>
                          <td>Dominican Republic</td>
                          <td>
                            <span className="green">134</span>
                          </td>
                          <td>
                            <span className="green">134</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[12]"
                                defaultValue
                                id="check12"
                              />
                              <label htmlFor="check12"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>52</td>
                          <td>East Timor</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata52"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[104]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink52"
                              onclick="showLIST(id,'52','104')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>53</td>
                          <td>Ecuador</td>
                          <td>ECUADOR</td>
                          <td>52</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[34]"
                                        defaultValue={52}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[34]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check234"> 
								 		<input type="radio" id="myradio"  name=block_countries[34] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check134">
								 		<input type="radio" id="myradio1"  name=block_countries[34] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>54</td>
                          <td>Egypt</td>
                          <td>
                            <span className="green">16</span>
                          </td>
                          <td>
                            <span className="green">16</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[155]"
                                defaultValue
                                id="check155"
                              />
                              <label htmlFor="check155">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>55</td>
                          <td>El Salvador</td>
                          <td>EL SALVADOR</td>
                          <td>80</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[13]"
                                        defaultValue={80}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[13]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check213"> 
								 		<input type="radio" id="myradio"  name=block_countries[13] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check113">
								 		<input type="radio" id="myradio1"  name=block_countries[13] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>56</td>
                          <td>Equatorial Guinea</td>
                          <td>EQUATORIAL GUINEA</td>
                          <td>295</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[156]"
                                        defaultValue={295}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[156]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2156"> 
								 		<input type="radio" id="myradio"  name=block_countries[156] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1156">
								 		<input type="radio" id="myradio1"  name=block_countries[156] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>57</td>
                          <td>Eritrea</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata57"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[157]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink57"
                              onclick="showLIST(id,'57','157')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>58</td>
                          <td>Estonia</td>
                          <td>
                            <span className="green">99</span>
                          </td>
                          <td>
                            <span className="green">99</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[56]"
                                defaultValue
                                id="check56"
                              />
                              <label htmlFor="check56"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>59</td>
                          <td>Ethiopia</td>
                          <td>ETHIOPIA</td>
                          <td>240</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[158]"
                                        defaultValue={240}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[158]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2158"> 
								 		<input type="radio" id="myradio"  name=block_countries[158] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1158">
								 		<input type="radio" id="myradio1"  name=block_countries[158] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>60</td>
                          <td>Falkland Islands</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata60"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[35]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink60"
                              onclick="showLIST(id,'60','35')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>61</td>
                          <td>Fiji</td>
                          <td>
                            <span className="green">109</span>
                          </td>
                          <td>
                            <span className="green">109</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[198]"
                                defaultValue
                                id="check198"
                              />
                              <label htmlFor="check198">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>62</td>
                          <td>Finland</td>
                          <td>
                            <span className="green">28</span>
                          </td>
                          <td>
                            <span className="green">28</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[57]"
                                defaultValue
                                id="check57"
                              />
                              <label htmlFor="check57"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>63</td>
                          <td>France</td>
                          <td>
                            <span className="green">153</span>
                          </td>
                          <td>
                            <span className="green">153</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[58]"
                                defaultValue
                                id="check58"
                              />
                              <label htmlFor="check58"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>64</td>
                          <td>French Guiana</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata64"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[36]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink64"
                              onclick="showLIST(id,'64','36')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>65</td>
                          <td>French Polynesia</td>
                          <td>
                            <span className="green">14</span>
                          </td>
                          <td>
                            <span className="green">14</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[199]"
                                defaultValue
                                id="check199"
                              />
                              <label htmlFor="check199">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>66</td>
                          <td>Gabon</td>
                          <td>GABON</td>
                          <td>234</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[159]"
                                        defaultValue={234}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[159]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2159"> 
								 		<input type="radio" id="myradio"  name=block_countries[159] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1159">
								 		<input type="radio" id="myradio1"  name=block_countries[159] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>67</td>
                          <td>Gambia</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata67"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[160]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink67"
                              onclick="showLIST(id,'67','160')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>68</td>
                          <td>Georgia</td>
                          <td>
                            <span className="green">71</span>
                          </td>
                          <td>
                            <span className="green">71</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[59]"
                                defaultValue
                                id="check59"
                              />
                              <label htmlFor="check59"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>69</td>
                          <td>Germany</td>
                          <td>
                            <span className="green">101</span>
                          </td>
                          <td>
                            <span className="green">101</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[60]"
                                defaultValue
                                id="check60"
                              />
                              <label htmlFor="check60"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>70</td>
                          <td>Ghana</td>
                          <td>
                            <span className="green">151</span>
                          </td>
                          <td>
                            <span className="green">151</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[161]"
                                defaultValue
                                id="check161"
                              />
                              <label htmlFor="check161">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>71</td>
                          <td>Gibraltar</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata71"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[61]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink71"
                              onclick="showLIST(id,'71','61')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>72</td>
                          <td>Greece</td>
                          <td>
                            <span className="green">197</span>
                          </td>
                          <td>
                            <span className="green">197</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[62]"
                                defaultValue
                                id="check62"
                              />
                              <label htmlFor="check62"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>73</td>
                          <td>Greenland</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata73"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[14]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink73"
                              onclick="showLIST(id,'73','14')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>74</td>
                          <td>Grenada</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata74"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[15]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink74"
                              onclick="showLIST(id,'74','15')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>75</td>
                          <td>Guadeloupe</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata75"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[16]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink75"
                              onclick="showLIST(id,'75','16')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>76</td>
                          <td>Guam</td>
                          <td>
                            <span className="green">208</span>
                          </td>
                          <td>
                            <span className="green">208</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[200]"
                                defaultValue
                                id="check200"
                              />
                              <label htmlFor="check200">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>77</td>
                          <td>Guatemala</td>
                          <td>GUATEMALA</td>
                          <td>41</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[17]"
                                        defaultValue={41}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[17]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check217"> 
								 		<input type="radio" id="myradio"  name=block_countries[17] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check117">
								 		<input type="radio" id="myradio1"  name=block_countries[17] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>78</td>
                          <td>Guernsey</td>
                          <td>GUERNSEY</td>
                          <td>406</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[63]"
                                        defaultValue={406}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[63]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check263"> 
								 		<input type="radio" id="myradio"  name=block_countries[63] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check163">
								 		<input type="radio" id="myradio1"  name=block_countries[63] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>79</td>
                          <td>Guinea</td>
                          <td>GUINEA</td>
                          <td>58</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[162]"
                                        defaultValue={58}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[162]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2162"> 
								 		<input type="radio" id="myradio"  name=block_countries[162] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1162">
								 		<input type="radio" id="myradio1"  name=block_countries[162] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>80</td>
                          <td>Guinea-Bissau</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata80"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[163]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink80"
                              onclick="showLIST(id,'80','163')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>81</td>
                          <td>Guyana</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata81"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[37]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink81"
                              onclick="showLIST(id,'81','37')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>82</td>
                          <td>Haiti</td>
                          <td>HAITI</td>
                          <td>47</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[18]"
                                        defaultValue={47}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[18]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check218"> 
								 		<input type="radio" id="myradio"  name=block_countries[18] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check118">
								 		<input type="radio" id="myradio1"  name=block_countries[18] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>83</td>
                          <td>Honduras</td>
                          <td>HONDURAS</td>
                          <td>39</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[19]"
                                        defaultValue={39}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[19]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check219"> 
								 		<input type="radio" id="myradio"  name=block_countries[19] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check119">
								 		<input type="radio" id="myradio1"  name=block_countries[19] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>84</td>
                          <td>Hong Kong</td>
                          <td>
                            <span className="green">132</span>
                          </td>
                          <td>
                            <span className="green">132</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[105]"
                                defaultValue
                                id="check105"
                              />
                              <label htmlFor="check105">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>85</td>
                          <td>Hungary</td>
                          <td>
                            <span className="green">37</span>
                          </td>
                          <td>
                            <span className="green">37</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[64]"
                                defaultValue
                                id="check64"
                              />
                              <label htmlFor="check64"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>86</td>
                          <td>Iceland</td>
                          <td>
                            <span className="green">54</span>
                          </td>
                          <td>
                            <span className="green">54</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[65]"
                                defaultValue
                                id="check65"
                              />
                              <label htmlFor="check65"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>87</td>
                          <td>India</td>
                          <td>
                            <span className="green">35</span>
                          </td>
                          <td>
                            <span className="green">35</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[106]"
                                defaultValue
                                id="check106"
                              />
                              <label htmlFor="check106">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>88</td>
                          <td>Indonesia</td>
                          <td>
                            <span className="green">192</span>
                          </td>
                          <td>
                            <span className="green">192</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[107]"
                                defaultValue
                                id="check107"
                              />
                              <label htmlFor="check107">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>89</td>
                          <td>Iran</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata89"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[108]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink89"
                              onclick="showLIST(id,'89','108')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>90</td>
                          <td>Iraq</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata90"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[109]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink90"
                              onclick="showLIST(id,'90','109')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>91</td>
                          <td>Ireland</td>
                          <td>
                            <span className="green">188</span>
                          </td>
                          <td>
                            <span className="green">188</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[66]"
                                defaultValue
                                id="check66"
                              />
                              <label htmlFor="check66"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>92</td>
                          <td>Isle of Man</td>
                          <td>ISLE OF MAN</td>
                          <td>405</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[67]"
                                        defaultValue={405}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[67]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check267"> 
								 		<input type="radio" id="myradio"  name=block_countries[67] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check167">
								 		<input type="radio" id="myradio1"  name=block_countries[67] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>93</td>
                          <td>Israel</td>
                          <td>
                            <span className="green">144</span>
                          </td>
                          <td>
                            <span className="green">144</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[110]"
                                defaultValue
                                id="check110"
                              />
                              <label htmlFor="check110">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>94</td>
                          <td>Italy</td>
                          <td>
                            <span className="green">205</span>
                          </td>
                          <td>
                            <span className="green">205</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[68]"
                                defaultValue
                                id="check68"
                              />
                              <label htmlFor="check68"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>95</td>
                          <td>Ivory Coast</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata95"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[164]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink95"
                              onclick="showLIST(id,'95','164')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>96</td>
                          <td>Jamaica</td>
                          <td>
                            <span className="green">42</span>
                          </td>
                          <td>
                            <span className="green">42</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[20]"
                                defaultValue
                                id="check20"
                              />
                              <label htmlFor="check20"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>97</td>
                          <td>Japan</td>
                          <td>
                            <span className="green">3</span>
                          </td>
                          <td>
                            <span className="green">3</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[111]"
                                defaultValue
                                id="check111"
                              />
                              <label htmlFor="check111">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>98</td>
                          <td>Jersey</td>
                          <td>JERSEY</td>
                          <td>404</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[69]"
                                        defaultValue={404}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[69]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check269"> 
								 		<input type="radio" id="myradio"  name=block_countries[69] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check169">
								 		<input type="radio" id="myradio1"  name=block_countries[69] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>99</td>
                          <td>Jordan</td>
                          <td>
                            <span className="green">152</span>
                          </td>
                          <td>
                            <span className="green">152</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[112]"
                                defaultValue
                                id="check112"
                              />
                              <label htmlFor="check112">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>100</td>
                          <td>Kazakhstan</td>
                          <td>
                            <span className="green">154</span>
                          </td>
                          <td>
                            <span className="green">154</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[113]"
                                defaultValue
                                id="check113"
                              />
                              <label htmlFor="check113">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>101</td>
                          <td>Kenya</td>
                          <td>
                            <span className="green">176</span>
                          </td>
                          <td>
                            <span className="green">176</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[165]"
                                defaultValue
                                id="check165"
                              />
                              <label htmlFor="check165">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>102</td>
                          <td>Kiribati</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata102"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[201]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink102"
                              onclick="showLIST(id,'102','201')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>103</td>
                          <td>Kosovo</td>
                          <td>KOSOVO</td>
                          <td>402</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[70]"
                                        defaultValue={402}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[70]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check270"> 
								 		<input type="radio" id="myradio"  name=block_countries[70] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check170">
								 		<input type="radio" id="myradio1"  name=block_countries[70] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>104</td>
                          <td>Kuwait</td>
                          <td>
                            <span className="green">43</span>
                          </td>
                          <td>
                            <span className="green">43</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[114]"
                                defaultValue
                                id="check114"
                              />
                              <label htmlFor="check114">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>105</td>
                          <td>Kyrgyzstan</td>
                          <td>KYRGYZSTAN</td>
                          <td>156</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[115]"
                                        defaultValue={156}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[115]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2115"> 
								 		<input type="radio" id="myradio"  name=block_countries[115] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1115">
								 		<input type="radio" id="myradio1"  name=block_countries[115] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>106</td>
                          <td>Laos</td>
                          <td>
                            <span className="green">190</span>
                          </td>
                          <td>
                            <span className="green">190</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[116]"
                                defaultValue
                                id="check116"
                              />
                              <label htmlFor="check116">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>107</td>
                          <td>Latvia</td>
                          <td>
                            <span className="green">145</span>
                          </td>
                          <td>
                            <span className="green">145</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[71]"
                                defaultValue
                                id="check71"
                              />
                              <label htmlFor="check71"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>108</td>
                          <td>Lebanon</td>
                          <td>
                            <span className="green">68</span>
                          </td>
                          <td>
                            <span className="green">68</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[117]"
                                defaultValue
                                id="check117"
                              />
                              <label htmlFor="check117">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>109</td>
                          <td>Lesotho</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata109"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[166]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink109"
                              onclick="showLIST(id,'109','166')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>110</td>
                          <td>Liberia</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata110"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[167]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink110"
                              onclick="showLIST(id,'110','167')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>111</td>
                          <td>Libya</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata111"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[168]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink111"
                              onclick="showLIST(id,'111','168')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>112</td>
                          <td>Liechtenstein</td>
                          <td>LIECHTENSTEIN</td>
                          <td>187</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[72]"
                                        defaultValue={187}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[72]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check272"> 
								 		<input type="radio" id="myradio"  name=block_countries[72] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check172">
								 		<input type="radio" id="myradio1"  name=block_countries[72] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>113</td>
                          <td>Lithuania</td>
                          <td>LITHUANIA</td>
                          <td>157</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[73]"
                                        defaultValue={157}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[73]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check273"> 
								 		<input type="radio" id="myradio"  name=block_countries[73] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check173">
								 		<input type="radio" id="myradio1"  name=block_countries[73] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>114</td>
                          <td>Luxembourg</td>
                          <td>LUXEMBOURG</td>
                          <td>7</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[74]"
                                        defaultValue={7}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[74]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check274"> 
								 		<input type="radio" id="myradio"  name=block_countries[74] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check174">
								 		<input type="radio" id="myradio1"  name=block_countries[74] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>115</td>
                          <td>Macau</td>
                          <td>
                            <span className="green">169</span>
                          </td>
                          <td>
                            <span className="green">169</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[118]"
                                defaultValue
                                id="check118"
                              />
                              <label htmlFor="check118">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>116</td>
                          <td>Macedonia</td>
                          <td>MACEDONIA</td>
                          <td>84</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[75]"
                                        defaultValue={84}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[75]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check275"> 
								 		<input type="radio" id="myradio"  name=block_countries[75] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check175">
								 		<input type="radio" id="myradio1"  name=block_countries[75] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>117</td>
                          <td>Madagascar</td>
                          <td>MADAGASCAR</td>
                          <td>209</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[169]"
                                        defaultValue={209}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[169]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2169"> 
								 		<input type="radio" id="myradio"  name=block_countries[169] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1169">
								 		<input type="radio" id="myradio1"  name=block_countries[169] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>118</td>
                          <td>Malawi</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata118"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[170]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink118"
                              onclick="showLIST(id,'118','170')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>119</td>
                          <td>Malaysia</td>
                          <td>
                            <span className="green">198</span>
                          </td>
                          <td>
                            <span className="green">198</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[119]"
                                defaultValue
                                id="check119"
                              />
                              <label htmlFor="check119">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>120</td>
                          <td>Maldives</td>
                          <td>
                            <span className="green">34</span>
                          </td>
                          <td>
                            <span className="green">34</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[120]"
                                defaultValue
                                id="check120"
                              />
                              <label htmlFor="check120">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>121</td>
                          <td>Mali</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata121"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[171]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink121"
                              onclick="showLIST(id,'121','171')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>122</td>
                          <td>Malta</td>
                          <td>
                            <span className="green">57</span>
                          </td>
                          <td>
                            <span className="green">57</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[76]"
                                defaultValue
                                id="check76"
                              />
                              <label htmlFor="check76"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>123</td>
                          <td>Marshall Islands</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata123"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[202]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink123"
                              onclick="showLIST(id,'123','202')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>124</td>
                          <td>Martinique</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata124"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[21]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink124"
                              onclick="showLIST(id,'124','21')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>125</td>
                          <td>Mauritania</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata125"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[172]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink125"
                              onclick="showLIST(id,'125','172')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>126</td>
                          <td>Mauritius</td>
                          <td>
                            <span className="green">9</span>
                          </td>
                          <td>
                            <span className="green">9</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[173]"
                                defaultValue
                                id="check173"
                              />
                              <label htmlFor="check173">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>127</td>
                          <td>Mexico</td>
                          <td>
                            <span className="green">86</span>
                          </td>
                          <td>
                            <span className="green">86</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[22]"
                                defaultValue
                                id="check22"
                              />
                              <label htmlFor="check22"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>128</td>
                          <td>Micronesia</td>
                          <td>
                            <span className="green">218</span>
                          </td>
                          <td>
                            <span className="green">218</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[203]"
                                defaultValue
                                id="check203"
                              />
                              <label htmlFor="check203">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>129</td>
                          <td>Moldova</td>
                          <td>
                            <span className="green">141</span>
                          </td>
                          <td>
                            <span className="green">141</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[77]"
                                defaultValue
                                id="check77"
                              />
                              <label htmlFor="check77"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>130</td>
                          <td>Monaco</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata130"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[78]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink130"
                              onclick="showLIST(id,'130','78')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>131</td>
                          <td>Mongolia</td>
                          <td>
                            <span className="green">302</span>
                          </td>
                          <td>
                            <span className="green">302</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[121]"
                                defaultValue
                                id="check121"
                              />
                              <label htmlFor="check121">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>132</td>
                          <td>Montenegro</td>
                          <td>
                            <span className="green">340</span>
                          </td>
                          <td>
                            <span className="green">340</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[79]"
                                defaultValue
                                id="check79"
                              />
                              <label htmlFor="check79"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>133</td>
                          <td>Montserrat</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata133"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[23]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink133"
                              onclick="showLIST(id,'133','23')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>134</td>
                          <td>Morocco</td>
                          <td>
                            <span className="green">2</span>
                          </td>
                          <td>
                            <span className="green">2</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[174]"
                                defaultValue
                                id="check174"
                              />
                              <label htmlFor="check174">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>135</td>
                          <td>Mozambique</td>
                          <td>
                            <span className="green">235</span>
                          </td>
                          <td>
                            <span className="green">235</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[175]"
                                defaultValue
                                id="check175"
                              />
                              <label htmlFor="check175">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>136</td>
                          <td>Myanmar (Burma)</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata136"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[122]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink136"
                              onclick="showLIST(id,'136','122')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>137</td>
                          <td>Namibia</td>
                          <td>
                            <span className="green">85</span>
                          </td>
                          <td>
                            <span className="green">85</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[176]"
                                defaultValue
                                id="check176"
                              />
                              <label htmlFor="check176">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>138</td>
                          <td>Nauru</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata138"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[204]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink138"
                              onclick="showLIST(id,'138','204')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>139</td>
                          <td>Nepal</td>
                          <td>
                            <span className="green">120</span>
                          </td>
                          <td>
                            <span className="green">120</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[123]"
                                defaultValue
                                id="check123"
                              />
                              <label htmlFor="check123">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>140</td>
                          <td>Netherlands</td>
                          <td>
                            <span className="green">149</span>
                          </td>
                          <td>
                            <span className="green">149</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[80]"
                                defaultValue
                                id="check80"
                              />
                              <label htmlFor="check80"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>141</td>
                          <td>New Caledonia</td>
                          <td>
                            <span className="green">44</span>
                          </td>
                          <td>
                            <span className="green">44</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[205]"
                                defaultValue
                                id="check205"
                              />
                              <label htmlFor="check205">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>142</td>
                          <td>New Zealand</td>
                          <td>
                            <span className="green">25</span>
                          </td>
                          <td>
                            <span className="green">25</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[197]"
                                defaultValue
                                id="check197"
                              />
                              <label htmlFor="check197">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>143</td>
                          <td>Nicaragua</td>
                          <td>NICARAGUA</td>
                          <td>92</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[24]"
                                        defaultValue={92}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[24]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check224"> 
								 		<input type="radio" id="myradio"  name=block_countries[24] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check124">
								 		<input type="radio" id="myradio1"  name=block_countries[24] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>144</td>
                          <td>Niger</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata144"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[177]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink144"
                              onclick="showLIST(id,'144','177')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>145</td>
                          <td>Nigeria</td>
                          <td>NIGERIA</td>
                          <td>65</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[178]"
                                        defaultValue={65}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[178]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2178"> 
								 		<input type="radio" id="myradio"  name=block_countries[178] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1178">
								 		<input type="radio" id="myradio1"  name=block_countries[178] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>146</td>
                          <td>North Korea</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata146"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[124]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink146"
                              onclick="showLIST(id,'146','124')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>147</td>
                          <td>Norway</td>
                          <td>
                            <span className="green">129</span>
                          </td>
                          <td>
                            <span className="green">129</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[81]"
                                defaultValue
                                id="check81"
                              />
                              <label htmlFor="check81"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>148</td>
                          <td>Oman</td>
                          <td>
                            <span className="green">155</span>
                          </td>
                          <td>
                            <span className="green">155</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[125]"
                                defaultValue
                                id="check125"
                              />
                              <label htmlFor="check125">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>149</td>
                          <td>Pakistan</td>
                          <td>
                            <span className="green">19</span>
                          </td>
                          <td>
                            <span className="green">19</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[126]"
                                defaultValue
                                id="check126"
                              />
                              <label htmlFor="check126">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>150</td>
                          <td>Palestine</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata150"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[228]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink150"
                              onclick="showLIST(id,'150','228')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>151</td>
                          <td>Panama</td>
                          <td>
                            <span className="green">175</span>
                          </td>
                          <td>
                            <span className="green">175</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[25]"
                                defaultValue
                                id="check25"
                              />
                              <label htmlFor="check25"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>152</td>
                          <td>Papua New Guinea</td>
                          <td>
                            <span className="green">91</span>
                          </td>
                          <td>
                            <span className="green">91</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[206]"
                                defaultValue
                                id="check206"
                              />
                              <label htmlFor="check206">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>153</td>
                          <td>Paraguay</td>
                          <td>
                            <span className="green">111</span>
                          </td>
                          <td>
                            <span className="green">111</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[38]"
                                defaultValue
                                id="check38"
                              />
                              <label htmlFor="check38"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>154</td>
                          <td>Peru</td>
                          <td>PERU</td>
                          <td>186</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[39]"
                                        defaultValue={186}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[39]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check239"> 
								 		<input type="radio" id="myradio"  name=block_countries[39] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check139">
								 		<input type="radio" id="myradio1"  name=block_countries[39] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>155</td>
                          <td>Philippines</td>
                          <td>
                            <span className="green">70</span>
                          </td>
                          <td>
                            <span className="green">70</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[127]"
                                defaultValue
                                id="check127"
                              />
                              <label htmlFor="check127">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>156</td>
                          <td>Poland</td>
                          <td>
                            <span className="green">182</span>
                          </td>
                          <td>
                            <span className="green">182</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[82]"
                                defaultValue
                                id="check82"
                              />
                              <label htmlFor="check82"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>157</td>
                          <td>Portugal</td>
                          <td>
                            <span className="green">213</span>
                          </td>
                          <td>
                            <span className="green">213</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[83]"
                                defaultValue
                                id="check83"
                              />
                              <label htmlFor="check83"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>158</td>
                          <td>Puerto Rico</td>
                          <td>PUERTO RICO</td>
                          <td>166</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[26]"
                                        defaultValue={166}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[26]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check226"> 
								 		<input type="radio" id="myradio"  name=block_countries[26] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check126">
								 		<input type="radio" id="myradio1"  name=block_countries[26] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>159</td>
                          <td>Qatar</td>
                          <td>
                            <span className="green">105</span>
                          </td>
                          <td>
                            <span className="green">105</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[128]"
                                defaultValue
                                id="check128"
                              />
                              <label htmlFor="check128">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>160</td>
                          <td>Reunion</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata160"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[179]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink160"
                              onclick="showLIST(id,'160','179')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>161</td>
                          <td>Romania</td>
                          <td>
                            <span className="green">75</span>
                          </td>
                          <td>
                            <span className="green">75</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[84]"
                                defaultValue
                                id="check84"
                              />
                              <label htmlFor="check84"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>162</td>
                          <td>Russia</td>
                          <td>
                            <span className="green">33</span>
                          </td>
                          <td>
                            <span className="green">33</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[85]"
                                defaultValue
                                id="check85"
                              />
                              <label htmlFor="check85"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>163</td>
                          <td>Rwanda</td>
                          <td>RWANDA</td>
                          <td>131</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[180]"
                                        defaultValue={131}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[180]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2180"> 
								 		<input type="radio" id="myradio"  name=block_countries[180] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1180">
								 		<input type="radio" id="myradio1"  name=block_countries[180] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>164</td>
                          <td>Samoa</td>
                          <td>
                            <span className="green">287</span>
                          </td>
                          <td>
                            <span className="green">287</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[207]"
                                defaultValue
                                id="check207"
                              />
                              <label htmlFor="check207">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>165</td>
                          <td>San Marino</td>
                          <td>SAN MARINO</td>
                          <td>241</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[86]"
                                        defaultValue={241}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[86]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check286"> 
								 		<input type="radio" id="myradio"  name=block_countries[86] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check186">
								 		<input type="radio" id="myradio1"  name=block_countries[86] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>166</td>
                          <td>Sao Tome and Principe</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata166"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[181]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink166"
                              onclick="showLIST(id,'166','181')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>167</td>
                          <td>Saudi Arabia</td>
                          <td>
                            <span className="green">74</span>
                          </td>
                          <td>
                            <span className="green">74</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[129]"
                                defaultValue
                                id="check129"
                              />
                              <label htmlFor="check129">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>168</td>
                          <td>Senegal</td>
                          <td>SENEGAL</td>
                          <td>233</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[182]"
                                        defaultValue={233}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[182]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2182"> 
								 		<input type="radio" id="myradio"  name=block_countries[182] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1182">
								 		<input type="radio" id="myradio1"  name=block_countries[182] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>169</td>
                          <td>Serbia</td>
                          <td>
                            <span className="green">339</span>
                          </td>
                          <td>
                            <span className="green">339</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[87]"
                                defaultValue
                                id="check87"
                              />
                              <label htmlFor="check87"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>170</td>
                          <td>Seychelles</td>
                          <td>
                            <span className="green">115</span>
                          </td>
                          <td>
                            <span className="green">115</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[183]"
                                defaultValue
                                id="check183"
                              />
                              <label htmlFor="check183">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>171</td>
                          <td>Sierra Leone</td>
                          <td>SIERRA LEONE</td>
                          <td>309</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[184]"
                                        defaultValue={309}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[184]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2184"> 
								 		<input type="radio" id="myradio"  name=block_countries[184] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1184">
								 		<input type="radio" id="myradio1"  name=block_countries[184] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>172</td>
                          <td>Singapore</td>
                          <td>
                            <span className="green">114</span>
                          </td>
                          <td>
                            <span className="green">114</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[130]"
                                defaultValue
                                id="check130"
                              />
                              <label htmlFor="check130">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>173</td>
                          <td>Slovakia</td>
                          <td>SLOVAKIA</td>
                          <td>125</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[88]"
                                        defaultValue={125}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[88]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check288"> 
								 		<input type="radio" id="myradio"  name=block_countries[88] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check188">
								 		<input type="radio" id="myradio1"  name=block_countries[88] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>174</td>
                          <td>Slovenia</td>
                          <td>
                            <span className="green">27</span>
                          </td>
                          <td>
                            <span className="green">27</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[89]"
                                defaultValue
                                id="check89"
                              />
                              <label htmlFor="check89"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>175</td>
                          <td>Solomon Islands</td>
                          <td>
                            <span className="green">323</span>
                          </td>
                          <td>
                            <span className="green">323</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[208]"
                                defaultValue
                                id="check208"
                              />
                              <label htmlFor="check208">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>176</td>
                          <td>Somalia</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata176"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[185]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink176"
                              onclick="showLIST(id,'176','185')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>177</td>
                          <td>South Africa</td>
                          <td>
                            <span className="green">62</span>
                          </td>
                          <td>
                            <span className="green">62</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[186]"
                                defaultValue
                                id="check186"
                              />
                              <label htmlFor="check186">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>178</td>
                          <td>South Korea</td>
                          <td>
                            <span className="green">212</span>
                          </td>
                          <td>
                            <span className="green">212</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[131]"
                                defaultValue
                                id="check131"
                              />
                              <label htmlFor="check131">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>179</td>
                          <td>Spain</td>
                          <td>
                            <span className="green">167</span>
                          </td>
                          <td>
                            <span className="green">167</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[90]"
                                defaultValue
                                id="check90"
                              />
                              <label htmlFor="check90"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>180</td>
                          <td>Sri Lanka</td>
                          <td>
                            <span className="green">82</span>
                          </td>
                          <td>
                            <span className="green">82</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[132]"
                                defaultValue
                                id="check132"
                              />
                              <label htmlFor="check132">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>181</td>
                          <td>Sudan</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata181"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[187]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink181"
                              onclick="showLIST(id,'181','187')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>182</td>
                          <td>Suriname</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata182"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[40]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink182"
                              onclick="showLIST(id,'182','40')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>183</td>
                          <td>Swaziland</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata183"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[188]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink183"
                              onclick="showLIST(id,'183','188')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>184</td>
                          <td>Sweden</td>
                          <td>
                            <span className="green">49</span>
                          </td>
                          <td>
                            <span className="green">49</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[91]"
                                defaultValue
                                id="check91"
                              />
                              <label htmlFor="check91"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>185</td>
                          <td>Switzerland</td>
                          <td>
                            <span className="green">51</span>
                          </td>
                          <td>
                            <span className="green">51</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[92]"
                                defaultValue
                                id="check92"
                              />
                              <label htmlFor="check92"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>186</td>
                          <td>Syria</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata186"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[133]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink186"
                              onclick="showLIST(id,'186','133')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>187</td>
                          <td>Taiwan</td>
                          <td>
                            <span className="green">140</span>
                          </td>
                          <td>
                            <span className="green">140</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[134]"
                                defaultValue
                                id="check134"
                              />
                              <label htmlFor="check134">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>188</td>
                          <td>Tajikistan</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata188"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[135]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink188"
                              onclick="showLIST(id,'188','135')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>189</td>
                          <td>Tanzania</td>
                          <td>
                            <span className="green">199</span>
                          </td>
                          <td>
                            <span className="green">199</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[189]"
                                defaultValue
                                id="check189"
                              />
                              <label htmlFor="check189">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>190</td>
                          <td>Thailand</td>
                          <td>
                            <span className="green">106</span>
                          </td>
                          <td>
                            <span className="green">106</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[136]"
                                defaultValue
                                id="check136"
                              />
                              <label htmlFor="check136">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>191</td>
                          <td>Togo</td>
                          <td>TOGO</td>
                          <td>121</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[190]"
                                        defaultValue={121}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[190]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2190"> 
								 		<input type="radio" id="myradio"  name=block_countries[190] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1190">
								 		<input type="radio" id="myradio1"  name=block_countries[190] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>192</td>
                          <td>Tonga</td>
                          <td>
                            <span className="green">315</span>
                          </td>
                          <td>
                            <span className="green">315</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[209]"
                                defaultValue
                                id="check209"
                              />
                              <label htmlFor="check209">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>193</td>
                          <td>Trinidad and Tobago</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata193"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[27]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink193"
                              onclick="showLIST(id,'193','27')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>194</td>
                          <td>Tunisia</td>
                          <td>
                            <span className="green">56</span>
                          </td>
                          <td>
                            <span className="green">56</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[191]"
                                defaultValue
                                id="check191"
                              />
                              <label htmlFor="check191">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>195</td>
                          <td>Turkey</td>
                          <td>
                            <span className="green">45</span>
                          </td>
                          <td>
                            <span className="green">45</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[93]"
                                defaultValue
                                id="check93"
                              />
                              <label htmlFor="check93"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>196</td>
                          <td>Turkmenistan</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata196"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[137]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink196"
                              onclick="showLIST(id,'196','137')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>197</td>
                          <td>Tuvalu</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata197"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[210]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink197"
                              onclick="showLIST(id,'197','210')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>198</td>
                          <td>Uganda</td>
                          <td>
                            <span className="green">245</span>
                          </td>
                          <td>
                            <span className="green">245</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[192]"
                                defaultValue
                                id="check192"
                              />
                              <label htmlFor="check192">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>199</td>
                          <td>Ukraine</td>
                          <td>
                            <span className="green">79</span>
                          </td>
                          <td>
                            <span className="green">79</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[94]"
                                defaultValue
                                id="check94"
                              />
                              <label htmlFor="check94"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>200</td>
                          <td>United Arab Emirates</td>
                          <td>
                            <span className="green">64</span>
                          </td>
                          <td>
                            <span className="green">64</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[138]"
                                defaultValue
                                id="check138"
                              />
                              <label htmlFor="check138">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>201</td>
                          <td>United Kingdom</td>
                          <td>
                            <span className="green">107</span>
                          </td>
                          <td>
                            <span className="green">107</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[95]"
                                defaultValue
                                id="check95"
                              />
                              <label htmlFor="check95"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>202</td>
                          <td>United States</td>
                          <td>
                            <span className="green">181</span>
                          </td>
                          <td>
                            <span className="green">181</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[1]"
                                defaultValue
                                id="check1"
                              />
                              <label htmlFor="check1"> - Remove Mapping</label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>203</td>
                          <td>United States Virgin Islands</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata203"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[28]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink203"
                              onclick="showLIST(id,'203','28')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>204</td>
                          <td>Uruguay</td>
                          <td>URUGUAY</td>
                          <td>110</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[41]"
                                        defaultValue={110}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[41]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check241"> 
								 		<input type="radio" id="myradio"  name=block_countries[41] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check141">
								 		<input type="radio" id="myradio1"  name=block_countries[41] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>205</td>
                          <td>Uzbekistan</td>
                          <td>UZBEKISTAN</td>
                          <td>172</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[139]"
                                        defaultValue={172}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[139]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2139"> 
								 		<input type="radio" id="myradio"  name=block_countries[139] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1139">
								 		<input type="radio" id="myradio1"  name=block_countries[139] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_0 even"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>206</td>
                          <td>Vanuatu</td>
                          <td>
                            <span className="green">194</span>
                          </td>
                          <td>
                            <span className="green">194</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[211]"
                                defaultValue
                                id="check211"
                              />
                              <label htmlFor="check211">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>207</td>
                          <td>Vatican City</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata207"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[96]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink207"
                              onclick="showLIST(id,'207','96')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>208</td>
                          <td>Venezuela</td>
                          <td>VENEZUELA</td>
                          <td>146</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[42]"
                                        defaultValue={146}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[42]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check242"> 
								 		<input type="radio" id="myradio"  name=block_countries[42] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check142">
								 		<input type="radio" id="myradio1"  name=block_countries[42] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          className="phps_row_1 odd"
                          style={{ backgroundColor: "#90eeB4" }}
                          role="row"
                        >
                          <td>209</td>
                          <td>Vietnam</td>
                          <td>
                            <span className="green">38</span>
                          </td>
                          <td>
                            <span className="green">38</span>
                            <div className="checkbox checkbox-success checkbox-inline">
                              <input
                                type="checkbox"
                                name="remove_already_mapped_countries[140]"
                                defaultValue
                                id="check140"
                              />
                              <label htmlFor="check140">
                                {" "}
                                - Remove Mapping
                              </label>
                            </div>
                          </td>
                          <td className="actionCont">-</td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>210</td>
                          <td>Wallis and Futuna</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata210"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[212]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink210"
                              onclick="showLIST(id,'210','212')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>211</td>
                          <td>Western Sahara</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata211"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[193]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink211"
                              onclick="showLIST(id,'211','193')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>212</td>
                          <td>Yemen</td>
                          <td />
                          <td></td>
                          <td className="actionCont">
                            <div
                              id="list_showdata212"
                              style={{ display: "none" }}
                              className="col-md-"
                            >
                              <select
                                name="sel_manual_map_supplier_country[141]"
                                id="sel_manual_map_supplier_country"
                                data-container="body"
                                className="selectpicker form-control show-menu-arrow"
                              >
                                <option value>
                                  - Select Supplier Country -
                                </option>
                                <option value="blocked">Blocked</option>
                              </select>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              id="maplink212"
                              onclick="showLIST(id,'212','141')"
                            >
                              Manual Map
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>213</td>
                          <td>Zambia</td>
                          <td>ZAMBIA</td>
                          <td>171</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[194]"
                                        defaultValue={171}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[194]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2194"> 
								 		<input type="radio" id="myradio"  name=block_countries[194] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1194">
								 		<input type="radio" id="myradio1"  name=block_countries[194] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>214</td>
                          <td>Zimbabwe</td>
                          <td>ZIMBABWE</td>
                          <td>61</td>
                          <td className="actionCont">
                            {/* <span style="font-size:xx-small;">Mapping</span><br> */}
                            <table border={0} width="100%">
                              <tbody className="bg-white">
                                <tr>
                                  <td>
                                    <label>Mapping</label>
                                    <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="suggested_countries[195]"
                                        defaultValue={61}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>
                                    <label>Blocked</label> <br />
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox1"
                                        name="block_countries[195]"
                                        defaultValue
                                      />
                                      <label />
                                    </div>
                                    {/* <div class="radio radio-success radio-inline" id="check2195"> 
								 		<input type="radio" id="myradio"  name=block_countries[195] value="True">
										<label>Yes</label>
									</div>
									<div class="radio radio-success radio-inline" id="check1195">
								 		<input type="radio" id="myradio1"  name=block_countries[195] value="False">
										<label>No</label>
									</div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
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
    </>
  );
};
export default NationalitiesMappingReportShow;
