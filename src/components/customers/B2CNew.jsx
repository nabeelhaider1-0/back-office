/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import Header2 from "../header2/header2";

const B2CNew = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="ADD NEW B2C" linkText1=" Create New B2C" />

        <form>
          <div className="row mt-4">
            <div className="form-group col-md-3">
              <label>Name</label>
              <input
                type="text"
                name="Name"
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Email</label>
              <input
                type="email"
                name="Email"
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3 mt-4">
              <label>Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                className="form-control form-control-sm"
              />
            </div>
            <div className="form-group col-md-3 mt-4">
              <label>Adress</label>
              <input
                type="text"
                name="Address"
                className="form-control form-control-sm required"
                required
              />
            </div>
          </div>
          <div className="form-group col-md-2 mt-4 mb-2">
            <button className="btn btn-dark btn-sm">
              <i className="fa-solid fa-floppy-disk" /> Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default B2CNew;
