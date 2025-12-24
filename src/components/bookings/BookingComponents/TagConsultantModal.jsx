import React from "react";

const TagConsultantModal = () => {
  return (
    <div className="modal fade" id="myModal1" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content" style={{ width: "460px", marginTop: "175px" }}>
          <div className="color-linegreen"></div>
          <div className="modal-header">
            <div className="siteLogo">
              <img
                src="https://www.escapra.com/assets/companylogo-CI52UApw.png"
                alt=""
                style={{ width: "120px" }}
              />
            </div>
          </div>
          <div className="modal-body">
            <span className="fa fa-times-circle fa-4 closeBtn" data-bs-dismiss="modal" />
            <div className="modalForm" data-child="row" data-effect="fadeInUp">
              <div className="row">
                <div className="form-group col-md-12" style={{ width: "auto", position: "initial", float: "none" }}>
                  <div className="form-group">
                    <h4>Tag consultant to Booking</h4>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label>Booking Id :</label>
                      <div>TD000001</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label>Consultant: </label>
                      <select
                        className="selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                        name="sel_consultant"
                        id="sel_consultant"
                        data-container="body"
                        data-live-search="true"
                      >
                        <option value>- Select -</option>
                        <option label="1booking_wh" value="1booking_wh">1booking_wh</option>
                        <option label="Agent_test" value="agent_test">Agent_test</option>
                        <option label="Agent_Test_JV" value="agent_test_jv">Agent_Test_JV</option>
                        <option label="ankita" value="ankita">ankita</option>
                        <option label="asmita" value="asmita">asmita</option>
                        <option label="v4demo" value="v4demo">v4demo</option>
                        <option label="hemangi15" value="hemangi15">hemangi15</option>
                        <option label="demo_jb" value="demo_jb">demo_jb</option>
                        <option label="jb_2" value="jb_2">jb_2</option>
                        <option label="jv_demo" value="jv_demo">jv_demo</option>
                        <option label="jv_user1" value="jv_user1">jv_user1</option>
                        <option label="kishorek" value="kishorek">kishorek</option>
                        <option label="Madhuri" value="madhuri">Madhuri</option>
                        <option label="Milind_Qtech" value="milind_qtech">Milind_Qtech</option>
                        <option label="neeraj" value="neeraj">neeraj</option>
                        <option label="Paresh" value="paresh">Paresh</option>
                        <option label="otramsdemo2" value="otramsdemo2">otramsdemo2</option>
                        <option label="otramsdemo1" value="otramsdemo1">otramsdemo1</option>
                        <option label="otramsdemokw" value="otramsdemokw">otramsdemokw</option>
                        <option label="OtramsDemo11" value="otramsdemo11">OtramsDemo11</option>
                        <option label="otramsdemo9" value="otramsdemo9">otramsdemo9</option>
                        <option label="OtramsDemo23" value="otramsdemo23">OtramsDemo23</option>
                        <option label="hawallyparesh" value="hawallyparesh">hawallyparesh</option>
                        <option label="Moreshwar_Test" value="moreshwar_test">Moreshwar_Test</option>
                        <option label="Beta_Tdo" value="beta_tdo">Beta_Tdo</option>
                        <option label="user_test" value="user_test">user_test</option>
                        <option label="test_user" value="test_user">test_user</option>
                        <option label="test_user_JV" value="test_user_jv">test_user_JV</option>
                        <option label="Redapple" value="redapple">Redapple</option>
                        <option label="v3otramslive" value="v3otramslive">v3otramslive</option>
                        <option label="ryanrph" value="ryanrph">ryanrph</option>
                        <option label="shivraj" value="shivraj">shivraj</option>
                        <option label="simple" value="simple">simple</option>
                        <option label="simplee" value="simplee">simplee</option>
                        <option label="v3_otrams_wh" value="v3_otrams_wh">v3_otrams_wh</option>
                        <option label="Worldavenue" value="worldavenue">Worldavenue</option>
                        <option label="Saya_test" value="saya_test">Saya_test</option>
                        <option label="bi_testing" value="bi_testing">bi_testing</option>
                        <option label="Sujay_test" value="sujay_test">Sujay_test</option>
                        <option label="TEST_JV" value="test_jv">TEST_JV</option>
                        <option label="TEST_JV_C" value="test_jv_c">TEST_JV_C</option>
                        <option label="TEST_JV_A" value="test_jv_a">TEST_JV_A</option>
                        <option label="kishore" value="kishore">kishore</option>
                        <option label="otrams_syria" value="otrams_syria">otrams_syria</option>
                        <option label="swaralisales" value="swaralisales">swaralisales</option>
                        <option label="Swaralisalesdemo" value="swaralisalesdemo">Swaralisalesdemo</option>
                        <option label="v4,demo" value="v4,demo">v4,demo</option>
                        <option label="svss" value="svss">svss</option>
                        <option label="worldavennuejv" value="worldavennuejv">worldavennuejv</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-xs-12">
                      <input
                        type="button"
                        className="btn btn-dark btn-sm pull-left"
                        value="Tag It"
                        name="sbt1"
                        onclick="Javascriptreturn form_submit_consultant();"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagConsultantModal;