import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Error404 = ({ setShowHeaderAndMenuBar }) => {
  // Update the state to hide Header and MenuBar
  useEffect(() => {
    // Only hide Header and MenuBar if they are currently shown
    if (setShowHeaderAndMenuBar) {
      setShowHeaderAndMenuBar(false);
    }
    // Cleanup function to reset the state when the component unmounts
    return () => {
      setShowHeaderAndMenuBar(true);
    };
  }, [setShowHeaderAndMenuBar]);

  const location = useLocation();
  const errorStatus = location.state?.statusCode || "404";
  const errorMessage =
    location.state?.errorMessage || "Server is under Maintenance";
  return (
    <div>
      <section className="errorWrapper">
        <div className="errorcontainer px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="errorstatus">{errorStatus}</h2>
            <p className="errorstatusPara1">
              Sorry, we couldn't find this page.
            </p>
            <p className="errorstatusPara2">{errorMessage}</p>
            {/* <Link
              rel="noopener noreferrer"
              href="#"
              className="errorBackToHome"
            >
              Back to homepage
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error404;
