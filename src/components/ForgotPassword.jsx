import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { apiHandler } from '../Apis/ApiHandler';
import Constants from '../constants/routes';
import { Slide, toast } from 'react-toastify';

// Company logo URL from environment variable
const COMPANY_LOGO = import.meta.env.VITE_REACT_APP_COMPANY_LOGO || 'https://escapra-assets.s3.eu-west-1.amazonaws.com/public/companylogo.png';

const ForgotPassword = ({setShowHeaderAndMenuBar}) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  // Toggle header and menu bar visibility
   useEffect(() => {
     setShowHeaderAndMenuBar?.(false);
     return () => setShowHeaderAndMenuBar?.(true);
   }, [setShowHeaderAndMenuBar]);
 
  // Initialize ApiHandler with toast config
  useEffect(() => {
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
  }, []);

  const validateEmail = () => {
    if (!email) {
      setErrorMessage('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Invalid email format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    if (!validateEmail()) {
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

    const response = await apiHandler.forgotPasswordAdmin(email);
    submitButton.disabled = false;

    if (response?.success) {
      setErrorMessage('');
      toast.success('If the email exists, an OTP has been sent.', {
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
      navigate('/verify-otp', { state: { email } });
    } else {
      setErrorMessage(response.message || 'Failed to send OTP');
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
                  <label className="control-label droid">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    autoComplete="username"
                  />
                  {errorMessage && (
                    <div style={{ color: 'red', marginTop: '15px' }}>{errorMessage}</div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <button type="submit" className="btn btn-primary col-xs-12">
                    Send OTP
                  </button>
                </div>
                <div className="droid text-center form-group">
                  <Link
                    to={'/'}
                    className="col-xs-12 btn btn-block btn-default"
                  >
                    Back to Login
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

export default ForgotPassword;