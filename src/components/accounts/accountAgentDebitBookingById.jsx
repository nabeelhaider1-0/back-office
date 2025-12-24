import Header2 from "../header2/header2";


const AccountsAgentDebitBookingId = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="DEBIT NOTE BY BOOKING ID" />


        <form>
          <input
            type="hidden"
            name="action"
            defaultValue="receipts_by_booking_id"
          />
          <input type="hidden" name="page" defaultValue="receipt" />
          <div className="row">
            <div className="panel-body">
              <div className="form-group row">
                <div className="form-group col-md-3">
                  <label>Booking Id</label>
                  <input
                    className="form-control form-control-sm required test123"
                    type="text"
                    name="txt_receipt_booking_id"
                    size={29}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-3">
                  <button
                    type="submit"
                    name="btn_submit"
                    className="btn btn-dark btn-sm"
                    value="search"
                  >
                    <i className="fa fa-search" aria-hidden="true" />
                    &nbsp;Search
                  </button>
                </div>
              </div>
            </div>


            {/* End */}
          </div>
        </form>
      </div>
    </>
  );
};
export default AccountsAgentDebitBookingId;
