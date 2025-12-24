import Header2 from "../header2/header2"

const StaffAccess = () => {
    return (
        <div>
            <Header2 title="ADD MENU" />
            <div  className="container-fluid pt-0 p-4" id="content-pad">
                <form>
                    <div  className="row mt-2">
                        <div  className="col-md-3 form-group phps_row_1">
                            <label for="exampleInputEmail1">Parent</label>
                            <select name="sel_parent" id="sel_parent"
                                 className="selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden" data-live-search="true">
                                <option value="0">-Select Parent-</option>
                                <option label="BOOKINGS" value="1">BOOKINGS</option>
                                <option label="CUSTOMERS" value="4">CUSTOMERS</option>
                                <option label="ACCOUNTS" value="29">ACCOUNTS</option>
                                <option label="REPORTS" value="38">REPORTS</option>
                                <option label="MESSAGES" value="124">MESSAGES</option>
                                <option label="CONTRACTS" value="306">CONTRACTS</option>
                                <option label="SETTINGS" value="330">SETTINGS</option>
                                <option label="TOOLS" value="355">TOOLS</option>
                                <option label="MASTERS" value="393">MASTERS</option>
                                <option label="Suppliers" value="796">Suppliers</option>
                                <option label="Visa" value="806">Visa</option>
                                <option label="Flight" value="856">Flight</option>
                                <option label="LODGE CARD" value="886">LODGE CARD</option>

                            </select>
                        </div>
                        <div  className="form-group phps_row_1 col-md-3">
                            <label>Page Title</label>
                            <input type="text" name="page_title" id="page_title"  className="required form-control form-control-sm"/>
                        </div>
                        <div  className="form-group col-md-3">
                            <label>Page Link</label>
                            <input type="text"  className="form-control form-control-sm" name="name"/>
                        </div>
                        <div  className="form-group col-md-3">
                            <label>Sorting</label>
                            <input type="text"  className="form-control form-control-sm" name="name"/>
                        </div>
                    </div>


                    <div  className="row mt-4 mb-4">
                        <div  className="form-group col-md-2">
                            <button  className="btn btn-dark btn-sm"><i  className="fa fa-add"></i> Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default StaffAccess;