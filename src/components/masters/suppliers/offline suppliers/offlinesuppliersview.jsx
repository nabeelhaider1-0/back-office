import Constants from "../../../../constants/routes";
import Header2 from "../../../header2/header2";

const MastersSuppliersOfflineSupplierView = () => {
  return (
    <>
      <Header2
        title="SUPPLIER DETAILS"
        linkText1="List Offline Suppliers"
        linkText2="View Offline Supplier"
        link1={Constants.URLConstants.MASTERSSUPPLIERSOFFLINESUPPLIERSSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <table
            align="center"
            width="50%"
            cellSpacing={1}
            className="Tahoma_11black"
            border={0}
          >
            <tbody className="bg-white">
              <tr className="phps_header">
                <td colSpan={3}>
                  »&nbsp;<b>SUPPLIER DETAILS</b>&nbsp;:
                </td>
              </tr>
              <tr className="phps_row_0">
                <td align="right" width="30%">
                  &nbsp;&nbsp;<strong>Supplier Username : </strong>
                </td>
                <td width="75%">Travel_Qtech</td>
              </tr>
              <tr className="phps_row_1">
                <td align="right" width="30%">
                  &nbsp;&nbsp;<strong>Supplier Name : </strong>
                </td>
                <td width="75%">TravelQtech</td>
              </tr>
              <tr className="phps_row_0">
                <td align="right">
                  &nbsp;&nbsp;<strong>Contact Person Name 1: </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td />
              </tr>
              <tr className="phps_row_1">
                <td align="right">
                  &nbsp;&nbsp;<strong>Contact Person Name 2: </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td />
              </tr>
              <tr className="phps_row_0">
                <td align="right">
                  &nbsp;&nbsp;&nbsp;&nbsp;<strong>Opening Balace : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>0.000</td>
              </tr>
              <tr className="phps_row_1">
                <td align="right">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <strong>Marked Up Percentage : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>0.000&nbsp;%</td>
              </tr>
              <tr className="phps_row_0">
                <td align="right">
                  &nbsp;&nbsp;&nbsp;&nbsp;<strong>Currency : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>INR</td>
              </tr>
              <tr className="phps_row_1">
                <td align="right">
                  &nbsp;&nbsp;<strong>Country : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>India</td>
              </tr>
              <tr className="phps_row_0">
                <td align="right">
                  &nbsp;&nbsp;<strong>City : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>Mumbai</td>
              </tr>
              <tr className="phps_row_1">
                <td align="right">
                  &nbsp;&nbsp;&nbsp;&nbsp;<strong>Phone Number : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>022234567</td>
              </tr>
              <tr className="phps_row_0">
                <td align="right">
                  &nbsp;&nbsp;<strong>Mobile Number : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td />
              </tr>
              <tr className="phps_row_1">
                <td align="right">
                  &nbsp;&nbsp;&nbsp;&nbsp;<strong>Fax Number : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td />
              </tr>
              <tr className="phps_row_0">
                <td align="right">
                  &nbsp;&nbsp;&nbsp;&nbsp;<strong>Address : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>India,Mumbai</td>
              </tr>
              <tr className="phps_row_1">
                <td align="right">
                  &nbsp;&nbsp;<strong>Email : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>nisarga.khandare@qtechsoftware.com</td>
              </tr>
              {/*<tr class=phps_row_1>
              <td align=right>&nbsp;&nbsp;Email 1 : </td>
              <td></td>
          </tr>
          <tr class=phps_row_0>
              <td align=right>&nbsp;&nbsp;Account Email : </td>
  
              <td></td>
          </tr>*/}
              <tr className="phps_row_0">
                <td align="right">
                  &nbsp;&nbsp;<strong>Reservation Email : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>rohit.sakpota@qtechsoftware.com</td>
              </tr>
              <tr className="phps_row_1">
                <td align="right">
                  &nbsp;&nbsp;<strong>Cancellation Email : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>nisarga.khandare@qtechsoftware.com</td>
              </tr>
              {/*<tr class=phps_row_1>
              <td align=right>&nbsp;&nbsp;Refund Email : </td>
              <td></td>
          </tr>*/}
              <tr className="phps_row_0">
                <td align="right">
                  &nbsp;&nbsp;<strong>Modification Email : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td />
              </tr>
              <tr className="phps_row_1">
                <td align="right">
                  &nbsp;&nbsp;<strong>Technical Email : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td />
              </tr>
              {/*<tr class=phps_row_0>
              <td align=right>&nbsp;&nbsp;Cancellation Failed Email : </td>
              <td></td>
          </tr>*/}
              <tr className="phps_row_0">
                <td align="right">
                  &nbsp;&nbsp;<strong>Time Zone : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>GMT +5:30 Hours (12:27 PM)</td>
              </tr>
              <tr className="phps_row_1">
                <td align="right">
                  &nbsp;&nbsp;<strong>Remarks : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td />
              </tr>
              <tr className="phps_row_0">
                <td align="right">
                  &nbsp;&nbsp;<strong>Commissionable : </strong>
                </td>
                {/*<td>&nbsp;:&nbsp;</td>*/}
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};
export default MastersSuppliersOfflineSupplierView;
