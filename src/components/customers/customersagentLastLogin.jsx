import Header2 from "../header2/header2";

const CustomersAgentLastLogin = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="AGENT LAST LOGIN" />

        <form style={{ paddingBottom: "1px" }}>
          <div className="panel-body removeMargins">
            <div className="row">
              <div className="form-group col-md-12">
                <table
                  id="tableres"
                  className="table table-bordered   table-responsive dataTable no-footer"
                >
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>Agency Name </th>
                      <th>&nbsp;Agent Last Login</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className>
                      <td>&nbsp;Shiv Travels</td>
                      <td>&nbsp; 12-08-2023 &nbsp; 11:56:08</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CustomersAgentLastLogin;
