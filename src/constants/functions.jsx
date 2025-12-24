import { toast } from 'react-toastify';
// import { Modal } from 'react-bootstrap';

// Success API Toast
export const SuccessApiToast = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Error API Alert
export const ErrorApiAlert = (message) => {
 
   toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  // Alternatively, use a modal or custom alert component
  // Modal.show({ title: 'Error', message });
};

// Required Field Alert
export const RequiredFieldAlert = (title, message, type = 'warning') => {
   toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  // Could be enhanced with a custom modal: Modal.show({ title, message, type });
};

// Simple Alert
export const SimpleAlert = (title, message, type = 'info') => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  // Could be enhanced with a custom modal: Modal.show({ title, message, type });
};