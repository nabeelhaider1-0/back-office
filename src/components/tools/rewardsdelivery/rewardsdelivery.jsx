import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import { deliveryStatusOptions } from "../../../constants/contants";

const RewardsDelivery = () => {
  return (
    <>
      <Header2 title="PRODUCTS" linkText1="Search Rewards" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-2 form-group">
                <label>Order ID</label>
                <input
                  type="text"
                  class="form-control form-control-sm test123"
                  name="search_order_id"
                  value=""
                />
              </div>

              <div class="col-md-2 form-group">
                <label>Product ID</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  name="search_product_id"
                  value=""
                />
              </div>

              <div class="col-md-2 form-group">
                <label>Delivery Status</label>
                <MultiSelect
                  options={deliveryStatusOptions}
                  isSearchable
                  placeholder="Select Delivery Status"
                  className="custom-select"
                  noOptionsMessage={() => "No Delivery Found"}
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-12 form-group">
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
            <div class="row mt-3">
              <div class="form-group  col-md-4 col_hide"></div>
              <div class=" form-group  col-md-5 col_hide"></div>
              <div class=" form-group col-md-3">
                <input
                  type="text"
                  class="tablesearch form-control form-control-sm search_new"
                  placeholder="Search"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
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
                  >
                    <thead>
                      <tr>
                        <th align="center" class="sorting_disabled">
                          Sr No.
                        </th>
                        <th align="center" class="sorting_disabled">
                          Order Id
                        </th>
                        <th align="center" class="sorting_disabled">
                          Product Id
                        </th>
                        <th align="center" class="sorting_disabled">
                          Product Name
                        </th>
                        <th align="center" class="sorting_disabled">
                          Agent Code
                        </th>
                        <th align="center" class="sorting_disabled">
                          Agent Username
                        </th>
                        <th align="center" class="sorting_disabled">
                          Delivery Status
                        </th>
                        <th align="center" colspan="3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr class="phps_row_2">
                        <td align="center">1</td>
                        <td align="center">OD0035</td>
                        <td align="center">PD0047</td>
                        <td align="center">Plasma TV</td>
                        <td align="center">CD0161</td>
                        <td align="center">nida_main</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_1">
                        <td align="center">2</td>
                        <td align="center">OD0034</td>
                        <td align="center">PD0046</td>
                        <td align="center">MovieTickets</td>
                        <td align="center">CD0161</td>
                        <td align="center">nida_main</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_2">
                        <td align="center">3</td>
                        <td align="center">OD0033</td>
                        <td align="center">PD0044</td>
                        <td align="center">Sports</td>
                        <td align="center">CD0159</td>
                        <td align="center">Loyal_agent</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_1">
                        <td align="center">4</td>
                        <td align="center">OD0032</td>
                        <td align="center">PD0041</td>
                        <td align="center">Movie</td>
                        <td align="center">CD0156</td>
                        <td align="center">LoyaltyModule</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_2">
                        <td align="center">5</td>
                        <td align="center">OD0031</td>
                        <td align="center">PD0041</td>
                        <td align="center">Movie</td>
                        <td align="center">CD0156</td>
                        <td align="center">LoyaltyModule</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_1">
                        <td align="center">6</td>
                        <td align="center">OD0030</td>
                        <td align="center">PD0038</td>
                        <td align="center">Movie</td>
                        <td align="center">CD0156</td>
                        <td align="center">LoyaltyModule</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_2">
                        <td align="center">7</td>
                        <td align="center">OD0036</td>
                        <td align="center">PD0048</td>
                        <td align="center">Sports</td>
                        <td align="center">CD0162</td>
                        <td align="center">NewAgent</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_1">
                        <td align="center">8</td>
                        <td align="center">OD0037</td>
                        <td align="center">PD0048</td>
                        <td align="center">Sports</td>
                        <td align="center">CD0163</td>
                        <td align="center">Muser</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_2">
                        <td align="center">9</td>
                        <td align="center">OD0038</td>
                        <td align="center">PD0048</td>
                        <td align="center">Sports</td>
                        <td align="center">CD0163</td>
                        <td align="center">Muser</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_1">
                        <td align="center">10</td>
                        <td align="center">OD0039</td>
                        <td align="center">PD0047</td>
                        <td align="center">Plasma TV</td>
                        <td align="center">CD0164</td>
                        <td align="center">loyal_main</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_2">
                        <td align="center">11</td>
                        <td align="center">OD0040</td>
                        <td align="center">PD0047</td>
                        <td align="center">Plasma TV</td>
                        <td align="center">CD0165</td>
                        <td align="center">sub_loyalty</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_1">
                        <td align="center">12</td>
                        <td align="center">OD0041</td>
                        <td align="center">PD0047</td>
                        <td align="center">Plasma TV</td>
                        <td align="center">CD0165</td>
                        <td align="center">sub_loyalty</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_2">
                        <td align="center">13</td>
                        <td align="center">OD0043</td>
                        <td align="center">PD0047</td>
                        <td align="center">Plasma TV</td>
                        <td align="center">CD0183</td>
                        <td align="center">Snehal02</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_1">
                        <td align="center">14</td>
                        <td align="center">OD0044</td>
                        <td align="center">PD0046</td>
                        <td align="center">MovieTickets</td>
                        <td align="center">CD0183</td>
                        <td align="center">Snehal02</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_2">
                        <td align="center">15</td>
                        <td align="center">OD0045</td>
                        <td align="center">PD0047</td>
                        <td align="center">Plasma TV</td>
                        <td align="center">CD0183</td>
                        <td align="center">Snehal02</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_1">
                        <td align="center">16</td>
                        <td align="center">OD0046</td>
                        <td align="center">PD0008</td>
                        <td align="center">Your dreams are mine now</td>
                        <td align="center">CD0183</td>
                        <td align="center">Snehal02</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_2">
                        <td align="center">17</td>
                        <td align="center">OD0047</td>
                        <td align="center">PD0018</td>
                        <td align="center">Riding jacket</td>
                        <td align="center">CD0183</td>
                        <td align="center">Snehal02</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr class="phps_row_1">
                        <td align="center">18</td>
                        <td align="center">OD0048</td>
                        <td align="center">PD0012</td>
                        <td align="center">Mobile Phone</td>
                        <td align="center">CD0183</td>
                        <td align="center">Snehal02</td>
                        <td align="center">Order Placed </td>

                        <td class="actionlink">
                          <div class="actionCont">
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYEDIT
                                }
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </Link>
                            </div>
                            <div class="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants
                                    .TOOLSREWARDSDELIVERYVIEW
                                }
                              >
                                <i class="fa fa-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <br />
                  <div class="row pd_tp">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group col-md-12 col_hide">&nbsp;</div>
                      </div>
                      <div class="col-md-5 col_hide">&nbsp;</div>
                      <div class="col-md-3 col_hide">&nbsp;</div>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default RewardsDelivery;
