import React, { useEffect, useRef } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import { hotelMappingoptions } from "../../../constants/contants";

const MappinghotelMap = () => {
  const wrapper1Ref = useRef(null);
  const wrapper2Ref = useRef(null);

  useEffect(() => {
    const wrapper1 = wrapper1Ref.current;
    const wrapper2 = wrapper2Ref.current;

    const handleWrapper1Scroll = () => {
      wrapper2.scrollLeft = wrapper1.scrollLeft;
    };

    const handleWrapper2Scroll = () => {
      wrapper1.scrollLeft = wrapper2.scrollLeft;
    };

    if (wrapper1 && wrapper2) {
      wrapper1.addEventListener("scroll", handleWrapper1Scroll);
      wrapper2.addEventListener("scroll", handleWrapper2Scroll);
    }

    // Cleanup event listeners when component unmounts
    return () => {
      if (wrapper1 && wrapper2) {
        wrapper1.removeEventListener("scroll", handleWrapper1Scroll);
        wrapper2.removeEventListener("scroll", handleWrapper2Scroll);
      }
    };
  }, []);
  return (
    <>
      <Header2
        title="MANUAL HOTEL MAPPING"
        linkText1=" List Hotel"
        linkText2=" Manual Hotel Mapping"
        link1={Constants.URLConstants.TOOLSMAPPINGHOTELS}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row form-group">
                <div className="col-md-3 form-group">
                  <label>Hotel</label>
                  <MultiSelect
                    options={hotelMappingoptions}
                    isSearchable
                    placeholder="- Select Hotel Mapping-"
                    className="custom-select"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-3 form-group">
                  <button
                    id="next_btn"
                    className="btn btn-dark btn-sm"
                    type="button"
                    value="Next Hotel"
                    onclick="showNext();"
                  >
                    <i className="fa fa-arrow-circle-right" />
                    &nbsp;Next Hotel
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-dark btn-sm"
                    type="submit"
                    value="Create New Hotel"
                    onclick="create_new_hotel();"
                  >
                    <i className="fa fa-pencil-square-o" />
                    &nbsp;Create New Hotel
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div
                    id="loadMsg"
                    className="mesID"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </form>
          <form className="mt-2">
            <div className=" panel-body mt-2">
              <div className="form-group local">
                <h5>Local</h5>
              </div>
              <div className="local" id="id" />
              <div id="local_div" className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-3 form-group">
                      <label>Name</label>
                      <div id="div_lbl_name">
                        <div className="input-group date col-xs-12">
                          new hotel
                          <span
                            onclick="change_div('div_lbl_name','div_txt_name')"
                            className="input-group-addon"
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_name" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <input
                            className="form-control"
                            type="text"
                            name="txt_local_name"
                            id="txt_local_name"
                            defaultValue="new hotel"
                          />
                          <span
                            onclick="edit_text('name','txt_local_name');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_name','div_lbl_name')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Address</label>
                      <div id="div_lbl_address">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_address','div_txt_address')"
                            className="input-group-addon"
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_address" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <input
                            className="form-control"
                            type="text"
                            name="txt_local_address"
                            id="txt_local_address"
                            defaultValue
                          />
                          <span
                            onclick="edit_text('address','txt_local_address');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_address','div_lbl_address')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Rating</label>
                      <div id="div_lbl_rating">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_rating','div_txt_rating')"
                            className="input-group-addon"
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_rating" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <input
                            className="form-control"
                            type="text"
                            name="txt_rating"
                            id="txt_rating"
                            defaultValue
                          />
                          <span
                            onclick="edit_text('rating','txt_rating');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_rating','div_lbl_rating')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Phone</label>
                      <div id="div_lbl_phone">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_phone','div_txt_phone')"
                            className="input-group-addon"
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_phone" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <input
                            className="form-control"
                            type="text"
                            name="txt_phone"
                            id="txt_phone"
                            defaultValue
                          />
                          <span
                            onclick="edit_text('phone','txt_phone');;"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_phone','div_lbl_phone')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 form-group">
                      <label>Fax</label>
                      <div id="div_lbl_fax">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_fax','div_txt_fax')"
                            className="input-group-addon"
                            style={{ marginLeft: "270px" }}
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_fax" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <input
                            className="form-control"
                            type="text"
                            name="txt_fax"
                            id="txt_fax"
                            defaultValue
                          />
                          <span
                            onclick="edit_text('fax','txt_fax');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_fax','div_lbl_fax')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Email</label>
                      <div id="div_lbl_email">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_email','div_txt_email')"
                            className="input-group-addon"
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_email" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <input
                            className="form-control"
                            type="text"
                            name="txt_email"
                            id="txt_email"
                            defaultValue
                          />
                          <span
                            onclick="edit_text('email','txt_email');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_email','div_lbl_email')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Website</label>
                      <div id="div_lbl_website">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_website','div_txt_website')"
                            className="input-group-addon"
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_website" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <input
                            className="form-control"
                            type="text"
                            name="txt_website"
                            id="txt_website"
                            defaultValue
                          />
                          <span
                            onclick="edit_text('website','txt_website');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_website','div_lbl_website')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-3 form-group"
                      style={{ width: "22%" }}
                    >
                      <label>Location</label>
                      <select
                        className="selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                        name="locations"
                        onchange="change_locations(this.value);"
                        data-live-search="true"
                      >
                        <option value={0} />
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 form-group">
                      <label>Latitude</label>
                      <div id="div_lbl_latitude">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_latitude','div_txt_latitude')"
                            className="input-group-addon"
                            style={{ marginLeft: "270px" }}
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_latitude" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <input
                            className="form-control"
                            type="text"
                            name="txt_latitude"
                            id="txt_latitude"
                            defaultValue
                          />
                          <span
                            onclick="edit_text('latitude','txt_latitude');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_latitude','div_lbl_latitude')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Longitude</label>
                      <div id="div_lbl_longitude">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_longitude','div_txt_longitude')"
                            className="input-group-addon"
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_longitude" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <input
                            className="form-control"
                            type="text"
                            name="txt_longitude"
                            id="txt_longitude"
                            defaultValue
                          />
                          <span
                            onclick="edit_text('longitude','txt_longitude');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_longitude','div_lbl_longitude')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Hotel Amenities</label>
                      <div id="div_lbl_hotel_amenities">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_hotel_amenities','div_txt_hotel_amenities');"
                            className="input-group-addon"
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div
                        id="div_txt_hotel_amenities"
                        style={{ display: "none" }}
                      >
                        <div className="input-group date col-xs-12">
                          <textarea
                            className="form-control"
                            id="txt_hotel_amenities"
                            name="txt_hotel_amenities"
                            defaultValue={""}
                          />
                          <span
                            onclick="edit_text('hotel_amenities','txt_hotel_amenities');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_hotel_amenities','div_lbl_hotel_amenities')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Room Amenities</label>
                      <div id="div_lbl_room_amenities">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_room_amenities','div_txt_room_amenities');"
                            className="input-group-addon"
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div
                        id="div_txt_room_amenities"
                        style={{ display: "none" }}
                      >
                        <div className="input-group date col-xs-12">
                          <textarea
                            className="form-control"
                            id="txt_room_amenities"
                            name="txt_room_amenities"
                            defaultValue={""}
                          />
                          <span
                            onclick="edit_text('room_amenities','txt_room_amenities');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_room_amenities','div_lbl_room_amenities')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-3 form-group">
                      <label>Short Description</label>
                      <div id="div_lbl_short_desc">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_short_desc','div_txt_short_desc')"
                            className="input-group-addon"
                            style={{ marginLeft: "270px" }}
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_short_desc" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <textarea
                            className="form-control"
                            id="txt_short_desc"
                            name="txt_short_desc"
                            defaultValue={""}
                          />
                          <span
                            onclick="edit_text('short_desc','txt_short_desc');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_short_desc','div_lbl_short_desc')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Long Description</label>
                      <div id="div_lbl_long_desc">
                        <div className="input-group date col-xs-12">
                          Add{" "}
                          <span
                            onclick="change_div('div_lbl_long_desc','div_txt_long_desc')"
                            className="input-group-addon"
                          >
                            <i className="fa fa-pencil" />
                          </span>
                        </div>
                      </div>
                      <div id="div_txt_long_desc" style={{ display: "none" }}>
                        <div className="input-group date col-xs-12">
                          <textarea
                            className="form-control"
                            id="txt_long_desc"
                            name="txt_long_desc"
                            defaultValue={""}
                          />
                          <span
                            onclick="edit_text('long_desc','txt_long_desc');"
                            title="save"
                            alt="save"
                            className="input-group-addon"
                          >
                            <i className="fa fa-floppy-o" />
                          </span>
                          <span
                            onclick="change_div('div_txt_long_desc','div_lbl_long_desc')"
                            title="cancel"
                            alt="cancel"
                            className="input-group-addon"
                          >
                            <i className="fa fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row"></div>
                </div>
              </div>
            </div>
          </form>
          <form className="mt-2">
            <div className="panel-body removeMargins">
              <div className="dataTables_scroll">
                <div
                  id="search_sup_wrapper"
                  className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                >
                  <div className="row">
                    <div className="col-sm-12">
                      <div
                        className="doubleScroll-scroll-wrapper"
                        id="wrapper1"
                        ref={wrapper1Ref}
                        style={{
                          height: "20px",
                          overflow: "scroll hidden",
                          width: "3500px",
                        }}
                      >
                        <div
                          className="suwala-doubleScroll-scroll"
                          style={{ height: "20px", width: "3800px" }}
                        />
                      </div>
                      <div
                        id="wrapper2"
                        ref={wrapper2Ref}
                        style={{ overflow: "auto" }}
                      >
                        <table
                          id="search_sup"
                          className="table table-bordered  table-responsive dataTable no-footer"
                          role="grid"
                          aria-describedby="search_sup_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                width="30%"
                                className="dotw sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "337.2px" }}
                              >
                                DOTW
                              </th>
                              <th
                                width="30%"
                                className="expedia sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "337.2px" }}
                              >
                                Expedia
                              </th>
                              <th
                                width="30%"
                                className="hotelbeds sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "337.2px" }}
                              >
                                HotelBeds
                              </th>
                              <th
                                width="30%"
                                className="redapple sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "337.2px" }}
                              >
                                Redapple
                              </th>
                              <th
                                width="30%"
                                className="MIKI sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "337.2px" }}
                              >
                                Miki
                              </th>
                              <th
                                width="30%"
                                className="restel sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "337.2px" }}
                              >
                                restel
                              </th>
                              <th
                                width="30%"
                                className="travco sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "337.2px" }}
                              >
                                Travco
                              </th>
                              <th
                                width="30%"
                                className="whitesands sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "337.2px" }}
                              >
                                whitesands
                              </th>
                              <th
                                width="30%"
                                className="dhisco sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "337.2px" }}
                              >
                                Dhisco
                              </th>
                              <th
                                width="30%"
                                className="tboholidays sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "338px" }}
                              >
                                TBOHolidays
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr
                              role="row"
                              className="odd"
                              style={{ display: "table-row" }}
                            >
                              <td width="30%" className="dotw">
                                <input
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  name="btn1"
                                  defaultValue="Map"
                                  onclick="setClick(1);call_for_map_d('dotw',document.getElementById('sel_dotw_hotel'),true);"
                                />
                              </td>
                              <td width="30%" className="expedia">
                                <input
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  name="btn1"
                                  defaultValue="Map"
                                  onclick="setClick(1);call_for_map_expedia('expedia',document.getElementById('sel_expedia_hotel'),true);"
                                />
                              </td>
                              <td width="30%" className="hotelbeds">
                                <input
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  name="btn1"
                                  defaultValue="Map"
                                  onclick="setClick(1);call_for_map_h('hotelbeds',document.getElementById('sel_hotelbeds_hotel'),true);"
                                />
                              </td>
                              <td width="30%" className="redapple">
                                <input
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  name="btn1"
                                  defaultValue="Map"
                                  onclick="setClick(1);call_for_map_redapple('redapple',document.getElementById('sel_redapple_hotel'),true);"
                                />
                              </td>
                              <td width="30%" className="MIKI">
                                <input
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  name="btn1"
                                  defaultValue="Map"
                                  onclick="setClick(1);call_for_map_m('miki',document.getElementById('sel_miki_hotel'),true);"
                                />
                              </td>
                              <td width="30%" className="restel">
                                <input
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  name="btn1"
                                  defaultValue="Map"
                                  onclick="setClick(1);call_for_map_restel('restel',document.getElementById('sel_restel_hotel'),true);"
                                />
                              </td>
                              <td width="30%" className="travco">
                                <input
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  name="btn1"
                                  defaultValue="Map"
                                  onclick="setClick(1);call_for_map_t('travco',document.getElementById('sel_travco_hotel'),true);"
                                />
                              </td>
                              <td width="30%" className="whitesands">
                                <input
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  name="btn1"
                                  defaultValue="Map"
                                  onclick="setClick(1);call_for_map_whitesands('whitesands',document.getElementById('sel_whitesands_hotel'),true);"
                                />
                              </td>
                              <td width="30%" className="dhisco">
                                <input
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  name="btn1"
                                  defaultValue="Map"
                                  onclick="setClick(1);call_for_map_dhisco('dhisco',document.getElementById('sel_dhisco_hotel'),true);"
                                />
                              </td>
                              <td width="30%" className="tboholidays">
                                <input
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  name="btn1"
                                  defaultValue="Map"
                                  onclick="setClick(1);call_for_map_tboholidays('tboholidays',document.getElementById('sel_tboholidays_hotel'),true);"
                                />
                              </td>
                            </tr>
                            <tr
                              role="row"
                              className="even"
                              style={{ display: "none" }}
                            >
                              <td
                                width="30%"
                                className="dotw mapped_ids"
                                id="dotw_mapped_ids"
                              />
                              <td
                                width="30%"
                                className="expedia mapped_ids"
                                id="expedia_mapped_ids"
                              />
                              <td
                                width="30%"
                                className="hotelbeds mapped_ids"
                                id="hotelbeds_mapped_ids"
                              ></td>
                              <td
                                width="30%"
                                className="redapple mapped_ids"
                                id="redapple_mapped_ids"
                              ></td>
                              <td
                                className="miki mapped_ids"
                                id="miki_mapped_ids"
                              />
                              <td
                                width="30%"
                                className="restel mapped_ids"
                                id="restel_mapped_ids"
                              />
                              <td
                                width="30%"
                                className="travco mapped_ids"
                                id="travco_mapped_ids"
                              />
                              <td
                                width="30%"
                                className="whitesands mapped_ids"
                                id="whitesands_mapped_ids"
                              />
                              <td
                                width="30%"
                                className="dhisco mapped_ids"
                                id="dhisco_mapped_ids"
                              />
                              <td
                                width="30%"
                                className="tboholidays mapped_ids"
                                id="tboholidays_mapped_ids"
                              />
                            </tr>
                            <tr role="row" className="odd">
                              <td width="30%" valign="top">
                                <select
                                  name="sel_dotw_hotel"
                                  id="sel_dotw_hotel"
                                  multiple
                                  size={10}
                                >
                                  <option value>DOTW Hotels</option>
                                </select>
                                <div id="1_dotw_hotel" />
                              </td>
                              <td width="30%">
                                <select
                                  name="sel_expedia_hotel"
                                  id="sel_expedia_hotel"
                                  multiple
                                  size={10}
                                >
                                  <option value>EXPEDIA Hotels</option>
                                </select>
                                <div id="1_expedia_hotel" />
                              </td>
                              <td width="30%" valign="top">
                                <select
                                  name="sel_hotelbeds_hotel"
                                  id="sel_hotelbeds_hotel"
                                  multiple
                                  size={10}
                                >
                                  <option value>Hotelbeds Hotels</option>
                                </select>
                                <div id="1_hb_hotel" />
                              </td>
                              <td width="30%">
                                <select
                                  name="sel_redapple_hotel"
                                  id="sel_redapple_hotel"
                                  multiple
                                  size={10}
                                >
                                  <option value>Redapple Hotels</option>
                                </select>
                                <div id="1_redapple_hotel" />
                              </td>
                              <td width="30%" valign="top">
                                <select
                                  name="sel_miki_hotel"
                                  id="sel_miki_hotel"
                                  multiple
                                  size={10}
                                >
                                  <option value>Miki Hotels</option>
                                </select>
                                <div id="1_miki_hotel" />
                              </td>
                              <td width="30%">
                                <select
                                  name="sel_restel_hotel"
                                  id="sel_restel_hotel"
                                  multiple
                                  size={10}
                                >
                                  <option value>Restel Hotels</option>
                                </select>
                                <div id="1_restel_hotel" />
                              </td>
                              <td width="30%">
                                <select
                                  name="sel_travco_hotel"
                                  id="sel_travco_hotel"
                                  multiple
                                  size={10}
                                >
                                  <option value>Travco Hotels</option>
                                </select>
                                <div id="1_travco_hotel" />
                              </td>
                              <td width="30%">
                                <select
                                  name="sel_whitesands_hotel"
                                  id="sel_whitesands_hotel"
                                  multiple
                                  size={10}
                                >
                                  <option value>WHITESANDS Hotels</option>
                                </select>
                                <div id="1_whitesands_hotel" />
                              </td>
                              <td width="30%">
                                <select
                                  name="sel_dhisco_hotel"
                                  id="sel_dhisco_hotel"
                                  multiple
                                  size={10}
                                >
                                  <option value>Dhisco Hotels </option>
                                  <option label value />
                                  <option
                                    label="Ammes Studios"
                                    value="ZM;31687A6D"
                                  >
                                    Ammes Studios
                                  </option>
                                  <option
                                    label="Austria Trend Congress Hotel - NON REFUNDABLE ROOM"
                                    value="JK;49520"
                                  >
                                    Austria Trend Congress Hotel - NON
                                    REFUNDABLE ROOM
                                  </option>
                                  <option
                                    label="Emerald Suites at S. Las Vegas Blvd"
                                    value="ZM;6B666671"
                                  >
                                    Emerald Suites at S. Las Vegas Blvd
                                  </option>
                                  <option
                                    label="Habitat Zona Media"
                                    value="ZM;34763946"
                                  >
                                    Habitat Zona Media
                                  </option>
                                  <option
                                    label="Holiday Inn Resort CHANGBAISHAN"
                                    value="HI;NBSHI"
                                  >
                                    Holiday Inn Resort CHANGBAISHAN
                                  </option>
                                  <option
                                    label="Kabanari Bay Hotel"
                                    value="ZM;6A596D55"
                                  >
                                    Kabanari Bay Hotel
                                  </option>
                                  <option
                                    label="Kunduchi Beach Hotel & Resort"
                                    value="OK;17495"
                                  >
                                    Kunduchi Beach Hotel &amp; Resort
                                  </option>
                                  <option
                                    label="Pontiac Hotel"
                                    value="OK;96765"
                                  >
                                    Pontiac Hotel
                                  </option>
                                  <option
                                    label="Rex Hotel Belgrade - NON REFUNDABLE ROOM"
                                    value="JK;49073"
                                  >
                                    Rex Hotel Belgrade - NON REFUNDABLE ROOM
                                  </option>
                                  <option
                                    label="Royal Plaza Hotel Hong Kong - NON REFUNDABLE ROOM"
                                    value="JK;56596"
                                  >
                                    Royal Plaza Hotel Hong Kong - NON REFUNDABLE
                                    ROOM
                                  </option>
                                </select>
                                <div id="1_dhisco_hotel" />
                              </td>
                              <td width="30%">
                                <select
                                  name="sel_tboholidays_hotel"
                                  id="sel_tboholidays_hotel"
                                  multiple
                                  size={10}
                                >
                                  <option value>TBOHolidays Hotels </option>
                                </select>
                                <div id="1_tboholidays_hotel" />
                              </td>
                            </tr>
                            <tr
                              className="textLeft even"
                              role="row"
                              style={{ display: "none" }}
                            >
                              <td>
                                <div id="dotw_hotel" />
                              </td>
                              <td>
                                <div id="expedia_hotel" />
                              </td>
                              <td>
                                <div id="hb_hotel" />
                              </td>
                              <td>
                                <div id="redapple_hotel" />
                              </td>
                              <td>
                                <div id="miki_hotel" />
                              </td>
                              <td>
                                <div id="restel_hotel" />
                              </td>
                              <td>
                                <div id="travco_hotel" />
                              </td>
                              <td>
                                <div id="whitesands_hotel" />
                              </td>
                              <td>
                                <div id="dhisco_hotel" />
                              </td>
                              <td>
                                <div id="tboholidays_hotel" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n            .input-group span.input-group-addon {\n                margin-left: 242px;\n            }\n            td select{\n                width: 360px;\n                height: 180px;\n            }\n        ",
            }}
          />
        </div>
      </div>
    </>
  );
};
export default MappinghotelMap;
