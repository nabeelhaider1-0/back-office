import Constants from "../../../constants/routes"
import Header2 from "../../header2/header2"



const   ViewCardPayment = () => {


     return(
        <>
        <Header2 title="VIEW MAPPING LODGE CARD " linkText1="View Lodge Card " linkText2="Edit Lodge Card" link2={Constants.URLConstants.EDITCARD}/>
        <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
            <div class="panel-body">
                <div class="row">
               
                        <div class="form-group col-md-3">
                            <label>Branch</label>
                            <div>
                                Mumbai Branch
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            <label>Agent</label>
                            <div>
                                Vartak Holidazzle [CD0195-rohan] [rohan-vartak]<br/>

                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            <label>Mapped Status</label>
                            <div>
                                <span style={{color : "#2b860"}}>Active</span>
                            </div>
                        </div>

                
                </div>
                <br/>

                <div class="row">
                   
                        <div class="form-group col-md-3">
                            <label>Services</label>
                            <div>
                                Flight<br/>

                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            <label>Suppliers</label>
                            <div>
                                Sabre Flight<br/>
                            </div>
                        </div>
                    </div>
        
                <br/>
                <div class="row">
                
                        <div class="form-group col-md-3">
                            <label>Mapped Lodge Cards</label>
                            <div>
                                Master Card (xxxx-xxxx-xxxx-0007)<br/>
                                American Express (xxx-xxxx-xxxx-4564)<br/>
                                Jcb Card (xxxx-xxxx-xxxx-0007)<br/>
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <label>Cards Status</label>
                            <div>
                                <span style={{color : "#2b860"}}>Active</span>
                                <br/>
                                <span style={{color : "#2b860"}}>Active</span>
                                <br/>
                                <span style={{color : "#2b860"}}>Active</span>
                                <br/>
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <label>Toekn Status</label>
                            <div>
                                <span style={{color : "#2b860"}}>Valid</span>
                                <br/>
                                <span style={{color : "#2b860"}}>Valid</span>
                                <br/>
                                <span style={{color : "#2b860"}}>Valid</span>
                                <br/>
                            </div>
                        </div>
                    </div>
              
                <br/>


            </div>



        </form>
        </div>






        </>
     )
}
export default ViewCardPayment