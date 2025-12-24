import Constants from "../../constants/routes";
import Header2 from "../header2/header2";



const MessagesMassMailSubscribersView = () => {



  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="SUBSCRIBER DETAILS" linkText1="List Subscriber" linkText2="View Subscriber" link1={Constants.URLConstants.MESSAGESMASSMAILSUBSCRIBERSEARCH} />

        <form>
        <div className="panel-body">
  <div className="row">
    <div className="col-md-3 form-group">
      <label>Email</label><br />
      nida.ansari@qtechsoftware.com
    </div>
    <div className="col-md-3 form-group">
      <label>Name</label><br />
      Nida Ansari
    </div>
    <div className="col-md-3 form-group">
      <label>Agency Name</label><br />
      Qtech
    </div>
    <div className="col-md-3 form-group">
      <label>Country</label><br />
      India
    </div>
    <div className="col-md-3 form-group">
      <label>City</label><br />
      Mumbai
    </div>
  </div>
  <br />
  <div className=" col-md-12">
    <a href="subscribers.php?action=edit&id=13&name_search=&agency_name_search=&email_search=&country_search=&city_search=&sub_list_search=" className="btn btn-dark btn-sm form-group">
      {/* <img src="images/edit.gif" border=0 alt="Edit" title="Edit"> */}
      <i className="fa fa-pencil-square-o" aria-hidden="true" />
      &nbsp;Update
    </a>
  </div>
</div>
<style dangerouslySetInnerHTML={{__html: "\n.fa.fa-pencil-square-o {\n    color: var(--color-white) !important;\n}\n" }} />

</form>



      </div>
    </>
  );
};
export default MessagesMassMailSubscribersView;