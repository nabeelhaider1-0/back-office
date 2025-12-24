import ApiRoutes from "../../../constants/ApiRoutes";
import Header2 from "../../header2/header2";
import { useState } from "react";

const MasterPaymentTotalLimit = () => {
  const [formData, setFormData] = useState({
    todayUsages: "",
    totalLimit: "200000.00",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //   try {

    //   const response = await postDATA(formData,ApiRoutes.PAYMENT_GATEWAYS.GATEWAY);

    //     if (response.data.statusCode === 200) {

    //       SuccessApiToast( "Payment Gateway Added Successfully");

    //       navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
    //     }
    //   } catch (error) {
    //     ErrorApiAlert('Error Adding Payment Gateway');
    //     //  console.error(error)
    //   }
  };

  return (
    <>
      <Header2 title="TOTAL LIMIT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit} id="ttlimit">
          <input type="hidden" name="action" defaultValue="add" />
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Today Usages</label>
                <div>81329.7 USD</div>
              </div>
              <div className="form-group col-md-3">
                <label>Total Limit (USD)</label>
                <input
                  className="required form-control form-control-sm"
                  type="text"
                  name="totalLimit"
                  id="totalLimit"
                  value={formData.totalLimit}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <br />
            <div className="row mt-4">
              <div className="col-md-12 form-group">
                <button
                  type="submit"
                  className="btn btn-dark btn-sm "
                  name="add"
                  value="SUBMIT"
                >
                  <i className="fa fa-floppy-o" />
                  &nbsp;Add
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm mx-1"
                  type="reset"
                  id="reset"
                  name="reset"
                  value="reset"
                  data
                >
                  <i className="fa fa-repeat" /> &nbsp;Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default MasterPaymentTotalLimit;
