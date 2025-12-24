import Constants from "../../constants/routes";
import Header2 from "../header2/header2";

const MessagesMassMailSubscribersGroupView = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SUBSCRIBER GROUP DETAILS"
          linkText1="List Subscriber Group"
          linkText2="View Subscriber Group"
          link1={Constants.URLConstants.MESSAGESMASSMAILSUBSCRIBERGROUPSEARCH}
        />

        {/* First Row*/}
        <div
          className="panel-body"
          style={{
            backgroundColor: "#FF5015",
            paddingBottom: "1px",
            paddingTop: "4px",
          }}
        >
          <div className="row">
            <div className="col-md-3">
              <h5
                style={{ color: "white", fontSize: "15px", marginLeft: "20px" }}
              >
                Subscriber List Name : Qtech Profile
              </h5>
            </div>
          </div>
        </div>
        <form
          name="list_booking_search"
          method="GET"
          action
          id="list_booking_search"
          onsubmit="check_code();"
        >
          <input
            type="hidden"
            name="action_name"
            id="action_name"
            defaultValue
          />
          <div className="panel-body">
            <div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>From Name</label>
                  <div>Greetings</div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">Reply-to Email</label>
                  <div>nida.ansari@qtechsoftware.com</div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="form-group col-md-12 actionlink">
                  <a href="subscriber_list.php?action=edit&id=1&name_search=&from_name_search=&reply_to_search=">
                    <button type="button" className="btn btn-dark btn-sm">
                      <i
                        className="fa fa-pencil-square-o"
                        style={{ color: "#fff !important" }}
                        aria-hidden="true"
                      />
                      &nbsp;Edit
                    </button>{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* End */}

        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n.fa.fa-pencil-square-o {\n    color: var(--color-white) !important;\n}\n",
          }}
        />
      </div>
    </>
  );
};
export default MessagesMassMailSubscribersGroupView;
