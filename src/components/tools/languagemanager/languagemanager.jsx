import { fileOptions, folderOptions } from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";

const Langaugemanager = () => {
  return (
    <>
      <Header2 title="LANGUAGE MANAGEMENT TOOL" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div class="panel-body">
            <div class="row">
              <div class="col-sm-3">
                <div class="form-group">
                  <label for="getfolder">Select Language</label>
                  <MultiSelect
                    options={folderOptions}
                    isSearchable
                    placeholder="Select Name"
                    className="custom-select"
                    noOptionsMessage={() => "No Name Found"}
                  />
                </div>
              </div>

              <div class="col-sm-3">
                <div class="form-group">
                  <label for="getfolder_file">Select Language File</label>
                  <MultiSelect
                    options={fileOptions}
                    isSearchable
                    placeholder="Select File"
                    className="custom-select"
                    noOptionsMessage={() => "No File Found"}
                  />
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <div class="col-sm-3">
                    <label for="addnewlang">&nbsp;</label>
                    <br />
                    <span
                      data-bs-toggle="modal"
                      data-bs-target="#addnewlanguage_box"
                      class="form-group btn btnPadd btn-dark btn-sm"
                    >
                      Add New Language
                    </span>
                  </div>
                  <div class="col-sm-3">
                    <label for="removenewlang">&nbsp;</label>
                    <span
                      id="removenewlang"
                      style={{ display: "none" }}
                      class="form-group btn btnPadd btn-outline-secondary btn-sm"
                    >
                      Remove Language
                    </span>
                  </div>
                  <div class="col-sm-3">
                    <label for="enabledisablebtn">&nbsp;</label>
                    <span id="showbutton_ed"></span>
                  </div>
                </div>
              </div>

              <div id="preloading" style={{ display: "none" }}>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-success progress-bar-striped active"
                    role="progressbar"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "100%" }}
                  >
                    <span class="sr-only">100% Complete (success)</span>
                  </div>
                </div>
              </div>

              <div
                class="col-sm-12 setContentarea"
                id="contentarea_sh"
                style={{ display: "none" }}
              >
                <div class="form-group">
                  <label for="showContent">
                    You have selected{" "}
                    <span
                      class="label label-success"
                      id="setSelectedLang"
                    ></span>
                    language configuration file
                  </label>
                  <textarea id="showContent" class="form-control"></textarea>
                </div>
                <span class="btn btn-success" id="savedata">
                  Save
                </span>
                <span class="btn btn-success" id="convertlang">
                  Translate
                </span>
              </div>
            </div>
          </div>
        </form>
        <div
          class="modal fade"
          id="addnewlanguage_box"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" style={{ width: "500px" }}>
            <div class="modal-content">
              <div class="color-line"></div>
              <div class="modal-body">
                <span
                  class="fa fa-times-circle fa-4 closeBtn"
                  data-bs-dismiss="modal"
                ></span>
                <div class="panel-heading">Add New Language</div>
                <div class="panel-body">
                  <div class="form-group">
                    <label for="getfolder">Add New Language</label>
                    {/* <!--input type="text" value="" class="form-control" id="newLanguage_txt" /--> */}
                    <select
                      id="selectlang_addnew"
                      class="selectpicker show-menu-arrow form-control form-control-sm bs-select-hidden"
                      data-live-search="true"
                    ></select>
                  </div>
                  <span class="btn btn-success btn-sm mt-2" id="addnewLang">
                    Add Language
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="checklang_box"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" style={{ width: "500px" }}>
            <div class="modal-content">
              <div class="color-line"></div>
              <div class="modal-body">
                <span
                  class="fa fa-times-circle fa-4 closeBtn"
                  data-dismiss="modal"
                ></span>
                <div class="panel-heading">Select Language</div>
                <div class="panel-body">
                  <div class="form-group">
                    <select
                      id="selectlang"
                      class="selectpicker show-menu-arrow form-control bs-select-hidden"
                      data-live-search="true"
                    ></select>
                    <div class="btn-group bootstrap-select show-menu-arrow form-control">
                      <button
                        type="button"
                        class="btn dropdown-toggle btn-default"
                        data-toggle="dropdown"
                        data-id="selectlang"
                        title="Nothing selected"
                      >
                        <span class="filter-option pull-left">
                          Nothing selected
                        </span>
                        &nbsp;<span class="caret"></span>
                      </button>
                      <div class="dropdown-menu open">
                        <div class="bs-searchbox">
                          <input
                            type="text"
                            class="form-control"
                            autocomplete="off"
                          />
                        </div>
                        <ul class="dropdown-menu inner" role="menu"></ul>
                      </div>
                    </div>
                  </div>
                  <span class="btn btn-success" id="sellngbtn">
                    Confirm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Langaugemanager;
