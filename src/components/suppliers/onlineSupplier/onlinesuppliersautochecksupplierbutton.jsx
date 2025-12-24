import Header2 from "../../header2/header2";

const SuppliersAutoCheckSupplierButton = () => {
  return (
    <>
      <Header2 title="AUTO CHECK SUPPLIER REPORT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 form-group">
                  <label style={{ fontWeight: 700 }}>Suppliers</label>
                </div>
                <div className="col-md-3 form-group">
                  <label style={{ fontWeight: 700 }}>Destination</label>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-3 form-group">
                  <p>hotelbeds,gta,whl,hilton</p>
                </div>
                <div className="col-md-3 form-group">
                  <p>Dubai</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 form-group">
                  <p>hotelbeds,whl</p>
                </div>
                <div className="col-md-3 form-group">
                  <p />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 form-group">
                  <p>expedia,perpax</p>
                </div>
                <div className="col-md-3 form-group">
                  <p>Bursa</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 form-group">
                  <p>whl</p>
                </div>
                <div className="col-md-3 form-group">
                  <p />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3 form-group">
                  <a
                    className="btn btn-dark btn-sm"
                    href="auto_check_suppliers.php?search=yes"
                  >
                    <i className="fa fa-search" />
                    Search
                  </a>
                </div>
              </div>
            </div>
          </form>
          <br />
          <form>
            <div className="dataTables_scroll">
              <div className="mesID"></div>
              <br />
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
                    <table id className="table   table-responsive">
                      <thead>
                        <tr>
                          <th>Check In</th>
                          <th>Checkout</th>
                          <th>Room</th>
                          <th>Country of Residence</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className=" text-center">
                          <td>01-01-1970</td>
                          <td>01-01-1970</td>
                          <td />
                          <td />
                        </tr>
                      </tbody>
                    </table>
                    <table id="search_sup" className="table   table-responsive">
                      <thead>
                        <tr>
                          <th>Supplier</th>
                          <th>Selected City</th>
                          <th>Supplier Status</th>
                          <th>Selected Country Of Residence</th>
                          <th>RealTime Count</th>
                          <th>Static Count</th>
                          <th>Agent Currency</th>
                          <th>Supplier Profile</th>
                          {/* <th>View Raw Log</th> */}
                        </tr>
                      </thead>
                      <tbody className="bg-white"></tbody>
                    </table>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SuppliersAutoCheckSupplierButton;
