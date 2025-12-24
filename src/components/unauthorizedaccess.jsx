import { useEffect } from "react";

const UnauthorizedAccess = ({setShowHeaderAndMenuBar }) => {
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
    return (
        <div>
            <div id="wrapper content-pad" style={{ minHeight: "521px" }} >
                <form>
                    <div  className="small-header">
                        <div  className="hpanel" />
                    </div>
                    <div  className="content">
                        <div  className="text-center hpanel">
                            <div  className="panel-body h-200" style={{ padding: "3em 0em 3em 0em" }}>
                                <div className="adminlock">                                   
                                    <i  className="fa fa-lock-alt"></i>
                                </div>
                                <h4>
                                    <div  className="restrictMsg">
                                      Unauthorized Access
                                    </div>
                                </h4>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UnauthorizedAccess