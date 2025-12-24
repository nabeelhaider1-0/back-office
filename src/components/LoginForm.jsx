import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiHandler } from '../Apis/ApiHandler';
import Constants from '../constants/routes';
import { Slide, toast } from 'react-toastify';

// Company logo URL from environment variable
const COMPANY_LOGO = import.meta.env.VITE_REACT_APP_COMPANY_LOGO || 'https://escapra-assets.s3.eu-west-1.amazonaws.com/public/companylogo.png';

const LoginForm = ({ setShowHeaderAndMenuBar }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userEmail: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize ApiHandler with navigate and toast config
  useEffect(() => {
    apiHandler.setNavigate(navigate);
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

    // Handle session expiration message
    if (location.state?.errorMessage) {
      setErrorMessage(location.state.errorMessage);
      toast.error(location.state.errorMessage, {
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
    }
  }, [location.state, navigate]);

  // Toggle header and menu bar visibility
  useEffect(() => {
    setShowHeaderAndMenuBar?.(false);
    return () => setShowHeaderAndMenuBar?.(true);
  }, [setShowHeaderAndMenuBar]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage(''); // Clear error on input change
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    if (!formData.userEmail) {
      setErrorMessage('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
      setErrorMessage('Invalid email format');
      return false;
    }
    if (!formData.password) {
      setErrorMessage('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitButton = event.target.querySelector('.login_btn_backend');
    submitButton.disabled = true;

    // Client-side validation
    if (!validateForm()) {
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

    const response = await apiHandler.loginAdmin(formData.userEmail, formData.password);
    
    submitButton.disabled = false;

    if (!response || Object.keys(response).length === 0) {
      // Network error (ApiHandler returns {})
      console.log('Login error: Server is unreachable');
      setErrorMessage('Server is unreachable');
      return;
    }
    console.log('Login successful:', response.data);
    if (response.success) {
      // Handle successful login
      
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('userName', response.data.user.first_name || 'Admin');

      // ProfileUuid not in admin.swagger.yaml, kept for compatibility
      if (response.data.user.profile?.length > 0) {
        localStorage.setItem('ProfileUuid', response.data.user.profile[0].uuid);
      }

      toast.success(`Welcome ${response.data.user.first_name || 'Admin'}`, {
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
      navigate(Constants.URLConstants.DASHBOARD);
    } else {
      toast.error(response.message, {
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
      
      // Handle response errors (ApiHandler returns error.response.data)
      const errorMsg = response.message || 'An unknown error occurred';
      console.log('Login error:', errorMsg);
      setErrorMessage(errorMsg);
      return;
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
                    value={formData.userEmail}
                    onChange={handleChange}
                    placeholder="Email"
                    name="userEmail"
                    className="form-control"
                    autoComplete="username"
                  />
                </div>
                <br />
                <div className="form-group">
                  <label className="control-label droid">Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      name="password"
                      className="form-control"
                      autoComplete="current-password"
                    />
                    <span
                      className={`password-toggle ${showPassword ? 'show' : ''}`}
                      onClick={handleTogglePassword}
                    >
                      <i className={`far fa-eye${showPassword ? '-slash' : ''}`}></i>
                    </span>
                  </div>
                  {/* {errorMessage && (
                    <div style={{ color: 'red', marginTop: '15px' }}>{errorMessage}</div>
                  )} */}
                </div>
                <br />
                <div className="form-group">
                  <input type="hidden" name="PSA_language" defaultValue="en" />
                  <input
                    type="submit"
                    name="PSA_LOGIN"
                    value="Login"
                    className="login_btn_backend btn btn-primary col-xs-12"
                  />
                </div>
                <div className="droid text-center form-group">
                  <Link
                    to="/forgot-password"
                    id="forgot_password"
                    className="col-xs-12 password btn btn-block btn-default"
                    tabIndex={5}
                  >
                    Forgot Password?
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
            .password-wrapper {
              display: flex;
              align-items: center;
            }
            .password-toggle {
              cursor: pointer;
              font-size: 16px;
              margin-left: -25px;
              z-index: 1;
            }
          `,
        }}
      />
    </div>
  );
};

export default LoginForm;