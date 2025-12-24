import Constants from "../../constants/routes";
import Header2 from "../header2/header2";

const MessagesImportCSV = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="IMPORT CSV IN QTECH PROFILE"
          linkText1="List Subscriber Group"
          linkText2="Import CSV"
          link1={Constants.URLConstants.MESSAGESMASSMAILSUBSCRIBERGROUPSEARCH}
        />

        <form
          action="subscriber_list.php"
          method="post"
          name="frm_import_csv"
          encType="multipart/form-data"
        >
          <input type="hidden" name="sub_list_id" defaultValue={1} />
          <input type="hidden" name="action" defaultValue="save_csv" />
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-12"></div>
              <div className="col-md-12 form-group">
                <label>Upload CSV File</label>
                <span className="uniqFile input-group">
                  <span
                    className="input-group-addon fa fa-upload myInputFile"
                    aria-hidden="true"
                  >
                    <input
                      name="csv_file"
                      id="csv_file"
                      type="file"
                      className="test123"
                    />
                  </span>
                </span>
              </div>
            </div>
            <br />
            <div className=" col-md-12">
              <button
                className="btn btn-dark btn-sm form-group"
                type="button"
                name="add"
                value="SUBMIT"
                onclick="return validate_csv(document.forms['frm_import_csv']);"
              >
                <i className="fa fa-floppy-o" aria-hidden="true" />
                &nbsp;Save
              </button>
            </div>
          </div>
        </form>
        <div className="panel-footer form-group mt-2">
          Please Upload the csv file format similar to sample csv file &nbsp;
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onclick="window.open('newsletter/sample_csv.csv')"
            target="_blank"
          >
            <i className="fa fa-download" aria-hidden="true" />
            &nbsp;Sample CSV
          </button>
        </div>
      </div>
    </>
  );
};
export default MessagesImportCSV;
