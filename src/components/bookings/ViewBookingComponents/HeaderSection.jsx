import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import LOGO from "../../../assets/images/ABt.jpg";

const HeaderSection = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  // Read external URL from env or fallback
  const escapraUrl =
    import.meta.env.VITE_REACT_APP_ESCAPRA_URL || "https://escapra.com";
  const handleClose = () => {
    navigate("/SearchBookings"); // ✅ Navigate to SearchBooking route
  };
  //  const handleLogoClick = () => {
  //   navigate('/'); // Open in new tab
  // };

  return (
    <div className="siteLogo">
      {/* ✅ Linkable logo */}
      <a href={"/Dashboard"}>
        <img
          src="https://escapra-assets.s3.eu-west-1.amazonaws.com/public/companylogoWhite.png"
          //src={LOGO}
          style={{ width: "100px" }}
          alt="Escapra Logo"
          title="Escapra"
        />
      </a>
      <div
        className="col-md-12 form-group noprint"
        style={{ marginTop: "-30px" }}
      >
        <div align="right" colSpan={2}>
          <button
            className="btn btn-dark btn-sm"
            type="button"
            id="printpagebutton"
            onClick={() => window.print()}
          >
            <i className="fa fa-print" /> Print
          </button>{" "}
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            id="closebutton"
            name="close"
            onClick={handleClose} // ✅ Use the navigate handler
          >
            <i className="fa fa-times" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
