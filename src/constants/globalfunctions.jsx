import { Slide, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { delVisaRateMain } from "../state/action/visaActions";

// Extract only values from multiselected options
export function extractValuesFromArray(arr) {
  // Check if the array is empty or any item in the array doesn't have a 'value' key
  if (arr.length === 0 || arr.some((item) => !item.hasOwnProperty("value"))) {
    return false;
  }

  // If all items have a 'value' key, extract and return the values
  return arr.map((item) => item.value);
}

// Duration Setter

export function formatDuration(hours, minutes) {
  let formattedHours = hours || ""; // If hours is undefined or empty, set it to an empty string
  let formattedMinutes = minutes || ""; // If minutes is undefined or empty, set it to an empty string
  // If formattedHours is an empty string, replace it with "00"
  formattedHours = formattedHours === "" ? "00" : formattedHours;

  // If formattedMinutes is an empty string, replace it with "00"
  formattedMinutes = formattedMinutes === "" ? "00" : formattedMinutes;

  // Combine formatted hours and minutes with a colon
  return formattedHours + ":" + formattedMinutes;
}

// ALERTS FUNCTIONS
export function RequiredFieldAlert(title, subtitle, error) {
  Swal.fire(title, subtitle, error);
}

export function SuccessApiToast(message) {
  toast.success(message, {
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
}
export const showErrorToast = (message) => {
  toast.error(message, {
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
};

export function ErrorApiAlert(title) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-warning swal-confirm",
      cancelButton: "btn btn-default swal-cancel",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons.fire({
    title: title,
    icon: "error",
  });
}

// export const deleteConfirmation = async (
//   dispatch,
//   check,
//   text,
//   icon,
//   confirmButtonText,
//   cancelButtonText,
//   uuid,
//   delDATA,
//   deletedText,
//   endpoint
// ) => {
//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: "btn btn-warning swal-confirm",
//       cancelButton: "btn btn-default swal-cancel",
//     },
//     buttonsStyling: false,
//   });

//   let result;

//   if (check === "visa") {
//     dispatch(delVisaRateMain(uuid));
//     return true; // You might want to return true or something else based on the visa check
//   } else {
//     result = await swalWithBootstrapButtons.fire({
//       text: text,
//       icon: icon,
//       showCancelButton: true,
//       confirmButtonText: confirmButtonText,
//       cancelButtonText: cancelButtonText,
//       reverseButtons: true,
//     });
//   }

//   if (result.isConfirmed) {
//     try {
//       const response = await delDATA(endpoint, uuid);

//       if (response.data.statusCode === 200) {
//         swalWithBootstrapButtons.fire({
//           title: "Deleted!",
//           text: deletedText || "Record has been deleted successfully.",
//           icon: "success",
//         });

//         return true; // Return true if deletion is successful
//       }
//     } catch (error) {
//       swalWithBootstrapButtons.fire({
//         title: "Error On Deletion",
//         icon: "error",
//       });
//     }
//   } else if (result.dismiss === Swal.DismissReason.cancel) {
//     swalWithBootstrapButtons.fire({
//       title: "Cancelled",
//       icon: "error",
//     });
//   }

//   return false; // Return false if deletion is not successful
// };

export const deleteConfirmation = async (
  text,
  icon,
  confirmButtonText,
  cancelButtonText,
  uuid,
  delDATA,
  deletedText,
  endpoint,
  dispatch
  // check,
) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-warning swal-confirm",
      cancelButton: "btn btn-default swal-cancel",
    },
    buttonsStyling: false,
  });

  
  const result = await swalWithBootstrapButtons.fire({
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    reverseButtons: true,
  });

  // If the user confirms the action
  if (result.isConfirmed) {
    try {
      // Dispatch the action if check is 'visa'
      // await dispatch(delVisaRateMain(uuid));

      // Call the delDATA function otherwise
      const response = await delDATA(endpoint, uuid);

      if (response.data.statusCode !== 200) {
        throw new Error("Deletion failed");
      }

      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: deletedText || "Record has been deleted successfully.",
        icon: "success",
      });

      return true; // Return true if deletion is successful
    } catch (error) {
      swalWithBootstrapButtons.fire({
        title: "Error On Deletion",
        icon: "error",
      });
      return false; // Return false if there is an error
    }
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      icon: "error",
    });
  }

  return false; // Return false if the action was cancelled
};

export const deleteMultiConfirmation = async (
  text,
  icon,
  confirmButtonText,
  cancelButtonText,
  uuids,
  delMultiDATA,
  deletedText,
  endpoint
) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-warning swal-confirm",
      cancelButton: "btn btn-default swal-cancel",
    },
    buttonsStyling: false,
  });

  const result = await swalWithBootstrapButtons.fire({
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    try {
      const response = await delMultiDATA(endpoint, { uuids: uuids });

      if (response.data.statusCode === 200) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: deletedText || "Checked Records has been deleted successfully.",
          icon: "success",
        });

        return true; // Return true if deletion is successful
      }
    } catch (error) {
      swalWithBootstrapButtons.fire({
        title: "Error On Deletion",
        icon: "error",
      });
    }
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      icon: "error",
    });
  }

  return false; // Return false if deletion is not successful
};

export const SimpleAlert = async (icon, title, text) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
};

export const activedeactiveConfiramtionMulti = async (
  title,
  text,
  icon,
  confirmbuttontext,
  cancelbuttontext,
  successtext,
  successtitle,
  successicon,
  putDataActivate_DeactivateMulti,
  updateslist,
  endpoint
) => {
  // Show confirmation dialog
  const { value } = await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: confirmbuttontext,
    cancelButtonText: cancelbuttontext,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    reverseButtons: true,
  });

  // If user confirms
  if (value) {
    try {
      // Example updates array

      const response = await putDataActivate_DeactivateMulti(
        endpoint,
        updateslist
      );

      if (response.statusCode === 200) {
        // Show success message
        Swal.fire({
          title: successtitle,
          text: successtext,
          icon: successicon,
        });
        return true; // Return true if API call is successful
      } else {
        // Show error message
        Swal.fire({
          title: "Error",
          text: "Error on updation",
          icon: "error",
        });
        return false; // Return false if response status code is not 200
      }
    } catch (error) {
      // Handle error
      // Show error message
      Swal.fire({
        title: "Error",
        text: "Error on updation",
        icon: "error",
      });
      return false; // Return false if API call fails
    }
  }
  return false; // Return false if user cancels
};

export function PaginationSetter(currentPage, data) {
  const perPage = 25;
  const noofPages = Math.ceil(data.length / perPage);

  // Slice the userLogData array based on current page and items per page
  const indexOfLastLog = currentPage * perPage;
  const indexOfFirstLog = indexOfLastLog - perPage;
  const currentdata = data.slice(indexOfFirstLog, indexOfLastLog);
  return { currentdata, noofPages };
}

export const hoursminutesformater = (data) => {
  const [hours, minutes] = data.split(":");

  // Format the duration
  return `${parseInt(hours, 10)} Hours : ${minutes} Minutes`;
};

export const extractHoursAndMinutes = (duration) => {
  // Split the duration string by colon (:) to get hours and minutes
  const [hours, minutes] = duration.split(":");

  return { hours: hours.trim(), minutes: minutes.trim() };
};

export function filterOptionsByValue(options, value) {
  return options.filter((option) => option.value === value);
}

export function filterOptionsByLabel(options, label) {
  const filteredOption = options.filter((option) => option.label === label);
  return filteredOption[0];
}

export function filterOptionsByMyltivalues(options, value) {
  const filteredOptionMulti = options.filter((option) =>
    value.includes(option.value)
  );

  return filteredOptionMulti;
}

export const showConfirmationDialog = async (text) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-warning swal-confirm",
      cancelButton: "btn btn-default swal-cancel",
    },
    buttonsStyling: false,
  });

  const result = await swalWithBootstrapButtons.fire({
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    return true;
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    return false;
  }
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding leading zero if needed
  const day = date.getDate().toString().padStart(2, "0"); // Adding leading zero if needed
  return `${month}/${day}/${year}`;
};

export const formatDateTime = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export const parseDate = (dateString) => {
  const [month, day, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export const Dateformater = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const generateDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
