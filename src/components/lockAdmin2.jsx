const AdministrationLock2 = ({ title }) => {
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
                                    <i  className="fa fa-unlock-alt"></i>
                                </div>
                                <h4>
                                    <div  className="restrictMsg">
                                    You do not have access to this section. Please contact your system administrator.
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
export default AdministrationLock2