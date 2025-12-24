import React, { useEffect } from 'react';

const ReportsOperationsReminder = ({ setShowHeaderAndMenuBar }) => {


  // Update the state to hide Header and MenuBar
  useEffect(() => {
    setShowHeaderAndMenuBar(false);
    // Cleanup function to reset the state when the component unmounts
    return () => setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);





    return (
        <>
          
            <div class="container-fluid pt-0 p-4" id="content-pad">
            <div>
  <h1>Not Found</h1>
  <p>The requested URL was not found on this server.</p>
  <p>Additionally, a 404 Not Found
    error was encountered while trying to use an ErrorDocument to handle the request.</p>
</div>


          </div>
        </>
    );
};
export default ReportsOperationsReminder;
