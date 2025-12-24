import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { apiHandler } from '../Apis/ApiHandler';
import Constants from '../constants/routes';
import { Slide, toast } from 'react-toastify';

// Company logo URL from environment variable
const COMPANY_LOGO = import.meta.env.VITE_REACT_APP_COMPANY_LOGO || 'https://escapra-assets.s3.eu-west-1.amazonaws.com/public/companylogo.png';

const VerifyOtp = ({setShowHeaderAndMenuBar}) => {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  // Toggle header and menu bar visibility
   useEffect(() => {
     setShowHeaderAndMenuBar?.(false);
     return () => setShowHeaderAndMenuBar?.(true);
   }, [setShowHeaderAndMenuBar]);
 
  // Redirect to forgot-password if email is missing
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
    apiHandler.setToastConfig({
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Slide,
    });
  }, [email, navigate]);

  const validateOtp = () => {
    if (!otp) {
      setErrorMessage('OTP is required');
      return false;
    }
    if (!/^\d{6,8}$/.test(otp)) {
      setErrorMessage('OTP must be 6-8 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    if (!validateOtp()) {
      submitButton.disabled = false;
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
      return;
    }

    const response = await apiHandler.verifyResetPasswordOtpAdmin(email, otp);
    submitButton.disabled = false;

    if (response?.success) {
      setErrorMessage('');
      toast.success('OTP verified successfully', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
      navigate('/reset-password', { state: { email, resetToken: response.data.reset_token } });
    } else {
      setErrorMessage(response.message || 'Invalid or expired OTP');
    }
  };

  return (
    <div>
      <div className="login-container container">
        <div className="hpanel">
          <div className="panel-body">
            <div className="text-center bknd_logo">
              <img src={COMPANY_LOGO} alt="logo" title="true" />
            </div>
            <br />
            <div className="loginForm">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="control-label droid">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Enter OTP"
                    name="otp"
                    className="form-control"
                  />
                  {errorMessage && (
                    <div style={{ color: 'red', marginTop: '15px' }}>{errorMessage}</div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <button type="submit" className="btn btn-primary col-xs-12">
                    Verify OTP
                  </button>
                </div>
                <div className="droid text-center form-group">
                  <Link
                    to="/forgot-password"
                    className="col-xs-12 btn btn-block btn-default"
                  >
                    Back to Forgot Password
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .login-container {
              max-width: 420px;
              margin: auto;
              padding-top: 6%;
              min-width: 250px;
            }
            .hpanel {
              background-color: transparent;
              border: none;
              box-shadow: none;
              margin-bottom: 25px;
            }
            .login-container .panel-body {
              box-shadow: 0 0 25px 0 #AFAFAF;
            }
            .hpanel .panel-body {
              padding: 20px;
              font-family: "MONTSERRAT";
              background: #fff;
              border: 1px solid #e4e5e7;
              border-radius: 2px;
              position: relative;
            }
            .bknd_logo {
              margin: 10px auto 0;
              width: 140px;
              padding: 10px;
            }
            .bknd_logo img {
              width: 100%;
            }
            .loginForm {
              font-size: 13px !important;
            }
            .form-group {
              margin-bottom: 15px;
            }
            .form-group label {
              font-family: "MONTSERRAT";
              font-size: 11px !important;
            }
            label {
              display: inline-block;
              max-width: 100%;
              margin-bottom: 5px;
              font-weight: bold;
            }
            .btn-primary {
              color: #fff;
              background-color: #FF5015;
              border-color: #FF5015;
            }
            .btn-primary:hover,
            .btn-primary:active,
            .btn-primary:focus-visible {
              color: #fff;
              background-color: #FF5015 !important;
              border-color: #FF5015 !important;
            }
            .btn-primary:focus-visible {
              outline: none !important;
              box-shadow: 0 0 0 3px rgba(255, 80, 21, 0.5) !important;
            }
            .btn-default {
              color: #333 !important;
              background-color: #fff !important;
              border-color: #ccc !important;
            }
            .btn-default:hover {
              color: #333 !important;
              background-color: #e6e6e6 !important;
              border-color: #adadad !important;
            }
            .col-xs-12 {
              width: 100%;
            }
            .btn {
              font-size: 13px !important;
            }
          `,
        }}
      />
    </div>
  );
};

export default VerifyOtp;