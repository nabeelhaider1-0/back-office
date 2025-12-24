import MultiSelect from '../reactMultiSelect';
import Header2 from '../header2/header2';
import { assignBranchesToStaff, getAllBranches, getAllStaff } from '../../Apis/API';
import { useEffect, useState } from 'react';
import { Slide, toast } from 'react-toastify';





const StaffAssignBranches = () => {


  const [branches, setBranches] = useState([]);
  const [staffDetail, setStaffDetail] = useState(null);
  const [branchesApi, setBranchesApi] = useState([]);
  const [staffDetailApi, setStaffDetailApi] = useState(null);


  const getbranches = async () => {
    try {

      const response = await getAllBranches();

      if (response.data.statusCode === 200) {
        const branches = response.data.data || [];

        const options = branches.map((branch) => ({
          value: branch.uuid,
          label: branch.branchName,
        }));


       
        setBranches(options); // Set branches in the new state

        setStaffDetail({
          ...staffDetail,
          branchUuid: [], // Initialize with an empty array
        });

      }

    } catch (error) {
      // console.error(error);
    }

  };

  useEffect(() => {
    getbranches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);






  const getStaff = async () => {
    try {

      const response = await getAllStaff();

      if (response.data.statusCode === 200) {
        const staffData = response && response.data.data ? response.data.data : [];

        // Extract staff information (UUID and username)
        const staffInfoArray = staffData.map((staff) => ({
          value: staff.uuid,
          label: staff.userName,
        }));
        
        // Set staff information in the new state
        setStaffDetail(staffInfoArray);



      }

      // Handle successful response, e.g., set user state, redirect, etc.
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    getStaff();
  }, []);







  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!staffDetailApi || branchesApi.length === 0) {
      toast.error("User and branches must be selected.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }

    try {

      // Extract UUID from the selected staff
      const staffUuid = staffDetailApi.value;
      const branchUuids = branchesApi.map((branch) => branch.value);


      // Call the API to assign branches to staff
   await assignBranchesToStaff(staffUuid, branchUuids);

      // Log the response to the console


      toast.success("Branches assigned successfully:", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      // Clear the selected branches after successful assignment
      // setBranches([]);
      setBranchesApi([]);
      return;


    } catch (error) {
      // Log the error to the console
     
      // Handle errors
      // Display a toast or alert indicating the error

    }
  };


  return (<>
    <Header2 title="ASSIGN BRANCHES" />
    <div className="container-fluid pt-0 p-4" id="content-pad">
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          {
            staffDetail !== null && (
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Select User</label>
                <MultiSelect
                  options={staffDetail}
                  isSearchable
                  placeholder="- Select User -"
                  className="custom-select required"
                  onChange={(selectedOptions) => setStaffDetailApi(selectedOptions)}
                />
              </div>
            )
          }
        </div>
        <div className="row mt-2">
          <div className="form-group col-md-4">
            <label htmlFor="exampleInputEmail1">Select Branches</label>
            <MultiSelect
              id="sel_branches"
              name="sel_branches[]"
              options={branches}
              isMulti
              className="custom-select required"
              onChange={(selectedOptions) => setBranchesApi(selectedOptions)}
            />
          </div>
          <div className="row mt-3">
            <div className="col-md-12 form-group mb-4 phps_row_0">
              <button type="submit" className="btn btn-dark btn-sm"><i className="fa fa-check"></i> Assign Branches</button>
            </div>
          </div>
        </div>

      </form>
    </div>
  </>
  )
}
export default StaffAssignBranches;